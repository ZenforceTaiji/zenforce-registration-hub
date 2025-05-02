
import { cn } from "@/lib/utils";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
}

/**
 * Reusable Image component with fallback support
 */
const Image = ({ src, alt, className, fallback = "/images/placeholder.jpg", ...props }: ImageProps) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    if (target.src !== fallback) {
      target.src = fallback;
    }
  };

  // Handle relative paths for images in the public folder
  const imageSrc = src.startsWith('http') || src.startsWith('/') 
    ? src 
    : `/images/${src}`;

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={cn("object-cover", className)}
      onError={handleError}
      loading="lazy"
      {...props}
    />
  );
};

export default Image;
