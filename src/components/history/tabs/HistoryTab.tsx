
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ImageCard from "../shared/ImageCard";

interface HistoryTabProps {
  introContent?: {
    title?: string | null;
    description?: string | null;
    content?: string;
  };
}

const HistoryTab = ({ introContent }: HistoryTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{introContent?.title || "Origins and History of TaijiQuan"}</CardTitle>
        <CardDescription>
          {introContent?.description || "Tracing the roots of this ancient Chinese martial art"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {introContent?.content && (
          <p className="text-gray-700 leading-relaxed mb-4">{introContent.content}</p>
        )}
        
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Early Origins</h3>
              <p>
                The origins of TaijiQuan (太極拳) date back to the 13th century during the late Song Dynasty or early Yuan Dynasty in China. Its creation is typically attributed to the Taoist monk Zhang Sanfeng, who is said to have developed the art after observing a fight between a snake and a crane.
              </p>
              <p>
                Historical records suggest the martial art first became widely recognized during the Chen family lineage in the Chen Village (Chenjiagou) in Henan Province around the 16th century.
              </p>
              
              <h3 className="text-xl font-semibold mt-6">Development Through Dynasties</h3>
              <p>
                Through the Ming Dynasty (1368-1644) and Qing Dynasty (1644-1912), TaijiQuan evolved from a fighting system into a practice that combined martial skill with health benefits and philosophical depth.
              </p>
              <p>
                By the 19th century, TaijiQuan had branched into several major styles, each carrying the name of the family that developed it: Chen, Yang, Wu, Wu (Hao), and Sun styles.
              </p>
            </div>
            
            <div className="space-y-4">
              <ImageCard 
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a"
                alt="Ancient Chinese scroll depicting martial arts"
                height="lg"
              />
              
              <h3 className="text-xl font-semibold mt-6">Modern Era</h3>
              <p>
                In the early 20th century, TaijiQuan became more accessible to the general public as masters began teaching outside family lineages. The Chinese government later standardized several simplified forms for mass practice and competition.
              </p>
              <p>
                Today, TaijiQuan is practiced worldwide as a form of exercise, meditation, and self-defense. In 2020, UNESCO recognized TaijiQuan as an Intangible Cultural Heritage of Humanity, acknowledging its cultural significance and global impact.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoryTab;
