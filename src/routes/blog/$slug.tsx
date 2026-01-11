import React from 'react';
import { createFileRoute } from '@tanstack/react-router';

// api & utils
import { getBlogPostBySlug } from '@/api/blog.api';
import { getOpenGraphUrl } from '@/api/openGraph';
import { getProxyUrl } from '@/utils/image';

// containers
import { PostContainer } from '@/containers/_blog/post/post.container.jsx';

// Types
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
    
    loader: async ({ params }) => {
        
        try {
            const response = await getBlogPostBySlug(params.slug);

            const data = response?.data?.data; 

            if (!data) {
                throw new Error('Post not found');
            }

            return data as BlogPost;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    pendingComponent: () => (
        <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            Loading blog post...
        </div>
    ),
    errorComponent: () => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <p>Oops pas d'article trouvé</p>
        </div>
    )
});

function RouteComponent() {
    const blogPost = Route.useLoaderData();
    const featuredImageUrl = getProxyUrl(blogPost.post.featuredImage) || '';
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    const dynamicOgUrl = getOpenGraphUrl(
        blogPost.post.slug,
        blogPost.post.title,
        blogPost.post.editedAt
    );

    return (
        <>
            <title>{blogPost.post.title} | Mon Portfolio</title>
            <meta name="description" content={blogPost.post.summary} />
            
            <meta property="og:type" content="article" />
            <meta property="og:title" content={blogPost.post.title} />
            <meta property="og:description" content={blogPost.post.summary} />
            
            <meta property="og:image" content={dynamicOgUrl} />
            <meta property="og:url" content={currentUrl} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={blogPost.post.title} />
            <meta name="twitter:description" content={blogPost.post.summary} />
            <meta name="twitter:image" content={dynamicOgUrl} />

            <PostContainer
                title={blogPost.post.title}
                summary={blogPost.post.summary}
                content={blogPost.post.content}
                featured_image={featuredImageUrl}
                author={blogPost.author || { name: 'Unknown', describ: '' }}
            />
        </>
    );
}

