
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { RegistrationDialog } from "@/components/RegistrationDialog";
import AgeSelectionDialog from "@/components/registration/AgeSelectionDialog";
import { FilePenLine, Info, Globe, MapPin } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showAgeDialog, setShowAgeDialog] = useState(false);

  const handleStartInPersonRegistration = () => {
    const userAge = sessionStorage.getItem("userAge");
    if (!userAge) {
      setShowAgeDialog(true);
    } else {
      navigate("/par-form");
    }
  };

  const handleStartOnlineRegistration = () => {
    const userAge = sessionStorage.getItem("userAge");
    if (!userAge) {
      setShowAgeDialog(true);
    } else {
      navigate("/online-registration");
    }
  };

  return (
    <>
      <AgeSelectionDialog 
        open={showAgeDialog} 
        onOpenChange={setShowAgeDialog}
        onContinue={() => navigate("/par-form")}
      />
    
      <section className="relative bg-primary-700 py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7')`,
            backgroundBlendMode: 'multiply'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary-800/80 to-primary-900/80"></div>

        <div className="relative container mx-auto px-4 py-8 sm:py-12 lg:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white mb-4 sm:mb-6">
              ZenForce TaijiQuan SA
            </h1>
            <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-white/90 max-w-2xl leading-relaxed">
              Discover the ancient art of balance, strength, and inner peace
            </p>
          </div>
          
          <div className="mt-8 sm:mt-12 max-w-lg p-4 sm:p-6 rounded-lg bg-white/10 backdrop-blur-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Registration Process</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm sm:text-base">1</div>
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-white">Complete PAR-Q Form</h3>
                  <p className="text-sm text-white/80">Physical Activity Readiness Questionnaire is required before registration</p>
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
            
            <div className="space-y-3">
              <Button
                variant="default"
                size="lg"
                className="w-full bg-primary-600 text-white hover:bg-primary-700 flex items-center gap-2"
                onClick={handleStartInPersonRegistration}
              >
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                In-Person Training Registration
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                className="w-full bg-white/10 text-white hover:bg-white/20 border border-white/30 flex items-center gap-2"
                onClick={handleStartOnlineRegistration}
              >
                <Globe className="h-4 w-4 sm:h-5 sm:w-5" />
                Online Training Registration
              </Button>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full bg-white/10 text-white hover:bg-white/20 border border-white/30"
                  >
                    <Info className="h-4 w-4 mr-2" />
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
