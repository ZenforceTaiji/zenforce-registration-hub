
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Globe, MapPin } from "lucide-react";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  locationType: "in-person" | "online" | "hybrid";
  mapLocation?: string;
  onlineLink?: string;
}

interface AddEventFormProps {
  newEvent: Omit<Event, 'id'>;
  setNewEvent: React.Dispatch<React.SetStateAction<Omit<Event, 'id'>>>;
  handleAddEvent: () => void;
  setIsAddingEvent: (isAdding: boolean) => void;
}

const AddEventForm = ({ newEvent, setNewEvent, handleAddEvent, setIsAddingEvent }: AddEventFormProps) => {
  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Add New Event</DialogTitle>
        <DialogDescription>
          Create a new event for the calendar. Fill in all the required information.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Event Title</Label>
          <Input 
            id="title" 
            value={newEvent.title}
            onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
            placeholder="Enter event title"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input 
              id="date" 
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="time">Time</Label>
            <Input 
              id="time" 
              type="time"
              value={newEvent.time}
              onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Location Type</Label>
          <RadioGroup 
            value={newEvent.locationType || "in-person"} 
            onValueChange={(value) => setNewEvent({
              ...newEvent, 
              locationType: value as "in-person" | "online" | "hybrid"
            })} 
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="in-person" id="in-person" />
              <Label htmlFor="in-person" className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                In-Person
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="online" id="online" />
              <Label htmlFor="online" className="flex items-center">
                <Globe className="mr-2 h-4 w-4" />
                Online
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hybrid" id="hybrid" />
              <Label htmlFor="hybrid" className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                <Globe className="ml-1 mr-2 h-4 w-4" />
                Hybrid (Both)
              </Label>
            </div>
          </RadioGroup>
        </div>

        {(newEvent.locationType === "in-person" || newEvent.locationType === "hybrid") && (
          <div className="grid gap-2">
            <Label htmlFor="mapLocation">In-Person Location</Label>
            <Input 
              id="mapLocation" 
              value={newEvent.mapLocation || ""}
              onChange={(e) => setNewEvent({...newEvent, mapLocation: e.target.value})}
              placeholder="Enter physical location address"
            />
          </div>
        )}
        
        {(newEvent.locationType === "online" || newEvent.locationType === "hybrid") && (
          <div className="grid gap-2">
            <Label htmlFor="onlineLink">Online Meeting Link</Label>
            <Input 
              id="onlineLink" 
              value={newEvent.onlineLink || ""}
              onChange={(e) => setNewEvent({...newEvent, onlineLink: e.target.value})}
              placeholder="Enter Zoom, Teams, or other meeting link"
            />
          </div>
        )}

        <div className="grid gap-2">
          <Label htmlFor="location">Location Display Name</Label>
          <Input 
            id="location" 
            value={newEvent.location}
            onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
            placeholder="Enter a short location name to display"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            value={newEvent.description}
            onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
            placeholder="Enter event description"
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => setIsAddingEvent(false)}>Cancel</Button>
        <Button onClick={handleAddEvent}>Add Event</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default AddEventForm;
