
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { FileUp, Save, Upload } from "lucide-react";

const UploadId = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [idDocument, setIdDocument] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select a file less than 10MB",
          variant: "destructive",
        });
        return;
      }

      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setIdDocument(event.target.result.toString());
          setIsUploading(false);
          toast({
            title: "Document Uploaded",
            description: "ID document has been successfully uploaded",
          });
        }
      };
      reader.onerror = () => {
        setIsUploading(false);
        toast({
          title: "Upload Failed",
          description: "There was a problem uploading your document",
          variant: "destructive",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSaveForLater = () => {
    if (idDocument) {
      sessionStorage.setItem("idDocument", idDocument);
      toast({
        title: "Progress Saved",
        description: "Your ID document has been saved. You can continue later.",
      });
    }
    navigate("/");
  };

  const handleContinue = () => {
    if (!idDocument) {
      toast({
        title: "ID Document Required",
        description: "Please upload your ID document before continuing",
        variant: "destructive",
      });
      return;
    }
    
    sessionStorage.setItem("idDocument", idDocument);
    navigate("/indemnity");
  };

  return (
    <div className="zen-container py-12 animate-fade-in">
      <h1 className="page-title mb-4">Upload Identification Document</h1>
      <div className="text-center text-gray-600 mb-8">
        <p>Please upload a copy of your ID document or passport</p>
      </div>
      
      <div className="zen-card max-w-3xl mx-auto">
        <div className="space-y-6">
          <div className="p-6 border rounded-md bg-slate-50">
            <div className="space-y-4">
              <Label htmlFor="id-document" className="text-lg font-medium">
                Identity Document or Passport
              </Label>
              
              <div className="flex flex-col gap-4">
                <input
                  ref={fileInputRef}
                  id="id-document"
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                
                <Button
                  type="button"
                  onClick={triggerFileInput}
                  variant="outline"
                  className="w-fit flex items-center gap-2"
                  disabled={isUploading}
                >
                  <Upload className="h-4 w-4" />
                  {isUploading ? "Uploading..." : "Choose File"}
                </Button>
                
                {idDocument && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-10 w-10 flex items-center justify-center bg-green-100 text-green-600 rounded-full">
                      <FileUp className="h-5 w-5" />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Document uploaded successfully</p>
                      <p className="text-slate-500 text-xs">Ready to continue</p>
                    </div>
                  </div>
                )}
              </div>
              
              <p className="text-xs text-slate-500">
                Accepted formats: JPG, PNG, PDF. Max file size: 10MB
              </p>
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
                onClick={() => navigate("/medical-condition")}
              >
                Back
              </Button>
              <Button 
                type="button" 
                onClick={handleContinue}
                className="bg-accent-red hover:bg-accent-red/90 text-white"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadId;
