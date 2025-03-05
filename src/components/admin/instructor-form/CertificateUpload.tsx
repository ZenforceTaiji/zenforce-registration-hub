
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Upload } from "lucide-react";

interface CertificateUploadProps {
  certificateFile: File | null;
  setCertificateFile: React.Dispatch<React.SetStateAction<File | null>>;
  onCertificateUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CertificateUpload: React.FC<CertificateUploadProps> = ({
  certificateFile,
  onCertificateUpload
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-2">
      <Label htmlFor="certificate">Instructor Certificate</Label>
      <div className="grid grid-cols-1 gap-2">
        <div className="flex items-center gap-2">
          <Input 
            id="certificate" 
            type="file"
            ref={fileInputRef}
            onChange={onCertificateUpload}
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
          />
          <Button 
            type="button" 
            variant="outline" 
            className="w-full flex items-center gap-2"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4" />
            {certificateFile ? 'Change Certificate' : 'Upload Certificate'}
          </Button>
          {certificateFile && (
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <FileText className="h-4 w-4" />
              {certificateFile.name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificateUpload;
