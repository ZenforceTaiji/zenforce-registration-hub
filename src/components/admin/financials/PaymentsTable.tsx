import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Receipt, 
  Check, 
  Search,
  CreditCard,
  Send
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PaymentMethodsDialog from "@/components/student-portal/financial/dialogs/PaymentMethodsDialog";

interface Payment {
  id: number;
  studentName: string;
  amount: number;
  date: string;
  status: string;
  type: string;
}

interface PaymentsTableProps {
  payments: Payment[];
  onMarkAsPaid: (paymentId: number) => void;
  onGenerateInvoice: (studentId: number, amount: number) => void;
}

export const PaymentsTable = ({ 
  payments, 
  onMarkAsPaid, 
  onGenerateInvoice 
}: PaymentsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Filter payments based on search term and status filter
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? payment.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Paid":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{status}</Badge>;
      case "Overdue":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const toggleStatusFilter = (status: string) => {
    if (statusFilter === status) {
      setStatusFilter(null);
    } else {
      setStatusFilter(status);
    }
  };

  const handleSendReminder = (payment: any) => {
    setSelectedPayment({
      memberNumber: payment.studentName,
      amount: `R${payment.amount.toFixed(2)}`,
      dueDate: payment.date,
      description: payment.type,
      // In a real app, these would come from the student data
      studentPhone: "27123456789",
      studentEmail: "student@example.com"
    });
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex items-center gap-2 relative w-full max-w-sm">
          <Search className="h-4 w-4 absolute left-2.5 text-gray-500" />
          <Input
            placeholder="Search student name or payment type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Filter:</span>
          <Button 
            variant={statusFilter === "Pending" ? "default" : "outline"} 
            size="sm" 
            onClick={() => toggleStatusFilter("Pending")}
          >
            Pending
          </Button>
          <Button 
            variant={statusFilter === "Overdue" ? "default" : "outline"} 
            size="sm" 
            onClick={() => toggleStatusFilter("Overdue")}
          >
            Overdue
          </Button>
          <Button 
            variant={statusFilter === "Paid" ? "default" : "outline"} 
            size="sm" 
            onClick={() => toggleStatusFilter("Paid")}
          >
            Paid
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.studentName}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.type}</TableCell>
                  <TableCell className="text-right">R{payment.amount.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {payment.status !== "Paid" && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleSendReminder(payment)}
                          >
                            <Send className="h-4 w-4 mr-1" />
                            Reminder
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => onGenerateInvoice(payment.id, payment.amount)}
                          >
                            <Receipt className="h-4 w-4 mr-1" />
                            Invoice
                          </Button>
                          <Button 
                            variant="default" 
                            size="sm" 
                            onClick={() => onMarkAsPaid(payment.id)}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Mark Paid
                          </Button>
                        </>
                      )}
                      {payment.status === "Paid" && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => onGenerateInvoice(payment.id, payment.amount)}
                        >
                          <Receipt className="h-4 w-4 mr-1" />
                          Receipt
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                  No payments found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-between items-center pt-4">
        <div className="text-sm text-muted-foreground">
          Showing {filteredPayments.length} of {payments.length} payments
        </div>
        
        <Button variant="outline" className="flex items-center gap-1">
          <CreditCard className="h-4 w-4" />
          Add Payment
        </Button>
      </div>

      {selectedPayment && (
        <PaymentMethodsDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          payment={selectedPayment}
        />
      )}
    </div>
  );
};
