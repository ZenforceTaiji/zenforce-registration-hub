
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { TrainingSelectionForm, TrainingOption } from "./TrainingSelectionForm";
import { PersonalDetailsForm } from "./form/PersonalDetailsForm";
import { FormActions } from "./form/FormActions";

interface StudentDetails {
  firstName: string;
  lastName: string;
  identityNumber?: string;
  mobile?: string;
  telephone?: string;
  email?: string;
  physicalAddress?: string;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTrainingSelectionChange = (selectedOptions: TrainingOption[]) => {
    setFormData((prev) => ({
      ...prev,
      selectedTraining: selectedOptions
    }));
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
      sessionStorage.setItem("studentDetails", JSON.stringify(formData));
      
      if (userAge === "child") {
        navigate("/parent-details");
      } else {
        navigate("/previous-training");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Error",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PersonalDetailsForm formData={formData} onChange={handleChange} />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Select Your Training Options *</h3>
        <TrainingSelectionForm onSelectionChange={handleTrainingSelectionChange} />
      </div>

      <FormActions
        onBack={() => navigate("/par-form")}
        isProcessing={isProcessing}
      />
    </form>
  );
};

export default RegistrationForm;
