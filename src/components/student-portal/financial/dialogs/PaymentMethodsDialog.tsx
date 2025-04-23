
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, Mail, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PaymentMethodsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  payment: {
    memberNumber: string
    amount: string
    dueDate: string
    description: string
    studentPhone?: string
    studentEmail?: string
  }
}

const PaymentMethodsDialog = ({ open, onOpenChange, payment }: PaymentMethodsDialogProps) => {
  const { toast } = useToast()

  const handleWhatsAppReminder = () => {
    if (!payment.studentPhone) {
      toast({
        title: "No phone number available",
        description: "This student has no phone number registered.",
        variant: "destructive"
      })
      return
    }

    const message = `Payment Reminder: ${payment.amount} due on ${payment.dueDate} for ${payment.description}`;
    const whatsappUrl = `https://wa.me/${payment.studentPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  const handleEmailReminder = () => {
    if (!payment.studentEmail) {
      toast({
        title: "No email available",
        description: "This student has no email registered.",
        variant: "destructive"
      })
      return
    }

    // In a real app, this would trigger an email sending edge function
    toast({
      title: "Email reminder sent",
      description: "The payment reminder has been sent via email."
    })
  }

  const handlePrintReminder = () => {
    // In a real app, this would generate a PDF for printing
    toast({
      description: "Payment reminder downloaded for printing."
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Payment Reminder</DialogTitle>
          <DialogDescription>
            Choose how to send the payment reminder to member {payment.memberNumber}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <Button 
            onClick={handleWhatsAppReminder}
            disabled={!payment.studentPhone}
            className="w-full"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Send WhatsApp
          </Button>
          
          <Button 
            onClick={handleEmailReminder}
            disabled={!payment.studentEmail}
            variant="outline"
            className="w-full"
          >
            <Mail className="mr-2 h-4 w-4" />
            Send Email
          </Button>
          
          <Button 
            onClick={handlePrintReminder}
            variant="outline"
            className="w-full"
          >
            <Download className="mr-2 h-4 w-4" />
            Download for Print
          </Button>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PaymentMethodsDialog
