
import { ScrollArea } from "@/components/ui/scroll-area";
import { TRAINING_PACKAGES } from "@/constants/financialRules";

const TermsAndConditions = () => {
  return (
    <div className="zen-container py-12">
      <h1 className="text-2xl font-bold text-center mb-8">Terms & Conditions</h1>
      
      <ScrollArea className="h-[80vh] border rounded-md p-6 bg-slate-50">
        <div className="prose prose-slate max-w-none">
          <h4 className="text-lg font-medium">Physical Activity Readiness</h4>
          <p>
            The Student hereby agrees to complete, sign, and submit the Physical Activity Readiness Questionnaire (hereinafter referred to as the "PAR-Q FORM") prior to attending their first class. Failure to do so may result in the Student being refused participation in any class activities.
          </p>
          
          <h4 className="text-lg font-medium mt-6">Acceptance of Terms</h4>
          <p>
            By attending classes, the Student acknowledges and agrees to comply with the Terms and Conditions as set forth herein, as well as the accompanying School Disclaimer. These documents are binding and non-negotiable, and participation in ZenForce TaijiQuan SA training is contingent upon acceptance of these terms.
          </p>
          
          <h4 className="text-lg font-medium mt-6">Membership and Fees</h4>
          <div className="space-y-2">
            <p>Training packages and fees are structured as follows:</p>
            <ul className="list-disc pl-6 space-y-2">
              {Object.entries(TRAINING_PACKAGES).map(([key, pkg]) => (
                <li key={key}>
                  <strong>{pkg.name}</strong> ({pkg.schedule}): R{pkg.price / 100} per {key === 'ONLINE' ? 'participant' : 'session'}
                  {pkg.minSessions > 1 && ` (minimum ${pkg.minSessions} sessions per week)`}
                  {pkg.isOutdoor && ` - ${pkg.location ? `Outdoor training in ${pkg.location}` : 'Outdoor training'}`}
                  {key === 'ONLINE' && " - By appointment only"}
                </li>
              ))}
            </ul>
            <p>
              The Student acknowledges that membership fees are non-refundable and must be paid in full prior to attending any class.
            </p>
          </div>
          
          <h4 className="text-lg font-medium mt-6">Online Class Special Provisions</h4>
          <p>
            For Students participating in online classes, the following additional provisions apply:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Online classes are available for relaxation, meditation, and health improvement purposes only.
            </li>
            <li>
              Students enrolled in online classes are not eligible for grading or participation in competitions.
            </li>
            <li>
              Online class fees are charged per participant per session (R{TRAINING_PACKAGES.ONLINE.price / 100} per participant).
            </li>
            <li>
              Classes are conducted by appointment only and subject to instructor availability.
            </li>
            <li>
              Students must have a functioning webcam and microphone for participation.
            </li>
            <li>
              The number of participants present during the online session must match the number registered and paid for. The Student acknowledges that the ZenForce system may use camera access to verify participant count.
            </li>
            <li>
              If additional participants are detected beyond the number registered, the class may be terminated without refund, or additional fees may be charged retrospectively.
            </li>
          </ul>
          
          <h4 className="text-lg font-medium mt-6">Course Fees</h4>
          <p>
            All course fees are payable in advance of the relevant term, and the Student acknowledges that these fees are strictly non-refundable. In the event that ZenForce TaijiQuan SA cancels a scheduled class, the fee for the cancelled class will be credited and applied to the following term.
          </p>
          
          <h4 className="text-lg font-medium mt-6">Non-Attendance</h4>
          <p>
            The Student acknowledges that their absence from any class, for any reason, shall not entitle them to a refund, reduction, or credit of any kind unless such absence is due to a cancellation by Shifu Zaydien Williams or ZenForce TaijiQuan SA.
          </p>
          
          <h4 className="text-lg font-medium mt-6">Cancellation by Student</h4>
          <p>
            If the Student is unable to attend a scheduled class, the Student must notify ZenForce TaijiQuan SA in writing no later than one (1) hour prior to the start of the class. Failure to provide such notice will result in a late cancellation penalty of One Hundred and Eighty South African Rand (R180.00).
          </p>
          
          <h4 className="text-lg font-medium mt-6">Extended Absence</h4>
          <p>
            In the event of a prolonged absence, the Student acknowledges that any fees paid in advance will be applied to future classes once the Student resumes attendance. Refunds for non-attendance will not be granted under any circumstances.
          </p>
          
          <h4 className="text-lg font-medium mt-6">Cancellation by Instructor</h4>
          <p>
            Should Shifu Zaydien Williams or ZenForce TaijiQuan SA cancel a scheduled class, the Student will be provided with advance notice where reasonably possible. Compensation for the cancelled class will be either through an additional training session or a credit applied to the next term's fees.
          </p>
          
          <h4 className="text-lg font-medium mt-6">Late Payment of Fees</h4>
          <p>
            a. All fees must be paid no later than the second day of training for the current week or month.<br />
            b. Failure to comply with this payment schedule will result in a late fee of Fifty South African Rand (R50.00) per day until the outstanding amount is settled.
          </p>
          
          <h4 className="text-lg font-medium mt-6">Delinquent Accounts and Termination of Membership</h4>
          <p>
            In the event that the Student's account remains unpaid for ninety (90) days or more, membership will be automatically cancelled, and the Student's account will be referred to a third-party debt collection service. The Student agrees to bear all costs associated with debt recovery, including but not limited to:<br />
            i. The full cost of collection services;<br />
            ii. The cost of ninety (90) days of training with additional interest of thirty-five percent (35%) on the overdue balance;<br />
            iii. Training costs calculated on a rolling thirty-day (30-day) basis, irrespective of calendar month divisions.
          </p>
          
          <h4 className="text-lg font-medium mt-6">Cancellation of Membership by Student</h4>
          <p>
            The Student may cancel their membership by providing a minimum of thirty (30) days' written notice to ZenForce TaijiQuan SA. If such notice is not provided, the Student will remain liable for the next full invoicing cycle.
          </p>
          
          <h4 className="text-lg font-medium mt-6">December Training</h4>
          <p>
            Regular training shall cease at the end of November each calendar year. Training during the month of December shall only be offered by appointment, subject to availability. Fees for December training must be paid no later than one (1) day prior to the scheduled class. No training will be permitted without advance payment.
          </p>
          
          <h4 className="text-lg font-medium mt-6">Dress Code</h4>
          <p>
            The Student shall adhere to the following dress code: loose, comfortable clothing and flat-soled shoes. The wearing of heels, sandals, or socks without shoes is strictly prohibited due to safety concerns. The Student is further advised to arrive punctually to ensure participation in warm-up exercises.
          </p>
          
          <h4 className="text-lg font-medium mt-6">Dress Code for Females</h4>
          <p>
            Female Students are required to wear appropriate training attire that ensures comfort, safety, and freedom of movement. Acceptable clothing options include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Traditional Kung Fu suit</li>
            <li>Loose-fitting clothes (not excessively baggy)</li>
            <li>Yoga outfit</li>
            <li>Any dedicated training outfit suitable for martial arts</li>
          </ul>
          <p className="mt-2 font-semibold text-red-600">
            IMPORTANT: Female Students MUST wear a sports bra during training. This is crucial due to the dynamic movements, jumping, and physical activities involved in Taijiquan training to prevent discomfort or potential injury.
          </p>
          
          <h4 className="text-lg font-medium mt-6">Health and Safety</h4>
          <p>
            It is the responsibility of the Student to consult with a licensed medical practitioner prior to commencing training, especially if the Student suffers from any known medical conditions. Should there be any material change to the Student's health or physical condition, it is incumbent upon the Student to notify the instructor immediately.
          </p>
          
          <h4 className="text-lg font-medium mt-6">Substitution of Instructors</h4>
          <p>
            ZenForce TaijiQuan SA reserves the right to substitute instructors in cases of illness, holiday, or unforeseen circumstances.
          </p>
          
          <h4 className="text-lg font-medium mt-6">Unauthorized Instruction</h4>
          <p>
            No Student shall, without the prior written consent of ZenForce TaijiQuan SA, teach, instruct, or disseminate any of the school's proprietary Taijiquan training methods. Unauthorized teaching is grounds for immediate termination of membership.
          </p>
          
          <h4 className="text-lg font-medium mt-6">Communication</h4>
          <p>
            All official communications, including but not limited to notices regarding fee changes, class cancellations, and schedule changes, will be sent via email or WhatsApp. It is the responsibility of the Student to ensure that their contact information is current and accurate.
          </p>
          
          <h4 className="text-lg font-medium mt-6">Privacy and Data Protection</h4>
          <p>
            In compliance with the Protection of Personal Information Act (POPIA), ZenForce Taijiquan SA will collect, store, and process the Student's personal information solely for the purpose of administering the school's Taijiquan classes. The Student's information will be held in strict confidence and will not be shared with any third party without the Student's prior consent, except as required by law.
          </p>
          
          <h3 className="text-lg font-medium mt-6">School Disclaimer</h3>
          
          <h4 className="text-lg font-medium mt-4">Medical Advice and Liability</h4>
          <p>
            The Student is strongly advised to seek medical advice from a licensed healthcare provider before commencing any physical activity with ZenForce Taijiquan SA. Participation in Taijiquan classes is entirely at the Student's own risk. ZenForce Taijiquan SA and its instructors shall not be held liable for any injury, illness, or medical condition sustained by the Student as a result of participating in any classes.
          </p>
          
          <h4 className="text-lg font-medium mt-6">Home Practice Liability</h4>
          <p>
            The Student acknowledges that any practice conducted at home, outside of formal classes, is done so entirely at their own risk. ZenForce Taijiquan SA bears no responsibility for any injury, damage, or harm resulting from the Student's independent practice at home or any other location outside of the school's premises.
          </p>
          
          <h4 className="text-lg font-medium mt-6">Disclaimer of Warranties</h4>
          <p>
            ZenForce Taijiquan SA makes no express or implied warranties or representations with respect to the accuracy, suitability, or safety of the exercises or training methods provided. The Student assumes full responsibility for their participation and the application of the exercises taught.
          </p>
          
          <h4 className="text-lg font-medium mt-6">Limitation of Liability</h4>
          <p>
            In no event shall ZenForce Taijiquan SA, its instructors, employees, or agents be liable for any direct, indirect, incidental, special, or consequential damages resulting from the Student's participation in classes, the use of materials, or any temporary interruptions in the availability of classes. The Student acknowledges that interruptions due to technical issues are beyond the control of ZenForce Taijiquan SA.
          </p>
        </div>
      </ScrollArea>
    </div>
  );
};

export default TermsAndConditions;
