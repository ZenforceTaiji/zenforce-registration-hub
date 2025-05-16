
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import EventBanner from "@/components/EventBanner";
import EventsCalendar from "@/components/EventsCalendar";
import { 
  StatsOverview,
  DashboardTab,
  InstructorsTab,
  AreasTab,
  MaintenanceTab,
  NewsletterTab
} from "@/components/admin";
import { SiteSettingsTab } from "@/components/admin/settings/SiteSettingsTab";
import { FinancialsTab } from "@/components/admin/financials/FinancialsTab";
import { useNavigate, useLocation } from "react-router-dom";

// Empty arrays for all mock data
const mockInstructors = [];
const mockAreas = [];
const mockStudents = [];

const mockActivityData = {
  registrations: {
    data: [],
    labels: []
  },
  pageVisits: {
    data: [],
    labels: []
  },
  maintenanceTasks: []
};

const mockFinancialData = {
  studentPayments: [],
  expenses: []
};

const AdminPortal = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab && ['dashboard', 'instructors', 'areas', 'maintenance', 'events', 'settings', 'financials', 'newsletters'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/admin-portal?tab=${value}`, { replace: true });
  };

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
        registrationsCount={0}
        maintenanceTasksCount={mockActivityData.maintenanceTasks.length}
        pendingTasksCount={pendingTasksCount}
      />
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="mb-4 inline-flex h-auto w-auto flex-nowrap">
            <TabsTrigger value="dashboard" className="whitespace-nowrap">Dashboard</TabsTrigger>
            <TabsTrigger value="instructors" className="whitespace-nowrap">Instructors</TabsTrigger>
            <TabsTrigger value="areas" className="whitespace-nowrap">Geographic Areas</TabsTrigger>
            <TabsTrigger value="maintenance" className="whitespace-nowrap">Maintenance</TabsTrigger>
            <TabsTrigger value="events" className="whitespace-nowrap">Events</TabsTrigger>
            <TabsTrigger value="financials" className="whitespace-nowrap">Financials</TabsTrigger>
            <TabsTrigger value="settings" className="whitespace-nowrap">Settings</TabsTrigger>
            <TabsTrigger value="newsletters" className="whitespace-nowrap">Newsletters</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="dashboard" className="relative z-10">
          <DashboardTab activityData={mockActivityData} />
        </TabsContent>
        
        <TabsContent value="instructors" className="relative z-10">
          <InstructorsTab 
            instructors={mockInstructors} 
            areas={mockAreas}
            students={mockStudents}
          />
        </TabsContent>
        
        <TabsContent value="areas" className="relative z-10">
          <AreasTab 
            areas={mockAreas}
            students={mockStudents}
          />
        </TabsContent>
        
        <TabsContent value="maintenance" className="relative z-10">
          <MaintenanceTab maintenanceTasks={mockActivityData.maintenanceTasks} />
        </TabsContent>
        
        <TabsContent value="events" className="relative z-10">
          <EventsCalendar />
        </TabsContent>
        
        <TabsContent value="financials" className="relative z-10">
          <FinancialsTab financialData={mockFinancialData} />
        </TabsContent>

        <TabsContent value="settings" className="relative z-10">
          <SiteSettingsTab />
        </TabsContent>

        <TabsContent value="newsletters" className="relative z-10">
          <NewsletterTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPortal;
