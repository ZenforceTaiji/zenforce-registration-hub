
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { 
  BarChart3, 
  Users, 
  UserPlus, 
  Settings, 
  LineChart, 
  PieChart, 
  Calendar, 
  CheckCircle,
  AlertCircle
} from "lucide-react";

// Mock data for the Admin Portal
const mockInstructors = [
  { id: 1, name: "Master Liang", email: "liang@zenforce.com", status: "Active", students: 15, lastLogin: "2023-07-10" },
  { id: 2, name: "Shifu Chen", email: "chen@zenforce.com", status: "Active", students: 12, lastLogin: "2023-07-12" },
  { id: 3, name: "Teacher Wong", email: "wong@zenforce.com", status: "Inactive", students: 8, lastLogin: "2023-06-30" },
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

const AdminPortal = () => {
  const { toast } = useToast();
  const [newInstructor, setNewInstructor] = useState({
    name: "",
    email: "",
    qualifications: "",
    password: "",
    confirmPassword: ""
  });
  const [maintenanceNote, setMaintenanceNote] = useState("");
  
  const handleAddInstructor = () => {
    // Validate form
    if (!newInstructor.name || !newInstructor.email || !newInstructor.password) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    if (newInstructor.password !== newInstructor.confirmPassword) {
      toast({
        title: "Password Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would be an API call to add the instructor
    toast({
      title: "Instructor Added",
      description: `${newInstructor.name} has been added as an instructor`,
    });
    
    // Reset form
    setNewInstructor({
      name: "",
      email: "",
      qualifications: "",
      password: "",
      confirmPassword: ""
    });
  };
  
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
  
  // Mock visualization of website activity using simple div elements
  // In a real app, you would use a charting library like recharts
  const ActivityChart = ({ data, labels, title, icon: Icon }) => (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full relative mt-4">
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between h-[180px]">
            {data.map((value, index) => (
              <div 
                key={index} 
                className="bg-accent-red w-8 rounded-t transition-all duration-300 hover:bg-accent-red/80"
                style={{ 
                  height: `${(value / Math.max(...data)) * 100}%`,
                  opacity: 0.7 + (index / data.length) * 0.3
                }}
              >
                <div className="text-xs text-center mt-2 hidden md:block">{value}</div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex justify-between pt-2 border-t">
            {labels.map((label, index) => (
              <div key={index} className="text-xs w-8 text-center text-muted-foreground">
                {label}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Portal</h1>
          <p className="text-gray-600 mt-1">Manage instructors, website maintenance, and view analytics</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Instructors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockInstructors.length}</div>
            <p className="text-xs text-muted-foreground">Active teaching staff</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Registrations</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">251</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Maintenance Tasks</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockActivityData.maintenanceTasks.length}</div>
            <p className="text-xs text-muted-foreground">2 pending tasks</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Website Uptime</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="instructors">Instructors</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <ActivityChart 
              data={mockActivityData.registrations.data}
              labels={mockActivityData.registrations.labels}
              title="New Registrations"
              icon={BarChart3}
            />
            
            <ActivityChart 
              data={mockActivityData.pageVisits.data}
              labels={mockActivityData.pageVisits.labels}
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
        </TabsContent>
        
        <TabsContent value="instructors">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Instructors List</CardTitle>
                  <CardDescription>
                    Manage all instructors in the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockInstructors.map((instructor) => (
                        <TableRow key={instructor.id}>
                          <TableCell className="font-medium">{instructor.name}</TableCell>
                          <TableCell>{instructor.email}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              instructor.status === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {instructor.status}
                            </span>
                          </TableCell>
                          <TableCell>{instructor.students}</TableCell>
                          <TableCell>{instructor.lastLogin}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">Edit</Button>
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
                <CardTitle>Add New Instructor</CardTitle>
                <CardDescription>
                  Create a new instructor account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={newInstructor.name}
                      onChange={(e) => setNewInstructor({...newInstructor, name: e.target.value})}
                      placeholder="Enter instructor name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={newInstructor.email}
                      onChange={(e) => setNewInstructor({...newInstructor, email: e.target.value})}
                      placeholder="Enter email address"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="qualifications">Qualifications</Label>
                    <Textarea 
                      id="qualifications" 
                      value={newInstructor.qualifications}
                      onChange={(e) => setNewInstructor({...newInstructor, qualifications: e.target.value})}
                      placeholder="Enter instructor qualifications"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Temporary Password</Label>
                    <Input 
                      id="password" 
                      type="password"
                      value={newInstructor.password}
                      onChange={(e) => setNewInstructor({...newInstructor, password: e.target.value})}
                      placeholder="Enter temporary password"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password"
                      value={newInstructor.confirmPassword}
                      onChange={(e) => setNewInstructor({...newInstructor, confirmPassword: e.target.value})}
                      placeholder="Confirm password"
                    />
                  </div>
                  
                  <Button 
                    className="w-full mt-4" 
                    onClick={handleAddInstructor}
                  >
                    Add Instructor
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="maintenance">
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
                      {mockActivityData.maintenanceTasks.map((task) => (
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPortal;
