import { useState, useEffect, useRef, ImgHTMLAttributes } from 'react';

interface LazyImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  placeholder?: string;
  threshold?: number;
  rootMargin?: string;
}

/**
 * Optimized LazyImage component - Ultra fast loading with WebP support
 * Improves initial page load performance significantly
 */
export function LazyImage({ 
  src, 
  alt, 
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f8fafc" width="400" height="300"/%3E%3C/svg%3E',
  className = '',
  threshold = 0.1,
  rootMargin = '100px',
  ...props 
}: LazyImageProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    // Use native lazy loading if supported
    if ('loading' in HTMLImageElement.prototype) {
      setImageSrc(src);
      return;
    }

    // Fallback to intersection observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Preload image for smoother transition
          const img = new Image();
          img.onload = () => setImageSrc(src);
          img.onerror = () => setHasError(true);
          img.src = src;
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, [src, threshold, rootMargin]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Generate WebP source if possible
  const webpSrc = src.includes('.jpg') || src.includes('.jpeg') || src.includes('.png') 
    ? src.replace(/\.(jpg|jpeg|png)$/i, '.webp') 
    : null;

  return (
    <picture>
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      <img
        ref={imgRef}
        src={imageSrc || placeholder}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`transition-opacity duration-200 ${
          isLoading ? 'opacity-60' : 'opacity-100'
        } ${hasError ? 'bg-gray-100' : ''} ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </picture>
  );
}

/**
 * LazyBackgroundImage - For background images
 */
export function LazyBackgroundImage({
  src,
  children,
  className = '',
  placeholder = 'linear-gradient(to bottom, #f0f0f0, #e0e0e0)',
  ...props
}: {
  src: string;
  children?: React.ReactNode;
  className?: string;
  placeholder?: string;
  [key: string]: any;
}) {
  const [backgroundImage, setBackgroundImage] = useState<string>(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!divRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Preload image
          const img = new Image();
          img.onload = () => {
            setBackgroundImage(`url(${src})`);
            setIsLoaded(true);
          };
          img.src = src;
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    observer.observe(divRef.current);

    return () => observer.disconnect();
  }, [src]);

  return (
    <div
      ref={divRef}
      className={`transition-all duration-500 ${
        isLoaded ? 'opacity-100' : 'opacity-70'
      } ${className}`}
      style={{ backgroundImage, ...props.style }}
      {...props}
    >
      {children}
    </div>
  );
}
