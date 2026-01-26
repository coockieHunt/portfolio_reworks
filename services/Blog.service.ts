//helpers
import { db } from '../utils/sqllite.helper';

//shema
import { post_author, posts, postTags, tags } from '../database/shema'; 

//orm
import { desc, eq, sql, inArray, like, and} from 'drizzle-orm';

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

//errors
import { NotFoundError, ValidationError } from '../utils/AppError';

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
        const fetchFromDb = async () => {
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
            
            if (!postResult) throw new NotFoundError(`Post with slug "${slug}" not found`);

            if (!isAuthenticated && postResult.post.published === 0) {
                throw new NotFoundError(`Post with slug "${slug}" is not published`);
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
        };
    
        if (isAuthenticated) {
           
            const result = await fetchFromDb();
            return { 
                data: result, 
                cached: false
            };
        } else {
           
            const result = await fetchFromDb(); 
            
            if (result.post.published === 1) {
                try {
                    const cached = await withCache(
                        this.getCacheKey(slug),
                        async () => result,
                        cfg.blog.cache_ttl
                    );
                    if (!cached.cached) {
                        writeToLog(`BlogService CACHE CREATE ok slug=${slug}`, 'blog');
                    }
                    return cached;
                } catch (cacheError) {
                    console.error(`Cache error for slug ${slug}:`, cacheError);
                    return { data: result, cached: false };
                }
            }
            
            return { data: result, cached: false };
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

        const authorExists = await db
            .select({ id: post_author.id })
            .from(post_author)
            .where(eq(post_author.id, postData.authorId))
            .get();

        if (!authorExists) {
            throw new Error('INVALID_AUTHOR');
        }

        if (tagIds && tagIds.length > 0) {
            const existingTags = await db
                .select({ id: tags.id })
                .from(tags)
                .where(inArray(tags.id, tagIds))
                .all();

            const foundIds = new Set(existingTags.map(t => t.id));
            const missing = tagIds.filter(id => !foundIds.has(id));

            if (missing.length > 0) {
                throw new Error(`INVALID_TAG_IDS:${missing.join(',')}`);
            }
        }
        
        const newPost = await db.insert(posts).values({ ...postData, slug, indexed: data.indexed ?? 0, published: data.published ?? 0 }).returning().get();
        
        if (tagIds && tagIds.length > 0 && newPost) {
            const tagAssociations = tagIds.map(tagId => ({
                postId: newPost.id,
                tagId: tagId
            }));
            await db.insert(postTags).values(tagAssociations);
        }
        
        return newPost;
    }

    /**
     * Updates an existing blog post and invalidates its cache
     * @param slug - The post slug to update
     * @param updateData - Partial post data to update, including optional tags and optional featuredImage
     * @returns Promise with updated post or null if not found
     */
    static async updatePostBySlug(slug: string, updateData: { title?: string; content?: string; summary?: string; editedAt?: Date; authorId?: number; tagIds?: number[]; featuredImage?: string; indexed?: number; published?: number; slug?: string; }) {
        const key = this.getCacheKey(slug);
        validateKey(key);

        if (updateData.authorId) {
             const authorExists = await db
            .select({ id: post_author.id })
            .from(post_author)
            .where(eq(post_author.id, updateData.authorId))
            .get();

            if (!authorExists) {
                throw new NotFoundError(`Author with ID ${updateData.authorId} not found`);
            }
        }

        if (updateData.tagIds && updateData.tagIds.length > 0) {
            const existingTags = await db
                .select({ id: tags.id })
                .from(tags)
                .where(inArray(tags.id, updateData.tagIds))
                .all();

            const foundIds = new Set(existingTags.map(t => t.id));
            const missing = updateData.tagIds.filter(id => !foundIds.has(id));

            if (missing.length > 0) {
                throw new ValidationError(`Invalid tag IDs: ${missing.join(',')}`);
            }
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
            await db.delete(postTags).where(eq(postTags.postId, updatedPost.id));
            
            if (tagIds.length > 0) {
                const tagAssociations = tagIds.map(tagId => ({
                    postId: updatedPost.id,
                    tagId: tagId
                }));
                await db.insert(postTags).values(tagAssociations);
            }
        }
        
        try {
            await this.deleteCacheBySlug(slug);
        } catch (error) {
            console.error(`Failed to delete cache for slug ${slug} after update`, error);
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
        const key = this.getCacheKey(slug);
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
            await this.deleteCacheBySlug(slug);
        } catch (error) {
            console.error(`Failed to delete cache for slug ${slug} after publish update`, error);
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
        const key = this.getCacheKey(slug);
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
            await this.deleteCacheBySlug(slug);
        } catch (error) {
            console.error(`Failed to delete cache for slug ${slug} after indexed update`, error);
        }
        return updatedPost;
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
        
        if (!deletedPost) {
            throw new NotFoundError(`Post with slug "${slug}" not found`);
        }

        try {
            await this.deleteCacheBySlug(slug);
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