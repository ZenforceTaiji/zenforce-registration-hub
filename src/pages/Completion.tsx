
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface ChildDetails {
  id: string;
  firstName: string;
  lastName: string;
  age: string;
}

const Completion = () => {
  const navigate = useNavigate();
  const [studentDetails, setStudentDetails] = useState<any>(null);
  const [membershipNumber, setMembershipNumber] = useState<string>("");
  const [tempPassword, setTempPassword] = useState<string>("");
  const [additionalChildren, setAdditionalChildren] = useState<ChildDetails[]>([]);
  const [additionalMembershipNumbers, setAdditionalMembershipNumbers] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load student details
    const studentData = sessionStorage.getItem("studentDetails");
    if (studentData) {
      setStudentDetails(JSON.parse(studentData));
    } else {
      navigate("/");
      return;
    }

    // Load membership number
    const memberNum = sessionStorage.getItem("membershipNumber");
    if (memberNum) {
      setMembershipNumber(memberNum);
    }

    // Load temporary password
    const tempPass = sessionStorage.getItem("tempPassword");
    if (tempPass) {
      setTempPassword(tempPass);
    }

    // Load additional children
    const childrenData = sessionStorage.getItem("multipleChildren");
    if (childrenData) {
      setAdditionalChildren(JSON.parse(childrenData));
    }

    // Load additional membership numbers
    const additionalMemberNums = sessionStorage.getItem("additionalMembershipNumbers");
    if (additionalMemberNums) {
      setAdditionalMembershipNumbers(JSON.parse(additionalMemberNums));
    }
  }, [navigate]);

  if (!studentDetails) {
    return <div className="zen-container py-12">Loading...</div>;
  }

  const emailAddress = studentDetails.email || 
                      (sessionStorage.getItem("parentDetails") ? 
                       JSON.parse(sessionStorage.getItem("parentDetails") || "{}").parentEmail : 
                       null);

  return (
    <div className="zen-container py-12 animate-fade-in">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-20 w-20 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Registration Complete!</h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Thank you, {studentDetails.firstName} {studentDetails.lastName}, for registering with ZenForce TaijiQuan SA.
          {emailAddress ? " A confirmation email has been sent to your email address." : ""}
        </p>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Your Account Information</h2>
            
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-gray-500">Membership Number</p>
                <p className="font-medium text-lg">{membershipNumber}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Username</p>
                <p className="font-medium">{membershipNumber}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Temporary Password</p>
                <p className="font-medium">{tempPassword}</p>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t text-left">
              <p className="text-sm text-gray-500 italic">
                Please change your password when you first log in. This information has also been sent to
                {emailAddress ? ` ${emailAddress}` : " the admin for safekeeping"}.
              </p>
            </div>

            {emailAddress && (
              <div className="mt-4 pt-4 border-t text-left">
                <p className="text-sm text-emerald-600">
                  <strong>Email sent:</strong> A confirmation email with your registration details and login information has been sent to {emailAddress}.
                </p>
              </div>
            )}

            <div className="mt-4 text-left">
              <p className="text-sm text-slate-600">
                <strong>Note:</strong> A notification has also been sent to your instructor confirming your registration.
              </p>
            </div>
            
            {additionalChildren.length > 0 && (
              <div className="mt-6 pt-4 border-t">
                <h3 className="text-lg font-medium mb-4 text-left">Additional Children</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {additionalChildren.map((child) => (
                    <div key={child.id} className="p-4 border rounded-md text-left">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{child.firstName} {child.lastName}</p>
                          <p className="text-sm text-gray-500">Age: {child.age} years</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Membership</p>
                          <p className="font-medium">{additionalMembershipNumbers[child.id] || "TBD"}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            variant="outline" 
            onClick={() => navigate("/summary")}
          >
            View Registration Summary
          </Button>
          
          <Button
            className="bg-accent-red hover:bg-accent-red/90 text-white"
            onClick={() => navigate("/")}
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Completion;
