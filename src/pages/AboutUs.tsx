
import React from "react";
import { UserRound } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-500 mb-4">About ZenForce TaijiQuan</h1>
          <p className="text-xl text-gray-300">Discover our journey, philosophy, and commitment to wellness</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-amber-500 mb-4">Our Story</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              ZenForce TaijiQuan was founded with a passion for promoting holistic wellness through the ancient art of Taijiquan. 
              Our mission is to provide high-quality, authentic Taiji instruction that nurtures both body and mind.
            </p>
            <p className="text-gray-300 leading-relaxed">
              With years of experience and a deep respect for traditional martial arts, we offer classes 
              that cater to all levels - from beginners to advanced practitioners.
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="bg-black/90 shadow-lg rounded-lg p-6 max-w-md w-full border border-amber-900/50">
              <div className="flex items-center space-x-4 mb-4">
                <UserRound className="h-12 w-12 text-amber-500" />
                <div>
                  <h3 className="text-lg font-semibold text-amber-500">Our Instructors</h3>
                  <p className="text-gray-300">Experienced and Certified Professionals</p>
                </div>
              </div>
              <ul className="space-y-2 text-gray-300">
                <li>• Certified Taijiquan Instructors</li>
                <li>• Years of Martial Arts Experience</li>
                <li>• Holistic Approach to Teaching</li>
                <li>• Personalized Guidance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
