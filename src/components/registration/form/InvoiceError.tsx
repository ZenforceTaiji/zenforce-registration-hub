
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const InvoiceError = () => {
  return (
    <Alert className="bg-yellow-50 border-yellow-200">
      <AlertCircle className="h-4 w-4 text-yellow-600" />
      <AlertDescription className="text-yellow-700">
        There was a problem connecting to the payment system. You can continue with registration and handle payment later.
      </AlertDescription>
    </Alert>
  );
};
