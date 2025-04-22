
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CreditCard, 
  Receipt, 
  Wallet, 
  BadgeDollarSign, 
  ArrowUpRight, 
  ArrowDownRight 
} from "lucide-react";

interface FinancialOverviewProps {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  pendingPaymentsCount: number;
  pendingPaymentsTotal: number;
}

export const FinancialOverview = ({
  totalIncome,
  totalExpenses,
  netProfit,
  pendingPaymentsCount,
  pendingPaymentsTotal
}: FinancialOverviewProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Financial Overview</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R{totalIncome.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1 text-emerald-500" />
              <span className="text-emerald-500 font-medium">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R{totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowDownRight className="h-3 w-3 mr-1 text-rose-500" />
              <span className="text-rose-500 font-medium">+8.2%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <BadgeDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R{netProfit.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              {netProfit > 0 ? (
                <>
                  <ArrowUpRight className="h-3 w-3 mr-1 text-emerald-500" />
                  <span className="text-emerald-500 font-medium">+4.3%</span> from last month
                </>
              ) : (
                <>
                  <ArrowDownRight className="h-3 w-3 mr-1 text-rose-500" />
                  <span className="text-rose-500 font-medium">-4.3%</span> from last month
                </>
              )}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R{pendingPaymentsTotal.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {pendingPaymentsCount} pending/overdue payments
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Monthly Summary Chart will go here */}
      <Card className="p-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Monthly Income vs Expenses</CardTitle>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center">
          <p className="text-muted-foreground text-sm">
            Monthly financial performance chart will be displayed here
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
