
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
  priority?: boolean;
  webpSrc?: string;
  width?: number;
  height?: number;
  sizes?: string;
  lowResSrc?: string; // Low resolution src for blur-up loading
}

/**
 * Optimized Image component with webp support, lazy loading, and progressive loading
 */
const OptimizedImage = ({ 
  src, 
  alt, 
  className, 
  fallback = "/images/placeholder.jpg",
  priority = false,
  webpSrc,
  width,
  height,
  sizes,
  lowResSrc,
  ...props 
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(lowResSrc || src);
  const [supportsWebp, setSupportsWebp] = useState(false);
  const [isHighResSrc, setIsHighResSrc] = useState(!!lowResSrc ? false : true);
  
  // Check for webp support on mount
  useEffect(() => {
    const checkWebpSupport = async () => {
      const webpSupported = await testWebP();
      setSupportsWebp(webpSupported);
    };
    
    checkWebpSupport();
    
    // Set up blur-up effect for image loading (if lowResSrc is provided)
    if (lowResSrc && !isHighResSrc) {
      const highResImage = new Image();
      highResImage.onload = () => {
        // Once high-res image is loaded, switch to it
        setImgSrc(supportsWebp && webpSrc ? webpSrc : src);
        setIsHighResSrc(true);
      };
      highResImage.src = supportsWebp && webpSrc ? webpSrc : src;
    }
  }, [lowResSrc, src, webpSrc, supportsWebp, isHighResSrc]);

  // Use webp if supported and available
  useEffect(() => {
    if (supportsWebp && webpSrc && isHighResSrc) {
      setImgSrc(webpSrc);
    } else if (isHighResSrc) {
      setImgSrc(src);
    }
  }, [supportsWebp, webpSrc, src, isHighResSrc]);

  // Test for WebP support
  const testWebP = () => {
    return new Promise<boolean>(resolve => {
      const webP = new Image();
      webP.onload = function() {
        resolve(true);
      };
      webP.onerror = function() {
        resolve(false);
      };
      webP.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAgA0JaQAA3AA/vz0AAA=';
    });
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    if (target.src !== fallback) {
      setImgSrc(fallback);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Handle relative paths for images in the public folder
  const finalSrc = imgSrc.startsWith('http') || imgSrc.startsWith('/') 
    ? imgSrc 
    : `/images/${imgSrc}`;

  // Prepare size props for better performance
  const sizeProps = {
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    ...(sizes ? { sizes } : {})
  };

  return (
    <div className="relative overflow-hidden">
      {!isLoaded && !priority && (
        <Skeleton className={cn("absolute inset-0", className)} />
      )}
      <img
        src={finalSrc}
        alt={alt}
        className={cn(
          "object-cover transition-all duration-500",
          isLoaded ? "opacity-100" : "opacity-0",
          lowResSrc && !isHighResSrc ? "blur-md scale-105" : "blur-0 scale-100",
          className
        )}
        onError={handleError}
        onLoad={handleLoad}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        {...sizeProps}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
