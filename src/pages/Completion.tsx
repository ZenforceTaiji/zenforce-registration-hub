
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertCircle, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createMembershipInvoice } from "@/services/invoiceService";
import { createTypedPayment, PaymentType } from "@/services/paymentService";

interface ChildDetails {
  id: string;
  firstName: string;
  lastName: string;
  age: string;
}

const Completion = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [studentDetails, setStudentDetails] = useState<any>(null);
  const [membershipNumber, setMembershipNumber] = useState<string>("");
  const [tempPassword, setTempPassword] = useState<string>("");
  const [additionalChildren, setAdditionalChildren] = useState<ChildDetails[]>([]);
  const [additionalMembershipNumbers, setAdditionalMembershipNumbers] = useState<Record<string, string>>({});
  const [invoiceSent, setInvoiceSent] = useState(false);
  const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [qrCodeVisible, setQrCodeVisible] = useState(false);

  useEffect(() => {
    // Load student details
    const studentData = sessionStorage.getItem("studentDetails");
    if (studentData) {
      setStudentDetails(JSON.parse(studentData));
    } else {
      navigate("/");
      return;
    }

    // Load membership number
    const memberNum = sessionStorage.getItem("membershipNumber");
    if (memberNum) {
      setMembershipNumber(memberNum);
    }

    // Load temporary password
    const tempPass = sessionStorage.getItem("tempPassword");
    if (tempPass) {
      setTempPassword(tempPass);
    }

    // Load additional children
    const childrenData = sessionStorage.getItem("multipleChildren");
    if (childrenData) {
      setAdditionalChildren(JSON.parse(childrenData));
    }

    // Load additional membership numbers
    const additionalMemberNums = sessionStorage.getItem("additionalMembershipNumbers");
    if (additionalMemberNums) {
      setAdditionalMembershipNumbers(JSON.parse(additionalMemberNums));
    }

    // Check if invoice has been sent already
    const invoiceStatus = sessionStorage.getItem("invoiceSent");
    if (invoiceStatus === "true") {
      setInvoiceSent(true);
      const savedInvoiceUrl = sessionStorage.getItem("invoiceUrl");
      if (savedInvoiceUrl) {
        setInvoiceUrl(savedInvoiceUrl);
      }
    } else {
      // Send initial invoice if not already sent
      sendInitialInvoice();
    }
  }, [navigate]);

  const sendInitialInvoice = async () => {
    const studentData = sessionStorage.getItem("studentDetails");
    if (!studentData) return;
    
    const student = JSON.parse(studentData);
    const packageDetailsStr = sessionStorage.getItem("packageDetails");
    const packageDetails = packageDetailsStr ? JSON.parse(packageDetailsStr) : null;
    
    // Get email from student or parent details
    const emailAddress = student.email || 
                        (sessionStorage.getItem("parentDetails") ? 
                        JSON.parse(sessionStorage.getItem("parentDetails") || "{}").parentEmail : 
                        null);
    
    if (!emailAddress) {
      console.error("No email address found for invoice");
      toast({
        title: "Invoice Error",
        description: "Could not create invoice: No email address found",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const invoiceResponse = await createMembershipInvoice(
        {
          firstName: student.firstName,
          lastName: student.lastName,
          email: emailAddress,
          mobile: student.mobile || null
        },
        packageDetails
      );
      
      if (invoiceResponse.success && invoiceResponse.invoiceUrl) {
        setInvoiceSent(true);
        setInvoiceUrl(invoiceResponse.invoiceUrl);
        sessionStorage.setItem("invoiceSent", "true");
        sessionStorage.setItem("invoiceUrl", invoiceResponse.invoiceUrl);
        
        toast({
          title: "Invoice Created",
          description: "Your first membership invoice has been created and sent to your email",
        });
      } else {
        toast({
          title: "Invoice Creation Failed",
          description: invoiceResponse.errorMessage || "Could not create invoice. Please contact admin.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating invoice:", error);
      toast({
        title: "Invoice Error",
        description: "An error occurred while creating your invoice",
        variant: "destructive",
      });
    }
  };

  const handleCreatePayment = async () => {
    setPaymentLoading(true);

    try {
      // Get package details if available
      const packageDetailsStr = sessionStorage.getItem("packageDetails");
      const packageDetails = packageDetailsStr ? JSON.parse(packageDetailsStr) : null;
      
      // Default to R640 registration fee if no package details
      const amount = packageDetails?.price || 64000; // R640 in cents
      
      // Use the membership number as part of the description
      const description = `ZenForce TaijiQuan Registration - ${membershipNumber}`;
      
      const paymentResponse = await createTypedPayment(
        amount,
        PaymentType.REGISTRATION,
        description
      );
      
      if (paymentResponse.success && paymentResponse.paymentUrl) {
        setPaymentUrl(paymentResponse.paymentUrl);
        setQrCodeVisible(true);
        
        toast({
          title: "Payment Link Created",
          description: "You can now make your payment using the link or QR code.",
        });
      } else {
        toast({
          title: "Payment Link Creation Failed",
          description: paymentResponse.errorMessage || "Could not create payment link. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating payment:", error);
      toast({
        title: "Payment Error",
        description: "An error occurred while creating your payment link",
        variant: "destructive",
      });
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleOpenPayment = () => {
    if (paymentUrl) {
      window.open(paymentUrl, "_blank");
    }
  };

  if (!studentDetails) {
    return <div className="zen-container py-12">Loading...</div>;
  }

  const emailAddress = studentDetails.email || 
                      (sessionStorage.getItem("parentDetails") ? 
                       JSON.parse(sessionStorage.getItem("parentDetails") || "{}").parentEmail : 
                       null);

  return (
    <div className="zen-container py-12 animate-fade-in">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-20 w-20 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Registration Complete!</h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Thank you, {studentDetails.firstName} {studentDetails.lastName}, for registering with ZenForce TaijiQuan SA.
          {emailAddress ? " A confirmation email has been sent to your email address." : ""}
        </p>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Your Account Information</h2>
            
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-gray-500">Membership Number</p>
                <p className="font-medium text-lg">{membershipNumber}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Username</p>
                <p className="font-medium">{membershipNumber}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Temporary Password</p>
                <p className="font-medium">{tempPassword}</p>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t text-left">
              <p className="text-sm text-gray-500 italic mb-1">
                Please change your password when you first log in. This information has also been sent to
                {emailAddress ? ` ${emailAddress}` : " the admin for safekeeping"}.
              </p>
              <p className="text-sm text-orange-600 font-medium">
                Important: Your password will expire every 30 days for security reasons. 
                You will be prompted to set a new password upon expiration.
              </p>
            </div>

            {emailAddress && (
              <div className="mt-4 pt-4 border-t text-left">
                <p className="text-sm text-emerald-600">
                  <strong>Email sent:</strong> A confirmation email with your registration details and login information has been sent to {emailAddress}.
                </p>
              </div>
            )}

            <div className="mt-4 text-left">
              <p className="text-sm text-slate-600">
                <strong>Note:</strong> A notification has also been sent to your instructor confirming your registration.
              </p>
            </div>
            
            {/* Invoice status information */}
            <div className="mt-6 pt-4 border-t">
              <div className="flex items-start gap-3">
                {invoiceSent ? (
                  <CheckCircle className="text-green-500 h-5 w-5 mt-1 flex-shrink-0" />
                ) : (
                  <AlertCircle className="text-orange-500 h-5 w-5 mt-1 flex-shrink-0" />
                )}
                <div className="text-left">
                  <h3 className="font-medium">Monthly Membership Invoice</h3>
                  <p className="text-sm text-gray-600">
                    {invoiceSent 
                      ? "Your first monthly membership invoice has been created and sent to your email." 
                      : "We're preparing your monthly membership invoice."}
                  </p>
                  {invoiceUrl && (
                    <div className="mt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => window.open(invoiceUrl, "_blank")}
                      >
                        View Invoice
                      </Button>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Your membership will be billed monthly. The first invoice is due within 7 days, and subsequent invoices 
                    will be sent every 30 days.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Payment section */}
            <div className="mt-6 pt-4 border-t">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-3">Registration Payment</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Complete your registration by making a payment for your membership fee.
                </p>
                
                {!paymentUrl ? (
                  <Button 
                    className="bg-accent-red hover:bg-accent-red/90 text-white"
                    onClick={handleCreatePayment}
                    disabled={paymentLoading}
                  >
                    {paymentLoading ? "Creating Payment..." : "Generate Payment Link"}
                  </Button>
                ) : (
                  <div className="space-y-4">
                    {qrCodeVisible && (
                      <div className="flex justify-center mb-4">
                        <div className="bg-white p-4 rounded-md border shadow-sm inline-block">
                          <QrCode className="h-32 w-32 text-gray-800" />
                          <p className="text-xs text-gray-500 mt-2">Scan to pay</p>
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      className="bg-accent-red hover:bg-accent-red/90 text-white"
                      onClick={handleOpenPayment}
                    >
                      Pay Now
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            {additionalChildren.length > 0 && (
              <div className="mt-6 pt-4 border-t">
                <h3 className="text-lg font-medium mb-4 text-left">Additional Children</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {additionalChildren.map((child) => (
                    <div key={child.id} className="p-4 border rounded-md text-left">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{child.firstName} {child.lastName}</p>
                          <p className="text-sm text-gray-500">Age: {child.age} years</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Membership</p>
                          <p className="font-medium">{additionalMembershipNumbers[child.id] || "TBD"}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            variant="outline" 
            onClick={() => navigate("/summary")}
          >
            View Registration Summary
          </Button>
          
          <Button
            className="bg-accent-red hover:bg-accent-red/90 text-white"
            onClick={() => navigate("/")}
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Completion;
