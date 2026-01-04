import React, { useEffect, useMemo, useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

//containers
import { PostContainer } from '@/containers/_blog/post/post.container.jsx';

//api
import { getBlogPostBySlug } from '@/api/blog.api';

interface Author {
    name: string;
    describ: string;
}

interface PostContent {
    title: string;
    summary: string;
    content: string;
    featurend_image: string;
    author?: Author;
}

interface BlogPost {
    post: PostContent;
    author?: Author;
}

export const Route = createFileRoute('/blog/$slug')({
    component: RouteComponent,
});

function RouteComponent() {
    const { slug } = Route.useParams();

    const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const FetchBlogPostBySlug = async () => {
        if (!slug) return;

        try {
            const response = await getBlogPostBySlug(slug);
            const dataPost = response?.data || [];

            setBlogPost(dataPost.data || null);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        FetchBlogPostBySlug();
    }, [slug]);

    if (!slug) return <div>no slug</div>;

    return (
        <div>
            {isLoading ? (
                <p
                    style={{
                        height: "100vh",
                        width: "100vw",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >Loading blog post...</p>
            ) : blogPost ? (
                <PostContainer
                    title={blogPost.post.title}
                    summary={blogPost.post.summary}
                    content={blogPost.post.content}
                    featured_image={blogPost.post.featurend_image}
                    author={blogPost.author || { name: 'Unknown', describ: '' }}
                />
            ) : (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '50vh',
                    }}
                >
                    <p>Oops pas d'article trouvé</p>
                </div>
            )}
        </div>
    );
}
