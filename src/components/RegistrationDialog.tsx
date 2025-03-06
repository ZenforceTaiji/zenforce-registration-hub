
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { createTypedPayment, PaymentType } from "@/services/paymentService";

interface RegistrationDialogProps {
  onClose: () => void;
}

export function RegistrationDialog({ onClose }: RegistrationDialogProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ageGroup, setAgeGroup] = useState<string>("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleContinue = () => {
    if (!ageGroup) {
      toast({
        title: "Selection Required",
        description: "Please select an age group to continue",
        variant: "destructive",
      });
      return;
    }

    // Store age selection in session storage
    sessionStorage.setItem("userAge", ageGroup);
    onClose();
    
    // Always redirect to PAR-Q form first, regardless of age
    navigate("/par-form");
  };

  const handleRegistrationPayment = async () => {
    if (!ageGroup) {
      toast({
        title: "Selection Required",
        description: "Please select an age group to continue with payment",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsProcessingPayment(true);
      
      // Registration fee amount: R500 (50000 cents)
      const registrationFee = 50000; 
      
      // Create a registration payment
      const paymentResponse = await createTypedPayment(
        registrationFee,
        PaymentType.REGISTRATION,
        `ZenForce TaijiQuan Registration Fee - ${ageGroup === "adult" ? "Adult" : "Under 18"}`,
        `${window.location.origin}/par-form?status=success&payment=complete`,
        `${window.location.origin}/par-form?status=cancelled`
      );
      
      if (paymentResponse.success && paymentResponse.paymentUrl) {
        // Store registration data before redirecting to payment
        sessionStorage.setItem("userAge", ageGroup);
        sessionStorage.setItem("registrationPaymentInitiated", "true");
        
        if (paymentResponse.paymentId) {
          sessionStorage.setItem("registrationPaymentId", paymentResponse.paymentId);
        }
        
        // Open the payment URL in a new tab
        window.open(paymentResponse.paymentUrl, "_blank");
        
        toast({
          title: "Registration Payment Initiated",
          description: "Complete the payment to proceed with registration.",
        });
        
        // Close the dialog
        onClose();
      } else {
        throw new Error(paymentResponse.errorMessage || "Failed to create payment");
      }
    } catch (error) {
      console.error("Registration payment error:", error);
      toast({
        title: "Payment Error",
        description: "There was a problem initiating your registration payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Welcome to ZenForce TaijiQuan</DialogTitle>
        <DialogDescription>
          Please select your age group to begin the registration process
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <RadioGroup value={ageGroup} onValueChange={setAgeGroup}>
          <div className="flex items-center space-x-2 mb-3">
            <RadioGroupItem value="adult" id="adult" />
            <Label htmlFor="adult" className="font-medium">I am 18 years or older</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="child" id="child" />
            <Label htmlFor="child" className="font-medium">I am under 18 years old</Label>
          </div>
        </RadioGroup>
        
        <div className="mt-2 p-3 bg-slate-50 rounded-md">
          <p className="text-sm font-medium">Registration Fee: R500.00</p>
          <p className="text-xs text-slate-500 mt-1">
            This one-time fee covers your initial registration, welcome pack, and first month's membership.
          </p>
        </div>
      </div>

      <DialogFooter className="flex flex-col sm:flex-row gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="mt-2 sm:mt-0"
        >
          Cancel
        </Button>
        
        <Button 
          onClick={handleRegistrationPayment} 
          className="bg-accent-red hover:bg-accent-red/90 text-white w-full sm:w-auto"
          disabled={isProcessingPayment}
        >
          {isProcessingPayment ? "Processing..." : "Pay Registration Fee"}
        </Button>
        
        <Button onClick={handleContinue} className="zen-button-primary w-full sm:w-auto">
          Continue Without Payment
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
