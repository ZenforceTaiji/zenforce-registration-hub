
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ExpenseFormData {
  description: string;
  amount: number | string;
  date: string;
  category: string;
}

interface AddExpenseFormProps {
  onAddExpense: (expense: Omit<ExpenseFormData, "amount"> & { amount: number }) => void;
}

const EXPENSE_CATEGORIES = [
  "Facilities",
  "Salaries",
  "Marketing",
  "Administrative",
  "Equipment",
  "Events",
  "Utilities",
  "Other"
];

export const AddExpenseForm = ({ onAddExpense }: AddExpenseFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ExpenseFormData>({
    description: "",
    amount: "",
    date: new Date().toISOString().split("T")[0], // Default to today
    category: "Other"
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ExpenseFormData, string>>>({});

  const handleChange = (field: keyof ExpenseFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when field is edited
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ExpenseFormData, string>> = {};
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    
    if (!formData.amount) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be a valid positive number";
    }
    
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onAddExpense({
        ...formData,
        amount: Number(formData.amount)
      });
      
      // Reset form
      setFormData({
        description: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        category: "Other"
      });
      
      toast({
        title: "Expense Added",
        description: "The expense has been added successfully.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Add New Expense</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Expense description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-xs text-red-500">{errors.description}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (ZAR)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
              className={errors.amount ? "border-red-500" : ""}
            />
            {errors.amount && (
              <p className="text-xs text-red-500">{errors.amount}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleChange("date", e.target.value)}
              className={errors.date ? "border-red-500" : ""}
            />
            {errors.date && (
              <p className="text-xs text-red-500">{errors.date}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => handleChange("category", value)}
            >
              <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {EXPENSE_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-xs text-red-500">{errors.category}</p>
            )}
          </div>
          
          <Button type="submit" className="w-full">Add Expense</Button>
        </form>
      </CardContent>
    </Card>
  );
};
