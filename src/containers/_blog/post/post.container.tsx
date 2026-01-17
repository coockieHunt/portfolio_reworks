import React, { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';

import hljs from 'highlight.js/lib/core';
// spefic languages for lighter bundle
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml'; 
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import yaml from 'highlight.js/lib/languages/yaml';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);
hljs.registerLanguage('yaml', yaml);

// icons
import {
    ArrowLeft,
    Twitter,
    Linkedin,
    FacebookIcon,
    Share,
    BookOpenCheck,
    Plus,
    Pencil,
} from 'lucide-react';

import { useNavigate } from '@tanstack/react-router';

//container
import { HeroContainer } from '@/containers/_blog/hero/hero.container';
import { TocContainer } from '@/components/Toc/toc.container';

//utils
import { resolveImageUrl } from '@/utils/image';

//style
import * as Styled from './post.style';
import { MarkdownContent } from './markdown.style';

import 'highlight.js/styles/atom-one-dark.css';

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
}

export const PostContainer = ({
    title,
    summary,
    content,
    featured_image,
    author,
}: PostContainerProps) => {
    const navigate = useNavigate();
    const [sanitizedHtml, setSanitizedHtml] = useState<string>('');

    //toc build
    useEffect(() => {
        const md = new MarkdownIt({
            html: true, 
            highlight: function (str, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return hljs.highlight(str, { language: lang }).value;
                    } catch (e) {
                        console.error(e);
                    }
                }
                return md.utils.escapeHtml(str);
            },
        });
    
        md.renderer.rules.heading_open = function (
            tokens,
            idx,
            options,
            env,
            self,
        ) {
            const token = tokens[idx];
            const titleToken = tokens[idx + 1];
            const title = titleToken ? titleToken.content : '';
    
            const anchorId = title
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-');
    
            token.attrSet('id', anchorId);
    
            return self.renderToken(tokens, idx, options);
        };
    
        md.renderer.rules.image = function (tokens, idx, options, env, self) {
            const token = tokens[idx];
            const srcIndex = token.attrIndex('src');
            
            if (srcIndex >= 0) {
                const originalSrc = token.attrs[srcIndex][1];
                token.attrPush(['loading', 'lazy']);
                
                const resolvedSrc = resolveImageUrl(originalSrc);
                token.attrs[srcIndex][1] = resolvedSrc;
            }
            
            return self.renderToken(tokens, idx, options);
        };
    
        const rawHtml = md.render(content);
        setSanitizedHtml(DOMPurify.sanitize(rawHtml));
    }, [content]);

    return (
        <Styled.Container>
            <HeroContainer $backgroundImg={featured_image}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
                        <div className="right">
                            <span
                                className="back"
                                onClick={() => navigate({ to: '/blog' })}
                                role="button" 
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && navigate({ to: '/blog' })}
                            >
                                <ArrowLeft /> retour aux articles
                            </span>

                            <Twitter
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`;
                                    window.open(url, '_blank');
                                }}
                            />

                            <Linkedin
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
                                    window.open(url, '_blank');
                                }}
                            />

                            <FacebookIcon
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
                                    window.open(url, '_blank');
                                }}
                            />

                            <Share
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    if (navigator.share) {
                                        navigator.share({
                                            title: title,
                                            url: window.location.href,
                                        });
                                    } else {
                                        alert(
                                            "Le partage n'est pas supporté sur ce navigateur.",
                                        );
                                    }
                                }}
                            />
                        </div>

                        <div className="left">
                            <span>
                                <BookOpenCheck />{' '}
                                {Math.ceil(content.split(' ').length / 200)} min
                            </span>
                            <span>
                                <Plus /> 09/20/2010
                            </span>
                            <span>
                                <Pencil /> 09/20/2010
                            </span>
                        </div>
                    </div>

                    <div className="content">
                        <MarkdownContent
                            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
                        />
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
                    UpdateAt={sanitizedHtml}
                />
            </Styled.ContainerPost>
        </Styled.Container>
    );
};