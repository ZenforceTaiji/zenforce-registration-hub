
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Show toast notification
    toast({
      title: "Payment Successful",
      description: "Your payment has been processed successfully.",
    });
    
    // Save payment status to session storage
    sessionStorage.setItem("paymentCompleted", "true");
  }, [toast]);

  return (
    <div className="zen-container py-12 animate-fade-in">
      <div className="max-w-xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-20 w-20 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        
        <Card className="mb-8">
          <CardContent className="pt-6 pb-6">
            <p className="text-lg text-gray-600 mb-6">
              Thank you for your payment. Your registration is now complete and your membership is active.
            </p>
            
            <p className="text-sm text-gray-500 mb-6">
              A receipt has been sent to your email address. Please keep it for your records.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-md border border-gray-100 mb-4">
              <p className="text-sm font-medium">What happens next?</p>
              <ul className="text-sm text-gray-600 list-disc list-inside mt-2 text-left">
                <li>Your instructor has been notified of your registration</li>
                <li>You can log in to the student portal using your credentials</li>
                <li>Your first class schedule will be communicated via email</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            variant="outline" 
            onClick={() => navigate("/completion")}
          >
            Back to Registration Summary
          </Button>
          
          <Button
            className="bg-accent-red hover:bg-accent-red/90 text-white"
            onClick={() => navigate("/")}
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
