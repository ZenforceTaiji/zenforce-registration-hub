
import React, { useState, useRef } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FileText, Upload } from "lucide-react";

interface InstructorFormProps {
  onAddInstructor: (instructor: any) => void;
  instructors: any[];
}

const InstructorForm = ({ onAddInstructor, instructors }: InstructorFormProps) => {
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
    
    // Pass the new instructor to the parent component
    onAddInstructor({
      ...newInstructor,
      certificateNumber,
      id: Date.now(), // temporary ID
      status: "Active",
      students: 0,
      lastLogin: new Date().toISOString().split('T')[0]
    });
    
    // Reset form
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

  return (
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
  );
};

export default InstructorForm;
