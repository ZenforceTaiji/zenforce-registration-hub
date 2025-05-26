
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ImageCard from "../shared/ImageCard";

const ChenStyleTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chen Style TaijiQuan</CardTitle>
        <CardDescription>
          The oldest and original style of TaijiQuan martial arts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Origins of Chen Style</h3>
            <p>
              Chen-style TaijiQuan is the oldest and original form of TaijiQuan, created by Chen Wangting in the 17th century during the late Ming and early Qing dynasties. The Chen family of Chenjiagou village in Henan Province developed and preserved this martial art for over 400 years.
            </p>
            
            <h3 className="text-xl font-semibold">Distinctive Characteristics</h3>
            <p>
              Chen-style is characterized by its explosive power (fa jin), spiral movements, and alternating between slow and fast tempos. Unlike other styles, it maintains the original martial applications with clear fighting techniques integrated into the flowing movements.
            </p>
            
            <div className="mt-4 p-4 bg-gray-50 rounded-md border">
              <h4 className="font-medium mb-2 text-black">Key Features:</h4>
              <ul className="list-disc pl-5 space-y-2 text-black">
                <li><strong>Spiral Energy:</strong> Movements follow spiral patterns through the body</li>
                <li><strong>Fa Jin:</strong> Explosive power release at specific moments</li>
                <li><strong>Low Stances:</strong> Deep, stable postures for martial effectiveness</li>
                <li><strong>Combat Applications:</strong> Clear self-defense techniques within forms</li>
              </ul>
            </div>
          </div>
          
          <div>
            <ImageCard 
              src="/lovable-uploads/b4dc3270-34a9-4dd6-a619-d9ee7dfa8d90.png"
              alt="Historical portrait of a Chen-style TaijiQuan master"
              height="lg"
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Historical Documentation</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <ImageCard 
                src="/lovable-uploads/37dd5a6b-4196-4ed1-b4de-1f0b0eeb466b.png"
                alt="Traditional Chinese illustration of a TaijiQuan master from historical texts"
                height="lg"
              />
            </div>
            <div className="space-y-4">
              <p>
                This traditional Chinese illustration represents the classical documentation of TaijiQuan masters from historical texts. Such images were commonly used in martial arts manuals and family records to preserve the lineage and teachings of great masters.
              </p>
              <p>
                The formal pose and traditional robes depicted in these historical illustrations reflect the scholarly and philosophical nature of TaijiQuan masters, who were often educated individuals who combined martial prowess with deep understanding of Chinese philosophy and medicine.
              </p>
              <div className="mt-4 p-4 bg-blue-50 rounded-md border">
                <h4 className="font-medium mb-2 text-black">Historical Significance:</h4>
                <ul className="list-disc pl-5 space-y-2 text-black">
                  <li>Documented the lineage and transmission of knowledge</li>
                  <li>Preserved the visual memory of important masters</li>
                  <li>Showed the scholarly tradition within martial arts</li>
                  <li>Integrated with classical Chinese texts and calligraphy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Legacy and Influence</h3>
          <p>
            The Chen family maintained their martial art as a closely guarded secret for generations until Chen Changxing (14th generation) began teaching Yang Luchan, who later developed the Yang style. This marked the beginning of TaijiQuan's spread beyond the Chen village.
          </p>
          <p>
            Today, Chen-style continues to be practiced worldwide, with both traditional forms and modern standardized versions. The style emphasizes both health benefits and martial effectiveness, maintaining the complete system of TaijiQuan as originally conceived.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChenStyleTab;
