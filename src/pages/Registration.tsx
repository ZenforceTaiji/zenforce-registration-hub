
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Registration = () => {
  const navigate = useNavigate();
  const userAge = sessionStorage.getItem("userAge");

  useEffect(() => {
    if (!userAge) {
      navigate("/");
    }
  }, [userAge, navigate]);

  return (
    <div className="zen-container py-12">
      <h1 className="page-title mb-8">Student Registration</h1>
      <div className="zen-card">
        <p className="text-lg text-gray-600">
          Registration form coming soon...
        </p>
        <Button
          onClick={() => navigate("/")}
          className="mt-4"
          variant="outline"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default Registration;
