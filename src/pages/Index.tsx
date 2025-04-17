
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { RegistrationDialog } from "@/components/RegistrationDialog";
import AgeSelectionDialog from "@/components/registration/AgeSelectionDialog";
import { FilePenLine, ArrowRight, UserCheck, LockOpen, Info, ChevronRight } from "lucide-react";
import EventBanner from "@/components/EventBanner";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showAgeDialog, setShowAgeDialog] = useState(false);
  const [hasSavedParQ, setHasSavedParQ] = useState(false);
  const [hasCompletedParQ, setHasCompletedParQ] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [isMembershipActive, setIsMembershipActive] = useState(false);

  useEffect(() => {
    // Check for saved PAR-Q form
    const parQFormData = sessionStorage.getItem("parQForm");
    if (parQFormData) {
      try {
        const parsedData = JSON.parse(parQFormData);
        setHasSavedParQ(true);
        setHasCompletedParQ(parsedData.completed);
      } catch (error) {
        console.error("Error parsing parQForm data:", error);
      }
    }
    
    // Check for existing user and membership status
    const studentDetails = sessionStorage.getItem("studentDetails");
    const existingMembershipFound = localStorage.getItem("existingMembershipFound") === "true";
    
    if (studentDetails || existingMembershipFound) {
      setIsExistingUser(true);
      
      // Check if the membership is active
      const membershipStatus = localStorage.getItem("membershipStatus");
      setIsMembershipActive(membershipStatus === "active");
    }
  }, []);

  const handleStartRegistration = () => {
    const userAge = sessionStorage.getItem("userAge");
    if (!userAge) {
      setShowAgeDialog(true);
    } else {
      navigate("/par-form");
    }
  };

  const handleActivateMembership = () => {
    // Navigate to the membership reactivation page
    navigate("/physical-readiness");
    toast({
      title: "Membership Reactivation",
      description: "Please complete the Physical Activity Readiness Questionnaire to continue.",
    });
  };

  const handleContinueRegistration = () => {
    if (hasCompletedParQ) {
      navigate("/registration");
    } else {
      navigate("/par-form");
    }
  };

  return (
    <div className="min-h-screen w-full">
      {/* Age Selection Dialog */}
      <AgeSelectionDialog 
        open={showAgeDialog} 
        onOpenChange={setShowAgeDialog}
        onContinue={() => navigate("/par-form")}
      />
    
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 hero-gradient">
          <img
            src="/placeholder.svg"
            alt="Traditional Taijiquan practice"
            className="h-full w-full object-cover opacity-30 mix-blend-overlay"
          />
        </div>

        <div className="relative mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24 max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-4">
              ZenForce TaijiQuan SA
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-2xl">
              Discover the ancient art of balance, strength, and inner peace through 
              the precise movements of traditional TaijiQuan
            </p>
          </div>
          
          <div className="mt-10 space-y-6 max-w-4xl">
            {!isMembershipActive && (
              <Card className="bg-white/10 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Registration Process</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/10 rounded-lg p-5 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
                        <h3 className="text-white font-medium">Complete PAR-Q Form</h3>
                      </div>
                      <p className="text-gray-300 text-sm">Physical Activity Readiness Questionnaire ensures your safety</p>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-5 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center font-bold">2</div>
                        <h3 className="text-white font-medium">Personal Information</h3>
                      </div>
                      <p className="text-gray-300 text-sm">Enter your contact and personal details for membership</p>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-5 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center font-bold">3</div>
                        <h3 className="text-white font-medium">Terms & Conditions</h3>
                      </div>
                      <p className="text-gray-300 text-sm">Review and accept terms before completing registration</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {hasSavedParQ && (
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/20 shadow-lg">
                <h3 className="text-white font-medium text-lg mb-2">
                  {hasCompletedParQ 
                    ? "You've completed the PAR-Q form" 
                    : "You have a saved PAR-Q form in progress"}
                </h3>
                <p className="text-gray-300 mb-4">
                  {hasCompletedParQ 
                    ? "Continue to complete your registration" 
                    : "Continue from where you left off"}
                </p>
                <Button 
                  onClick={handleContinueRegistration}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90"
                >
                  {hasCompletedParQ 
                    ? "Continue to Registration" 
                    : "Continue Your PAR-Q Form"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              {isExistingUser && !isMembershipActive ? (
                // For existing users with inactive membership
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-green-500 text-white hover:bg-green-600 backdrop-blur-sm border-0 shadow-md"
                  onClick={handleActivateMembership}
                >
                  <LockOpen className="h-5 w-5 mr-2" />
                  Activate Membership
                </Button>
              ) : !isExistingUser ? (
                // For new users
                <Button
                  variant="default"
                  size="lg"
                  className="bg-primary text-white hover:bg-primary/90 backdrop-blur-sm border-0 shadow-md"
                  onClick={handleStartRegistration}
                >
                  <FilePenLine className="h-5 w-5 mr-2" />
                  Start Registration Process
                </Button>
              ) : null}
              
              {isExistingUser && isMembershipActive && (
                // For active members
                <div className="bg-green-500/20 text-white p-4 rounded-md backdrop-blur-sm flex items-center gap-2 border border-green-500/30">
                  <UserCheck className="h-5 w-5 text-green-400" />
                  <span>Your membership is active</span>
                </div>
              )}
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/30 shadow-md"
                  >
                    <Info className="h-5 w-5 mr-2" />
                    Learn More
                  </Button>
                </DialogTrigger>
                <RegistrationDialog onClose={() => setIsDialogOpen(false)} />
              </Dialog>
            </div>
          </div>
        </div>
        
        {/* Event Banner */}
        <div className="fixed bottom-6 right-6 z-50 max-w-md">
          <EventBanner />
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="zen-container">
          <div className="grid gap-16 lg:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Taijiquan: The Art of Balanced Movement
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Taijiquan, also known as Tai Chi Chuan, is a centuries-old Chinese martial art that 
                combines gentle flowing movements with deep breathing and meditation. It's practiced 
                for both its defensive training and health benefits.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Physical Benefits</h3>
                    <p className="text-gray-600">Improved balance, flexibility, and cardiovascular fitness</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Mental Benefits</h3>
                    <p className="text-gray-600">Reduced stress, better focus, and improved mental clarity</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Spiritual Growth</h3>
                    <p className="text-gray-600">Cultivation of inner peace and harmony with nature</p>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                  Learn More About Taijiquan
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="relative h-96 overflow-hidden rounded-xl shadow-xl">
              <img
                src="/placeholder.svg"
                alt="Taijiquan Practice"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          <Separator className="my-16" />

          {/* Benefits Section */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits of Regular Practice</h2>
            <p className="text-lg text-gray-600">
              Discover how regular Taijiquan practice can transform your physical and mental wellbeing
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0Z" />
                    <circle cx="12" cy="8" r="2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Improved Balance</h3>
                <p className="text-gray-600 mt-2">
                  Regular practice strengthens legs and core, enhancing stability and reducing fall risk
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M4.9 4.9C2.4 7.4 1 10.6 1 14c0 5 4 9 9 9 3.4 0 6.6-1.4 9.1-3.9" />
                    <path d="M21 12c0-4.4-3.6-8-8-8" />
                    <path d="M15 9c0-1.7-1.3-3-3-3" />
                    <path d="M18 4h3v3" />
                    <path d="M3 19h3v3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Stress Reduction</h3>
                <p className="text-gray-600 mt-2">
                  Focused movements and breathing techniques help calm the mind and reduce anxiety
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
                    <path d="M3 16c0 2 4 4 8 4s8-2 8-4" />
                    <path d="M19 9c0 2-4 4-8 4s-8-2-8-4" />
                    <path d="M12 12v8" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Energy Flow</h3>
                <p className="text-gray-600 mt-2">
                  Improves circulation of qi (vital energy) throughout the body for better health
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
