import React, { useState, useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; 
import rehypeRaw from 'rehype-raw'; 
import rehypeSlug from 'rehype-slug'; 
import remarkUnwrapImages from 'remark-unwrap-images'; 

import {
    ArrowLeft,
    BookOpenCheck,
    Plus,
    Pencil,
} from 'lucide-react';

import { useNavigate } from '@tanstack/react-router';

import { HeroContainer } from '@/containers/_blog/hero/hero.container';
import { TocContainer } from '@/components/Toc/toc.container';
import { LightBoxComponent } from '@/components/LightBox/LightBox.component';
import { ShareComponent } from '@/components/share/share.component';

import { getMarkdownComponents } from '@/utils/markdownComponent';

import * as Styled from './post.style';
import { MarkdownContent } from './markdown.style';

interface Author {
    name: string;
    describ: string;
}

interface PostContainerProps {
    title: string;
    summary: string;
    content: string;
    featured_image?: string;
    author?: Author;
    last_update?: string;
    created_at?: string;
}

export const PostContainer = ({
    title,
    summary,
    content,
    featured_image,
    author,
    last_update,
    created_at,
}: PostContainerProps) => {
    const navigate = useNavigate();
    const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
    const [currentImg, setCurrentImg] = useState<string | null>(null);
    const [currentAlt, setCurrentAlt] = useState<string>('');
    const contentRef = useRef<HTMLDivElement>(null);
    const lenis = useLenis();
    const hasScrolledRef = useRef(false);

    useEffect(() => {
        const rawHash = window.location.hash.slice(1);
        if (!rawHash) return;
        if (hasScrolledRef.current) return;
        const hash = decodeURIComponent(rawHash);

        let attempts = 0;
        const maxAttempts = 30;
        const offset = 150;

        const ScrollTo = () => {
            const element = document.getElementById(hash);
            if (!element) {
                attempts++;
                if (attempts < maxAttempts) {
                    timerId = setTimeout(ScrollTo, 200);
                }
                return;
            }

            hasScrolledRef.current = true;

            if (lenis) {
                lenis.scrollTo(element, { duration: 1.5, offset: -offset });
                setTimeout(() => {
                    window.history.replaceState(null, '', window.location.pathname);
                }, 1600);
            } else {
                window.scrollTo({
                    top: element.getBoundingClientRect().top + window.scrollY - offset,
                    behavior: 'smooth',
                });
                setTimeout(() => {
                    window.history.replaceState(null, '', window.location.pathname);
                }, 1000);
            }
        };

        let timerId: ReturnType<typeof setTimeout>;
        timerId = setTimeout(ScrollTo, 300);

        return () => clearTimeout(timerId);
    }, [content, lenis]);

    const openLightBox = (imgSrc: string, altText: string = '') => {
        setCurrentImg(imgSrc);
        setCurrentAlt(altText);
        setIsLightBoxOpen(true);
    };

    const closeLightBox = () => {
        setIsLightBoxOpen(false);
        setCurrentImg(null);
        setCurrentAlt('');
    };

    return (
        <Styled.Container>
            <HeroContainer $backgroundImg={featured_image}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        textAlign: 'center',
                    }}
                >
                    <h1 style={{ width: '70%' }}>{title}</h1>
                </div>
            </HeroContainer>

            <Styled.ContainerPost>
                <div className="post">
                    
                    <div className="other">
                        <span className='font_dot'>Résumé : </span>
                        <p>{summary}</p>
                    </div>

                    <div className="action">
                        <div className="nav">
                            <span
                                className="back"
                                onClick={() => navigate({ to: '/blog' })}
                                role="button" 
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && navigate({ to: '/blog' })}
                            >
                                <ArrowLeft /> retour aux articles
                            </span>

                            <ShareComponent socialType="twitter" urlPost={window.location.href} title={title} />
                            <ShareComponent socialType="linkedin" urlPost={window.location.href} title={title} />
                            <ShareComponent socialType="facebook" urlPost={window.location.href} title={title} />
                            <ShareComponent socialType="native" urlPost={window.location.href} title={title} />
                        </div>

                        <div className="info">
                            <span>
                                {last_update ? (
                                    <>
                                        <Pencil />
                                        {' '}
                                        {new Date(last_update).toLocaleDateString('fr-FR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </>
                                ) : created_at ? (
                                    <>
                                        <Plus />
                                        {` Publié le ${new Date(created_at).toLocaleDateString('fr-FR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}`}
                                    </>
                                ) : null}
                            </span>
                            <span>
                                <BookOpenCheck />{' '}
                                {Math.ceil(content.split(' ').length / 200)} min
                            </span>
                        </div>
                    </div>

                    <div className="content" ref={contentRef}>
                        <MarkdownContent>
                            <Markdown
                                remarkPlugins={[
                                    remarkGfm, 
                                    remarkUnwrapImages 
                                ]}
                                rehypePlugins={[rehypeRaw, rehypeSlug]}
                                urlTransform={(value) => value} 
                                components={getMarkdownComponents(openLightBox)}
                            >
                                {content}
                            </Markdown>
                        </MarkdownContent>
                        {author && (
                            <div className="author-section">
                                <div className="author-name font_dot">{author.name}</div>
                                <p className="author-bio">{author.describ}</p>
                            </div>
                        )}
                    </div>
                </div>

                <TocContainer
                    QueryTitle=".content h2, .content h3"
                    ScrollQueryTitle=".content h2"
                    UpdateAt={content}
                />
            </Styled.ContainerPost>
            <LightBoxComponent
                isLightBoxOpen={isLightBoxOpen}
                currentImg={currentImg}
                altText={currentAlt}
                closeLightBox={closeLightBox}
            />
        </Styled.Container>
    );
};