const parseList = (val, fallback = []) => {
  if (!val || typeof val !== 'string') return fallback;
  return val
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
};

module.exports = {
  port: Number(process.env.PORT || 3001),
  ApiRoot: process.env.API_ROOT || '/api',

  MailTransport: {
    host: process.env.MAIL_HOST || '',
    port: Number(process.env.MAIL_PORT || 0),
    secure: String(process.env.MAIL_SECURE || 'false').toLowerCase() === 'true',
    user: process.env.MAIL_USER || '',
    pass: process.env.MAIL_PASS || ''
  },

  allowedIPs: parseList(process.env.IP_WHITELIST, ['::1']),

  Log: {
    maxLine: 5000,
    directory: process.env.LOG_DIR || 'logs',
    name: {
      mail: 'mail_log.txt',
      secret: 'secret_system_log',
      guestbook: 'guestbook_log',
      redis: 'redis_log',
      counter: 'counter_log',
      status: 'status_log',
      rateLimiter: 'rate_limiter_log'
    }
  },

  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT || 6379),
    password: process.env.REDIS_PASSWORD || ''
  },

  SecretSystem: {
    password: process.env.SECRET_PASSWORD || 'AZERTY123',
    redisListKey: process.env.REDIS_LIST_KEY || 'GUESTBOOK_LIST'
  },

  rateLimiter: {
    enabled: String(process.env.RATE_LIMITER_ENABLED || 'true').toLowerCase() === 'true',
    default: {
      windowSeconds: Number(process.env.RATE_WINDOW_SECONDS || 60),
      maxRequests: Number(process.env.RATE_MAX_REQUESTS || 10)
    },
    routes: {
      'mail.sendEmail': {
        windowSeconds: 60,
        maxRequests: 3,
        match: { url: '/api/mail/sendEmail', method: 'POST' }
      },
      'counter.get': {
        windowSeconds: 60,
        maxRequests: 40,
        match: { url: '/api/counter/get', method: 'GET' }
      },
      'counter.increment': {
        windowSeconds: 60,
        maxRequests: 40,
        match: { url: '/api/counter/increment', method: 'POST' }
      },
      'guestbook.read': {
        windowSeconds: 60,
        maxRequests: 7,
        match: { url: '/api/guestbook/read', method: 'POST' }
      },
      'guestbook.write': {
        windowSeconds: 60,
        maxRequests: 6,
        match: { url: '/api/guestbook/write', method: 'POST' }
      }
    }
  }
};
