
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DatePickerProps {
  selectedDate?: Date;
  onSelect: (date: Date | undefined) => void;
  availableDates: string[];
  eventDates: Date[];
  fullyBookedDates: Date[];
}

const DatePicker = ({ selectedDate, onSelect, availableDates, eventDates, fullyBookedDates }: DatePickerProps) => {
  return (
    <div>
      <CardTitle className="text-lg mb-2">Select a Date</CardTitle>
      <CardDescription className="mb-4">Choose from available dates</CardDescription>
      
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onSelect}
        className="rounded-md border pointer-events-auto"
        disabled={{ before: new Date() }}
        modifiers={{
          available: availableDates.map(date => new Date(date)),
          event: eventDates,
          booked: fullyBookedDates
        }}
        modifiersStyles={{
          available: { 
            backgroundColor: 'rgba(52, 211, 153, 0.1)',
            borderRadius: '100%'
          },
          event: { 
            fontWeight: 'bold',
            backgroundColor: 'rgba(196, 30, 58, 0.1)',
            borderRadius: '100%'
          },
          booked: {
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            borderRadius: '100%'
          }
        }}
      />
      
      <div className="mt-4 text-sm text-gray-500">
        <div className="flex items-center mb-2">
          <div className="w-4 h-4 bg-green-100 rounded-full mr-2"></div>
          <span>Available for booking</span>
        </div>
        <div className="flex items-center mb-2">
          <div className="w-4 h-4 bg-red-100 rounded-full mr-2"></div>
          <span>Scheduled events</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-200 rounded-full mr-2"></div>
          <span>Fully booked sessions</span>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
