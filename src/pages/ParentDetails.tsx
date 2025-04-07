
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Camera, Upload, FileUp, X, Plus } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";

const ParentDetails = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const userAge = sessionStorage.getItem("userAge");
  const studentDetails = sessionStorage.getItem("studentDetails");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [isIdCard, setIsIdCard] = useState(false);
  
  const [formData, setFormData] = useState({
    parentName: "",
    parentSurname: "",
    parentIdentityNumber: "",
    parentMobile: "",
    parentTelephone: "",
    parentEmail: "",
    parentPhysicalAddress: "",
    idPhotoFront: "",
    idPhotoBack: "",
  });

  // Check if required session data exists and validate age
  useEffect(() => {
    // Only show this page for users who selected "child" (under 18)
    if (!userAge) {
      navigate("/");
      return;
    }
    
    if (userAge !== "child") {
      // If user is adult, redirect to previous training page
      navigate("/previous-training");
      return;
    }
    
    if (!studentDetails) {
      // If student details not found, redirect to registration page
      navigate("/registration");
      return;
    }
    
    // Load saved parent details if they exist
    const savedData = sessionStorage.getItem("parentDetails");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, [userAge, studentDetails, navigate]);

  // Cleanup camera stream when component unmounts
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.parentName || !formData.parentSurname || !formData.parentMobile) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Check if ID photo is uploaded
    if (!formData.idPhotoFront) {
      toast({
        title: "ID Document Required",
        description: "Please upload at least the front of your ID document",
        variant: "destructive",
      });
      return;
    }

    // If ID card is selected but back is not uploaded
    if (isIdCard && !formData.idPhotoBack) {
      toast({
        title: "ID Card Back Required",
        description: "Please upload both front and back of your ID card",
        variant: "destructive",
      });
      return;
    }

    // Save form data to session storage
    sessionStorage.setItem("parentDetails", JSON.stringify(formData));
    sessionStorage.setItem("multipleChildren", JSON.stringify([]));
    
    // Navigate to add children or previous training page
    navigate("/add-children");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, side: 'front' | 'back') => {
    const file = e.target.files?.[0];
    if (file) {
      processSelectedFile(file, side);
    }
  };

  const processSelectedFile = (file: File, side: 'front' | 'back') => {
    // Check file size (limit to 20MB)
    if (file.size > 20 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select a file less than 20MB",
        variant: "destructive",
      });
      return;
    }

    // Check file type (allow images and PDF)
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
        if (side === 'front') {
          setFormData(prev => ({ ...prev, idPhotoFront: base64String }));
        } else {
          setFormData(prev => ({ ...prev, idPhotoBack: base64String }));
        }
        
        toast({
          title: "Document Uploaded",
          description: `ID document ${side} has been successfully uploaded`,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = (side: 'front' | 'back') => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('data-side', side);
      fileInputRef.current.click();
    }
  };

  const startCamera = async (side: 'front' | 'back') => {
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
        cameraRef.current.setAttribute('data-side', side);
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
      const side = cameraRef.current.getAttribute('data-side') as 'front' | 'back';
      const context = canvasRef.current.getContext('2d');
      
      if (context) {
        // Set canvas dimensions to match video
        canvasRef.current.width = cameraRef.current.videoWidth;
        canvasRef.current.height = cameraRef.current.videoHeight;
        
        // Draw video frame to canvas
        context.drawImage(cameraRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        
        // Convert canvas to image data URL
        const imageDataUrl = canvasRef.current.toDataURL('image/jpeg');
        
        if (side === 'front') {
          setFormData(prev => ({ ...prev, idPhotoFront: imageDataUrl }));
        } else {
          setFormData(prev => ({ ...prev, idPhotoBack: imageDataUrl }));
        }
        
        // Close camera
        stopCamera();
        
        toast({
          title: "Photo Captured",
          description: `ID document ${side} has been successfully captured`,
        });
      }
    }
  };

  const handleCloudUpload = (service: string, side: 'front' | 'back') => {
    // In a real implementation, this would integrate with cloud service APIs
    toast({
      description: `${service} integration would be implemented here for ${side} upload`,
    });
  };

  const removePhoto = (side: 'front' | 'back') => {
    if (side === 'front') {
      setFormData(prev => ({ ...prev, idPhotoFront: "" }));
    } else {
      setFormData(prev => ({ ...prev, idPhotoBack: "" }));
    }
  };

  const renderUploadSection = (side: 'front' | 'back') => {
    const photoPreview = side === 'front' ? formData.idPhotoFront : formData.idPhotoBack;
    const title = side === 'front' ? "Front" : "Back";
    
    return (
      <div className="space-y-2">
        <Label>{title} of ID Document {side === 'front' && '*'}</Label>
        
        <div className="mt-2 flex items-center gap-4">
          {photoPreview ? (
            <div className="relative w-32 h-32 border rounded-md overflow-hidden">
              {photoPreview.startsWith('data:image') ? (
                <img 
                  src={photoPreview} 
                  alt={`ID ${title}`} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-500">
                  <p className="text-xs text-center p-2">PDF Document<br/>Uploaded</p>
                </div>
              )}
              <button
                type="button"
                onClick={() => removePhoto(side)}
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
              ref={side === 'front' ? fileInputRef : null}
              className="hidden"
              accept="image/*,application/pdf"
              onChange={(e) => handleFileUpload(e, side)}
            />
            
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => triggerFileInput(side)}
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
                    <DialogTitle>Take ID Document {title} Photo</DialogTitle>
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
                        <Button type="button" onClick={() => startCamera(side)}>
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
                  <DropdownMenuItem onClick={() => handleCloudUpload("Google Drive", side)}>
                    Google Drive
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCloudUpload("OneDrive", side)}>
                    OneDrive
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCloudUpload("Dropbox", side)}>
                    Dropbox
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <p className="text-xs text-slate-500">
              Upload a clear photo or scan of your ID document. Max size: 20MB
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="zen-container py-12 animate-fade-in">
      <h1 className="page-title mb-8">Parent/Guardian Details</h1>
      <div className="zen-card max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="parentName">Name *</Label>
              <Input
                id="parentName"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                placeholder="Enter parent/guardian's name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="parentSurname">Surname *</Label>
              <Input
                id="parentSurname"
                name="parentSurname"
                value={formData.parentSurname}
                onChange={handleChange}
                placeholder="Enter parent/guardian's surname"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="parentIdentityNumber">Identity Number</Label>
              <Input
                id="parentIdentityNumber"
                name="parentIdentityNumber"
                value={formData.parentIdentityNumber}
                onChange={handleChange}
                placeholder="Enter ID number"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="parentMobile">Mobile *</Label>
              <Input
                id="parentMobile"
                name="parentMobile"
                value={formData.parentMobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="parentTelephone">Telephone</Label>
              <Input
                id="parentTelephone"
                name="parentTelephone"
                value={formData.parentTelephone}
                onChange={handleChange}
                placeholder="Enter telephone number"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="parentEmail">Email</Label>
              <Input
                id="parentEmail"
                name="parentEmail"
                type="email"
                value={formData.parentEmail}
                onChange={handleChange}
                placeholder="Enter email address"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="parentPhysicalAddress">Physical Address</Label>
              <Input
                id="parentPhysicalAddress"
                name="parentPhysicalAddress"
                value={formData.parentPhysicalAddress}
                onChange={handleChange}
                placeholder="Enter physical address"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-lg font-medium mb-4">ID Document</h3>
            
            <div className="flex items-center space-x-2 mb-4">
              <Checkbox 
                id="idCardCheckbox" 
                checked={isIdCard}
                onCheckedChange={(checked) => setIsIdCard(checked as boolean)}
              />
              <Label 
                htmlFor="idCardCheckbox" 
                className="text-sm font-normal cursor-pointer"
              >
                My ID is a card (requires both front and back photos)
              </Label>
            </div>
            
            <div className="space-y-6">
              {renderUploadSection('front')}
              
              {isIdCard && renderUploadSection('back')}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={() => navigate("/registration")}>
              Back to Student Details
            </Button>
            <Button type="submit" className="bg-accent-red hover:bg-accent-red/90 text-white">
              Continue to Add Children
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ParentDetails;
