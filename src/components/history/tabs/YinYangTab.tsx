
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ImageCard from "../shared/ImageCard";

const YinYangTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>The Yin Yang Philosophy</CardTitle>
        <CardDescription>
          Understanding the philosophical foundation of TaijiQuan
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">The Taiji Symbol</h3>
            <p>
              The Taiji (太極) symbol, commonly known as the Yin-Yang symbol, represents the ancient Chinese understanding of how things work. The black and white halves represent opposing yet complementary forces in the universe.
            </p>
            
            <div className="mt-4 p-4 bg-gray-50 rounded-md border">
              <h4 className="font-medium mb-2">Key Principles:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Duality:</strong> Everything contains opposite forces that depend on each other</li>
                <li><strong>Harmony:</strong> Balance between opposing forces creates stability</li>
                <li><strong>Cyclical Nature:</strong> Opposites constantly transform into each other</li>
                <li><strong>Relativity:</strong> Nothing is absolute; everything exists in relation to its opposite</li>
              </ul>
            </div>
          </div>
          
          <div>
            <ImageCard 
              src="/lovable-uploads/7d99fec3-ce77-4b28-9f07-6afbbf5ce82a.png"
              alt="Traditional Chinese yin-yang symbols with philosophical annotations"
              height="lg"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default YinYangTab;
