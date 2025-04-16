
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const PhysicalReadiness = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [acceptTerms, setAcceptTerms] = useState<boolean | "indeterminate">(false);
  const [rejectTerms, setRejectTerms] = useState<boolean | "indeterminate">(false);

  const handleAcceptChange = (checked: boolean | "indeterminate") => {
    setAcceptTerms(checked);
    if (checked === true) {
      setRejectTerms(false);
    }
  };

  const handleRejectChange = (checked: boolean | "indeterminate") => {
    setRejectTerms(checked);
    if (checked === true) {
      setAcceptTerms(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptTerms && !rejectTerms) {
      toast({
        title: "Selection Required",
        description: "Please either accept or reject the Physical Activity Readiness terms",
        variant: "destructive",
      });
      return;
    }

    // Save choice to session storage
    sessionStorage.setItem("parqAccepted", String(acceptTerms));
    
    if (rejectTerms) {
      // Navigate to rejection page
      navigate("/par-rejection");
    } else {
      // Navigate to upload ID page
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
                    By accepting these terms, you acknowledge that:
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
                    onCheckedChange={handleAcceptChange} 
                  />
                  <Label 
                    htmlFor="accept-terms"
                    className="text-base font-semibold text-green-700"
                  >
                    I Accept the Physical Activity Readiness Terms
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="reject-terms" 
                    checked={rejectTerms === true}
                    onCheckedChange={handleRejectChange}
                  />
                  <Label 
                    htmlFor="reject-terms"
                    className="text-base font-semibold text-red-700"
                  >
                    I Reject the Physical Activity Readiness Terms
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => navigate("/")}>
              Back
            </Button>
            <Button type="submit" className="bg-accent-red hover:bg-accent-red/90 text-white">
              Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PhysicalReadiness;
