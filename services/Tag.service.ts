import { db } from '../utils/sqllite.helper';
import { tags } from '../database/shema';
import { eq } from 'drizzle-orm';
import { NotFoundError, ValidationError } from '../utils/AppError';

export class TagService {
    /**
     * get all tags with their links to posts
     * @returns all tags with metadata
     */
    static async getAllTags() {
        const result = await db.query.tags.findMany({
            with: {postTags: true},
        });

        const tags = result.map(tag => ({
            id: tag.id,
            name: tag.name,
            slug: tag.slug,
            color: tag.color,
            postIds: tag.postTags.map(pt => pt.postId)
        }));

        return {
            meta: {
                total_count: tags.length,
            },
            tags
        };
    }

    /**
     * get a tag by its slug
     * @param slug - the slug of the tag
     * @returns the tag with metadata
     */
    static async getTagBySlug(slug: string) {
        const tag = await db.query.tags.findFirst({
            where: (tags, { eq }) => eq(tags.slug, slug),
            with: { postTags: true },
        });

        if (!tag) {
            throw new NotFoundError(`Tag with slug "${slug}" not found`);
        }

        return {
            id: tag.id,
            name: tag.name,
            slug: tag.slug,
            color: tag.color,
            postIds: tag.postTags.map(pt => pt.postId)
        };
    }

    /**
     * delete a tag by its slug
     * @param slug - the slug of the tag
     * @returns true if deleted, false otherwise
     */
    static async deleteTagBySlug(slug: string) {
        const tag = await db.query.tags.findFirst({
            where: (tags, { eq }) => eq(tags.slug, slug),
        });

        if (!tag) {
            return false;
        }

        await db.delete(tags).where(eq(tags.id, tag.id));

        return true;
    }

    /**
     * create a new tag
     * @param name - the name of the tag
     * @param slug - the slug of the tag
     * @param color - the color of the tag
     * @returns the created tag
     */
    static async createTag(name: string, slug: string, color: string) {
        const newTag = await db.insert(tags).values({
            name,
            slug,
            color
        });

        return newTag;
    }

    /**
     * update a tag by its slug
     * @param slug - the slug of the tag
     * @param updateData - the data to update (name and/or color)
     * @returns the updated tag or throws NotFoundError if not found
     */
    static async updateTagBySlug(slug: string, updateData: { name?: string; color?: string }) {
        const tag = await db.query.tags.findFirst({
            where: (tags, { eq }) => eq(tags.slug, slug),
        });

        if (!tag) {
            throw new NotFoundError(`Tag with slug "${slug}" not found`);
        }

        if (!updateData.name && !updateData.color) {
            throw new ValidationError('At least one field (name or color) must be provided');
        }

        const updatedTag = await db.update(tags)
            .set(updateData)
            .where(eq(tags.id, tag.id))
            .returning()
            .get();

        return updatedTag;
    }
}

