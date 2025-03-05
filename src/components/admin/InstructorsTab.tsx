
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InstructorAssignmentDialog } from "@/components/admin";
import InstructorForm from "./instructor-form";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw } from "lucide-react";

interface Instructor {
  id: number;
  name: string;
  email: string;
  status: string;
  students: number;
  lastLogin: string;
  certificateNumber?: string;
  title?: string;
}

interface InstructorsTabProps {
  instructors: Instructor[];
  students: { id: number; name: string; level: string }[];
  areas: { id: number; name: string; students: number }[];
}

const InstructorsTab = ({ instructors: initialInstructors, students, areas }: InstructorsTabProps) => {
  const [instructors, setInstructors] = useState<Instructor[]>(initialInstructors);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState<{ id: number; name: string } | null>(null);
  const { toast } = useToast();

  const handleAddInstructor = (newInstructor: Instructor) => {
    setInstructors([...instructors, newInstructor]);
  };

  const openAssignDialog = (instructorId: number) => {
    const instructor = instructors.find(i => i.id === instructorId);
    if (instructor) {
      setSelectedInstructor({ id: instructor.id, name: instructor.name });
      setIsAssignDialogOpen(true);
    }
  };

  const regenerateCertificateNumber = (instructorId: number) => {
    const updatedInstructors = instructors.map(instructor => {
      if (instructor.id === instructorId) {
        // Generate a new certificate number with the format ZRI2025_XX
        const currentYear = 2025; // Hardcoded as per request
        const existingNumbers = instructors
          .filter(i => i.certificateNumber?.startsWith(`ZRI${currentYear}_`))
          .map(i => {
            const numPart = i.certificateNumber?.split('_')[1];
            return numPart ? parseInt(numPart, 10) : 0;
          });
        
        const highestNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) : 0;
        const nextNumber = highestNumber + 1;
        const paddedNumber = nextNumber.toString().padStart(2, '0');
        const newCertificateNumber = `ZRI${currentYear}_${paddedNumber}`;
        
        toast({
          title: "Certificate Number Updated",
          description: `New certificate number ${newCertificateNumber} generated for ${instructor.name}`,
        });
        
        return {
          ...instructor,
          certificateNumber: newCertificateNumber
        };
      }
      return instructor;
    });
    
    setInstructors(updatedInstructors);
  };

  return (
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
                  <TableHead>Title</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Certificate #</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {instructors.map((instructor) => (
                  <TableRow key={instructor.id}>
                    <TableCell>{instructor.title || "Shifu"}</TableCell>
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
                    <TableCell className="flex items-center gap-2">
                      {instructor.certificateNumber || "N/A"}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="p-0 h-6 w-6"
                        onClick={() => regenerateCertificateNumber(instructor.id)}
                        title="Regenerate certificate number"
                      >
                        <RefreshCw className="h-3 w-3" />
                      </Button>
                    </TableCell>
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
      
      <InstructorForm 
        onAddInstructor={handleAddInstructor}
        instructors={instructors}
      />

      <InstructorAssignmentDialog 
        isOpen={isAssignDialogOpen}
        onOpenChange={setIsAssignDialogOpen}
        instructor={selectedInstructor}
        areas={areas}
        students={students}
      />
    </div>
  );
};

export default InstructorsTab;
