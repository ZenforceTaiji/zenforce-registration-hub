
import React from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import BenefitsSection from "@/components/home/BenefitsSection";

const Index = () => {
  return (
    <div className="min-h-screen w-full">
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
    </div>
  );
};

export default Index;
