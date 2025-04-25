
import { useState, useEffect } from "react";
import { addDays, subDays, format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface ClassItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  instructor: string;
  hasReminder: boolean;
}

export const useClassSchedule = () => {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // In a real application, this would fetch from the database
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setIsLoading(true);
        
        // In a real application with Supabase, you'd do something like:
        // const { data, error } = await supabase
        //   .from('bookings')
        //   .select('*, classes(*)')
        //   .eq('student_id', currentUserId);
        
        // Mock data for now
        const today = new Date();
        const mockClasses: ClassItem[] = [
          {
            id: "1",
            title: "Qi Gong Essentials",
            date: format(today, 'yyyy-MM-dd'),
            time: "10:00 AM - 11:30 AM",
            location: "Main Studio",
            instructor: "Master Wong",
            hasReminder: true,
          },
          {
            id: "2",
            title: "Meditation Session",
            date: format(addDays(today, 2), 'yyyy-MM-dd'),
            time: "4:00 PM - 5:00 PM",
            location: "Zen Garden",
            instructor: "Lisa Chen",
            hasReminder: false,
          },
          {
            id: "3",
            title: "TaijiQuan Form Practice",
            date: format(addDays(today, 3), 'yyyy-MM-dd'),
            time: "9:00 AM - 10:30 AM",
            location: "Main Studio",
            instructor: "Master Wong",
            hasReminder: false,
          },
          {
            id: "4",
            title: "Push Hands Workshop",
            date: format(addDays(today, 5), 'yyyy-MM-dd'),
            time: "6:00 PM - 8:00 PM",
            location: "Training Hall",
            instructor: "John Smith",
            hasReminder: false,
          },
          {
            id: "5",
            title: "Qi Gong Fundamentals",
            date: format(subDays(today, 2), 'yyyy-MM-dd'),
            time: "11:00 AM - 12:30 PM",
            location: "Main Studio",
            instructor: "Master Wong",
            hasReminder: false,
          },
        ];
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setClasses(mockClasses);
      } catch (error) {
        console.error("Error fetching class schedule:", error);
        toast({
          title: "Could not load classes",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchClasses();
  }, [toast]);
  
  // Extract dates for calendar highlighting
  const classDates = classes.map(c => new Date(c.date));
  
  // Toggle reminder for a class
  const toggleReminder = (classId: string) => {
    setClasses(prev => 
      prev.map(c => 
        c.id === classId 
          ? { ...c, hasReminder: !c.hasReminder } 
          : c
      )
    );
    
    // In a real application, this would update the database
    // In real implementation, this would call a WhatsApp notification service
    // to schedule or cancel the reminder
  };
  
  return {
    classes,
    classDates,
    isLoading,
    toggleReminder,
  };
};
