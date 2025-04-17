
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { RegistrationDialog } from "@/components/RegistrationDialog";
import AgeSelectionDialog from "@/components/registration/AgeSelectionDialog";
import { FilePenLine, ArrowRight, UserCheck, LockOpen, Info, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EventBanner from "@/components/EventBanner";

const HeroSection = () => {
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
    <>
      {/* Age Selection Dialog */}
      <AgeSelectionDialog 
        open={showAgeDialog} 
        onOpenChange={setShowAgeDialog}
        onContinue={() => navigate("/par-form")}
      />
    
      {/* Hero Section */}
      <section className="relative bg-primary-600 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary-600/95 to-primary-700/90"></div>

        <div className="relative container mx-auto px-4 py-8 md:py-12 lg:py-16">
          <div className="max-w-3xl animate-fade-in">
            <Badge variant="secondary" className="mb-4 text-sm px-3 py-1 bg-white text-primary-600">
              Experience Traditional Martial Arts
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-4">
              ZenForce TaijiQuan SA
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
              Experience the ancient art of balance, strength, and inner peace through 
              the precise movements of traditional TaijiQuan in South Africa.
            </p>
          </div>
          
          <div className="mt-10 space-y-6 max-w-4xl">
            {!isMembershipActive && (
              <Card className="bg-white/10 border-0 shadow-xl backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white mb-2">Registration Process</CardTitle>
                  <CardDescription className="text-white/90">Three simple steps to begin your TaijiQuan journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/10 rounded-lg p-5 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-primary-600 flex items-center justify-center font-bold">1</div>
                        <h3 className="text-white font-medium">Complete PAR-Q Form</h3>
                      </div>
                      <p className="text-white/90 text-sm">Physical Activity Readiness Questionnaire ensures your safety</p>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-5 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center font-bold">2</div>
                        <h3 className="text-white font-medium">Personal Information</h3>
                      </div>
                      <p className="text-white/90 text-sm">Enter your contact and personal details for membership</p>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-5 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center font-bold">3</div>
                        <h3 className="text-white font-medium">Terms & Conditions</h3>
                      </div>
                      <p className="text-white/90 text-sm">Review and accept terms before completing registration</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {hasSavedParQ && (
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/20 shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-white/20 p-2 mt-1">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-lg mb-2">
                      {hasCompletedParQ 
                        ? "You've completed the PAR-Q form" 
                        : "You have a saved PAR-Q form in progress"}
                    </h3>
                    <p className="text-white/90 mb-4">
                      {hasCompletedParQ 
                        ? "Continue to complete your registration" 
                        : "Continue from where you left off"}
                    </p>
                    <Button 
                      onClick={handleContinueRegistration}
                      className="bg-white hover:bg-white/90 text-primary-600 btn-hover-effect"
                    >
                      {hasCompletedParQ 
                        ? "Continue to Registration" 
                        : "Continue Your PAR-Q Form"}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
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
                  className="bg-white text-primary-600 hover:bg-white/90 backdrop-blur-sm border-0 shadow-md btn-hover-effect"
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
    </>
  );
};

export default HeroSection;
