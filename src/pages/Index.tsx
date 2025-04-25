
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
    // For testing purposes, let's clear the localStorage to ensure we can always access the site
    localStorage.removeItem("hasVisitedBefore");
    setShowSplash(true);
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
          
          {/* Audio Generator Section with improved visibility */}
          <div className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">Generate Greeting Audio</h2>
              <div className="max-w-xl mx-auto bg-gray-100 rounded-lg shadow-lg p-8 border border-gray-200">
                <GreetingGenerator />
              </div>
            </div>
          </div>
          
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
