import React from 'react';

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; 
import rehypeRaw from 'rehype-raw'; 
import rehypeSlug from 'rehype-slug'; 
import remarkUnwrapImages from 'remark-unwrap-images'; 

import { ImageLazyLoad } from '@/components/ImageLazyLoad/ImageLazyLoad.componenet';
import { useAlert } from '@/context/alert.context';

import { Copy } from 'lucide-react';

// Highlight.js
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml'; 
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import yaml from 'highlight.js/lib/languages/yaml';
import python from 'highlight.js/lib/languages/python';
import sql from 'highlight.js/lib/languages/sql';
import 'highlight.js/styles/atom-one-dark.css';

import {
    ArrowLeft,
    BookOpenCheck,
    Plus,
    Pencil,
    Code
} from 'lucide-react';

import { useNavigate } from '@tanstack/react-router';

import { HeroContainer } from '@/containers/_blog/hero/hero.container';
import { TocContainer } from '@/components/Toc/toc.container';
import { ShareComponent } from '@/components/share/share.component';

import { resolveImageUrl } from '@/utils/image';

import * as Styled from './post.style';
import { MarkdownContent } from './markdown.style';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('python', python);
hljs.registerLanguage('sql', sql);

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


const MarkdownCodeBlock = ({ node, inline, className, children, ...props }: any) => {
    const { addAlert } = useAlert();

    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : null;

    if (!inline && language) {
        try {
            const highlightedCode = hljs.highlight(String(children).replace(/\n$/, ''), { language }).value;

            return (
                <pre className={className}>
                    <div className="info">
                        <span><Code style={{color: 'var(--primary)'}} /> {language}</span>
                        <div className="copy">
                        <Copy 
                            size={16}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
                                addAlert('Code copié dans le presse-papiers', 'green', 3000);
                            }}
                        />
                        </div>
                        
                    </div>
            
                    <code dangerouslySetInnerHTML={{ __html: highlightedCode }} {...props} />
                </pre>
            );
        } catch (error) {
            console.error(`Highlight.js error for language "${language}":`, error);
        }
    }
    return <code className={className} {...props}>{children}</code>;
};

const MarkdownImage = ({ node, src, alt, ...props }: any) => {
    let finalSrc = src || '';
    if (finalSrc.startsWith('url:')) {
        finalSrc = finalSrc.replace('url:', '');
    } 
    else if (finalSrc.startsWith('proxy:')) {
        const resolved = resolveImageUrl(finalSrc);
        finalSrc =  resolved
    } 

    return (
        <ImageLazyLoad
            src={finalSrc}
            alt={alt || ''}
            width="100%"
            style={{ 
                aspectRatio: '16/9',
                backgroundColor: '#1e1e1e',
                borderRadius: '8px',
                margin: '2rem 0',
                display: 'block' 
            }}
            {...props}
        />
    );
};






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
                    <h1 style={{ width: '80%' }}>{title}</h1>
                </div>
            </HeroContainer>

            <Styled.ContainerPost>
                <div className="post">
                    
                    <div className="other">
                        <span>Résumé : </span>
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

                    <div className="content">
                        <MarkdownContent>
                            <Markdown
                                remarkPlugins={[
                                    remarkGfm, 
                                    remarkUnwrapImages 
                                ]}
                                rehypePlugins={[rehypeRaw, rehypeSlug]}
                                urlTransform={(value) => value} 
                                components={{
                                    pre: ({ children }) => (
                                        <>{children}</>
                                    ),
                                    code: MarkdownCodeBlock,
                                    img: MarkdownImage 
                                }}
                            >
                                {content}
                            </Markdown>
                        </MarkdownContent>
                    </div>

                    <div className="other author-info">
                        {author && (
                            <>
                                <span>{author.name}</span>
                                <p>{author.describ}</p>
                            </>
                        )}
                    </div>
                </div>

                <TocContainer
                    QueryTitle=".content h2, .content h3"
                    ScrollQueryTitle=".content h2"
                    UpdateAt={content}
                />
            </Styled.ContainerPost>
        </Styled.Container>
    );
};