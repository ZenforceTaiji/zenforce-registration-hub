
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const PhysicalReadiness = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [acceptTerms, setAcceptTerms] = useState<boolean | "indeterminate">(false);
  const [existingMembership, setExistingMembership] = useState<string | null>(null);
  const [checkingMembership, setCheckingMembership] = useState(true);

  useEffect(() => {
    const checkForExistingMembership = () => {
      setCheckingMembership(true);
      
      setTimeout(() => {
        const membershipFound = localStorage.getItem("existingMembershipFound");
        
        if (membershipFound === "true") {
          const membershipNumber = sessionStorage.getItem("existingMembership") || `ZF${Math.floor(10000 + Math.random() * 90000)}`;
          setExistingMembership(membershipNumber);
          sessionStorage.setItem("existingMembership", membershipNumber);
        } else {
          setExistingMembership(null);
        }
        
        setCheckingMembership(false);
      }, 500);
    };
    
    checkForExistingMembership();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptTerms) {
      toast({
        title: "Acknowledgment Required",
        description: "Please acknowledge that you have read and understand the Physical Activity Readiness terms",
        variant: "destructive",
      });
      return;
    }

    sessionStorage.setItem("parqAccepted", "true");
    
    if (existingMembership) {
      navigate("/membership-reactivation");
    } else {
      navigate("/upload-id");
    }
  };

  return (
    <div className="zen-container py-12 animate-fade-in">
      <h1 className="page-title mb-8">Physical Activity Readiness</h1>
      <div className="zen-card max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Physical Activity Readiness Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64 rounded-md border p-4">
                <div className="prose prose-slate max-w-none">
                  <h3 className="text-lg font-medium">Physical Activity Readiness</h3>
                  
                  <p>
                    By acknowledging these terms, you confirm that:
                  </p>
                  
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>You have completed the Physical Activity Readiness Questionnaire (PAR-Q) truthfully and to the best of your knowledge.</li>
                    <li>You understand that physical activity, such as TaijiQuan, involves some risk of injury.</li>
                    <li>You will inform your instructor of any changes to your health that might affect your ability to participate safely.</li>
                    <li>If you answered "YES" to any PAR-Q questions, you have obtained medical clearance or will do so before participating in physical activities.</li>
                    <li>ZenForce TaijiQuan SA reserves the right to request a medical clearance letter at any time if concerns about your health arise.</li>
                  </ol>
                  
                  <p className="mt-4">
                    <strong>Important Note:</strong> If you experience any pain, discomfort, dizziness, or unusual symptoms during training, you should stop immediately and seek medical advice.
                  </p>
                </div>
              </ScrollArea>
              
              <div className="space-y-4 mt-6">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="accept-terms" 
                    checked={acceptTerms === true}
                    onCheckedChange={setAcceptTerms} 
                  />
                  <Label 
                    htmlFor="accept-terms"
                    className="text-base font-semibold text-green-700"
                  >
                    I have read and understand the Physical Activity Readiness Terms
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => navigate("/medical-condition")}>
              Back
            </Button>
            <Button 
              type="submit" 
              className="bg-accent-red hover:bg-accent-red/90 text-white"
              disabled={checkingMembership}
            >
              {checkingMembership ? "Checking..." : "Continue"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PhysicalReadiness;
