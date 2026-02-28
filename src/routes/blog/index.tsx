import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import styled from 'styled-components';

import { getBlogPostsOffset, getTagList } from '@/api/service/blog.api';
import { useDocumentMeta } from '@/hooks/useDocumentMeta.hook';
import { IBlogPost } from '@/types/blog.d';

import { Blog, SCREEN_SIZE } from '@/config';

import { HeroContainer } from '@/containers/_blog/hero/hero.container';
import { PostGridContainer } from '@/containers/_blog/postGrid/postGrid.container';
import { TagsComponent } from '@/components/Tags/Tags.component';
import { SearchBarComponent} from '@/components/Form/searchBar.component';

import {LoaderComponent} from '@/components/Loading/loader.component';
import { INavItem, NavigationComponent } from '@/containers/_root/Navigation/navigations.container';
import { BORDER_RADIUS } from '@/config';
import { X } from 'lucide-react';



const CustomHero = styled(HeroContainer)`
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }


    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 0px;
    position: relative;

    max-height: 450px;
    & .content {
        width: 100%;
        max-width: 800px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        
        & .tagList {
            display: flex;

            gap: 10px;
            margin-top: 20px;
            flex-wrap: wrap;
            justify-content: start;

            height: 100%;
            width: 100%;

            & span{
                font-size: 0.9rem;
                color: var(--font-subtle);
            }
        }

        & h1 {
            font-size: 3rem;
            color: var(--primary);
            font-weight: bold;
            margin: 0;
            text-align: center;
            margin-bottom: 10px;

            & span {
                animation: blink 1.5s infinite;
            }

            @media (max-width: ${SCREEN_SIZE.mobile}) {
                font-size: 2rem;
                text-align: left;
                width: 100%;
            }   
        }
    }
`;

const ResetButton = styled.button`
    background: none;
    border: 1px solid var(--secondary);
    color: var(--primary);
    cursor: pointer;
    opacity: 0.5;
    padding: 0;
    display: flex;
    align-items: center;
    transition: opacity 0.2s;
    padding: 5px;
    border-radius: ${BORDER_RADIUS.small};
    &:hover { opacity: 1; }
`;

export const Route = createFileRoute('/blog/')({
    component: BlogIndex,
});

const SITE_URL = import.meta.env.VITE_FRONT_SITE_URL || 'https://jonathangleyze.fr';
const OG_IMAGE = `${SITE_URL}/og_image.jpg`;
const BOUNCE_TIME = 1500;

function BlogIndex() {
    const navigate = useNavigate({ from: Route.fullPath });
    const searchParams = Route.useSearch();

    const metaTags = useMemo(() => [
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Blog | Jonathan Gleyze' },
        { property: 'og:description', content: 'Découvrez mes articles sur le développement web, les technologies Node.js, React et bien plus encore.' },
        { property: 'og:image', content: OG_IMAGE },
        { property: 'og:url', content: `${SITE_URL}/blog` },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Blog | Jonathan Gleyze' },
        { name: 'twitter:description', content: 'Découvrez mes articles sur le développement web, les technologies Node.js, React et bien plus encore.' },
        { name: 'twitter:image', content: OG_IMAGE },
    ], []);

    useDocumentMeta({
        title: 'Blog | Jonathan Gleyze',
        description: 'Découvrez mes articles sur le développement web, les technologies Node.js, React et bien plus encore.',
        canonical: `${SITE_URL}/blog`,
        meta: metaTags,
    });
    
    const [blogPosts, setBlogPosts] = useState<IBlogPost[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [tags, setTags] = useState<{ id: number; name: string; slug: string; color: string; count: number }[]>([]);
    
    const [isPostsLoading, setIsPostsLoading] = useState(false);
    const [isTagsLoading, setIsTagsLoading] = useState(false);
    const [hasPostsError, setHasPostsError] = useState(false);
    const [hasTagsError, setHasTagsError] = useState(false);

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const postsRequestRef = useRef(0);
    const tagsRequestRef = useRef(0);

    const [searchTerm, setSearchTerm] = useState<string>(searchParams.search || '');
    const [localTerm, setLocalTerm] = useState<string>(searchParams.search || '');
    const isWaiting = localTerm !== searchTerm;
    const hasActiveFilters = useMemo(() => localTerm !== '' || searchParams.tag !== undefined, [localTerm, searchParams.tag]);
    const visiblePostsCount = totalCount;
    const visibleTags = useMemo(
        () => tags.filter((tag) => (tag.count ?? 0) > 0),
        [tags]
    );

    const navigation = useMemo<INavItem[]>(() => [
        {
            display : 'Accueil', 
            to: '/', 
            type: "route"
        },
    ], []);

    const resetPostList = useCallback(() => {
        setPage(1);
        setBlogPosts([]);
        setHasMore(true);
    }, []);

    useEffect(() => {
        const fetchTags = async () => {
            const requestId = ++tagsRequestRef.current;
            setIsTagsLoading(true);

            try {
                const tagResponse = await getTagList({
                    tagsContains: searchParams.tag,
                    titleContains: searchTerm,
                });
                if (requestId !== tagsRequestRef.current) return;

                if (tagResponse?.data?.tags) {
                    setTags(
                        tagResponse.data.tags.map((t: any) => ({
                            ...t.tag,
                            count: t.count
                        }))
                    );
                    setHasTagsError(false);
                } else {
                    setHasTagsError(true);
                }
            } catch (error) {
                console.error('Error fetching tags:', error);
                if (requestId === tagsRequestRef.current) {
                    setHasTagsError(true);
                }
            } finally {
                if (requestId === tagsRequestRef.current) {
                    setIsTagsLoading(false);
                }
            }
        };
        fetchTags();
    }, [searchParams.tag, searchTerm]);

    useEffect(() => {
        const fetchPosts = async () => {
            const requestId = ++postsRequestRef.current;
            setIsPostsLoading(true);

            try {
                const min = (page - 1) * Blog.POSTS_PER_PAGE + 1;
                const max = page * Blog.POSTS_PER_PAGE;
                
                const response = await getBlogPostsOffset(min, max, searchTerm, searchParams.tag); 
                if (requestId !== postsRequestRef.current) return;

                const newPosts = response?.data?.posts || [];
                const newTotal = response?.data?.meta?.total_count ?? newPosts.length;

                if (!response?.data?.posts) {
                    setHasPostsError(true);
                } else {
                    setBlogPosts((prev) => {
                        return page === 1 ? newPosts : [...prev, ...newPosts];
                    });
                    setTotalCount(newTotal);
                    setHasMore(newPosts.length >= Blog.POSTS_PER_PAGE);
                    setHasPostsError(false);
                }

            } catch (error) {
                console.error('Error fetching posts:', error);
                if (requestId === postsRequestRef.current) {
                    setHasPostsError(true);
                }
            } finally {
                if (requestId === postsRequestRef.current) {
                    setIsPostsLoading(false);
                }
            }
        };

        fetchPosts();
    }, [page, searchParams.tag, searchTerm]); 

    const handleTagFilter = useCallback((tagName: string) => {
        resetPostList();

        const newTag = searchParams.tag === tagName ? undefined : tagName;
        
        navigate({
            search: (prev) => ({ ...prev, tag: newTag }),
        });
    }, [navigate, resetPostList, searchParams.tag]);

    const handleClearSearch = useCallback(() => {
        setLocalTerm('');
        setSearchTerm('');
    }, []);

    const handleReset = useCallback(() => {
        resetPostList();
        setLocalTerm('');
        setSearchTerm('');
        
        navigate({
            search: (prev) => ({ ...prev, search: undefined, tag: undefined }),
        });
    }, [navigate, resetPostList]);

    const handleLoadMore = useCallback(() => {
        setPage((prev) => prev + 1);
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (localTerm !== searchTerm) {
                setSearchTerm(localTerm);
            }
        }, BOUNCE_TIME);

        return () => clearTimeout(timeoutId);
    }, [localTerm, searchTerm]);

    useEffect(() => {
        if (searchTerm !== (searchParams.search || '')) {
             resetPostList();
             
             navigate({
                 search: (prev) => ({ ...prev, search: searchTerm || undefined }),
             });
        }
    }, [searchTerm, navigate, searchParams.search, resetPostList]);

    useEffect(() => {
        const nextTerm = searchParams.search || '';
        if (nextTerm !== localTerm) {
            setLocalTerm(nextTerm);
        }
    }, [searchParams.search]);

    return (
        <>
            <NavigationComponent navConfig={navigation} clearOnTop={false}/>
        
            <CustomHero className="blog-hero">
                <div className="content">
                    <h1 className='font_dot'>Dev/Blog<span className='font_code'>_</span></h1>

                    <SearchBarComponent
                        localTerm={localTerm}
                        onLocalTermChange={setLocalTerm}
                        onClearSearch={handleClearSearch}
                        bounceTime={BOUNCE_TIME}
                        found={visiblePostsCount}
                        searching={isPostsLoading}
                        isWaiting={isWaiting}
                        hasActiveFilters={hasActiveFilters}
                        onResetAll={handleReset}
                    > 
                        <div className="tagList">
                            {isTagsLoading ? (
                                <LoaderComponent type="loading"/>
                            ):(
                                <>
                                    {(visibleTags.length === 0 || hasTagsError) ? 
                                        <span>Pas de tag disponible actuellement.</span>
                                        :(
                                            <>
                                                {visibleTags.map((tag) => (
                                                    <TagsComponent 
                                                        key={tag.id}  
                                                        color={tag.color} 
                                                        name={tag.name} 
                                                        id={tag.id} 
                                                        count={tag.count} 
                                                        selected={searchParams.tag === tag.slug}
                                                        onClick={() => handleTagFilter(tag.slug)}
                                                    />
                                                ))}

                                                {searchParams.tag && (
                                                    <ResetButton 
                                                        onClick={() => handleTagFilter(searchParams.tag)}
                                                        title="Effacer le filtre de tag"
                                                    >
                                                        <X size={16} />
                                                    </ResetButton>
                                                )}
                                            </>
                                        )
                                    }
                                </>
                            )}
                        </div>
                    
                    </SearchBarComponent>
                </div>
            </CustomHero>
            

            <div>
                <PostGridContainer 
                    count={Blog.POSTS_PER_PAGE}
                    data={blogPosts} 
                    loading={isPostsLoading}
                    isEmpty={!isPostsLoading && blogPosts.length === 0}
                    hasError={hasPostsError}
                />
            </div>
            
            {isPostsLoading &&(
                <LoaderComponent type="NoLoading" ></LoaderComponent>
            )}
            {!isPostsLoading && hasMore && !hasPostsError && (
                <LoaderComponent type='NoLoading' >
                    <span 
                        onClick={handleLoadMore}
                        style={{ 
                            cursor: 'pointer', 
                            textDecoration: 'underline', 
                            color: 'var(--primary)', 
                            fontSize: '1.2rem'
                        }}
                    >
                        En voir plus
                    </span>
                </LoaderComponent>
            )}
            {!isPostsLoading && !hasMore && visiblePostsCount > 0 && (
                <LoaderComponent type="NoLoading">
                    Vous avez vu tous les articles.
                </LoaderComponent>
            )}
        </>
    );
}