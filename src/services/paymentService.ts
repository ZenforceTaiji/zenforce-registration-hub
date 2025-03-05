
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

    const response = await fetch(`${IKHOKHA_API_URL}/create-payment-request`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      throw new Error(`Payment request failed: ${response.statusText}`);
    }

    const data = await response.json();
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

    const response = await fetch(`${IKHOKHA_API_URL}/payment-status/${paymentId}`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to get payment status: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error checking payment status:", error);
    throw error;
  }
};
