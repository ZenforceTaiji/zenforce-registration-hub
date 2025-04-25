
export interface Event {
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

export interface TimeSlot {
  id: number;
  time: string;
  available: boolean;
  capacity: number;
  registeredUsers: number;
  type: "special" | "online-individual" | "online-group";
}

export interface Instructor {
  id: number;
  name: string;
  specialties: string[];
  availableDates: string[];
}
