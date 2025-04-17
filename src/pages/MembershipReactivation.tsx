
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

const MembershipReactivation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [membershipNumber, setMembershipNumber] = useState<string>("");
  const [reactivateChoice, setReactivateChoice] = useState<string>("");
  const [updateDetails, setUpdateDetails] = useState<boolean | "indeterminate">(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<"reactivation" | "update" | "completed">("reactivation");
  
  const [userDetails, setUserDetails] = useState<UserDetails>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    // Get the membership number from session storage
    const storedMembershipNumber = sessionStorage.getItem("existingMembership");
    
    if (!storedMembershipNumber) {
      // If no membership number was found, redirect to the PAR-Q form
      toast({
        title: "No Membership Found",
        description: "We couldn't find your membership information. Please start the registration process.",
        variant: "destructive",
      });
      navigate("/par-form");
      return;
    }
    
    setMembershipNumber(storedMembershipNumber);
    
    // In a real application, fetch the user details from the database
    // For this implementation, we'll use mock data
    setUserDetails({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      address: "123 Main St, Anytown, South Africa"
    });
  }, [navigate, toast]);

  const handleReactivationChoice = () => {
    if (!reactivateChoice) {
      toast({
        title: "Selection Required",
        description: "Please select whether you want to reactivate your membership",
        variant: "destructive",
      });
      return;
    }

    if (reactivateChoice === "yes") {
      // User wants to reactivate
      setStep("update");
    } else {
      // User doesn't want to reactivate, redirect to new registration
      // Clear existing membership data
      sessionStorage.removeItem("existingMembership");
      localStorage.removeItem("existingMembershipFound");
      
      toast({
        title: "New Registration",
        description: "You will now continue with a new registration process.",
      });
      navigate("/upload-id");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Simulate API call to update user details
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a temporary password
      const tempPassword = Math.random().toString(36).slice(2, 10);
      
      // In a real app, this would send an email with the temp password
      console.log("Temporary password generated:", tempPassword);
      
      // Store the updated details and reactivation info
      sessionStorage.setItem("membershipReactivated", "true");
      sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
      
      toast({
        title: "Membership Reactivated Successfully",
        description: `Your membership #${membershipNumber} has been reactivated. A temporary password has been sent to your email.`,
      });
      
      // Navigate to completion page
      setStep("completed");
      setTimeout(() => navigate("/completion"), 2000);
    } catch (error) {
      toast({
        title: "Reactivation Failed",
        description: "There was a problem reactivating your membership. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="zen-container py-12 animate-fade-in">
      <h1 className="page-title mb-8">Membership Reactivation</h1>
      
      <div className="zen-card max-w-2xl mx-auto">
        {step === "reactivation" && (
          <Card>
            <CardHeader>
              <CardTitle>Existing Membership Found</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Membership Information</AlertTitle>
                <AlertDescription>
                  We found your existing membership (#{membershipNumber}). Would you like to reactivate it?
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4">
                <Label htmlFor="reactivate-choice">Reactivate Membership</Label>
                <Select value={reactivateChoice} onValueChange={setReactivateChoice}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes, reactivate my membership</SelectItem>
                    <SelectItem value="no">No, create a new registration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => navigate("/")}>
                  Back to Home
                </Button>
                <Button 
                  onClick={handleReactivationChoice}
                  className="bg-accent-red hover:bg-accent-red/90 text-white"
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {step === "update" && (
          <Card>
            <CardHeader>
              <CardTitle>Update Personal Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox 
                    id="update-details" 
                    checked={updateDetails === true}
                    onCheckedChange={setUpdateDetails} 
                  />
                  <Label htmlFor="update-details">
                    I want to update my personal details
                  </Label>
                </div>
                
                {updateDetails && (
                  <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          name="firstName" 
                          value={userDetails.firstName} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          name="lastName" 
                          value={userDetails.lastName} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={userDetails.email} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={userDetails.phone} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address" 
                          name="address" 
                          value={userDetails.address} 
                          onChange={handleInputChange} 
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <Alert className="bg-blue-50 border-blue-200">
                <AlertTitle>Important Information</AlertTitle>
                <AlertDescription>
                  By reactivating your membership, a temporary password will be generated and sent to your email address.
                  You will need to change this password upon your first login.
                </AlertDescription>
              </Alert>
              
              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep("reactivation")}>
                  Back
                </Button>
                <Button 
                  onClick={handleUpdateSubmit}
                  className="bg-accent-red hover:bg-accent-red/90 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Reactivate Membership"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {step === "completed" && (
          <Card>
            <CardHeader>
              <CardTitle>Reactivation Complete</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="bg-green-50 border-green-200">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  Your membership has been successfully reactivated. A temporary password has been sent to your email address.
                </AlertDescription>
              </Alert>
              
              <p className="text-center">
                Redirecting to the completion page...
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MembershipReactivation;
