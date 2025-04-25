
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";

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
          <TabsTrigger value="general">General Overview</TabsTrigger>
          <TabsTrigger value="health">Health Benefits</TabsTrigger>
          <TabsTrigger value="mental">Mental Benefits</TabsTrigger>
          <TabsTrigger value="martial">Martial Arts Aspects</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-0">
          <div className="prose max-w-none">
            <p>TaijiQuan is a centuries-old Chinese martial art that combines slow, graceful movements with meditation and deep breathing. It is often described as "meditation in motion" or "moving meditation" because it promotes serenity through gentle, flowing movements.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="health" className="mt-0">
          <div className="prose max-w-none">
            <p>The health benefits of TaijiQuan include improved balance, flexibility, and strength. Regular practice can help reduce stress, lower blood pressure, and enhance overall physical well-being.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="mental" className="mt-0">
          <div className="prose max-w-none">
            <p>TaijiQuan practice can improve mental clarity, reduce anxiety, and enhance mindfulness. The meditative aspects of the practice help practitioners develop better focus and emotional balance.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="martial" className="mt-0">
          <div className="prose max-w-none">
            <p>While often practiced for health benefits, TaijiQuan is fundamentally a martial art. Its movements are derived from combat applications, teaching practitioners about balance, timing, and the efficient use of energy in self-defense.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PurposeOfTaijiquan;
