
import { useState } from "react";
import { StudentGalleryVideo } from "../types";
import VideoGalleryItem from "./VideoGalleryItem";
import VideoDialog from "./dialogs/VideoDialog";
import { studentGalleryVideos } from "../mockData";

const VideosGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<StudentGalleryVideo | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleVideoClick = (video: StudentGalleryVideo) => {
    setSelectedVideo(video);
    setDialogOpen(true);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {studentGalleryVideos.map((video) => (
          <VideoGalleryItem
            key={video.id}
            video={video}
            onClick={handleVideoClick}
          />
        ))}
      </div>

      <VideoDialog
        video={selectedVideo}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default VideosGallery;
