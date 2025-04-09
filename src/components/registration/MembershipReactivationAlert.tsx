
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import emailjs from 'emailjs-com';
import { useToast } from "@/hooks/use-toast";

interface MembershipReactivationAlertProps {
  membershipNumber: string;
  email: string;
  name: string;
}

const MembershipReactivationAlert = ({ membershipNumber, email, name }: MembershipReactivationAlertProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [reactivate, setReactivate] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReactivation = async () => {
    if (!reactivate) {
      toast({
        title: "Selection Required",
        description: "Please select whether you want to reactivate your membership",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    if (reactivate === "yes") {
      try {
        // Send reactivation email
        const templateParams = {
          to_email: email,
          name: name,
          membershipNumber: membershipNumber,
          reactivationDate: new Date().toLocaleDateString(),
          subject: "Membership Reactivation"
        };

        const response = await emailjs.send(
          'service_vh484fl',
          'template_d4o59f2',
          templateParams,
          'tc6-vGIjp7zf67CWM'
        );

        if (response.status === 200) {
          toast({
            title: "Membership Reactivated",
            description: "Your membership has been successfully reactivated. A confirmation email has been sent.",
          });
          
          // Store reactivation info
          sessionStorage.setItem("membershipReactivated", "true");
          sessionStorage.setItem("membershipNumber", membershipNumber);
          
          // Redirect to student portal or another appropriate page
          navigate("/completion");
        } else {
          throw new Error("Failed to send reactivation email");
        }
      } catch (error) {
        console.error("Reactivation error:", error);
        toast({
          title: "Reactivation Error",
          description: "There was a problem reactivating your membership. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // User selected "no" - proceed with new registration
      // Clear any existing membership data to prevent conflicts
      sessionStorage.removeItem("membershipNumber");
      sessionStorage.removeItem("membershipReactivated");
      
      // Navigate to the PAR-Q form to start fresh registration
      navigate("/par-form");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Alert className="mb-6 border-accent-red">
        <AlertCircle className="h-4 w-4 text-accent-red" />
        <AlertTitle>Existing Membership Found</AlertTitle>
        <AlertDescription>
          We found an existing membership (#{membershipNumber}) associated with your information. 
          Would you like to reactivate this membership instead of creating a new one?
        </AlertDescription>
      </Alert>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="reactivate" className="text-sm font-medium">
            Reactivate Membership
          </label>
          <Select value={reactivate} onValueChange={setReactivate}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes, reactivate my membership</SelectItem>
              <SelectItem value="no">No, create a new registration</SelectItem>
            </SelectContent>
          </Select>
        </div>
      
        <div className="text-center space-y-4">
          <Button 
            onClick={handleReactivation}
            className="bg-accent-red hover:bg-accent-red/90 text-white w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Continue"}
          </Button>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">Need help? Use the WhatsApp button in the bottom right.</p>
          </div>

          <FloatingWhatsAppButton 
            phoneNumber="27731742969" 
            message="Hello, I need assistance with reactivating my ZenForce TaijiQuan membership." 
            isExistingUser={true} 
          />
        </div>
      </div>
    </div>
  );
};

export default MembershipReactivationAlert;
