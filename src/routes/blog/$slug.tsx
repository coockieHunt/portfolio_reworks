import React, { Suspense, useMemo } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { getBlogPostBySlug } from '@/api/blog.api';
import { useDocumentMeta } from '@/hooks/useDocumentMeta.hook';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://jonathangleyze.fr';
import { getOpenGraphUrl } from '@/api/openGraph';
import { getProxyUrl } from '@/utils/image';

import { GlobalLoader } from '@/components/Loading/GlobalLoader.compenent'; 
import { INavItem, NavigationComponent } from '@/containers/_root/Navigation/navigations.container';

const PostContainer = React.lazy(() => 
    import('@/containers/_blog/post/post.container.jsx').then(module => ({
        default: module.PostContainer
    }))
);

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
            const data = response?.data; 
            
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
            <GlobalLoader />
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
    const currentUrl = `${SITE_URL}/blog/${blogPost.post.slug}`;

    const dynamicOgUrl = getOpenGraphUrl(
        blogPost.post.slug,
        blogPost.post.title,
        blogPost.post.editedAt
    );

    // Meta tags pour SEO
    const metaTags = useMemo(() => [
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: blogPost.post.title },
        { property: 'og:description', content: blogPost.post.summary },
        { property: 'og:image', content: dynamicOgUrl },
        { property: 'og:url', content: currentUrl },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: blogPost.post.title },
        { name: 'twitter:description', content: blogPost.post.summary },
        { name: 'twitter:image', content: dynamicOgUrl },
    ], [blogPost.post.title, blogPost.post.summary, dynamicOgUrl, currentUrl]);

    const navigation: INavItem[] = [
        {
            display : 'Retour au blog', 
            to: '/blog', 
            type: "route"
        }
        
    ];


    useDocumentMeta({
        title: `${blogPost.post.title} | Jonathan Gleyze`,
        description: blogPost.post.summary,
        meta: metaTags,
    });
    

    return (
        <>
            <NavigationComponent navConfig={navigation} background={true}/>
        
            <Suspense fallback={<div style={{ minHeight: '500px' }}><GlobalLoader /></div>}>
                <PostContainer
                    title={blogPost.post.title}
                    summary={blogPost.post.summary}
                    content={blogPost.post.content}
                    featured_image={featuredImageUrl}
                    author={blogPost.author || { name: 'Unknown', describ: '' }}
                    last_update={blogPost.post.editedAt}
                    created_at={blogPost.post.createdAt}
                />
            </Suspense>
        </>
    );
}