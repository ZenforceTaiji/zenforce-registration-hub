
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OutstandingPayment {
  id: string;
  memberNumber: string;
  amount: string;
  dueDate: string;
  description: string;
}

interface OutstandingPaymentsTableProps {
  payments: OutstandingPayment[];
}

const OutstandingPaymentsTable = ({ payments }: OutstandingPaymentsTableProps) => {
  const { toast } = useToast();

  const handleSendWhatsApp = (payment: OutstandingPayment) => {
    // Format the message for WhatsApp
    const message = `Hello, this is a friendly reminder that you have an outstanding payment of ${payment.amount} due on ${payment.dueDate} for ${payment.description}. Please make your payment at your earliest convenience. Thank you!`;
    
    // Create WhatsApp share URL
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in a new window
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "WhatsApp Reminder Ready",
      description: "The payment reminder has been formatted for WhatsApp sharing.",
    });
  };

  return (
    <Table>
      <TableCaption>Outstanding payments requiring attention</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Member Number</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.length > 0 ? (
          payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">{payment.memberNumber}</TableCell>
              <TableCell>{payment.description}</TableCell>
              <TableCell>{payment.amount}</TableCell>
              <TableCell>{payment.dueDate}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => handleSendWhatsApp(payment)}
                >
                  <Share2 className="h-4 w-4" />
                  Send WhatsApp
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-6 text-gray-500">
              No outstanding payments found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default OutstandingPaymentsTable;
