
import React from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import { FeaturedNewsletters } from "@/components/home/FeaturedNewsletters";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import FloatingEventBanner from "@/components/home/FloatingEventBanner";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>ZenForce TaijiQuan SA - Authentic Martial Arts Training</title>
        <meta name="description" content="Experience authentic TaijiQuan training in South Africa. Join classes for all ages and skill levels in a traditional martial arts environment focused on health and mindfulness." />
      </Helmet>
      <div className="min-h-screen w-full bg-gray-50">
        <main>
          <HeroSection />
          <FeaturedNewsletters />
          <FeaturesSection />
          <BenefitsSection />
        </main>
        <FloatingWhatsAppButton phoneNumber="27731742969" />
        <FloatingEventBanner />
      </div>
    </>
  );
};

export default Index;
