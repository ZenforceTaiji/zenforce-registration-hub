
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BenefitsSection = () => {
  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <Badge variant="outline" className="mb-4 border-primary-500/50 text-primary-600">Holistic Practice</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Benefits of Regular Practice</h2>
          <p className="text-base sm:text-lg text-gray-600">
            Discover how regular Taijiquan practice can transform your physical and mental wellbeing
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          <Card className="shadow-soft hover:shadow-card-hover transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600">
                  <path d="M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0Z" />
                  <circle cx="12" cy="8" r="2" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Improved Balance</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Regular practice strengthens legs and core, enhancing stability and reducing fall risk
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-card-hover transition-all duration-300">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600">
                  <path d="M4.9 4.9C2.4 7.4 1 10.6 1 14c0 5 4 9 9 9 3.4 0 6.6-1.4 9.1-3.9" />
                  <path d="M21 12c0-4.4-3.6-8-8-8" />
                  <path d="M15 9c0-1.7-1.3-3-3-3" />
                  <path d="M18 4h3v3" />
                  <path d="M3 19h3v3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Stress Reduction</h3>
              <p className="text-gray-600">
                Focused movements and breathing techniques help calm the mind and reduce anxiety
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-card-hover transition-all duration-300">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600">
                  <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
                  <path d="M3 16c0 2 4 4 8 4s8-2 8-4" />
                  <path d="M19 9c0 2-4 4-8 4s-8-2-8-4" />
                  <path d="M12 12v8" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Energy Flow</h3>
              <p className="text-gray-600">
                Improves circulation of qi (vital energy) throughout the body for better health
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
