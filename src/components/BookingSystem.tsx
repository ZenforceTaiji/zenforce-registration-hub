
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import BookingDialog from "./BookingDialog";
import { Clock, Calendar as CalendarIcon } from "lucide-react";

// Define our event and booking types
interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

interface TimeSlot {
  id: number;
  time: string;
  available: boolean;
}

interface Instructor {
  id: number;
  name: string;
  specialties: string[];
  availableDates: string[];
}

// Mock data for events
const upcomingEvents: Event[] = [
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

// Mock data for instructors
const instructors: Instructor[] = [
  {
    id: 1,
    name: "Sensei Johnson",
    specialties: ["Karate", "Self-defense"],
    availableDates: ["2023-08-16", "2023-08-17", "2023-08-18", "2023-08-23", "2023-08-24"]
  },
  {
    id: 2,
    name: "Master Chen",
    specialties: ["Kung Fu", "Tai Chi"],
    availableDates: ["2023-08-14", "2023-08-15", "2023-08-21", "2023-08-22", "2023-08-28"]
  },
  {
    id: 3,
    name: "Coach Davis",
    specialties: ["Mixed Martial Arts", "Boxing"],
    availableDates: ["2023-08-19", "2023-08-20", "2023-08-26", "2023-08-27", "2023-09-02"]
  }
];

// Generate timeslots for each day
const generateTimeSlots = (date: string): TimeSlot[] => {
  // Check if there's an event on this date
  const eventsOnDate = upcomingEvents.filter(event => event.date === date);
  const bookedTimes = eventsOnDate.map(event => event.time);
  
  // Generate time slots from 9 AM to 8 PM
  const slots: TimeSlot[] = [];
  for (let hour = 9; hour <= 20; hour++) {
    const timeString = `${hour % 12 || 12}:00 ${hour < 12 ? 'AM' : 'PM'}`;
    slots.push({
      id: hour - 8,
      time: timeString,
      available: !bookedTimes.includes(timeString)
    });
  }
  
  return slots;
};

const BookingSystem = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  // Get available dates from all instructors
  const allAvailableDates = instructors.flatMap(instructor => 
    instructor.availableDates
  );
  
  // Get dates on which events are happening
  const eventDates = upcomingEvents.map(event => new Date(event.date));
  
  // When a date is selected
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedInstructor(null);
    setSelectedTimeSlot(null);
    
    if (date) {
      const dateString = date.toISOString().split('T')[0];
      // Find instructors available on this date
      const availableInstructors = instructors.filter(instructor => 
        instructor.availableDates.includes(dateString)
      );
      
      if (availableInstructors.length > 0) {
        // Automatically select the first available instructor
        setSelectedInstructor(availableInstructors[0]);
        
        // Generate time slots for this date
        const slots = generateTimeSlots(dateString);
        setAvailableTimeSlots(slots);
      } else {
        setAvailableTimeSlots([]);
        toast({
          title: "No instructors available",
          description: "There are no instructors available on this date.",
          variant: "destructive"
        });
      }
    }
  };
  
  // Handle instructor selection
  const handleInstructorSelect = (instructor: Instructor) => {
    setSelectedInstructor(instructor);
    setSelectedTimeSlot(null);
    
    if (selectedDate) {
      const dateString = selectedDate.toISOString().split('T')[0];
      // Generate time slots for this date and instructor
      const slots = generateTimeSlots(dateString);
      setAvailableTimeSlots(slots);
    }
  };
  
  // Handle timeslot selection
  const handleTimeSlotSelect = (timeSlot: TimeSlot) => {
    if (timeSlot.available) {
      setSelectedTimeSlot(timeSlot);
    }
  };
  
  // Handle booking
  const handleBookNow = () => {
    if (selectedDate && selectedInstructor && selectedTimeSlot) {
      setIsBookingOpen(true);
    } else {
      toast({
        title: "Incomplete selection",
        description: "Please select a date, instructor, and time slot to book.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Book a Session</h1>
      <p className="text-gray-600 mb-8">
        Select a date, instructor, and time to book a private lesson or special event.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Select a Date</CardTitle>
            <CardDescription>
              Choose from available dates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border"
              disabled={{ before: new Date() }}
              modifiers={{
                available: allAvailableDates.map(date => new Date(date)),
                event: eventDates
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
                }
              }}
            />
            <div className="mt-4 text-sm text-gray-500">
              <div className="flex items-center mb-2">
                <div className="w-4 h-4 bg-green-100 rounded-full mr-2"></div>
                <span>Available for booking</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-100 rounded-full mr-2"></div>
                <span>Scheduled events</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
            <CardDescription>
              {selectedDate 
                ? `Booking for ${selectedDate.toLocaleDateString()}`
                : "Select a date to see available instructors and times"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDate && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Available Instructors</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {instructors
                      .filter(instructor => 
                        instructor.availableDates.includes(selectedDate.toISOString().split('T')[0])
                      )
                      .map(instructor => (
                        <Button
                          key={instructor.id}
                          variant={selectedInstructor?.id === instructor.id ? "default" : "outline"}
                          className="justify-start h-auto py-3 text-left"
                          onClick={() => handleInstructorSelect(instructor)}
                        >
                          <div>
                            <div className="font-medium">{instructor.name}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {instructor.specialties.join(", ")}
                            </div>
                          </div>
                        </Button>
                      ))}
                  </div>
                </div>

                {selectedInstructor && availableTimeSlots.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-3">Available Time Slots</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {availableTimeSlots.map(slot => (
                        <Button
                          key={slot.id}
                          variant={selectedTimeSlot?.id === slot.id ? "default" : "outline"}
                          className={`justify-center ${!slot.available ? "opacity-50 cursor-not-allowed" : ""}`}
                          onClick={() => handleTimeSlotSelect(slot)}
                          disabled={!slot.available}
                        >
                          <Clock className="mr-2 h-4 w-4" />
                          {slot.time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTimeSlot && (
                  <div className="pt-4 border-t">
                    <div className="bg-gray-50 p-4 rounded-md mb-4">
                      <h3 className="font-medium mb-2">Booking Summary</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-gray-500">Date:</div>
                        <div className="font-medium flex items-center">
                          <CalendarIcon className="mr-1 h-4 w-4 text-gray-500" />
                          {selectedDate.toLocaleDateString()}
                        </div>
                        <div className="text-gray-500">Time:</div>
                        <div className="font-medium flex items-center">
                          <Clock className="mr-1 h-4 w-4 text-gray-500" />
                          {selectedTimeSlot.time}
                        </div>
                        <div className="text-gray-500">Instructor:</div>
                        <div className="font-medium">{selectedInstructor.name}</div>
                      </div>
                    </div>
                    <Button className="w-full" onClick={handleBookNow}>
                      Book Now
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {isBookingOpen && selectedDate && selectedInstructor && selectedTimeSlot && (
        <BookingDialog
          open={isBookingOpen}
          onOpenChange={setIsBookingOpen}
          date={selectedDate}
          instructor={selectedInstructor}
          timeSlot={selectedTimeSlot}
        />
      )}
    </div>
  );
};

export default BookingSystem;
