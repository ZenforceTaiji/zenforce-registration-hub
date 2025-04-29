
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LocationType } from "./hooks/useSupabaseEvents";
import { Globe, MapPin, Globe as GlobeIcon } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  start_time: string;
  end_time: string;
  location: string;
  location_type?: LocationType;
  meeting_link?: string;
  is_public: boolean;
}

interface AddSupabaseEventFormProps {
  onAddEvent: (newEvent: Omit<Event, 'id'>) => Promise<boolean>;
  onCancel: () => void;
}

const AddSupabaseEventForm: React.FC<AddSupabaseEventFormProps> = ({ onAddEvent, onCancel }) => {
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({
    title: "",
    description: "",
    event_date: "",
    start_time: "",
    end_time: "",
    location: "",
    location_type: "in-person",
    meeting_link: "",
    is_public: true
  });

  const handleSubmit = async () => {
    const success = await onAddEvent(newEvent);
    if (success) {
      setNewEvent({
        title: "",
        description: "",
        event_date: "",
        start_time: "",
        end_time: "",
        location: "",
        location_type: "in-person",
        meeting_link: "",
        is_public: true
      });
    }
  };

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
              value={newEvent.event_date}
              onChange={(e) => setNewEvent({...newEvent, event_date: e.target.value})}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="start_time">Start Time</Label>
            <Input 
              id="start_time" 
              type="time"
              value={newEvent.start_time}
              onChange={(e) => setNewEvent({...newEvent, start_time: e.target.value})}
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="end_time">End Time</Label>
          <Input 
            id="end_time" 
            type="time"
            value={newEvent.end_time}
            onChange={(e) => setNewEvent({...newEvent, end_time: e.target.value})}
          />
        </div>

        {/* Location Type Selection */}
        <div className="grid gap-2">
          <Label>Location Type</Label>
          <RadioGroup 
            value={newEvent.location_type}
            onValueChange={(value) => setNewEvent({...newEvent, location_type: value as LocationType})}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="in-person" id="in-person" />
              <Label htmlFor="in-person" className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                In-person
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="online" id="online" />
              <Label htmlFor="online" className="flex items-center">
                <Globe className="mr-1 h-4 w-4" />
                Online
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hybrid" id="hybrid" />
              <Label htmlFor="hybrid" className="flex items-center">
                <GlobeIcon className="mr-1 h-4 w-4" />
                Hybrid
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Location Field - Always visible */}
        <div className="grid gap-2">
          <Label htmlFor="location">
            {newEvent.location_type === "in-person" ? "Physical Location" : 
             newEvent.location_type === "online" ? "Host Name/Platform" : 
             "Physical Location"}
          </Label>
          <Input 
            id="location" 
            value={newEvent.location}
            onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
            placeholder={
              newEvent.location_type === "in-person" ? "Enter physical address" : 
              newEvent.location_type === "online" ? "Enter host name or platform" : 
              "Enter physical address"
            }
          />
        </div>

        {/* Meeting Link - Only visible for Online and Hybrid */}
        {(newEvent.location_type === "online" || newEvent.location_type === "hybrid") && (
          <div className="grid gap-2">
            <Label htmlFor="meeting_link">Meeting Link</Label>
            <Input 
              id="meeting_link" 
              value={newEvent.meeting_link || ""}
              onChange={(e) => setNewEvent({...newEvent, meeting_link: e.target.value})}
              placeholder="Enter meeting URL"
              type="url"
            />
          </div>
        )}

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            value={newEvent.description || ''}
            onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
            placeholder="Enter event description"
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSubmit}>Add Event</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default AddSupabaseEventForm;
