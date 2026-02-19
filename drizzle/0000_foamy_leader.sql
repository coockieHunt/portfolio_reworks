CREATE TABLE IF NOT EXISTS `post_tags` (
	`post_id` integer NOT NULL,
	`tag_id` integer NOT NULL,
	PRIMARY KEY(`post_id`, `tag_id`),
	FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `post_author` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`describ` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `post_author_name_unique` ON `post_author` (`name`);--> statement-breakpoint
INSERT INTO post_author (name, describ)
SELECT 'Jonathan', 'Développeur, curieux insatiable, je glisse entre lignes de code et questions sans fin, explorant autant ce qui se programme que ce qui échappe à toute algorithme.'
WHERE NOT EXISTS (
	SELECT 1 FROM post_author WHERE name = 'Jonathan'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`featured_image` text,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`content` text NOT NULL,
	`summary` text,
	`published` integer DEFAULT 0 NOT NULL,
	`indexed` integer DEFAULT 0 NOT NULL,
	`created_at` integer,
	`edited_at` integer,
	`author_id` integer NOT NULL,
	FOREIGN KEY (`author_id`) REFERENCES `post_author`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `posts_slug_unique` ON `posts` (`slug`);--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`tab_name` text NOT NULL,
	`description` text NOT NULL,
	`content` text NOT NULL,
	`stacks` text NOT NULL,
	`url_github` text NOT NULL,
	`url_project` text,
	`published` integer DEFAULT 0 NOT NULL,
	`gallery` text DEFAULT '[]' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `tags` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`color` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `tags_slug_unique` ON `tags` (`slug`);