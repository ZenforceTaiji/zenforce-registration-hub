
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const ParentDetails = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const userAge = sessionStorage.getItem("userAge");
  const studentDetails = sessionStorage.getItem("studentDetails");
  
  const [formData, setFormData] = useState({
    parentName: "",
    parentSurname: "",
    parentIdentityNumber: "",
    parentMobile: "",
    parentTelephone: "",
    parentEmail: "",
    parentPhysicalAddress: "",
  });

  // Check if required session data exists
  useEffect(() => {
    if (!userAge || !studentDetails) {
      navigate("/");
    }
  }, [userAge, studentDetails, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.parentName || !formData.parentSurname || !formData.parentMobile) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Save form data to session storage
    sessionStorage.setItem("parentDetails", JSON.stringify(formData));
    
    // Navigate to Previous Training page
    navigate("/previous-training");
  };

  return (
    <div className="zen-container py-12 animate-fade-in">
      <h1 className="page-title mb-8">Parent/Guardian Details</h1>
      <div className="zen-card max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="parentName">Name *</Label>
              <Input
                id="parentName"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                placeholder="Enter parent/guardian's name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="parentSurname">Surname *</Label>
              <Input
                id="parentSurname"
                name="parentSurname"
                value={formData.parentSurname}
                onChange={handleChange}
                placeholder="Enter parent/guardian's surname"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="parentIdentityNumber">Identity Number</Label>
              <Input
                id="parentIdentityNumber"
                name="parentIdentityNumber"
                value={formData.parentIdentityNumber}
                onChange={handleChange}
                placeholder="Enter ID number"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="parentMobile">Mobile *</Label>
              <Input
                id="parentMobile"
                name="parentMobile"
                value={formData.parentMobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="parentTelephone">Telephone</Label>
              <Input
                id="parentTelephone"
                name="parentTelephone"
                value={formData.parentTelephone}
                onChange={handleChange}
                placeholder="Enter telephone number"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="parentEmail">Email</Label>
              <Input
                id="parentEmail"
                name="parentEmail"
                type="email"
                value={formData.parentEmail}
                onChange={handleChange}
                placeholder="Enter email address"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="parentPhysicalAddress">Physical Address</Label>
              <Input
                id="parentPhysicalAddress"
                name="parentPhysicalAddress"
                value={formData.parentPhysicalAddress}
                onChange={handleChange}
                placeholder="Enter physical address"
              />
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={() => navigate("/registration")}>
              Back to Student Details
            </Button>
            <Button type="submit" className="bg-accent-red hover:bg-accent-red/90 text-white">
              Continue to Previous Training
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ParentDetails;
