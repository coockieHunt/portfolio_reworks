import React, { useState, useCallback, CSSProperties } from 'react';
import { useInView } from 'react-intersection-observer';

const globalImageCache: Set<string> = new Set();

export interface ImageLazyLoadProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    url?: string;
    placeholder?: React.ReactNode;
    transitionDuration?: number;
    SkeletonClass?: string;
    wrapperClassName?: string;
}

export const ImageLazyLoad: React.FC<ImageLazyLoadProps> = ({
    className,
    url,
    src,
    alt = '',
    placeholder = null,
    onLoad,
    onError,
    loading = 'lazy',
    decoding = 'async',
    transitionDuration = 300,
    SkeletonClass = 'skeleton-wrapper',
    wrapperClassName,
    style,
    ...rest
}) => {
    const finalSrc = src || url || '';

    const isCached = finalSrc ? globalImageCache.has(finalSrc) : false;

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
        initialInView: isCached,
        skip: isCached,
    });

    const [isLoaded, setIsLoaded] = useState<boolean>(isCached);
    const [hasError, setHasError] = useState<boolean>(false);

    const handleLoad = useCallback(
        (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            if (finalSrc) globalImageCache.add(finalSrc);
            setIsLoaded(true);
            if (onLoad) onLoad(e);
        },
        [finalSrc, onLoad],
    );

    const handleError = useCallback(
        (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            setHasError(true);
            setIsLoaded(true);
            if (onError) onError(e);
        },
        [onError],
    );

    const imageStyle: CSSProperties = {
        ...style,
        opacity: isLoaded ? 1 : 0,
        transition: `opacity ${transitionDuration}ms ease-in-out`,
        visibility: hasError ? 'hidden' : 'visible',
    };

    const wrapperClass = [
        wrapperClassName,
        className ? `${className}-wrapper` : '',
        'lazy-wrapper',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div
            ref={ref}
            className={wrapperClass}
            style={{ position: 'relative', overflow: 'hidden' }}
        >
            {!isLoaded && <div className={SkeletonClass}>{placeholder}</div>}

            {(inView || isCached) && finalSrc && (
                <img
                    src={finalSrc}
                    alt={alt}
                    className={className}
                    loading={loading}
                    decoding={decoding}
                    onLoad={handleLoad}
                    onError={handleError}
                    style={imageStyle}
                    {...rest}
                />
            )}

            <noscript>
                {finalSrc && (
                    <img
                        src={finalSrc}
                        alt={alt}
                        className={className}
                        loading={loading}
                        decoding={decoding}
                        {...rest}
                    />
                )}
            </noscript>
        </div>
    );
};
