
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import PaymentHistoryTable from "./financial/PaymentHistoryTable";
import PaymentSummaryCards from "./financial/PaymentSummaryCards";
import PaymentInfoAlert from "./financial/PaymentInfoAlert";
import GradingFeeCard from "./financial/GradingFeeCard";
import { samplePayments } from "./financial/paymentData";
import { usePaymentActions } from "./financial/usePaymentActions";

const FinancialInfo = () => {
  const { isProcessing, handlePayment, handleGradingPayment } = usePaymentActions();

  return (
    <div className="space-y-8">
      <PaymentSummaryCards 
        handlePayment={handlePayment} 
        isProcessing={isProcessing} 
      />

      <PaymentInfoAlert />
      
      <GradingFeeCard 
        handleGradingPayment={handleGradingPayment} 
        isProcessing={isProcessing} 
      />

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Payment History</h3>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <FileDown className="h-4 w-4" />
            Download Statement
          </Button>
        </div>
        
        <PaymentHistoryTable payments={samplePayments} />
      </div>
    </div>
  );
};

export default FinancialInfo;
