import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InstructorFormFieldsProps {
  newInstructor: {
    name: string;
    email: string;
    qualifications: string;
    password: string;
    confirmPassword: string;
    certificateNumber: string;
    title: string;
  };
  setNewInstructor: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    qualifications: string;
    password: string;
    confirmPassword: string;
    certificateNumber: string;
    title: string;
  }>>;
  generateCertificateNumber: () => string;
}

const InstructorFormFields: React.FC<InstructorFormFieldsProps> = ({ 
  newInstructor, 
  setNewInstructor,
  generateCertificateNumber
}) => {
  return (
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
    </div>
  );
};

export default InstructorFormFields;
