
import { cn } from "@/lib/utils";
import OptimizedImage from "@/components/ui/optimized-image";

interface ImageCardProps {
  src: string;
  alt: string;
  className?: string;
  height?: "sm" | "md" | "lg";
}

const heightClasses = {
  sm: "h-40",
  md: "h-48",
  lg: "h-80",
};

const ImageCard = ({ src, alt, className, height = "md" }: ImageCardProps) => {
  // Generate webp and avif versions if src is a regular URL
  const webpSrc = src.includes('?') 
    ? `${src}&fm=webp` 
    : `${src}?fm=webp`;
    
  const avifSrc = src.includes('?')
    ? `${src}&fm=avif`
    : `${src}?fm=avif`;
    
  // Generate low-res blur-up version
  const lowResSrc = src.includes('?')
    ? `${src}&w=20&blur=5`
    : `${src}?w=20&blur=5`;

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={cn(
        "rounded-lg shadow-md object-cover w-full",
        heightClasses[height],
        className
      )}
      webpSrc={webpSrc}
      avifSrc={avifSrc}
      lowResSrc={lowResSrc}
    />
  );
};

export default ImageCard;
