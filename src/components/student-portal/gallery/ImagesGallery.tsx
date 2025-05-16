
import { useState } from "react";
import { StudentGalleryImage } from "../types";
import ImageGalleryItem from "./ImageGalleryItem";
import ImageDialog from "./dialogs/ImageDialog";

// Empty array for student gallery images
const studentGalleryImages: StudentGalleryImage[] = [];

const ImagesGallery = () => {
  const [selectedImage, setSelectedImage] = useState<StudentGalleryImage | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleImageClick = (image: StudentGalleryImage) => {
    setSelectedImage(image);
    setDialogOpen(true);
  };

  return (
    <div>
      {studentGalleryImages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {studentGalleryImages.map((image) => (
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

export default ImagesGallery;
