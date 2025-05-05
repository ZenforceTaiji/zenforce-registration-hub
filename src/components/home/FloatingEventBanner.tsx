
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  start_time: string;
  end_time: string;
  location: string;
}

interface BannerSettings {
  id: string;
  event_id: string | null;
  is_active: boolean;
}

export default function FloatingEventBanner() {
  const { toast } = useToast();
  const [event, setEvent] = useState<Event | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Store banner visibility state in local storage
    const storedVisibility = localStorage.getItem('eventBannerVisible');
    if (storedVisibility !== null) {
      setIsVisible(JSON.parse(storedVisibility));
    }
    
    async function fetchBannerData() {
      try {
        // First fetch banner settings
        const { data: settingsData, error: settingsError } = await supabase
          .from('banner_settings')
          .select('*')
          .limit(1)
          .single();
        
        if (settingsError) throw settingsError;
        
        // If banner is not active or no event is selected, don't show anything
        if (!settingsData || !settingsData.is_active || !settingsData.event_id) {
          setIsLoading(false);
          return;
        }
        
        // Now fetch the selected event details
        const { data: eventData, error: eventError } = await supabase
          .from('events')
          .select('*')
          .eq('id', settingsData.event_id)
          .single();
        
        if (eventError) throw eventError;
        
        // Check if event is in the future
        const eventDate = new Date(eventData.event_date);
        const today = new Date();
        
        // Clear out hours/minutes/seconds for proper date comparison
        today.setHours(0, 0, 0, 0);
        
        if (eventDate < today) {
          // Event is in the past, don't show it
          setIsLoading(false);
          return;
        }
        
        setEvent(eventData);
      } catch (error) {
        console.error('Error fetching banner data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchBannerData();
  }, [toast]);

  const hideBanner = () => {
    setIsVisible(false);
    localStorage.setItem('eventBannerVisible', 'false');
    
    // Reset visibility after 24 hours
    setTimeout(() => {
      localStorage.removeItem('eventBannerVisible');
    }, 86400000); // 24 hours in milliseconds
  };
  
  // Don't render if loading, banner is hidden, no event, or event is null
  if (isLoading || !isVisible || !event) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 left-6 md:left-auto md:max-w-md z-50 animate-fade-in-up">
      <div className="bg-gradient-to-r from-black to-amber-950 border border-amber-700/40 rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-amber-500 mb-1">{event.title}</h3>
            
            <div className="flex flex-wrap text-sm text-gray-300 mb-2">
              <div className="flex items-center mr-4 mb-1">
                <Calendar className="h-4 w-4 mr-1 text-amber-500" />
                <span>{new Date(event.event_date).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center mr-4 mb-1">
                <Clock className="h-4 w-4 mr-1 text-amber-500" />
                <span>{event.start_time.substring(0, 5)}</span>
              </div>
              
              <div className="flex items-center mb-1">
                <MapPin className="h-4 w-4 mr-1 text-amber-500" />
                <span>{event.location}</span>
              </div>
            </div>
            
            {event.description && (
              <p className="text-sm text-gray-300 mb-3 line-clamp-2">{event.description}</p>
            )}
            
            <div className="flex space-x-2 mt-1">
              <Button variant="outline" size="sm" className="text-xs border-amber-700/50 text-amber-500 hover:bg-amber-950 hover:text-amber-400" asChild>
                <Link to={`/events`}>View Details</Link>
              </Button>
              <Button size="sm" className="text-xs bg-amber-700 hover:bg-amber-600" asChild>
                <Link to={`/booking?eventId=${event.id}`}>Register Now</Link>
              </Button>
            </div>
          </div>
          
          <button 
            onClick={hideBanner}
            className="text-gray-400 hover:text-white p-1"
            aria-label="Close banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
