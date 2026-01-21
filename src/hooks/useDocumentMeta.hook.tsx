import { useEffect } from 'react';

interface MetaTag {
    name?: string;
    property?: string;
    content: string;
}

interface UseDocumentMetaProps {
    title: string;
    description?: string;
    meta?: MetaTag[];
}

/**
 * Hook to set document title and meta tags
 * @param {UseDocumentMetaProps} params - Parameters for setting document meta
 * @param {string} params.title - The title to set for the document
 * @param {string} [params.description] - The description meta tag content
 * @param {MetaTag[]} [params.meta] - Additional meta tags to set
 */
export const useDocumentMeta = ({ title, description, meta = [] }: UseDocumentMetaProps) => {
    useEffect(() => {
        const originalTitle = document.title;

        document.title = title;

        if (description) {
            let descriptionMeta = document.querySelector('meta[name="description"]') as HTMLMetaElement;
            if (!descriptionMeta) {
                descriptionMeta = document.createElement('meta');
                descriptionMeta.name = 'description';
                document.head.appendChild(descriptionMeta);
            }
            descriptionMeta.content = description;
        }

        const addedMetas: HTMLMetaElement[] = [];
        meta.forEach(({ name, property, content }) => {
            const selector = name 
                ? `meta[name="${name}"]` 
                : `meta[property="${property}"]`;
            
            let metaTag = document.querySelector(selector) as HTMLMetaElement;
            
            if (!metaTag) {
                metaTag = document.createElement('meta');
                if (name) metaTag.name = name;
                if (property) metaTag.setAttribute('property', property);
                document.head.appendChild(metaTag);
                addedMetas.push(metaTag);
            }
            
            metaTag.content = content;
        });

        return () => {
            document.title = originalTitle;
            addedMetas.forEach(meta => meta.remove());
        };
    }, [title, description, meta]);
};
