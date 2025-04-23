
import { useState } from "react";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface TermsAndConditionsSectionProps {
  accepted: boolean;
  onAcceptChange: (accepted: boolean) => void;
}

export const TermsAndConditionsSection = ({ accepted, onAcceptChange }: TermsAndConditionsSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Terms & Conditions</h3>
      
      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-blue-700">
          Please read and accept the terms and conditions to proceed with registration.{' '}
          <Link 
            to="/terms-and-conditions" 
            target="_blank" 
            className="font-medium underline hover:text-blue-600"
          >
            View full Terms & Conditions
          </Link>
        </AlertDescription>
      </Alert>
      
      <div className="flex items-center space-x-2 py-2">
        <Checkbox 
          id="terms" 
          checked={accepted}
          onCheckedChange={(checked) => onAcceptChange(checked === true)}
        />
        <Label htmlFor="terms" className="text-sm font-medium">
          I have read, understood, and agree to the Terms & Conditions and School Disclaimer.
        </Label>
      </div>
    </div>
  );
};
