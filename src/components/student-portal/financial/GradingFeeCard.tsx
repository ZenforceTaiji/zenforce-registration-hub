
import { Button } from "@/components/ui/button";
import IKhokhaButton from "@/components/ui/ikhokha-button";

interface GradingFeeCardProps {
  handleGradingPayment: () => Promise<void>;
  isProcessing: boolean;
}

const GradingFeeCard = ({ handleGradingPayment, isProcessing }: GradingFeeCardProps) => {
  return (
    <div className="bg-slate-50 p-4 rounded-lg border">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-lg font-medium">Upcoming Grading</h3>
          <p className="text-sm text-slate-500">24 Step Form G03 - May 15, 2024</p>
          <p className="font-medium mt-1">Grading Fee: R250.00</p>
        </div>
        <IKhokhaButton 
          merchantUrl="https://pay.ikhokha.com/zenforce-taijiquan-sa/buy/zenforce"
        />
      </div>
    </div>
  );
};

export default GradingFeeCard;
