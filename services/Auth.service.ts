// services/Auth.service.ts
import { RedisClient } from '../services/Redis.service';
import { AUTHORIZED_REDIS_PREFIXES } from '../constants/redis.constant';
import { validateKey } from '../utils/redis.helper';

export class AuthService {
    private static getTokenKey(token: string) {
        return `${AUTHORIZED_REDIS_PREFIXES.AUTH_TOKEN}${token}`;
    }

    /**
     * Révoque le token en utilisant la durée définie dans le .env
     */
    static async revokeToken(token: string) {
        const key = this.getTokenKey(token);
        validateKey(key);

        if (!RedisClient || !RedisClient.isReady) {
            throw new Error("Redis client is not connected.");
        }

        // On récupère le TTL du .env, avec une valeur de secours (86400)
        const ttl = Number(process.env.TOKEN_TTL_REVOCATION) || 86400;

        // On stocke le token dans Redis avec l'expiration configurée
        await RedisClient.set(key, 'revoked', { EX: ttl });
        return true;
    }

    /**
     * Vérifie si un token est présent dans la blacklist
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