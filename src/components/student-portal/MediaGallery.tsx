
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageIcon, Video } from "lucide-react";
import ImagesGallery from "./gallery/ImagesGallery";
import VideosGallery from "./gallery/VideosGallery";

const MediaGallery = () => {
  return (
    <div>
      <Tabs defaultValue="images" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-2">
          <TabsTrigger value="images" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Images
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Videos
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="images" className="mt-0">
          <ImagesGallery />
        </TabsContent>
        
        <TabsContent value="videos" className="mt-0">
          <VideosGallery />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MediaGallery;
