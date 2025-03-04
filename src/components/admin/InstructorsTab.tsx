
import React, { useState, useRef } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { FileText, Upload, User } from "lucide-react";
import { InstructorAssignmentDialog } from "@/components/admin";

interface Instructor {
  id: number;
  name: string;
  email: string;
  status: string;
  students: number;
  lastLogin: string;
  certificateNumber?: string;
}

interface InstructorsTabProps {
  instructors: Instructor[];
  students: { id: number; name: string; level: string }[];
  areas: { id: number; name: string; students: number }[];
}

const InstructorsTab = ({ instructors, students, areas }: InstructorsTabProps) => {
  const { toast } = useToast();
  const [newInstructor, setNewInstructor] = useState({
    name: "",
    email: "",
    qualifications: "",
    password: "",
    confirmPassword: "",
    certificateNumber: ""
  });
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState<{ id: number; name: string } | null>(null);

  const generateCertificateNumber = () => {
    const currentYear = new Date().getFullYear();
    const existingNumbers = instructors
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
