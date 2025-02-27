
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const RejectionMessage = () => {
  const navigate = useNavigate();
  const userAge = sessionStorage.getItem("userAge");
  const studentDetails = sessionStorage.getItem("studentDetails");

  // Check if required session data exists
  useEffect(() => {
    if (!userAge || !studentDetails) {
      navigate("/");
    }
  }, [userAge, studentDetails, navigate]);

  // Get student name for displaying in the message
  const studentName = studentDetails ? JSON.parse(studentDetails).firstName + " " + JSON.parse(studentDetails).lastName : "Student";

  return (
    <div className="zen-container py-12 animate-fade-in">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-red-700 mb-6">Registration Cannot Be Completed</h1>
          
          <p className="text-xl mb-6">
            Dear <span className="font-semibold">{studentName}</span>,
          </p>
          
          <p className="text-lg mb-8">
            You have <span className="font-bold underline">REJECTED</span> the Indemnity Agreement, therefore 
            registration cannot be completed. Please contact Shifu Zaydien for completion of registration.
          </p>
          
          <div className="border-t border-red-200 pt-6 mt-6">
            <p className="text-gray-600 mb-6">
              If you would like to reconsider, you can return to the indemnity page or contact us directly.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                onClick={() => navigate("/indemnity")} 
                variant="outline"
                className="bg-white border-red-300 text-red-700 hover:bg-red-50"
              >
                Return to Indemnity
              </Button>
              
              <Button 
                onClick={() => navigate("/")} 
                variant="outline"
              >
                Return to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectionMessage;
