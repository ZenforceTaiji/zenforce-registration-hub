
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onBack: () => void;
  isProcessing: boolean;
}

export const FormActions = ({ onBack, isProcessing }: FormActionsProps) => {
  return (
    <div className="flex justify-between pt-4">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onBack}
        style={{
          padding: "0.75rem 1.5rem",
          minWidth: "160px",
        }}
      >
        Back to PAR-Q Form
      </Button>
      
      <Button 
        type="submit" 
        className="bg-red-600 hover:bg-red-700 text-white font-medium"
        disabled={isProcessing}
        style={{
          padding: "0.75rem 1.5rem",
          minWidth: "200px",
          position: "relative",
          zIndex: 50,
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        }}
      >
        {isProcessing ? "Processing..." : "Continue"}
      </Button>
    </div>
  );
};
