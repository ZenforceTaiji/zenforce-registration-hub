
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Camera, Upload, FileUp, X } from "lucide-react";
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

const Registration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const userAge = sessionStorage.getItem("userAge");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    identityNumber: "",
    mobile: "",
    telephone: "",
    email: "",
    physicalAddress: "",
    idPhoto: "",
  });

  // Check if age exists
  useEffect(() => {
    if (!userAge) {
      navigate("/");
    }
  }, [userAge, navigate]);

  // Cleanup camera stream when component unmounts
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  const isMinor = userAge ? parseInt(userAge) < 18 : false;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Save form data to session storage
    sessionStorage.setItem("studentDetails", JSON.stringify(formData));
    
    // For minors, proceed to parent details
    if (isMinor) {
      navigate("/parent-details");
    } else {
      // For adults, proceed to previous training
      navigate("/previous-training");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const processSelectedFile = (file: File) => {
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select an image less than 5MB",
        variant: "destructive",
      });
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File Type",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const base64String = event.target.result.toString();
        setPhotoPreview(base64String);
        setFormData(prev => ({ ...prev, idPhoto: base64String }));
        toast({
          title: "Photo Uploaded",
          description: "ID photo has been successfully uploaded",
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
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
        // Set canvas dimensions to match video
        canvasRef.current.width = cameraRef.current.videoWidth;
        canvasRef.current.height = cameraRef.current.videoHeight;
        
        // Draw video frame to canvas
        context.drawImage(cameraRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        
        // Convert canvas to image data URL
        const imageDataUrl = canvasRef.current.toDataURL('image/jpeg');
        setPhotoPreview(imageDataUrl);
        setFormData(prev => ({ ...prev, idPhoto: imageDataUrl }));
        
        // Close camera
        stopCamera();
        
        toast({
          title: "Photo Captured",
          description: "ID photo has been successfully captured",
        });
      }
    }
  };

  const handleDropboxUpload = () => {
    // In a real implementation, this would integrate with Dropbox API
    toast({
      description: "Dropbox integration would be implemented here",
    });
  };

  const handleGoogleDriveUpload = () => {
    // In a real implementation, this would integrate with Google Drive API
    toast({
      description: "Google Drive integration would be implemented here",
    });
  };

  const handleOneDriveUpload = () => {
    // In a real implementation, this would integrate with OneDrive API
    toast({
      description: "OneDrive integration would be implemented here",
    });
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    setFormData(prev => ({ ...prev, idPhoto: "" }));
  };

  return (
    <div className="zen-container py-12 animate-fade-in">
      <h1 className="page-title mb-8">Student Registration</h1>
      <div className="zen-card max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                required
              />
            </div>

            {!isMinor && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="identityNumber">Identity Number</Label>
                  <Input
                    id="identityNumber"
                    name="identityNumber"
                    value={formData.identityNumber}
                    onChange={handleChange}
                    placeholder="Enter your ID number"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telephone">Telephone</Label>
                  <Input
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    placeholder="Enter your telephone number"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="physicalAddress">Physical Address</Label>
                  <Input
                    id="physicalAddress"
                    name="physicalAddress"
                    value={formData.physicalAddress}
                    onChange={handleChange}
                    placeholder="Enter your physical address"
                  />
                </div>
              </>
            )}

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                value={userAge || ""}
                readOnly
                disabled
              />
            </div>

            {/* ID Photo Upload Section */}
            <div className="space-y-2 sm:col-span-2">
              <Label>ID Photo</Label>
              
              <div className="mt-2 flex items-center gap-4">
                {photoPreview ? (
                  <div className="relative w-32 h-32 border rounded-md overflow-hidden">
                    <img 
                      src={photoPreview} 
                      alt="ID Preview" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-32 h-32 border-2 border-dashed rounded-md flex items-center justify-center bg-slate-50">
                    <span className="text-sm text-slate-400">No photo</span>
                  </div>
                )}
                
                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
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
                          <DialogTitle>Take ID Photo</DialogTitle>
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
                        <DropdownMenuItem onClick={handleGoogleDriveUpload}>
                          Google Drive
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleOneDriveUpload}>
                          OneDrive
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDropboxUpload}>
                          Dropbox
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <p className="text-xs text-slate-500">
                    Upload a clear photo of your ID document. Max size: 5MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={() => navigate("/")}>
              Back to Home
            </Button>
            <Button type="submit" className="bg-accent-red hover:bg-accent-red/90 text-white">
              {isMinor ? "Proceed to Parent Details" : "Continue Registration"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
