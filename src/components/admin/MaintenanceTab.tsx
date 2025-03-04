
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface MaintenanceTask {
  id: number;
  task: string;
  status: string;
  date: string;
}

interface MaintenanceTabProps {
  maintenanceTasks: MaintenanceTask[];
}

const MaintenanceTab = ({ maintenanceTasks }: MaintenanceTabProps) => {
  const { toast } = useToast();
  const [maintenanceNote, setMaintenanceNote] = useState("");
  
  const handleMaintenanceTask = () => {
    if (!maintenanceNote.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a maintenance task description",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Maintenance Task Added",
      description: "The maintenance task has been recorded",
    });
    
    setMaintenanceNote("");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Tasks</CardTitle>
            <CardDescription>
              Track and manage website maintenance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {maintenanceTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.task}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        task.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : task.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {task.status}
                      </span>
                    </TableCell>
                    <TableCell>{task.date}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Update</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
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
    </div>
  );
};

export default MaintenanceTab;
