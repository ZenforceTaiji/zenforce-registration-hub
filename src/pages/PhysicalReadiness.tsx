
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PhysicalReadiness = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("PhysicalReadiness component mounted");
    // Redirect to upload-id page
    navigate("/upload-id");
  }, [navigate]);

  return (
    <div className="zen-container py-12 animate-fade-in">
      <h1 className="page-title mb-8">Physical Readiness</h1>
      <p className="text-center">Redirecting to upload ID document page...</p>
    </div>
  );
};

export default PhysicalReadiness;
