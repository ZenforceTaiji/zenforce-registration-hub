
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  start_time: string;
  end_time: string;
  location: string;
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
        <div className="grid gap-2">
          <Label htmlFor="location">Location</Label>
          <Input 
            id="location" 
            value={newEvent.location}
            onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
            placeholder="Enter event location"
          />
        </div>
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
