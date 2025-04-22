
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { Receipt, Send } from "lucide-react";

interface Payment {
  id: number;
  studentName: string;
  amount: number;
  date: string;
  status: string;
  type: string;
}

interface InvoiceGeneratorProps {
  pendingPayments: Payment[];
  onGenerateInvoice: (studentId: number, amount: number) => void;
}

// Mock function to interface with the invoice service
const generateInvoice = async (studentId: number, studentName: string, amount: number) => {
  console.log(`Generating invoice for ${studentName} (ID: ${studentId}) for amount R${amount}`);
  
  // In a real implementation, this would call the invoice API
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    success: true,
    invoiceId: `INV-${Date.now()}`,
    invoiceUrl: `https://example.com/invoices/INV-${Date.now()}`
  };
};

export const InvoiceGenerator = ({ 
  pendingPayments,
  onGenerateInvoice
}: InvoiceGeneratorProps) => {
  const { toast } = useToast();
  const [selectedPayments, setSelectedPayments] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleToggleSelection = (paymentId: number) => {
    if (selectedPayments.includes(paymentId)) {
      setSelectedPayments(selectedPayments.filter(id => id !== paymentId));
    } else {
      setSelectedPayments([...selectedPayments, paymentId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedPayments.length === pendingPayments.length) {
      setSelectedPayments([]);
    } else {
      setSelectedPayments(pendingPayments.map(payment => payment.id));
    }
  };
  
  const handleGenerateBulkInvoices = async () => {
    if (selectedPayments.length === 0) {
      toast({
        title: "No Payments Selected",
        description: "Please select at least one payment to generate invoices.",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Process selected payments
      for (const paymentId of selectedPayments) {
        const payment = pendingPayments.find(p => p.id === paymentId);
        if (payment) {
          // In a real implementation, this would use the invoice service
          await generateInvoice(payment.id, payment.studentName, payment.amount);
          onGenerateInvoice(payment.id, payment.amount);
        }
      }
      
      toast({
        title: "Invoices Generated",
        description: `Successfully generated ${selectedPayments.length} invoices.`,
      });
      
      // Clear selection after success
      setSelectedPayments([]);
    } catch (error) {
      console.error("Error generating invoices:", error);
      toast({
        title: "Error",
        description: "There was an error generating invoices. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendReminders = async () => {
    if (selectedPayments.length === 0) {
      toast({
        title: "No Payments Selected",
        description: "Please select at least one payment to send reminders.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Reminders Sent",
      description: `Payment reminders sent to ${selectedPayments.length} students.`,
    });
    
    // Clear selection after sending
    setSelectedPayments([]);
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingPayments.length > 0 ? (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <input 
                          type="checkbox" 
                          checked={selectedPayments.length === pendingPayments.length && pendingPayments.length > 0}
                          onChange={handleSelectAll}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                      </TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>
                          <input 
                            type="checkbox" 
                            checked={selectedPayments.includes(payment.id)}
                            onChange={() => handleToggleSelection(payment.id)}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                        </TableCell>
                        <TableCell>{payment.studentName}</TableCell>
                        <TableCell>{payment.type}</TableCell>
                        <TableCell className="text-right">R{payment.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge className={payment.status === "Overdue" 
                            ? "bg-red-100 text-red-800 hover:bg-red-100" 
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                          }>
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => onGenerateInvoice(payment.id, payment.amount)}
                          >
                            <Receipt className="h-4 w-4 mr-1" />
                            Invoice
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                No pending payments to display
              </div>
            )}
            
            <div className="flex gap-2 mt-4">
              <Button 
                onClick={handleGenerateBulkInvoices} 
                disabled={isGenerating || selectedPayments.length === 0}
              >
                <Receipt className="h-4 w-4 mr-2" />
                {isGenerating ? "Generating..." : "Generate Selected Invoices"}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleSendReminders} 
                disabled={selectedPayments.length === 0}
              >
                <Send className="h-4 w-4 mr-2" />
                Send Payment Reminders
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Invoice</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Invoice Number</label>
                <InputOTP maxLength={6} className="gap-2">
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              
              <div className="pt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Generate quick invoices by entering the invoice number. The system will create invoices based on predefined templates.
                </p>
                
                <Button className="w-full">
                  <Receipt className="h-4 w-4 mr-2" />
                  Generate Quick Invoice
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
