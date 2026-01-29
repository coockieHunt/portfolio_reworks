//helpers
import { db } from '../../utils/sqllite.helper';

//shema
import { post_author, posts, postTags, tags } from '../../database/shema'; 

//orm
import { desc, eq, sql, inArray, like, and} from 'drizzle-orm';

//services
import { RedisClient } from '../../services/Redis.service';

//constants
import { AUTHORIZED_REDIS_PREFIXES } from '../../constants/redis.constant';

//helpers
import { validateKey } from '../../utils/redis.helper';
import { writeToLog } from '../../middlewares/log.middlewar';

//config
import cfg from '../../config/default';

//errors
import { NotFoundError, ValidationError } from '../../utils/AppError';


export class BlogHelper {
    /**
     * Generates the Redis cache key for a blog post by slug
     * @param slug - The blog post slug
     * @returns The prefixed Redis cache key
     * @private
     */
    static getCacheKey(slug: string) {
        return `${AUTHORIZED_REDIS_PREFIXES.BLOG_POST}${slug}`;
    }

    /**
     * Validates that an author exists
     * @param authorId - The author ID to validate
     * @throws {NotFoundError} If author doesn't exist
     * @private
     */
    static async validateAuthor(authorId: number) {
        const authorExists = await db
            .select({ id: post_author.id })
            .from(post_author)
            .where(eq(post_author.id, authorId))
            .get();

        if (!authorExists) {
            throw new NotFoundError(`Author with ID ${authorId} not found`);
        }
    }

    /**
     * Validates that all tag IDs exist
     * @param tagIds - Array of tag IDs to validate
     * @throws {ValidationError} If any tag doesn't exist
     * @private
     */
    static async validateTags(tagIds: number[]) {
        if (!tagIds || tagIds.length === 0) return;

        const existingTags = await db
            .select({ id: tags.id })
            .from(tags)
            .where(inArray(tags.id, tagIds))
            .all();

        const foundIds = new Set(existingTags.map(t => t.id));
        const missing = tagIds.filter(id => !foundIds.has(id));

        if (missing.length > 0) {
            throw new ValidationError(`Invalid tag IDs: ${missing.join(',')}`);
        }
    }

    /**
     * Updates post tags associations
     * @param postId - The post ID
     * @param tagIds - Array of tag IDs to associate
     * @private
     */
    static async updatePostTags(postId: number, tagIds?: number[]) {
        await db.delete(postTags).where(eq(postTags.postId, postId));

        if (tagIds && tagIds.length > 0) {
            const tagAssociations = tagIds.map(tagId => ({
                postId: postId,
                tagId: tagId
            }));
            await db.insert(postTags).values(tagAssociations);
        }
    }

    /**
     * Fetches complete post data with author and tags from database
     * @param slug - The blog post slug
     * @returns Promise with post, author, and tags data
     * @throws {NotFoundError} If post not found
     */
    static async fetchAllPost(slug: string) {
        const postResult = await db.select({
            post: posts,
            author: {
                name: post_author.name,
                describ: post_author.describ
            }
        })
        .from(posts)
        .leftJoin(post_author, eq(posts.authorId, post_author.id))
        .where(eq(posts.slug, slug))
        .get();
        
        if (!postResult) {
            throw new NotFoundError(`Post with slug "${slug}" not found`);
        }

        const tagsResults = await db.select({ tag: tags })
            .from(postTags)
            .innerJoin(tags, eq(postTags.tagId, tags.id))
            .where(eq(postTags.postId, postResult.post.id))
            .all();

        return {
            ...postResult,
            tags: tagsResults.map(t => t.tag)
        };
    }

    /**
     * Updates the Redis cache key for a blog post by slug with fresh data
     * @param slug - The blog post slug
     * @returns Promise resolving to true if cache was updated
     * @throws {ValidationError} If Redis client is not connected
     */
    static async updtateCacheKey(slug: string) {
        const key = this.getCacheKey(slug);
        validateKey(key);

        if (!RedisClient || !RedisClient.isReady) {
            throw new ValidationError("Redis client is not connected.");
        }

        try {
            const cacheData = await this.fetchAllPost(slug);
            await RedisClient.setEx(key, cfg.blog.cache_ttl, JSON.stringify(cacheData));
            writeToLog(`BlogService CACHE UPDATE ok slug=${slug}`, 'blog');
            return true;
        } catch (error) {
            console.error(`Error updating cache for slug ${slug}:`, error);
            throw error;
        }
    }

    /**
     * Deletes the cache entry for a specific blog post
     * @param slug - The post slug to remove from cache
     * @returns Promise resolving to true if cache was deleted
     */
    static async deleteCacheBySlug(slug: string) {
        const clearedKey = await this.clearCacheKey(slug);
        const UpdatePostVersion = await this.updtateCacheKey(slug);
        if (clearedKey) {
            if (UpdatePostVersion){
                writeToLog(`BlogService CACHE UPDATE ok slug=${slug}`, 'blog');
            }
            writeToLog(`BlogService CACHE DELETE ok slug=${slug}`, 'blog');
            return clearedKey;
        }else {
            writeToLog(`BlogService CACHE DELETE miss slug=${slug}`, 'blog');
        }
        return clearedKey;
    }

    /**
     * invalidates the Redis cache key for a blog post by slug
     * @param slug 
     * @private
     * @returns number of keys deleted
     */
    static async clearCacheKey(slug: string) {
        const key = BlogHelper.getCacheKey(slug);
        validateKey(key);

        if (!RedisClient || !RedisClient.isReady) {throw new ValidationError("Redis client is not connected.");}

        try {
            const result = await RedisClient.del(key);
            if (result > 0) {
                writeToLog(`BlogService CACHE DELETE ok slug=${slug}`, 'blog');
            }
            return result > 0; 
        } catch (error) {
            console.error(`Error deleting cache for slug ${slug}:`, error);
            throw error;
        }
    }

    static async UpdatePostVersion(slug: string, data: string) {
        const key = `${AUTHORIZED_REDIS_PREFIXES.BLOG_VER}${slug}`;
        validateKey(key);

        if (!RedisClient || !RedisClient.isReady) {
            throw new ValidationError("Redis client is not connected.");
        }

        await RedisClient.setEx(key, cfg.blog.cache_ttl, data);
    }

    static async GetPostVersion(slug: string) {
        const key = `${AUTHORIZED_REDIS_PREFIXES.BLOG_VER}${slug}`;
        validateKey(key);

        if (!RedisClient || !RedisClient.isReady) {
            throw new ValidationError("Redis client is not connected.");
        }

        try {
            const versionData = await RedisClient.get(key);
            return versionData;
        } catch (error) {
            console.error(`Error retrieving post version for slug ${slug}:`, error);
            throw error;
        }
    }
}