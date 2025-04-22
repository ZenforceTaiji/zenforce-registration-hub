
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Share2, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const NewsletterList = () => {
  const { toast } = useToast();

  const { data: newsletters, isLoading } = useQuery({
    queryKey: ['newsletters'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('newsletters')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const handleShare = async (newsletter: any) => {
    // Format the message for WhatsApp
    const message = `*${newsletter.title}*\n\n${newsletter.content}`;
    
    // Create WhatsApp share URL
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in a new window
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Newsletter Ready to Share",
      description: "The newsletter has been formatted for WhatsApp sharing.",
    });
  };

  if (isLoading) {
    return <div>Loading newsletters...</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {newsletters?.map((newsletter) => (
            <TableRow key={newsletter.id}>
              <TableCell>{newsletter.title}</TableCell>
              <TableCell>{newsletter.status}</TableCell>
              <TableCell>{new Date(newsletter.created_at).toLocaleDateString()}</TableCell>
              <TableCell>{newsletter.featured ? "Yes" : "No"}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare(newsletter)}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share via WhatsApp
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
