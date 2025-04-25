import { Event, Instructor } from './types';

export const upcomingEvents: Event[] = [
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

export const instructors: Instructor[] = [
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
