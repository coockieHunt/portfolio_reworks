import React from 'react';

import { ImageLazyLoad } from '@/components/ImageLazyLoad/ImageLazyLoad.componenet';
import { useAlert } from '@/context/alert.context';
import { resolveImageUrl } from '@/utils/image';

import { Copy, Code, Hash } from 'lucide-react';




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

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('python', python);
hljs.registerLanguage('sql', sql);

/**
 * clear slug to create safe anchor links by removing special characters and extra dashes
 */
const clearSlug = (id: string): string => {
    if (!id) return id;
    return id
        .replace(/[?#!@&=+%]/g, '')
        .replace(/-+/g, '-')
        .replace(/-+$/, '')
        .replace(/^-+/, '');
};

/** 
* build custom components for react-markdown to handle code blocks, images, blockquotes, etc.
*/
export const MarkdownCodeBlock = ({ node, inline, className, children, ...props }: any) => {
    const { addAlert } = useAlert();

    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : null;

    if (!inline && language) {
        try {
            const highlightedCode = hljs.highlight(String(children).replace(/\n$/, ''), { language }).value;

            return (
                <pre className={className}>
                    <div className="info">
                        <span><Code style={{ color: 'var(--primary)' }} /> {language}</span>
                        <div className="copy">
                            <Copy
                                size={16}
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
                                    addAlert('Snippet copié ! Prêt à être collé.', 'green', 3000);
                                }}
                                aria-label="Copier le code"
                                role="button"
                                tabIndex={0}
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

/**
* Custom image component for react-markdown that supports lazy loading and proxy URLs.
*/
export const MarkdownImage = ({ node, src, alt, onImageClick, ...props }: any) => {
    let finalSrc = src || '';
    if (finalSrc.startsWith('url:')) {
        finalSrc = finalSrc.replace('url:', '');
    } else if (finalSrc.startsWith('proxy:')) {
        finalSrc = resolveImageUrl(finalSrc);
    }

    return (
        <ImageLazyLoad
            src={finalSrc}
            alt={alt || ''}
            title={alt || ''}
            width="100%"
            style={{
                minHeight: '200px',
                backgroundColor: '#1e1e1e',
                borderRadius: '8px',
                margin: '2rem 0',
                display: 'block',
                cursor: 'pointer',
            }}
            loading="lazy"
            onClick={() => onImageClick(finalSrc, alt)}
            {...props}
        />
    );
};

/**
 * Custom blockquote component for react-markdown that supports callout styles based on tags like [!NOTE], [!WARNING], etc.
 */
export const MarkdownQuote = ({ children }: any) => {
    const arrayChildren = React.Children.toArray(children);
    const firstElem = arrayChildren.find((child: any) => React.isValidElement(child));

    if (!firstElem) return <blockquote>{children}</blockquote>;

    const pChildren = React.Children.toArray((firstElem as any).props.children);
    const firstTextNode = pChildren[0];

    let calloutType: string | null = null;
    let cleanContent = children;

    if (typeof firstTextNode === 'string') {
        const match = firstTextNode.match(/^\[!(.*?)\]/);

        if (match) {
            calloutType = match[1];
            const textWithoutTag = firstTextNode.replace(match[0], '').trim();

            const newPChildren = [...pChildren];
            newPChildren[0] = textWithoutTag;

            const newP = React.cloneElement(firstElem as React.ReactElement, {}, ...newPChildren);

            const elemIndex = arrayChildren.indexOf(firstElem);
            const newArrayChildren = [...arrayChildren];
            newArrayChildren[elemIndex] = newP;

            cleanContent = newArrayChildren;
        }
    }

    if (calloutType) {
        return (
            <blockquote className={`type-${calloutType}`}>
                <div className="type-header">
                    <strong className="type-title">{calloutType}</strong>
                </div>
                <div className="type-body">
                    {cleanContent}
                </div>
            </blockquote>
        );
    }

    return <blockquote>{children}</blockquote>;
};

/**
 * Custom H2 component for react-markdown that adds an anchor link icon and supports smooth scrolling to the section when clicked.
 */
export const H2Title = ({ children, id }: any) => {
    const { addAlert } = useAlert();
    const safeId = clearSlug(id);

    const handleClick = () => {
        if (!safeId) return;

        const url = `${window.location.origin}${window.location.pathname}#${safeId}`;
        navigator.clipboard.writeText(url);
        addAlert('Lien copié ! Prêt à être partagé.', 'green', 3000);
    };

    return (
        <h2 id={safeId}>
            <Hash onClick={handleClick} style={{ cursor: 'pointer' }} /> {children}
        </h2>
    );
};

/**
 * Factory function to get custom components for react-markdown, allowing the parent component to pass an image click handler.
 */
export const getMarkdownComponents = (onImageClick: (src: string, alt: string) => void) => ({
    pre: ({ children }: any) => <>{children}</>,
    code: MarkdownCodeBlock,
    img: (props: any) => <MarkdownImage {...props} onImageClick={onImageClick} />,
    blockquote: MarkdownQuote,
    h2: H2Title,
});
