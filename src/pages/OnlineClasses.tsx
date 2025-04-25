
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, Clock, Video, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format, isAfter, isBefore, parseISO, addMinutes } from "date-fns";

interface OnlineClass {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number;
  instructor: string;
  status: "upcoming" | "live" | "completed";
}

const OnlineClasses = () => {
  const navigate = useNavigate();

  // In a real application, this would come from API
  const [classes] = useState<OnlineClass[]>([
    {
      id: "oc-001",
      title: "Qi Gong for Beginners",
      date: "2025-04-26",
      time: "10:00",
      duration: 60,
      instructor: "Master Wong",
      status: "upcoming"
    },
    {
      id: "oc-002",
      title: "Meditation Fundamentals",
      date: "2025-04-25",
      time: "15:00",
      duration: 45,
      instructor: "Lisa Chen",
      status: "live"
    },
    {
      id: "oc-003",
      title: "Health Improvement Session",
      date: "2025-04-23",
      time: "18:00",
      duration: 60,
      instructor: "John Smith",
      status: "completed"
    }
  ]);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "live":
        return <Badge className="bg-green-600">Live Now</Badge>;
      case "upcoming":
        return <Badge variant="outline">Upcoming</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      default:
        return null;
    }
  };
  
  const handleJoinClass = (classId: string) => {
    navigate(`/online-classroom/${classId}`);
  };
  
  const canJoin = (status: string) => {
    return status === "live" || status === "upcoming";
  };
  
  return (
    <div className="zen-container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Online Classes</h1>
        <p className="text-gray-500 mt-1">View and join your scheduled online classes</p>
      </div>
      
      <div className="grid gap-6 mt-6">
        <Link to="/online-registration" className="w-full">
          <Button className="w-full mb-6">Register for New Online Class</Button>
        </Link>
        
        {classes.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-gray-500">You don't have any online classes scheduled.</p>
              <Link to="/online-registration" className="block mt-4">
                <Button>Register for Online Class</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          classes.map(classItem => (
            <Card key={classItem.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{classItem.title}</CardTitle>
                  {getStatusBadge(classItem.status)}
                </div>
                <CardDescription>Instructor: {classItem.instructor}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                    <span>
                      {format(parseISO(classItem.date), 'EEEE, MMMM d, yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-gray-500" />
                    <span>
                      {classItem.time} - {format(addMinutes(new Date(`${classItem.date}T${classItem.time}`), classItem.duration), 'HH:mm')} 
                      ({classItem.duration} minutes)
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {classItem.status === "live" ? (
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => handleJoinClass(classItem.id)}
                  >
                    <Video className="mr-2 h-4 w-4" />
                    Join Live Class
                  </Button>
                ) : classItem.status === "upcoming" ? (
                  <Button 
                    variant="outline"
                    className="w-full" 
                    onClick={() => handleJoinClass(classItem.id)}
                  >
                    Enter Waiting Room
                  </Button>
                ) : (
                  <Button variant="ghost" className="w-full" disabled>
                    <Check className="mr-2 h-4 w-4" />
                    Completed
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default OnlineClasses;
