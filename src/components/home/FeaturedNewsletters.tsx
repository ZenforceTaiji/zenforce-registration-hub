
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

export const FeaturedNewsletters = () => {
  const { data: newsletters } = useQuery({
    queryKey: ['featured-newsletters'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('newsletters')
        .select('*')
        .eq('featured', true)
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(4);
      
      if (error) throw error;
      return data;
    },
  });

  const handleShare = (newsletter: any) => {
    const message = `*${newsletter.title}*\n\n${newsletter.content}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!newsletters?.length) return null;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Latest Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsletters.map((newsletter) => (
            <Card key={newsletter.id}>
              {newsletter.image_url && (
                <img 
                  src={newsletter.image_url} 
                  alt={newsletter.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
              <CardHeader>
                <CardTitle>{newsletter.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  {newsletter.content.length > 150 
                    ? `${newsletter.content.substring(0, 150)}...` 
                    : newsletter.content}
                </p>
                <Button
                  variant="outline" 
                  size="sm"
                  onClick={() => handleShare(newsletter)}
                  className="w-full"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share via WhatsApp
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
