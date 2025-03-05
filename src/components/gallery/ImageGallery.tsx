
import { useState } from "react";
import { GalleryImage } from "./types";
import ImageGalleryItem from "./ImageGalleryItem";
import ImageDialog from "./dialogs/ImageDialog";
import { galleryImages } from "./mockData";

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    setDialogOpen(true);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image) => (
          <ImageGalleryItem 
            key={image.id} 
            image={image} 
            onClick={handleImageClick} 
          />
        ))}
      </div>

      <ImageDialog
        image={selectedImage}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default ImageGallery;
