
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
  instructorPhone: string;
}

interface OutstandingPaymentsTableProps {
  payments: OutstandingPayment[];
}

const OutstandingPaymentsTable = ({ payments }: OutstandingPaymentsTableProps) => {
  const { toast } = useToast();

  const handleSendWhatsApp = (payments: OutstandingPayment[]) => {
    // Format the message for WhatsApp with all outstanding payments
    const messageList = payments
      .map(p => `- Member ${p.memberNumber}: ${p.amount} due on ${p.dueDate} (${p.description})`)
      .join("\n");
    
    const message = `Outstanding Payments List:\n\n${messageList}\n\nPlease follow up with these members regarding their payments.`;
    
    // Create WhatsApp share URL with instructor's phone
    const whatsappUrl = `https://wa.me/${payments[0].instructorPhone}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in a new window
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "WhatsApp List Ready",
      description: "The payment list has been formatted and ready to send to instructor.",
    });
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableCaption>Outstanding payments requiring attention</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Member Number</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Due Date</TableHead>
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
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                No outstanding payments found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {payments.length > 0 && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => handleSendWhatsApp(payments)}
          >
            <Share2 className="h-4 w-4" />
            Send List to Instructor
          </Button>
        </div>
      )}
    </div>
  );
};

export default OutstandingPaymentsTable;
