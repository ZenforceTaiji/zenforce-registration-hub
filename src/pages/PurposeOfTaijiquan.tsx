
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import { Lotus, Muscle, Brain, Users } from "lucide-react";
import ImageCard from "@/components/history/shared/ImageCard";

const PurposeOfTaijiquan = () => {
  const { data: purposeContent } = useWebsiteContent('purpose');

  const introContent = purposeContent?.find(
    content => content.section_name === 'purpose-intro'
  );

  return (
    <div className="zen-container py-8 animate-fade-in">
      <h1 className="text-3xl font-bold tracking-tight mb-6">
        {introContent?.title || "Purpose of TaijiQuan"}
      </h1>
      
      <Tabs defaultValue="general">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-6">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Lotus className="h-4 w-4" />
            General Overview
          </TabsTrigger>
          <TabsTrigger value="health" className="flex items-center gap-2">
            <Muscle className="h-4 w-4" />
            Health Benefits
          </TabsTrigger>
          <TabsTrigger value="mental" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Mental Benefits
          </TabsTrigger>
          <TabsTrigger value="martial" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Martial Arts
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>The Art of TaijiQuan</CardTitle>
              <CardDescription>Understanding the fundamental principles and philosophy</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  TaijiQuan (太極拳) is an ancient Chinese internal martial art that combines slow, graceful movements with meditation and deep breathing. Often described as "meditation in motion," it represents the embodiment of Yin and Yang principles through physical movement.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The practice emphasizes the cultivation of Qi (internal energy) through precise movements, correct posture, and mindful breathing. Each movement in TaijiQuan has both defensive and health-promoting applications.
                </p>
                <div className="bg-red-50 p-4 rounded-lg border border-red-100 mt-4">
                  <h3 className="font-semibold text-red-900 mb-2">Core Principles</h3>
                  <ul className="list-disc pl-5 space-y-2 text-red-800">
                    <li>Balance of Yin and Yang</li>
                    <li>Harmony of mind and body</li>
                    <li>Continuous flowing movements</li>
                    <li>Integration of breath and motion</li>
                  </ul>
                </div>
              </div>
              <ImageCard 
                src="https://images.unsplash.com/photo-1472396961693-142e6e269027"
                alt="Peaceful mountain landscape representing harmony"
                height="lg"
                className="rounded-lg shadow-lg"
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="health" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Health Benefits</CardTitle>
              <CardDescription>Physical advantages of regular practice</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-red-800">Physical Improvements</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Muscle className="h-5 w-5 text-red-600 mt-0.5" />
                      <span>Enhanced balance and flexibility</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Muscle className="h-5 w-5 text-red-600 mt-0.5" />
                      <span>Improved muscle strength and definition</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Muscle className="h-5 w-5 text-red-600 mt-0.5" />
                      <span>Better posture and body awareness</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Muscle className="h-5 w-5 text-red-600 mt-0.5" />
                      <span>Increased energy levels and stamina</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-100 mt-4">
                  <h3 className="font-semibold text-red-900 mb-2">Medical Benefits</h3>
                  <p className="text-red-800">
                    Research has shown that regular TaijiQuan practice can help reduce blood pressure, improve cardiovascular health, and enhance immune system function.
                  </p>
                </div>
              </div>
              <ImageCard 
                src="https://images.unsplash.com/photo-1469041797191-50ace28483c3"
                alt="Flowing movements representing physical harmony"
                height="lg"
                className="rounded-lg shadow-lg"
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="mental" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Mental Benefits</CardTitle>
              <CardDescription>Psychological and cognitive advantages</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  The meditative aspects of TaijiQuan provide numerous mental health benefits. The focus required during practice helps develop mindfulness and presence, while the gentle movements promote relaxation and stress relief.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <h3 className="font-semibold text-red-900 mb-2">Stress Relief</h3>
                    <p className="text-red-800 text-sm">
                      Regular practice reduces anxiety and promotes emotional balance
                    </p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <h3 className="font-semibold text-red-900 mb-2">Mental Clarity</h3>
                    <p className="text-red-800 text-sm">
                      Improves focus, concentration, and cognitive function
                    </p>
                  </div>
                </div>
              </div>
              <ImageCard 
                src="https://images.unsplash.com/photo-1493962853295-0fd70327578a"
                alt="Peaceful mountain scene representing mental clarity"
                height="lg"
                className="rounded-lg shadow-lg"
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="martial" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Martial Arts Aspects</CardTitle>
              <CardDescription>Self-defense applications and principles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    While often practiced for health benefits, TaijiQuan remains fundamentally a martial art. Each movement contains practical self-defense applications, teaching practitioners about balance, timing, and efficient use of energy.
                  </p>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <h3 className="font-semibold text-red-900 mb-2">Key Martial Concepts</h3>
                    <ul className="list-disc pl-5 space-y-2 text-red-800">
                      <li>Redirecting force rather than opposing it</li>
                      <li>Using an opponent's energy against them</li>
                      <li>Maintaining root and balance</li>
                      <li>Developing sensitivity to energy and movement</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Combat Applications</h3>
                  <p className="text-gray-700 leading-relaxed">
                    The slow, deliberate movements of TaijiQuan practice contain hidden martial applications. When applied in self-defense situations, these same movements become quick and direct, while maintaining their characteristic efficiency and grace.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PurposeOfTaijiquan;
