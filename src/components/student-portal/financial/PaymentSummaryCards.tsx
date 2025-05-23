
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Receipt, ExternalLink } from "lucide-react";
import IKhokhaButton from "@/components/ui/ikhokha-button";

interface PaymentSummaryCardsProps {
  handlePayment: () => Promise<void>;
  isProcessing: boolean;
}

const PaymentSummaryCards = ({ handlePayment, isProcessing }: PaymentSummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Current Balance</p>
              <p className="text-3xl font-bold text-gray-900">R0.00</p>
            </div>
            <div className="rounded-full bg-emerald-100 p-2">
              <CreditCard className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
          <p className="text-xs text-emerald-600 mt-2">Fully paid ✓</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Next Payment</p>
              <p className="text-3xl font-bold text-gray-900">R350.00</p>
            </div>
            <div className="rounded-full bg-blue-100 p-2">
              <Receipt className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Due on May 1, 2024</p>
          <div className="flex justify-center mt-4">
            <IKhokhaButton 
              merchantUrl="https://pay.ikhokha.com/zenforce-taijiquan-sa/buy/zenforce"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSummaryCards;
