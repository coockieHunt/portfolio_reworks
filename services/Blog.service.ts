//helpers
import { db } from '../utils/sqllite.helper.ts';

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
import cfg from '../config/default.ts';
import { authUid } from 'drizzle-orm/neon';

/**
 ** Service class for managing blog posts.
*/
export class BlogService {
    private static getCacheKey(slug: string) {
        return `${AUTHORIZED_REDIS_PREFIXES.BLOG_POST}${slug}`;
    }

    // GET
    static async getAllPosts(page: number = 1, limit: number = 20) {
        const offset = (page - 1) * limit;

        // Get total count
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

    // POST
    static async createPost(data: { title: string; slug?: string; content: string; summary?: string, authorId: number; }) {
        const slug = data.slug || data.title.toLowerCase().replace(/ /g, '-');
        return await db.insert(posts).values({ ...data, slug}).returning().get();
    }

    // PUT
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

    // DELETE
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