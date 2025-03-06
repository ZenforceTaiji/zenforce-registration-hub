
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImagesGallery from "./ImagesGallery";
import VideosGallery from "./VideosGallery";

const MediaGallery = () => {
  return (
    <div>
      <Tabs defaultValue="images">
        <TabsList className="mb-6">
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
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
