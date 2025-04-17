
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { RegistrationDialog } from "@/components/RegistrationDialog";
import AgeSelectionDialog from "@/components/registration/AgeSelectionDialog";
import { FilePenLine, ArrowRight, UserCheck, LockOpen, Info, ChevronRight, CheckCircle, BookOpen, Users, Award } from "lucide-react";
import EventBanner from "@/components/EventBanner";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-gray-50">
      {/* Age Selection Dialog */}
      <AgeSelectionDialog 
        open={showAgeDialog} 
        onOpenChange={setShowAgeDialog}
        onContinue={() => navigate("/par-form")}
      />
    
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient">
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/60"></div>
        </div>

        <div className="relative zen-container px-4 py-16 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl animate-fade-in">
            <Badge variant="secondary" className="mb-4 text-sm px-3 py-1 bg-white/20 text-white">
              Discover Inner Balance & Strength
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-4">
              ZenForce TaijiQuan SA
            </h1>
            <p className="mt-6 text-xl text-white/90 max-w-2xl leading-relaxed">
              Experience the ancient art of balance, strength, and inner peace through 
              the precise movements of traditional TaijiQuan in South Africa.
            </p>
          </div>
          
          <div className="mt-10 space-y-6 max-w-4xl">
            {!isMembershipActive && (
              <Card className="glass-morphism border-0 shadow-xl animate-fade-in" style={{animationDelay: '0.2s'}}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white mb-2">Registration Process</CardTitle>
                  <CardDescription className="text-white/80">Three simple steps to begin your TaijiQuan journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/10 rounded-lg p-5 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center font-bold">1</div>
                        <h3 className="text-white font-medium">Complete PAR-Q Form</h3>
                      </div>
                      <p className="text-white/80 text-sm">Physical Activity Readiness Questionnaire ensures your safety</p>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-5 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center font-bold">2</div>
                        <h3 className="text-white font-medium">Personal Information</h3>
                      </div>
                      <p className="text-white/80 text-sm">Enter your contact and personal details for membership</p>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-5 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center font-bold">3</div>
                        <h3 className="text-white font-medium">Terms & Conditions</h3>
                      </div>
                      <p className="text-white/80 text-sm">Review and accept terms before completing registration</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {hasSavedParQ && (
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/20 shadow-lg animate-fade-in" style={{animationDelay: '0.4s'}}>
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
                    <p className="text-white/80 mb-4">
                      {hasCompletedParQ 
                        ? "Continue to complete your registration" 
                        : "Continue from where you left off"}
                    </p>
                    <Button 
                      onClick={handleContinueRegistration}
                      className="w-full md:w-auto flex items-center justify-center gap-2 bg-white hover:bg-white/90 text-primary btn-hover-effect"
                    >
                      {hasCompletedParQ 
                        ? "Continue to Registration" 
                        : "Continue Your PAR-Q Form"}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-in" style={{animationDelay: '0.6s'}}>
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
                  className="bg-white text-primary hover:bg-white/90 backdrop-blur-sm border-0 shadow-md btn-hover-effect"
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

      {/* Features Section */}
      <section className="section section-light">
        <div className="zen-container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-sm px-3 py-1">Ancient Practice, Modern Benefits</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose TaijiQuan?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover how this ancient martial art can transform your physical and mental wellbeing</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-soft hover:shadow-card-hover transition-all duration-300 border-t-4 border-t-primary">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Traditional Practice</h3>
                <p className="text-gray-600">
                  Learn authentic movements passed down through generations, preserving the rich history and philosophy of TaijiQuan.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-card-hover transition-all duration-300 border-t-4 border-t-primary">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Supportive Community</h3>
                <p className="text-gray-600">
                  Join a welcoming community of practitioners who share your journey and support your growth and development.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-card-hover transition-all duration-300 border-t-4 border-t-primary">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Expert Instruction</h3>
                <p className="text-gray-600">
                  Train with certified instructors who provide personalized guidance to help you master the art of TaijiQuan.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section section-dark">
        <div className="zen-container">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <Badge variant="outline" className="mb-2">Ancient Wisdom</Badge>
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
            <div className="relative h-96 overflow-hidden rounded-xl shadow-xl order-1 lg:order-2">
              <img
                src="/placeholder.svg"
                alt="Taijiquan Practice"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-4 px-6">
                <h3 className="text-white font-medium text-lg">Traditional Forms</h3>
                <p className="text-white/80 text-sm">Ancient movements preserved for modern practice</p>
              </div>
            </div>
          </div>

          <Separator className="my-16" />

          {/* Benefits Section */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="outline" className="mb-4">Holistic Practice</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits of Regular Practice</h2>
            <p className="text-lg text-gray-600">
              Discover how regular Taijiquan practice can transform your physical and mental wellbeing
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-soft hover:shadow-card-hover transition-all duration-300">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0Z" />
                    <circle cx="12" cy="8" r="2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Improved Balance</h3>
                <p className="text-gray-600">
                  Regular practice strengthens legs and core, enhancing stability and reducing fall risk
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-card-hover transition-all duration-300">
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
                <h3 className="text-xl font-bold mb-2">Stress Reduction</h3>
                <p className="text-gray-600">
                  Focused movements and breathing techniques help calm the mind and reduce anxiety
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-card-hover transition-all duration-300">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
                    <path d="M3 16c0 2 4 4 8 4s8-2 8-4" />
                    <path d="M19 9c0 2-4 4-8 4s-8-2-8-4" />
                    <path d="M12 12v8" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Energy Flow</h3>
                <p className="text-gray-600">
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
