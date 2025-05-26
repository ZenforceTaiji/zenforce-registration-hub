
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import { FormsTab } from "@/components/history/FormsTab";
import { MastersTab } from "@/components/history/MastersTab";
import { HuiPeopleTab } from "@/components/history/HuiPeopleTab";
import { VideosTab } from "@/components/history/VideosTab";
import HistoryTab from "@/components/history/tabs/HistoryTab";
import YinYangTab from "@/components/history/tabs/YinYangTab";
import ChenStyleTab from "@/components/history/tabs/ChenStyleTab";

const HistoryOfTaijiquan = () => {
  const { data: historyContent } = useWebsiteContent('history');

  const introContent = historyContent?.find(
    content => content.section_name === 'history-intro'
  );

  return (
    <div className="zen-container py-8 animate-fade-in">
      <h1 className="text-3xl font-bold tracking-tight mb-6">
        {introContent?.title || "History of TaijiQuan (Tai Chi)"}
      </h1>
      
      <Tabs defaultValue="history">
        <TabsList className="grid grid-cols-3 md:grid-cols-7 w-full mb-6">
          <TabsTrigger value="history">Origins & History</TabsTrigger>
          <TabsTrigger value="yinyang">Yin Yang Philosophy</TabsTrigger>
          <TabsTrigger value="chenstyle">Chen Style</TabsTrigger>
          <TabsTrigger value="forms">Major Forms</TabsTrigger>
          <TabsTrigger value="masters">Famous Masters</TabsTrigger>
          <TabsTrigger value="hui">Hui People</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="history" className="mt-0">
          <HistoryTab introContent={introContent} />
        </TabsContent>
        
        <TabsContent value="yinyang" className="mt-0">
          <YinYangTab />
        </TabsContent>
        
        <TabsContent value="chenstyle" className="mt-0">
          <ChenStyleTab />
        </TabsContent>
        
        <TabsContent value="forms" className="mt-0">
          <FormsTab />
        </TabsContent>
        
        <TabsContent value="masters" className="mt-0">
          <MastersTab />
        </TabsContent>
        
        <TabsContent value="hui" className="mt-0">
          <HuiPeopleTab />
        </TabsContent>
        
        <TabsContent value="videos" className="mt-0">
          <VideosTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HistoryOfTaijiquan;
