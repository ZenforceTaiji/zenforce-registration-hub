
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GalleryImage } from "../types";

interface ImageDialogProps {
  image: GalleryImage | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ImageDialog = ({ image, open, onOpenChange }: ImageDialogProps) => {
  if (!image) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{image.title}</DialogTitle>
          <DialogDescription>
            {image.date} • <Badge variant="outline">{image.category}</Badge>
          </DialogDescription>
        </DialogHeader>
        
        <div className="overflow-hidden rounded-lg">
          <img 
            src={image.url} 
            alt={image.title} 
            className="w-full h-auto object-contain"
          />
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

export default ImageDialog;
