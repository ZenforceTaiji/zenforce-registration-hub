
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FileDown, Printer, FileText } from "lucide-react";

interface Payment {
  id: number;
  studentName: string;
  amount: number;
  date: string;
  status: string;
  type: string;
}

interface Expense {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;
}

interface FinancialReportsProps {
  payments: Payment[];
  expenses: Expense[];
}

export const FinancialReports = ({ payments, expenses }: FinancialReportsProps) => {
  const [reportType, setReportType] = useState("profitLoss");
  const [dateRange, setDateRange] = useState("thisMonth");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [groupBy, setGroupBy] = useState("month");
  
  // Calculate summary data
  const totalRevenue = payments
    .filter(p => p.status === "Paid")
    .reduce((sum, payment) => sum + payment.amount, 0);
    
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const netProfit = totalRevenue - totalExpenses;
  
  // Handle report generation
  const handleGenerateReport = () => {
    console.log("Generating report with following parameters:");
    console.log("Report Type:", reportType);
    console.log("Date Range:", dateRange);
    console.log("Custom Dates:", startDate, endDate);
    console.log("Group By:", groupBy);
    
    // In a real implementation, this would generate and display or download the report
  };
  
  const renderReportOptions = () => {
    switch (reportType) {
      case "profitLoss":
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="thisMonth">This Month</SelectItem>
                  <SelectItem value="lastMonth">Last Month</SelectItem>
                  <SelectItem value="thisQuarter">This Quarter</SelectItem>
                  <SelectItem value="lastQuarter">Last Quarter</SelectItem>
                  <SelectItem value="thisYear">This Year</SelectItem>
                  <SelectItem value="lastYear">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {dateRange === "custom" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Start Date</Label>
                  <Input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">End Date</Label>
                  <Input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            )}
            
            <div>
              <Label className="text-sm font-medium">Group By</Label>
              <Select value={groupBy} onValueChange={setGroupBy}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select grouping" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Day</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="quarter">Quarter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
        
      case "studentPayments":
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Status</Label>
              <RadioGroup defaultValue="all" className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all">All Payments</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paid" id="paid" />
                  <Label htmlFor="paid">Paid Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pending" id="pending" />
                  <Label htmlFor="pending">Pending Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="overdue" id="overdue" />
                  <Label htmlFor="overdue">Overdue Only</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label className="text-sm font-medium">Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="thisMonth">This Month</SelectItem>
                  <SelectItem value="lastMonth">Last Month</SelectItem>
                  <SelectItem value="thisQuarter">This Quarter</SelectItem>
                  <SelectItem value="lastQuarter">Last Quarter</SelectItem>
                  <SelectItem value="thisYear">This Year</SelectItem>
                  <SelectItem value="lastYear">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {dateRange === "custom" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Start Date</Label>
                  <Input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">End Date</Label>
                  <Input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            )}
          </div>
        );
        
      case "expenses":
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Category</Label>
              <Select defaultValue="all">
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="facilities">Facilities</SelectItem>
                  <SelectItem value="salaries">Salaries</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="administrative">Administrative</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-sm font-medium">Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="thisMonth">This Month</SelectItem>
                  <SelectItem value="lastMonth">Last Month</SelectItem>
                  <SelectItem value="thisQuarter">This Quarter</SelectItem>
                  <SelectItem value="lastQuarter">Last Quarter</SelectItem>
                  <SelectItem value="thisYear">This Year</SelectItem>
                  <SelectItem value="lastYear">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {dateRange === "custom" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Start Date</Label>
                  <Input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">End Date</Label>
                  <Input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            )}
            
            <div>
              <Label className="text-sm font-medium">Group By</Label>
              <Select value={groupBy} onValueChange={setGroupBy}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select grouping" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="category">Category</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Generate Financial Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium">Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="profitLoss">Profit & Loss</SelectItem>
                    <SelectItem value="studentPayments">Student Payments</SelectItem>
                    <SelectItem value="expenses">Expenses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {renderReportOptions()}
              
              <div className="flex gap-2 pt-4">
                <Button onClick={handleGenerateReport}>
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                
                <Button variant="outline">
                  <FileDown className="h-4 w-4 mr-2" />
                  Download CSV
                </Button>
                
                <Button variant="outline">
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Financial Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">R{totalRevenue.toFixed(2)}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">R{totalExpenses.toFixed(2)}</p>
              </div>
              
              <div className="pt-2 border-t">
                <p className="text-sm text-gray-500">Net Profit</p>
                <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  R{netProfit.toFixed(2)}
                </p>
              </div>
              
              <div className="pt-4">
                <p className="text-sm text-gray-500">Current Period</p>
                <p className="font-medium">April 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
