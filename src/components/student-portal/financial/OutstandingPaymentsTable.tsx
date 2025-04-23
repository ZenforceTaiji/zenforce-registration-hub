
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { calculateLateFees } from "@/constants/financialRules";

interface OutstandingPayment {
  id: string | number;
  memberNumber: string | number;
  amount: number;
  dueDate: string;
  description: string;
}

interface OutstandingPaymentsTableProps {
  payments: OutstandingPayment[];
  isAdminView?: boolean;
}

const OutstandingPaymentsTable = ({ payments, isAdminView = false }: OutstandingPaymentsTableProps) => {
  const calculateDaysLate = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = Math.abs(today.getTime() - due.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            {isAdminView && <TableHead>Member #</TableHead>}
            <TableHead>Description</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Late Fees</TableHead>
            <TableHead className="text-right">Total Due</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.length > 0 ? (
            payments.map((payment) => {
              const daysLate = calculateDaysLate(payment.dueDate);
              const lateFees = calculateLateFees(daysLate);
              const total = payment.amount + lateFees;

              return (
                <TableRow key={payment.id}>
                  {isAdminView && <TableCell>{payment.memberNumber}</TableCell>}
                  <TableCell>{payment.description}</TableCell>
                  <TableCell>{new Date(payment.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">R{(payment.amount / 100).toFixed(2)}</TableCell>
                  <TableCell className="text-right">R{(lateFees / 100).toFixed(2)}</TableCell>
                  <TableCell className="text-right font-medium">R{(total / 100).toFixed(2)}</TableCell>
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell colSpan={isAdminView ? 6 : 5} className="text-center py-4">
                No outstanding payments
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OutstandingPaymentsTable;
