
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MaintenanceForm from "./MaintenanceForm";

interface MaintenanceTask {
  id: number;
  task: string;
  status: string;
  date: string;
  priority?: string;
}

interface MaintenanceTabProps {
  maintenanceTasks: MaintenanceTask[];
}

const MaintenanceTab = ({ maintenanceTasks: initialTasks }: MaintenanceTabProps) => {
  const [tasks, setTasks] = useState<MaintenanceTask[]>(initialTasks);
  
  const handleAddTask = (newTask: MaintenanceTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleUpdateStatus = (taskId: number, newStatus: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
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
                {tasks.map((task) => (
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
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          const nextStatus = 
                            task.status === 'Pending' ? 'In Progress' :
                            task.status === 'In Progress' ? 'Completed' : 'Pending';
                          handleUpdateStatus(task.id, nextStatus);
                        }}
                      >
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <MaintenanceForm onAddTask={handleAddTask} />
    </div>
  );
};

export default MaintenanceTab;
