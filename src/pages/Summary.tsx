
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrainingOption } from "@/components/registration/TrainingSelectionForm";

const Summary = () => {
  const navigate = useNavigate();
  const [studentDetails, setStudentDetails] = useState<any>(null);
  const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null);

  useEffect(() => {
    const details = sessionStorage.getItem("studentDetails");
    const invoice = sessionStorage.getItem("invoiceUrl");
    
    if (!details) {
      navigate("/");
      return;
    }
    
    setStudentDetails(JSON.parse(details));
    setInvoiceUrl(invoice);
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

        {invoiceUrl && (
          <div className="text-center">
            <Button
              className="bg-accent-red hover:bg-accent-red/90 text-white"
              onClick={() => window.open(invoiceUrl, "_blank")}
            >
              View Invoice
            </Button>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={() => navigate("/registration")}
          >
            Back to Registration
          </Button>
          <Button
            className="bg-accent-red hover:bg-accent-red/90 text-white"
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
