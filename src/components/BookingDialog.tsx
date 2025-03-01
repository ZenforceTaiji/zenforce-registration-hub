
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, User } from "lucide-react";

interface Instructor {
  id: number;
  name: string;
  specialties: string[];
}

interface TimeSlot {
  id: number;
  time: string;
}

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date: Date;
  instructor: Instructor;
  timeSlot: TimeSlot;
}

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  participants: string;
  notes: string;
}

const BookingDialog = ({ open, onOpenChange, date, instructor, timeSlot }: BookingDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    participants: "1",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Submit booking (in a real app, this would send data to a server)
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      
      toast({
        title: "Booking confirmed!",
        description: `Your session has been booked for ${date.toLocaleDateString()} at ${timeSlot.time}`,
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        participants: "1",
        notes: ""
      });
    }, 1500);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Complete Your Booking</DialogTitle>
          <DialogDescription>
            Please provide your information to confirm your booking.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <h3 className="font-medium mb-2 text-sm">Booking Summary</h3>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="text-gray-500">Date:</div>
              <div className="col-span-2 font-medium flex items-center">
                <Calendar className="mr-1 h-4 w-4 text-gray-500" />
                {date.toLocaleDateString()}
              </div>
              <div className="text-gray-500">Time:</div>
              <div className="col-span-2 font-medium flex items-center">
                <Clock className="mr-1 h-4 w-4 text-gray-500" />
                {timeSlot.time}
              </div>
              <div className="text-gray-500">Instructor:</div>
              <div className="col-span-2 font-medium flex items-center">
                <User className="mr-1 h-4 w-4 text-gray-500" />
                {instructor.name}
              </div>
            </div>
          </div>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="required">Full Name</Label>
              <Input 
                id="name" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="required">Email</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone" className="required">Phone Number</Label>
                <Input 
                  id="phone" 
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="participants">Number of Participants</Label>
              <Input 
                id="participants" 
                name="participants"
                type="number"
                min="1"
                max="10"
                value={formData.participants}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="notes">Special Requests or Notes</Label>
              <Textarea 
                id="notes" 
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any special requests or additional information"
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Confirm Booking"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
