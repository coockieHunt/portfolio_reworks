// services/Auth.service.ts
import { RedisClient } from '../services/Redis.service';
import { AUTHORIZED_REDIS_PREFIXES } from '../constants/redis.constant';
import { validateKey } from '../utils/redis.helper';

/**
 * Authentication Service
 * 
 * Manages token-based authentication with Redis.
 * Handles token revocation and validation for JWT authentication flow.
 */
export class AuthService {
    /**
     * Generates the Redis key for a given token
     * @param token - The authentication token
     * @returns The prefixed Redis key for token storage
     * @private
     */
    private static getTokenKey(token: string) {
        return `${AUTHORIZED_REDIS_PREFIXES.AUTH_TOKEN}${token}`;
    }

    /**
     * Revokes an authentication token by storing it in Redis blacklist
     * @param token - The token to revoke
     * @returns Promise resolving to true when revocation succeeds
     * @throws {Error} If Redis client is not connected
     */
    static async revokeToken(token: string) {
        const key = this.getTokenKey(token);
        validateKey(key);

        if (!RedisClient || !RedisClient.isReady) {
            throw new Error("Redis client is not connected.");
        }

        const ttl = Number(process.env.TOKEN_TTL_REVOCATION) || 86400;

        await RedisClient.set(key, 'revoked', { EX: ttl });
        return true;
    }

    /**
     * Checks if a token has been revoked
     * @param token - The token to verify
     * @returns Promise resolving to true if token is revoked, false otherwise
     */
    static async isTokenRevoked(token: string) {
        const key = this.getTokenKey(token);
        
        if (!RedisClient || !RedisClient.isReady) {
            return false; 
        }

        const result = await RedisClient.get(key);
        return result !== null;
    }
}