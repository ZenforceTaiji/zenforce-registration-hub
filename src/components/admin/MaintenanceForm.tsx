
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface MaintenanceFormProps {
  onAddTask: (task: any) => void;
}

const MaintenanceForm = ({ onAddTask }: MaintenanceFormProps) => {
  const { toast } = useToast();
  const [maintenanceNote, setMaintenanceNote] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  
  const handleMaintenanceTask = () => {
    if (!maintenanceNote.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a maintenance task description",
        variant: "destructive"
      });
      return;
    }

    if (!dueDate) {
      toast({
        title: "Date Required",
        description: "Please select a due date for the task",
        variant: "destructive"
      });
      return;
    }
    
    // Create new task
    const newTask = {
      id: Date.now(),
      task: maintenanceNote,
      status: "Pending",
      date: dueDate,
      priority
    };
    
    // Add task via callback
    onAddTask(newTask);
    
    toast({
      title: "Maintenance Task Added",
      description: "The maintenance task has been recorded",
    });
    
    // Reset form
    setMaintenanceNote("");
    setPriority("Medium");
    setDueDate("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Maintenance Task</CardTitle>
        <CardDescription>
          Create a new maintenance task
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="maintenanceNote">Task Description</Label>
            <Textarea 
              id="maintenanceNote" 
              value={maintenanceNote}
              onChange={(e) => setMaintenanceNote(e.target.value)}
              placeholder="Describe the maintenance task"
              className="min-h-[120px]"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <select 
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input 
                id="dueDate" 
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
          
          <Button 
            className="w-full mt-4" 
            onClick={handleMaintenanceTask}
          >
            Add Task
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaintenanceForm;
