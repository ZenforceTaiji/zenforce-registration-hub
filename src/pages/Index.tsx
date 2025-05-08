
import React, { lazy, Suspense } from "react";
import HeroSection from "@/components/home/HeroSection";
import { FeaturedNewsletters } from "@/components/home/FeaturedNewsletters";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import FloatingEventBanner from "@/components/home/FloatingEventBanner";
import { Helmet } from "react-helmet-async";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load non-critical components
const FeaturesSection = lazy(() => import("@/components/home/FeaturesSection"));
const BenefitsSection = lazy(() => import("@/components/home/BenefitsSection"));

const Index = () => {
  return (
    <>
      <Helmet>
        <title>ZenForce TaijiQuan SA - Authentic Martial Arts Training</title>
        <meta name="description" content="Experience authentic TaijiQuan training in South Africa. Join classes for all ages and skill levels in a traditional martial arts environment focused on health and mindfulness." />
        <link rel="canonical" href="https://zenforce-registration-hub.lovable.app/" />
        <meta name="robots" content="index, follow" />
        
        {/* Preload critical assets */}
        <link rel="preload" href="https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=1000" as="image" fetchpriority="high" />
        
        {/* DNS prefetch and preconnect */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://images.unsplash.com" crossorigin="" />
        
        {/* Structured data for better SEO */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "SportsClub",
            "name": "ZenForce TaijiQuan SA",
            "description": "Authentic TaijiQuan training in South Africa",
            "url": "https://zenforce-registration-hub.lovable.app/",
            "telephone": "+27731742969",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "South Africa"
            },
            "sameAs": ["https://www.facebook.com/zenforcetaijiquan"],
            "openingHours": "Mo,Tu,We,Th,Fr 08:00-18:00",
            "priceRange": "$$"
          }
        `}</script>
      </Helmet>
      <div className="min-h-screen w-full bg-gray-50">
        <main>
          {/* Critical content loaded immediately */}
          <HeroSection />
          <FeaturedNewsletters />
          
          {/* Non-critical content lazy loaded with proper suspense boundaries */}
          <Suspense fallback={<div className="py-12 px-4"><Skeleton className="h-64 w-full" /></div>}>
            <FeaturesSection />
          </Suspense>
          
          <Suspense fallback={<div className="py-12 px-4"><Skeleton className="h-64 w-full" /></div>}>
            <BenefitsSection />
          </Suspense>
        </main>
        <FloatingWhatsAppButton phoneNumber="27731742969" />
        <FloatingEventBanner />
      </div>
    </>
  );
};

export default Index;
