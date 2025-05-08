
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
  avifSrc?: string; // Add support for AVIF format
  width?: number;
  height?: number;
  sizes?: string;
  lowResSrc?: string; // Low resolution src for blur-up loading
}

/**
 * Optimized Image component with webp/avif support, lazy loading, and progressive loading
 */
const OptimizedImage = ({ 
  src, 
  alt, 
  className, 
  fallback = "/images/placeholder.jpg",
  priority = false,
  webpSrc,
  avifSrc,
  width,
  height,
  sizes,
  lowResSrc,
  ...props 
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(lowResSrc || src);
  const [supportsWebp, setSupportsWebp] = useState(false);
  const [supportsAvif, setSupportsAvif] = useState(false);
  const [isHighResSrc, setIsHighResSrc] = useState(!!lowResSrc ? false : true);
  
  // Check for modern format support on mount
  useEffect(() => {
    const checkImageSupport = async () => {
      const webpSupported = await testWebP();
      const avifSupported = await testAVIF();
      setSupportsWebp(webpSupported);
      setSupportsAvif(avifSupported);
    };
    
    checkImageSupport();
    
    // Set up blur-up effect for image loading (if lowResSrc is provided)
    if (lowResSrc && !isHighResSrc) {
      const highResImage = new Image();
      highResImage.onload = () => {
        // Once high-res image is loaded, switch to it
        if (supportsAvif && avifSrc) {
          setImgSrc(avifSrc);
        } else if (supportsWebp && webpSrc) {
          setImgSrc(webpSrc);
        } else {
          setImgSrc(src);
        }
        setIsHighResSrc(true);
      };
      
      // Load best format based on browser support
      if (supportsAvif && avifSrc) {
        highResImage.src = avifSrc;
      } else if (supportsWebp && webpSrc) {
        highResImage.src = webpSrc;
      } else {
        highResImage.src = src;
      }
    }
  }, [lowResSrc, src, webpSrc, avifSrc, supportsWebp, supportsAvif, isHighResSrc]);

  // Use best format if supported and available
  useEffect(() => {
    if (isHighResSrc) {
      if (supportsAvif && avifSrc) {
        setImgSrc(avifSrc);
      } else if (supportsWebp && webpSrc) {
        setImgSrc(webpSrc);
      } else {
        setImgSrc(src);
      }
    }
  }, [supportsWebp, supportsAvif, webpSrc, avifSrc, src, isHighResSrc]);

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
  
  // Test for AVIF support
  const testAVIF = () => {
    return new Promise<boolean>(resolve => {
      const avif = new Image();
      avif.onload = function() {
        resolve(true);
      };
      avif.onerror = function() {
        resolve(false);
      };
      avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK';
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
      
      {/* Use picture element for modern format support */}
      <picture>
        {avifSrc && <source srcSet={avifSrc} type="image/avif" />}
        {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
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
          {...(priority ? { fetchPriority: "high" } : { fetchPriority: "auto" })}
          {...sizeProps}
          {...props}
        />
      </picture>
    </div>
  );
};

export default OptimizedImage;
