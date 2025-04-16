
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PaymentCancelled = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Show toast notification
    toast({
      title: "Payment Cancelled",
      description: "Your payment was cancelled or not completed.",
      variant: "destructive",
    });
  }, [toast]);

  return (
    <div className="zen-container py-12 animate-fade-in">
      <div className="max-w-xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <AlertCircle className="h-20 w-20 text-orange-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Payment Not Completed</h1>
        
        <Card className="mb-8">
          <CardContent className="pt-6 pb-6">
            <p className="text-lg text-gray-600 mb-6">
              Your payment was not completed or was cancelled.
            </p>
            
            <p className="text-sm text-gray-500 mb-6">
              Don't worry! Your registration information has been saved. You can complete your payment later.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-md border border-gray-100 mb-4">
              <p className="text-sm font-medium">What happens now?</p>
              <ul className="text-sm text-gray-600 list-disc list-inside mt-2 text-left">
                <li>Your registration information is saved</li>
                <li>You can return to the completion page to try the payment again</li>
                <li>You can also contact support if you're having issues with payment</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="h-5 w-5 text-blue-500" />
                <p className="text-sm font-medium">Monthly Invoice Option</p>
              </div>
              <p className="text-sm text-gray-600 text-left">
                Your monthly membership invoice has been sent to your email. You can still pay it directly from the email using the 
                "Pay Now" button or by scanning the QR code included in the invoice, even if your registration payment wasn't completed.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            variant="outline" 
            onClick={() => navigate("/completion")}
          >
            Return to Completion Page
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

export default PaymentCancelled;
