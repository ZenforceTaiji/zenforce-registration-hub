
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"
import PaymentHistoryTable from "./financial/PaymentHistoryTable"
import PaymentSummaryCards from "./financial/PaymentSummaryCards"
import PaymentInfoAlert from "./financial/PaymentInfoAlert"
import GradingFeeCard from "./financial/GradingFeeCard"
import OutstandingPaymentsTable from "./financial/OutstandingPaymentsTable"
import { samplePayments } from "./financial/paymentData"
import { usePaymentActions } from "./financial/usePaymentActions"
import { PaymentRecord } from "./types"

const FinancialInfo = () => {
  const { isProcessing, handlePayment, handleGradingPayment } = usePaymentActions()

  // Map PaymentRecord to OutstandingPayment format
  const outstandingPayments = samplePayments
    .filter(p => p.status === "Pending" || p.status === "Failed")
    .map(payment => ({
      id: payment.id,
      memberNumber: payment.id, // Using ID as member number for sample data
      amount: payment.amount,
      dueDate: payment.date,
      description: payment.description,
    }));

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
        <h3 className="text-lg font-medium mb-4">Outstanding Payments</h3>
        <OutstandingPaymentsTable 
          payments={outstandingPayments}
          isAdminView={false}
        />
      </div>

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
  )
}

export default FinancialInfo
