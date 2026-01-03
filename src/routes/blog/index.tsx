// src/routes/blog/index.tsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import styled from 'styled-components';

//api
import { getBlogPostsOffset } from '@/api/blog.api';

// containers
import { HeroContainer } from '@/containers/_blog/hero/hero.container';
import { PostGridContainer } from '@/containers/_blog/postGrid/postGrid.container';

//icons
import { Share, Twitter, InstagramIcon, Linkedin } from 'lucide-react';

//lib
import { HexToRgbaConverter } from '@/utils/HexToRgbaConverter';

interface IBlogPost {
    author: string;
    post: {
        id: number;
        featurend_image: string;
        authorId: string;
        content: string;
        createdAt: string;
        editedAt: string;
        published: boolean;
        slug: string;
        summary: string;
        title: string;
    };
}

export const Route = createFileRoute('/blog/')({
    component: BlogIndex,
});

const CustomHero = styled(HeroContainer)`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0px;

    & .social {
        display: flex;
        flex-direction: column;
        position: absolute;
        left: 20px;
        display: flex;
        gap: 20px;

        & svg {
            width: 25px;
            cursor: pointer;
            transition: transform 0.3s ease;
            &:hover {
                color: var(--secondary);
                transform: scale(1.1);
            }
        }
    }
`;

const ShadowOverlay = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    pointer-events: none;
    background: linear-gradient(
        to bottom,
        ${HexToRgbaConverter('var(--secondary)', 0.1)} 0%,
        rgba(0, 0, 0, 0) 70%
    );
`;

function BlogIndex() {
    const ViewPerLoad = 5; //view par page

    const [blogPosts, setBlogPosts] = useState<IBlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const loadMoreTrigger = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const fetchBlogPosts = useCallback(
        async (pageNum: number) => {
            if (!hasMore && pageNum > 1) return; //if no more posts, stop fetching
            setIsLoading(true);
            try {
                const min = (pageNum - 1) * ViewPerLoad + 1;
                const max = pageNum * ViewPerLoad;
                const response = await getBlogPostsOffset(min, max);

                const data = response?.data;
                const newPosts = data?.posts || [];

                if (newPosts.length > 0) {
                    setBlogPosts((prev) => {
                        const allPosts =
                            pageNum === 1 ? newPosts : [...prev, ...newPosts];
                        return allPosts;
                    });

                    if (newPosts.length < ViewPerLoad) {
                        setHasMore(false);
                    } //triger no moer
                } else {
                    setHasMore(false);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setIsLoading(false);
            }
        },
        [hasMore],
    );

    useEffect(() => {
        fetchBlogPosts(page);
    }, [page, fetchBlogPosts]);

    useEffect(() => {
        if (isLoading || !hasMore) return;

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting && !isLoading && hasMore) {
                setPage((prev) => prev + 1);
            }
        };

        const observerOptions = {
            root: null,
            rootMargin: '100px',
            threshold: 0.1,
        };

        observerRef.current = new IntersectionObserver(
            observerCallback,
            observerOptions,
        );

        if (loadMoreTrigger.current) {
            observerRef.current.observe(loadMoreTrigger.current);
        }

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, [isLoading, hasMore]);

    return (
        <>
            <CustomHero className="blog-hero">
                <div className="social">
                    <Share />
                    <Twitter />
                    <InstagramIcon />
                    <Linkedin />
                </div>
                <h1 className="font_code">Voir les articles</h1>
            </CustomHero>
            <ShadowOverlay />

            <div>
                <PostGridContainer data={blogPosts} />
            </div>

            <div
                id="loadMoreTrigger"
                ref={loadMoreTrigger}
                style={{
                    height: '50px',
                    margin: '20px 0',
                    textAlign: 'center',
                    opacity: hasMore ? 1 : 0.5,
                }}
            >
                {isLoading
                    ? 'Chargement...'
                    : hasMore
                      ? 'Chargement des autres articles...'
                      : 'Vous avez tout vu !'}
            </div>
        </>
    );
}
