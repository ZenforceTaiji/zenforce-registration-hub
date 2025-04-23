
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onBack: () => void;
  onContinueWithoutInvoice: () => void;
  showInvoiceError: boolean;
  isProcessing: boolean;
}

export const FormActions = ({ 
  onBack, 
  onContinueWithoutInvoice, 
  showInvoiceError, 
  isProcessing 
}: FormActionsProps) => {
  return (
    <div className="flex justify-between pt-4">
      <Button type="button" variant="outline" onClick={onBack}>
        Back to PAR-Q Form
      </Button>
      
      <div className="space-x-3">
        {showInvoiceError && (
          <Button 
            type="button" 
            variant="outline"
            onClick={onContinueWithoutInvoice}
          >
            Continue Without Invoice
          </Button>
        )}
        
        <Button 
          type="submit" 
          className="bg-accent-red hover:bg-accent-red/90 text-white"
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Continue"}
        </Button>
      </div>
    </div>
  );
};
