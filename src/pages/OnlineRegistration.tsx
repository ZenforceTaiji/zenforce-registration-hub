
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Camera, Mic, Users, AlertTriangle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Link } from "react-router-dom";
import { TRAINING_PACKAGES } from "@/constants/financialRules";

const onlineRegFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  date: z.date({
    required_error: "Please select a date for your online session",
  }),
  time: z.string({
    required_error: "Please select a time for your online session",
  }),
  participants: z.number().min(1).max(TRAINING_PACKAGES.ONLINE.maxParticipantsPerDevice || 10),
  deviceCheck: z.boolean().refine(value => value === true, {
    message: "You must confirm you have a working camera and microphone"
  }),
  termsAccepted: z.boolean().refine(value => value === true, {
    message: "You must accept the terms and conditions to proceed"
  }),
});

type OnlineRegFormValues = z.infer<typeof onlineRegFormSchema>;

const OnlineRegistration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPARQCompleted, setIsPARQCompleted] = useState(false);

  // Available time slots (these could come from API later)
  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", 
    "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  // Check if PAR-Q form is completed
  useEffect(() => {
    const parQFormData = sessionStorage.getItem("parQForm");
    const parqCompleted = parQFormData ? JSON.parse(parQFormData).completed : false;
    setIsPARQCompleted(parqCompleted);
    
    if (!parqCompleted) {
      toast({
        title: "PAR-Q Required",
        description: "You must complete the Physical Activity Readiness Questionnaire before registration.",
        variant: "destructive",
      });
      navigate("/par-form");
    }
  }, [navigate, toast]);

  const form = useForm<OnlineRegFormValues>({
    resolver: zodResolver(onlineRegFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      participants: 1,
      deviceCheck: false,
      termsAccepted: false
    },
  });

  const onSubmit = async (data: OnlineRegFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Store form data in session storage
      sessionStorage.setItem("onlineRegistration", JSON.stringify({
        ...data,
        dateTime: `${format(data.date, "yyyy-MM-dd")} ${data.time}`,
        totalPrice: TRAINING_PACKAGES.ONLINE.price * data.participants / 100,
      }));
      
      // Success toast
      toast({
        title: "Registration Submitted",
        description: "Your online class registration has been received. You will be redirected to the payment page.",
      });
      
      // Navigate to payment or confirmation page
      setTimeout(() => {
        navigate("/online-payment");
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Error",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isPARQCompleted) {
    return (
      <div className="zen-container py-12">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertTriangle className="mx-auto h-12 w-12 text-amber-500" />
              <h2 className="mt-4 text-lg font-semibold">PAR-Q Form Required</h2>
              <p className="mt-2 text-gray-600">
                You must complete the Physical Activity Readiness Questionnaire before registering for online classes.
              </p>
              <Button 
                className="mt-4 bg-red-600 hover:bg-red-700" 
                onClick={() => navigate("/par-form")}
              >
                Complete PAR-Q Form
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="zen-container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-center">Online Class Registration</h1>
        <p className="text-center text-gray-600 mt-2 mb-8">
          Register for online relaxation, meditation, and health improvement sessions
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Online Class Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-6">
              <h3 className="text-blue-800 font-medium flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Online Class Information
              </h3>
              <ul className="mt-2 space-y-1 text-blue-700">
                <li>• Classes focused on relaxation, meditation, and health improvement</li>
                <li>• R{TRAINING_PACKAGES.ONLINE.price/100} per participant per session</li>
                <li>• Not eligible for grading or competitions</li>
                <li>• Camera and microphone required</li>
              </ul>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your first name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Separator />
                
                <h3 className="text-lg font-medium">Schedule Your Online Session</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Session Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(field.value, "PPP") : <span>Select a date</span>}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                              disabled={(date) => date < new Date() || date < new Date(new Date().setDate(new Date().getDate() - 1))}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Session Time</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a time slot" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="participants"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Participants</FormLabel>
                      <Select 
                        onValueChange={(value) => field.onChange(parseInt(value))} 
                        defaultValue={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select number of participants" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from({ length: TRAINING_PACKAGES.ONLINE.maxParticipantsPerDevice || 10 }, (_, i) => i + 1).map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num === 1 ? "1 participant" : `${num} participants`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Price: R{(TRAINING_PACKAGES.ONLINE.price * (field.value || 1) / 100).toFixed(2)}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="deviceCheck"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="flex items-center space-x-2">
                          <span>I confirm I have a working camera and microphone</span>
                          <div className="flex space-x-1">
                            <Camera className="h-4 w-4 text-green-600" />
                            <Mic className="h-4 w-4 text-green-600" />
                          </div>
                        </FormLabel>
                        <FormDescription>
                          Your device must have a working camera and microphone to participate in online classes.
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="termsAccepted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I accept the <Link to="/terms-and-conditions" className="text-blue-600 hover:underline" target="_blank">Terms and Conditions</Link>
                        </FormLabel>
                        <FormDescription>
                          By proceeding, you agree to our terms and conditions, including the specific provisions for online classes.
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate("/")}
                  >
                    Back to Home
                  </Button>
                  
                  <Button 
                    type="submit" 
                    className="bg-red-600 hover:bg-red-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Register for Online Class"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnlineRegistration;
