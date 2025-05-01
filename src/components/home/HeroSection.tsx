
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Globe, Info } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-black text-white py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=2573')] bg-cover bg-center opacity-30"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-amber-500">
            ZenForce TaijiQuan SA
          </h1>
          <p className="text-xl mb-10">
            Experience the ancient art of balance, strength, and inner peace
          </p>
          
          <div className="mt-10 space-y-4">
            {/* Registration buttons that match the provided image */}
            <Link to="/registration" className="block w-full max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 px-4 py-3 bg-amber-700/80 hover:bg-amber-700 text-white rounded-md transition-all">
                <MapPin className="w-5 h-5" />
                <span className="text-lg">In-Person Training Registration</span>
              </div>
            </Link>
            
            <Link to="/online-registration" className="block w-full max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 px-4 py-3 bg-black/60 hover:bg-black/80 text-white border border-amber-700/50 rounded-md transition-all">
                <Globe className="w-5 h-5" />
                <span className="text-lg">Online Training Registration</span>
              </div>
            </Link>
            
            <Link to="/purpose-of-taijiquan" className="block w-full max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 px-4 py-3 bg-black/60 hover:bg-black/80 text-white border border-amber-700/50 rounded-md transition-all">
                <Info className="w-5 h-5" />
                <span className="text-lg">Learn More</span>
              </div>
            </Link>
            
            <div className="pt-12 pb-6 border-t border-amber-900/30">
              <h2 className="text-2xl font-semibold mb-4 text-amber-500">Our Training Programs</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-black/50 p-6 border border-amber-900/50 backdrop-blur-sm hover:border-amber-500 transition-all">
                  <h3 className="font-bold text-amber-500 mb-2">Traditional TaijiQuan</h3>
                  <p className="text-gray-300">Ancient wisdom meets modern practice in our authentic TaijiQuan classes</p>
                </div>
                
                <div className="bg-black/50 p-6 border border-amber-900/50 backdrop-blur-sm hover:border-amber-500 transition-all">
                  <h3 className="font-bold text-amber-500 mb-2">QiGong Practice</h3>
                  <p className="text-gray-300">Harness your internal energy through specialized breathing and movement</p>
                </div>
                
                <div className="bg-black/50 p-6 border border-amber-900/50 backdrop-blur-sm hover:border-amber-500 transition-all">
                  <h3 className="font-bold text-amber-500 mb-2">Meditation Classes</h3>
                  <p className="text-gray-300">Find inner peace and mental clarity through guided meditation sessions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
