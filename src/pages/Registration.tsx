
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Registration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const userAge = sessionStorage.getItem("userAge");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    identityNumber: "",
    mobile: "",
    telephone: "",
    email: "",
    physicalAddress: "",
  });

  // Check if age exists
  useEffect(() => {
    if (!userAge) {
      navigate("/");
    }
  }, [userAge, navigate]);

  const isMinor = userAge ? parseInt(userAge) < 18 : false;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Save form data to session storage
    sessionStorage.setItem("studentDetails", JSON.stringify(formData));
    
    // For minors, proceed to parent details
    if (isMinor) {
      navigate("/parent-details");
    } else {
      // For adults, proceed to previous training
      navigate("/previous-training");
    }
  };

  return (
    <div className="zen-container py-12 animate-fade-in">
      <h1 className="page-title mb-8">Student Registration</h1>
      <div className="zen-card max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                required
              />
            </div>

            {!isMinor && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="identityNumber">Identity Number</Label>
                  <Input
                    id="identityNumber"
                    name="identityNumber"
                    value={formData.identityNumber}
                    onChange={handleChange}
                    placeholder="Enter your ID number"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telephone">Telephone</Label>
                  <Input
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    placeholder="Enter your telephone number"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="physicalAddress">Physical Address</Label>
                  <Input
                    id="physicalAddress"
                    name="physicalAddress"
                    value={formData.physicalAddress}
                    onChange={handleChange}
                    placeholder="Enter your physical address"
                  />
                </div>
              </>
            )}

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                value={userAge || ""}
                readOnly
                disabled
              />
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={() => navigate("/")}>
              Back to Home
            </Button>
            <Button type="submit" className="bg-accent-red hover:bg-accent-red/90 text-white">
              {isMinor ? "Proceed to Parent Details" : "Continue Registration"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
