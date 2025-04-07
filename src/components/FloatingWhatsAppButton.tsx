
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingWhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

const FloatingWhatsAppButton = ({
  phoneNumber,
  message = "Hello, I'm interested in ZenForce TaijiQuan classes.",
}: FloatingWhatsAppButtonProps) => {
  // Format phone number (remove any non-digit characters)
  const formattedPhone = phoneNumber.replace(/\D/g, "");
  
  // Create WhatsApp URL
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
  
  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-20 right-6 z-50"
    >
      <Button 
        size="lg" 
        className="rounded-full bg-green-500 hover:bg-green-600 h-14 w-14 flex items-center justify-center shadow-lg"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Contact via WhatsApp</span>
      </Button>
    </a>
  );
};

export default FloatingWhatsAppButton;
