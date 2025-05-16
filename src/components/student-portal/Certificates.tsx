
import { useState } from "react";
import { 
  Card, 
  CardContent,
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown, Search, Award } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Empty array for certificates data
const sampleCertificates = [];

const Certificates = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handlePreview = (certificate: any) => {
    setSelectedCertificate(certificate);
    setPreviewOpen(true);
  };

  return (
    <div>
      {sampleCertificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleCertificates.map((certificate) => (
            <Card key={certificate.id} className="overflow-hidden">
              <div className="aspect-video relative overflow-hidden bg-gray-100">
                <img
                  src={certificate.imageUrl}
                  alt={certificate.title}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-accent-red text-white text-xs px-2 py-1 rounded-full">
                    {certificate.date}
                  </span>
                </div>
              </div>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-lg">{certificate.title}</h3>
                    <p className="text-sm text-gray-500">{certificate.date}</p>
                  </div>
                  <Award className="h-5 w-5 text-amber-500" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => handlePreview(certificate)}>
                  <Search className="h-4 w-4" />
                  Preview
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <FileDown className="h-4 w-4" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border rounded-lg bg-gray-50">
          <Award className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-800">No Certificates Available</h3>
          <p className="text-gray-500 mt-1">You haven't earned any certificates yet</p>
        </div>
      )}

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedCertificate?.title}
            </DialogTitle>
            <DialogDescription>
              Issued on {selectedCertificate?.date}
            </DialogDescription>
          </DialogHeader>
          
          {selectedCertificate && (
            <div className="overflow-hidden rounded-lg border">
              <img 
                src={selectedCertificate.imageUrl} 
                alt={selectedCertificate.title} 
                className="w-full h-auto object-contain"
              />
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewOpen(false)}>
              Close
            </Button>
            <Button>
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Certificates;
