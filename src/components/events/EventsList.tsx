
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, MapPin, Calendar as CalendarIcon, Trash2, Globe, Link } from "lucide-react";

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

interface EventsListProps {
  events: Event[];
  date: Date | undefined;
  canManageEvents: boolean;
  handleDeleteEvent: (id: number) => void;
  handleBookEvent: (id: number) => void;
}

const EventsList = ({ events, date, canManageEvents, handleDeleteEvent, handleBookEvent }: EventsListProps) => {
  // Filter events for the selected date
  const eventsForSelectedDate = date 
    ? events.filter(event => event.date === date.toISOString().split('T')[0])
    : [];

  // Determine which events to display
  const displayEvents = date ? eventsForSelectedDate : events;

  // Helper function to render location with the right icon
  const renderLocationInfo = (event: Event) => {
    if (event.locationType === "in-person") {
      return (
        <div>
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4 text-gray-500" />
            {event.location}
          </div>
          {event.mapLocation && (
            <div className="text-xs text-gray-500 mt-1 ml-6">
              {event.mapLocation}
            </div>
          )}
        </div>
      );
    }
    
    if (event.locationType === "online") {
      return (
        <div>
          <div className="flex items-center">
            <Globe className="mr-2 h-4 w-4 text-gray-500" />
            {event.location}
          </div>
          {event.onlineLink && (
            <div className="text-xs text-blue-500 mt-1 ml-6 flex items-center">
              <Link className="h-3 w-3 mr-1" />
              <a href={event.onlineLink} target="_blank" rel="noopener noreferrer">
                Join online meeting
              </a>
            </div>
          )}
        </div>
      );
    }
    
    // Hybrid
    return (
      <div>
        <div className="flex items-center">
          <div className="flex space-x-1 mr-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <Globe className="h-4 w-4 text-gray-500" />
          </div>
          {event.location}
        </div>
        {event.mapLocation && (
          <div className="text-xs text-gray-500 mt-1 ml-6 flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {event.mapLocation}
          </div>
        )}
        {event.onlineLink && (
          <div className="text-xs text-blue-500 mt-1 ml-6 flex items-center">
            <Link className="h-3 w-3 mr-1" />
            <a href={event.onlineLink} target="_blank" rel="noopener noreferrer">
              Join online meeting
            </a>
          </div>
        )}
      </div>
    );
  };

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
        {date && eventsForSelectedDate.length === 0 ? (
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
                    <div className="text-xs text-gray-500 mt-1">
                      {event.description}
                    </div>
                  </TableCell>
                  {!date && (
                    <TableCell>
                      <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                    </TableCell>
                  )}
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-gray-500" />
                      {event.time}
                    </div>
                  </TableCell>
                  <TableCell>
                    {renderLocationInfo(event)}
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

export default EventsList;
