interface RedisKeys {
    readonly GLOBAL_STATUS: string;
    readonly THEME_RAND: string;
    readonly GUESTBOOK_ENTRIES: string;
}

const REDIS_KEYS: RedisKeys = {
    GLOBAL_STATUS: 'portfolio:global:call_api',
    THEME_RAND: 'portfolio:theme:rand_activate',
    GUESTBOOK_ENTRIES: 'portfolio:guestbook:entries',
};

export default REDIS_KEYS;