
import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-100 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Welcome to Our Community
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Join us in our practice of traditional Tai Chi and Qigong for improved health, balance, and wellness.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors">
              Get Started
            </button>
            <button className="px-8 py-3 bg-white text-primary border border-primary rounded-md hover:bg-gray-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
