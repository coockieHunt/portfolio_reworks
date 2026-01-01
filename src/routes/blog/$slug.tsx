import React, { useEffect, useMemo, useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { marked } from 'marked'

//containers
import { PostContainer } from '@/containers/_blog/post/post.container.jsx'

//api
import { getBlogPostBySlug } from '@/api/blog.api'

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
})

function RouteComponent() {
    const { slug } = Route.useParams()
    const navigate = useNavigate()

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
    }

    useEffect(() => {
        FetchBlogPostBySlug();
    }, [slug]);

    const htmlContent = useMemo(() => {
        console.log("blogPost in useMemo:", blogPost);
        if (blogPost && blogPost.post && blogPost.post.content) {
            return marked.parse(blogPost.post.content);
        }
        return "";
    }, [blogPost]);

    if (!slug) return <div>No slug provided</div>;

    return (
        <div>
            {isLoading ? (
                <p>Loading blog post...</p>
            ) : blogPost ? (
                <PostContainer
                    title={blogPost.post.title}
                    summary={blogPost.post.summary}
                    
                    content={blogPost.post.content} 
                    
                    featured_image={blogPost.post.featurend_image}
                    
                    author={blogPost.author || { name: 'Unknown', describ: '' }}
                />
            ) : (
                <p>No blog post found.</p>
            )}
        </div>
    )
}