import { useEffect, useState, useMemo } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import styled, {keyframes} from 'styled-components';

import { getBlogPostsOffset, getTagList } from '@/api/service/blog.api';
import { useDocumentMeta } from '@/hooks/useDocumentMeta.hook';
import { IBlogPost } from '@/types/blog.d';

import { Blog } from '@/config';

import { HeroContainer } from '@/containers/_blog/hero/hero.container';
import { PostGridContainer } from '@/containers/_blog/postGrid/postGrid.container';
import { TagsComponent } from '@/components/Tags/Tags.component';
import { SearchBarComponent } from '@/components/Form/searchBar.component';

import {LoaderComponent} from '@/components/Loading/loader.component';
import { INavItem, NavigationComponent } from '@/containers/_root/Navigation/navigations.container';


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
            margin-top: 15px;
            flex-wrap: wrap;
            justify-content: center;
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

            & span {
                animation: blink 1.5s infinite;
            }
        }
    }
`;

export const Route = createFileRoute('/blog/')({
    component: BlogIndex,
});

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://jonathangleyze.fr';
const OG_IMAGE = `${SITE_URL}/og_image.jpg`;

function BlogIndex() {
    const navigate = useNavigate({ from: Route.fullPath });
    const searchParams = Route.useSearch();

    // Meta tags pour SEO
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
    const [tags, setTags] = useState<{ id: number; name: string; slug: string; color: string; postIds: number[] }[]>([]);
    
    const [isLoading, setIsLoading] = useState({
        "posts": false,
        "tags": false
    });

    const [hasError, setHasError] = useState({
        "posts": false,
        "tags": false
    });

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const [searchTerm, setSearchTerm] = useState<string>(searchParams.search || '');

    const navigation: INavItem[] = [
        {
            display : 'Accueil', 
            to: '/', 
            type: "route"
        },
       
    ];

    //  post
    useEffect(() => {
        const fetchTags = async () => {
            setIsLoading((prev) => ({...prev, "tags": true}) ); 

            try {
                const tagResponse = await getTagList();
                if (tagResponse?.data) {
                    const filterEmptyTags = tagResponse.data.filter((tag) => tag.postIds.length > 0);
                    setTags(filterEmptyTags);
                    setHasError((prev) => ({...prev, "tags": false}));
                } else {
                    setHasError((prev) => ({...prev, "tags": true}));
                }
            } catch (error) {
                console.error('Error fetching tags:', error);
                setHasError((prev) => ({...prev, "tags": true}));
            } finally {
                setIsLoading((prev) => ({...prev, "tags": false}) );
            }
        };
        fetchTags();
    }, []);

    // tags
    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading((prev) => ({...prev, "posts": true}));

            try {
                const min = (page - 1) * Blog.POSTS_PER_PAGE + 1;
                const max = page * Blog.POSTS_PER_PAGE;
                
                const response = await getBlogPostsOffset(min, max, searchTerm, searchParams.tag); 
                const newPosts = response?.data?.posts || [];

                if (!response?.data?.posts) {
                    setHasError((prev) => ({...prev, "posts": true}));
                } else {
                    setBlogPosts((prev) => {
                        return page === 1 ? newPosts : [...prev, ...newPosts];
                    });

                    if (newPosts.length < Blog.POSTS_PER_PAGE) {
                        setHasMore(false);
                    } else {
                        setHasMore(true);
                    }

                    setHasError((prev) => ({...prev, "posts": false}));
                }

            } catch (error) {
                console.error('Error fetching posts:', error);
                setHasError((prev) => ({...prev, "posts": true}));
            } finally {
                setIsLoading((prev) => ({...prev, "posts": false}));
            }
        };

        fetchPosts();
    }, [page, searchParams.tag, searchTerm]); 

    const handleTagFilter = (tagName: string) => {
        setPage(1);
        setBlogPosts([]); 
        setHasMore(true);

        const newTag = searchParams.tag === tagName ? undefined : tagName;
        
        navigate({
            search: (prev) => ({ ...prev, tag: newTag }),
        });
    };

    useEffect(() => {
        if (searchTerm !== (searchParams.search || '')) {
             setPage(1);
             setBlogPosts([]);
             setHasMore(true);
             
             const timeoutId = setTimeout(() => {
                 navigate({
                     search: (prev) => ({ ...prev, search: searchTerm || undefined }),
                 });
             }, 500);

             return () => clearTimeout(timeoutId);
        }
    }, [searchTerm, navigate, searchParams.search]);

    return (
        <>
            <NavigationComponent navConfig={navigation}/>
        
            <CustomHero className="blog-hero">
                <div className="content">
                    <h1 className='font_dot'>Dev/Blog<span className='font_code'>_</span></h1>

                    <SearchBarComponent
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        bounceTime={1500}
                        found={blogPosts.length}
                        searching={isLoading.posts}
                    />

                    <div className="tagList">
                        {isLoading.tags ? (
                            <LoaderComponent type="loading"/>
                        ):(
                            <>
                                {tags.length === 0 ? 
                                    <span>Pas de tag disponible actuellement.</span> 
                                    :
                                    tags.map((tag) => (
                                        <TagsComponent 
                                            key={tag.id}  
                                            color={tag.color} 
                                            name={tag.name} 
                                            id={tag.id} 
                                            count={tag.postIds.length} 
                                            selected={searchParams.tag === tag.slug}
                                            onClick={() => handleTagFilter(tag.slug)}
                                        />
                                    ))
                                }
                            </>
                        )}
                    </div>
                </div>
            </CustomHero>
            

            <div>
                <PostGridContainer 
                    count={Blog.POSTS_PER_PAGE}
                    data={blogPosts} 
                    loading={isLoading.posts}
                    isEmpty={!isLoading.posts && blogPosts.length === 0}
                    hasError={hasError.posts}
                />
            </div>
            
            {/* empty loader for end posts spacing */}
            {isLoading.posts &&(
                <LoaderComponent type="NoLoading" ></LoaderComponent>
            )}
            {/* cta load more */}
            {!isLoading.posts && hasMore && !hasError.posts && (
                <LoaderComponent type='NoLoading' >
                    <span 
                        onClick={() => setPage((prev) => prev + 1)}
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
            {/* no more articles */}
            {!isLoading.posts && !hasMore && blogPosts.length > 0 && (
                <LoaderComponent type="NoLoading">
                    Vous avez vu tous les articles.
                </LoaderComponent>
            )}
        </>
    );
}