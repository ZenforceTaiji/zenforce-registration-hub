
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";

const AddChildren = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [askToAddChildren, setAskToAddChildren] = useState(true);
  const [mainChild, setMainChild] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Check if required session data exists
  useEffect(() => {
    console.log("AddChildren page loaded");
    const parentDetails = sessionStorage.getItem("parentDetails");
    const userAge = sessionStorage.getItem("userAge");
    const studentDetails = sessionStorage.getItem("studentDetails");
    
    if (!parentDetails || !userAge || !studentDetails) {
      console.log("Missing required data, redirecting to home");
      navigate("/");
      return;
    }
    
    // Load main child details
    if (studentDetails) {
      try {
        const student = JSON.parse(studentDetails);
        setMainChild({
          id: "main",
          firstName: student.firstName,
          lastName: student.lastName,
          age: userAge || "",
          identityNumber: student.identityNumber || "",
        });
      } catch (error) {
        console.error("Error parsing student details:", error);
      }
    }
    
    // Check if user was already asked about adding children
    const wasAsked = sessionStorage.getItem("askedAboutChildren");
    if (wasAsked === "true") {
      setAskToAddChildren(false);
    }
  }, [navigate]);

  const handleAddMoreChildren = () => {
    sessionStorage.setItem("askedAboutChildren", "true");
    setAskToAddChildren(false);
    setDialogOpen(false); // Close the dialog if it was open
  };

  const handleSkipAddingChildren = () => {
    sessionStorage.setItem("askedAboutChildren", "true");
    sessionStorage.setItem("multipleChildren", JSON.stringify([]));
    navigate("/previous-training");
  };

  const handleBack = () => {
    navigate("/parent-details");
  };

  const handleContinue = () => {
    const children = sessionStorage.getItem("multipleChildren") 
      ? JSON.parse(sessionStorage.getItem("multipleChildren") || "[]") 
      : [];
    
    if (children.length === 0) {
      sessionStorage.setItem("multipleChildren", JSON.stringify([]));
    }
    
    navigate("/previous-training");
  };

  // If we're in the initial state, show the question dialog
  if (askToAddChildren) {
    return (
      <AlertDialog open={true}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Would you like to add more children?</AlertDialogTitle>
            <AlertDialogDescription>
              You can register additional children under your account. Would you like to add more children now?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleSkipAddingChildren}>
              No, continue
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleAddMoreChildren}>
              Yes, add children
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <div className="zen-container py-12 animate-fade-in">
      <h1 className="page-title mb-8">Add Children</h1>
      
      <div className="max-w-2xl mx-auto mb-8">
        <div className="zen-card mb-8">
          <h2 className="text-xl font-semibold mb-4">Children</h2>
          
          {mainChild && (
            <div className="mb-6">
              <Card className="border-accent-red overflow-hidden">
                <div className="bg-accent-red text-white text-xs py-1 px-2 text-center">
                  Primary Student
                </div>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-2 gap-2 text-sm pt-2">
                    <div>
                      <p className="font-medium">{mainChild.firstName} {mainChild.lastName}</p>
                      <p className="text-slate-500">Age: {mainChild.age} years</p>
                    </div>
                    {mainChild.identityNumber && (
                      <div>
                        <p className="text-xs text-slate-500">ID Number</p>
                        <p>{mainChild.identityNumber}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          <p className="text-slate-600 mb-6">
            You can add additional children to your registration. Each child added will be registered under your account.
          </p>
          
          <Button 
            onClick={() => setDialogOpen(true)}
            className="w-full sm:w-auto flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Add Child
          </Button>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Child</DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              <p className="text-slate-600">
                To add a child, please fill out the detailed form with all required information.
              </p>
              <p className="text-slate-600 mt-2">
                This will be implemented in the full version of this feature.
              </p>
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="button" onClick={() => setDialogOpen(false)}>
                Add Child
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <div className="flex justify-between mt-8">
          <Button type="button" variant="outline" onClick={handleBack}>
            Back to Parent Details
          </Button>
          <Button 
            type="button" 
            onClick={handleContinue}
            className="bg-accent-red hover:bg-accent-red/90 text-white flex items-center gap-2"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddChildren;
