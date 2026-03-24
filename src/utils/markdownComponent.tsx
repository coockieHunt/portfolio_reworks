import React from 'react';
import type { Components, ExtraProps } from 'react-markdown';
import type { HLJSApi, LanguageFn } from 'highlight.js';

import { ImageLazyLoad } from '@/components/ImageLazyLoad/ImageLazyLoad.componenet';
import { useAlert } from '@/context/alert.context';
import { resolveImageUrl } from '@/utils/image';

import { Copy, Code, Hash } from 'lucide-react';

import { ListComponent } from '@/components/List/List.component';
import { Table } from '@/components/MarkdownTable/Table.component';

const languageLoaders: Record<string, () => Promise<{ default: LanguageFn }>> = {
    javascript: () => import('highlight.js/lib/languages/javascript'),
    typescript: () => import('highlight.js/lib/languages/typescript'),
    css: () => import('highlight.js/lib/languages/css'),
    xml: () => import('highlight.js/lib/languages/xml'),
    bash: () => import('highlight.js/lib/languages/bash'),
    json: () => import('highlight.js/lib/languages/json'),
    yaml: () => import('highlight.js/lib/languages/yaml'),
    python: () => import('highlight.js/lib/languages/python'),
    sql: () => import('highlight.js/lib/languages/sql'),
    ini: () => import('highlight.js/lib/languages/ini'),
    lisp: () => import('highlight.js/lib/languages/lisp'),
};

// change var name for hgljs language avoid confus with md language
const languageAliases: Record<string, string> = {
    js: 'javascript',
    ts: 'typescript',
    yml: 'yaml',
    html: 'xml',
    sh: 'bash',
    shell: 'bash',
};

let highlighterPromise: Promise<HLJSApi> | null = null;

const normalizeLanguage = (language: string): string => {
    const normalized = language.toLowerCase();
    return languageAliases[normalized] ?? normalized;
};

const loadHighlighter = async (): Promise<HLJSApi> => {
    if (highlighterPromise) {
        return highlighterPromise;
    }

    highlighterPromise = (async () => {
        const [{ default: hljs }] = await Promise.all([
            import('highlight.js/lib/core'),
            import('highlight.js/styles/atom-one-dark.css'),
        ]);

        const settledLanguages = await Promise.allSettled(
            Object.entries(languageLoaders).map(async ([name, loader]) => {
                const languageModule = await loader();
                return { name, language: languageModule.default };
            }),
        );

        settledLanguages.forEach((result) => {
            if (result.status !== 'fulfilled') {
                return;
            }

            const { name, language } = result.value;
            hljs.registerLanguage(name, language);
        });

        return hljs;
    })();

    return highlighterPromise;
};

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
type CodeProps = React.ComponentPropsWithoutRef<'code'> & ExtraProps & { inline?: boolean };
type PreProps = React.ComponentPropsWithoutRef<'pre'> & ExtraProps;
type ImgProps = React.ComponentPropsWithoutRef<'img'> & ExtraProps;
type BlockquoteProps = React.ComponentPropsWithoutRef<'blockquote'> & ExtraProps;
type HeadingProps = React.ComponentPropsWithoutRef<'h2'> & ExtraProps;
type UnorderedListProps = React.ComponentPropsWithoutRef<'ul'> & ExtraProps;
type OrderedListProps = React.ComponentPropsWithoutRef<'ol'> & ExtraProps;
type TableProps = React.ComponentPropsWithoutRef<'table'> & ExtraProps;

type MarkdownImageProps = ImgProps & {
    onImageClick: (src: string, alt: string) => void;
};

export const MarkdownCodeBlock = ({ inline, className, children, ...props }: CodeProps) => {
    const { addAlert } = useAlert();
    const [highlightedCode, setHighlightedCode] = React.useState<string | null>(null);

    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : null;
    const normalizedLanguage = language ? normalizeLanguage(language) : null;
    const rawCode = String(children).replace(/\n$/, '');

    React.useEffect(() => {
        let cancelled = false;
        setHighlightedCode(null);

        if (inline || !normalizedLanguage) {
            return;
        }

        loadHighlighter()
            .then((hljs) => {
                if (cancelled || !hljs.getLanguage(normalizedLanguage)) {
                    return;
                }

                const highlighted = hljs.highlight(rawCode, { language: normalizedLanguage }).value;
                setHighlightedCode(highlighted);
            })
            .catch((error) => {
                console.error(`Highlight.js error for language "${normalizedLanguage}":`, error);
            });

        return () => {
            cancelled = true;
        };
    }, [inline, normalizedLanguage, rawCode]);

    if (!inline && language) {
        return (
            <pre className={className}>
                <div className="info">
                    <span><Code style={{ color: 'var(--primary)' }} /> {normalizedLanguage ?? language}</span>
                    <div className="copy">
                        <Copy
                            size={16}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                navigator.clipboard.writeText(rawCode);
                                addAlert('Snippet copié ! Prêt à être collé.', 'green', 3000);
                            }}
                            aria-label="Copier le code"
                            role="button"
                            tabIndex={0}
                        />
                    </div>
                </div>
                {highlightedCode ? (
                    <code dangerouslySetInnerHTML={{ __html: highlightedCode }} {...props} />
                ) : (
                    <code className={className} {...props}>{rawCode}</code>
                )}
            </pre>
        );
    }
    return <code className={className} {...props}>{children}</code>;
};

/**
* Custom image component for react-markdown that supports lazy loading and proxy URLs.
*/
export const MarkdownImage = ({ src, alt, onImageClick, ...props }: MarkdownImageProps) => {
    let finalSrc = src || '';
    let width: string | number = "100%";
    let height: string | number = "auto";

    if (finalSrc.includes('?')) {
        const params = new URLSearchParams(finalSrc.split('?')[1]);
        if (params.has('w')) width = params.get('w') + 'px';
        if (params.has('h')) height = params.get('h') + 'px';
    }

    const resolvedSrc = resolveImageUrl(finalSrc);

    return (
        <ImageLazyLoad
            src={resolvedSrc}
            alt={alt || ''}
            title={alt || ''}
            width={width}
            height={height}
            fallbackMinHeight={220}
            style={{
                backgroundColor: '#1e1e1e',
                borderRadius: '8px',
                margin: '2rem 0',
                display: 'block',
                cursor: 'pointer',
                ...(width !== "100%" ? { margin: '2rem auto' } : {})
            }}
            loading="lazy"
            onClick={() => onImageClick(resolvedSrc, alt || '')}
            {...props}
        />
    );
};

/**
 * Custom blockquote component for react-markdown that supports callout styles based on tags like [!NOTE], [!WARNING], etc.
 */
export const MarkdownQuote = ({ children }: BlockquoteProps) => {
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
export const H2Title = ({ children, id, ...rest }: HeadingProps) => {
    const { addAlert } = useAlert();
    const safeId = typeof id === 'string' ? clearSlug(id) : undefined;

    const handleClick = () => {
        if (!safeId) return;

        const url = `${window.location.origin}${window.location.pathname}#${safeId}`;
        navigator.clipboard.writeText(url);
        addAlert('Lien copié ! Prêt à être partagé.', 'green', 3000);
    };

    return (
        <h2 id={safeId} {...rest}>
            <Hash onClick={handleClick} style={{ cursor: 'pointer' }} /> {children}
        </h2>
    );
};

/**
 * Custom wrapper for list items in react-markdown to ensure consistent styling and structure, especially when nested lists are involved.
 */
export const ListWrapper = ({ children }: { children?: React.ReactNode }) => {
    return (
        <ListComponent>{children}</ListComponent>
    );
}

export const getMarkdownComponents = (onImageClick: (src: string, alt: string) => void): Components => ({
    pre: ({ children }: PreProps) => <>{children}</>,
    code: (props: CodeProps) => <MarkdownCodeBlock {...props} />,
    img: (props: ImgProps) => <MarkdownImage {...props} onImageClick={onImageClick} />,
    blockquote: (props: BlockquoteProps) => <MarkdownQuote {...props} />,
    h2: (props: HeadingProps) => <H2Title {...props} />,
    ul: ({ children }: UnorderedListProps) => <ListComponent>{children ?? null}</ListComponent>,
    ol: ({ children }: OrderedListProps) => <ListComponent type="numbered">{children ?? null}</ListComponent>,
    table: ({ children }: TableProps) => <Table>{children ?? null}</Table>,
});


