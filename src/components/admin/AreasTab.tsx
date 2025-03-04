
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AreaForm from "./AreaForm";

interface Area {
  id: number;
  name: string;
  students: number;
  instructors: number;
  description?: string;
}

interface Student {
  id: number;
  name: string;
  email: string;
  area: string;
  level: string;
}

interface AreasTabProps {
  areas: Area[];
  students: Student[];
}

const AreasTab = ({ areas: initialAreas, students }: AreasTabProps) => {
  const [areas, setAreas] = useState<Area[]>(initialAreas);

  const handleAddArea = (newArea: Area) => {
    setAreas([...areas, newArea]);
  };

  return (
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
                {areas.map((area) => (
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
                {students.map((student) => (
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
      
      <AreaForm onAddArea={handleAddArea} />
    </div>
  );
};

export default AreasTab;
