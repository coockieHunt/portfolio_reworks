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
import { withCache } from '../../utils/cache.helper'; 
import { validateKey } from '../../utils/redis.helper';
import { writeToLog } from '../../middlewares/log.middlewar';

//config
import cfg from '../../config/default';

//errors
import { NotFoundError, ValidationError } from '../../utils/AppError';

//helpers
import {BlogHelper} from './Blog.helper';

export class BlogService {
    /**
     * Fetches all post data with author and tags from database
     * @param slug - The blog post slug
     * @returns Promise with post, author, and tags data
     * @throws {NotFoundError} If post not found
     * @private
     */
    private static async fetchAllPost(slug: string) {
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
     * @throws {Error} If Redis client is not connected or update fails
     * @private
     */
    private static async updtateCacheKey(slug: string) {
        const key = BlogHelper.getCacheKey(slug);
        validateKey(key);

        if (!RedisClient || !RedisClient.isReady) {
            throw new ValidationError("Redis client is not connected.");
        }

        try {
            const cacheData = await BlogHelper.fetchAllPost(slug);
            await RedisClient.setEx(key, cfg.blog.cache_ttl, JSON.stringify(cacheData));
            writeToLog(`BlogService CACHE UPDATE ok slug=${slug}`, 'blog');
            return true;
        } catch (error) {
            console.error(`Error updating cache for slug ${slug}:`, error);
            throw error;
        }
    }
    

    /**
     * Retrieves all blog posts with pagination
     * @param page - Page number (default: 1)
     * @param limit - Number of posts per page (default: 20)
     * @returns Promise with paginated posts and metadata
     */
    static async getAllPosts(page: number = 1, limit: number = 20, isAuthenticated: boolean = false) {
        const offset = (page - 1) * limit;

        const visibilityFilter = isAuthenticated ? undefined : eq(posts.published, 1);

        const totalCountResult = await db
            .select({ count: sql<number>`count(*)` })
            .from(posts)
            .where(visibilityFilter)
            .get();
        const totalCount = totalCountResult ? totalCountResult.count : 0;

        const postsResults = await db.select({
            post: posts,
            author: {
                name: post_author.name,
            }
        })
        .from(posts)
        .where(visibilityFilter)
        .orderBy(desc(posts.createdAt))
        .leftJoin(post_author, eq(posts.authorId, post_author.id))
        .limit(limit)
        .offset(offset)
        .all();


        let tagsResults: Array<{ postId: number, tag: typeof tags.$inferSelect }> = [];
        if (postsResults.length > 0) {
            const postIds = postsResults.map(r => r.post.id);
            tagsResults = await db.select({
                postId: postTags.postId,
                tag: tags
            })
            .from(postTags)
            .innerJoin(tags, eq(postTags.tagId, tags.id))
            .where(inArray(postTags.postId, postIds))
            .all();
        }

        const results = postsResults.map(postResult => ({
            ...postResult,
            tags: tagsResults.filter(t => t.postId === postResult.post.id).map(t => t.tag)
        }));

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
     * @param tagsToFilter - Array of tag slugs to filter by (default: [])
     * @param titleContains - Substring that the title must contain (default: '')
     * @param onlyPublished - Whether to include only published posts (default: true)
     * @returns Promise with posts and cursor metadata
     */
    static async getPostOffset(
        min: number = 1, 
        max: number = 100, 
        tagsToFilter: string[] = [],
        titleContains: string = '',
        onlyPublished: boolean = true
    ) {
        const limit = max - min + 1;
        const offset = min - 1;
        const filters = [];
    
        if (titleContains) {
            filters.push(like(posts.title, `%${titleContains}%`)); 
        }
    
        if (tagsToFilter.length > 0) {
            const postsWithTagsSubquery = db
                .select({ postId: postTags.postId })
                .from(postTags)
                .innerJoin(tags, eq(postTags.tagId, tags.id))
                .where(inArray(tags.slug, tagsToFilter));
    
            filters.push(inArray(posts.id, postsWithTagsSubquery));
        }
    
        const postsResults = await db
            .select({
                post: posts,
                author: {
                    name: post_author.name,
                }
            })
            .from(posts)
            .leftJoin(post_author, eq(posts.authorId, post_author.id))
            .where(
                and(
                    ...filters, 
                    onlyPublished ? eq(posts.published, 1) : undefined 
                )
            )
            .orderBy(desc(posts.createdAt))
            .limit(limit)
            .offset(offset)
            .all();
        
        let tagsResults: Array<{ postId: number, tag: typeof tags.$inferSelect }> = [];

        if (postsResults.length > 0) {
            const postIds = postsResults.map(r => r.post.id);
            tagsResults = await db.select({
                postId: postTags.postId,
                tag: tags
            })
            .from(postTags)
            .innerJoin(tags, eq(postTags.tagId, tags.id))
            .where(inArray(postTags.postId, postIds))
            .all();
        }
    
        const results = postsResults.map(postResult => ({
            ...postResult,
            tags: tagsResults.filter(t => t.postId === postResult.post.id).map(t => t.tag)
        }));
    
        return {
            meta: {
                cursor_start: min,
                cursor_end: min + results.length,
                requested_limit: limit
            },
            posts: results
        };
    }

    /**
     * Retrieves a single blog post by its slug with caching
     * @param slug - The unique slug identifier for the post
     * @param isAuthenticated - Whether the requester is authenticated (true) or a guest (false)
     * @returns Promise with post data and cache status
     */
    static async getPostBySlug(slug: string, isAuthenticated: boolean) {
        if (isAuthenticated) {
            const result = await BlogHelper.fetchAllPost(slug);
            return { 
                data: result, 
                cached: false
            };
        }
        
        try {
            const cached = await withCache(
                BlogHelper.getCacheKey(slug),
                async () => {
                    const result = await BlogHelper.fetchAllPost(slug);
                    
                    if (result.post.published === 0) {
                        throw new NotFoundError(`Post with slug "${slug}" is not published`);
                    }
                    
                    return result;
                },
                cfg.blog.cache_ttl
            );
            
            if (!cached.cached) {
                writeToLog(`BlogService CACHE CREATE ok slug=${slug}`, 'blog');
            } else {
                writeToLog(`BlogService CACHE HIT slug=${slug}`, 'blog');
            }
            
            return cached;
        } catch (error) {
            console.error(`Error retrieving post by slug ${slug}:`, error);
            throw error;
        }
    }

    /**
     * Creates a new blog post
     * @param data - Post data including title, content, summary, author ID, optional tags, and optional featuredImage
     * @returns Promise with the newly created post
     */
    static async createPost(data: { title: string; slug?: string; content: string; summary?: string, authorId: number; tagIds?: number[]; featuredImage?: string; indexed?: number; published?: number; }) {
        const slug = data.slug || data.title.toLowerCase().replace(/ /g, '-');
        const { tagIds, ...postData } = data;

        await BlogHelper.validateAuthor(postData.authorId);
        await BlogHelper.validateTags(tagIds || []);

        const existingSlug = await db
            .select({ slug: posts.slug })
            .from(posts)
            .where(eq(posts.slug, slug))
            .get();

        if (existingSlug) {
            throw new ValidationError(`Post with slug "${slug}" already exists`);
        }
        
        const newPost = await db.insert(posts).values({ ...postData, slug, indexed: data.indexed ?? 0, published: data.published ?? 0 }).returning().get();
        
        if (!newPost) {
            throw new ValidationError('Failed to create post in database');
        }

        await BlogHelper.updatePostTags(newPost.id, tagIds);

        if (newPost.published === 1) {
            try {
                await BlogHelper.updtateCacheKey(slug);
                writeToLog(`BlogService CREATE POST ok slug=${slug} cached=true`, 'blog');
            } catch (error) {
                console.error(`Failed to create cache for new post slug=${slug}:`, error);
                writeToLog(`BlogService CREATE POST ok slug=${slug} cached=false (cache error)`, 'blog');
            }
        } else {
            writeToLog(`BlogService CREATE POST ok slug=${slug} published=false`, 'blog');
        }

        return newPost;
    }

    /**
     * Updates an existing blog post and updates its cache
     * @param slug - The post slug to update
     * @param updateData - Partial post data to update, including optional tags and optional featuredImage
     * @returns Promise with updated post or null if not found
     */
    static async updatePostBySlug(slug: string, updateData: { title?: string; content?: string; summary?: string; editedAt?: Date; authorId?: number; tagIds?: number[]; featuredImage?: string; indexed?: number; published?: number; slug?: string; }) {
        const key = BlogHelper.getCacheKey(slug);
        validateKey(key);

        if (updateData.authorId) {
            await BlogHelper.validateAuthor(updateData.authorId);
        }

        if (updateData.tagIds) {
            await BlogHelper.validateTags(updateData.tagIds);
        }

        updateData.editedAt = new Date();
        const { tagIds, ...postUpdateData } = updateData;

        const updatedPost =  await db.update(posts)
            .set(postUpdateData)
            .where(eq(posts.slug, slug))
            .returning()
            .get();

        if (!updatedPost) {
            throw new NotFoundError(`Post with slug "${slug}" not found`);
        }

        if (tagIds !== undefined) {
            await BlogHelper.updatePostTags(updatedPost.id, tagIds);
        }
        
        try {
            await BlogHelper.updtateCacheKey(slug);
        } catch (error) {
            console.error(`Failed to update cache for slug ${slug} after update`, error);
        }
        return updatedPost;
    }

    /**
     * Updates the published status of a blog post
     * @param slug - The post slug to update
     * @param publish - True to publish, false to unpublish
     * @returns Promise with updated post or null if not found
     */
    static async publishedPostBySlug(slug: string, publish: boolean) {
        const key = BlogHelper.getCacheKey(slug);
        validateKey(key);

        const updatedPost =  await db.update(posts)
            .set({ published: publish ? 1 : 0, editedAt: new Date() })
            .where(eq(posts.slug, slug))
            .returning()
            .get();

        if (!updatedPost) {
            throw new NotFoundError(`Post with slug "${slug}" not found`);
        }

        try {
            await BlogHelper.updtateCacheKey(slug);
        } catch (error) {
            console.error(`Failed to update cache for slug ${slug} after publish update`, error);
        }
        return updatedPost;
    }

    /**
     * Updates the indexed status of a blog post
     * @param slug - The post slug to update
     * @param indexed - 0 or 1 to set indexed status
     * @returns Promise with updated post or null if not found
     */
    static async indexedPostBySlug(slug: string, indexed: number) {
        const key = BlogHelper.getCacheKey(slug);
        validateKey(key);

        const updatedPost =  await db.update(posts)
            .set({ indexed: indexed, editedAt: new Date() })
            .where(eq(posts.slug, slug))
            .returning()
            .get();

        if (!updatedPost) {
            throw new NotFoundError(`Post with slug "${slug}" not found`);
        }

        try {
            await BlogHelper.updtateCacheKey(slug);
        } catch (error) {
            console.error(`Failed to update cache for slug ${slug} after indexed update`, error);
        }
        return updatedPost;
    }

    /**
     * Deletes a blog post by slug and removes its cache
     * @param slug - The post slug to delete
     * @returns Promise resolving to true if deleted, false otherwise
     */
    static async deletePostBySlug(slug: string) {
        const key = BlogHelper.getCacheKey(slug);
        validateKey(key);

        const deletedPost = await db.delete(posts).where(eq(posts.slug, slug)).returning().get();
        
        if (!deletedPost) {
            throw new NotFoundError(`Post with slug "${slug}" not found`);
        }

        try {
            await BlogHelper.deleteCacheBySlug(slug);
        } catch (error) {
            console.error(`Failed to delete cache for slug ${slug} after DB deletion`, error);
        }
        return true;
    }

    /**
     * Deletes the cache entry for a specific blog post
     * @param slug - The post slug to remove from cache
     * @returns Promise resolving to true if cache was deleted
     * @throws {Error} If Redis client is not connected
     */
    static async deleteCacheBySlug(slug: string) {
        const clearedKey = await (new BlogService()).clearCacheKey(slug);
        if (clearedKey) {
            writeToLog(`BlogService CACHE DELETE ok slug=${slug}`, 'blog');
            return clearedKey;
        }else {
            writeToLog(`BlogService CACHE DELETE miss slug=${slug}`, 'blog');
        }
        return clearedKey;
    }

    /**
     * Clears all blog post cache entries from Redis
     * @returns Promise with clearing statistics (total keys cleared, batches processed)
     * @throws {Error} If Redis client is not connected
     */
    static async clearAllCache() {
        if (!RedisClient || !RedisClient.isReady) {
            throw new ValidationError("Redis client is not connected.");
        }
        
        try {
            let cursor = '0';
            let totalKeysCleared = 0;
            let batchCount = 0;
            const keysDeleted: string[] = [];

            do {
                const reply = await RedisClient.scan(cursor, { MATCH: BlogHelper.getCacheKey('*'), COUNT: 100 });
                cursor = reply.cursor;
                const keys = reply.keys;

                if (keys.length > 0) {
                    await RedisClient.del(keys);
                    totalKeysCleared += keys.length;
                    batchCount++;
                    keysDeleted.push(...keys);
                    writeToLog(`BlogService CACHE CLEAR batch #${batchCount} count=${keys.length}`, 'blog');
                }
            } while (cursor !== '0');

            writeToLog(`BlogService CACHE CLEAR complete total=${totalKeysCleared} batches=${batchCount}`, 'blog');
            
            return {
                status: 'success',
                total_keys_cleared: totalKeysCleared,
                keys_deleted: keysDeleted,
                batches_processed: batchCount
            };
        } catch (error) {
            console.error("Error clearing all blog post caches:", error);
            throw error;
        }
    }   
}