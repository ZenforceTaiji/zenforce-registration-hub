
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-red-600">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        <p className="text-gray-500 mb-6">
          The page you are looking for ({location.pathname}) does not exist or has been moved.
        </p>
        <Button 
          className="bg-accent-red hover:bg-accent-red/90 text-white"
          onClick={() => navigate("/")}
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
