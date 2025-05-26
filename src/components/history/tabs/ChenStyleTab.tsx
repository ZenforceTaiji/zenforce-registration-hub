
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
