
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, MapPin, Calendar as CalendarIcon, Trash2 } from "lucide-react";

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

interface SupabaseEventsListProps {
  events: Event[];
  isLoading: boolean;
  date: Date | undefined;
  canManageEvents: boolean;
  handleDeleteEvent: (id: string) => void;
  handleBookEvent: (id: string) => void;
}

const SupabaseEventsList: React.FC<SupabaseEventsListProps> = ({ 
  events, 
  isLoading, 
  date, 
  canManageEvents, 
  handleDeleteEvent,
  handleBookEvent 
}) => {
  // Filter events for the selected date
  const eventsForSelectedDate = date 
    ? events.filter(event => event.event_date === date.toISOString().split('T')[0])
    : [];

  // Determine which events to display
  const displayEvents = date ? eventsForSelectedDate : events;

  return (
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
              {displayEvents.map((event) => (
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
  );
};

export default SupabaseEventsList;
