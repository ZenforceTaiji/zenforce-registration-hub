
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentsTable } from "./PaymentsTable";
import { ExpensesTable } from "./ExpensesTable";
import { AddExpenseForm } from "./AddExpenseForm";
import { FinancialReports } from "./FinancialReports";
import { FinancialOverview } from "./FinancialOverview";
import { InvoiceGenerator } from "./InvoiceGenerator";

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

interface FinancialsTabProps {
  financialData: {
    studentPayments: Payment[];
    expenses: Expense[];
  };
}

export const FinancialsTab = ({ financialData }: FinancialsTabProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [payments, setPayments] = useState(financialData.studentPayments);
  const [expenses, setExpenses] = useState(financialData.expenses);

  // Calculate totals for overview
  const totalIncome = payments.reduce((sum, payment) => {
    if (payment.status === "Paid") {
      return sum + payment.amount;
    }
    return sum;
  }, 0);
  
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const netProfit = totalIncome - totalExpenses;
  const pendingPayments = payments.filter(payment => payment.status === "Pending" || payment.status === "Overdue");
  
  // Add a new expense
  const handleAddExpense = (newExpense: Omit<Expense, "id">) => {
    const expenseWithId = {
      ...newExpense,
      id: Math.max(...expenses.map(e => e.id), 0) + 1,
    };
    setExpenses([...expenses, expenseWithId]);
  };

  // Generate invoice for a pending payment
  const handleGenerateInvoice = (studentId: number, amount: number) => {
    // In a real implementation, this would integrate with the invoice service
    console.log(`Generating invoice for student ID ${studentId} for amount R${amount}`);
  };

  // Mark payment as paid
  const handleMarkAsPaid = (paymentId: number) => {
    setPayments(
      payments.map(payment => 
        payment.id === paymentId 
          ? { ...payment, status: "Paid" } 
          : payment
      )
    );
  };

  // Delete expense
  const handleDeleteExpense = (expenseId: number) => {
    setExpenses(expenses.filter(expense => expense.id !== expenseId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Financial Management</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payments">Student Payments</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <FinancialOverview 
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            netProfit={netProfit}
            pendingPaymentsCount={pendingPayments.length}
            pendingPaymentsTotal={pendingPayments.reduce((sum, p) => sum + p.amount, 0)}
          />
        </TabsContent>

        <TabsContent value="payments" className="space-y-6 mt-6">
          <PaymentsTable 
            payments={payments} 
            onMarkAsPaid={handleMarkAsPaid}
            onGenerateInvoice={handleGenerateInvoice}
          />
        </TabsContent>

        <TabsContent value="expenses" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ExpensesTable 
                expenses={expenses} 
                onDelete={handleDeleteExpense} 
              />
            </div>
            <div>
              <AddExpenseForm onAddExpense={handleAddExpense} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-6 mt-6">
          <InvoiceGenerator 
            pendingPayments={pendingPayments}
            onGenerateInvoice={handleGenerateInvoice}
          />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6 mt-6">
          <FinancialReports 
            payments={payments}
            expenses={expenses}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
