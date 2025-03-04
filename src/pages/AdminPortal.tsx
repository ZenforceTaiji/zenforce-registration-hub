import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import EventBanner from "@/components/EventBanner";
import EventsCalendar from "@/components/EventsCalendar";
import { 
  StatsOverview,
  DashboardTab,
  InstructorsTab,
  AreasTab,
  MaintenanceTab
} from "@/components/admin";

// Mock data
const mockInstructors = [
  { id: 1, name: "Master Liang", email: "liang@zenforce.com", status: "Active", students: 15, lastLogin: "2023-07-10", certificateNumber: "ZRI2023_01", title: "Shifu" },
  { id: 2, name: "Shifu Chen", email: "chen@zenforce.com", status: "Active", students: 12, lastLogin: "2023-07-12", certificateNumber: "ZRI2023_02", title: "Shifu" },
  { id: 3, name: "Teacher Wong", email: "wong@zenforce.com", status: "Inactive", students: 8, lastLogin: "2023-06-30", certificateNumber: "ZRI2023_03", title: "Shifu" },
];

const mockActivityData = {
  registrations: {
    data: [38, 45, 32, 49, 55, 42, 40],
    labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  pageVisits: {
    data: [2100, 1800, 2500, 2800, 3200, 2900, 3500],
    labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] 
  },
  maintenanceTasks: [
    { id: 1, task: "Update grading criteria documentation", status: "Completed", date: "2023-11-15" },
    { id: 2, task: "Fix registration form validation", status: "Pending", date: "2023-12-01" },
    { id: 3, task: "Add new training videos to media library", status: "In Progress", date: "2023-12-10" },
    { id: 4, task: "Update payment gateway API", status: "Pending", date: "2023-12-15" },
  ]
};

const mockAreas = [
  { id: 1, name: "North District", students: 25, instructors: 2 },
  { id: 2, name: "Central District", students: 30, instructors: 2 },
  { id: 3, name: "East District", students: 18, instructors: 1 },
  { id: 4, name: "West District", students: 22, instructors: 1 },
  { id: 5, name: "South District", students: 15, instructors: 1 },
];

const mockStudents = [
  { id: 1, name: "John Lee", email: "john@example.com", area: "North District", level: "Intermediate" },
  { id: 2, name: "Sarah Wong", email: "sarah@example.com", area: "Central District", level: "Beginner" },
  { id: 3, name: "Michael Chen", email: "michael@example.com", area: "East District", level: "Advanced" },
  { id: 4, name: "Emily Zhang", email: "emily@example.com", area: "West District", level: "Beginner" },
  { id: 5, name: "David Liu", email: "david@example.com", area: "South District", level: "Intermediate" },
  { id: 6, name: "Jennifer Wu", email: "jennifer@example.com", area: "North District", level: "Beginner" },
  { id: 7, name: "Robert Kim", email: "robert@example.com", area: "Central District", level: "Advanced" },
  { id: 8, name: "Lisa Wang", email: "lisa@example.com", area: "East District", level: "Intermediate" },
];

const AdminPortal = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Calculate pending tasks count
  const pendingTasksCount = mockActivityData.maintenanceTasks.filter(
    task => task.status === "Pending" || task.status === "In Progress"
  ).length;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Portal</h1>
          <p className="text-gray-600 mt-1">Manage instructors, website maintenance, and view analytics</p>
        </div>
      </div>
      
      <EventBanner />
      
      <StatsOverview 
        instructorCount={mockInstructors.length}
        registrationsCount={251}
        maintenanceTasksCount={mockActivityData.maintenanceTasks.length}
        pendingTasksCount={pendingTasksCount}
      />
      
      <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="instructors">Instructors</TabsTrigger>
          <TabsTrigger value="areas">Geographic Areas</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <DashboardTab activityData={mockActivityData} />
        </TabsContent>
        
        <TabsContent value="instructors">
          <InstructorsTab 
            instructors={mockInstructors} 
            areas={mockAreas}
            students={mockStudents}
          />
        </TabsContent>
        
        <TabsContent value="areas">
          <AreasTab 
            areas={mockAreas}
            students={mockStudents}
          />
        </TabsContent>
        
        <TabsContent value="maintenance">
          <MaintenanceTab maintenanceTasks={mockActivityData.maintenanceTasks} />
        </TabsContent>
        
        <TabsContent value="events">
          <EventsCalendar />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPortal;
