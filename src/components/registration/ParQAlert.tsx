
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";

const ParQAlert = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto">
      <Alert variant="destructive" className="mb-6 bg-black border-amber-900/50 text-white">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Required Step Missing</AlertTitle>
        <AlertDescription>
          You must complete the Physical Activity Readiness Questionnaire (PAR-Q) before proceeding with registration.
        </AlertDescription>
      </Alert>
      
      <div className="text-center space-y-4">
        <Button 
          onClick={() => navigate("/par-form")}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Complete PAR-Q Form
        </Button>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-300">Need help? Use the WhatsApp button in the bottom right.</p>
        </div>

        <FloatingWhatsAppButton phoneNumber="27731742969" message="Hello, I need assistance with the PAR-Q form for TaijiQuan registration." isExistingUser={false} />
      </div>
    </div>
  );
};

export default ParQAlert;
