
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ImageCard from "./shared/ImageCard";

export const HuiPeopleTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>The Hui People's Contribution to TaijiQuan</CardTitle>
        <CardDescription>
          Exploring the often overlooked influence of the Hui ethnic group on TaijiQuan's development
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Origins and Identity</h3>
            <p>
              The Hui people (回族, Huízú) are one of China's officially recognized ethnic minorities, predominantly Muslim in faith and widely distributed across northwestern China. While they share many cultural traits with the Han Chinese majority, they maintain a distinct identity through their religious practices, customs, and historical heritage.
            </p>
            <p>
              Historically, the Hui emerged from the intermarriage between Arab and Persian Muslim merchants and local Chinese during the Tang and Song dynasties (7th-13th centuries). By the Ming and Qing dynasties, Hui communities had established themselves as important cultural bridges between Chinese and Islamic traditions, developing unique syncretic practices.
            </p>
            
            <h3 className="text-xl font-semibold mt-6">Religious and Philosophical Beliefs</h3>
            <div className="mt-3 p-4 bg-gray-50 rounded-md border">
              <h4 className="font-medium mb-2 text-black">Spiritual Practices of the Hui People:</h4>
              <ul className="list-disc pl-5 space-y-2 text-black">
                <li><strong>Islamic Foundation:</strong> The Hui practice Islam, primarily of the Sunni Hanafi school, but with uniquely Chinese characteristics</li>
                <li><strong>Sufism:</strong> Many Hui communities embrace Sufi traditions, which emphasize spiritual development through physical and meditative practices</li>
                <li><strong>Dhikr Rituals:</strong> Rhythmic breathing and movement practices reciting the names of Allah, creating a meditative state similar to qigong</li>
                <li><strong>Chinese Integration:</strong> Their religious practices often incorporate elements of Confucian ethics and traditional Chinese concepts of harmony</li>
                <li><strong>Physical Cultivation:</strong> Unlike some interpretations of Islam, the Hui traditions place significant emphasis on physical cultivation as a path to spiritual enlightenment</li>
              </ul>
            </div>
            
            <h3 className="text-xl font-semibold mt-6">Historical Context</h3>
            <p>
              The Hui people, particularly those in Henan, Hebei, and Shandong provinces, lived in proximity to the cradles of TaijiQuan development during the late Ming and early Qing dynasties (17th-18th centuries). This geographical overlap created natural opportunities for cultural exchange and martial arts cross-pollination.
            </p>
            <p>
              Historical records suggest that several Hui martial artists were among those who exchanged knowledge with Chen village masters during the refinement of Chen-style TaijiQuan, bringing their unique perspective on internal energy cultivation derived from Sufi practices.
            </p>
          </div>
          
          <div className="space-y-4">
            <ImageCard 
              src="/lovable-uploads/b4dc3270-34a9-4dd6-a619-d9ee7dfa8d90.png" 
              alt="Historical representation of Hui martial arts practitioners"
              height="lg"
            />
            
            <h3 className="text-xl font-semibold mt-6">Religious Influence on Martial Practice</h3>
            <p>
              The Hui people's Islamic Sufi traditions profoundly shaped their approach to martial arts, including their contributions to TaijiQuan:
            </p>
            
            <div className="mt-4 p-4 bg-gray-50 rounded-md border">
              <h4 className="font-medium text-black">Integration of Spiritual Elements</h4>
              <p className="mt-2 text-sm text-black">
                Their practice of martial arts was inseparable from spiritual cultivation. The Sufi concept of fanaa (annihilation of the self) resonates with the Taoist notion of wuwei (non-action) in TaijiQuan, both emphasizing the transcendence of ego in movement.
              </p>
            </div>
            
            <div className="mt-4 p-4 bg-gray-50 rounded-md border">
              <h4 className="font-medium text-black">Ritual Context</h4>
              <p className="mt-2 text-sm text-black">
                Many of the circular patterns and rhythmic movements they contributed to TaijiQuan show similarities to Sufi dhikr ceremonies, where practitioners move in circular patterns while maintaining rhythmic breathing. These movements were seen as ways to harmonize the body and spirit.
              </p>
            </div>
            
            <h3 className="text-xl font-semibold mt-6">Hui Masters and Lineages</h3>
            <p>
              Several notable Hui masters have been recorded in historical documents, though their contributions were often absorbed into mainstream TaijiQuan lineages rather than preserved as distinct styles:
            </p>
            
            <div className="mt-4 space-y-4">
              <div className="p-4 bg-gray-50 rounded-md border">
                <h4 className="font-medium text-black">Master Ma Yuansheng (马元生) - Early 18th Century</h4>
                <p className="mt-2 text-sm text-black">
                  Known for developing distinctive stepping methods that influenced Chen-style TaijiQuan's footwork patterns. His manuscripts on harmonizing breath with movement are referenced in several historical texts.
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-md border">
                <h4 className="font-medium text-black">The Hui Martial Artists of Henan</h4>
                <p className="mt-2 text-sm text-black">
                  A community of practitioners that preserved distinctive breathing methods and subtle hand techniques derived from Sufi dhikr practices. Their integration with Yang-style TaijiQuan in the 19th century brought new dimensions to the art's internal aspects.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Cultural Preservation and Legacy</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <ImageCard 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
                alt="Modern research into TaijiQuan history"
                height="sm"
                className="mb-4"
              />
              <p>
                While the distinct Hui martial traditions were sometimes overshadowed by larger systems, their influence on TaijiQuan survived through lineage-based transmission. Today, certain TaijiQuan schools preserve what they identify as Hui-influenced elements, particularly in the relationship between breath control and spiritual attunement.
              </p>
            </div>
            
            <div>
              <ImageCard 
                src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" 
                alt="Digital preservation of TaijiQuan history"
                height="sm"
                className="mb-4"
              />
              <p>
                Contemporary practitioners are now integrating rediscovered Hui techniques into their practice, enriching the diversity of modern TaijiQuan. Digital archives and academic research continue to shed light on the intricate web of influences that shaped this martial art, giving proper recognition to previously marginalized contributions from groups like the Hui people.
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-5 bg-gray-50 rounded-lg border">
            <h4 className="font-semibold mb-3 text-black">The Lasting Impact</h4>
            <p className="text-black">
              While not as widely recognized as the major family styles, the Hui people's influence continues to be felt in subtle aspects of TaijiQuan practice worldwide. Their emphasis on specific breathing techniques derived from Sufi traditions and circular energy pathways has enriched the internal dimensions of the art, demonstrating how diverse cultural and religious influences have contributed to TaijiQuan's evolution as a comprehensive system of health, philosophy, and martial skill.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
