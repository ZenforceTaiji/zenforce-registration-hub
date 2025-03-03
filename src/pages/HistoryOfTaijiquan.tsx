<lov-code>
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const HistoryOfTaijiquan = () => {
  return (
    <div className="zen-container py-8 animate-fade-in">
      <h1 className="text-3xl font-bold tracking-tight mb-6">History of TaijiQuan (Tai Chi)</h1>
      
      <Tabs defaultValue="history">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full mb-6">
          <TabsTrigger value="history">Origins & History</TabsTrigger>
          <TabsTrigger value="yinyang">Yin Yang Philosophy</TabsTrigger>
          <TabsTrigger value="forms">Major Forms</TabsTrigger>
          <TabsTrigger value="masters">Famous Masters</TabsTrigger>
          <TabsTrigger value="hui">Hui People</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="history" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Origins and History of TaijiQuan</CardTitle>
              <CardDescription>
                Tracing the roots of this ancient Chinese martial art
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
                  <img 
                    src="https://images.unsplash.com/photo-1518611012118-696072aa579a" 
                    alt="Ancient Chinese scroll depicting martial arts" 
                    className="rounded-lg shadow-md object-cover w-full h-80"
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
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="yinyang" className="mt-0">
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
                  
                  <h3 className="text-xl font-semibold mt-6">Application in TaijiQuan</h3>
                  <p>
                    In TaijiQuan, the Yin-Yang philosophy manifests through constant transitions between substantial (Yang) and insubstantial (Yin) movements. When one part of the body is Yang (active), another part is Yin (passive).
                  </p>
                  <p>
                    This balance creates the flowing, circular movements characteristic of the art. Practitioners learn to respond to force with softness and to counter softness with appropriate force, embodying the principle of yielding to overcome.
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-center mb-6">
                    <div className="bg-white rounded-full w-64 h-64 p-4 shadow-lg border flex items-center justify-center">
                      <div className="relative w-full h-full rounded-full overflow-hidden bg-black">
                        <div className="absolute top-0 left-0 w-1/2 h-full bg-white"></div>
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-transparent" style={{ backgroundImage: "radial-gradient(circle at 75% 50%, white 0, white 15%, transparent 15%)" }}></div>
                        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-transparent" style={{ backgroundImage: "radial-gradient(circle at 25% 50%, black 0, black 15%, transparent 15%)" }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mt-6">
                    <h3 className="text-xl font-semibold">The Eight Energies</h3>
                    <p>
                      TaijiQuan embodies eight basic energies (ba jin) derived from Yin-Yang theory:
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-gray-50 rounded border">
                        <span className="font-medium">Ward Off (Peng)</span> - Yang
                      </div>
                      <div className="p-3 bg-gray-50 rounded border">
                        <span className="font-medium">Roll Back (Lu)</span> - Yin
                      </div>
                      <div className="p-3 bg-gray-50 rounded border">
                        <span className="font-medium">Press (Ji)</span> - Yang
                      </div>
                      <div className="p-3 bg-gray-50 rounded border">
                        <span className="font-medium">Push (An)</span> - Yang
                      </div>
                      <div className="p-3 bg-gray-50 rounded border">
                        <span className="font-medium">Pull (Cai)</span> - Yin
                      </div>
                      <div className="p-3 bg-gray-50 rounded border">
                        <span className="font-medium">Split (Lie)</span> - Yang
                      </div>
                      <div className="p-3 bg-gray-50 rounded border">
                        <span className="font-medium">Elbow (Zhou)</span> - Yang
                      </div>
                      <div className="p-3 bg-gray-50 rounded border">
                        <span className="font-medium">Shoulder (Kao)</span> - Yang
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="forms" className="mt-0">
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
                    <img 
                      src="https://images.unsplash.com/photo-1552196563-55cd4e45efb3" 
                      alt="Chen Style TaijiQuan" 
                      className="rounded-lg shadow-md object-cover w-full h-48 mb-4"
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
                    <img 
                      src="https://images.unsplash.com/photo-1566996699577-40f18151dbcb" 
                      alt="Yang Style TaijiQuan" 
                      className="rounded-lg shadow-md object-cover w-full h-48 mb-4"
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
                    <img 
                      src="https://images.unsplash.com/photo-1564415051543-cb578aa93032" 
                      alt="Wu Style TaijiQuan" 
                      className="rounded-lg shadow-md object-cover w-full h-40 mb-4"
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
                    <img 
                      src="https://images.unsplash.com/photo-1508672019048-805c876b67e2" 
                      alt="Wu (Hao) Style TaijiQuan" 
                      className="rounded-lg shadow-md object-cover w-full h-40 mb-4"
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
                    <img 
                      src="https://images.unsplash.com/photo-1553531768-a5f1b82ee655" 
                      alt="Sun Style TaijiQuan" 
                      className="rounded-lg shadow-md object-cover w-full h-40 mb-4"
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
        </TabsContent>
        
        <TabsContent value="masters" className="mt-0">
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
                          src="https://images.unsplash.com/photo-1526649661456-89c7ed4d00b8" 
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
                          src="https://images.unsplash.com/photo-1552196563-55cd4e45efb3" 
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
                          src="https://images.unsplash.com/photo-1552058544-f2b08422138a" 
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
                          src="https://images.unsplash.com/photo-1571945192246-4fcee13c27b1" 
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
                          src="https://images.unsplash.com/photo-1574279606130-09958dc756f7" 
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
                          src="https://images.unsplash.com/photo-1566652521483-6c9d5503bbc7" 
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
                      src="https://images.unsplash.com/photo-1617113930975-f9c7243ae527" 
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
                      src="https://images.unsplash.com/photo-1605296868161-feb3d470646e" 
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
        </TabsContent>
        
        <TabsContent value="hui" className="mt-0">
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
                    <h4 className="font-medium mb-2">Spiritual Practices of the Hui People:</h4>
                    <ul className="list-disc pl-5 space-y-2">
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
                  <img 
                    src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" 
                    alt="Representation of Hui martial arts practitioners" 
                    className="rounded-lg shadow-md object-cover w-full h-64"
                  />
                  
                  <h3 className="text-xl font-semibold mt-6">Religious Influence on Martial Practice</h3>
                  <p>
                    The Hui people's Islamic Sufi traditions profoundly shaped their approach to martial arts, including their contributions to TaijiQuan:
                  </p>
                  
                  <div className="mt-4 p-4 bg-gray-50 rounded-md border">
                    <h4 className="font-medium">Integration of Spiritual Elements</h4>
                    <p className="mt-2 text-sm">
                      Their practice of martial arts was inseparable from spiritual cultivation. The Sufi concept of fanaa (annihilation of the self) resonates with the Taoist notion of wuwei (non-action) in TaijiQuan, both emphasizing the transcendence of ego in movement.
                    </p>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gray-50 rounded-md border">
                    <h4 className="font-medium">Ritual Context</h4>
                    <p className="mt-2 text-sm">
                      Many of the circular patterns and rhythmic movements they contributed to TaijiQuan show similarities to Sufi dhikr ceremonies, where practitioners move in circular patterns while maintaining rhythmic breathing. These movements were seen as ways to harmonize the body and spirit.
                    </p>
                  </div>
                  
                  <h3 className="text-xl font-semibold mt-6">Hui Masters and Lineages</h3>
                  <p>
                    Several notable Hui masters have been recorded in historical documents, though their contributions were often absorbed into mainstream TaijiQuan lineages rather than preserved as distinct styles:
                  </p>
                  
                  <div className="mt-4 space-y-4">
                    <div className="p-4 bg-gray-50 rounded-md border">
                      <h4 className="font-medium">Master Ma Yuansheng (马元生) - Early 18th Century</h4>
                      <p className="mt-2 text-sm">
                        Known for developing distinctive stepping methods that influenced Chen-style TaijiQuan's footwork patterns. His manuscripts on harmonizing breath with movement are referenced in several historical texts.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-md border">
                      <h4 className="font-medium">The Hui Martial Artists of Henan</h4>
                      <p className="mt-2 text-sm">
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
                    <img 
                      src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
                      alt="Modern research into TaijiQuan history" 
                      className="rounded-lg shadow-md object-cover w-full h-48 mb-4"
                    />
                    <p>
                      While the distinct Hui martial traditions were sometimes overshadowed by larger systems, their influence on TaijiQuan survived through lineage-based transmission. Today, certain TaijiQuan schools preserve what they identify as Hui-influenced elements, particularly in the relationship between breath control and spiritual attunement.
                    </p>
                  </div>
                  
                  <div>
                    <img 
                      src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" 
                      alt="Digital preservation of TaijiQuan history" 
                      className="rounded-lg shadow-md object-cover w-full h-48 mb-4"
                    />
                    <p>
                      Contemporary practitioners are now integrating rediscovered Hui techniques into their practice, enriching the diversity of modern TaijiQuan. Digital archives and academic research continue to shed light on the intricate web of influences that shaped this martial art, giving proper recognition to previously marginalized contributions from groups like the Hui people.
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 p-5 bg-gray-50 rounded-lg border">
                  <h4 className="font-semibold mb-3">The Lasting Impact</h4>
                  <p>
                    While not as widely recognized as the major family styles, the Hui people's influence continues to be felt in subtle aspects of TaijiQuan practice worldwide. Their emphasis on specific breathing techniques derived from Sufi traditions and circular energy pathways has enriched the internal dimensions of the art, demonstrating how diverse cultural and religious influences have contributed to TaijiQuan's evolution as a comprehensive system of health, philosophy, and martial skill.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="videos" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>TaijiQuan Videos</CardTitle>
              <CardDescription>
                Visual demonstrations of forms, techniques, and philosophical concepts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="bg-black rounded-lg overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9">
                    <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
                      <div className="text-center p-6">
                        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                            <polygon points="5 3 19 12 5 21
