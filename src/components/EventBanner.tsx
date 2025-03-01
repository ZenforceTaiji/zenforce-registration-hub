
import { useState, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";
import { Button } from "./ui/button";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

// Mock data for upcoming events - in a real app, this would come from an API
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

const EventBanner = () => {
  const [nextEvent, setNextEvent] = useState<Event | null>(null);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    // Sort events by date and find the next upcoming one
    const today = new Date();
    const sortedEvents = [...upcomingEvents].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    const upcoming = sortedEvents.find(event => new Date(event.date) >= today) || null;
    setNextEvent(upcoming);
  }, []);

  if (!nextEvent || !showBanner) return null;

  return (
    <div className="bg-accent-red/10 border border-accent-red/20 rounded-lg p-4 mb-6 animate-fade-in">
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-4">
          <div className="bg-accent-red rounded-md p-2 text-white">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-accent-red">{nextEvent.title}</h3>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="mr-3">{new Date(nextEvent.date).toLocaleDateString()}</span>
              <Clock className="h-4 w-4 mr-1" />
              <span>{nextEvent.time}</span>
            </div>
            <p className="text-sm mt-1">{nextEvent.description}</p>
            <div className="mt-2">
              <Button size="sm" variant="outline" className="mr-2">
                View Details
              </Button>
              <Button size="sm">
                Register
              </Button>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setShowBanner(false)}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close banner"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default EventBanner;
