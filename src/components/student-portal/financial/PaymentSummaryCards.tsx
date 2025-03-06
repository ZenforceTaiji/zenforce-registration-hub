
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Receipt, ExternalLink } from "lucide-react";

interface PaymentSummaryCardsProps {
  handlePayment: () => Promise<void>;
  isProcessing: boolean;
}

const PaymentSummaryCards = ({ handlePayment, isProcessing }: PaymentSummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          <Button 
            onClick={handlePayment} 
            disabled={isProcessing}
            className="w-full mt-4 flex items-center gap-2"
          >
            {isProcessing ? "Processing..." : "Pay Now"}
            {!isProcessing && <ExternalLink className="h-4 w-4" />}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="text-lg font-medium text-gray-900">iKhokha / Card Payment</p>
            </div>
            <div className="rounded-full bg-purple-100 p-2">
              <CreditCard className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <Button size="sm" className="w-full">Update Payment Method</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSummaryCards;
