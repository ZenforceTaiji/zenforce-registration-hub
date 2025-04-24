
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, AlertTriangle } from "lucide-react";
import { createTypedPayment, PaymentType } from "@/services/paymentService";
import { TRAINING_PACKAGES } from "@/constants/financialRules";

interface OnlineRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  participants: number;
  dateTime: string;
  totalPrice: number;
}

const OnlinePayment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [registrationData, setRegistrationData] = useState<OnlineRegistrationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedData = sessionStorage.getItem("onlineRegistration");
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setRegistrationData(parsedData);
      } catch (error) {
        console.error("Error parsing online registration data:", error);
        toast({
          title: "Error",
          description: "Could not load your registration data. Please try again.",
          variant: "destructive",
        });
        navigate("/online-registration");
      }
    } else {
      toast({
        title: "No Registration Data",
        description: "Please complete the registration form first.",
        variant: "destructive",
      });
      navigate("/online-registration");
    }
  }, [navigate, toast]);

  const handlePayment = async () => {
    if (!registrationData) return;
    
    setIsLoading(true);
    
    try {
      const amountInCents = registrationData.participants * TRAINING_PACKAGES.ONLINE.price;
      
      const paymentResponse = await createTypedPayment(
        amountInCents,
        PaymentType.OTHER,
        `ZenForce Online Class - ${registrationData.participants} participant(s) - ${registrationData.dateTime}`,
        `${window.location.origin}/payment-success?type=online`,
        `${window.location.origin}/payment-cancelled?type=online`
      );
      
      if (paymentResponse.success && paymentResponse.paymentUrl) {
        // Store payment info in session storage
        sessionStorage.setItem("onlinePaymentInitiated", "true");
        
        if (paymentResponse.paymentId) {
          sessionStorage.setItem("onlinePaymentId", paymentResponse.paymentId);
        }
        
        // Redirect to payment URL
        window.location.href = paymentResponse.paymentUrl;
      } else {
        throw new Error(paymentResponse.errorMessage || "Failed to initiate payment");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Error",
        description: "There was a problem initiating your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!registrationData) {
    return (
      <div className="zen-container py-12">
        <Card className="max-w-lg mx-auto">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertTriangle className="mx-auto h-12 w-12 text-amber-500" />
              <p className="mt-4">Loading registration data...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="zen-container py-12">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">Online Class Payment</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-gray-500" />
                <span className="text-gray-600">Participants:</span>
              </div>
              <span className="font-medium">{registrationData.participants}</span>
            </div>
            
            <div className="flex justify-between items-center border-b pb-2">
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                <span className="text-gray-600">Date:</span>
              </div>
              <span className="font-medium">
                {new Date(registrationData.date).toLocaleDateString()}
              </span>
            </div>
            
            <div className="flex justify-between items-center border-b pb-2">
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-gray-500" />
                <span className="text-gray-600">Time:</span>
              </div>
              <span className="font-medium">{registrationData.time}</span>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-md">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Price per participant:</span>
                <span>R{TRAINING_PACKAGES.ONLINE.price/100}.00</span>
              </div>
              
              <div className="flex justify-between items-center mt-1">
                <span className="text-gray-700">Number of participants:</span>
                <span>x {registrationData.participants}</span>
              </div>
              
              <div className="border-t mt-2 pt-2 flex justify-between items-center">
                <span className="font-semibold">Total amount:</span>
                <span className="text-xl font-bold">R{registrationData.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => navigate("/online-registration")}
            >
              Back to Form
            </Button>
            
            <Button 
              onClick={handlePayment}
              className="bg-red-600 hover:bg-red-700" 
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Pay Now"}
            </Button>
          </CardFooter>
        </Card>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            After payment, you will receive confirmation and connection details for your online class.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnlinePayment;
