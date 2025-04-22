
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface WebsiteContent {
  id: string;
  section_name: string;
  content: string;
  title: string | null;
  description: string | null;
  page: string;
}

export const useWebsiteContent = (page: string) => {
  return useQuery({
    queryKey: ['website-content', page],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('website_content')
        .select('*')
        .eq('page', page);
      
      if (error) throw error;
      return data as WebsiteContent[];
    },
  });
};
