import { useState, useRef } from "react";
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
  Calendar, 
  CheckCircle,
  AlertCircle,
  MapPin,
  User,
  FileText,
  Upload
} from "lucide-react";
import EventBanner from "@/components/EventBanner";
import EventsCalendar from "@/components/EventsCalendar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockInstructors = [
  { id: 1, name: "Master Liang", email: "liang@zenforce.com", status: "Active", students: 15, lastLogin: "2023-07-10", certificateNumber: "ZRI2023_01" },
  { id: 2, name: "Shifu Chen", email: "chen@zenforce.com", status: "Active", students: 12, lastLogin: "2023-07-12", certificateNumber: "ZRI2023_02" },
  { id: 3, name: "Teacher Wong", email: "wong@zenforce.com", status: "Inactive", students: 8, lastLogin: "2023-06-30", certificateNumber: "ZRI2023_03" },
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
  const [newInstructor, setNewInstructor] = useState({
    name: "",
    email: "",
    qualifications: "",
    password: "",
    confirmPassword: "",
    certificateNumber: ""
  });
  const [maintenanceNote, setMaintenanceNote] = useState("");
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [assignmentType, setAssignmentType] = useState<"area" | "students">("area");
  const [selectedInstructor, setSelectedInstructor] = useState<number | null>(null);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  
  const generateCertificateNumber = () => {
    const currentYear = new Date().getFullYear();
    const existingNumbers = mockInstructors
      .filter(instructor => instructor.certificateNumber?.startsWith(`ZRI${currentYear}_`))
      .map(instructor => {
        const numPart = instructor.certificateNumber?.split('_')[1];
        return numPart ? parseInt(numPart, 10) : 0;
      });
    
    const highestNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) : 0;
    const nextNumber = highestNumber + 1;
    const paddedNumber = nextNumber.toString().padStart(2, '0');
    
    return `ZRI${currentYear}_${paddedNumber}`;
  };
  
  const handleCertificateUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setCertificateFile(files[0]);
      toast({
        title: "Certificate Uploaded",
        description: `File "${files[0].name}" has been uploaded`,
      });
      
      if (!newInstructor.certificateNumber) {
        const generatedNumber = generateCertificateNumber();
        setNewInstructor({...newInstructor, certificateNumber: generatedNumber});
      }
    }
  };
  
  const handleAddInstructor = () => {
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
    
    if (!certificateFile) {
      toast({
        title: "Certificate Required",
        description: "Please upload an instructor certificate",
        variant: "destructive"
      });
      return;
    }
    
    const certificateNumber = newInstructor.certificateNumber || generateCertificateNumber();
    
    toast({
      title: "Instructor Added",
      description: `${newInstructor.name} has been added as an instructor with certificate #${certificateNumber}`,
    });
    
    setNewInstructor({
      name: "",
      email: "",
      qualifications: "",
      password: "",
      confirmPassword: "",
      certificateNumber: ""
    });
    setCertificateFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
  
  const openAssignDialog = (instructorId: number) => {
    setSelectedInstructor(instructorId);
    setIsAssignDialogOpen(true);
  };
  
  const handleAssignSubmit = () => {
    const instructorName = mockInstructors.find(i => i.id === selectedInstructor)?.name || "Instructor";
    
    if (assignmentType === "area") {
      if (selectedAreas.length === 0) {
        toast({
          title: "No Areas Selected",
          description: "Please select at least one area to assign",
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Areas Assigned",
        description: `${selectedAreas.length} area(s) assigned to ${instructorName}`,
      });
    } else {
      if (selectedStudents.length === 0) {
        toast({
          title: "No Students Selected",
          description: "Please select at least one student to assign",
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Students Assigned",
        description: `${selectedStudents.length} student(s) assigned to ${instructorName}`,
      });
    }
    
    setSelectedAreas([]);
    setSelectedStudents([]);
    setIsAssignDialogOpen(false);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Portal</h1>
          <p className="text-gray-600 mt-1">Manage instructors, website maintenance, and view analytics</p>
        </div>
      </div>
      
      <EventBanner />
      
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="instructors">Instructors</TabsTrigger>
          <TabsTrigger value="areas">Geographic Areas</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
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
                        <TableHead>Certificate #</TableHead>
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
                          <TableCell>{instructor.certificateNumber || "N/A"}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => openAssignDialog(instructor.id)}
                              >
                                Assign
                              </Button>
                              <Button variant="ghost" size="sm">Edit</Button>
                            </div>
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
                    <Label htmlFor="certificate">Instructor Certificate</Label>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center gap-2">
                        <Input 
                          id="certificate" 
                          type="file"
                          ref={fileInputRef}
                          onChange={handleCertificateUpload}
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="w-full flex items-center gap-2"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="h-4 w-4" />
                          {certificateFile ? 'Change Certificate' : 'Upload Certificate'}
                        </Button>
                        {certificateFile && (
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <FileText className="h-4 w-4" />
                            {certificateFile.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="certificateNumber">Certificate Number</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="certificateNumber" 
                        value={newInstructor.certificateNumber}
                        onChange={(e) => setNewInstructor({...newInstructor, certificateNumber: e.target.value})}
                        placeholder="Auto-generated on upload"
                        readOnly={!!newInstructor.certificateNumber}
                      />
                      <Button 
                        variant="outline" 
                        type="button"
                        onClick={() => {
                          const generatedNumber = generateCertificateNumber();
                          setNewInstructor({...newInstructor, certificateNumber: generatedNumber});
                        }}
                        className="whitespace-nowrap"
                      >
                        Generate
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Certificate number will be auto-generated on certificate upload or click generate button
                    </p>
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
        
        <TabsContent value="areas">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Geographic Areas</CardTitle>
                  <CardDescription>
                    Manage teaching areas and assigned instructors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Area Name</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Instructors</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockAreas.map((area) => (
                        <TableRow key={area.id}>
                          <TableCell className="font-medium">{area.name}</TableCell>
                          <TableCell>{area.students}</TableCell>
                          <TableCell>{area.instructors}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">Manage</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Students List</CardTitle>
                  <CardDescription>
                    View and manage all registered students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Area</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>{student.area}</TableCell>
                          <TableCell>{student.level}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">View</Button>
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
                <CardTitle>Add New Area</CardTitle>
                <CardDescription>
                  Create a new geographic teaching area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="areaName">Area Name</Label>
                    <Input 
                      id="areaName" 
                      placeholder="Enter area name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="areaDescription">Area Description</Label>
                    <Textarea 
                      id="areaDescription" 
                      placeholder="Describe the geographic area"
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <Button className="w-full mt-4">
                    Add Area
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
        
        <TabsContent value="events">
          <EventsCalendar />
        </TabsContent>
      </Tabs>
      
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Assign to Instructor</DialogTitle>
            <DialogDescription>
              Assign geographic areas or specific students to this instructor.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Assignment Type</Label>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="area-option"
                    name="assignment-type"
                    checked={assignmentType === "area"}
                    onChange={() => setAssignmentType("area")}
                    className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="area-option" className="cursor-pointer">Geographic Area</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="students-option"
                    name="assignment-type"
                    checked={assignmentType === "students"}
                    onChange={() => setAssignmentType("students")}
                    className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="students-option" className="cursor-pointer">Specific Students</Label>
                </div>
              </div>
            </div>
            
            {assignmentType === "area" ? (
              <div className="space-y-2">
                <Label htmlFor="area-select">Select Areas</Label>
                <Select 
                  onValueChange={(value) => setSelectedAreas([...selectedAreas, value])}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Available Areas</SelectLabel>
                      {mockAreas.map(area => (
                        <SelectItem key={area.id} value={area.name}>
                          {area.name} ({area.students} students)
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                
                {selectedAreas.length > 0 && (
                  <div className="mt-4">
                    <Label>Selected Areas:</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedAreas.map((area, index) => (
                        <div key={index} className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm">
                          <MapPin className="h-3 w-3" />
                          {area}
                          <button 
                            onClick={() => setSelectedAreas(selectedAreas.filter((_, i) => i !== index))}
                            className="ml-1 text-gray-500 hover:text-gray-700"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="student-select">Select Students</Label>
                <Select 
                  onValueChange={(value) => setSelectedStudents([...selectedStudents, parseInt(value)])}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a student" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Available Students</SelectLabel>
                      {mockStudents.map(student => (
                        <SelectItem key={student.id} value={student.id.toString()}>
                          {student.name} ({student.level})
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                
                {selectedStudents.length > 0 && (
                  <div className="mt-4">
                    <Label>Selected Students:</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedStudents.map((studentId, index) => {
                        const student = mockStudents.find(s => s.id === studentId);
                        return (
                          <div key={index} className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm">
                            <User className="h-3 w-3" />
                            {student?.name}
                            <button 
                              onClick={() => setSelectedStudents(selectedStudents.filter((_, i) => i !== index))}
                              className="ml-1 text-gray-500 hover:text-gray-700"
                            >
                              ×
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssignSubmit}>
              Assign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPortal;
