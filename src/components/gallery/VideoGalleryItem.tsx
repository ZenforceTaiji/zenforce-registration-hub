
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import { GalleryVideo } from "./types";

interface VideoGalleryItemProps {
  video: GalleryVideo;
  onClick: (video: GalleryVideo) => void;
}

const VideoGalleryItem = ({ video, onClick }: VideoGalleryItemProps) => {
  return (
    <div
      key={video.id}
      className="group relative overflow-hidden rounded-md border cursor-pointer"
      onClick={() => onClick(video)}
    >
      <AspectRatio ratio={16/9}>
        <img
          src={video.thumbnail}
          alt={video.title}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/50 rounded-full p-3">
            <Play className="h-6 w-6 text-white" fill="white" />
          </div>
        </div>
      </AspectRatio>
      <div className="p-3 border-t">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-sm">{video.title}</h3>
            <p className="text-xs text-gray-500">{video.date}</p>
          </div>
          <Badge variant="outline" className="text-xs">
            {video.duration}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default VideoGalleryItem;
