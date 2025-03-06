
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
import { ArrowUpRight } from "lucide-react";
import { PaymentRecord } from "../types";

interface PaymentHistoryTableProps {
  payments: PaymentRecord[];
}

const PaymentHistoryTable = ({ payments }: PaymentHistoryTableProps) => {
  return (
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
        {payments.map((payment) => (
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
  );
};

export default PaymentHistoryTable;
