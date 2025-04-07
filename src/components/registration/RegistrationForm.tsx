
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface StudentDetails {
  firstName: string;
  lastName: string;
  identityNumber?: string;
  mobile?: string;
  telephone?: string;
  email?: string;
  physicalAddress?: string;
}

interface RegistrationFormProps {
  initialData: StudentDetails;
  userAge: string | null;
}

const RegistrationForm = ({ initialData, userAge }: RegistrationFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<StudentDetails>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName) {
      toast({
        title: "Required Fields",
        description: "Please enter your first and last name",
        variant: "destructive",
      });
      return;
    }
    
    // Save form data to session storage
    sessionStorage.setItem("studentDetails", JSON.stringify(formData));
    
    // Navigate to parent details page if user is under 18, or to previous training if 18+
    if (userAge === "child") {
      navigate("/parent-details");
    } else {
      navigate("/previous-training");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="identityNumber">Identity Number</Label>
          <Input
            id="identityNumber"
            name="identityNumber"
            value={formData.identityNumber}
            onChange={handleChange}
            placeholder="Enter your ID number"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile</Label>
          <Input
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter your mobile number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="telephone">Telephone</Label>
          <Input
            id="telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            placeholder="Enter your telephone number"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="physicalAddress">Physical Address</Label>
          <Input
            id="physicalAddress"
            name="physicalAddress"
            value={formData.physicalAddress}
            onChange={handleChange}
            placeholder="Enter your physical address"
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={() => navigate("/par-form")}>
          Back to PAR-Q Form
        </Button>
        <Button type="submit" className="bg-accent-red hover:bg-accent-red/90 text-white">
          Continue
        </Button>
      </div>
    </form>
  );
};

export default RegistrationForm;
