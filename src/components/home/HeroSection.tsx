
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
          
          <div className="mt-10 space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button asChild className="w-full md:w-auto bg-amber-700 hover:bg-amber-600 text-white">
                <Link to="/registration">Begin Your Journey</Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full md:w-auto border-amber-500 text-amber-500 hover:bg-amber-500/10">
                <Link to="/purpose-of-taijiquan">Learn About TaijiQuan</Link>
              </Button>
            </div>
            
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
