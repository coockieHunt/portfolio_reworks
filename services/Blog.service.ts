//helpers
import { db } from '../utils/sqllite.helper';

//shema
import { post_author, posts } from '../database/shema'; 

//orm
import { desc, eq, sql } from 'drizzle-orm';

//services
import { RedisClient } from '../services/Redis.service';

//constants
import { AUTHORIZED_REDIS_PREFIXES } from '../constants/redis.constant';

//helpers
import { withCache } from '../utils/cache.helper'; 
import { validateKey } from '../utils/redis.helper';
import { writeToLog } from '../middlewares/log.middlewar';

//config
import cfg from '../config/default';

/**
 * Blog Service
 * 
 * Handles all blog post operations including CRUD operations and caching.
 * Integrates with SQLite database and Redis cache for optimal performance.
 * Manages blog post lifecycle from creation to deletion with automatic cache invalidation.
 */
export class BlogService {
    /**
     * Generates the Redis cache key for a blog post by slug
     * @param slug - The blog post slug
     * @returns The prefixed Redis cache key
     * @private
     */
    private static getCacheKey(slug: string) {
        return `${AUTHORIZED_REDIS_PREFIXES.BLOG_POST}${slug}`;
    }

    /**
     * Retrieves all blog posts with pagination
     * @param page - Page number (default: 1)
     * @param limit - Number of posts per page (default: 20)
     * @returns Promise with paginated posts and metadata
     */
    static async getAllPosts(page: number = 1, limit: number = 20) {
        const offset = (page - 1) * limit;

        const totalCountResult = await db.select({ count: sql<number>`count(*)` }).from(posts).get();
        const totalCount = totalCountResult ? totalCountResult.count : 0;

        const results = await 
            db.select({
                post: posts,
                author: {
                    name: post_author.name,
                }
            })
                .from(posts)
                .orderBy(desc(posts.createdAt))
                .leftJoin(post_author, eq(posts.authorId, post_author.id))
                .limit(limit)
                .offset(offset)
                .all();
        
        return {
            meta: {
                total_count: totalCount,
                page: page,
                limit: limit,
                total_pages: Math.ceil(totalCount / limit)
            },
            posts: results
        };
    }

    /**
     * Retrieves blog posts using offset-based pagination
     * @param min - Minimum offset position (default: 1)
     * @param max - Maximum offset position (default: 100)
     * @returns Promise with posts and cursor metadata
     */
    static async getPostOffset(min: number = 1, max: number = 100) {
        const limit = max - min + 1;
        const offset = min - 1;

        const results = await db
            .select({
                post: posts,
                author: {
                    name: post_author.name,
                }
            })
            .from(posts)
            .orderBy(desc(posts.createdAt))
            .leftJoin(post_author, eq(posts.authorId, post_author.id))
            .limit(limit)
            .offset(offset)
            .all();
        
        return {
            meta: {
                cursor_start: min,
                cursor_end: min + results.length,
            },
            posts: results
        };
    }

    /**
     * Retrieves a single blog post by its slug with caching
     * @param slug - The unique slug identifier for the post
     * @returns Promise with post data and cache status
     */
    static async getPostBySlug(slug: string) {
        const data = await withCache(this.getCacheKey(slug), async () => 
            db.select({
                post: posts,
                author: {
                    name: post_author.name,
                    describ: post_author.describ
                }
            })
                .from(posts)
                .leftJoin(post_author, eq(posts.authorId, post_author.id)) 
                .where(eq(posts.slug, slug))
                .get(),
            cfg.blog.cache_ttl
        );

        if (!data.cached && data.data) {
            writeToLog(`BlogService CACHE CREATE ok slug=${slug}`, 'blog');
        }

        return data;
    }

    /**
     * Creates a new blog post
     * @param data - Post data including title, content, summary, and author ID
     * @returns Promise with the newly created post
     */
    static async createPost(data: { title: string; slug?: string; content: string; summary?: string, authorId: number; }) {
        const slug = data.slug || data.title.toLowerCase().replace(/ /g, '-');
        return await db.insert(posts).values({ ...data, slug}).returning().get();
    }

    /**
     * Updates an existing blog post and invalidates its cache
     * @param slug - The post slug to update
     * @param updateData - Partial post data to update
     * @returns Promise with updated post or null if not found
     */
    static async updatePostBySlug(slug: string, updateData: { title?: string; content?: string; summary?: string; editedAt?: Date; authorId?: number; }) {
        const key = this.getCacheKey(slug);
        validateKey(key);

        updateData.editedAt = new Date();

        const updatedPost =  await db.update(posts)
            .set(updateData)
            .where(eq(posts.slug, slug))
            .returning()
            .get();

        if (updatedPost) {
            try {
                await this.deleteCacheBySlug(slug);
            } catch (error) {
                console.error(`Failed to delete cache for slug ${slug} after update`, error);
            }
            return updatedPost;
        }
        return null;
    }

    /**
     * Updates the published status of a blog post
     * @param slug - The post slug to update
     * @param publish - True to publish, false to unpublish
     * @returns Promise with updated post or null if not found
     */
    static async publishedPostBySlug(slug: string, publish: boolean) {
        const key = this.getCacheKey(slug);
        validateKey(key);

        const updatedPost =  await db.update(posts)
            .set({ published: publish ? 1 : 0, editedAt: new Date() })
            .where(eq(posts.slug, slug))
            .returning()
            .get();


        if (updatedPost) {
            try {
                await this.deleteCacheBySlug(slug);
            } catch (error) {
                console.error(`Failed to delete cache for slug ${slug} after publish update`, error);
            }
            return updatedPost;
        }
        return null;
    }

    /**
     * Deletes a blog post by slug and removes its cache
     * @param slug - The post slug to delete
     * @returns Promise resolving to true if deleted, false otherwise
     */
    static async deletePostBySlug(slug: string) {
        const key = this.getCacheKey(slug);
        validateKey(key);

        const deletedPost = await db.delete(posts).where(eq(posts.slug, slug)).returning().get();
        
        if (deletedPost) {
            try {
                await this.deleteCacheBySlug(slug);
            } catch (error) {
                console.error(`Failed to delete cache for slug ${slug} after DB deletion`, error);
            }
            return true;
        }
        return false;
    }

    /**
     * Deletes the cache entry for a specific blog post
     * @param slug - The post slug to remove from cache
     * @returns Promise resolving to true if cache was deleted
     * @throws {Error} If Redis client is not connected
     */
    static async deleteCacheBySlug(slug: string) {
        const key = this.getCacheKey(slug);
        validateKey(key);

        if (!RedisClient || !RedisClient.isReady) {throw new Error("Redis client is not connected.");}

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

    /**
     * Clears all blog post cache entries from Redis
     * Uses SCAN operation to safely remove all matching keys
     * @returns Promise that resolves when all cache is cleared
     * @throws {Error} If Redis client is not connected
     */
    static async clearAllCache() {
        if (!RedisClient || !RedisClient.isReady) {throw new Error("Redis client is not connected.");}
        
        try {
            let cursor = '0';
            do {
                const reply = await RedisClient.scan(cursor, { MATCH: this.getCacheKey('*'), COUNT: 100 });
                cursor = reply.cursor;
                const keys = reply.keys;

                if (keys.length > 0) {
                    await RedisClient.del(keys);
                    writeToLog(`BlogService CACHE CLEAR batch count=${keys.length}`, 'blog');
                }
            } while (cursor !== '0');
        } catch (error) {
            console.error("Error clearing all blog post caches:", error);
            throw error;
        }
    }   
}