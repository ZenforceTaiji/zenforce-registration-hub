
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface RegistrationDialogProps {
  onClose: () => void;
}

export function RegistrationDialog({ onClose }: RegistrationDialogProps) {
  const [age, setAge] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = () => {
    const numAge = parseInt(age);
    if (!age || isNaN(numAge) || numAge < 1) {
      toast({
        title: "Invalid Age",
        description: "Please enter a valid age to continue.",
        variant: "destructive",
      });
      return;
    }

    // Store age in session storage for the registration flow
    sessionStorage.setItem("userAge", age);
    onClose();
    navigate("/registration");
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Welcome to ZenForce TaijiQuan</DialogTitle>
        <DialogDescription>
          Please enter your age to begin the registration process.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="zen-input"
            placeholder="Enter your age"
            min="1"
          />
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleContinue} className="zen-button-primary">
          Continue
        </Button>
      </div>
    </DialogContent>
  );
}
