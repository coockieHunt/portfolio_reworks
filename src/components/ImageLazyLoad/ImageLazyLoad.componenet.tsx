import { useState, useEffect, JSX } from 'react';
import { useInView } from 'react-intersection-observer';

interface ImageLazyLoadProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	className?: string;
	url?: string;
	src?: string;
	alt?: string;
	placeholder?: React.ReactNode;
	onLoad?: () => void;
	onError?: (e: string | React.SyntheticEvent<HTMLImageElement, Event>) => void;
	loading?: 'eager' | 'lazy' | undefined;
	decoding?: 'async' | 'sync' | 'auto' | undefined;
	transitionDuration?: number;
	SkeletonClass?: string;
}

const _loaded: Record<string, boolean> = {};

/**
 * Lazy loads an image when it enters the viewport, with optional placeholder and transition.
 *
 * Uses the Intersection Observer API via `react-intersection-observer` to detect when the image is in view.
 * Displays a skeleton or custom placeholder until the image is loaded.
 * Supports caching loaded images to avoid reloading on subsequent renders.
 *
 * @param {string} [className] - Optional CSS class for the image element.
 * @param {string} [url] - Optional image URL (alternative to `src`).
 * @param {string} [src] - Image source URL.
 * @param {string} [alt] - Alternative text for the image.
 * @param {React.ReactNode} [placeholder] - Custom placeholder to display while loading.
 * @param {() => void} [onLoad] - Callback fired when the image loads successfully.
 * @param {(e: string | React.SyntheticEvent<HTMLImageElement, Event>) => void} [onError] - Callback fired on image load error.
 * @param {'eager' | 'lazy'} [loading='lazy'] - Native image loading attribute.
 * @param {'async' | 'sync' | 'auto'} [decoding='async'] - Native image decoding attribute.
 * @param {number} [transitionDuration=300] - Duration of the transition effect in milliseconds.
 * @param {string} [SkeletonClass="skeleton-wrapper"] - CSS class for the skeleton/placeholder wrapper.
 * @param {React.ImgHTMLAttributes<HTMLImageElement>} [rest] - Additional props passed to the image element.
 *
 * @returns {JSX.Element} The lazy-loaded image component.
 */
export const ImageLazyLoad = ({
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
	SkeletonClass = "skeleton-wrapper",
	...rest
}: ImageLazyLoadProps): JSX.Element => {
	const finalSrc = src || url || '';
	
	const { ref, inView } = useInView({ 
        triggerOnce: true, 
        threshold: 0.1 
    });

	const [loaded, setLoaded] = useState(finalSrc ? _loaded[finalSrc] : false);
	const [showImage, setShowImage] = useState(finalSrc ? _loaded[finalSrc] : false);

	useEffect(() => {
		if (!finalSrc) return;

		if (inView && !loaded) {
            
			if (_loaded[finalSrc]) {
				setLoaded(true);
				setShowImage(true);
				return;
			}

			const img = new Image();
			img.src = finalSrc;
            img.decoding = decoding || 'async';

			img.onload = () => {
				_loaded[finalSrc] = true;
				setLoaded(true);
				requestAnimationFrame(() => {
					setShowImage(true);
				});
				if (onLoad) onLoad();
			};

			img.onerror = (e) => {
				setLoaded(true); 
				setShowImage(false); 
				
				if (onError) onError(e as any);
			};
		}
	}, [inView, finalSrc, loaded, onLoad, onError, decoding]);

	return (
		<div
			ref={ref}
			className={className ? `${className}-wrapper lazy-wrapper` : 'lazy-wrapper'}
			style={{ position: 'relative' }}
		>
			{!showImage && (
				<div className={SkeletonClass}>
					{placeholder ? placeholder : null}
				</div>
			)}

			{showImage && finalSrc && (
				<img
					src={finalSrc}
					className={className}
					alt={alt}
					loading={loading}
					decoding={decoding}
                    style={{
                        opacity: showImage ? 1 : 0,
                        transition: `opacity ${transitionDuration}ms ease-in-out`
                    }}
					{...rest}
				/>
			)}

			<noscript>
				{finalSrc && (
					<img
						src={finalSrc}
						className={className}
						alt={alt}
						loading={loading}
						decoding={decoding}
						{...rest}
					/>
				)}
			</noscript>
		</div>
	);
};