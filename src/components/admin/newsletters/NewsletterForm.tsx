
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';

export const NewsletterForm = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
    featured: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('newsletters')
        .insert([{
          ...formData,
          status: 'draft'
        }]);

      if (error) throw error;

      toast({
        title: "Newsletter Created",
        description: "The newsletter has been saved successfully.",
      });

      // Reset form
      setFormData({
        title: '',
        content: '',
        image_url: '',
        featured: false
      });

      // Refresh newsletters list
      queryClient.invalidateQueries({ queryKey: ['newsletters'] });

    } catch (error) {
      console.error('Error creating newsletter:', error);
      toast({
        title: "Error",
        description: "Failed to create newsletter. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          required
          rows={10}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image_url">Image URL (optional)</Label>
        <Input
          id="image_url"
          value={formData.image_url || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
        />
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Newsletter"}
      </Button>
    </form>
  );
};
