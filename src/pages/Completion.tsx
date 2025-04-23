
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
    // Load student details
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
              <Button
                className="bg-accent-red hover:bg-accent-red/90 text-white"
                onClick={() => navigate("/")}
              >
                Return to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Completion;

