
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InstructorAssignmentDialog } from "@/components/admin";
import InstructorForm from "./InstructorForm";

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
