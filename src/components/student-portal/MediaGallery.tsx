
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Expand, FileDown, Play } from "lucide-react";

// Sample image data
const sampleImages = [
  {
    id: "1",
    title: "13 Step Form Practice",
    date: "October 10, 2023",
    url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    category: "practice"
  },
  {
    id: "2",
    title: "Competition Day",
    date: "November 5, 2023",
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    category: "competition"
  },
  {
    id: "3",
    title: "Group Practice",
    date: "January 15, 2024",
    url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    category: "practice"
  },
  {
    id: "4",
    title: "Form Demonstration",
    date: "February 12, 2024",
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    category: "demonstration"
  },
  {
    id: "5",
    title: "Workshop Session",
    date: "March 3, 2024",
    url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    category: "workshop"
  }
];

// Sample video data
const sampleVideos = [
  {
    id: "1",
    title: "24 Step Form Performance",
    date: "December 15, 2023",
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    duration: "2:34",
    category: "performance"
  },
  {
    id: "2",
    title: "Training Session with Shifu Zhang",
    date: "January 20, 2024",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    duration: "15:22",
    category: "training"
  },
  {
    id: "3",
    title: "Competition Highlights",
    date: "February 18, 2024",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    duration: "8:15",
    category: "competition"
  }
];

const MediaGallery = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);

  const handleImageClick = (image: any) => {
    setSelectedImage(image);
    setImageDialogOpen(true);
  };

  const handleVideoClick = (video: any) => {
    setSelectedVideo(video);
    setVideoDialogOpen(true);
  };

  return (
    <div>
      <Tabs defaultValue="images">
        <TabsList className="mb-6">
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="images" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleImages.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-md border cursor-pointer"
                onClick={() => handleImageClick(image)}
              >
                <AspectRatio ratio={4/3}>
                  <img
                    src={image.url}
                    alt={image.title}
                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                  />
                </AspectRatio>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <div className="text-white w-full">
                    <h3 className="font-medium text-sm truncate">{image.title}</h3>
                    <p className="text-xs text-gray-300">{image.date}</p>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/40 rounded-full p-1.5">
                    <Expand className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="videos" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sampleVideos.map((video) => (
              <div
                key={video.id}
                className="group relative overflow-hidden rounded-md border cursor-pointer"
                onClick={() => handleVideoClick(video)}
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
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {video.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Image Dialog */}
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedImage?.title}</DialogTitle>
            <DialogDescription>
              {selectedImage?.date} • {selectedImage?.category}
            </DialogDescription>
          </DialogHeader>
          
          {selectedImage && (
            <div className="overflow-hidden rounded-lg">
              <img 
                src={selectedImage.url} 
                alt={selectedImage.title} 
                className="w-full h-auto object-contain"
              />
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setImageDialogOpen(false)}>
              Close
            </Button>
            <Button className="flex items-center gap-1">
              <FileDown className="h-4 w-4" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Video Dialog */}
      <Dialog open={videoDialogOpen} onOpenChange={setVideoDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
            <DialogDescription>
              {selectedVideo?.date} • {selectedVideo?.duration}
            </DialogDescription>
          </DialogHeader>
          
          {selectedVideo && (
            <div className="overflow-hidden rounded-lg bg-black">
              <AspectRatio ratio={16/9}>
                <div className="flex items-center justify-center h-full">
                  <img 
                    src={selectedVideo.thumbnail} 
                    alt={selectedVideo.title} 
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
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setVideoDialogOpen(false)}>
              Close
            </Button>
            <Button className="flex items-center gap-1">
              <FileDown className="h-4 w-4" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MediaGallery;
