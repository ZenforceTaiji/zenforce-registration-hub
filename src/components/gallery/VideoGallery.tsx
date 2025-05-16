
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
      {galleryVideos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {galleryVideos.map((video) => (
            <VideoGalleryItem 
              key={video.id} 
              video={video} 
              onClick={handleVideoClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border rounded-lg bg-gray-50">
          <p className="text-gray-500">No videos available</p>
        </div>
      )}

      <VideoDialog
        video={selectedVideo}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default VideoGallery;
