
import React from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100">
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <FloatingWhatsAppButton phoneNumber="27731742969" />
    </div>
  );
};

export default Index;
