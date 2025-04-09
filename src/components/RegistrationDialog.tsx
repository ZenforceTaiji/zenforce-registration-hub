
import { useState, useEffect } from "react";
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
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createTypedPayment, PaymentType } from "@/services/paymentService";

interface RegistrationDialogProps {
  onClose: () => void;
}

// Package types with their prices
interface Package {
  id: string;
  title: string;
  price: number;
  description: string;
}

// Packages organized by level and type
interface PackageOptions {
  [level: string]: {
    [type: string]: Package;
  };
}

export function RegistrationDialog({ onClose }: RegistrationDialogProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ageGroup, setAgeGroup] = useState<string>("");
  const [level, setLevel] = useState<string>("beginner");
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [existingMembership, setExistingMembership] = useState<string | null>(null);

  // Check for existing membership data in storage
  useEffect(() => {
    // For this implementation, we'll check if any membership data exists in browser storage
    // In a real application, this would likely be a database check
    const checkExistingMembership = () => {
      const storedMembershipNumber = localStorage.getItem("membershipNumber");
      if (storedMembershipNumber) {
        setExistingMembership(storedMembershipNumber);
      }
    };
    
    checkExistingMembership();
  }, []);

  // Define all available packages
  const packages: PackageOptions = {
    beginner: {
      taijiquan: {
        id: "beginner-taijiquan",
        title: "TaijiQuan Only",
        price: 64000, // R640 in cents
        description: "Basic TaijiQuan training for beginners"
      },
      qigong: {
        id: "beginner-qigong",
        title: "Qi Gong Only",
        price: 48000, // R480 in cents
        description: "Basic Qi Gong training for beginners"
      },
      full: {
        id: "beginner-full",
        title: "Full Package",
        price: 120000, // R1200 in cents
        description: "Complete training including TaijiQuan and Qigong"
      }
    },
    intermediate: {
      taijiquan: {
        id: "intermediate-taijiquan",
        title: "TaijiQuan Only",
        price: 72000, // R720 in cents
        description: "Intermediate TaijiQuan training"
      },
      qigong: {
        id: "intermediate-qigong",
        title: "Qi Gong Only",
        price: 64000, // R640 in cents
        description: "Intermediate Qi Gong training"
      },
      full: {
        id: "intermediate-full",
        title: "Full Package",
        price: 180000, // R1800 in cents
        description: "Complete training including TaijiQuan and Qigong for intermediate practitioners"
      }
    }
  };

  // Get the current selected package details
  const getSelectedPackageDetails = (): Package | null => {
    if (!selectedPackage || !level) return null;
    
    const [packageType] = selectedPackage.split('-');
    return packages[level]?.[packageType] || null;
  };

  const selectedPackageDetails = getSelectedPackageDetails();

  const handleContinue = () => {
    if (!ageGroup) {
      toast({
        title: "Selection Required",
        description: "Please select an age group to continue",
        variant: "destructive",
      });
      return;
    }

    if (!selectedPackage) {
      toast({
        title: "Package Selection Required",
        description: "Please select a training package to continue",
        variant: "destructive",
      });
      return;
    }

    // Store selections in session storage
    sessionStorage.setItem("userAge", ageGroup);
    sessionStorage.setItem("trainingLevel", level);
    sessionStorage.setItem("trainingPackage", selectedPackage);
    
    if (selectedPackageDetails) {
      sessionStorage.setItem("packageDetails", JSON.stringify(selectedPackageDetails));
    }
    
    // Close the dialog
    onClose();
    
    // Check for existing membership
    if (existingMembership) {
      // Redirect to reactivation page instead of PAR-Q
      sessionStorage.setItem("existingMembership", existingMembership);
      navigate("/membership-reactivation");
      return;
    }
    
    // Always redirect to PAR-Q form first for new registrations
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

    if (!selectedPackage) {
      toast({
        title: "Package Selection Required",
        description: "Please select a training package before payment",
        variant: "destructive",
      });
      return;
    }

    const packageDetails = getSelectedPackageDetails();
    if (!packageDetails) {
      toast({
        title: "Invalid Package",
        description: "Please select a valid training package",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsProcessingPayment(true);
      
      // Create payment for the selected package
      const paymentResponse = await createTypedPayment(
        packageDetails.price,
        PaymentType.REGISTRATION,
        `ZenForce ${packageDetails.title} Registration - ${ageGroup === "adult" ? "Adult" : "Under 18"}`,
        `${window.location.origin}/par-form?status=success&payment=complete`,
        `${window.location.origin}/par-form?status=cancelled`
      );
      
      if (paymentResponse.success && paymentResponse.paymentUrl) {
        // Store registration data before redirecting to payment
        sessionStorage.setItem("userAge", ageGroup);
        sessionStorage.setItem("trainingLevel", level);
        sessionStorage.setItem("trainingPackage", selectedPackage);
        sessionStorage.setItem("packageDetails", JSON.stringify(packageDetails));
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
          Please complete the registration selections below
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4 py-2">
        <h3 className="text-sm font-medium mb-1">Select your age group</h3>
        <RadioGroup value={ageGroup} onValueChange={setAgeGroup} className="mb-2">
          <div className="flex items-center space-x-2 mb-3">
            <RadioGroupItem value="adult" id="adult" />
            <Label htmlFor="adult" className="font-medium">I am 18 years or older</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="child" id="child" />
            <Label htmlFor="child" className="font-medium">I am under 18 years old</Label>
          </div>
        </RadioGroup>
        
        <Separator className="my-2" />
        
        <h3 className="text-sm font-medium mb-1">Select your experience level</h3>
        <RadioGroup value={level} onValueChange={setLevel} className="mb-2">
          <div className="flex items-center space-x-2 mb-3">
            <RadioGroupItem value="beginner" id="beginner" />
            <Label htmlFor="beginner" className="font-medium">Beginner</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="intermediate" id="intermediate" />
            <Label htmlFor="intermediate" className="font-medium">Intermediate</Label>
          </div>
        </RadioGroup>
        
        <Separator className="my-2" />
        
        <h3 className="text-sm font-medium mb-1">Choose your training package</h3>
        {level && (
          <div className="grid gap-3">
            {Object.entries(packages[level]).map(([type, pkg]) => (
              <div 
                key={pkg.id}
                className={`border rounded-md p-3 cursor-pointer relative transition-all ${
                  selectedPackage === type ? 'border-primary bg-primary-foreground' : 'hover:border-gray-300'
                }`}
                onClick={() => setSelectedPackage(type)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{pkg.title}</p>
                    <p className="text-sm text-gray-500">{pkg.description}</p>
                  </div>
                  <p className="font-bold text-lg">R{pkg.price / 100}</p>
                </div>
                {selectedPackage === type && (
                  <div className="absolute right-3 bottom-3 text-primary">
                    <Check className="h-5 w-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
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
          disabled={isProcessingPayment || !selectedPackage}
        >
          {isProcessingPayment ? "Processing..." : "Pay Registration Fee"}
        </Button>
        
        <Button 
          onClick={handleContinue} 
          className="zen-button-primary w-full sm:w-auto"
          disabled={!selectedPackage}
        >
          Continue Without Payment
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
