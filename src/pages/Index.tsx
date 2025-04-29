import React, { useState, useEffect } from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import { FeaturedNewsletters } from "@/components/home/FeaturedNewsletters";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import WelcomeSplash from "@/components/home/WelcomeSplash";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem("hasVisitedBefore");
    
    // Keep the splash shown initially or respect the hasVisited setting
    setShowSplash(!hasVisited);
  }, []);

  const handleSplashComplete = () => {
    localStorage.setItem("hasVisitedBefore", "true");
    setShowSplash(false);
  };

  return (
    <>
      {showSplash ? (
        <WelcomeSplash onComplete={handleSplashComplete} />
      ) : (
        <div className="min-h-screen w-full bg-gray-50">
          <HeroSection />
          <FeaturedNewsletters />
          <FeaturesSection />
          <BenefitsSection />
          <FloatingWhatsAppButton phoneNumber="27731742969" />
        </div>
      )}
    </>
  );
};

export default Index;
