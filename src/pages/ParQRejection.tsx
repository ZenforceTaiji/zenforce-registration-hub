
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";

const ParQRejection = () => {
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
          <h1 className="text-3xl font-bold text-red-700 mb-6">Registration Cannot Proceed</h1>
          
          <p className="text-xl mb-6">
            Dear <span className="font-semibold">{studentName}</span>,
          </p>
          
          <p className="text-lg mb-4">
            You have <span className="font-bold underline">REJECTED</span> the Physical Activity Readiness Terms and Conditions, 
            therefore your registration cannot be completed at this time.
          </p>
          
          <p className="text-lg mb-8">
            If you would like to discuss this further or have any questions about the terms, 
            please contact Shifu Zaydien Williams directly using the information below.
          </p>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200 mb-8">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-center gap-2">
                <Phone className="h-5 w-5 text-green-600" />
                <a href="tel:0731742969" className="text-lg hover:underline">073 174 2969</a>
              </div>
              
              <div className="flex items-center justify-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" />
                <a href="mailto:zenforce786@gmail.com" className="text-lg hover:underline">zenforce786@gmail.com</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-red-200 pt-6 mt-6">
            <p className="text-gray-600 mb-6">
              If you would like to reconsider, you can return to the Physical Activity Readiness page.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                onClick={() => navigate("/physical-readiness")} 
                variant="outline"
                className="bg-white border-red-300 text-red-700 hover:bg-red-50"
              >
                Return to Terms & Conditions
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

export default ParQRejection;
