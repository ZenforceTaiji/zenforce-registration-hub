// iKhokha Payment Service
// This service handles API communication with the iKhokha payment gateway

interface PaymentRequest {
  amount: number;
  reference: string;
  description: string;
  successUrl?: string;
  cancelUrl?: string;
  callbackUrl?: string;
}

export interface PaymentResponse {
  success: boolean;
  paymentUrl?: string;
  errorMessage?: string;
  paymentId?: string;
}

export const IKHOKHA_APP_KEY = "IK9NX5EM6KL0LGZY6UPCMYGXUQ9UIMN7";
// Note: In a production environment, the API secret should not be stored in the frontend
// This is included here for demonstration purposes only
const IKHOKHA_API_SECRET = "dbZfuRUfZkvdU90QRCXRx7YlsdlZSVVi5H";
const IKHOKHA_API_URL = "https://api.ikhokha.com/pay/v1"; // Updated API endpoint

const IKHOKHA_MERCHANT_URL = "https://pay.ikhokha.com/zenforce-taijiquan-sa/buy/zenforce";

export const createPaymentLink = async (paymentData: PaymentRequest): Promise<string> => {
  // In development/demo mode, use the payment simulator
  const isDemoMode = true; // Set to false in production
  
  if (isDemoMode) {
    console.log("Using demo payment mode");
    return `/payment-simulator?amount=${paymentData.amount/100}&reference=${paymentData.reference}&type=payment`;
  }
  
  // In production, use the iKhokha merchant URL
  return IKHOKHA_MERCHANT_URL;
};

export const getPaymentStatus = async (paymentId: string): Promise<any> => {
  try {
    const headers = new Headers();
    headers.append("Authorization", `Basic ${btoa(`${IKHOKHA_APP_KEY}:${IKHOKHA_API_SECRET}`)}`);
    headers.append("Accept", "application/json");

    const response = await fetch(`${IKHOKHA_API_URL}/payments/${paymentId}/status`, {
      method: "GET",
      headers: headers,
      mode: "cors",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Payment status API error:", errorText);
      throw new Error(`Failed to get payment status: ${response.statusText} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error checking payment status:", error);
    throw error;
  }
};

// Payment types for different purposes
export enum PaymentType {
  REGISTRATION = "Registration Fee",
  MONTHLY = "Monthly Membership Fee",
  GRADING = "Grading Fee",
  OTHER = "Other Fee"
}

// Create payment for specific payment types
export const createTypedPayment = async (
  amount: number, 
  type: PaymentType, 
  description?: string,
  successUrl?: string,
  cancelUrl?: string
): Promise<PaymentResponse> => {
  try {
    const timestamp = Date.now();
    const typePrefix = type === PaymentType.REGISTRATION ? "REG" :
                      type === PaymentType.MONTHLY ? "MEM" :
                      type === PaymentType.GRADING ? "GRD" : "OTH";
    
    const reference = `${typePrefix}-${timestamp}`;
    const fullDescription = description || `ZenForce TaijiQuan - ${type}`;
    
    // Store payment details in session storage
    const paymentDetails = {
      amount: amount,
      type: type,
      description: fullDescription,
      reference: reference,
      timestamp: new Date().toISOString()
    };
    sessionStorage.setItem("lastPaymentAttempt", JSON.stringify(paymentDetails));
    
    // Demo mode - skip actual payment gateway
    const isDemoMode = true; // Set to false in production
    
    if (isDemoMode) {
      console.log("Using demo payment mode");
      
      // Create simulated payment URL with query parameters
      const simulatedPaymentUrl = `/payment-simulator?amount=${amount/100}&reference=${reference}&type=${encodeURIComponent(type)}`;
      
      return {
        success: true,
        paymentUrl: simulatedPaymentUrl,
        paymentId: reference
      };
    } else {
      // Use the direct iKhokha merchant URL in production
      return {
        success: true,
        paymentUrl: IKHOKHA_MERCHANT_URL,
        paymentId: reference
      };
    }
  } catch (error) {
    console.error("Error creating typed payment:", error);
    return {
      success: false,
      errorMessage: error instanceof Error ? error.message : "Unknown payment error"
    };
  }
};
