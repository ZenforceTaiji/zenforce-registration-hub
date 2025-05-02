
import { useState } from "react";

interface UseImageUploadOptions {
  maxSizeMB?: number;
  allowedTypes?: string[];
}

interface UseImageUploadResult {
  uploadImage: (file: File) => Promise<string>;
  isUploading: boolean;
  error: string | null;
}

/**
 * Hook for client-side image upload handling
 * Note: This is for local development only and doesn't actually upload to a server
 */
export const useImageUpload = (options: UseImageUploadOptions = {}): UseImageUploadResult => {
  const { 
    maxSizeMB = 5,
    allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
  } = options;
  
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File): Promise<string> => {
    setIsUploading(true);
    setError(null);
    
    try {
      // Validate file type
      if (!allowedTypes.includes(file.type)) {
        throw new Error(`Invalid file type. Allowed types: ${allowedTypes.join(", ")}`);
      }
      
      // Validate file size
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxSizeMB) {
        throw new Error(`File size exceeds the ${maxSizeMB}MB limit`);
      }

      // In development mode, we just create a local URL
      // In production, this would be replaced with actual server upload logic
      const imageUrl = URL.createObjectURL(file);
      
      console.log(`Image processed locally: ${file.name}`);
      
      return imageUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to upload image";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadImage,
    isUploading,
    error
  };
};
