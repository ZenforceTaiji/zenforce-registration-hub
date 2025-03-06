
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const PaymentInfoAlert = () => {
  return (
    <Alert>
      <AlertTitle>Payment Information</AlertTitle>
      <AlertDescription>
        <p>Monthly fees are due on the 1st of each month. Late payments may incur additional charges.</p>
        <p className="mt-2">Payment options:</p>
        <p>1. Pay online with credit/debit card via iKhokha</p>
        <p>2. Bank details for EFT payments:</p>
        <p>Bank: First National Bank</p>
        <p>Account: 12345678</p>
        <p>Branch: 250655</p>
        <p>Reference: Your membership number</p>
      </AlertDescription>
    </Alert>
  );
};

export default PaymentInfoAlert;
