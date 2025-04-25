
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BookingDialog from "./BookingDialog";
import SessionTypeSelector from "./booking/SessionTypeSelector";
import DatePicker from "./booking/DatePicker";
import InstructorSelector from "./booking/InstructorSelector";
import TimeSlotSelector from "./booking/TimeSlotSelector";
import { Event, Instructor, TimeSlot } from "./booking/types";
import { formatDateToString, isDateFullyBooked, generateTimeSlots } from "./booking/utils";

// Mock data imports
import { upcomingEvents, instructors } from "./booking/mockData";

const BookingSystem = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSessionType, setSelectedSessionType] = useState<string | undefined>(undefined);
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  const allAvailableDates = instructors.flatMap(instructor => instructor.availableDates);
  const eventDates = upcomingEvents.map(event => new Date(event.date));
  const fullyBookedOnlineDates = upcomingEvents
    .filter(event => 
      (event.type === "online-individual" && event.registeredUsers >= 10) || 
      (event.type === "online-group" && event.registeredUsers >= 20)
    )
    .map(event => new Date(event.date));
  
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedInstructor(null);
    setSelectedTimeSlot(null);
    
    if (date) {
      const dateString = formatDateToString(date);
      const availableInstructors = instructors.filter(instructor => 
        instructor.availableDates.includes(dateString)
      );
      
      if (availableInstructors.length > 0) {
        setSelectedInstructor(availableInstructors[0]);
        const slots = generateTimeSlots(dateString, selectedSessionType, upcomingEvents);
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
  
  const handleInstructorSelect = (instructor: Instructor) => {
    setSelectedInstructor(instructor);
    setSelectedTimeSlot(null);
    
    if (selectedDate) {
      const dateString = formatDateToString(selectedDate);
      const slots = generateTimeSlots(dateString, selectedSessionType, upcomingEvents);
      setAvailableTimeSlots(slots);
    }
  };
  
  const handleSessionTypeSelect = (type: string) => {
    setSelectedSessionType(type);
    setSelectedTimeSlot(null);
    
    if (selectedDate) {
      const dateString = formatDateToString(selectedDate);
      const slots = generateTimeSlots(dateString, type, upcomingEvents);
      setAvailableTimeSlots(slots);
    }
  };
  
  const handleTimeSlotSelect = (timeSlot: TimeSlot) => {
    if (timeSlot.available) {
      setSelectedTimeSlot(timeSlot);
    } else {
      toast({
        title: "Time slot unavailable",
        description: "This time slot is fully booked or not available.",
        variant: "destructive"
      });
    }
  };
  
  const handleBookNow = () => {
    if (selectedDate && selectedInstructor && selectedTimeSlot) {
      if (selectedTimeSlot.type === "online-individual" && selectedTimeSlot.registeredUsers >= 10) {
        toast({
          title: "Session fully booked",
          description: "This online individual session has reached its capacity of 10 users.",
          variant: "destructive"
        });
        return;
      }
      
      if (selectedTimeSlot.type === "online-group" && selectedTimeSlot.registeredUsers >= 20) {
        toast({
          title: "Session fully booked",
          description: "This online group session has reached its capacity of 20 users.",
          variant: "destructive"
        });
        return;
      }
      
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
          <CardContent className="pt-6">
            <SessionTypeSelector
              selectedType={selectedSessionType}
              onSelect={handleSessionTypeSelect}
            />
            <div className="mt-6">
              <DatePicker
                selectedDate={selectedDate}
                onSelect={handleDateSelect}
                availableDates={allAvailableDates}
                eventDates={eventDates}
                fullyBookedDates={fullyBookedOnlineDates}
              />
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
            {selectedDate ? (
              <>
                {selectedSessionType === "online" && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-md">
                    <h3 className="font-medium flex items-center text-blue-800">
                      <AlertCircle className="mr-2 h-5 w-5" />
                      Online Session Capacity Information
                    </h3>
                    <p className="mt-2 text-blue-700 text-sm">
                      Individual sessions: Maximum 10 participants per session.<br />
                      Group sessions: Maximum 20 participants per session.
                    </p>
                  </div>
                )}
                
                <div className="space-y-6">
                  <InstructorSelector
                    instructors={instructors}
                    selectedDate={selectedDate}
                    selectedInstructor={selectedInstructor}
                    onSelect={handleInstructorSelect}
                    formatDateToString={formatDateToString}
                  />

                  {selectedInstructor && availableTimeSlots.length > 0 && (
                    <TimeSlotSelector
                      timeSlots={availableTimeSlots}
                      selectedTimeSlot={selectedTimeSlot}
                      onSelect={handleTimeSlotSelect}
                    />
                  )}

                  {selectedTimeSlot && (
                    <Button className="w-full mt-6" onClick={handleBookNow}>
                      Book Now
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-gray-500">
                Please select a date and session type to view available booking options
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
          sessionType={selectedTimeSlot.type}
        />
      )}
    </div>
  );
};

export default BookingSystem;
