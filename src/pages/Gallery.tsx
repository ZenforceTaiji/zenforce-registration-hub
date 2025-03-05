
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MediaGallery from "@/components/gallery/MediaGallery";

const Gallery = () => {
  return (
    <div className="zen-container py-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Gallery</h1>
        <p className="text-gray-500 mt-1">Browse our collection of Taijiquan images and videos</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Media Gallery</CardTitle>
          <CardDescription>
            View images and videos from our classes, events, and performances
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MediaGallery />
        </CardContent>
      </Card>
    </div>
  );
};

export default Gallery;
