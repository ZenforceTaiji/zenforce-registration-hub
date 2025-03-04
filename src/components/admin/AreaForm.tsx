
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface AreaFormProps {
  onAddArea: (area: any) => void;
}

const AreaForm = ({ onAddArea }: AreaFormProps) => {
  const { toast } = useToast();
  const [areaName, setAreaName] = useState("");
  const [areaDescription, setAreaDescription] = useState("");
  
  const handleAddArea = () => {
    if (!areaName.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter an area name",
        variant: "destructive"
      });
      return;
    }
    
    // Create new area
    const newArea = {
      id: Date.now(),
      name: areaName,
      description: areaDescription,
      students: 0,
      instructors: 0
    };
    
    // Add area via callback
    onAddArea(newArea);
    
    toast({
      title: "Area Added",
      description: `${areaName} has been added to the system`,
    });
    
    // Reset form
    setAreaName("");
    setAreaDescription("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Area</CardTitle>
        <CardDescription>
          Create a new geographic teaching area
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="areaName">Area Name</Label>
            <Input 
              id="areaName" 
              value={areaName}
              onChange={(e) => setAreaName(e.target.value)}
              placeholder="Enter area name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="areaDescription">Area Description</Label>
            <Textarea 
              id="areaDescription" 
              value={areaDescription}
              onChange={(e) => setAreaDescription(e.target.value)}
              placeholder="Describe the geographic area"
              className="min-h-[100px]"
            />
          </div>
          
          <Button 
            className="w-full mt-4"
            onClick={handleAddArea}
          >
            Add Area
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AreaForm;
