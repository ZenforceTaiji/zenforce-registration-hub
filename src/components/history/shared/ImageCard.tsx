
import { cn } from "@/lib/utils";

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
  return (
    <img 
      src={src} 
      alt={alt} 
      className={cn(
        "rounded-lg shadow-md object-cover w-full",
        heightClasses[height],
        className
      )}
    />
  );
};

export default ImageCard;
