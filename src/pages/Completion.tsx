
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Completion = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [studentDetails, setStudentDetails] = useState<any>(null);

  useEffect(() => {
    const studentData = sessionStorage.getItem("studentDetails");
    if (studentData) {
      setStudentDetails(JSON.parse(studentData));
    } else {
      navigate("/");
      return;
    }
  }, [navigate]);

  if (!studentDetails) {
    return <div className="zen-container py-12">Loading...</div>;
  }

  const handleContinue = () => {
    // Navigate to the student portal or another relevant page
    navigate("/student-portal");
  };

  const handleReturn = () => {
    navigate("/");
  };

  return (
    <div className="zen-container py-12 animate-fade-in">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-20 w-20 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Registration Complete!</h1>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <p className="text-lg text-gray-600 mb-6">
              Thank you, {studentDetails.firstName} {studentDetails.lastName}, for registering with ZenForce TaijiQuan SA.
            </p>
            
            <div className="text-center space-y-4">
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={handleReturn}
                  style={{
                    padding: "0.75rem 1.5rem",
                    minWidth: "160px",
                  }}
                >
                  Return to Home
                </Button>
                
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white font-medium"
                  onClick={handleContinue}
                  style={{
                    padding: "0.75rem 1.5rem",
                    minWidth: "200px",
                    position: "relative",
                    zIndex: 50,
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                  }}
                >
                  Continue to Student Portal
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Completion;
