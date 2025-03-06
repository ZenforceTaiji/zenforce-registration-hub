
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileDown, Play } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { StudentGalleryVideo } from "../types";

interface VideoDialogProps {
  video: StudentGalleryVideo | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VideoDialog = ({ video, open, onOpenChange }: VideoDialogProps) => {
  if (!video) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{video.title}</DialogTitle>
          <DialogDescription>
            {video.date} • {video.duration}
          </DialogDescription>
        </DialogHeader>
        
        <div className="overflow-hidden rounded-lg bg-black">
          <AspectRatio ratio={16/9}>
            <div className="flex items-center justify-center h-full">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-auto object-cover opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-full p-5">
                  <Play className="h-8 w-8 text-accent-red" fill="currentColor" />
                </div>
                <p className="absolute bottom-4 text-white text-sm">
                  Video playback would be implemented here in a production environment
                </p>
              </div>
            </div>
          </AspectRatio>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button className="flex items-center gap-1">
            <FileDown className="h-4 w-4" />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VideoDialog;
