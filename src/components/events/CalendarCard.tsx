
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CalendarCardProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  eventDates: Date[];
}

const CalendarCard = ({ date, setDate, eventDates }: CalendarCardProps) => {
  return (
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
  );
};

export default CalendarCard;
