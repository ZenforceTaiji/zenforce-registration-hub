
import React, { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FileText, Upload, Mail } from "lucide-react";
import emailjs from 'emailjs-com';

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
    certificateNumber: "",
    title: "Shifu" // Default value
  });
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

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
  
  const sendWelcomeEmail = async (instructor: any) => {
    try {
      setIsSendingEmail(true);

      // This is a placeholder for EmailJS implementation
      // You would need to set up an EmailJS template with appropriate variables
      const templateParams = {
        to_email: instructor.email,
        to_name: instructor.name,
        title: instructor.title,
        certificate_number: instructor.certificateNumber,
        qualifications: instructor.qualifications || "Zen Martial Arts Instructor",
      };

      // Uncomment and use your actual EmailJS service ID, template ID, and user ID
      // await emailjs.send(
      //   'your_service_id',  // Replace with your service ID
      //   'your_template_id', // Replace with your template ID
      //   templateParams,
      //   'your_user_id'      // Replace with your user ID
      // );

      // For now, we'll just simulate the email sending with a toast
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Welcome Email Sent",
        description: `Congratulatory email sent to ${instructor.email}`,
      });
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Email Error",
        description: "Failed to send welcome email. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSendingEmail(false);
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
    await sendWelcomeEmail(newInstructorData);
    
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
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Select 
              value={newInstructor.title} 
              onValueChange={(value) => setNewInstructor({...newInstructor, title: value})}
            >
              <SelectTrigger id="title">
                <SelectValue placeholder="Select title" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Shifu">Shifu</SelectItem>
                {/* More options will be added later as per requirements */}
              </SelectContent>
            </Select>
          </div>
          
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
                readOnly
                className="bg-gray-100"
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
                Regenerate
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Certificate numbers are pre-generated for new instructors
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

export default InstructorForm;
