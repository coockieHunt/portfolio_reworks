import React, { useMemo } from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router';

import { getBlogPostBySlug } from '@/api/service/blog.api';
import { useDocumentMeta } from '@/hooks/useDocumentMeta.hook';

const SITE_URL = import.meta.env.VITE_FRONT_SITE_URL || 'https://jonathangleyze.fr';
import { getOpenGraphUrl } from '@/api/service/openGraph';
import { getProxyUrl } from '@/utils/image';

import { ArrowBigLeftDash } from 'lucide-react';

import { GlobalLoader } from '@/components/Loading/GlobalLoader.compenent'; 
import { INavItem, NavigationComponent } from '@/containers/_root/Navigation/navigations.container';
import { Button } from '@/components/Button/Button';

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
        const slug = params.slug?.trim();
        if (!slug || slug === 'blog') {
            throw redirect({ to: '/blog' });
        }

        try {
            const response = await getBlogPostBySlug(slug);
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
        <div>
            <GlobalLoader text="Chargement de l'article..." />
        </div>
    ),
    
    errorComponent: () => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', flexDirection: 'column', gap: '20px' }}>
            <p style={{
                fontSize: "2rem",
            }}><span className='font_dot' style={{ fontWeight: 'bold', color:('var(--primary)') }}>Oops</span> pas d'article trouvé</p>
            <Button onClick={() => window.history.back()}>Retour au blog</Button>
        </div>
    )
});

function RouteComponent() {
    const blogPost = Route.useLoaderData();
    const featuredImageUrl = getProxyUrl(blogPost.post.featuredImage) || '';
    const currentUrl = `${SITE_URL}/blog/${blogPost.post.slug}`;

    const dynamicOgUrl = getOpenGraphUrl({
        slug: blogPost.post.slug,
        title: blogPost.post.title,
        author: blogPost.author?.name || '',
        lastEdit: blogPost.post.editedAt
    });


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
            display : 'Accueil', 
            to: '/', 
            type: "route"
        },
        {
            type: "spacer"
        },
        {
            display : 'Retour au blog', 
            to: '/blog', 
            type: "route",
            icon: <ArrowBigLeftDash />
        }
        
    ];


    useDocumentMeta({
        title: `${blogPost.post.title} | Jonathan Gleyze`,
        description: blogPost.post.summary,
        canonical: currentUrl,
        meta: metaTags,
    });
    

    return (
        <>
            <NavigationComponent navConfig={navigation}/>
        
            <PostContainer
                title={blogPost.post.title}
                summary={blogPost.post.summary}
                content={blogPost.post.content}
                featured_image={featuredImageUrl}
                author={blogPost.author || undefined}
                last_update={blogPost.post.editedAt}
                created_at={blogPost.post.createdAt}
            />
        </>
    );
}