
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import BookingDialog from "./BookingDialog";
import { Clock, Calendar as CalendarIcon, AlertCircle, Users } from "lucide-react";
import { format, isEqual } from "date-fns";

// Define our event and booking types
interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  capacity: number;
  registeredUsers: number;
  type: "special" | "online-individual" | "online-group";
}

interface TimeSlot {
  id: number;
  time: string;
  available: boolean;
  capacity: number;
  registeredUsers: number;
  type: "special" | "online-individual" | "online-group";
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
    description: "Annual summer grading for all belt levels.",
    capacity: 50,
    registeredUsers: 32,
    type: "special"
  },
  {
    id: 2,
    title: "Parent Workshop",
    date: "2023-08-22",
    time: "6:30 PM",
    location: "Conference Room",
    description: "Learn how to support your child's martial arts journey.",
    capacity: 30,
    registeredUsers: 18,
    type: "special"
  },
  {
    id: 3,
    title: "Competition Preparation",
    date: "2023-09-05",
    time: "5:00 PM",
    location: "Training Hall",
    description: "Special training session for competition participants.",
    capacity: 25,
    registeredUsers: 20,
    type: "special"
  },
  {
    id: 4,
    title: "Online Individual Session",
    date: "2023-09-10",
    time: "3:00 PM",
    location: "Virtual",
    description: "Individual online session for relaxation and meditation.",
    capacity: 10, // Maximum 10 individual users per session
    registeredUsers: 8,
    type: "online-individual"
  },
  {
    id: 5,
    title: "Online Group Session",
    date: "2023-09-12",
    time: "7:00 PM",
    location: "Virtual",
    description: "Group online session for TaijiQuan practice.",
    capacity: 20, // Maximum 20 users per group session
    registeredUsers: 15,
    type: "online-group"
  },
  {
    id: 6,
    title: "Online Individual Session",
    date: "2023-09-15",
    time: "4:00 PM",
    location: "Virtual",
    description: "Individual online session for health improvement.",
    capacity: 10,
    registeredUsers: 10, // Fully booked
    type: "online-individual"
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
    specialties: ["Mixed Martial Arts", "Boxing", "Online Sessions"],
    availableDates: ["2023-08-19", "2023-08-20", "2023-09-10", "2023-09-12", "2023-09-15"]
  }
];

// Generate timeslots for each day
const generateTimeSlots = (date: string, sessionType?: string): TimeSlot[] => {
  // Check if there's an event on this date
  const eventsOnDate = upcomingEvents.filter(event => event.date === date);
  const bookedTimes = eventsOnDate.map(event => event.time);
  
  // Filter events based on session type if provided
  const relevantEvents = sessionType 
    ? eventsOnDate.filter(event => {
        if (sessionType === "online" && (event.type === "online-individual" || event.type === "online-group")) {
          return true;
        }
        return event.type === sessionType;
      })
    : eventsOnDate;
  
  // Generate time slots from 9 AM to 8 PM
  const slots: TimeSlot[] = [];
  for (let hour = 9; hour <= 20; hour++) {
    const timeString = `${hour % 12 || 12}:00 ${hour < 12 ? 'AM' : 'PM'}`;
    
    // Find if there's an event at this time
    const eventAtThisTime = relevantEvents.find(event => event.time === timeString);
    
    // Check availability based on event capacity and session type
    let isAvailable = !eventAtThisTime;
    let capacity = 0;
    let registeredUsers = 0;
    let type: "special" | "online-individual" | "online-group" = "special";
    
    if (eventAtThisTime) {
      capacity = eventAtThisTime.capacity;
      registeredUsers = eventAtThisTime.registeredUsers;
      type = eventAtThisTime.type;
      
      // Check if there's still capacity
      if (type === "online-individual" && registeredUsers < 10) {
        isAvailable = true;
      } else if (type === "online-group" && registeredUsers < 20) {
        isAvailable = true;
      } else if (type === "special" && registeredUsers < capacity) {
        isAvailable = true;
      } else {
        isAvailable = false; // Fully booked
      }
    }
    
    slots.push({
      id: hour - 8,
      time: timeString,
      available: isAvailable,
      capacity: capacity,
      registeredUsers: registeredUsers,
      type: type
    });
  }
  
  return slots;
};

const BookingSystem = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSessionType, setSelectedSessionType] = useState<string | undefined>(undefined);
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

  // Get dates that are fully booked for online sessions
  const fullyBookedOnlineDates = upcomingEvents
    .filter(event => 
      (event.type === "online-individual" && event.registeredUsers >= 10) || 
      (event.type === "online-group" && event.registeredUsers >= 20)
    )
    .map(event => new Date(event.date));
  
  // Format date to string
  const formatDateToString = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  // Check if a date is available for booking
  const isDateFullyBooked = (date: Date): boolean => {
    const dateStr = formatDateToString(date);
    const eventsOnDate = upcomingEvents.filter(event => event.date === dateStr);
    
    // Check if all events on this date are fully booked
    if (eventsOnDate.length > 0) {
      return eventsOnDate.every(event => {
        if (event.type === "online-individual") {
          return event.registeredUsers >= 10;
        } else if (event.type === "online-group") {
          return event.registeredUsers >= 20;
        } else {
          return event.registeredUsers >= event.capacity;
        }
      });
    }
    
    return false;
  };
  
  // When a date is selected
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedInstructor(null);
    setSelectedTimeSlot(null);
    
    if (date) {
      const dateString = formatDateToString(date);
      // Find instructors available on this date
      const availableInstructors = instructors.filter(instructor => 
        instructor.availableDates.includes(dateString)
      );
      
      if (availableInstructors.length > 0) {
        // Automatically select the first available instructor
        setSelectedInstructor(availableInstructors[0]);
        
        // Generate time slots for this date
        const slots = generateTimeSlots(dateString, selectedSessionType);
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
      const dateString = formatDateToString(selectedDate);
      // Generate time slots for this date and instructor
      const slots = generateTimeSlots(dateString, selectedSessionType);
      setAvailableTimeSlots(slots);
    }
  };
  
  // Handle session type selection
  const handleSessionTypeSelect = (type: string) => {
    setSelectedSessionType(type);
    setSelectedTimeSlot(null);
    
    if (selectedDate) {
      const dateString = formatDateToString(selectedDate);
      // Generate time slots for this date and session type
      const slots = generateTimeSlots(dateString, type);
      setAvailableTimeSlots(slots);
    }
  };
  
  // Handle timeslot selection
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
  
  // Handle booking
  const handleBookNow = () => {
    if (selectedDate && selectedInstructor && selectedTimeSlot) {
      // Check capacity based on session type
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

  // Update available time slots when session type changes
  useEffect(() => {
    if (selectedDate) {
      const dateString = formatDateToString(selectedDate);
      const slots = generateTimeSlots(dateString, selectedSessionType);
      setAvailableTimeSlots(slots);
    }
  }, [selectedSessionType]);
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Book a Session</h1>
      <p className="text-gray-600 mb-8">
        Select a date, instructor, and time to book a private lesson or special event.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Select Session Type</CardTitle>
            <CardDescription>Choose what type of session you want to book</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 mb-6">
              <Button
                variant={selectedSessionType === "special" ? "default" : "outline"}
                onClick={() => handleSessionTypeSelect("special")}
                className="justify-start"
              >
                <Users className="mr-2 h-4 w-4" />
                Special Event
              </Button>
              <Button
                variant={selectedSessionType === "online" ? "default" : "outline"}
                onClick={() => handleSessionTypeSelect("online")}
                className="justify-start"
              >
                <Clock className="mr-2 h-4 w-4" />
                Online Session
              </Button>
            </div>
            
            <CardTitle className="text-lg mb-2">Select a Date</CardTitle>
            <CardDescription className="mb-4">
              Choose from available dates
            </CardDescription>
            
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border pointer-events-auto"
              disabled={{ before: new Date() }}
              modifiers={{
                available: allAvailableDates.map(date => new Date(date)),
                event: eventDates,
                booked: fullyBookedOnlineDates
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
                  <div>
                    <h3 className="font-medium mb-3">Available Instructors</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {instructors
                        .filter(instructor => 
                          instructor.availableDates.includes(formatDateToString(selectedDate))
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
                        {availableTimeSlots.map(slot => {
                          // Determine button style based on availability and capacity
                          let buttonVariant: "outline" | "default" = "outline";
                          let buttonClass = "justify-center";
                          let capacityText = "";
                          
                          if (!slot.available) {
                            buttonClass += " opacity-50 cursor-not-allowed";
                            capacityText = "Fully Booked";
                          } else if (slot.registeredUsers > 0) {
                            if (slot.type === "online-individual") {
                              capacityText = `${slot.registeredUsers}/10`;
                            } else if (slot.type === "online-group") {
                              capacityText = `${slot.registeredUsers}/20`;
                            } else {
                              capacityText = `${slot.registeredUsers}/${slot.capacity}`;
                            }
                          }
                          
                          if (selectedTimeSlot?.id === slot.id) {
                            buttonVariant = "default";
                          }
                          
                          return (
                            <div key={slot.id} className="flex flex-col">
                              <Button
                                variant={buttonVariant}
                                className={buttonClass}
                                onClick={() => handleTimeSlotSelect(slot)}
                                disabled={!slot.available}
                              >
                                <Clock className="mr-2 h-4 w-4" />
                                {slot.time}
                              </Button>
                              {capacityText && (
                                <div className={`text-xs mt-1 text-center ${!slot.available ? 'text-red-500' : 'text-gray-500'}`}>
                                  {capacityText}
                                </div>
                              )}
                            </div>
                          );
                        })}
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
                          
                          {selectedTimeSlot.type.includes("online") && (
                            <>
                              <div className="text-gray-500">Session Type:</div>
                              <div className="font-medium">
                                {selectedTimeSlot.type === "online-individual" ? "Online Individual" : "Online Group"}
                              </div>
                              <div className="text-gray-500">Capacity:</div>
                              <div className="font-medium">
                                {selectedTimeSlot.type === "online-individual" 
                                  ? `${selectedTimeSlot.registeredUsers}/10 participants`
                                  : `${selectedTimeSlot.registeredUsers}/20 participants`
                                }
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <Button className="w-full" onClick={handleBookNow}>
                        Book Now
                      </Button>
                    </div>
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
