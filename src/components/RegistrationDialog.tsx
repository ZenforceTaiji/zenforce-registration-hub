
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

interface RegistrationDialogProps {
  onClose: () => void;
}

export function RegistrationDialog({ onClose }: RegistrationDialogProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ageGroup, setAgeGroup] = useState<string>("");

  const handleContinue = () => {
    if (!ageGroup) {
      toast({
        title: "Selection Required",
        description: "Please select an age group to continue",
        variant: "destructive",
      });
      return;
    }

    // Store age selection in session storage
    sessionStorage.setItem("userAge", ageGroup);
    onClose();
    
    // Always redirect to PAR-Q form first, regardless of age
    navigate("/par-form");
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Welcome to ZenForce TaijiQuan</DialogTitle>
        <DialogDescription>
          Please select your age group to begin the registration process
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <RadioGroup value={ageGroup} onValueChange={setAgeGroup}>
          <div className="flex items-center space-x-2 mb-3">
            <RadioGroupItem value="adult" id="adult" />
            <Label htmlFor="adult" className="font-medium">I am 18 years or older</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="child" id="child" />
            <Label htmlFor="child" className="font-medium">I am under 18 years old</Label>
          </div>
        </RadioGroup>
      </div>

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="mt-2 sm:mt-0"
        >
          Cancel
        </Button>
        <Button onClick={handleContinue} className="zen-button-primary">
          Continue
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
