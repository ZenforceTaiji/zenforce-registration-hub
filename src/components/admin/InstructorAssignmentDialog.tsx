
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Area {
  id: number;
  name: string;
  students: number;
}

interface Student {
  id: number;
  name: string;
  level: string;
}

interface InstructorAssignmentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  instructor: { id: number; name: string } | null;
  areas: Area[];
  students: Student[];
}

const InstructorAssignmentDialog = ({ 
  isOpen, 
  onOpenChange, 
  instructor, 
  areas, 
  students 
}: InstructorAssignmentDialogProps) => {
  const { toast } = useToast();
  const [assignmentType, setAssignmentType] = useState<"area" | "students">("area");
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);

  const handleAssignSubmit = () => {
    const instructorName = instructor?.name || "Instructor";
    
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
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
                    {areas.map(area => (
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
                    {students.map(student => (
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
                      const student = students.find(s => s.id === studentId);
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAssignSubmit}>
            Assign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InstructorAssignmentDialog;
