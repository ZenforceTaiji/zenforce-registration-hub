
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
  Search,
  Trash2,
  Edit
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Expense {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;
}

interface ExpensesTableProps {
  expenses: Expense[];
  onDelete: (expenseId: number) => void;
}

export const ExpensesTable = ({ 
  expenses, 
  onDelete 
}: ExpensesTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  
  // Filter expenses based on search term and category filter
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? expense.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = Array.from(new Set(expenses.map(expense => expense.category)));

  // Toggle category filter
  const toggleCategoryFilter = (category: string) => {
    if (categoryFilter === category) {
      setCategoryFilter(null);
    } else {
      setCategoryFilter(category);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex items-center gap-2 relative w-full max-w-sm">
          <Search className="h-4 w-4 absolute left-2.5 text-gray-500" />
          <Input
            placeholder="Search description or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-500">Filter:</span>
          {categories.map(category => (
            <Button 
              key={category}
              variant={categoryFilter === category ? "default" : "outline"} 
              size="sm" 
              onClick={() => toggleCategoryFilter(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>
                    <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                      {expense.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">R{expense.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onDelete(expense.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                  No expenses found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="text-sm text-muted-foreground pt-2">
        Showing {filteredExpenses.length} of {expenses.length} expenses
      </div>
    </div>
  );
};
