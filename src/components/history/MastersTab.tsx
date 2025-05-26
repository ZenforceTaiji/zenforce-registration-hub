
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ImageCard from "./shared/ImageCard";

export const MastersTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Famous Masters of TaijiQuan</CardTitle>
        <CardDescription>
          The lineage of influential teachers who shaped the art
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <img 
                    src="/lovable-uploads/1dae467e-f31b-46a2-b4c0-05f27fdaf7d6.png" 
                    alt="Zhang Sanfeng" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Zhang Sanfeng</h3>
                  <p className="text-gray-500">13th Century</p>
                  <p className="mt-2">
                    The legendary Taoist monk often credited with creating TaijiQuan. According to tradition, he developed the art after observing a fight between a snake and a crane, noting how the snake's yielding movements allowed it to overcome the crane's direct attacks.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <img 
                    src="/lovable-uploads/7b7e6b43-2687-4478-829b-d0e5bdc857be.png" 
                    alt="Chen Wangting" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Chen Wangting</h3>
                  <p className="text-gray-500">1600-1680</p>
                  <p className="mt-2">
                    A military officer from the Chen village, he systematized earlier martial practices into what would become Chen-style TaijiQuan. He integrated Taoist breathing exercises, traditional medicine theory, and military techniques into a comprehensive martial system.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <img 
                    src="/lovable-uploads/8c429d79-0dfa-4148-ad9c-d68ba313a07c.png" 
                    alt="Yang Luchan" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Yang Luchan</h3>
                  <p className="text-gray-500">1799-1872</p>
                  <p className="mt-2">
                    Known as "Yang the Invincible," he was the first to learn Chen-style TaijiQuan from outside the Chen family. He modified the art into what became Yang-style TaijiQuan and introduced it to Beijing, teaching imperial nobles and the public.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <img 
                    src="/lovable-uploads/6bbd589f-5796-48ad-9254-4bcc9f68776b.png" 
                    alt="Wu Jianquan" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Wu Jianquan</h3>
                  <p className="text-gray-500">1870-1942</p>
                  <p className="mt-2">
                    The founder of Wu-style TaijiQuan, he learned from his father Wu Quanyou, who had studied under Yang Luchan. Wu Jianquan made TaijiQuan more accessible to the public by establishing the Jianquan TaijiQuan Association in 1935.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <img 
                    src="/lovable-uploads/a7629c03-0cff-4929-b989-3b3f74521f33.png" 
                    alt="Sun Lutang" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Sun Lutang</h3>
                  <p className="text-gray-500">1860-1933</p>
                  <p className="mt-2">
                    A master of multiple internal martial arts (Xingyi, Bagua, and TaijiQuan), he created Sun-style TaijiQuan by integrating elements from these systems. His books on internal martial arts were some of the first to publish these teachings widely.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <img 
                    src="/lovable-uploads/35bde1c8-7a93-4e7a-99e4-34278eb9f433.png" 
                    alt="Chen Fake" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Chen Fake</h3>
                  <p className="text-gray-500">1887-1957</p>
                  <p className="mt-2">
                    A 17th-generation master of Chen-style TaijiQuan who brought the art to Beijing in 1928. His powerful demonstrations helped restore the reputation of Chen-style TaijiQuan and inspired many students.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mt-8">Modern Masters</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <img 
                src="/lovable-uploads/a908bd85-90f7-4542-907b-18123dddd8c4.png" 
                alt="Cheng Man-ch'ing" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold">Cheng Man-ch'ing</h4>
                <p className="text-gray-500 text-sm">1902-1975</p>
                <p className="mt-2 text-sm">
                  Known as the "Master of Five Excellences" for his skill in painting, poetry, calligraphy, medicine, and martial arts. He simplified Yang-style TaijiQuan into a 37-movement form that became highly influential in the West.
                </p>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <img 
                src="/lovable-uploads/905eef25-75d3-45a6-b9c7-80dbb8ae0f67.png" 
                alt="Chen Xiaowang" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold">Chen Xiaowang</h4>
                <p className="text-gray-500 text-sm">1946-present</p>
                <p className="mt-2 text-sm">
                  A 19th-generation lineage holder of Chen-style TaijiQuan and four-time National TaijiQuan Champion in China. He has been instrumental in spreading authentic Chen-style TaijiQuan worldwide.
                </p>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1524673450801-b5aa9b621b76" 
                alt="Yang Zhenduo" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold">Yang Zhenduo</h4>
                <p className="text-gray-500 text-sm">1926-present</p>
                <p className="mt-2 text-sm">
                  The third son of Yang Chengfu and a representative of the traditional Yang-style TaijiQuan. He has authored books and traveled extensively to teach the authentic Yang family style.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
