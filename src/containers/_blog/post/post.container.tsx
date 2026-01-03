import React, { useEffect, useState } from 'react';
import * as Styled from './post.style';
import { MarkdownContent } from './markdown.style';
import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
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
import 'highlight.js/styles/atom-one-dark.css';
import { useNavigate } from '@tanstack/react-router';
import { HeroContainer } from '@/containers/_blog/hero/hero.container';

import { ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';
import { HexToRgbaConverter } from '@/utils/HexToRgbaConverter';
import styled from 'styled-components';

interface TocItem {
    id: string;
    text: string;
    level: number;
    show: boolean;
    DropDown: boolean;
    itemHidden: boolean;
    hasChildren: boolean;
}

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

const ShadowOverlay = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    background: red;
    pointer-events: none;

    background: linear-gradient(
        to bottom,
        ${HexToRgbaConverter('var(--secondary)', 0.1)} 0%,
        rgba(0, 0, 0, 0) 70%
    );
`;

export const PostContainer = ({
    title,
    summary,
    content,
    featured_image,
    author,
}: PostContainerProps) => {
    const navigate = useNavigate();
    const [toc, setToc] = useState<TocItem[]>([]);
    const [sanitizedHtml, setSanitizedHtml] = useState<string>('');

    useEffect(() => {
        const tpToc: TocItem[] = [];

        const md = new MarkdownIt({
            highlight: function (str, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return hljs.highlight(str, { language: lang }).value;
                    } catch (e) {
                        console.error(e);
                    }
                }
                return '';
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
            const level = Number(token.tag.substr(1));
            const title = tokens[idx + 1].content;

            const anchorId = title
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-');

            token.attrSet('id', anchorId);

            tpToc.push({
                id: anchorId,
                text: title,
                level: level,
                show: level === 2,
                DropDown: false,
                itemHidden: level === 1,
                hasChildren: false,
            });

            return self.renderToken(tokens, idx, options);
        };

        const rawHtml = md.render(content);

        //check if children if !cacth skip dropdown
        const finalToc = tpToc.map((item, index) => {
            if (item.level === 2) {
                const nextItem = tpToc[index + 1];
                const hasKids = nextItem && nextItem.level > 2;
                return { ...item, hasChildren: hasKids };
            }
            return item;
        });

        setSanitizedHtml(DOMPurify.sanitize(rawHtml));
        setToc(finalToc);
    }, [content]);

    const handleScrollToId = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const toggleSection = (index: number) => {
        setToc((prevToc) => {
            const newToc = [...prevToc];
            const clickedItem = newToc[index];

            //skip if no child or not level 2
            if (clickedItem.level !== 2 || !clickedItem.hasChildren)
                return newToc;

            const isNowOpen = !clickedItem.DropDown;

            newToc[index] = {
                ...clickedItem,
                DropDown: isNowOpen,
            };

            for (let i = index + 1; i < newToc.length; i++) {
                if (newToc[i].level > clickedItem.level) {
                    newToc[i] = {
                        ...newToc[i],
                        show: isNowOpen,
                    };
                } else {
                    break;
                } //exit
            }
            return newToc;
        });
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
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        textAlign: 'center',
                    }}
                >
                    <h1 style={{ width: '80%' }}>{title}</h1>
                </div>
            </HeroContainer>
            <ShadowOverlay />

            <Styled.ContainerPost>
                <div className="post">
                    <div className="other">
                        <span>Resumée : </span>
                        <p>{summary}</p>
                    </div>

                    <div className="action">
                        <div className="right">
                            <span
                                className="back"
                                onClick={() => navigate({ to: '/blog' })}
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

                <div className="info">
                    <h2>Sommaire</h2>
                    {toc.length === 0 ? (
                        <p>Aucun titre disponible</p>
                    ) : (
                        <ul>
                            {toc.map((item, index) => {
                                if (item.itemHidden) return null;

                                return (
                                    <li
                                        key={index}
                                        style={{
                                            paddingLeft: `${(item.level - 1) * 15}px`,
                                            display: item.show
                                                ? 'flex'
                                                : 'none',
                                        }}
                                    >
                                        <a
                                            href={`#${item.id}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleScrollToId(item.id);
                                            }}
                                        >
                                            {item.text}
                                        </a>

                                        {item.level === 2 &&
                                            item.hasChildren && (
                                                <span
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        e.preventDefault();
                                                        toggleSection(index);
                                                    }}
                                                >
                                                    {item.DropDown ? (
                                                        <ArrowUpFromLine />
                                                    ) : (
                                                        <ArrowDownToLine />
                                                    )}
                                                </span>
                                            )}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </Styled.ContainerPost>
        </Styled.Container>
    );
};
