import type {Request, Response} from 'express';
import { BlogService } from '../../services/blog/Blog.service';
import { ProjectsService } from '../../services/projects/Projects.service';
import { TagService } from '../../services/tag/Tag.service';
import { logConsole, writeToLog } from '../../middlewares/log.middlewar';

class workerController {
    public async buildCache(req: Request, res: Response) {
        try {
            const blogData = await BlogService.getAllPosts(1, 5, false);
            const projects = await ProjectsService.getAllProjects(false);
            const tags = await TagService.getAllTags(false);

            const posts = blogData.posts.map((item: any) => {
                const { featuredImage, ...postWithoutImage } = item.post;

                return {
                    ...item,
                    post: postWithoutImage,
                };
            });

            const projectsWithoutImages = projects.map((project: any) => {
                const { gallery, ...projectWithoutImages } = project;

                return projectWithoutImages;
            });

            logConsole('GET', '/worker/cache', 'INFO', 'Worker cache built', {
                posts: posts.length,
                projects: projectsWithoutImages.length,
                tags: tags.tags.length,
            });
            writeToLog(
                `Worker cache built posts=${posts.length} projects=${projectsWithoutImages.length} tags=${tags.tags.length}`,
                'worker'
            );

            return res.success({
                blog: {
                    meta: blogData.meta,
                    posts,
                },
                projects: projectsWithoutImages,
                tags: tags.tags,
            });
        } catch (error) {
            logConsole('GET', '/worker/cache', 'FAIL', 'Failed to build worker cache', { error });
            writeToLog('Worker cache build failed', 'worker');
            return res.error('Failed to build worker cache', 500, error);
        }
    }
}

export default new workerController();