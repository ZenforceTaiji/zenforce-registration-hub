
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { createTypedPayment, PaymentType } from "@/services/paymentService";

export const usePaymentActions = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [pendingPaymentId, setPendingPaymentId] = useState<string | null>(null);

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      
      // Create a monthly membership payment of R350.00 (35000 cents)
      const paymentResponse = await createTypedPayment(
        35000, 
        PaymentType.MONTHLY,
        "Monthly Membership Fee - ZenForce TaijiQuan",
        `${window.location.origin}/student-portal/financial?status=success`,
        `${window.location.origin}/student-portal/financial?status=cancelled`
      );
      
      if (paymentResponse.success && paymentResponse.paymentUrl) {
        // Store the payment ID for later verification
        if (paymentResponse.paymentId) {
          setPendingPaymentId(paymentResponse.paymentId);
          // We could also store this in sessionStorage to persist across page refreshes
          sessionStorage.setItem("pendingPaymentId", paymentResponse.paymentId);
        }
        
        // Open the payment URL in a new tab
        window.open(paymentResponse.paymentUrl, "_blank");
        
        toast({
          title: "Payment Initiated",
          description: "You've been redirected to the iKhokha payment gateway.",
        });
      } else {
        throw new Error(paymentResponse.errorMessage || "Failed to create payment");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Error",
        description: "There was a problem initiating your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleGradingPayment = async () => {
    try {
      setIsProcessing(true);
      
      // Create a grading fee payment of R250.00 (25000 cents)
      const paymentResponse = await createTypedPayment(
        25000, 
        PaymentType.GRADING,
        "Grading Fee - ZenForce TaijiQuan",
        `${window.location.origin}/student-portal/financial?status=success&type=grading`,
        `${window.location.origin}/student-portal/financial?status=cancelled&type=grading`
      );
      
      if (paymentResponse.success && paymentResponse.paymentUrl) {
        // Store the payment ID for later verification
        if (paymentResponse.paymentId) {
          setPendingPaymentId(paymentResponse.paymentId);
          sessionStorage.setItem("pendingPaymentId", paymentResponse.paymentId);
          sessionStorage.setItem("pendingPaymentType", "grading");
        }
        
        // Open the payment URL in a new tab
        window.open(paymentResponse.paymentUrl, "_blank");
        
        toast({
          title: "Grading Payment Initiated",
          description: "You've been redirected to the iKhokha payment gateway.",
        });
      } else {
        throw new Error(paymentResponse.errorMessage || "Failed to create payment");
      }
    } catch (error) {
      console.error("Grading payment error:", error);
      toast({
        title: "Payment Error",
        description: "There was a problem initiating your grading payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Check for payment status from URL params when returning from payment gateway
  useEffect(() => {
    const checkPaymentStatus = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const status = urlParams.get('status');
      const type = urlParams.get('type');
      
      // Clear the URL parameters
      if (status) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }
      
      if (status === 'success') {
        // Try to get the stored payment ID
        const paymentId = sessionStorage.getItem("pendingPaymentId");
        const paymentType = sessionStorage.getItem("pendingPaymentType") || "monthly";
        
        if (paymentId) {
          // Here we would normally verify the payment with the backend
          // For demo purposes, we're just showing a success message
          
          toast({
            title: "Payment Successful",
            description: `Your ${paymentType === "grading" ? "grading" : "membership"} payment has been processed successfully.`,
          });
          
          // Clear the stored payment ID
          sessionStorage.removeItem("pendingPaymentId");
          sessionStorage.removeItem("pendingPaymentType");
          setPendingPaymentId(null);
        } else {
          toast({
            title: "Payment Successful",
            description: "Your payment has been processed successfully.",
          });
        }
      } else if (status === 'cancelled') {
        toast({
          title: "Payment Cancelled",
          description: "Your payment was cancelled.",
          variant: "destructive",
        });
        
        // Clear the stored payment ID
        sessionStorage.removeItem("pendingPaymentId");
        sessionStorage.removeItem("pendingPaymentType");
        setPendingPaymentId(null);
      }
    };
    
    checkPaymentStatus();
  }, [toast]);

  return {
    isProcessing,
    pendingPaymentId,
    handlePayment,
    handleGradingPayment
  };
};
