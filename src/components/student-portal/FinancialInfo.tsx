
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { FileDown, ArrowUpRight, CreditCard, Receipt } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Sample financial data
const samplePayments = [
  {
    id: "1",
    date: "April 1, 2024",
    description: "Monthly Membership Fee",
    amount: "R350.00",
    status: "Paid",
    receipt: "#REC-001234"
  },
  {
    id: "2",
    date: "March 1, 2024",
    description: "Monthly Membership Fee",
    amount: "R350.00",
    status: "Paid",
    receipt: "#REC-001128"
  },
  {
    id: "3",
    date: "February 1, 2024",
    description: "Monthly Membership Fee",
    amount: "R350.00",
    status: "Paid",
    receipt: "#REC-001042"
  },
  {
    id: "4",
    date: "January 15, 2024",
    description: "Grading Fee - 24 Step Form G02",
    amount: "R250.00",
    status: "Paid",
    receipt: "#REC-000987"
  },
  {
    id: "5",
    date: "January 1, 2024",
    description: "Monthly Membership Fee",
    amount: "R350.00",
    status: "Paid",
    receipt: "#REC-000923"
  }
];

const FinancialInfo = () => {
  return (
    <div className="space-y-8">
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
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="text-lg font-medium text-gray-900">EFT / Bank Transfer</p>
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

      <Alert>
        <AlertTitle>Payment Information</AlertTitle>
        <AlertDescription>
          <p>Monthly fees are due on the 1st of each month. Late payments may incur additional charges.</p>
          <p className="mt-2">Bank details for EFT payments:</p>
          <p>Bank: First National Bank</p>
          <p>Account: 12345678</p>
          <p>Branch: 250655</p>
          <p>Reference: Your membership number</p>
        </AlertDescription>
      </Alert>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Payment History</h3>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <FileDown className="h-4 w-4" />
            Download Statement
          </Button>
        </div>
        
        <Table>
          <TableCaption>A list of your recent payments</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Receipt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {samplePayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.description}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {payment.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    {payment.receipt}
                    <ArrowUpRight className="h-3 w-3" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FinancialInfo;
