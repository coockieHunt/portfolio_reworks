import React, { useState, useCallback, CSSProperties } from 'react';
import { useInView } from '@/hooks/useInView.hook';
import styled, { keyframes } from 'styled-components';
import { useApiStatus } from '@/context/ApiStatus.context';

const shimmerAnimation = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const SkeletonBox = styled.span`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: block;
  
  background-color: #1e1e1e; 
  background-image: linear-gradient(
    90deg, 
    #1e1e1e 0px, 
    #2a2a2a 50%, 
    #1e1e1e 100%
  );
  background-size: 200% 100%;
  animation: ${shimmerAnimation} 1.5s infinite linear;
`;

const StyledImage = styled.img<{ $isLoaded: boolean; $duration: number, $fetchPriority?: string }>`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${(props) => (props.$isLoaded ? 1 : 0)};
  transition: opacity ${(props) => props.$duration}ms ease-in-out;
  z-index: 2;
  will-change: opacity;
`;

const globalImageCache: Set<string> = new Set();

const getSizeValue = (val?: number | string) => {
    if (val === undefined || val === null) return undefined;
    if (typeof val === 'number') return `${val}px`;
    if (/^\d+$/.test(val)) return `${val}px`;
    return val;
};

export interface ImageLazyLoadProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    url?: string;
    placeholder?: React.ReactNode;
    transitionDuration?: number;
    wrapperClassName?: string;
    style?: CSSProperties;
    width?: number | string;
    height?: number | string;
    lazy?: boolean;
    fetchPriority?: 'high' | 'low' | 'auto';
}

export const ImageLazyLoad: React.FC<ImageLazyLoadProps> = ({
    className,
    url,
    src,
    alt = '',
    placeholder = null,
    onLoad,
    loading = 'lazy',
    decoding = 'async',
    transitionDuration = 300,
    wrapperClassName,
    width,
    height,
    style,
    lazy = true,
    fetchPriority,
    ...rest
}) => {
    const { isApiDown } = useApiStatus();
    const finalSrc = src || url || '';
    const isCached = finalSrc ? globalImageCache.has(finalSrc) : false;
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
        rootMargin: '100px 0px',
        initialInView: isCached, 
        skip: isCached || !lazy, 
    });

    const [isLoaded, setIsLoaded] = useState<boolean>(isCached);
    const [hasError, setHasError] = useState<boolean>(false);

    const OnImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        if (import.meta.env.DEV) console.error('Image failed to load');
        setHasError(true);
        setIsLoaded(true);
    }
    
    const shouldLoad = !lazy || inView || isCached;

    const wrapperStyle: CSSProperties = {
        position: 'relative',
        display: 'block', 
        overflow: 'hidden',
        width: getSizeValue(width) ?? '100%', 
        height: getSizeValue(height) ?? 'auto',
        ...(width && height ? { aspectRatio: `${typeof width === 'string' ? parseInt(width) : width} / ${typeof height === 'string' ? parseInt(height) : height}` } : {}),
        
        backgroundColor: isLoaded ? 'transparent' : '#1e1e1e',
        transition: 'background-color 0.3s ease', 
        
        contain: 'layout paint',
        ...style,
    };

    const handleLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        if (finalSrc) globalImageCache.add(finalSrc);
        setIsLoaded(true);
        if (onLoad) onLoad(e);
    }, [finalSrc, onLoad]);

    return (
        <span
            ref={ref}
            className={`${wrapperClassName || ''} lazy-wrapper`}
            style={wrapperStyle}
        >
            {!isLoaded && !hasError && !isApiDown && (
                <SkeletonBox>
                    {placeholder}
                </SkeletonBox>
            )}

            {isApiDown && !isLoaded && (
                <span style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#1e1e1e',
                    color: '#888',
                    fontSize: '14px',
                    zIndex: 3,
                    padding: "0.7em",
                    textAlign: "center"
                }}>
                    <span style={{
                        color: 'var(--primary)', 
                        fontWeight: 'bold', 
                        marginRight: '8px', 
                        fontSize: '1.2em'}
                    }>Oups!</span> 
                    <span>Les images ne peuvent pas être chargées en mode restreint</span>
                </span>
            )}

            {hasError && !isApiDown && (
                <span style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#1e1e1e',
                    color: '#888',
                    fontSize: '14px',
                    zIndex: 3,
                    padding: "0.7em",
                    textAlign: "center"
                }}>
                    <span style={{
                        color: 'var(--primary)', 
                        fontWeight: 'bold', 
                        marginRight: '8px', 
                        fontSize: '1.2em'}
                    }>Oops!</span> 
                    <span>Quelque chose a mal tourné lors du chargement de l'image </span>
                </span>
            )}

            {shouldLoad && finalSrc && (!isApiDown || isLoaded) && (
                <StyledImage
                    src={finalSrc}
                    alt={alt}
                    className={className}
                    loading={lazy ? loading : 'eager'} 
                    decoding={decoding}
                    onLoad={handleLoad}
                    onError={OnImageError}
                    $isLoaded={isLoaded}
                    $duration={transitionDuration}
                    width={typeof width === 'number' ? width : parseInt(String(width)) || undefined}
                    height={typeof height === 'number' ? height : parseInt(String(height)) || undefined}
                    $fetchPriority={fetchPriority}
                    {...rest}
                />
            )}
        </span>
    );
};