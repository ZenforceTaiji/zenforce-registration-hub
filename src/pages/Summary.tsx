import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Check, X } from "lucide-react";
import emailjs from 'emailjs-com';

interface StudentDetails {
  firstName: string;
  lastName: string;
  identityNumber?: string;
  mobile?: string;
  telephone?: string;
  email?: string;
  physicalAddress?: string;
  idPhoto?: string;
}

interface ParentDetails {
  parentName: string;
  parentSurname: string;
  parentIdentityNumber?: string;
  parentMobile: string;
  parentTelephone?: string;
  parentEmail?: string;
  parentPhysicalAddress?: string;
  idPhotoFront?: string;
  idPhotoBack?: string;
}

interface ChildDetails {
  id: string;
  firstName: string;
  lastName: string;
  age: string;
  identityNumber?: string;
  birthCertificate?: string;
}

interface TrainingEntry {
  id: string;
  style: string;
  instructor: string;
  institute: string;
  grade: string;
  lastDate: string;
}

interface MedicalConditionEntry {
  id: string;
  name: string;
  lastCheckup: string;
  nextCheckup: string;
}

interface MedicationEntry {
  id: string;
  name: string;
  reason: string;
  dosage: string;
}

const Summary = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const userAge = sessionStorage.getItem("userAge");
  const [membershipNumber, setMembershipNumber] = useState("");
  const [additionalMembershipNumbers, setAdditionalMembershipNumbers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [studentDetails, setStudentDetails] = useState<StudentDetails | null>(null);
  const [parentDetails, setParentDetails] = useState<ParentDetails | null>(null);
  const [additionalChildren, setAdditionalChildren] = useState<ChildDetails[]>([]);
  const [previousTraining, setPreviousTraining] = useState<{
    hasPrevious: string;
    entries: TrainingEntry[];
  } | null>(null);
  const [medicalConditions, setMedicalConditions] = useState<{
    hasMedical: string;
    entries: MedicalConditionEntry[];
  } | null>(null);
  const [medications, setMedications] = useState<{
    takesMeds: string;
    entries: MedicationEntry[];
  } | null>(null);
  const [parQFormData, setParQFormData] = useState<any>(null);
  const [parqAccepted, setParqAccepted] = useState<boolean>(false);
  const [indemnityAccepted, setIndemnityAccepted] = useState<boolean>(false);
  const [popiaAccepted, setPopiaAccepted] = useState<boolean>(false);

  useEffect(() => {
    const generateMemberNumber = () => {
      const randomDigits = Math.floor(1000 + Math.random() * 9000);
      return `ZF${randomDigits}`;
    };

    setMembershipNumber(generateMemberNumber());
    
    const childrenData = sessionStorage.getItem("multipleChildren");
    if (childrenData) {
      const children = JSON.parse(childrenData);
      if (children && children.length > 0) {
        const childMembershipNumbers: Record<string, string> = {};
        children.forEach((child: ChildDetails) => {
          childMembershipNumbers[child.id] = generateMemberNumber();
        });
        setAdditionalMembershipNumbers(childMembershipNumbers);
      }
    }
  }, []);

  useEffect(() => {
    if (!userAge) {
      navigate("/");
      return;
    }
    
    const studentData = sessionStorage.getItem("studentDetails");
    if (studentData) {
      setStudentDetails(JSON.parse(studentData));
    }
    
    if (parseInt(userAge) < 18) {
      const parentData = sessionStorage.getItem("parentDetails");
      if (parentData) {
        setParentDetails(JSON.parse(parentData));
      } else {
        navigate("/parent-details");
        return;
      }
    }
    
    const childrenData = sessionStorage.getItem("multipleChildren");
    if (childrenData) {
      setAdditionalChildren(JSON.parse(childrenData));
    }
    
    const trainingData = sessionStorage.getItem("previousTraining");
    if (trainingData) {
      setPreviousTraining(JSON.parse(trainingData));
    }
    
    const medicalData = sessionStorage.getItem("medicalConditions");
    if (medicalData) {
      setMedicalConditions(JSON.parse(medicalData));
    }
    
    const medicationData = sessionStorage.getItem("medications");
    if (medicationData) {
      setMedications(JSON.parse(medicationData));
    }
    
    const parQData = sessionStorage.getItem("parQForm");
    if (parQData) {
      setParQFormData(JSON.parse(parQData));
    } else {
      navigate("/par-form");
      return;
    }
    
    const parq = sessionStorage.getItem("parqAccepted");
    setParqAccepted(parq === "true");
    
    const indemnity = sessionStorage.getItem("indemnityAccepted");
    setIndemnityAccepted(indemnity === "true");
    
    const popia = sessionStorage.getItem("popiaAccepted");
    setPopiaAccepted(popia === "true");
    
  }, [userAge, navigate]);

  useEffect(() => {
    const checkForExistingMembership = () => {
      const email = studentDetails?.email || parentDetails?.parentEmail;
      if (email) {
        const storedEmail = localStorage.getItem("userEmail");
        if (storedEmail === email) {
          const existingMembership = localStorage.getItem("membershipNumber");
          if (existingMembership) {
            localStorage.setItem("existingMembershipFound", "true");
            sessionStorage.setItem("existingMembership", existingMembership);
          }
        }
      }
    };
    
    if (studentDetails) {
      checkForExistingMembership();
    }
  }, [studentDetails, parentDetails]);

  const sendStudentConfirmationEmail = async () => {
    if (!studentDetails) return;
    
    const previousTrainingText = previousTraining 
      ? previousTraining.hasPrevious === 'yes'
        ? `Yes, ${previousTraining.entries.map(e => e.style).join(', ')}`
        : 'No previous training'
      : 'Not specified';

    const medicalConditionsText = medicalConditions
      ? medicalConditions.hasMedical === 'yes'
        ? `Yes, ${medicalConditions.entries.map(e => e.name).join(', ')}`
        : 'No medical conditions'
      : 'Not specified';

    const additionalChildrenText = additionalChildren.length > 0
      ? `Yes, ${additionalChildren.length} additional ${additionalChildren.length === 1 ? 'child' : 'children'}`
      : 'No additional children';

    const emailToUse = studentDetails.email || 
      (parentDetails ? parentDetails.parentEmail : null);

    if (!emailToUse) {
      console.log("No email address available for sending confirmation");
      return;
    }

    const templateParams = {
      to_email: emailToUse,
      name: studentDetails.firstName,
      surname: studentDetails.lastName,
      identityNumber: studentDetails.identityNumber || 'Not provided',
      mobile: studentDetails.mobile || (parentDetails ? parentDetails.parentMobile : 'Not provided'),
      telephone: studentDetails.telephone || (parentDetails ? parentDetails.parentTelephone : 'Not provided'),
      email: emailToUse,
      physicalAddress: studentDetails.physicalAddress || (parentDetails ? parentDetails.parentPhysicalAddress : 'Not provided'),
      dateOfBirth: 'Not provided',
      parentName: parentDetails ? `${parentDetails.parentName} ${parentDetails.parentSurname}` : 'Not applicable',
      parentContact: parentDetails ? parentDetails.parentMobile : 'Not applicable',
      previousTraining: previousTrainingText,
      medicalConditions: medicalConditionsText,
      indemnityAccepted: indemnityAccepted ? 'Yes' : 'No',
      popiaAccepted: popiaAccepted ? 'Yes' : 'No',
      membershipNumber: membershipNumber,
      additionalChildren: additionalChildrenText
    };

    try {
      const response = await emailjs.send(
        'service_vh484fl',
        'template_d4o59f2',
        templateParams,
        'tc6-vGIjp7zf67CWM'
      );
      console.log('Student email sent successfully!', response.status, response.text);
    } catch (error) {
      console.error('Failed to send student email:', error);
    }
  };

  const sendInstructorNotificationEmail = async () => {
    if (!studentDetails) return;

    const emailToDisplay = studentDetails.email || 
      (parentDetails ? parentDetails.parentEmail : 'Not provided');

    const templateParams = {
      name: studentDetails.firstName,
      surname: studentDetails.lastName,
      email: emailToDisplay,
      membershipNumber: membershipNumber
    };

    try {
      const response = await emailjs.send(
        'service_vh484fl',
        'template_01wbmwi',
        templateParams,
        'tc6-vGIjp7zf67CWM'
      );
      console.log('Instructor email sent successfully!', response.status, response.text);
    } catch (error) {
      console.error('Failed to send instructor email:', error);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      sessionStorage.setItem("membershipNumber", membershipNumber);
      localStorage.setItem("membershipNumber", membershipNumber);
      
      if (studentDetails?.email) {
        localStorage.setItem("userEmail", studentDetails.email);
      } else if (parentDetails?.parentEmail) {
        localStorage.setItem("userEmail", parentDetails.parentEmail);
      }
      
      if (additionalChildren.length > 0) {
        sessionStorage.setItem("additionalMembershipNumbers", JSON.stringify(additionalMembershipNumbers));
      }
      
      const tempPassword = `Temp${membershipNumber}`;
      sessionStorage.setItem("tempPassword", tempPassword);
      
      await sendStudentConfirmationEmail();
      await sendInstructorNotificationEmail();
      
      navigate("/completion");
    } catch (error) {
      console.error("Error during submission:", error);
      toast({
        title: "Registration Error",
        description: "There was an error completing your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!studentDetails || !parQFormData) {
    return <div className="zen-container py-12">Loading...</div>;
  }

  return (
    <div className="zen-container py-12 animate-fade-in">
      <h1 className="page-title mb-8">Registration Summary</h1>
      
      <div className="mb-6 rounded-md bg-slate-50 p-4 border">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <p className="text-sm text-slate-500">Membership Number</p>
            <p className="text-2xl font-bold text-accent-red">{membershipNumber}</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <p className="text-sm text-slate-500">Registration Date</p>
            <p className="font-medium">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-slate-500">First Name</p>
                <p className="font-medium">{studentDetails.firstName}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Last Name</p>
                <p className="font-medium">{studentDetails.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Age</p>
                <p className="font-medium">{userAge} years</p>
              </div>
              
              {studentDetails.identityNumber && (
                <div>
                  <p className="text-sm text-slate-500">Identity Number</p>
                  <p className="font-medium">{studentDetails.identityNumber}</p>
                </div>
              )}
            </div>
            
            {(studentDetails.mobile || studentDetails.telephone || studentDetails.email) && (
              <>
                <Separator />
                <div className="space-y-2">
                  <p className="text-sm text-slate-500 font-medium">Contact Information</p>
                  
                  {studentDetails.mobile && (
                    <div>
                      <p className="text-sm text-slate-500">Mobile</p>
                      <p className="font-medium">{studentDetails.mobile}</p>
                    </div>
                  )}
                  
                  {studentDetails.telephone && (
                    <div>
                      <p className="text-sm text-slate-500">Telephone</p>
                      <p className="font-medium">{studentDetails.telephone}</p>
                    </div>
                  )}
                  
                  {studentDetails.email && (
                    <div>
                      <p className="text-sm text-slate-500">Email</p>
                      <p className="font-medium">{studentDetails.email}</p>
                    </div>
                  )}
                </div>
              </>
            )}
            
            {studentDetails.physicalAddress && (
              <>
                <Separator />
                <div>
                  <p className="text-sm text-slate-500">Physical Address</p>
                  <p className="font-medium">{studentDetails.physicalAddress}</p>
                </div>
              </>
            )}

            {studentDetails.idPhoto && (
              <>
                <Separator />
                <div>
                  <p className="text-sm text-slate-500 mb-2">ID Photo</p>
                  <div className="w-32 h-32 border rounded-md overflow-hidden">
                    <img 
                      src={studentDetails.idPhoto} 
                      alt="ID" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        
        {parentDetails && (
          <Card>
            <CardHeader>
              <CardTitle>Parent/Guardian Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-slate-500">Name</p>
                  <p className="font-medium">{parentDetails.parentName}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Surname</p>
                  <p className="font-medium">{parentDetails.parentSurname}</p>
                </div>
                
                {parentDetails.parentIdentityNumber && (
                  <div>
                    <p className="text-sm text-slate-500">Identity Number</p>
                    <p className="font-medium">{parentDetails.parentIdentityNumber}</p>
                  </div>
                )}
              </div>
              
              <Separator />
              <div className="space-y-2">
                <p className="text-sm text-slate-500 font-medium">Contact Information</p>
                
                <div>
                  <p className="text-sm text-slate-500">Mobile</p>
                  <p className="font-medium">{parentDetails.parentMobile}</p>
                </div>
                
                {parentDetails.parentTelephone && (
                  <div>
                    <p className="text-sm text-slate-500">Telephone</p>
                    <p className="font-medium">{parentDetails.parentTelephone}</p>
                  </div>
                )}
                
                {parentDetails.parentEmail && (
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="font-medium">{parentDetails.parentEmail}</p>
                  </div>
                )}
              </div>
              
              {parentDetails.parentPhysicalAddress && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm text-slate-500">Physical Address</p>
                    <p className="font-medium">{parentDetails.parentPhysicalAddress}</p>
                  </div>
                </>
              )}
              
              {parentDetails.idPhotoFront && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm text-slate-500 mb-2">ID Document</p>
                    <div className="flex gap-4">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Front</p>
                        <div className="w-32 h-32 border rounded-md overflow-hidden">
                          {parentDetails.idPhotoFront.startsWith('data:image') ? (
                            <img 
                              src={parentDetails.idPhotoFront} 
                              alt="ID Front" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-500">
                              <p className="text-xs text-center p-2">PDF Document</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {parentDetails.idPhotoBack && (
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Back</p>
                          <div className="w-32 h-32 border rounded-md overflow-hidden">
                            {parentDetails.idPhotoBack.startsWith('data:image') ? (
                              <img 
                                src={parentDetails.idPhotoBack} 
                                alt="ID Back" 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-500">
                                <p className="text-xs text-center p-2">PDF Document</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}
        
        {additionalChildren.length > 0 && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Additional Children</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {additionalChildren.map((child) => (
                  <div key={child.id} className="p-4 border rounded-md">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{child.firstName} {child.lastName}</h4>
                        <p className="text-sm text-slate-500">Age: {child.age} years</p>
                      </div>
                      <div className="bg-slate-100 text-xs text-slate-700 py-1 px-2 rounded">
                        {additionalMembershipNumbers[child.id] || "Pending"}
                      </div>
                    </div>
                    
                    {child.identityNumber && (
                      <div className="mt-2">
                        <p className="text-xs text-slate-500">ID Number</p>
                        <p className="text-sm">{child.identityNumber}</p>
                      </div>
                    )}
                    
                    {child.birthCertificate && (
                      <div className="mt-2">
                        <p className="text-xs text-slate-500 mb-1">Birth Certificate</p>
                        <div className="w-16 h-16 border rounded-md overflow-hidden">
                          {child.birthCertificate.startsWith('data:image') ? (
                            <img 
                              src={child.birthCertificate} 
                              alt="Birth Certificate" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-500">
                              <p className="text-xs text-center">PDF</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {previousTraining && (
          <Card>
            <CardHeader>
              <CardTitle>Previous Training</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500 mb-2">Previous Martial Arts Training?</p>
              <p className="font-medium capitalize mb-4">{previousTraining.hasPrevious}</p>
              
              {previousTraining.hasPrevious === "yes" && previousTraining.entries.length > 0 && (
                <div className="space-y-4 mt-4">
                  {previousTraining.entries.map((entry, index) => (
                    <div key={entry.id} className="p-3 border rounded-md bg-slate-50">
                      <p className="text-sm font-medium text-slate-700 mb-2">Training #{index + 1}</p>
                      
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div>
                          <p className="text-xs text-slate-500">Style</p>
                          <p>{entry.style || "N/A"}</p>
                        </div>
                        
                        <div>
                          <p className="text-xs text-slate-500">Instructor</p>
                          <p>{entry.instructor || "N/A"}</p>
                        </div>
                        
                        <div>
                          <p className="text-xs text-slate-500">Institute</p>
                          <p>{entry.institute || "N/A"}</p>
                        </div>
                        
                        <div>
                          <p className="text-xs text-slate-500">Grade</p>
                          <p>{entry.grade || "N/A"}</p>
                        </div>
                        
                        <div className="col-span-2">
                          <p className="text-xs text-slate-500">Last Training Date</p>
                          <p>{new Date(entry.lastDate).toLocaleDateString() || "N/A"}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
        
        {medicalConditions && (
          <Card>
            <CardHeader>
              <CardTitle>Medical Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-slate-500 mb-2">Medical Conditions?</p>
                <p className="font-medium capitalize">{medicalConditions.hasMedical}</p>
                
                {medicalConditions.hasMedical === "yes" && medicalConditions.entries.length > 0 && (
                  <div className="space-y-3 mt-3">
                    {medicalConditions.entries.map((entry, index) => (
                      <div key={entry.id} className="p-3 border rounded-md bg-slate-50">
                        <p className="text-sm font-medium text-slate-700 mb-2">Condition #{index + 1}</p>
                        
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div>
                            <p className="text-xs text-slate-500">Condition Name</p>
                            <p>{entry.name}</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <p className="text-xs text-slate-500">Last Checkup</p>
                              <p>{new Date(entry.lastCheckup).toLocaleDateString()}</p>
                            </div>
                            
                            {entry.nextCheckup && (
                              <div>
                                <p className="text-xs text-slate-500">Next Checkup</p>
                                <p>{new Date(entry.nextCheckup).toLocaleDateString()}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <Separator />
              
              {medications && (
                <div>
                  <p className="text-sm text-slate-500 mb-2">Medications?</p>
                  <p className="font-medium capitalize">{medications.takesMeds}</p>
                  
                  {medications.takesMeds === "yes" && medications.entries.length > 0 && (
                    <div className="space-y-3 mt-3">
                      {medications.entries.map((entry, index) => (
                        <div key={entry.id} className="p-3 border rounded-md bg-slate-50">
                          <p className="text-sm font-medium text-slate-700 mb-2">Medication #{index + 1}</p>
                          
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            <div>
                              <p className="text-xs text-slate-500">Medication Name</p>
                              <p>{entry.name}</p>
                            </div>
                            
                            <div>
                              <p className="text-xs text-slate-500">Dosage</p>
                              <p>{entry.dosage}</p>
                            </div>
                            
                            {entry.reason && (
                              <div className="col-span-2">
                                <p className="text-xs text-slate-500">Reason</p>
                                <p>{entry.reason}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
      
      <div className="max-w-3xl mx-auto mb-8">
        <h2 className="text-xl font-semibold mb-4">Physical Activity Readiness (PAR-Q)</h2>
        <Card className="overflow-hidden">
          <CardHeader className="bg-slate-50">
            <CardTitle>PAR-Q Responses</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <p className="text-sm text-slate-500">Heart Condition</p>
                  <p className="font-medium capitalize">{parQFormData.heartCondition || "Not answered"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Chest Pain</p>
                  <p className="font-medium capitalize">{parQFormData.chestPain || "Not answered"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Balance/Dizziness Issues</p>
                  <p className="font-medium capitalize">{parQFormData.loseBalance || "Not answered"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Joint Problems</p>
                  <p className="font-medium capitalize">{parQFormData.jointProblems || "Not answered"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Blood Pressure/Heart Medication</p>
                  <p className="font-medium capitalize">{parQFormData.takingPrescription || "Not answered"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Other Reasons</p>
                  <p className="font-medium capitalize">{parQFormData.otherReason || "Not answered"}</p>
                </div>
              </div>
              
              {parQFormData.medicalLetter && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-slate-500 mb-2">Medical Clearance Letter</p>
                  <div className="w-32 h-32 border rounded-md overflow-hidden">
                    {parQFormData.medicalLetter.startsWith('data:image') ? (
                      <img 
                        src={parQFormData.medicalLetter} 
                        alt="Medical Letter" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-500">
                        <p className="text-xs text-center p-2">PDF Document</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {parQFormData.additionalNotes && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-slate-500 mb-1">Additional Notes</p>
                  <p className="text-sm">{parQFormData.additionalNotes}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="max-w-3xl mx-auto mb-8">
        <h2 className="text-xl font-semibold mb-4">Consents and Agreements</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-md flex items-center gap-3">
            <div className={`rounded-full p-1 ${parQFormData.completed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              {parQFormData.completed ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
            </div>
            <div>
              <p className="font-medium">PAR-Q Form</p>
              <p className="text-sm text-slate-500">{parQFormData.completed ? 'Completed' : 'Incomplete'}</p>
            </div>
          </div>

          <div className="p-4 border rounded-md flex items-center gap-3">
            <div className={`rounded-full p-1 ${parqAccepted ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              {parqAccepted ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
            </div>
            <div>
              <p className="font-medium">Physical Activity Readiness</p>
              <p className="text-sm text-slate-500">{parqAccepted ? 'Accepted' : 'Rejected'}</p>
            </div>
          </div>
        
          <div className="p-4 border rounded-md flex items-center gap-3">
            <div className={`rounded-full p-1 ${indemnityAccepted ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              {indemnityAccepted ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
            </div>
            <div>
              <p className="font-medium">Indemnity Agreement</p>
              <p className="text-sm text-slate-500">{indemnityAccepted ? 'Accepted' : 'Rejected'}</p>
            </div>
          </div>
          
          <div className="p-4 border rounded-md flex items-center gap-3">
            <div className={`rounded-full p-1 ${popiaAccepted ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              {popiaAccepted ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
            </div>
            <div>
              <p className="font-medium">POPIA Consent</p>
              <p className="text-sm text-slate-500">{popiaAccepted ? 'Accepted' : 'Rejected'}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto mt-8">
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => navigate("/popia")}>
            Back to POPIA Consent
          </Button>
          <Button 
            onClick={handleSubmit} 
            className="bg-accent-red hover:bg-accent-red/90 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Registration"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
