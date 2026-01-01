import React, { useMemo } from 'react';
import * as Styled from './post.style'; 
import { MarkdownContent } from './markdown.style';

import { marked } from 'marked';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';

import {styled} from 'styled-components';

import {Button} from '@/components/Button/Button';

import { ArrowLeft, Copy } from 'lucide-react';

import 'highlight.js/styles/atom-one-dark.css';
import { useNavigate } from '@tanstack/react-router';

const CodeBlock = ({ language, highlighted }: { language: string;  highlighted: string }) => {
    console.log('Rendering code block with language:', language, highlighted);
    return (
        <pre>
            <code className={`hljs language-${language}`}>{highlighted}</code>
            <div className="action">
                <div className="language-label">{language}</div>
                <button className="copy-button"><Copy /></button>
            </div>
        </pre>
    );
}

export const PostContainer = ({
    title,
    summary,
    content,
    featured_image,
    author
}) => {
    const navigate = useNavigate();

    const sanitizedHtml = useMemo(() => {
        if (!content) return "";

        const renderer = new marked.Renderer();
        renderer.code = function({ text, lang, escaped }) {
            const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
            const highlighted = hljs.highlight(text, { language }).value;
            console.log('Highlighted code:', language);
            return `${CodeBlock({ language, highlighted }).toString()}`;
        };
        marked.use({ renderer });

        const rawHtml = marked.parse(content) as string;

        return DOMPurify.sanitize(rawHtml);
    }, [content]);

    return (
        <>
            <Styled.CustomHero $backgroundImg={featured_image} className="">
                <div className='center'><h1>{title}</h1></div>
                <div className="action">
                    <Button 
                        padding="5px 25px" 
                        onClick={() => navigate({ to: '/blog' })}
                    >
                        <ArrowLeft/>
                    </Button>
                </div>
            </Styled.CustomHero>
            <Styled.Container>
                <div className="resume">
                    <span>Resumée : </span>
                    <p>{summary}</p>
                </div>
                
                <MarkdownContent 
                    dangerouslySetInnerHTML={{ __html: sanitizedHtml }} 
                />
                
                {author && (
                    <div className="author-info">
                        <h3>About the Author</h3>
                        <p>Name: {author.name}</p>
                        <p>Bio: {author.describ}</p>
                    </div>
                )}
            </Styled.Container>
        </>
    );
}