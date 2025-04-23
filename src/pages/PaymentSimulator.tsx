
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PaymentSimulator = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Extract payment information from URL
  const amount = searchParams.get("amount") || "0";
  const reference = searchParams.get("reference") || "UNKNOWN";
  const type = searchParams.get("type") || "Payment";
  const isFallback = searchParams.get("fallback") === "true";
  
  useEffect(() => {
    if (isFallback) {
      toast({
        title: "Payment Gateway Fallback",
        description: "External payment gateway is unavailable. Using simulator instead.",
        variant: "warning",
      });
    }
  }, [isFallback, toast]);
  
  const completePayment = (success: boolean) => {
    setIsLoading(true);
    
    // Simulate processing delay
    setTimeout(() => {
      // Store result in session storage
      sessionStorage.setItem("paymentResult", success ? "success" : "cancelled");
      sessionStorage.setItem("paymentReference", reference);
      
      // Get the type-specific return URL or use default
      let returnUrl = "/payment-success";
      
      if (!success) {
        returnUrl = "/payment-cancelled";
      }
      
      // Add type parameter if it exists in the original payment request
      if (type.toLowerCase().includes("grading")) {
        returnUrl += "?type=grading";
      }
      
      // Navigate to success or cancel page
      navigate(returnUrl);
    }, 1500);
  };

  return (
    <div className="zen-container py-12 animate-fade-in">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-8">Payment Simulator</h1>
        <Card className="mb-8">
          <CardContent className="pt-6 pb-6">
            <div className="flex justify-center mb-6">
              {isFallback ? (
                <AlertCircle className="h-16 w-16 text-amber-500" />
              ) : (
                <CheckCircle className="h-16 w-16 text-blue-500" />
              )}
            </div>
            
            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
            
            <div className="grid grid-cols-2 gap-2 mb-6">
              <p className="text-right font-medium">Amount:</p>
              <p className="text-left">R{amount}</p>
              
              <p className="text-right font-medium">Reference:</p>
              <p className="text-left">{reference}</p>
              
              <p className="text-right font-medium">Type:</p>
              <p className="text-left">{type}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-4">
              <p className="text-sm font-medium mb-2">Note:</p>
              <p className="text-sm text-gray-600">
                This is a payment simulator for development and demonstration purposes.
                In a production environment, you would be redirected to a secure payment gateway.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            className="min-w-[120px]"
            disabled={isLoading}
            onClick={() => completePayment(false)}
          >
            {isLoading ? "Processing..." : "Cancel Payment"}
          </Button>
          
          <Button
            className="bg-green-600 hover:bg-green-700 text-white min-w-[120px]"
            disabled={isLoading}
            onClick={() => completePayment(true)}
          >
            {isLoading ? "Processing..." : "Complete Payment"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSimulator;
