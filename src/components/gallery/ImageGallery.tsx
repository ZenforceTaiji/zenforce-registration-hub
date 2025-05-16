
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
      {galleryImages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <ImageGalleryItem 
              key={image.id} 
              image={image} 
              onClick={handleImageClick} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border rounded-lg bg-gray-50">
          <p className="text-gray-500">No images available</p>
        </div>
      )}

      <ImageDialog
        image={selectedImage}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default ImageGallery;
