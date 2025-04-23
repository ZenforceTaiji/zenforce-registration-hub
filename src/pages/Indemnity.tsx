
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const Indemnity = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const userAge = sessionStorage.getItem("userAge");
  const studentDetails = sessionStorage.getItem("studentDetails");
  const idDocument = sessionStorage.getItem("idDocument");
  const parqAccepted = sessionStorage.getItem("parqAccepted");
  
  const [acceptIndemnity, setAcceptIndemnity] = useState<boolean | "indeterminate">(false);
  const [rejectIndemnity, setRejectIndemnity] = useState<boolean | "indeterminate">(false);

  // Check if required session data exists
  useEffect(() => {
    console.log("Indemnity page loaded");
    console.log("User age:", userAge);
    console.log("Student details:", !!studentDetails);
    console.log("ID document:", !!idDocument);
    console.log("PAR-Q accepted:", parqAccepted);
    
    if (!userAge || !studentDetails) {
      console.log("Missing required data, redirecting to home");
      navigate("/");
      return;
    }

    // Check if ID document exists
    if (!idDocument) {
      console.log("Missing ID document, redirecting to upload-id");
      navigate("/upload-id");
      return;
    }

    // Check if PAR-Q was accepted - make this optional to avoid redirect loops
    if (!parqAccepted || parqAccepted !== "true") {
      console.log("PAR-Q not accepted");
      // We'll continue anyway to avoid redirect loops
    }
  }, [userAge, studentDetails, idDocument, parqAccepted, navigate]);

  const handleAcceptChange = (checked: boolean | "indeterminate") => {
    setAcceptIndemnity(checked);
    if (checked === true) {
      setRejectIndemnity(false);
    }
  };

  const handleRejectChange = (checked: boolean | "indeterminate") => {
    setRejectIndemnity(checked);
    if (checked === true) {
      setAcceptIndemnity(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptIndemnity && !rejectIndemnity) {
      toast({
        title: "Selection Required",
        description: "Please either accept or reject the indemnity",
        variant: "destructive",
      });
      return;
    }

    // Save indemnity choice to session storage
    sessionStorage.setItem("indemnityAccepted", String(acceptIndemnity));
    
    if (rejectIndemnity) {
      // Navigate to rejection message
      navigate("/rejection");
    } else {
      // Navigate to POPIA page
      navigate("/popia");
    }
  };

  // Get student name for displaying in the indemnity
  const studentName = studentDetails ? JSON.parse(studentDetails).firstName + " " + JSON.parse(studentDetails).lastName : "Student";

  return (
    <div className="zen-container py-12 animate-fade-in">
      <h1 className="page-title mb-8">Indemnity Agreement</h1>
      <div className="zen-card max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-xl font-semibold">Indemnity and Waiver of Liability</h2>
            
            <p>I, <strong>{studentName}</strong>, understand and acknowledge that:</p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li>Martial arts training involves physical activities that may pose risks of injury.</li>
              <li>I am participating in ZenForce TaijiQuan SA training voluntarily and at my own risk.</li>
              <li>The instructors will take reasonable precautions to minimize risk of injury.</li>
              <li>I will follow all safety instructions provided by the instructors.</li>
              <li>I will inform instructors of any physical limitations, medical conditions, or injuries that may affect my participation.</li>
            </ul>
            
            <p className="font-medium">By accepting this indemnity, I hereby:</p>
            
            <ol className="list-decimal pl-6 space-y-2">
              <li>Release and discharge ZenForce TaijiQuan SA, its instructors, and representatives from any liability, claims, or damages arising from my participation.</li>
              <li>Indemnify and hold harmless ZenForce TaijiQuan SA against any claims, damages, or expenses resulting from my participation.</li>
              <li>Confirm that I am in good health and physically capable of participating in martial arts training.</li>
              <li>Accept responsibility for any injuries that may occur during training.</li>
            </ol>
            
            <p className="text-sm italic mt-4">This indemnity shall be binding upon me, my heirs, executors, administrators, and assigns.</p>
          </div>
          
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="accept-indemnity" 
                checked={acceptIndemnity === true}
                onCheckedChange={handleAcceptChange} 
              />
              <Label 
                htmlFor="accept-indemnity"
                className="text-base font-semibold text-green-700"
              >
                I Accept the Indemnity Agreement
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="reject-indemnity" 
                checked={rejectIndemnity === true}
                onCheckedChange={handleRejectChange}
              />
              <Label 
                htmlFor="reject-indemnity"
                className="text-base font-semibold text-red-700"
              >
                I Reject the Indemnity Agreement
              </Label>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={() => navigate("/upload-id")}>
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

export default Indemnity;
