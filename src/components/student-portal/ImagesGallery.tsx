
import { useState } from "react";
import { StudentGalleryImage } from "./types";
import ImageGalleryItem from "./ImageGalleryItem";
import ImageDialog from "./dialogs/ImageDialog";
import { studentGalleryImages } from "./mockData";

const ImagesGallery = () => {
  const [selectedImage, setSelectedImage] = useState<StudentGalleryImage | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleImageClick = (image: StudentGalleryImage) => {
    setSelectedImage(image);
    setDialogOpen(true);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {studentGalleryImages.map((image) => (
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

export default ImagesGallery;
