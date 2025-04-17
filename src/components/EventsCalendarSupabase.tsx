
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarPlus, Clock, MapPin, Calendar as CalendarIcon, Trash2, LockKeyhole } from "lucide-react";
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

// Define a type for user roles
type UserRole = "admin" | "instructor" | "student" | "guest";

const EventsCalendarSupabase = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({
    title: "",
    description: "",
    event_date: "",
    start_time: "",
    end_time: "",
    location: "",
    is_public: true
  });

  // Mock user role for now - in a real app, this would come from authentication context
  const mockUserRole: UserRole = "student"; 

  // Check if user has permission to manage events
  const canManageEvents = ["admin", "instructor"].includes(mockUserRole);

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

  const handleAddEvent = async () => {
    // Validate form
    if (!newEvent.title || !newEvent.event_date || !newEvent.start_time || !newEvent.end_time || !newEvent.location) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
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
      
      // Reset form and close dialog
      setNewEvent({
        title: "",
        description: "",
        event_date: "",
        start_time: "",
        end_time: "",
        location: "",
        is_public: true
      });
      setIsAddingEvent(false);
      
      toast({
        title: "Event added",
        description: "The event has been successfully added to the calendar",
      });
    } catch (error) {
      console.error('Error adding event:', error);
      toast({
        title: "Failed to add event",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  const handleDeleteEvent = async (id: string) => {
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

  // Filter events for the selected date
  const eventsForSelectedDate = date 
    ? events.filter(event => event.event_date === date.toISOString().split('T')[0])
    : [];

  // Get the date on which each event occurs
  const eventDates = events.map(event => new Date(event.event_date));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Events Calendar</h2>
        {canManageEvents ? (
          <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
            <DialogTrigger asChild>
              <Button>
                <CalendarPlus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </DialogTrigger>
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
                <Button variant="outline" onClick={() => setIsAddingEvent(false)}>Cancel</Button>
                <Button onClick={handleAddEvent}>Add Event</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <div className="flex items-center text-muted-foreground">
            <LockKeyhole className="mr-2 h-4 w-4" />
            <span className="text-sm">Event management restricted to admin/instructors</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>
              Select a date to view events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={{ before: new Date() }}
              modifiers={{
                event: eventDates
              }}
              modifiersStyles={{
                event: { 
                  fontWeight: 'bold',
                  backgroundColor: 'rgba(196, 30, 58, 0.1)',
                  borderRadius: '100%'
                }
              }}
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Events</CardTitle>
            <CardDescription>
              {date ? (
                <>Events for {date.toLocaleDateString()}</>
              ) : (
                <>All upcoming events</>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-6">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : date && eventsForSelectedDate.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                No events scheduled for this date
              </div>
            ) : !date && events.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                No upcoming events
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    {!date && <TableHead>Date</TableHead>}
                    <TableHead>Time</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(date ? eventsForSelectedDate : events).map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">
                        {event.title}
                        {event.description && (
                          <div className="text-xs text-gray-500 mt-1">
                            {event.description}
                          </div>
                        )}
                      </TableCell>
                      {!date && (
                        <TableCell>
                          <div className="flex items-center">
                            <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                            {new Date(event.event_date).toLocaleDateString()}
                          </div>
                        </TableCell>
                      )}
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-gray-500" />
                          {event.start_time} - {event.end_time}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                          {event.location}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleBookEvent(event.id)}
                          >
                            Book
                          </Button>
                          
                          {canManageEvents && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeleteEvent(event.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventsCalendarSupabase;
