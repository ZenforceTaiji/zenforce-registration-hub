
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

// Define a type for user roles
type UserRole = "admin" | "instructor" | "student" | "guest";

// Mock data for events - in a real app, this would come from an API
const initialEvents: Event[] = [
  {
    id: 1,
    title: "Summer Grading Tournament",
    date: "2023-08-15",
    time: "10:00 AM",
    location: "Main Dojo",
    description: "Annual summer grading for all belt levels."
  },
  {
    id: 2,
    title: "Parent Workshop",
    date: "2023-08-22",
    time: "6:30 PM",
    location: "Conference Room",
    description: "Learn how to support your child's martial arts journey."
  },
  {
    id: 3,
    title: "Competition Preparation",
    date: "2023-09-05",
    time: "5:00 PM",
    location: "Training Hall",
    description: "Special training session for competition participants."
  }
];

export const useEventManagement = (userRole: UserRole = "student") => {
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({
    title: "",
    date: "",
    time: "",
    location: "",
    description: ""
  });

  // Check if user has permission to manage events
  const canManageEvents = ["admin", "instructor"].includes(userRole);

  const handleAddEvent = () => {
    // Validate form
    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.location) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Add new event
    const event: Event = {
      ...newEvent,
      id: events.length + 1
    };

    setEvents([...events, event]);
    
    // Reset form and close dialog
    setNewEvent({
      title: "",
      date: "",
      time: "",
      location: "",
      description: ""
    });
    setIsAddingEvent(false);
    
    toast({
      title: "Event added",
      description: "The event has been successfully added to the calendar",
    });
  };

  const handleDeleteEvent = (id: number) => {
    // Only allow admin/instructors to delete events
    if (!canManageEvents) {
      toast({
        title: "Permission denied",
        description: "You don't have permission to delete events",
        variant: "destructive"
      });
      return;
    }
    
    setEvents(events.filter(event => event.id !== id));
    toast({
      title: "Event deleted",
      description: "The event has been removed from the calendar",
    });
  };

  const handleBookEvent = (eventId: number) => {
    toast({
      title: "Booking initiated",
      description: "Redirecting to booking form for this event",
    });
    // In a real app, this would redirect to the booking form with the event ID
    window.location.href = `/booking?eventId=${eventId}`;
  };

  return {
    events,
    isAddingEvent,
    setIsAddingEvent,
    newEvent,
    setNewEvent,
    canManageEvents,
    handleAddEvent,
    handleDeleteEvent,
    handleBookEvent
  };
};
