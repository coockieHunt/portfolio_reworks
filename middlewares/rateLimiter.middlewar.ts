import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';
import { match } from 'path-to-regexp'; 

// services
import { RedisClient } from '../services/Redis.service';
import { AuthService } from '../services/Auth.service';

// config
import cfg from '../config/default';

// log
import { writeToLog } from '../middlewares/log.middlewar';

// utils
import { normalizeUrl } from '../utils/url.helper';

//token 
import jwt from 'jsonwebtoken';


interface RouteConfig {
    match: {
        url: string;
        method?: string;
    };
    windowSeconds?: number;
    maxRequests?: number;
    adminBypass?: boolean;
}

interface RateConfig {
    enabled?: boolean;
    default?: {
        windowSeconds: number;
        maxRequests: number;
        adminBypass?: boolean;
    };
    routes?: Record<string, RouteConfig>;
}

interface LimitContext {
    key: string;
    windowSeconds: number;
    maxRequests: number;
    adminBypass: boolean;
}

const rateConfig: RateConfig | null = (() => {
    try {
        return (cfg.rateLimiter as RateConfig) || null;
    } catch (err) {
        console.warn(chalk.yellow('RateLimiter: unable to read config.rateLimiter, falling back to env/defaults'));
        return null;
    }
})();

try {
    const enabled = !(rateConfig && rateConfig.enabled === false);
    const defaultCfg = rateConfig?.default || { windowSeconds: 60, maxRequests: 5 };
    const routesList = rateConfig?.routes ? Object.keys(rateConfig.routes) : [];
    
    const statusLabel = enabled ? chalk.bgGreen.black(' ACTIVE ') : chalk.bgRed.white(' DISABLED ');
    
    console.log(chalk.cyan('🛡️  Rate Limiter Configuration:'));
    console.log(`   ${chalk.gray('Status:')}  ${statusLabel}`);
    console.log(`   ${chalk.gray('Default:')} ${chalk.yellow(defaultCfg.maxRequests)} req / ${chalk.yellow(defaultCfg.windowSeconds + 's')}`);
    
    if (routesList.length > 0) {
        console.log(`   ${chalk.gray('Ruled Routes:')}  ${chalk.magenta(routesList.join(', '))}`);
    } else {
        console.log(`   ${chalk.gray('Routes:')}  ${chalk.italic.dim('none')}`);
    }
    console.log(chalk.gray('─'.repeat(40)));

    const logMsg = `RateLimiter: enabled=${enabled}, default=${defaultCfg.maxRequests}/${defaultCfg.windowSeconds}s, route=${routesList.join(',') || 'none'}`;
    writeToLog(logMsg, 'rateLimiter');
} catch (e) {
    console.log(chalk.green('RateLimiter loaded with default settings.'));
}


/*
*  Determines the rate limiting context for a given request.
*  @param req Express Request object
*  @returns LimitContext containing the key, windowSeconds, and maxRequests
 */
function getLimitsContext(req: Request): LimitContext {
    const defaults = {
        windowSeconds: parseInt(process.env.RATE_WINDOW_SECONDS || '60', 10),
        maxRequests: parseInt(process.env.RATE_MAX_REQUESTS || '5', 10),
        adminBypass: false,
    };

    const urlWithoutQuery = (req.originalUrl || req.url).split('?')[0];
    const currentUrl = normalizeUrl(urlWithoutQuery);
    const currentMethod = (req.method || 'GET').toUpperCase();

    if (rateConfig && rateConfig.enabled !== false && rateConfig.routes) {
        for (const [key, routeCfg] of Object.entries(rateConfig.routes)) {
            if (routeCfg.match) {
                const configUrl = normalizeUrl(routeCfg.match.url);
                const configMethod = (routeCfg.match.method || 'GET').toUpperCase();

                if (configMethod !== currentMethod) continue;

                try {
                    const matcher = match(configUrl, { decode: decodeURIComponent });
                    const isMatch = matcher(currentUrl);

                    if (isMatch) {
                        return {
                            key: key,
                            windowSeconds: Number(routeCfg.windowSeconds ?? rateConfig.default?.windowSeconds ?? defaults.windowSeconds),
                            maxRequests: Number(routeCfg.maxRequests ?? rateConfig.default?.maxRequests ?? defaults.maxRequests),
                            adminBypass: Boolean(routeCfg.adminBypass ?? rateConfig.default?.adminBypass ?? defaults.adminBypass)
                        };
                    }
                } catch (err) {
                    console.error(chalk.red(`RateLimiter: Pattern invalide pour la route [${key}]: ${configUrl}`));
                }
            }
        }
    }

    const fallbackKey = `default:${currentUrl}`;
    
    if (rateConfig && rateConfig.default) {
        return {
            key: fallbackKey,
            windowSeconds: Number(rateConfig.default.windowSeconds ?? defaults.windowSeconds),
            maxRequests: Number(rateConfig.default.maxRequests ?? defaults.maxRequests),
            adminBypass: Boolean(rateConfig.default.adminBypass ?? false),
        };
    }

    return { key: fallbackKey, ...defaults, adminBypass: false };
}

/**
 * Middleware de Rate Limiting
 */
export async function rateLimiter(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
        const redis = RedisClient;
        
        if (!redis || !redis.isReady) {
            console.warn(chalk.yellow('RateLimiter: Redis not connected, skipping.'));
            return next();
        }

        const { key: routeKey, windowSeconds, maxRequests, adminBypass } = getLimitsContext(req);

        // bypass rate limit for admin logged
        if (adminBypass) {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (token) {
                try {
                    const isRevoked = await AuthService.isTokenRevoked(token);

                    if (!isRevoked) {
                        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);

                        console.log(chalk.yellow('[RateLimit]'), chalk.cyan('Admin bypass activated for user'), (user as any).name);
                        return next(); 
                    }

                } catch (error) {}
            }
        }
        
        const ip = (req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown').toString();
        const redisKey = `rate:${routeKey}:${ip}`;

        const current = await redis.incr(redisKey);
        
        const isDefault = routeKey.startsWith('default:');
        const prefix = chalk.yellow('[RateLimit]');
        const status = isDefault ? chalk.red.bold('unRegister') : chalk.green.bold('register');
        
        const methodColors: Record<string, any> = {
            'GET': chalk.green, 'POST': chalk.yellow, 'DELETE': chalk.red, 'PUT': chalk.blue
        };
        const styledMethod = (methodColors[req.method] || chalk.white)(req.method);

        console.log([
            prefix,
            status,
            `${chalk.gray('name=')}${chalk.cyan(routeKey)}`,
            `${chalk.gray('method=')}${styledMethod}`,
            `${chalk.gray('count=')}${chalk.white(current)}/${chalk.white(maxRequests)}`,
            chalk.yellow('→'),
            chalk.gray(`window=${windowSeconds}s`)
        ].join(' '));

        writeToLog(`[RateLimit] ${isDefault ? 'unRegister' : 'register'} name=${routeKey} method=${req.method} count=${current}/${maxRequests}`, 'rateLimiter');

        if (current === 1) {await redis.expire(redisKey, windowSeconds);}

        if (current > maxRequests) {
            const ttl = await redis.ttl(redisKey);
            res.set('Retry-After', String(ttl > 0 ? ttl : windowSeconds));
            return res.status(429).json({ 
                success: false, 
                message: 'Too many requests, please retry later.', 
                retryAfter: ttl 
            });
        }

        const remaining = Math.max(0, maxRequests - current);
        res.set('X-RateLimit-Limit', String(maxRequests));
        res.set('X-RateLimit-Remaining', String(remaining));
        
        return next();
    } catch (err: any) {
        console.error(chalk.red('RateLimiter error:'), err);
        return next();
    }
}

export default rateLimiter;