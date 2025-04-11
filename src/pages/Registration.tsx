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
  
  const [showAgeDialog, setShowAgeDialog] = useState(false);
  
  const [userAge, setUserAge] = useState<string | null>(
    sessionStorage.getItem("userAge")
  );
  
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

  useEffect(() => {
    console.log("Registration component mounted");
    
    const parQFormData = sessionStorage.getItem("parQForm");
    const parqCompleted = parQFormData ? JSON.parse(parQFormData).completed : false;
    setIsPARQCompleted(parqCompleted);
    console.log("PAR-Q completed:", parqCompleted);
    
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
    
    if (parqCompleted && !age) {
      setShowAgeDialog(true);
    }
    
    const savedData = sessionStorage.getItem("studentDetails");
    
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, [navigate, toast]);

  if (!isPARQCompleted) {
    return (
      <div className="zen-container py-12 animate-fade-in">
        <ParQAlert />
      </div>
    );
  }

  return (
    <div className="zen-container py-12 animate-fade-in">
      <AgeSelectionDialog 
        open={showAgeDialog} 
        onOpenChange={setShowAgeDialog}
      />
      
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
