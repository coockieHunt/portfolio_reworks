import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';


// Define the post_author table
export const post_author = sqliteTable('post_author', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').unique().notNull(),
    describ: text('describ').notNull(),
});

// Define the posts table
export const posts = sqliteTable('posts', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    content: text('content').notNull(),
    summary: text('summary'),
    published: integer('published').notNull().default(0),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
    editedAt: integer('edited_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
    
    authorId: integer('author_id')
        .notNull()
        .references(() => post_author.id), 
});