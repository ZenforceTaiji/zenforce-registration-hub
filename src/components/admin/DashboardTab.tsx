
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ActivityChart } from "@/components/admin";
import { BarChart3, LineChart, UserPlus, Calendar, AlertCircle } from "lucide-react";

interface ActivityData {
  registrations: {
    data: number[];
    labels: string[];
  };
  pageVisits: {
    data: number[];
    labels: string[];
  };
  maintenanceTasks: {
    id: number;
    task: string;
    status: string;
    date: string;
  }[];
}

interface DashboardTabProps {
  activityData: ActivityData;
}

const DashboardTab = ({ activityData }: DashboardTabProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <ActivityChart 
          data={activityData.registrations.data}
          labels={activityData.registrations.labels}
          title="New Registrations"
          icon={BarChart3}
        />
        
        <ActivityChart 
          data={activityData.pageVisits.data}
          labels={activityData.pageVisits.labels}
          title="Page Visits"
          icon={LineChart}
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Overview of recent website activity and events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="flex">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <UserPlus className="h-5 w-5 text-accent-red" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">New Registration</p>
                <p className="text-sm text-muted-foreground">
                  Sarah Chen registered as a new student
                </p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Calendar className="h-5 w-5 text-accent-red" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">New Grading Session</p>
                <p className="text-sm text-muted-foreground">
                  Master Liang scheduled a new grading session
                </p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">System Alert</p>
                <p className="text-sm text-muted-foreground">
                  Database backup completed successfully
                </p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DashboardTab;
