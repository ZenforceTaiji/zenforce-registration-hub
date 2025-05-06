
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EventBannerSettings } from "./EventBannerSettings";
import { MFASettings } from "./MFASettings";
import { Shield } from "lucide-react";

export function SiteSettingsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Site Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure global website settings, content, and appearance
        </p>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic website configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3">
                <Label htmlFor="site-name">Site Name</Label>
                <Input id="site-name" defaultValue="ZenForce TaijiQuan SA" />
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="site-description">Site Description</Label>
                <Textarea 
                  id="site-description" 
                  defaultValue="Experience authentic TaijiQuan training in South Africa"
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="maintenance-mode">
                  Maintenance Mode
                </Label>
                <Switch id="maintenance-mode" />
              </div>
              
              <Button className="w-full mt-4">Save General Settings</Button>
            </CardContent>
          </Card>
          
          {/* Event Banner Settings */}
          <EventBannerSettings />
        </TabsContent>
        
        <TabsContent value="content" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Settings</CardTitle>
              <CardDescription>Manage website content configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="enable-blog">
                  Enable Blog Section
                </Label>
                <Switch id="enable-blog" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="enable-gallery">
                  Enable Gallery Section
                </Label>
                <Switch id="enable-gallery" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="enable-events">
                  Enable Events Calendar
                </Label>
                <Switch id="enable-events" defaultChecked />
              </div>
              
              <Button className="w-full mt-4">Save Content Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3">
                <Label htmlFor="primary-color">Primary Color</Label>
                <div className="flex space-x-2">
                  <Input id="primary-color" defaultValue="#b45309" className="w-full" />
                  <div className="h-10 w-10 rounded-md bg-amber-700" />
                </div>
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="secondary-color">Secondary Color</Label>
                <div className="flex space-x-2">
                  <Input id="secondary-color" defaultValue="#000000" className="w-full" />
                  <div className="h-10 w-10 rounded-md bg-black" />
                </div>
              </div>
              
              <Button className="w-full mt-4">Save Appearance Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4">
          {/* MFA Settings */}
          <MFASettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
