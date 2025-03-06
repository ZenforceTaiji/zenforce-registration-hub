
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Expand } from "lucide-react";
import { StudentGalleryImage } from "../types";

interface ImageGalleryItemProps {
  image: StudentGalleryImage;
  onClick: (image: StudentGalleryImage) => void;
}

const ImageGalleryItem = ({ image, onClick }: ImageGalleryItemProps) => {
  return (
    <div
      key={image.id}
      className="group relative overflow-hidden rounded-md border cursor-pointer"
      onClick={() => onClick(image)}
    >
      <AspectRatio ratio={4/3}>
        <img
          src={image.url}
          alt={image.title}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
      </AspectRatio>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
        <div className="text-white w-full">
          <h3 className="font-medium text-sm truncate">{image.title}</h3>
          <p className="text-xs text-gray-300">{image.date}</p>
        </div>
        <div className="absolute top-2 right-2 bg-black/40 rounded-full p-1.5">
          <Expand className="h-4 w-4 text-white" />
        </div>
      </div>
    </div>
  );
};

export default ImageGalleryItem;
