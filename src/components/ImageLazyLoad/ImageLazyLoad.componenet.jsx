import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * ImageLazyLoad component
 * 
 * Props:
 * - className: string (optional) - CSS class for the image
 * - url: string (optional) - image URL (alias for src)
 * - src: string (optional) - image source URL
 * - alt: string (optional) - alt text for the image
 * - placeholder: ReactNode (optional) - placeholder to show while loading
 * - onLoad: function (optional) - callback when image loads
 * - onError: function (optional) - callback when image fails to load
 * - loading: string (optional) - loading attribute for img (default: 'lazy')
 * - decoding: string (optional) - decoding attribute for img (default: 'async')
 * - transitionDuration: number (optional) - transition duration in ms (default: 300)
 * - SkeletonClass: string (optional) - CSS class for skeleton wrapper (default: 'skeleton-wrapper')
 * - ...rest: any other props passed to img
 * 
 * Uses Intersection Observer to lazy load images and caches loaded images.
 */

// A cache to keep track of loaded images
const _loaded = {};
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
}) => {
	const finalSrc = src || url;
	const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
	const [loaded, setLoaded] = useState(_loaded[finalSrc]);
	const [showImage, setShowImage] = useState(_loaded[finalSrc]);

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
			img.onload = () => {
				_loaded[finalSrc] = true;
				setLoaded(true);
				requestAnimationFrame(() => {
					setShowImage(true);
				});
				onLoad && onLoad();
			};
			img.onerror = (e) => {
				setLoaded(true);
				setShowImage(true);
				onError && onError(e);
			};
		}
	}, [inView, finalSrc, loaded, onLoad, onError]);

	return (
		<div
			ref={ref}
			className={className ? `${className}-wrapper lazy-wrapper` : 'lazy-wrapper'}
			style={{ position: 'relative' }}
		>
			{!showImage && (
				placeholder ? (
					<div className="skeleton-wrapper">
						{placeholder}
					</div>
				) : (
					<div className="skeleton-wrapper" />
				)
			)}
			{showImage && finalSrc && (
				<img
					src={finalSrc}
					className={className}
					alt={alt}
					loading={loading}
					decoding={decoding}
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