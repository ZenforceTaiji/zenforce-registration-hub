
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Upload, Layout, Type, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const SiteSettingsTab = () => {
  const { toast } = useToast();
  const [logo, setLogo] = useState<string>("https://images.unsplash.com/photo-1500673922987-e212871fec22");
  const [coverImage, setCoverImage] = useState<string>("https://images.unsplash.com/photo-1500673922987-e212871fec22");
  const [banner, setBanner] = useState<string>("https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7");
  const [activeTab, setActiveTab] = useState("branding");
  
  // Color scheme state
  const [primaryColor, setPrimaryColor] = useState("#9b87f5");
  const [secondaryColor, setSecondaryColor] = useState("#7E69AB");
  const [accentColor, setAccentColor] = useState("#D6BCFA");
  
  // Content state
  const [siteTitle, setSiteTitle] = useState("ZenForce TaijiQuan");
  const [homePageDescription, setHomePageDescription] = useState("Learn the ancient art of TaijiQuan with our experienced instructors.");
  const [aboutText, setAboutText] = useState("ZenForce TaijiQuan is dedicated to teaching authentic Taiji techniques passed down through generations.");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, setImageFn: (url: string) => void, imageName: string) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, this would upload to Supabase storage
      const imageUrl = URL.createObjectURL(file);
      setImageFn(imageUrl);
      toast({
        title: `${imageName} updated`,
        description: `The ${imageName.toLowerCase()} has been successfully updated.`,
      });
    }
  };

  const handleColorUpdate = () => {
    // In a real app, this would update CSS variables or a theme configuration in the database
    toast({
      title: "Color scheme updated",
      description: "The website colors have been updated successfully.",
    });
  };

  const handleContentUpdate = () => {
    // In a real app, this would update site content in the database
    toast({
      title: "Content updated",
      description: "The website content has been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="branding">
            <ImagePlus className="mr-2 h-4 w-4" />
            Branding
          </TabsTrigger>
          <TabsTrigger value="colors">
            <Palette className="mr-2 h-4 w-4" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="content">
            <Type className="mr-2 h-4 w-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="layout">
            <Layout className="mr-2 h-4 w-4" />
            Layout
          </TabsTrigger>
        </TabsList>

        {/* Branding Tab */}
        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <CardTitle>Branding Settings</CardTitle>
              <CardDescription>
                Manage your website's logo and images
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
                        onChange={(e) => handleImageUpload(e, setLogo, "Logo")}
                        className="hidden"
                        id="logo-upload"
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById('logo-upload')?.click()}
                      >
                        <Upload className="mr-2 h-4 w-4" />
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
                        onChange={(e) => handleImageUpload(e, setCoverImage, "Cover image")}
                        className="hidden"
                        id="cover-upload"
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById('cover-upload')?.click()}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Change Cover Image
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Banner Image</Label>
                  <div className="mt-2 space-y-4">
                    <img 
                      src={banner} 
                      alt="Banner" 
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, setBanner, "Banner image")}
                        className="hidden"
                        id="banner-upload"
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById('banner-upload')?.click()}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Change Banner Image
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Colors Tab */}
        <TabsContent value="colors">
          <Card>
            <CardHeader>
              <CardTitle>Color Scheme</CardTitle>
              <CardDescription>
                Customize your website's colors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="accentColor"
                        type="color"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button onClick={handleColorUpdate}>
                    Save Color Scheme
                  </Button>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-3">Preview</h3>
                  <div className="grid grid-cols-3 gap-2 h-24">
                    <div 
                      className="rounded-md flex items-center justify-center text-white" 
                      style={{ backgroundColor: primaryColor }}
                    >
                      Primary
                    </div>
                    <div 
                      className="rounded-md flex items-center justify-center text-white" 
                      style={{ backgroundColor: secondaryColor }}
                    >
                      Secondary
                    </div>
                    <div 
                      className="rounded-md flex items-center justify-center" 
                      style={{ backgroundColor: accentColor }}
                    >
                      Accent
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Settings</CardTitle>
              <CardDescription>
                Update website text and descriptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="siteTitle">Site Title</Label>
                  <Input
                    id="siteTitle"
                    value={siteTitle}
                    onChange={(e) => setSiteTitle(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="homePageDescription">Home Page Description</Label>
                  <Textarea
                    id="homePageDescription"
                    value={homePageDescription}
                    onChange={(e) => setHomePageDescription(e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="aboutText">About Section</Label>
                  <Textarea
                    id="aboutText"
                    value={aboutText}
                    onChange={(e) => setAboutText(e.target.value)}
                    rows={5}
                  />
                </div>
                
                <Button onClick={handleContentUpdate}>
                  Save Content Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Layout Tab */}
        <TabsContent value="layout">
          <Card>
            <CardHeader>
              <CardTitle>Layout Settings</CardTitle>
              <CardDescription>
                Customize how content is arranged on your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Home Page Layout</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <Button variant="outline" className="h-auto p-4 flex flex-col space-y-2">
                      <div className="w-full bg-muted h-24 flex flex-col">
                        <div className="h-1/2 bg-muted-foreground/20"></div>
                        <div className="h-1/2 grid grid-cols-3 gap-1 p-1">
                          <div className="bg-muted-foreground/20"></div>
                          <div className="bg-muted-foreground/20"></div>
                          <div className="bg-muted-foreground/20"></div>
                        </div>
                      </div>
                      <span>Standard</span>
                    </Button>
                    
                    <Button variant="outline" className="h-auto p-4 flex flex-col space-y-2">
                      <div className="w-full bg-muted h-24 flex flex-col">
                        <div className="h-1/3 bg-muted-foreground/20"></div>
                        <div className="h-2/3 grid grid-cols-2 gap-1 p-1">
                          <div className="bg-muted-foreground/20"></div>
                          <div className="bg-muted-foreground/20"></div>
                        </div>
                      </div>
                      <span>Featured</span>
                    </Button>
                    
                    <Button variant="outline" className="h-auto p-4 flex flex-col space-y-2">
                      <div className="w-full bg-muted h-24 grid grid-cols-12 gap-1 p-1">
                        <div className="col-span-4 bg-muted-foreground/20"></div>
                        <div className="col-span-8 bg-muted-foreground/20"></div>
                      </div>
                      <span>Split</span>
                    </Button>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button>
                    Save Layout Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
