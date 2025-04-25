
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { BellRing, Bell, Clock, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import { useClassSchedule } from "./hooks/useClassSchedule";

const RemindersManager = () => {
  const { classes, isLoading, toggleReminder } = useClassSchedule();
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  
  // Only show classes with reminders enabled
  const classesWithReminders = classes.filter(c => c.hasReminder);

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="font-medium text-lg mb-4">Reminder Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <Label htmlFor="whatsapp-reminders">WhatsApp Reminders</Label>
              <p className="text-sm text-gray-500">Receive reminders via WhatsApp 2 hours before class</p>
            </div>
            <Switch 
              id="whatsapp-reminders" 
              checked={whatsappEnabled} 
              onCheckedChange={setWhatsappEnabled} 
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <Label htmlFor="google-calendar">Google Calendar Sync</Label>
              <p className="text-sm text-gray-500">Sync reminders with your Google Calendar</p>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <Label>Phone Number for WhatsApp</Label>
              <p className="text-sm text-gray-500">+27 71 234 5678</p>
            </div>
            <Button variant="link" size="sm">Update</Button>
          </div>
        </div>
      </div>
      
      <h3 className="font-medium text-lg">Your Active Reminders</h3>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : classesWithReminders.length > 0 ? (
        <div className="space-y-4">
          {classesWithReminders.map(classItem => {
            const classDate = parseISO(classItem.date);
            
            return (
              <Card key={classItem.id} className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <div className="flex items-center">
                        <BellRing className="h-5 w-5 text-green-500 mr-2" />
                        <h4 className="font-medium text-lg">{classItem.title}</h4>
                      </div>
                      <p className="text-gray-500">
                        {format(classDate, "EEEE, MMMM d, yyyy")}
                      </p>
                      <div className="flex items-center text-gray-500 mt-1">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{classItem.time}</span>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toggleReminder(classItem.id)}
                    >
                      Cancel Reminder
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <Bell className="mx-auto h-10 w-10 text-gray-400" />
          <p className="mt-4 text-gray-500">You don't have any active reminders</p>
          <p className="text-sm text-gray-400">Set reminders for your classes to receive WhatsApp notifications</p>
        </div>
      )}
    </div>
  );
};

export default RemindersManager;
