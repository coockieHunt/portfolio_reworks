import chalk from 'chalk';
import { RedisClient } from '../func/Redis.js';
import getConfig from 'config';

// load rate limiter conf by module scope or env/defaults
const rateConfig = (() => {
	try {
		return getConfig.has('rateLimiter') ? getConfig.get('rateLimiter') : null;
	} catch (err) {
		console.warn(chalk.yellow('RateLimiter: unable to read config.rateLimiter, falling back to env/defaults'));
		return null;
	}
})();

// Log loaded rate limiter config
try {
	const enabled = !(rateConfig && rateConfig.enabled === false);
	const defaultCfg = rateConfig && rateConfig.default ? rateConfig.default : { windowSeconds: process.env.RATE_WINDOW_SECONDS || '60', maxRequests: process.env.RATE_MAX_REQUESTS || '5' };
	const routes = rateConfig && rateConfig.routes ? Object.keys(rateConfig.routes).join(', ') : '(none)';
	console.log(chalk.green(`RateLimiter loaded: enabled=${enabled} default=${defaultCfg.maxRequests}/${defaultCfg.windowSeconds}s routes=${routes}`));
} catch (e) { }


function ParseRoute(req) {
	const url = (req.originalUrl || req.url || '').toString();
	const parts = url.split('?')[0].split('/').filter(Boolean);

	let routerName = 'unknown';
	let routeSegment = 'index';

	//parse url for get route
	if (parts.length >= 3 && parts[0] === 'api') {
		routerName = parts[1];
		routeSegment = parts[2];
	} else if (parts.length >= 2) {
		routerName = parts[0];
		routeSegment = parts[1];
	} else if (parts.length === 1) {
		routerName = parts[0];
	}

	return `${routerName}.${routeSegment}`;
}

function getLimitsRoute(req) {
	const defaults = {
		windowSeconds: parseInt(process.env.RATE_WINDOW_SECONDS || '60', 10),
		maxRequests: parseInt(process.env.RATE_MAX_REQUESTS || '5', 10),
	};

	if (!rateConfig || rateConfig.enabled === false) return defaults;

	const routeKey = ParseRoute(req);
	if (rateConfig.routes && rateConfig.routes[routeKey]) {
		const r = rateConfig.routes[routeKey];
		return {
			windowSeconds: parseInt(r.windowSeconds ?? rateConfig.default?.windowSeconds ?? defaults.windowSeconds, 10),
			maxRequests: parseInt(r.maxRequests ?? rateConfig.default?.maxRequests ?? defaults.maxRequests, 10),
		};
	}

	if (rateConfig.default) {
		return {
			windowSeconds: parseInt(rateConfig.default.windowSeconds ?? defaults.windowSeconds, 10),
			maxRequests: parseInt(rateConfig.default.maxRequests ?? defaults.maxRequests, 10),
		};
	}

	return defaults;
}

// Setup middleware rateLimiter
export async function rateLimiter(req, res, next) {
	try {
		const redis = RedisClient;
		if (!redis || !redis.isReady) {
			console.warn(chalk.yellow('RateLimiter: Redis not connected, skipping rate limiting.'));
			return next();
		}

		const routeKey = ParseRoute(req);
		const { windowSeconds, maxRequests } = getLimitsRoute(req);

		const ip = (req.ip || req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown').toString();

		const redisKey = routeKey.replace(/\./g, ':');
		const key = `rate:${redisKey}:${ip}`;

		const current = await redis.incr(key);

		console.log(chalk.gray(`[RateLimit] route=${routeKey} count=${current}/${maxRequests} window=${windowSeconds}s`));

		if (current === 1) {
			await redis.expire(key, windowSeconds);
		}

		if (current > maxRequests) {
			const ttl = await redis.ttl(key);
			console.error(chalk.red(`[RateLimit] BLOCKED! route=${routeKey} count=${current}/${maxRequests} ip=${ip} retry_in=${ttl}s`));
			res.set('Retry-After', String(ttl > 0 ? ttl : windowSeconds));
			return res.status(429).json({ success: false, message: 'Too many requests, please retry later.', retryAfter: ttl });
		}

		const remaining = Math.max(0, maxRequests - current);
		res.set('X-RateLimit-Limit', String(maxRequests));
		res.set('X-RateLimit-Remaining', String(remaining));
		return next();
	} catch (err) {
		console.error(chalk.red('RateLimiter error:'), err.stack || err.message || err);
		return next();
	}
}

export default rateLimiter;
