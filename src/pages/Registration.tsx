
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface StudentDetails {
  firstName: string;
  lastName: string;
  identityNumber?: string;
  mobile?: string;
  telephone?: string;
  email?: string;
  physicalAddress?: string;
}

const Registration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get user age from session storage
  const userAge = sessionStorage.getItem("userAge");
  
  // Check if PAR-Q form is completed
  const parQFormData = sessionStorage.getItem("parQForm");
  const isPARQCompleted = parQFormData ? JSON.parse(parQFormData).completed : false;
  
  const [formData, setFormData] = useState<StudentDetails>({
    firstName: "",
    lastName: "",
    identityNumber: "",
    mobile: "",
    telephone: "",
    email: "",
    physicalAddress: "",
  });

  // If PAR-Q is not completed, redirect to PAR-Q form
  useEffect(() => {
    if (!isPARQCompleted) {
      toast({
        title: "PAR-Q Required",
        description: "You must complete the Physical Activity Readiness Questionnaire before registration.",
        variant: "destructive",
      });
      navigate("/par-form");
      return;
    }
    
    // If no age is set, redirect to homepage
    if (!userAge) {
      toast({
        title: "Age Selection Required",
        description: "Please select your age group before proceeding with registration.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }
    
    // Load saved student details if they exist
    const savedData = sessionStorage.getItem("studentDetails");
    
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, [isPARQCompleted, navigate, toast, userAge]);

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

  // If PAR-Q not completed, show alert instead of form
  if (!isPARQCompleted) {
    return (
      <div className="zen-container py-12 animate-fade-in">
        <div className="max-w-2xl mx-auto">
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Required Step Missing</AlertTitle>
            <AlertDescription>
              You must complete the Physical Activity Readiness Questionnaire (PAR-Q) before proceeding with registration.
            </AlertDescription>
          </Alert>
          
          <div className="text-center">
            <Button 
              onClick={() => navigate("/par-form")}
              className="bg-accent-red hover:bg-accent-red/90 text-white"
            >
              Complete PAR-Q Form
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // If no age is set, show alert instead of form
  if (!userAge) {
    return (
      <div className="zen-container py-12 animate-fade-in">
        <div className="max-w-2xl mx-auto">
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Required Step Missing</AlertTitle>
            <AlertDescription>
              You must select your age group before proceeding with registration.
            </AlertDescription>
          </Alert>
          
          <div className="text-center">
            <Button 
              onClick={() => navigate("/")}
              className="bg-accent-red hover:bg-accent-red/90 text-white"
            >
              Return to Homepage
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="zen-container py-12 animate-fade-in">
      <h1 className="page-title mb-2">Step 2: Student Registration</h1>
      <p className="text-center text-gray-600 mb-8">Please enter your personal details</p>
      
      <div className="zen-card max-w-2xl mx-auto">
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
      </div>
    </div>
  );
};

export default Registration;
