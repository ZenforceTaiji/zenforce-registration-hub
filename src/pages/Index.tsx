
import React from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import { FeaturedNewsletters } from "@/components/home/FeaturedNewsletters";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import FloatingEventBanner from "@/components/home/FloatingEventBanner";

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <HeroSection />
      <FeaturedNewsletters />
      <FeaturesSection />
      <BenefitsSection />
      <FloatingWhatsAppButton phoneNumber="27731742969" />
      <FloatingEventBanner />
    </div>
  );
};

export default Index;
