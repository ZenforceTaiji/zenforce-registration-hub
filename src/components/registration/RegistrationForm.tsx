
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createMembershipInvoice } from "@/services/invoiceService";
import { TrainingSelectionForm, TrainingOption } from "./TrainingSelectionForm";

interface StudentDetails {
  firstName: string;
  lastName: string;
  identityNumber?: string;
  mobile?: string;
  telephone?: string;
  email?: string;
  physicalAddress?: string;
  trainingReason?: string;
  healthIssuesDetails?: string;
  selectedTraining?: TrainingOption[];
}

interface RegistrationFormProps {
  initialData: StudentDetails;
  userAge: string | null;
}

const RegistrationForm = ({ initialData, userAge }: RegistrationFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<StudentDetails>(initialData);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTrainingReasonChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      trainingReason: value,
      healthIssuesDetails: value !== "health" ? "" : prev.healthIssuesDetails
    }));
  };

  const handleTrainingSelectionChange = (selectedOptions: TrainingOption[]) => {
    setFormData((prev) => ({
      ...prev,
      selectedTraining: selectedOptions
    }));
  };

  const calculateTotalPrice = () => {
    return formData.selectedTraining?.reduce((total, option) => total + option.price, 0) || 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName) {
      toast({
        title: "Required Fields",
        description: "Please enter your first and last name",
        variant: "destructive",
      });
      return;
    }

    if (!formData.selectedTraining || formData.selectedTraining.length === 0) {
      toast({
        title: "Training Selection Required",
        description: "Please select at least one training option",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Create invoice for the selected training options
      const invoiceResponse = await createMembershipInvoice(
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email || "",
          mobile: formData.mobile,
        },
        {
          title: "Monthly Training Package",
          price: calculateTotalPrice(),
          description: formData.selectedTraining
            .map(option => option.name)
            .join(", ")
        }
      );

      if (!invoiceResponse.success) {
        throw new Error(invoiceResponse.errorMessage || "Failed to create invoice");
      }

      // Save form data to session storage
      sessionStorage.setItem("studentDetails", JSON.stringify(formData));
      sessionStorage.setItem("invoiceUrl", invoiceResponse.invoiceUrl || "");
      
      // Navigate based on age
      if (userAge === "child") {
        navigate("/parent-details");
      } else {
        navigate("/previous-training");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Error",
        description: "There was a problem processing your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
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

      <div className="space-y-4">
        <Label>Reason For Training *</Label>
        <RadioGroup 
          value={formData.trainingReason} 
          onValueChange={handleTrainingReasonChange}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="martial" id="martial" />
            <Label htmlFor="martial">Martial Arts / Self-Defence</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="relaxation" id="relaxation" />
            <Label htmlFor="relaxation">Relaxation and Meditation</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="health" id="health" />
            <Label htmlFor="health">Help with health issues</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="weight" id="weight" />
            <Label htmlFor="weight">Weight Loss</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all">All of the above</Label>
          </div>
        </RadioGroup>
      </div>

      {formData.trainingReason === "health" && (
        <div className="space-y-3">
          <Label htmlFor="healthIssuesDetails">
            Please explain the health issues you need help with *
          </Label>
          <Textarea
            id="healthIssuesDetails"
            name="healthIssuesDetails"
            value={formData.healthIssuesDetails}
            onChange={handleChange}
            placeholder="Please provide details about your health concerns..."
            className="h-24"
          />
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Select Your Training Options *</h3>
        <TrainingSelectionForm onSelectionChange={handleTrainingSelectionChange} />
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={() => navigate("/par-form")}>
          Back to PAR-Q Form
        </Button>
        <Button 
          type="submit" 
          className="bg-accent-red hover:bg-accent-red/90 text-white"
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Continue"}
        </Button>
      </div>
    </form>
  );
};

export default RegistrationForm;
