
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onBack: () => void;
  isProcessing: boolean;
}

export const FormActions = ({ 
  onBack, 
  isProcessing 
}: FormActionsProps) => {
  return (
    <div className="flex justify-between pt-4">
      <Button type="button" variant="outline" onClick={onBack}>
        Back to PAR-Q Form
      </Button>
      
      <Button 
        type="submit" 
        className="bg-accent-red hover:bg-accent-red/90 text-white"
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : "Continue"}
      </Button>
    </div>
  );
};
