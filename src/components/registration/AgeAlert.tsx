
import { AlertCircle, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AgeAlert = () => {
  const navigate = useNavigate();
  const whatsappUrl = "https://wa.me/27731742969?text=" + encodeURIComponent("Hello, I need assistance with selecting my age group for TaijiQuan registration.");

  return (
    <div className="max-w-2xl mx-auto">
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Required Step Missing</AlertTitle>
        <AlertDescription>
          You must select your age group before proceeding with registration.
        </AlertDescription>
      </Alert>
      
      <div className="text-center space-y-4">
        <Button 
          onClick={() => navigate("/")}
          className="bg-accent-red hover:bg-accent-red/90 text-white"
        >
          Return to Homepage
        </Button>
        
        <div className="flex justify-center">
          <a 
            href={whatsappUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-green-600 hover:text-green-700"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Need help? Contact us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default AgeAlert;
