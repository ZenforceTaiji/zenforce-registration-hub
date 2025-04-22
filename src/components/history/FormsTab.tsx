
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ImageCard from "./shared/ImageCard";

export const FormsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Major Forms of TaijiQuan</CardTitle>
        <CardDescription>
          Exploring the diverse styles and forms across different lineages
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Chen Style</h3>
              <ImageCard 
                src="https://images.unsplash.com/photo-1552196563-55cd4e45efb3" 
                alt="Chen Style TaijiQuan"
                height="sm"
                className="mb-4"
              />
              <p>
                The oldest form of TaijiQuan, characterized by silk-reeling (chán sī jìng) movements, alternating between slow and explosive actions (fā jìn), and lower stances.
              </p>
              <div className="mt-3">
                <strong>Key Forms:</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>Laojia (Old Frame): 74 & 86 movement sequences</li>
                  <li>Xinjia (New Frame): 83 movement sequence</li>
                  <li>Small Frame (Xiaojia)</li>
                  <li>Chen 56, 38, 19, and 13 movement forms</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Yang Style</h3>
              <ImageCard 
                src="https://images.unsplash.com/photo-1566996699577-40f18151dbcb" 
                alt="Yang Style TaijiQuan"
                height="sm"
                className="mb-4"
              />
              <p>
                The most widely practiced style today, known for its gentle, flowing movements and extended postures. Developed by Yang Luchan in the 19th century.
              </p>
              <div className="mt-3">
                <strong>Key Forms:</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>Traditional Long Form: 108 or 103 movements</li>
                  <li>Yang 24 Form (Simplified/Beijing Form)</li>
                  <li>Yang 40 Form</li>
                  <li>Yang 16 and 8 Form</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Wu Style</h3>
              <ImageCard 
                src="https://images.unsplash.com/photo-1564415051543-cb578aa93032" 
                alt="Wu Style TaijiQuan"
                height="sm"
                className="mb-4"
              />
              <p>
                Characterized by slightly forward-leaning postures and compact movements. Developed by Wu Jianquan from Yang style.
              </p>
              <div className="mt-3">
                <strong>Key Forms:</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>108 movement traditional form</li>
                  <li>Wu 37 Form</li>
                  <li>Fast Wu form</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Wu (Hao) Style</h3>
              <ImageCard 
                src="https://images.unsplash.com/photo-1508672019048-805c876b67e2" 
                alt="Wu (Hao) Style TaijiQuan"
                height="sm"
                className="mb-4"
              />
              <p>
                The most compact of the major styles, featuring small, subtle movements with an emphasis on internal energy. Developed by Wu Yuxiang.
              </p>
              <div className="mt-3">
                <strong>Key Forms:</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>46 movement traditional form</li>
                  <li>96 movement form</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Sun Style</h3>
              <ImageCard 
                src="https://images.unsplash.com/photo-1553531768-a5f1b82ee655" 
                alt="Sun Style TaijiQuan"
                height="sm"
                className="mb-4"
              />
              <p>
                The youngest of the major styles, incorporating elements of Bagua and Xingyi. Features unique stepping and agile movements. Developed by Sun Lutang.
              </p>
              <div className="mt-3">
                <strong>Key Forms:</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>97 movement traditional form</li>
                  <li>Sun 73 Form</li>
                  <li>Competition 41 Form</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-5 bg-gray-50 rounded-lg border">
            <h3 className="text-xl font-semibold mb-3">Standardized Forms</h3>
            <p className="mb-4">
              In addition to traditional family styles, several standardized forms have been developed for competition and broader practice:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-3 bg-white rounded shadow-sm">
                <strong>24-Form (Simplified)</strong>
                <p className="text-sm mt-1">Created in 1956, this Yang-style-based form is often the first form taught to beginners worldwide.</p>
              </div>
              <div className="p-3 bg-white rounded shadow-sm">
                <strong>48-Form (Combined)</strong>
                <p className="text-sm mt-1">Combines elements from all major styles into a comprehensive routine.</p>
              </div>
              <div className="p-3 bg-white rounded shadow-sm">
                <strong>42-Form (Competition)</strong>
                <p className="text-sm mt-1">Developed specifically for international wushu competitions, including athletic elements.</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
