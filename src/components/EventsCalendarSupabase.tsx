
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { useSupabaseEvents } from "./events/hooks/useSupabaseEvents";
import CalendarCard from "./events/CalendarCard";
import SupabaseEventsList from "./events/SupabaseEventsList";
import EventsHeader from "./events/EventsHeader";
import AddSupabaseEventForm from "./events/AddSupabaseEventForm";

// Define a type for user roles
type UserRole = "admin" | "instructor" | "student" | "guest";

const EventsCalendarSupabase = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  // Mock user role for now - in a real app, this would come from authentication context
  const mockUserRole: UserRole = "student"; 

  // Check if user has permission to manage events
  const canManageEvents = ["admin", "instructor"].includes(mockUserRole);

  const { events, isLoading, handleAddEvent, handleDeleteEvent, handleBookEvent } = useSupabaseEvents();

  // Get the date on which each event occurs
  const eventDates = events.map(event => new Date(event.event_date));

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

        <SupabaseEventsList
          events={events}
          isLoading={isLoading}
          date={date}
          canManageEvents={canManageEvents}
          handleDeleteEvent={(id) => handleDeleteEvent(id, canManageEvents)}
          handleBookEvent={handleBookEvent}
        />
      </div>

      {canManageEvents && (
        <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
          <AddSupabaseEventForm
            onAddEvent={async (newEvent) => {
              const success = await handleAddEvent(newEvent);
              if (success) {
                setIsAddingEvent(false);
              }
              return success;
            }}
            onCancel={() => setIsAddingEvent(false)}
          />
        </Dialog>
      )}
    </div>
  );
};

export default EventsCalendarSupabase;
