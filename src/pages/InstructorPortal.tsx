import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Users, Award, DollarSign, ClipboardList } from "lucide-react";
import EventBanner from "@/components/EventBanner";
import EventsCalendar from "@/components/EventsCalendar";

const InstructorPortal = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Mock data - in a real app, this would come from an API
  const students = [
    { id: 1, name: "John Doe", membershipNo: "STU001", grade: "G01", lastAttendance: "2023-07-15" },
    { id: 2, name: "Jane Smith", membershipNo: "STU002", grade: "G02", lastAttendance: "2023-07-18" },
    { id: 3, name: "Robert Johnson", membershipNo: "STU003", grade: "G01", lastAttendance: "2023-07-10" },
    { id: 4, name: "Emily Williams", membershipNo: "STU004", grade: "G03", lastAttendance: "2023-07-17" },
    { id: 5, name: "Michael Brown", membershipNo: "STU005", grade: "G02", lastAttendance: "2023-07-12" },
  ];

  const upcomingGradings = [
    { id: 1, date: "2023-08-15", numberOfStudents: 8, venue: "Main Dojo" },
    { id: 2, date: "2023-09-22", numberOfStudents: 12, venue: "City Center Hall" },
    { id: 3, date: "2023-10-10", numberOfStudents: 5, venue: "Main Dojo" },
  ];

  const recentPayments = [
    { id: 1, studentName: "John Doe", amount: 150, date: "2023-07-10", status: "Paid" },
    { id: 2, studentName: "Jane Smith", amount: 150, date: "2023-07-12", status: "Paid" },
    { id: 3, studentName: "Robert Johnson", amount: 150, date: "2023-07-15", status: "Pending" },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Instructor Portal</h1>
          <p className="text-gray-600 mt-1">Manage your students, gradings, and classes</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button>Add New Student</Button>
          <Button variant="outline">Schedule Grading</Button>
        </div>
      </div>

      <EventBanner />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-gray-500">+3 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Gradings</CardTitle>
            <Award className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-500">Next on Aug 15, 2023</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$6,300</div>
            <p className="text-xs text-gray-500">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="students" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="gradings">Gradings</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>
            
            <TabsContent value="students">
              <Card>
                <CardHeader>
                  <CardTitle>Student List</CardTitle>
                  <CardDescription>
                    Manage your students and their progression
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Membership No.</TableHead>
                        <TableHead>Current Grade</TableHead>
                        <TableHead>Last Attendance</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>{student.membershipNo}</TableCell>
                          <TableCell>{student.grade}</TableCell>
                          <TableCell>{student.lastAttendance}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="gradings">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Gradings</CardTitle>
                  <CardDescription>
                    Schedule and manage student gradings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Number of Students</TableHead>
                        <TableHead>Venue</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upcomingGradings.map((grading) => (
                        <TableRow key={grading.id}>
                          <TableCell className="font-medium">{grading.date}</TableCell>
                          <TableCell>{grading.numberOfStudents}</TableCell>
                          <TableCell>{grading.venue}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">Details</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Payments</CardTitle>
                  <CardDescription>
                    Track student payments and financial records
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.studentName}</TableCell>
                          <TableCell>${payment.amount}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>
                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                              payment.status === "Paid" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {payment.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">Receipt</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="events">
              <EventsCalendar />
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ClipboardList className="mr-2 h-5 w-5" />
                Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border w-full"
              />
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Today's Classes</h4>
                <div className="space-y-2">
                  <div className="p-2 bg-gray-50 rounded border">
                    <p className="font-medium">Beginners Class</p>
                    <p className="text-sm text-gray-500">5:00 PM - 6:30 PM</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded border">
                    <p className="font-medium">Advanced Class</p>
                    <p className="text-sm text-gray-500">7:00 PM - 8:30 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="h-5 w-5 rounded-full border-2 border-red-500 mr-2 flex-shrink-0 mt-0.5"></div>
                  <div>
                    <p className="font-medium">Grade student certificates</p>
                    <p className="text-sm text-gray-500">Due by Jul 25</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-5 w-5 rounded-full border-2 border-yellow-500 mr-2 flex-shrink-0 mt-0.5"></div>
                  <div>
                    <p className="font-medium">Prepare for competition</p>
                    <p className="text-sm text-gray-500">Due by Aug 10</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-5 w-5 rounded-full border-2 border-green-500 mr-2 flex-shrink-0 mt-0.5"></div>
                  <div>
                    <p className="font-medium">Order new equipment</p>
                    <p className="text-sm text-gray-500">Due by Aug 15</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InstructorPortal;
