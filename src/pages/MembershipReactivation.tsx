
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MembershipReactivationAlert from "@/components/registration/MembershipReactivationAlert";

const MembershipReactivation = () => {
  const navigate = useNavigate();
  const [membershipNumber, setMembershipNumber] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  
  useEffect(() => {
    // Get the existing membership number
    const storedMembershipNumber = sessionStorage.getItem("existingMembership");
    
    if (!storedMembershipNumber) {
      // If no membership number was found, redirect to homepage
      navigate("/");
      return;
    }
    
    setMembershipNumber(storedMembershipNumber);
    
    // In a real application, you would fetch user details from a database
    // For this implementation, we'll use localStorage as an example
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      try {
        const userDetails = JSON.parse(storedUserDetails);
        setUserEmail(userDetails.email || "");
        setUserName(userDetails.name || "");
      } catch (error) {
        console.error("Error parsing user details:", error);
      }
    } else {
      // Fallback values if no stored details
      setUserEmail(localStorage.getItem("userEmail") || "user@example.com");
      setUserName(localStorage.getItem("userName") || "Valued Member");
    }
  }, [navigate]);

  return (
    <div className="zen-container py-12 animate-fade-in">
      <h1 className="page-title mb-8">Membership Reactivation</h1>
      
      <MembershipReactivationAlert 
        membershipNumber={membershipNumber}
        email={userEmail}
        name={userName}
      />
    </div>
  );
};

export default MembershipReactivation;
