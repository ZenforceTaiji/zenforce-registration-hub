
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

export const useSupabaseEvents = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_public', true)
        .order('event_date', { ascending: true });
      
      if (error) {
        throw error;
      }
      
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: "Failed to load events",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddEvent = async (newEvent: Omit<Event, 'id'>) => {
    // Validate form
    if (!newEvent.title || !newEvent.event_date || !newEvent.start_time || !newEvent.end_time || !newEvent.location) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return false;
    }

    try {
      // Add event to Supabase
      const { data, error } = await supabase
        .from('events')
        .insert([newEvent])
        .select();

      if (error) {
        throw error;
      }

      // Add the new event to the state
      if (data && data.length > 0) {
        setEvents([...events, data[0]]);
      }
      
      toast({
        title: "Event added",
        description: "The event has been successfully added to the calendar",
      });
      return true;
    } catch (error) {
      console.error('Error adding event:', error);
      toast({
        title: "Failed to add event",
        description: "Please try again later",
        variant: "destructive"
      });
      return false;
    }
  };

  const handleDeleteEvent = async (id: string, canManageEvents: boolean) => {
    // Only allow admin/instructors to delete events
    if (!canManageEvents) {
      toast({
        title: "Permission denied",
        description: "You don't have permission to delete events",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Delete event from Supabase
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }
      
      // Update state
      setEvents(events.filter(event => event.id !== id));
      
      toast({
        title: "Event deleted",
        description: "The event has been removed from the calendar",
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: "Failed to delete event",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  const handleBookEvent = (eventId: string) => {
    toast({
      title: "Booking initiated",
      description: "Redirecting to booking form for this event",
    });
    // In a real app, this would redirect to the booking form with the event ID
    window.location.href = `/booking?eventId=${eventId}`;
  };

  return {
    events,
    isLoading,
    handleAddEvent,
    handleDeleteEvent,
    handleBookEvent
  };
};
