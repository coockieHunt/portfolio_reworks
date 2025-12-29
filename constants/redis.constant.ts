// authorized redis keys
export const AUTHORIZED_REDIS_KEYS = {
    GLOBAL_STATUS: 'portfolio:global:call_api',
    THEME_RAND: 'portfolio:theme:rand_activate',
    GUESTBOOK_ENTRIES: 'portfolio:guestbook:entries',
} as const;

// authorized redis prefixes (authorized dynamic keys)
export const AUTHORIZED_REDIS_PREFIXES = {
    BLOG_POST: 'portfolio:blog:post:',
    AUTH_TOKEN: 'portfolio:auth:token:'
} as const;

export type AuthorizedRedisKey = typeof AUTHORIZED_REDIS_KEYS[keyof typeof AUTHORIZED_REDIS_KEYS];