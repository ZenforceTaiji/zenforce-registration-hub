
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface AgeSelectionDialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  onContinue?: () => void;
}

const AgeSelectionDialog = ({ open, onOpenChange, onContinue }: AgeSelectionDialogProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedAge, setSelectedAge] = useState<string>("");

  const handleAgeSelection = () => {
    if (!selectedAge) {
      toast({
        title: "Age Required",
        description: "Please select your age group to continue",
        variant: "destructive",
      });
      return;
    }

    // Save age to session storage
    sessionStorage.setItem("userAge", selectedAge);
    
    // Notify parent component
    if (onOpenChange) {
      onOpenChange(false);
    }
    
    // Call the onContinue callback if provided
    if (onContinue) {
      onContinue();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Your Age Group</DialogTitle>
          <DialogDescription>
            Please select your age group to continue with registration
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="age-select">Age Group</Label>
            <Select value={selectedAge} onValueChange={setSelectedAge}>
              <SelectTrigger id="age-select">
                <SelectValue placeholder="Select your age group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="child">Under 18</SelectItem>
                <SelectItem value="adult">18 or older</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleAgeSelection}
            className="bg-accent-red hover:bg-accent-red/90 text-white"
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgeSelectionDialog;
