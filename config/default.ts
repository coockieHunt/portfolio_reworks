import staticConfig from '../static.config.json';
import { parseList } from '../utils/redis';

interface MailTransportConfig {
	host: string;
	port: number;
	secure: boolean;
	user: string;
	pass: string;
}

interface LogConfig {
	maxLine: number;
	directory: string;
	name: Record<string, string>;
}

interface RedisConfig {
	host: string;
	port: number;
	password?: string;
}

interface RateLimiterConfig {
	enabled: boolean;
	default: {
		windowSeconds: number;
		maxRequests: number;
	};
	routes: any; 
}

interface AppConfig {
	port: number;
	ApiRoot: string;
	MailTransport: MailTransportConfig;
	allowedIPs: string[];
	Log: LogConfig;
	redis: RedisConfig;
	SecretSystem: { password?: string };
	rateLimiter: RateLimiterConfig;
}


const config: AppConfig = {
	port: Number(process.env.PORT || staticConfig.port),
	ApiRoot: process.env.API_ROOT || staticConfig.ApiRoot,

	MailTransport: {
		host: process.env.MAIL_HOST || staticConfig.mail.host,
		port: Number(process.env.MAIL_PORT || staticConfig.mail.port),
		secure: String(process.env.MAIL_SECURE || staticConfig.mail.secure).toLowerCase() === 'true',
		user: process.env.MAIL_USER || staticConfig.mail.user,
		pass: process.env.MAIL_PASS || staticConfig.mail.pass
	},

	allowedIPs: parseList(process.env.IP_WHITELIST, staticConfig.allowedIPs),

	Log: {
		maxLine: staticConfig.log.maxLine,
		directory: process.env.LOG_DIR || staticConfig.log.directory,
		name: {
			mail: staticConfig.log.names.mail,
			secret: staticConfig.log.names.secret,
			guestbook: staticConfig.log.names.guestbook,
			redis: staticConfig.log.names.redis,
			counter: staticConfig.log.names.counter,
			status: staticConfig.log.names.status,
			rateLimiter: staticConfig.log.names.rateLimiter
		}
	},

	redis: {
		host: process.env.REDIS_HOST || staticConfig.redis.host,
		port: Number(process.env.REDIS_PORT || staticConfig.redis.port),
		password: process.env.REDIS_PASSWORD || staticConfig.redis.password
	},

	SecretSystem: {
		password: process.env.SECRET_PASSWORD || staticConfig.secretSystem.password,
	},

	rateLimiter: {
		enabled: String(process.env.RATE_LIMITER_ENABLED || staticConfig.rateLimiter.enabled).toLowerCase() === 'true',
		default: {
			windowSeconds: staticConfig.rateLimiter.windowSeconds,
			maxRequests: staticConfig.rateLimiter.maxRequests
		},
		routes: staticConfig.rateLimiter.routes
	}
};

export default config;