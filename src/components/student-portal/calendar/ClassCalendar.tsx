
import { useState, useEffect } from "react";
import { format, addDays, parseISO } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, BellRing, Link } from "lucide-react";
import ClassList from "./ClassList";
import RemindersManager from "./RemindersManager";
import GoogleCalendarSync from "./GoogleCalendarSync";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useClassSchedule } from "./hooks/useClassSchedule";

const ClassCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"calendar" | "list" | "reminders">("calendar");
  const { toast } = useToast();
  const { classes, classDates, isLoading, toggleReminder } = useClassSchedule();

  // Classes for the selected date
  const classesForSelectedDay = date ? 
    classes.filter(c => {
      const classDate = parseISO(c.date);
      return classDate.toDateString() === date.toDateString();
    }) : [];
  
  // Handle reminder toggle
  const handleToggleReminder = (classId: string) => {
    toggleReminder(classId);
    toast({
      title: "Reminder set",
      description: "You'll receive a WhatsApp notification 2 hours before class.",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={view} onValueChange={(v) => setView(v as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calendar">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Calendar View
          </TabsTrigger>
          <TabsTrigger value="list">
            <CalendarIcon className="h-4 w-4 mr-2" />
            List View
          </TabsTrigger>
          <TabsTrigger value="reminders">
            <BellRing className="h-4 w-4 mr-2" />
            Reminders
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                modifiers={{
                  hasClass: classDates
                }}
                modifiersStyles={{
                  hasClass: { 
                    fontWeight: 'bold',
                    backgroundColor: 'rgba(196, 30, 58, 0.1)',
                    borderRadius: '100%'
                  }
                }}
              />
              
              <div className="mt-4">
                <GoogleCalendarSync />
              </div>
            </Card>
            
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium mb-4">
                {date ? (
                  `Classes for ${format(date, 'EEEE, MMMM d, yyyy')}`
                ) : (
                  "Select a date to view classes"
                )}
              </h3>
              
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : classesForSelectedDay.length > 0 ? (
                <div className="space-y-4">
                  {classesForSelectedDay.map(classItem => (
                    <div key={classItem.id} className="bg-white border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h4 className="font-medium text-lg">{classItem.title}</h4>
                        <p className="text-gray-500">{classItem.time}</p>
                        <p className="text-gray-500">{classItem.location}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleToggleReminder(classItem.id)}
                        >
                          <BellRing className="h-4 w-4 mr-2" />
                          {classItem.hasReminder ? "Remove Reminder" : "Set Reminder"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No classes scheduled for this date</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="list" className="mt-6">
          <ClassList />
        </TabsContent>
        
        <TabsContent value="reminders" className="mt-6">
          <RemindersManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClassCalendar;
