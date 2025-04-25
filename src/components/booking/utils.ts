
import { Event, TimeSlot } from "./types";

export const formatDateToString = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const isDateFullyBooked = (date: Date, events: Event[]): boolean => {
  const dateStr = formatDateToString(date);
  const eventsOnDate = events.filter(event => event.date === dateStr);
  
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

export const generateTimeSlots = (date: string, sessionType?: string, events?: Event[]): TimeSlot[] => {
  const eventsOnDate = events?.filter(event => event.date === date) || [];
  const relevantEvents = sessionType 
    ? eventsOnDate.filter(event => {
        if (sessionType === "online" && (event.type === "online-individual" || event.type === "online-group")) {
          return true;
        }
        return event.type === sessionType;
      })
    : eventsOnDate;
  
  const slots: TimeSlot[] = [];
  for (let hour = 9; hour <= 20; hour++) {
    const timeString = `${hour % 12 || 12}:00 ${hour < 12 ? 'AM' : 'PM'}`;
    
    const eventAtThisTime = relevantEvents.find(event => event.time === timeString);
    
    let isAvailable = !eventAtThisTime;
    let capacity = 0;
    let registeredUsers = 0;
    let type: "special" | "online-individual" | "online-group" = "special";
    
    if (eventAtThisTime) {
      capacity = eventAtThisTime.capacity;
      registeredUsers = eventAtThisTime.registeredUsers;
      type = eventAtThisTime.type;
      
      if (type === "online-individual" && registeredUsers < 10) {
        isAvailable = true;
      } else if (type === "online-group" && registeredUsers < 20) {
        isAvailable = true;
      } else if (type === "special" && registeredUsers < capacity) {
        isAvailable = true;
      } else {
        isAvailable = false;
      }
    }
    
    slots.push({
      id: hour - 8,
      time: timeString,
      available: isAvailable,
      capacity,
      registeredUsers,
      type
    });
  }
  
  return slots;
};
