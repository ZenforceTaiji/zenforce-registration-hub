// iKhokha Invoice Service
// This service handles API communication with the iKhokha invoicing system

import { IKHOKHA_APP_KEY } from "./paymentService";

// Interface for customer details
export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  companyName?: string;
}

// Interface for invoice item
export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number; // in cents
}

// Interface for invoice creation request
export interface CreateInvoiceRequest {
  customerDetails: CustomerDetails;
  invoiceItems: InvoiceItem[];
  dueDate?: string; // ISO date string
  invoiceNumber?: string;
  reference?: string;
  notes?: string;
  recurringFrequency?: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  recurringCount?: number;
  includePayNow?: boolean; // Add payment button to invoice
  includeQrCode?: boolean; // Add QR code to invoice
}

// Interface for invoice response
export interface InvoiceResponse {
  success: boolean;
  invoiceId?: string;
  invoiceUrl?: string;
  errorMessage?: string;
}

// Note: In a production environment, this should be handled by a backend service
// The API secret should not be stored in the frontend
const IKHOKHA_API_SECRET = "dbZfuRUfZkvdU90QRCXRx7YlvZSVVi5H";
const IKHOKHA_API_URL = "https://dashboard.ikhokha.com/payment/api";

// Create a new invoice
export const createInvoice = async (
  invoiceData: CreateInvoiceRequest
): Promise<InvoiceResponse> => {
  try {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Basic ${btoa(`${IKHOKHA_APP_KEY}:${IKHOKHA_API_SECRET}`)}`);

    const response = await fetch(`${IKHOKHA_API_URL}/invoices`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(invoiceData),
    });

    if (!response.ok) {
      throw new Error(`Invoice creation failed: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      invoiceId: data.invoiceId,
      invoiceUrl: data.invoiceUrl
    };
  } catch (error) {
    console.error("Error creating invoice:", error);
    return {
      success: false,
      errorMessage: error instanceof Error ? error.message : "Unknown error creating invoice"
    };
  }
};

// Create a recurring monthly membership invoice
export const createMembershipInvoice = async (
  customerDetails: CustomerDetails,
  packageDetails: any
): Promise<InvoiceResponse> => {
  try {
    // Get the current date and add 30 days for the first due date
    const today = new Date();
    const dueDate = new Date(today);
    dueDate.setDate(today.getDate() + 7); // Give 7 days to pay the first invoice
    
    const invoiceData: CreateInvoiceRequest = {
      customerDetails,
      invoiceItems: [
        {
          description: `ZenForce TaijiQuan Monthly Membership - ${packageDetails?.title || "Membership Fee"}`,
          quantity: 1,
          price: packageDetails?.price || 64000, // Default to R640 if no package details available
        }
      ],
      dueDate: dueDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
      reference: `MEM-${Date.now()}`,
      notes: "Thank you for registering with ZenForce TaijiQuan. This is your monthly membership fee.",
      recurringFrequency: "MONTHLY",
      recurringCount: 12, // Set to bill for 12 months initially
      includePayNow: true, // Add payment button to invoice
      includeQrCode: true  // Add QR code to invoice
    };
    
    return await createInvoice(invoiceData);
  } catch (error) {
    console.error("Error creating membership invoice:", error);
    return {
      success: false,
      errorMessage: error instanceof Error ? error.message : "Unknown error creating membership invoice"
    };
  }
};

// Get invoice status
export const getInvoiceStatus = async (invoiceId: string): Promise<any> => {
  try {
    const headers = new Headers();
    headers.append("Authorization", `Basic ${btoa(`${IKHOKHA_APP_KEY}:${IKHOKHA_API_SECRET}`)}`);

    const response = await fetch(`${IKHOKHA_API_URL}/invoices/${invoiceId}`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to get invoice status: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error checking invoice status:", error);
    throw error;
  }
};
