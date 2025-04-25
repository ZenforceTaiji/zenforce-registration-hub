
import { useState } from "react";
import { format, parseISO, addHours, isAfter } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { ClassItem } from "./useClassSchedule";

export const useWhatsAppReminder = () => {
  const [isScheduling, setIsScheduling] = useState(false);
  const { toast } = useToast();
  
  const scheduleReminder = async (classItem: ClassItem, phoneNumber: string) => {
    try {
      setIsScheduling(true);
      
      // In a real application, this would call your backend service to schedule a WhatsApp reminder
      // via a service like Twilio, WhatsApp Business API, etc.
      
      // Example implementation would:
      // 1. Calculate the reminder time (2 hours before class)
      // 2. Schedule the message to be sent at that time
      // 3. Store the reminder in the database
      
      const classDate = parseISO(classItem.date);
      const timeComponents = classItem.time.split(' - ')[0].split(':');
      const hours = parseInt(timeComponents[0]);
      const minutes = parseInt(timeComponents[1]);
      
      // Calculate class start time
      const classStartTime = new Date(classDate);
      classStartTime.setHours(hours);
      classStartTime.setMinutes(minutes);
      
      // Calculate reminder time (2 hours before)
      const reminderTime = addHours(classStartTime, -2);
      
      // Check if reminder time is in the past
      if (isAfter(new Date(), reminderTime)) {
        toast({
          title: "Could not schedule reminder",
          description: "The reminder time is in the past",
          variant: "destructive",
        });
        return false;
      }
      
      // Format times for display
      const formattedClassTime = format(classStartTime, "h:mm a");
      const formattedReminderTime = format(reminderTime, "h:mm a");
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Reminder scheduled",
        description: `You'll receive a WhatsApp reminder at ${formattedReminderTime} for your ${formattedClassTime} class`,
      });
      
      return true;
    } catch (error) {
      console.error("Error scheduling WhatsApp reminder:", error);
      toast({
        title: "Reminder scheduling failed",
        description: "Could not schedule your WhatsApp reminder",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsScheduling(false);
    }
  };
  
  const cancelReminder = async (classId: string) => {
    try {
      setIsScheduling(true);
      
      // In a real application, this would call your backend API to cancel the scheduled reminder
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: "Reminder cancelled",
        description: "Your WhatsApp reminder has been cancelled",
      });
      
      return true;
    } catch (error) {
      console.error("Error cancelling WhatsApp reminder:", error);
      toast({
        title: "Could not cancel reminder",
        description: "Please try again later",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsScheduling(false);
    }
  };
  
  return {
    isScheduling,
    scheduleReminder,
    cancelReminder,
  };
};
