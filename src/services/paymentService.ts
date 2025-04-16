
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
const IKHOKHA_API_SECRET = "dbZfuRUfZkvdU90QRCXRx7YlvZSVVi5H";
const IKHOKHA_API_URL = "https://dashboard.ikhokha.com/payment/api";

export const createPaymentLink = async (paymentData: PaymentRequest): Promise<string> => {
  try {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Basic ${btoa(`${IKHOKHA_APP_KEY}:${IKHOKHA_API_SECRET}`)}`);
    headers.append("Accept", "application/json");
    
    // Log request details for debugging
    console.log("Payment request:", JSON.stringify(paymentData));
    console.log("Request URL:", `${IKHOKHA_API_URL}/payments`);
    
    const response = await fetch(`${IKHOKHA_API_URL}/payments`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(paymentData),
      mode: "cors",
    });

    console.log("Response status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Payment API error:", errorText);
      throw new Error(`Payment request failed: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log("Payment response:", data);
    return data.paymentUrl;
  } catch (error) {
    console.error("Error creating payment link:", error);
    throw error;
  }
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
    
    // Default URLs if not provided
    const defaultSuccessUrl = `${window.location.origin}/payment-success`;
    const defaultCancelUrl = `${window.location.origin}/payment-cancelled`;
    
    const paymentData: PaymentRequest = {
      amount: amount, // Amount in cents
      reference: reference,
      description: fullDescription,
      successUrl: successUrl || defaultSuccessUrl,
      cancelUrl: cancelUrl || defaultCancelUrl
    };
    
    try {
      const paymentUrl = await createPaymentLink(paymentData);
      
      return {
        success: true,
        paymentUrl: paymentUrl,
        paymentId: reference
      };
    } catch (apiError) {
      console.error("API Error while creating payment:", apiError);
      
      // Fallback to direct iKhokha payment page URL
      const directPaymentUrl = `https://pay.ikhokha.com?amount=${amount/100}&reference=${reference}`;
      console.log("Using fallback payment URL:", directPaymentUrl);
      
      return {
        success: true,
        paymentUrl: directPaymentUrl,
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
