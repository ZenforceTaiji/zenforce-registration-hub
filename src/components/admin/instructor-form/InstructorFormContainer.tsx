
import React, { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";
import InstructorFormFields from "./InstructorFormFields";
import CertificateUpload from "./CertificateUpload";
import { sendWelcomeEmail } from "./EmailService";

interface InstructorFormContainerProps {
  onAddInstructor: (instructor: any) => void;
  instructors: any[];
}

const InstructorFormContainer: React.FC<InstructorFormContainerProps> = ({ 
  onAddInstructor, 
  instructors 
}) => {
  const { toast } = useToast();
  const [newInstructor, setNewInstructor] = useState({
    name: "",
    email: "",
    qualifications: "",
    password: "",
    confirmPassword: "",
    certificateNumber: "",
    title: "Shifu" // Default value
  });
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate certificate number on component mount
  useEffect(() => {
    const generatedNumber = generateCertificateNumber();
    setNewInstructor(prev => ({...prev, certificateNumber: generatedNumber}));
  }, []);

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
    }
  };
  
  const handleAddInstructor = async () => {
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
    
    const newInstructorData = {
      ...newInstructor,
      id: Date.now(), // temporary ID
      status: "Active",
      students: 0,
      lastLogin: new Date().toISOString().split('T')[0]
    };

    // Send welcome email
    await sendWelcomeEmail(newInstructorData, setIsSendingEmail, toast);
    
    // Pass the new instructor to the parent component
    onAddInstructor(newInstructorData);
    
    toast({
      title: "Instructor Added",
      description: `${newInstructor.title} ${newInstructor.name} has been added as an instructor with certificate #${newInstructor.certificateNumber}`,
    });
    
    // Reset form
    const generatedNumber = generateCertificateNumber();
    setNewInstructor({
      name: "",
      email: "",
      qualifications: "",
      password: "",
      confirmPassword: "",
      certificateNumber: generatedNumber,
      title: "Shifu"
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
          <InstructorFormFields 
            newInstructor={newInstructor}
            setNewInstructor={setNewInstructor}
            generateCertificateNumber={generateCertificateNumber}
          />
          
          <CertificateUpload 
            certificateFile={certificateFile}
            setCertificateFile={setCertificateFile}
            onCertificateUpload={handleCertificateUpload}
          />
          
          <Button 
            className="w-full mt-4 flex items-center justify-center gap-2" 
            onClick={handleAddInstructor}
            disabled={isSendingEmail}
          >
            {isSendingEmail ? "Sending Email..." : "Add Instructor"}
            {!isSendingEmail && <Mail className="h-4 w-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstructorFormContainer;
