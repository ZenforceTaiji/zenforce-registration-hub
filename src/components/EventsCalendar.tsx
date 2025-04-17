
import { useState } from "react";
import EventsHeader from "./events/EventsHeader";
import CalendarCard from "./events/CalendarCard";
import EventsList from "./events/EventsList";
import AddEventForm from "./events/AddEventForm";
import { Dialog } from "@/components/ui/dialog";
import { useEventManagement } from "./events/hooks/useEventManagement";

// Define a type for user roles
type UserRole = "admin" | "instructor" | "student" | "guest";

// User role simulation - in a real app, this would come from authentication context
// Roles: "admin", "instructor", "student", "guest"
const mockUserRole: UserRole = "student"; // Change this to test different roles

const EventsCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const {
    events,
    isAddingEvent,
    setIsAddingEvent,
    newEvent,
    setNewEvent,
    canManageEvents,
    handleAddEvent,
    handleDeleteEvent,
    handleBookEvent
  } = useEventManagement(mockUserRole);

  // Get the date on which each event occurs
  const eventDates = events.map(event => new Date(event.date));

  return (
    <div className="space-y-6">
      <EventsHeader 
        canManageEvents={canManageEvents} 
        setIsAddingEvent={setIsAddingEvent} 
        isAddingEvent={isAddingEvent}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CalendarCard 
          date={date} 
          setDate={setDate} 
          eventDates={eventDates} 
        />

        <EventsList 
          events={events} 
          date={date} 
          canManageEvents={canManageEvents} 
          handleDeleteEvent={handleDeleteEvent} 
          handleBookEvent={handleBookEvent} 
        />
      </div>

      {/* Dialog for adding events */}
      <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
        <AddEventForm 
          newEvent={newEvent} 
          setNewEvent={setNewEvent} 
          handleAddEvent={handleAddEvent} 
          setIsAddingEvent={setIsAddingEvent} 
        />
      </Dialog>
    </div>
  );
};

export default EventsCalendar;
