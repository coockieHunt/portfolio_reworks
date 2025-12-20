// request
import { Request, Response, NextFunction } from 'express';

//color
import chalk from 'chalk';

// services
import { RedisClient } from '../services/Redis.service';

// config
import cfg from '../config/default.ts';

// log
import { writeToLog } from '../middlewares/log.middlewar';

// utils
import { normalizeUrl } from '../utils/url';

interface RouteConfig {
    match: {
        url: string;
        method?: string;
    };
    windowSeconds?: number;
    maxRequests?: number;
}

interface RateConfig {
    enabled?: boolean;
    default?: {
        windowSeconds: number;
        maxRequests: number;
    };
    routes?: Record<string, RouteConfig>;
}

interface LimitContext {
    key: string;
    windowSeconds: number;
    maxRequests: number;
}

//*************/
//?  HELPER 
//*************/
const rateConfig: RateConfig | null = (() => {
    try {
        return (cfg.rateLimiter as RateConfig) || null;
    } catch (err) {
        console.warn(chalk.yellow('RateLimiter: unable to read config.rateLimiter, falling back to env/defaults'));
        return null;
    }
})();

/**
* Determines the rate limiting context for a given request.
*
* @param req - Express Request object
*/

function getLimitsContext(req: Request): LimitContext {
    const defaults = {
        windowSeconds: parseInt(process.env.RATE_WINDOW_SECONDS || '60', 10),
        maxRequests: parseInt(process.env.RATE_MAX_REQUESTS || '5', 10),
    };

    const rawUrl = req.originalUrl || req.url || '';
    const currentUrl = normalizeUrl(rawUrl);
    const currentMethod = (req.method || 'GET').toUpperCase();

    if (rateConfig && rateConfig.enabled !== false && rateConfig.routes) {
        for (const [key, routeCfg] of Object.entries(rateConfig.routes)) {
            if (routeCfg.match) {
                const configUrl = normalizeUrl(routeCfg.match.url);
                const configMethod = routeCfg.match.method ? routeCfg.match.method.toUpperCase() : 'GET';

                if (configMethod !== currentMethod) continue;

                const isMatch = (currentUrl === configUrl) || (currentUrl.startsWith(configUrl + '/'));

                if (isMatch) {
                    return {
                        key: key,
                        windowSeconds: Number(routeCfg.windowSeconds ?? rateConfig.default?.windowSeconds ?? defaults.windowSeconds),
                        maxRequests: Number(routeCfg.maxRequests ?? rateConfig.default?.maxRequests ?? defaults.maxRequests)
                    };
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
        };
    }

    return { key: fallbackKey, ...defaults };
}


// log on startup rate limiter config
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
    console.log(chalk.cyan('─'.repeat(40)));

    const logMsg = `RateLimiter: enabled=${enabled}, default=${defaultCfg.maxRequests}/${defaultCfg.windowSeconds}s, route=${routesList.join(',') || 'none'}`;
    writeToLog(logMsg, 'rateLimiter');
} catch (e) {
    console.log(chalk.green('RateLimiter loaded with default settings.'));
    writeToLog('RateLimiter loaded with default settings.', 'rateLimiter');
}


/**
 * Rate Limiter Middleware
 * Limits the number of requests from a single IP to prevent abuse.
 * Uses Redis to track request counts.
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Next middleware function
 */
export async function rateLimiter(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
        const redis = RedisClient;
        
        if (!redis || !redis.isReady) {
            console.warn(chalk.yellow('RateLimiter: Redis not connected, skipping rate limiting.'));
            writeToLog('RateLimiter skip: redis not connected', 'rateLimiter');
            return next();
        }

        const { key: routeKey, windowSeconds, maxRequests } = getLimitsContext(req);
        
        const ip = (req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown').toString();
        const redisKey = `rate:${routeKey}:${ip}`;

        const current = await redis.incr(redisKey);
        
        const isDefault = routeKey.startsWith('default:');
        const color = isDefault ? chalk.gray : chalk.yellowBright; 
        
        const logMsg = `[RateLimit] name=${routeKey} method=${req.method} count=${current}/${maxRequests} window=${windowSeconds}s`;
        console.log(color(logMsg));
        writeToLog(logMsg, 'rateLimiter');

        if (current === 1) {
            await redis.expire(redisKey, windowSeconds);
        }

        if (current > maxRequests) {
            const ttl = await redis.ttl(redisKey);
            const blockedMsg = `RateLimit BLOCKED key=${routeKey} count=${current}/${maxRequests} ip=${ip} retry_in=${ttl}s`;
            
            console.error(chalk.red(`[RateLimit] BLOCKED! key=${routeKey} count=${current}/${maxRequests} ip=${ip} retry_in=${ttl}s`));
            writeToLog(blockedMsg, 'rateLimiter');

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
        const errorMsg = err.stack || err.message || String(err);
        console.error(chalk.red('RateLimiter error:'), errorMsg);
        writeToLog(`RateLimiter error: ${errorMsg}`, 'rateLimiter');
        return next();
    }
}

export default rateLimiter;