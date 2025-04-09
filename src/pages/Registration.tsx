
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ParQAlert from "@/components/registration/ParQAlert";
import AgeAlert from "@/components/registration/AgeAlert";
import RegistrationForm from "@/components/registration/RegistrationForm";
import AgeSelectionDialog from "@/components/registration/AgeSelectionDialog";

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
  
  // State for dialog control
  const [showAgeDialog, setShowAgeDialog] = useState(false);
  
  // Get user age from session storage
  const [userAge, setUserAge] = useState<string | null>(
    sessionStorage.getItem("userAge")
  );
  
  // Check if PAR-Q form is completed
  const [isPARQCompleted, setIsPARQCompleted] = useState(false);
  
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
    console.log("Registration component mounted");
    
    // Check PAR-Q completion
    const parQFormData = sessionStorage.getItem("parQForm");
    const parqCompleted = parQFormData ? JSON.parse(parQFormData).completed : false;
    setIsPARQCompleted(parqCompleted);
    console.log("PAR-Q completed:", parqCompleted);
    
    // Check user age
    const age = sessionStorage.getItem("userAge");
    setUserAge(age);
    console.log("User age:", age);
    
    if (!parqCompleted) {
      toast({
        title: "PAR-Q Required",
        description: "You must complete the Physical Activity Readiness Questionnaire before registration.",
        variant: "destructive",
      });
      navigate("/par-form");
      return;
    }
    
    // If PAR-Q is completed but no age is set, show the age dialog
    if (parqCompleted && !age) {
      setShowAgeDialog(true);
    }
    
    // Load saved student details if they exist
    const savedData = sessionStorage.getItem("studentDetails");
    
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, [navigate, toast]);

  // If PAR-Q not completed, show alert instead of form
  if (!isPARQCompleted) {
    return (
      <div className="zen-container py-12 animate-fade-in">
        <ParQAlert />
      </div>
    );
  }

  return (
    <div className="zen-container py-12 animate-fade-in">
      {/* Age Selection Dialog - shown when no age is set */}
      <AgeSelectionDialog 
        open={showAgeDialog} 
        onOpenChange={setShowAgeDialog} 
      />
      
      {/* Only display the registration form if both PAR-Q is completed and age is set */}
      {isPARQCompleted && userAge ? (
        <>
          <h1 className="page-title mb-2">Step 2: Student Registration</h1>
          <p className="text-center text-gray-600 mb-8">Please enter your personal details</p>
          
          <div className="zen-card max-w-2xl mx-auto">
            <RegistrationForm initialData={formData} userAge={userAge} />
          </div>
        </>
      ) : isPARQCompleted && !userAge && !showAgeDialog ? (
        <div className="text-center">
          <AgeAlert />
        </div>
      ) : null}
    </div>
  );
};

export default Registration;
