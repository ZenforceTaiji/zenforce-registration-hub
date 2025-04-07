
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ParQAlert from "@/components/registration/ParQAlert";
import AgeAlert from "@/components/registration/AgeAlert";
import RegistrationForm from "@/components/registration/RegistrationForm";

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

  // Check for prerequisites and load saved data
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

  // If PAR-Q not completed, show alert instead of form
  if (!isPARQCompleted) {
    return (
      <div className="zen-container py-12 animate-fade-in">
        <ParQAlert />
      </div>
    );
  }

  // If no age is set, show alert instead of form
  if (!userAge) {
    return (
      <div className="zen-container py-12 animate-fade-in">
        <AgeAlert />
      </div>
    );
  }

  return (
    <div className="zen-container py-12 animate-fade-in">
      <h1 className="page-title mb-2">Step 2: Student Registration</h1>
      <p className="text-center text-gray-600 mb-8">Please enter your personal details</p>
      
      <div className="zen-card max-w-2xl mx-auto">
        <RegistrationForm initialData={formData} userAge={userAge} />
      </div>
    </div>
  );
};

export default Registration;
