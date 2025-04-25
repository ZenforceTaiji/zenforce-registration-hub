
import React, { useState, useEffect } from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import { FeaturedNewsletters } from "@/components/home/FeaturedNewsletters";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import WelcomeSplash from "@/components/home/WelcomeSplash";
import GreetingGenerator from "@/components/home/GreetingGenerator";

const Index = () => {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedBefore");
    if (!hasVisited) {
      setShowSplash(true);
    }
  }, []);

  const handleSplashComplete = () => {
    localStorage.setItem("hasVisitedBefore", "true");
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && <WelcomeSplash onComplete={handleSplashComplete} />}
      
      <div className="min-h-screen w-full bg-gray-50">
        <HeroSection />
        
        {/* Audio Generator Section */}
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Generate Greeting Audio</h2>
            <div className="max-w-xl mx-auto bg-gray-50 rounded-lg shadow-md p-6">
              <GreetingGenerator />
            </div>
          </div>
        </div>
        
        <FeaturedNewsletters />
        <FeaturesSection />
        <BenefitsSection />
        <FloatingWhatsAppButton phoneNumber="27731742969" />
      </div>
    </>
  );
};

export default Index;
