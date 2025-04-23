
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrainingOption } from "@/components/registration/TrainingSelectionForm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Check } from "lucide-react";

const Summary = () => {
  const navigate = useNavigate();
  const [studentDetails, setStudentDetails] = useState<any>(null);

  useEffect(() => {
    const details = sessionStorage.getItem("studentDetails");
    
    if (!details) {
      navigate("/");
      return;
    }
    
    setStudentDetails(JSON.parse(details));
  }, [navigate]);

  const calculateTotalPrice = (selectedTraining?: TrainingOption[]) => {
    return selectedTraining?.reduce((total, option) => total + option.price, 0) || 0;
  };

  if (!studentDetails) {
    return <div className="zen-container py-12">Loading...</div>;
  }

  return (
    <div className="zen-container py-12">
      <h1 className="page-title mb-8">Registration Summary</h1>
      
      <div className="max-w-3xl mx-auto space-y-8">
        <Alert className="bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-700">
            Thank you for registering! ZenForce TaijiQuan will send an invoice to your email address ({studentDetails.email}). 
            Please note that payment should be made within 3 days of receiving the invoice.
          </AlertDescription>
        </Alert>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
            <div className="grid gap-2">
              <p><strong>Name:</strong> {studentDetails.firstName} {studentDetails.lastName}</p>
              {studentDetails.email && <p><strong>Email:</strong> {studentDetails.email}</p>}
              {studentDetails.mobile && <p><strong>Mobile:</strong> {studentDetails.mobile}</p>}
              {studentDetails.physicalAddress && (
                <p><strong>Address:</strong> {studentDetails.physicalAddress}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Selected Training</h2>
            <div className="space-y-4">
              {studentDetails.selectedTraining?.map((training: TrainingOption) => (
                <div key={training.id} className="flex justify-between items-center">
                  <span>{training.name}</span>
                  <span className="font-semibold">R{training.price / 100}/month</span>
                </div>
              ))}
              <div className="pt-4 border-t mt-4">
                <div className="flex justify-between items-center font-bold">
                  <span>Total Monthly Fee:</span>
                  <span>R{calculateTotalPrice(studentDetails.selectedTraining) / 100}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Terms & Conditions</h2>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <p>You have accepted the Terms & Conditions and School Disclaimer</p>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              By proceeding with registration, you agree to comply with all terms and conditions 
              of ZenForce TaijiQuan SA, including fee payments, attendance policies, and the rules outlined in the School Disclaimer.
            </p>
          </CardContent>
        </Card>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={() => navigate("/registration")}
            style={{
              padding: "0.75rem 1.5rem",
              minWidth: "160px",
            }}
          >
            Back to Registration
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white font-medium"
            style={{
              padding: "0.75rem 1.5rem",
              minWidth: "200px",
              position: "relative",
              zIndex: 50,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
            }}
            onClick={() => navigate("/completion")}
          >
            Complete Registration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
