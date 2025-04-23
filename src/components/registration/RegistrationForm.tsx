
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { createMembershipInvoice } from "@/services/invoiceService";
import { TrainingSelectionForm, TrainingOption } from "./TrainingSelectionForm";
import { PersonalDetailsForm } from "./form/PersonalDetailsForm";
import { InvoiceError } from "./form/InvoiceError";
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
  const [invoiceError, setInvoiceError] = useState<boolean>(false);

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

  const calculateTotalPrice = () => {
    return formData.selectedTraining?.reduce((total, option) => total + option.price, 0) || 0;
  };

  const handleContinueWithoutInvoice = () => {
    sessionStorage.setItem("studentDetails", JSON.stringify(formData));
    
    if (userAge === "child") {
      navigate("/parent-details");
    } else {
      navigate("/previous-training");
    }
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
    setInvoiceError(false);

    try {
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

      sessionStorage.setItem("studentDetails", JSON.stringify(formData));
      sessionStorage.setItem("invoiceUrl", invoiceResponse.invoiceUrl || "");
      
      if (userAge === "child") {
        navigate("/parent-details");
      } else {
        navigate("/previous-training");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setInvoiceError(true);
      toast({
        title: "Registration Notice",
        description: "Unable to create invoice at this time. You can continue with registration.",
        variant: "default",
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

      {invoiceError && <InvoiceError />}

      <FormActions
        onBack={() => navigate("/par-form")}
        onContinueWithoutInvoice={handleContinueWithoutInvoice}
        showInvoiceError={invoiceError}
        isProcessing={isProcessing}
      />
    </form>
  );
};

export default RegistrationForm;
