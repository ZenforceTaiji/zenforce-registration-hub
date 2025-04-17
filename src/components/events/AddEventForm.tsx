
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
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
