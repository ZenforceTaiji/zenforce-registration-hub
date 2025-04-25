
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BellRing, MapPin, Clock, Filter } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useClassSchedule } from "./hooks/useClassSchedule";

const ClassList = () => {
  const { classes, isLoading, toggleReminder } = useClassSchedule();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPeriod, setFilterPeriod] = useState("all");
  
  // Filter classes based on search term and filter period
  const filteredClasses = classes.filter(classItem => {
    const matchesSearch = classItem.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         classItem.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (filterPeriod === "all") return true;
    
    const classDate = parseISO(classItem.date);
    const today = new Date();
    
    if (filterPeriod === "past") {
      return classDate < today;
    } else if (filterPeriod === "upcoming") {
      return classDate >= today;
    } else if (filterPeriod === "week") {
      const oneWeek = new Date();
      oneWeek.setDate(today.getDate() + 7);
      return classDate >= today && classDate <= oneWeek;
    } else if (filterPeriod === "month") {
      const oneMonth = new Date();
      oneMonth.setMonth(today.getMonth() + 1);
      return classDate >= today && classDate <= oneMonth;
    }
    
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Input
            placeholder="Search classes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Filter className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        
        <Select value={filterPeriod} onValueChange={setFilterPeriod}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="past">Past</SelectItem>
            <SelectItem value="week">Next 7 Days</SelectItem>
            <SelectItem value="month">Next 30 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : filteredClasses.length > 0 ? (
        <div className="space-y-4">
          {filteredClasses.map(classItem => {
            const classDate = parseISO(classItem.date);
            const isPast = classDate < new Date();
            
            return (
              <Card key={classItem.id} className={`${isPast ? 'bg-gray-50' : 'bg-white'}`}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium text-lg">{classItem.title}</h4>
                        {isPast && <span className="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">Past</span>}
                      </div>
                      <p className="text-gray-500">
                        {format(classDate, "EEEE, MMMM d, yyyy")}
                      </p>
                      <div className="flex items-center text-gray-500 mt-1">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{classItem.time}</span>
                      </div>
                      <div className="flex items-center text-gray-500 mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{classItem.location}</span>
                      </div>
                    </div>
                    
                    {!isPast && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleReminder(classItem.id)}
                        className="whitespace-nowrap"
                      >
                        <BellRing className="h-4 w-4 mr-2" />
                        {classItem.hasReminder ? "Remove Reminder" : "Set Reminder"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No classes found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default ClassList;
