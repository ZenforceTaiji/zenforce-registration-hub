
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImagePlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const SiteSettingsTab = () => {
  const { toast } = useToast();
  const [logo, setLogo] = React.useState<string>("https://images.unsplash.com/photo-1500673922987-e212871fec22");
  const [coverImage, setCoverImage] = React.useState<string>("https://images.unsplash.com/photo-1500673922987-e212871fec22");

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, this would upload to Supabase storage
      const imageUrl = URL.createObjectURL(file);
      setLogo(imageUrl);
      toast({
        title: "Logo updated",
        description: "The logo has been successfully updated.",
      });
    }
  };

  const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, this would upload to Supabase storage
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
      toast({
        title: "Cover image updated",
        description: "The cover image has been successfully updated.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Site Settings</CardTitle>
          <CardDescription>
            Manage your website's logo and cover image
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>Logo</Label>
              <div className="mt-2 flex items-center gap-4">
                <img 
                  src={logo} 
                  alt="Site logo" 
                  className="h-12 w-auto object-contain"
                />
                <div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                    id="logo-upload"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('logo-upload')?.click()}
                  >
                    <ImagePlus className="mr-2 h-4 w-4" />
                    Change Logo
                  </Button>
                </div>
              </div>
            </div>
            
            <div>
              <Label>Cover Image</Label>
              <div className="mt-2 space-y-4">
                <img 
                  src={coverImage} 
                  alt="Cover" 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImageChange}
                    className="hidden"
                    id="cover-upload"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('cover-upload')?.click()}
                  >
                    <ImagePlus className="mr-2 h-4 w-4" />
                    Change Cover Image
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
