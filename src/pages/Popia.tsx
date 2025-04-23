
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const Popia = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const userAge = sessionStorage.getItem("userAge");
  const studentDetails = sessionStorage.getItem("studentDetails");
  const indemnityAccepted = sessionStorage.getItem("indemnityAccepted");
  
  const [acceptPopia, setAcceptPopia] = useState<boolean | "indeterminate">(false);
  const [rejectPopia, setRejectPopia] = useState<boolean | "indeterminate">(false);

  // Check if required session data exists
  useEffect(() => {
    if (!userAge || !studentDetails || indemnityAccepted !== "true") {
      navigate("/");
    }
  }, [userAge, studentDetails, indemnityAccepted, navigate]);

  const handleAcceptChange = (checked: boolean | "indeterminate") => {
    setAcceptPopia(checked);
    if (checked === true) {
      setRejectPopia(false);
    }
  };

  const handleRejectChange = (checked: boolean | "indeterminate") => {
    setRejectPopia(checked);
    if (checked === true) {
      setAcceptPopia(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptPopia && !rejectPopia) {
      toast({
        title: "Selection Required",
        description: "Please either accept or reject the POPIA consent",
        variant: "destructive",
      });
      return;
    }

    // Save POPIA choice to session storage
    sessionStorage.setItem("popiaAccepted", String(acceptPopia));
    
    // Navigate to summary page 
    navigate("/summary");
  };

  // Get student name for displaying in the notice
  const studentName = studentDetails ? JSON.parse(studentDetails).firstName + " " + JSON.parse(studentDetails).lastName : "Student";

  return (
    <div className="zen-container py-12 animate-fade-in">
      <h1 className="page-title mb-8">POPIA Consent</h1>
      <div className="zen-card max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-xl font-semibold">Protection of Personal Information Act (POPIA) Consent</h2>
            
            <p>ZenForce TaijiQuan SA is committed to protecting your personal information in accordance with the Protection of Personal Information Act (POPIA).</p>
            
            <h3 className="text-lg font-medium mt-6">Collection and Use of Personal Information</h3>
            
            <p>We collect and process your personal information for the following purposes:</p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li>To maintain accurate student records</li>
              <li>To facilitate communication regarding classes, events, and important announcements</li>
              <li>To track student progress and grading</li>
              <li>To document training sessions and events through photographs and videos</li>
              <li>To comply with legal and regulatory requirements</li>
            </ul>
            
            <h3 className="text-lg font-medium mt-6">Photography and Video Consent</h3>
            
            <p>By accepting this POPIA consent, you authorize ZenForce TaijiQuan SA to:</p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li>Take photographs and videos during training sessions, demonstrations, and events</li>
              <li>Use these photographs and videos for educational purposes, promotional materials, and social media</li>
              <li>Display images within the training facility</li>
            </ul>
            
            <p className="mt-4">If you choose to reject this consent, no images or videos will be taken of you, and progress tracking will be based solely on physical observation during training.</p>
            
            <h3 className="text-lg font-medium mt-6">Your Rights</h3>
            
            <p>Under POPIA, you have the right to:</p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Withdraw your consent at any time</li>
            </ul>
            
            <p className="text-sm italic mt-4">For more information about our privacy practices, please contact Shifu Zaydien.</p>
          </div>
          
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="accept-popia" 
                checked={acceptPopia === true}
                onCheckedChange={handleAcceptChange} 
              />
              <Label 
                htmlFor="accept-popia"
                className="text-base font-semibold text-green-700"
              >
                I Accept the POPIA Consent
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="reject-popia" 
                checked={rejectPopia === true}
                onCheckedChange={handleRejectChange}
              />
              <Label 
                htmlFor="reject-popia"
                className="text-base text-red-700 font-semibold"
              >
                I Reject the POPIA Consent
              </Label>
            </div>
            
            {rejectPopia && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-2">
                <p className="text-sm text-red-700">
                  <strong>Note:</strong> No images or videos will be taken of {studentName}. Progress tracking will be based solely on physical observation during training. If incorrect or no grading is done, Shifu Zaydien cannot be held liable for this.
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/indemnity")}
              style={{
                padding: "0.75rem 1.5rem",
                minWidth: "160px",
              }}
            >
              Back to Indemnity
            </Button>
            <Button 
              type="submit" 
              className="bg-red-600 hover:bg-red-700 text-white font-medium"
              style={{
                padding: "0.75rem 1.5rem",
                minWidth: "200px",
                position: "relative",
                zIndex: 50,
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
              }}
            >
              Continue to Summary
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popia;

