
import { useState } from "react";
import { GalleryVideo } from "./types";
import VideoGalleryItem from "./VideoGalleryItem";
import VideoDialog from "./dialogs/VideoDialog";
import { galleryVideos } from "./mockData";

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<GalleryVideo | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleVideoClick = (video: GalleryVideo) => {
    setSelectedVideo(video);
    setDialogOpen(true);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {galleryVideos.map((video) => (
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

export default VideoGallery;
