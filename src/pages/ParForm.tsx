import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Camera, Upload, FileUp, X, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

interface ParQFormData {
  heartCondition: string;
  chestPain: string;
  loseBalance: string;
  jointProblems: string;
  takingPrescription: string;
  otherReason: string;
  medicalLetter: string;
  additionalNotes: string;
  completed: boolean;
}

const defaultFormData: ParQFormData = {
  heartCondition: "",
  chestPain: "",
  loseBalance: "",
  jointProblems: "",
  takingPrescription: "",
  otherReason: "",
  medicalLetter: "",
  additionalNotes: "",
  completed: false
};

const ParForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  
  const savedFormData = sessionStorage.getItem("parQForm");
  const initialFormData = savedFormData ? JSON.parse(savedFormData) : defaultFormData;
  
  const [formData, setFormData] = useState<ParQFormData>(initialFormData);

  useEffect(() => {
    console.log("ParForm submit button rendering");
  }, []);

  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  const handleChange = (key: keyof ParQFormData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveForLater = () => {
    sessionStorage.setItem("parQForm", JSON.stringify(formData));
    
    toast({
      title: "Progress Saved",
      description: "Your PAR-Q form progress has been saved. You can continue later.",
    });
    
    navigate("/");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredFields: Array<keyof ParQFormData> = [
      "heartCondition", 
      "chestPain", 
      "loseBalance", 
      "jointProblems", 
      "takingPrescription", 
      "otherReason"
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Required Fields",
        description: "Please answer all health questions before proceeding",
        variant: "destructive",
      });
      return;
    }
    
    const hasYesAnswers = requiredFields.some(field => formData[field] === "yes");
    
    if (hasYesAnswers && !formData.medicalLetter) {
      toast({
        title: "Medical Letter Required",
        description: "You've answered 'Yes' to one or more health questions. Please upload a medical clearance letter.",
        variant: "destructive",
      });
      return;
    }
    
    const completedFormData = { ...formData, completed: true };
    sessionStorage.setItem("parQForm", JSON.stringify(completedFormData));
    
    toast({
      title: "PAR-Q Form Completed",
      description: "Your Physical Activity Readiness form has been successfully submitted. Now you can proceed with registration.",
    });
    
    navigate("/registration");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const processSelectedFile = (file: File) => {
    if (file.size > 20 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select a file less than 20MB",
        variant: "destructive",
      });
      return;
    }

    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      toast({
        title: "Invalid File Type",
        description: "Please select an image or PDF file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const base64String = event.target.result.toString();
        setFormData(prev => ({ ...prev, medicalLetter: base64String }));
        
        toast({
          title: "Document Uploaded",
          description: "Medical letter has been successfully uploaded",
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const startCamera = async () => {
    try {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: "user",
          width: { ideal: 640 },
          height: { ideal: 480 }
        } 
      });
      
      if (cameraRef.current) {
        cameraRef.current.srcObject = stream;
      }
      
      setCameraStream(stream);
      setCameraActive(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast({
        title: "Camera Error",
        description: "Could not access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (cameraRef.current && canvasRef.current && cameraStream) {
      const context = canvasRef.current.getContext('2d');
      
      if (context) {
        canvasRef.current.width = cameraRef.current.videoWidth;
        canvasRef.current.height = cameraRef.current.videoHeight;
        
        context.drawImage(cameraRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        
        const imageDataUrl = canvasRef.current.toDataURL('image/jpeg');
        setFormData(prev => ({ ...prev, medicalLetter: imageDataUrl }));
        
        stopCamera();
        
        toast({
          title: "Photo Captured",
          description: "Medical letter has been successfully captured",
        });
      }
    }
  };

  const handleCloudUpload = (service: string) => {
    toast({
      description: `${service} integration would be implemented here for medical letter upload`,
    });
  };

  const removeDocument = () => {
    setFormData(prev => ({ ...prev, medicalLetter: "" }));
  };

  return (
    <div className="zen-container py-12 animate-fade-in">
      <h1 className="page-title mb-4">Step 1: Physical Activity Readiness Questionnaire</h1>
      <div className="text-center text-gray-600 mb-8">
        <p>You must complete this health questionnaire before proceeding with registration</p>
      </div>
      
      <div className="zen-card max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <ScrollArea className="h-[200px] rounded-md border p-4 mb-6">
            <div className="prose prose-slate max-w-none">
              <h2 className="text-xl font-semibold mb-4">PAR-Q Instructions</h2>
              <p>
                Physical activity is healthy and safe for most people. This PAR-Q will tell you if you should check with your doctor before you start exercising or becoming much more physically active.
              </p>
              <p>
                If you are planning to become much more physically active than you are now, start by answering the questions below. This will help determine if you're ready for physical activity or if you should consult with your doctor first.
              </p>
              <p>
                If you answer "YES" to one or more questions, please upload a clearance letter from your doctor before proceeding with the registration.
              </p>
              <p className="font-medium text-red-600">
                Note: If your health changes after completing this form, please consult a healthcare professional before continuing with physical activity.
              </p>
            </div>
          </ScrollArea>
        
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Health Questions</h3>
              
              <div className="p-4 border rounded-md bg-slate-50">
                <p className="font-medium mb-3">Has a doctor ever said that you have a heart condition and that you should only do physical activity recommended by a doctor?</p>
                <RadioGroup 
                  value={formData.heartCondition} 
                  onValueChange={(value) => handleChange("heartCondition", value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="heart-yes" />
                    <Label htmlFor="heart-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="heart-no" />
                    <Label htmlFor="heart-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="p-4 border rounded-md bg-slate-50">
                <p className="font-medium mb-3">Do you feel pain in your chest when you do physical activity?</p>
                <RadioGroup 
                  value={formData.chestPain} 
                  onValueChange={(value) => handleChange("chestPain", value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="chest-yes" />
                    <Label htmlFor="chest-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="chest-no" />
                    <Label htmlFor="chest-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="p-4 border rounded-md bg-slate-50">
                <p className="font-medium mb-3">Do you lose your balance because of dizziness or do you ever lose consciousness?</p>
                <RadioGroup 
                  value={formData.loseBalance} 
                  onValueChange={(value) => handleChange("loseBalance", value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="balance-yes" />
                    <Label htmlFor="balance-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="balance-no" />
                    <Label htmlFor="balance-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="p-4 border rounded-md bg-slate-50">
                <p className="font-medium mb-3">Do you have a bone or joint problem that could be made worse by a change in your physical activity?</p>
                <RadioGroup 
                  value={formData.jointProblems} 
                  onValueChange={(value) => handleChange("jointProblems", value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="joint-yes" />
                    <Label htmlFor="joint-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="joint-no" />
                    <Label htmlFor="joint-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="p-4 border rounded-md bg-slate-50">
                <p className="font-medium mb-3">Are you currently taking prescription drugs for blood pressure or heart condition?</p>
                <RadioGroup 
                  value={formData.takingPrescription} 
                  onValueChange={(value) => handleChange("takingPrescription", value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="meds-yes" />
                    <Label htmlFor="meds-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="meds-no" />
                    <Label htmlFor="meds-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="p-4 border rounded-md bg-slate-50">
                <p className="font-medium mb-3">Do you know of any other reason why you should not participate in physical activity?</p>
                <RadioGroup 
                  value={formData.otherReason} 
                  onValueChange={(value) => handleChange("otherReason", value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="other-yes" />
                    <Label htmlFor="other-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="other-no" />
                    <Label htmlFor="other-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Medical Clearance Letter</h3>
              <p className="text-sm text-slate-600">
                If you answered YES to any of the questions above, please upload a clearance letter from your doctor.
              </p>
              
              <div className="p-4 border rounded-md">
                <p className="mb-3 text-sm">Upload Medical Letter:</p>
                
                <div className="flex items-start gap-4">
                  {formData.medicalLetter ? (
                    <div className="relative w-32 h-32 border rounded-md overflow-hidden">
                      {formData.medicalLetter.startsWith('data:image') ? (
                        <img 
                          src={formData.medicalLetter} 
                          alt="Medical Letter" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-500">
                          <p className="text-xs text-center p-2">PDF Document<br/>Uploaded</p>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={removeDocument}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-32 h-32 border-2 border-dashed rounded-md flex items-center justify-center bg-slate-50">
                      <span className="text-sm text-slate-400">No document</span>
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*,application/pdf"
                      onChange={handleFileUpload}
                    />
                    
                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={triggerFileInput}
                        className="flex items-center gap-1"
                      >
                        <FileUp className="h-4 w-4" />
                        Upload File
                      </Button>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <Camera className="h-4 w-4" />
                            Use Camera
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Take Medical Letter Photo</DialogTitle>
                          </DialogHeader>
                          <div className="flex flex-col space-y-4">
                            <div className="relative bg-black rounded-md overflow-hidden h-80">
                              {cameraActive ? (
                                <video
                                  ref={cameraRef}
                                  autoPlay
                                  playsInline
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-white">
                                  <p>Camera inactive</p>
                                </div>
                              )}
                              <canvas ref={canvasRef} className="hidden" />
                            </div>
                            
                            <div className="flex justify-between">
                              {!cameraActive ? (
                                <Button type="button" onClick={startCamera}>
                                  Start Camera
                                </Button>
                              ) : (
                                <>
                                  <Button type="button" variant="outline" onClick={stopCamera}>
                                    Cancel
                                  </Button>
                                  <Button type="button" onClick={capturePhoto}>
                                    Capture Photo
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <Upload className="h-4 w-4" />
                            Cloud Upload
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <DropdownMenuItem onClick={() => handleCloudUpload("Google Drive")}>
                            Google Drive
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleCloudUpload("OneDrive")}>
                            OneDrive
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleCloudUpload("Dropbox")}>
                            Dropbox
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <p className="text-xs text-slate-500">
                      Upload a clear photo or scan of your medical clearance letter. Max size: 20MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
              <Textarea
                id="additionalNotes"
                value={formData.additionalNotes}
                onChange={(e) => handleChange("additionalNotes", e.target.value)}
                placeholder="Enter any additional health information here..."
                className="h-24"
              />
            </div>
          </div>

          <div className="flex justify-between pt-6 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleSaveForLater}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save & Continue Later
            </Button>
            <div className="flex gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-accent-red hover:bg-accent-red/90 text-white p-4 z-10 relative"
                style={{ display: 'block', visibility: 'visible' }}
              >
                Submit and Continue to Registration
              </Button>
            </div>
          </div>
        </form>
      </div>
      
      <div className="text-center mt-4 text-gray-400 text-sm">
        Form end marker
      </div>
    </div>
  );
};

export default ParForm;
