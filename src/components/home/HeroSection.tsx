
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { RegistrationDialog } from "@/components/RegistrationDialog";
import AgeSelectionDialog from "@/components/registration/AgeSelectionDialog";
import { FilePenLine, Info } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showAgeDialog, setShowAgeDialog] = useState(false);

  const handleStartRegistration = () => {
    const userAge = sessionStorage.getItem("userAge");
    if (!userAge) {
      setShowAgeDialog(true);
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
      <section className="relative bg-primary-700 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary-800/80 to-primary-900/80"></div>

        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl mb-6">
              ZenForce TaijiQuan SA
            </h1>
            <p className="mt-6 text-xl text-white/90 max-w-2xl leading-relaxed">
              Discover the ancient art of balance, strength, and inner peace
            </p>
          </div>
          
          <div className="mt-12 max-w-lg p-6 rounded-lg bg-white/10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-6">Registration Process</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-lg font-medium text-white">Complete PAR-Q Form</h3>
                  <p className="text-white/80 text-sm">Physical Activity Readiness Questionnaire is required before registration</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-lg font-medium text-white">Personal Information</h3>
                  <p className="text-white/80 text-sm">Enter your contact and personal details</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-lg font-medium text-white">Terms & Conditions</h3>
                  <p className="text-white/80 text-sm">Review and accept terms before completing registration</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 mt-8">
              <Button
                variant="default"
                size="lg"
                className="bg-primary-600 text-white hover:bg-primary-700"
                onClick={handleStartRegistration}
              >
                <FilePenLine className="h-5 w-5 mr-2" />
                Start Registration Process
              </Button>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white/10 text-white hover:bg-white/20 border border-white/30"
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
      </section>
    </>
  );
};

export default HeroSection;
