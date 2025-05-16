
import { useState } from "react";
import { StudentGalleryVideo } from "../types";
import VideoGalleryItem from "./VideoGalleryItem";
import VideoDialog from "./dialogs/VideoDialog";

// Empty array for student gallery videos
const studentGalleryVideos: StudentGalleryVideo[] = [];

const VideosGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<StudentGalleryVideo | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleVideoClick = (video: StudentGalleryVideo) => {
    setSelectedVideo(video);
    setDialogOpen(true);
  };

  return (
    <div>
      {studentGalleryVideos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {studentGalleryVideos.map((video) => (
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

export default VideosGallery;
