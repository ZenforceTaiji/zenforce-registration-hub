
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RegistrationDialog } from "@/components/RegistrationDialog";
import AgeSelectionDialog from "@/components/registration/AgeSelectionDialog";
import { FilePenLine, ArrowRight } from "lucide-react";
import EventBanner from "@/components/EventBanner";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";

const Index = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showAgeDialog, setShowAgeDialog] = useState(false);
  const [hasSavedParQ, setHasSavedParQ] = useState(false);
  const [hasCompletedParQ, setHasCompletedParQ] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(false);

  useEffect(() => {
    const parQFormData = sessionStorage.getItem("parQForm");
    if (parQFormData) {
      const parsedData = JSON.parse(parQFormData);
      setHasSavedParQ(true);
      setHasCompletedParQ(parsedData.completed);
    }
    
    const studentDetails = sessionStorage.getItem("studentDetails");
    setIsExistingUser(!!studentDetails);
  }, []);

  const handleStartRegistration = () => {
    const userAge = sessionStorage.getItem("userAge");
    if (!userAge) {
      setShowAgeDialog(true);
    } else {
      navigate("/par-form");
    }
  };

  const handleContinueRegistration = () => {
    if (hasCompletedParQ) {
      navigate("/registration");
    } else {
      navigate("/par-form");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Age Selection Dialog */}
      <AgeSelectionDialog 
        open={showAgeDialog} 
        onOpenChange={setShowAgeDialog}
        onContinue={() => navigate("/par-form")}
      />
    
      <div className="relative">
        <div className="absolute inset-0">
          <img
            src="/placeholder.svg"
            alt="Water background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            ZenForce TaijiQuan SA
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-gray-300">
            Discover the ancient art of balance, strength, and inner peace
          </p>
          
          <div className="mt-10 space-y-6">
            <FloatingWhatsAppButton phoneNumber="27731742969" isExistingUser={isExistingUser} />
            
            <div className="fixed bottom-6 right-6 z-50 max-w-md">
              <EventBanner />
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl">
              <h2 className="text-2xl font-bold text-white mb-4">Registration Process</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-red text-white flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="text-white font-medium">Complete PAR-Q Form</h3>
                    <p className="text-gray-300 text-sm">Physical Activity Readiness Questionnaire is required before registration</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="text-white font-medium">Personal Information</h3>
                    <p className="text-gray-300 text-sm">Enter your contact and personal details</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="text-white font-medium">Terms & Conditions</h3>
                    <p className="text-gray-300 text-sm">Review and accept terms before completing registration</p>
                  </div>
                </div>
              </div>
            </div>
            
            {hasSavedParQ && (
              <div className="bg-white/10 p-4 rounded-md backdrop-blur-sm max-w-md">
                <h3 className="text-white font-medium mb-2">
                  {hasCompletedParQ 
                    ? "You've completed the PAR-Q form" 
                    : "You have a saved PAR-Q form in progress"}
                </h3>
                <Button 
                  onClick={handleContinueRegistration}
                  className="zen-button-primary w-full flex items-center justify-center gap-2"
                >
                  {hasCompletedParQ 
                    ? "Continue to Registration" 
                    : "Continue Your PAR-Q Form"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                size="lg"
                className="bg-accent-red text-white hover:bg-accent-red/90 backdrop-blur-sm flex items-center gap-2"
                onClick={handleStartRegistration}
              >
                <FilePenLine className="h-5 w-5" />
                Start Registration Process
              </Button>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="default"
                    size="lg"
                    className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                  >
                    Learn More
                  </Button>
                </DialogTrigger>
                <RegistrationDialog onClose={() => setIsDialogOpen(false)} />
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <section className="zen-container py-24">
        <div className="grid gap-16 lg:grid-cols-2">
          <div className="space-y-6">
            <h2 className="section-title">
              Taijiquan (Tai Chi Chuan): An Overview
            </h2>
            <div className="prose prose-lg">
              <h3 className="text-xl font-semibold text-gray-900">
                History of Taijiquan
              </h3>
              <p className="mt-4 text-gray-600">
                Taijiquan, also known as Tai Chi Chuan, is a traditional Chinese
                martial art that combines self-defense, health benefits, and
                philosophical principles. The history of Taijiquan dates back
                several centuries and involves various families and styles, each
                contributing to its development.
              </p>
            </div>
          </div>
          <div className="relative h-96 overflow-hidden rounded-xl">
            <img
              src="/placeholder.svg"
              alt="Taijiquan Practice"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
