
import { PaymentRecord } from "../types";

// Sample financial data
export const samplePayments: PaymentRecord[] = [
  {
    id: "1",
    date: "April 1, 2024",
    description: "Monthly Membership Fee",
    amount: "R350.00",
    status: "Paid",
    receipt: "#REC-001234",
    paymentMethod: "Card Payment"
  },
  {
    id: "2",
    date: "March 1, 2024",
    description: "Monthly Membership Fee",
    amount: "R350.00",
    status: "Paid",
    receipt: "#REC-001128",
    paymentMethod: "Card Payment"
  },
  {
    id: "3",
    date: "February 1, 2024",
    description: "Monthly Membership Fee",
    amount: "R350.00",
    status: "Paid",
    receipt: "#REC-001042",
    paymentMethod: "Card Payment"
  },
  {
    id: "4",
    date: "January 15, 2024",
    description: "Grading Fee - 24 Step Form G02",
    amount: "R250.00",
    status: "Paid",
    receipt: "#REC-000987",
    paymentMethod: "Card Payment"
  },
  {
    id: "5",
    date: "January 1, 2024",
    description: "Monthly Membership Fee",
    amount: "R350.00",
    status: "Paid",
    receipt: "#REC-000923",
    paymentMethod: "Card Payment"
  }
];
