
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { FINANCIAL_RULES, calculateMonthlyFee } from "@/constants/financialRules";

const PaymentInfoAlert = () => {
  const monthlyFee = calculateMonthlyFee() / 100; // Convert cents to Rand

  return (
    <Alert className="bg-blue-50 border-blue-200">
      <Info className="h-4 w-4 text-blue-500" />
      <AlertDescription className="text-blue-700">
        <div className="space-y-2">
          <p>
            <strong>Monthly Fee:</strong> R{monthlyFee.toFixed(2)} 
            (R{FINANCIAL_RULES.SESSION_FEE / 100} per session, minimum {FINANCIAL_RULES.MINIMUM_SESSIONS_PER_WEEK} sessions per week)
          </p>
          <p>
            <strong>Late Cancellation Fee:</strong> R{FINANCIAL_RULES.LATE_CANCELLATION_FEE / 100} 
            (if cancelled less than 1 hour before class)
          </p>
          <p>
            <strong>Late Payment Penalty:</strong> R{FINANCIAL_RULES.LATE_PAYMENT_FEE_PER_DAY / 100} per day
          </p>
          <p>
            <strong>Important Notes:</strong>
          </p>
          <ul className="list-disc pl-5 text-sm">
            <li>All fees must be paid by the second day of training</li>
            <li>Accounts {FINANCIAL_RULES.DEBT_COLLECTION_DAYS} days overdue will be sent to collections with {FINANCIAL_RULES.DEBT_COLLECTION_INTEREST}% interest</li>
            <li>Membership cancellation requires {FINANCIAL_RULES.CANCELLATION_NOTICE_DAYS} days notice</li>
            <li>December training requires advance payment</li>
          </ul>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default PaymentInfoAlert;
