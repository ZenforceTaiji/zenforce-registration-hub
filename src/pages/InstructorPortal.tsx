
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

  // Empty arrays for mock data
  const students = [];
  const upcomingGradings = [];
  const recentPayments = [];

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
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-gray-500">+0 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Gradings</CardTitle>
            <Award className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-gray-500">None scheduled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0</div>
            <p className="text-xs text-gray-500">+0% from last month</p>
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
                      {students.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-4">No students found</TableCell>
                        </TableRow>
                      )}
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
                      {upcomingGradings.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-4">No gradings scheduled</TableCell>
                        </TableRow>
                      )}
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
                      {recentPayments.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-4">No payment records found</TableCell>
                        </TableRow>
                      )}
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
                <div className="p-4 text-center text-gray-500">
                  No classes scheduled for today
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 text-center text-gray-500">
                No tasks assigned
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InstructorPortal;
