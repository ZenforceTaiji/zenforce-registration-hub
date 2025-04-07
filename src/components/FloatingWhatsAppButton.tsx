
import { MessageCircle, Video, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface FloatingWhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  isExistingUser?: boolean;
}

const FloatingWhatsAppButton = ({
  phoneNumber,
  message,
  isExistingUser = false,
}: FloatingWhatsAppButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Format phone number (remove any non-digit characters)
  const formattedPhone = phoneNumber.replace(/\D/g, "");

  // Set default messages based on whether user is existing or new
  const defaultMessage = isExistingUser
    ? "Hello, Welcome back to Zenforce TaijiQuan SA, How may we help you?"
    : "Hello, Welcome to Zenforce TaijiQuan SA, How may we help you?";
  
  // Use provided message or default based on user status
  const whatsappMessage = message || defaultMessage;
  
  // Create WhatsApp URLs
  const whatsappChatUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(whatsappMessage)}`;
  const whatsappVideoUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent("I would like to start a video call for assistance with ZenForce TaijiQuan.")}`;
  const whatsappCallUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent("I would like to start a voice call for assistance with ZenForce TaijiQuan.")}`;
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            size="lg" 
            className="rounded-full bg-green-500 hover:bg-green-600 h-14 w-14 flex items-center justify-center shadow-lg"
          >
            <MessageCircle className="h-6 w-6 text-white" />
            <span className="sr-only">Contact Support</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="rounded-t-xl w-full sm:max-w-md mx-auto">
          <SheetHeader className="text-left pb-2">
            <SheetTitle>Need assistance?</SheetTitle>
            <SheetDescription>
              Connect with us via WhatsApp for immediate support
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <a 
              href={whatsappChatUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center p-3 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <MessageCircle className="h-5 w-5 mr-3 text-green-500" />
              <div>
                <div className="font-medium">Chat with us</div>
                <div className="text-sm text-gray-500">Send a message via WhatsApp</div>
              </div>
            </a>
            <a 
              href={whatsappVideoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center p-3 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Video className="h-5 w-5 mr-3 text-green-500" />
              <div>
                <div className="font-medium">Video Call</div>
                <div className="text-sm text-gray-500">Start a WhatsApp video call</div>
              </div>
            </a>
            <a 
              href={whatsappCallUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center p-3 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Phone className="h-5 w-5 mr-3 text-green-500" />
              <div>
                <div className="font-medium">Voice Call</div>
                <div className="text-sm text-gray-500">Start a WhatsApp voice call</div>
              </div>
            </a>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FloatingWhatsAppButton;
