
import React, { useState } from "react";
import { MessageCircle, Video, Phone, Whale } from "lucide-react";
import { Button } from "@/components/ui/button";
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
            className="rounded-full bg-green-500 hover:bg-green-600 h-14 w-14 flex items-center justify-center shadow-lg p-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5l1.5-2.5 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>
              <path d="M16 4a3 3 0 0 1 3 3v8.5"/>
              <path d="M16 16a3 3 0 0 0 3-3"/>
            </svg>
            <span className="sr-only">Contact Support via WhatsApp</span>
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
