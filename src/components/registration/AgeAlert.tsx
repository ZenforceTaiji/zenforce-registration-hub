
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AgeAlert = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default AgeAlert;
