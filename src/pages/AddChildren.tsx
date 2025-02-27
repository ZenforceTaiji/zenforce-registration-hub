
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Camera, Upload, FileUp, X, Plus, Trash2, Edit, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ChildData {
  id: string;
  firstName: string;
  lastName: string;
  age: string;
  identityNumber?: string;
  birthCertificate?: string;
}

const AddChildren = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingChildId, setEditingChildId] = useState<string | null>(null);
  
  const [children, setChildren] = useState<ChildData[]>([]);
  const [mainChild, setMainChild] = useState<ChildData | null>(null);
  
  const [childForm, setChildForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    identityNumber: "",
    birthCertificate: "",
  });

  // Check if required session data exists
  useEffect(() => {
    const parentDetails = sessionStorage.getItem("parentDetails");
    const userAge = sessionStorage.getItem("userAge");
    const studentDetails = sessionStorage.getItem("studentDetails");
    
    if (!parentDetails || !userAge || !studentDetails) {
      navigate("/");
      return;
    }
    
    // Load main child details
    if (studentDetails) {
      const student = JSON.parse(studentDetails);
      setMainChild({
        id: "main",
        firstName: student.firstName,
        lastName: student.lastName,
        age: userAge || "",
        identityNumber: student.identityNumber || "",
        birthCertificate: "",
      });
    }
    
    // Load any existing additional children
    const existingChildren = sessionStorage.getItem("multipleChildren");
    if (existingChildren) {
      setChildren(JSON.parse(existingChildren));
    }
  }, [navigate]);

  // Cleanup camera stream when component unmounts
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  const handleChildFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChildForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem("multipleChildren", JSON.stringify(children));
    navigate("/previous-training");
  };

  const handleAddChild = () => {
    if (!childForm.firstName || !childForm.lastName || !childForm.age) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (!childForm.birthCertificate) {
      toast({
        title: "Birth Certificate Required",
        description: "Please upload a birth certificate or ID document for the child",
        variant: "destructive",
      });
      return;
    }
    
    const newChild: ChildData = {
      id: editingChildId || Date.now().toString(),
      firstName: childForm.firstName,
      lastName: childForm.lastName,
      age: childForm.age,
      identityNumber: childForm.identityNumber,
      birthCertificate: childForm.birthCertificate,
    };
    
    if (editingChildId) {
      // Update existing child
      setChildren(prev => prev.map(child => child.id === editingChildId ? newChild : child));
      setEditingChildId(null);
      toast({
        title: "Child Updated",
        description: `${newChild.firstName}'s information has been updated`,
      });
    } else {
      // Add new child
      setChildren(prev => [...prev, newChild]);
      toast({
        title: "Child Added",
        description: `${newChild.firstName} has been added to your registration`,
      });
    }
    
    // Reset form
    setChildForm({
      firstName: "",
      lastName: "",
      age: "",
      identityNumber: "",
      birthCertificate: "",
    });
    
    setDialogOpen(false);
  };

  const handleEditChild = (child: ChildData) => {
    setChildForm({
      firstName: child.firstName,
      lastName: child.lastName,
      age: child.age,
      identityNumber: child.identityNumber || "",
      birthCertificate: child.birthCertificate || "",
    });
    setEditingChildId(child.id);
    setDialogOpen(true);
  };

  const handleRemoveChild = (id: string) => {
    setChildren(prev => prev.filter(child => child.id !== id));
    toast({
      title: "Child Removed",
      description: "The child has been removed from your registration",
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const processSelectedFile = (file: File) => {
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
        setChildForm(prev => ({ ...prev, birthCertificate: base64String }));
        
        toast({
          title: "Document Uploaded",
          description: "Birth certificate has been successfully uploaded",
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
        setChildForm(prev => ({ ...prev, birthCertificate: imageDataUrl }));
        
        // Close camera
        stopCamera();
        
        toast({
          title: "Photo Captured",
          description: "Birth certificate has been successfully captured",
        });
      }
    }
  };

  const handleCloudUpload = (service: string) => {
    // In a real implementation, this would integrate with cloud service APIs
    toast({
      description: `${service} integration would be implemented here`,
    });
  };

  const removeDocument = () => {
    setChildForm(prev => ({ ...prev, birthCertificate: "" }));
  };

  const renderChildCard = (child: ChildData, isMain: boolean = false) => (
    <Card key={child.id} className={`overflow-hidden ${isMain ? 'border-accent-red' : ''}`}>
      {isMain && (
        <div className="bg-accent-red text-white text-xs py-1 px-2 text-center">
          Primary Student
        </div>
      )}
      <CardHeader className={isMain ? 'pt-3' : 'pt-4'}>
        <CardTitle className="flex items-center justify-between">
          <span>{child.firstName} {child.lastName}</span>
          {!isMain && (
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleEditChild(child)} 
                className="h-8 w-8 text-slate-500 hover:text-slate-700"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleRemoveChild(child.id)} 
                className="h-8 w-8 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-xs text-slate-500">Age</p>
            <p>{child.age} years</p>
          </div>
          
          {child.identityNumber && (
            <div>
              <p className="text-xs text-slate-500">ID Number</p>
              <p>{child.identityNumber}</p>
            </div>
          )}
          
          {!isMain && child.birthCertificate && (
            <div className="col-span-2 mt-2">
              <p className="text-xs text-slate-500 mb-1">Birth Certificate</p>
              {child.birthCertificate.startsWith('data:image') ? (
                <div className="w-16 h-16 border rounded-md overflow-hidden">
                  <img 
                    src={child.birthCertificate} 
                    alt="Birth Certificate" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 flex items-center justify-center border rounded-md bg-slate-100 text-slate-500">
                  <p className="text-xs text-center">PDF Document</p>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="zen-container py-12 animate-fade-in">
      <h1 className="page-title mb-8">Add Children</h1>
      
      <div className="max-w-2xl mx-auto mb-8">
        <div className="zen-card mb-8">
          <h2 className="text-xl font-semibold mb-4">Children</h2>
          
          {mainChild && (
            <div className="mb-6">
              {renderChildCard(mainChild, true)}
            </div>
          )}
          
          {children.length > 0 && (
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-medium">Additional Children</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {children.map(child => renderChildCard(child))}
              </div>
            </div>
          )}
          
          <Button 
            onClick={() => {
              setEditingChildId(null);
              setDialogOpen(true);
            }}
            className="w-full sm:w-auto flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Add Another Child
          </Button>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{editingChildId ? "Edit Child" : "Add Child"}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={childForm.firstName}
                    onChange={handleChildFormChange}
                    placeholder="Enter first name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={childForm.lastName}
                    onChange={handleChildFormChange}
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={childForm.age}
                    onChange={handleChildFormChange}
                    placeholder="Enter age"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="identityNumber">Identity Number</Label>
                  <Input
                    id="identityNumber"
                    name="identityNumber"
                    value={childForm.identityNumber}
                    onChange={handleChildFormChange}
                    placeholder="Enter ID number"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Birth Certificate *</Label>
                
                <div className="mt-2 flex items-center gap-4">
                  {childForm.birthCertificate ? (
                    <div className="relative w-32 h-32 border rounded-md overflow-hidden">
                      {childForm.birthCertificate.startsWith('data:image') ? (
                        <img 
                          src={childForm.birthCertificate} 
                          alt="Birth Certificate" 
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
                            <DialogTitle>Take Birth Certificate Photo</DialogTitle>
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
                      Upload a clear photo or scan of the birth certificate. Max size: 20MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="button" onClick={handleAddChild}>
                {editingChildId ? "Update Child" : "Add Child"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mt-8">
            <Button type="button" variant="outline" onClick={() => navigate("/parent-details")}>
              Back to Parent Details
            </Button>
            <Button type="submit" className="bg-accent-red hover:bg-accent-red/90 text-white">
              Continue to Previous Training
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChildren;
