
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

const PhysicalReadiness = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const userAge = sessionStorage.getItem("userAge");
  const studentDetails = sessionStorage.getItem("studentDetails");
  
  const [acceptTerms, setAcceptTerms] = useState<boolean | "indeterminate">(false);
  const [rejectTerms, setRejectTerms] = useState<boolean | "indeterminate">(false);

  // Check if required session data exists
  useEffect(() => {
    if (!userAge || !studentDetails) {
      navigate("/");
    }
  }, [userAge, studentDetails, navigate]);

  const handleAcceptChange = (checked: boolean | "indeterminate") => {
    setAcceptTerms(checked);
    if (checked === true) {
      setRejectTerms(false);
    }
  };

  const handleRejectChange = (checked: boolean | "indeterminate") => {
    setRejectTerms(checked);
    if (checked === true) {
      setAcceptTerms(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptTerms && !rejectTerms) {
      toast({
        title: "Selection Required",
        description: "Please either accept or reject the terms and conditions",
        variant: "destructive",
      });
      return;
    }

    // Save choice to session storage
    sessionStorage.setItem("parqAccepted", String(acceptTerms));
    
    if (rejectTerms) {
      // Navigate to rejection message
      navigate("/par-q-rejection");
    } else {
      // Navigate to next page
      navigate("/indemnity");
    }
  };

  // Get student name for displaying in the form
  const studentName = studentDetails ? JSON.parse(studentDetails).firstName + " " + JSON.parse(studentDetails).lastName : "Student";

  return (
    <div className="zen-container py-12 animate-fade-in">
      <h1 className="page-title mb-8">Physical Activity Readiness</h1>
      <div className="zen-card max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <ScrollArea className="h-[500px] rounded-md border p-4">
            <div className="prose prose-slate max-w-none">
              <h2 className="text-xl font-semibold">Physical Activity Readiness Questionnaire (PAR-Q)</h2>
              
              <p>I, <strong>{studentName}</strong>, acknowledge that:</p>
              
              <p className="font-medium">I hereby agree to complete, sign, and submit the Physical Activity Readiness Questionnaire (PAR-Q FORM) prior to attending my first class. I understand that failure to do so may result in being refused participation in any class activities.</p>
              
              <h3 className="text-lg font-semibold mt-6">Terms and Conditions</h3>
              
              <h4 className="font-medium">Acceptance of Terms</h4>
              <p>By attending classes, I acknowledge and agree to comply with the Terms and Conditions as set forth herein, as well as the accompanying School Disclaimer. These documents are binding and non-negotiable, and participation in ZenForce TaijiQuan SA training is contingent upon acceptance of these terms.</p>
              
              <h4 className="font-medium">Membership and Fees</h4>
              <ol className="list-lower-alpha pl-6">
                <li>Membership fees shall be calculated on a per-session basis, with a mandatory minimum of two (2) sessions per week. The current fee for each session is Eighty South African Rand (R80.00).</li>
                <li>I acknowledge that membership fees are non-refundable and must be paid in full prior to attending any class.</li>
                <li>ZenForce TaijiQuan SA reserves the right to amend the fee structure. Any increase in fees will be communicated to me no less than thirty (30) days prior to the effective date of such increase. Notification shall be provided via email and WhatsApp.</li>
              </ol>
              
              <h4 className="font-medium">Course Fees</h4>
              <p>All course fees are payable in advance of the relevant term, and I acknowledge that these fees are strictly non-refundable. In the event that ZenForce TaijiQuan SA cancels a scheduled class, the fee for the cancelled class will be credited and applied to the following term.</p>
              
              <h4 className="font-medium">Non-Attendance</h4>
              <p>I acknowledge that my absence from any class, for any reason, shall not entitle me to a refund, reduction, or credit of any kind unless such absence is due to a cancellation by Shifu Zaydien Williams or ZenForce TaijiQuan SA.</p>
              
              <h4 className="font-medium">Cancellation by Student</h4>
              <p>If I am unable to attend a scheduled class, I must notify ZenForce TaijiQuan SA in writing no later than one (1) hour prior to the start of the class. Failure to provide such notice will result in a late cancellation penalty of One Hundred and Eighty South African Rand (R180.00).</p>
              
              <h4 className="font-medium">Extended Absence</h4>
              <p>In the event of a prolonged absence, I acknowledge that any fees paid in advance will be applied to future classes once I resume attendance. Refunds for non-attendance will not be granted under any circumstances.</p>
              
              <h4 className="font-medium">Cancellation by Instructor</h4>
              <p>Should Shifu Zaydien Williams or ZenForce TaijiQuan SA cancel a scheduled class, I will be provided with advance notice where reasonably possible. Compensation for the cancelled class will be either through an additional training session or a credit applied to the next term's fees.</p>
              
              <h4 className="font-medium">Late Payment of Fees</h4>
              <ol className="list-lower-alpha pl-6">
                <li>All fees must be paid no later than the second day of training for the current week or month.</li>
                <li>Failure to comply with this payment schedule will result in a late fee of Fifty South African Rand (R50.00) per day until the outstanding amount is settled.</li>
              </ol>
              
              <h4 className="font-medium">Delinquent Accounts and Termination of Membership</h4>
              <p>In the event that my account remains unpaid for ninety (90) days or more, membership will be automatically cancelled, and my account will be referred to a third-party debt collection service. I agree to bear all costs associated with debt recovery, including but not limited to:</p>
              <ol className="list-lower-roman pl-6">
                <li>The full cost of collection services;</li>
                <li>The cost of ninety (90) days of training with additional interest of thirty-five percent (35%) on the overdue balance;</li>
                <li>Training costs calculated on a rolling thirty-day (30-day) basis, irrespective of calendar month divisions.</li>
              </ol>
              
              <h4 className="font-medium">Cancellation of Membership by Student</h4>
              <p>I may cancel my membership by providing a minimum of thirty (30) days' written notice to ZenForce TaijiQuan SA. If such notice is not provided, I will remain liable for the next full invoicing cycle.</p>
              
              <h4 className="font-medium">December Training</h4>
              <p>Regular training shall cease at the end of November each calendar year. Training during the month of December shall only be offered by appointment, subject to availability. Fees for December training must be paid no later than one (1) day prior to the scheduled class. No training will be permitted without advance payment.</p>
              
              <h4 className="font-medium">Dress Code</h4>
              <p>I shall adhere to the following dress code: loose, comfortable clothing and flat-soled shoes. The wearing of heels, sandals, or socks without shoes is strictly prohibited due to safety concerns. I am further advised to arrive punctually to ensure participation in warm-up exercises.</p>
              
              <h4 className="font-medium">Health and Safety</h4>
              <p>It is my responsibility to consult with a licensed medical practitioner prior to commencing training, especially if I suffer from any known medical conditions. Should there be any material change to my health or physical condition, it is incumbent upon me to notify the instructor immediately.</p>
              
              <h4 className="font-medium">Substitution of Instructors</h4>
              <p>ZenForce TaijiQuan SA reserves the right to substitute instructors in cases of illness, holiday, or unforeseen circumstances.</p>
              
              <h4 className="font-medium">Unauthorized Instruction</h4>
              <p>I shall not, without the prior written consent of ZenForce TaijiQuan SA, teach, instruct, or disseminate any of the school's proprietary Taijiquan training methods. Unauthorized teaching is grounds for immediate termination of membership.</p>
              
              <h4 className="font-medium">Communication</h4>
              <p>All official communications, including but not limited to notices regarding fee changes, class cancellations, and schedule changes, will be sent via email or WhatsApp. It is my responsibility to ensure that my contact information is current and accurate.</p>
              
              <h4 className="font-medium">Privacy and Data Protection</h4>
              <p>In compliance with the Protection of Personal Information Act (POPIA), ZenForce TaijiQuan SA will collect, store, and process my personal information solely for the purpose of administering the school's Taijiquan classes. My information will be held in strict confidence and will not be shared with any third party without my prior consent, except as required by law.</p>
              
              <h3 className="text-lg font-semibold mt-6">School Disclaimer</h3>
              
              <h4 className="font-medium">Medical Advice and Liability</h4>
              <p>I am strongly advised to seek medical advice from a licensed healthcare provider before commencing any physical activity with ZenForce TaijiQuan SA. Participation in Taijiquan classes is entirely at my own risk. ZenForce TaijiQuan SA and its instructors shall not be held liable for any injury, illness, or medical condition sustained by me as a result of participating in any classes.</p>
              
              <h4 className="font-medium">Home Practice Liability</h4>
              <p>I acknowledge that any practice conducted at home, outside of formal classes, is done so entirely at my own risk. ZenForce TaijiQuan SA bears no responsibility for any injury, damage, or harm resulting from my independent practice at home or any other location outside of the school's premises.</p>
              
              <h4 className="font-medium">Disclaimer of Warranties</h4>
              <p>ZenForce TaijiQuan SA makes no express or implied warranties or representations with respect to the accuracy, suitability, or safety of the exercises or training methods provided. I assume full responsibility for my participation and the application of the exercises taught.</p>
              
              <h4 className="font-medium">Limitation of Liability</h4>
              <p>In no event shall ZenForce TaijiQuan SA, its instructors, employees, or agents be liable for any direct, indirect, incidental, special, or consequential damages resulting from my participation in classes, the use of materials, or any temporary interruptions in the availability of classes. I acknowledge that interruptions due to technical issues are beyond the control of ZenForce TaijiQuan SA.</p>
              
              <h4 className="font-medium">Acknowledgment of Terms</h4>
              <p>By accepting below, I acknowledge that I have read, understood, and agreed to the above Terms & Conditions and School Disclaimer.</p>
            </div>
          </ScrollArea>
          
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="accept-terms" 
                checked={acceptTerms === true}
                onCheckedChange={handleAcceptChange} 
              />
              <Label 
                htmlFor="accept-terms"
                className="text-base font-semibold text-green-700"
              >
                I Accept the Terms and Conditions
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="reject-terms" 
                checked={rejectTerms === true}
                onCheckedChange={handleRejectChange}
              />
              <Label 
                htmlFor="reject-terms"
                className="text-base font-semibold text-red-700"
              >
                I Reject the Terms and Conditions
              </Label>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={() => navigate("/medical-condition")}>
              Back to Medical Information
            </Button>
            <Button type="submit" className="bg-accent-red hover:bg-accent-red/90 text-white">
              Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PhysicalReadiness;
