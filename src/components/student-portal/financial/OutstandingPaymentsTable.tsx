
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { useState } from "react"
import PaymentMethodsDialog from "./dialogs/PaymentMethodsDialog"

interface OutstandingPayment {
  id: string
  memberNumber: string
  amount: string
  dueDate: string
  description: string
  studentPhone?: string
  studentEmail?: string
}

interface OutstandingPaymentsTableProps {
  payments: OutstandingPayment[]
  isAdminView?: boolean
}

const OutstandingPaymentsTable = ({ payments, isAdminView = false }: OutstandingPaymentsTableProps) => {
  const [selectedPayment, setSelectedPayment] = useState<OutstandingPayment | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleOpenDialog = (payment: OutstandingPayment) => {
    setSelectedPayment(payment)
    setDialogOpen(true)
  }

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
            {isAdminView && <TableHead className="text-right">Actions</TableHead>}
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
                {isAdminView && (
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenDialog(payment)}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Reminder
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={isAdminView ? 5 : 4} className="text-center py-6 text-gray-500">
                No outstanding payments found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {selectedPayment && (
        <PaymentMethodsDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          payment={selectedPayment}
        />
      )}
    </div>
  )
}

export default OutstandingPaymentsTable
