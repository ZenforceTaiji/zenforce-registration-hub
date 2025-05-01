
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-[#8d6262] text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ZenForce TaijiQuan SA
          </h1>
          <p className="text-xl mb-10">
            Discover the ancient art of balance, strength, and inner peace
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mt-10">
            <h2 className="text-2xl font-semibold mb-6">Registration Process</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-red-400/30 rounded-full flex items-center justify-center">
                  <span className="font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Complete PAR-Q Form</h3>
                  <p className="text-gray-200">
                    Physical Activity Readiness Questionnaire is required before registration
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Personal Information</h3>
                  <p className="text-gray-200">
                    Enter your contact and personal details
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Terms & Conditions</h3>
                  <p className="text-gray-200">
                    Review and accept terms before completing registration
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 space-y-3">
              <Button asChild className="w-full bg-red-800 hover:bg-red-700">
                <Link to="/registration">
                  <span className="flex items-center gap-2 justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin">
                      <path d="M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0Z" />
                      <circle cx="12" cy="8" r="2" />
                    </svg>
                    In-Person Training Registration
                  </span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full border-white text-white hover:bg-white/10">
                <Link to="/online-registration">
                  <span className="flex items-center gap-2 justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="10 8 16 12 10 16 10 8" />
                    </svg>
                    Online Training Registration
                  </span>
                </Link>
              </Button>
              
              <Button asChild variant="ghost" className="w-full text-white hover:bg-white/10">
                <Link to="/purpose-of-taijiquan">
                  <span className="flex items-center gap-2 justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" x2="12" y1="8" y2="12" />
                      <line x1="12" x2="12.01" y1="16" y2="16" />
                    </svg>
                    Learn More
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
