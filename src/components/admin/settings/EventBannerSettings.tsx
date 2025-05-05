
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Event } from "@/components/events/hooks/useSupabaseEvents";
import { Loader2 } from "lucide-react";

interface BannerSettings {
  id: string;
  event_id: string | null;
  is_active: boolean;
}

export function EventBannerSettings() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<BannerSettings | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  // Fetch banner settings and upcoming events
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch banner settings
        const { data: settingsData, error: settingsError } = await supabase
          .from('banner_settings')
          .select('*')
          .limit(1)
          .single();
        
        if (settingsError) throw settingsError;
        
        // Fetch upcoming events (only future events)
        const today = new Date().toISOString().split('T')[0];
        const { data: eventsData, error: eventsError } = await supabase
          .from('events')
          .select('*')
          .gte('event_date', today)
          .order('event_date', { ascending: true });
          
        if (eventsError) throw eventsError;
        
        setSettings(settingsData);
        setEvents(eventsData || []);
      } catch (error) {
        console.error('Error fetching banner data:', error);
        toast({
          title: "Failed to load banner settings",
          description: "Please try again later",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [toast]);
  
  // Save banner settings
  const saveBannerSettings = async () => {
    if (!settings) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('banner_settings')
        .update({
          event_id: settings.event_id,
          is_active: settings.is_active,
          updated_at: new Date().toISOString()
        })
        .eq('id', settings.id);
        
      if (error) throw error;
      
      toast({
        title: "Banner settings saved",
        description: "The banner settings have been updated successfully."
      });
    } catch (error) {
      console.error('Error saving banner settings:', error);
      toast({
        title: "Failed to save banner settings",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Event Banner Settings</CardTitle>
          <CardDescription>Configure the floating event banner on the homepage</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Banner Settings</CardTitle>
        <CardDescription>Configure the floating event banner on the homepage</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="banner-active" className="flex flex-col space-y-1">
            <span>Enable Event Banner</span>
            <span className="font-normal text-sm text-muted-foreground">
              Show the event banner on the homepage
            </span>
          </Label>
          <Switch 
            id="banner-active"
            checked={settings?.is_active || false}
            onCheckedChange={(checked) => setSettings(prev => prev ? {...prev, is_active: checked} : null)}
          />
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="featured-event">Featured Event</Label>
          <Select 
            value={settings?.event_id || ''} 
            onValueChange={(value) => setSettings(prev => prev ? {...prev, event_id: value || null} : null)}
            disabled={!settings?.is_active}
          >
            <SelectTrigger id="featured-event" className="w-full">
              <SelectValue placeholder="Select an event to feature" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">None (No featured event)</SelectItem>
              {events.map((event) => (
                <SelectItem key={event.id} value={event.id}>
                  {event.title} - {new Date(event.event_date).toLocaleDateString()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          className="w-full mt-4" 
          onClick={saveBannerSettings}
          disabled={saving}
        >
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : "Save Banner Settings"}
        </Button>
      </CardContent>
    </Card>
  );
}
