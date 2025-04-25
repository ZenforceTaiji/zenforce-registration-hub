
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const GoogleCalendarSync = () => {
  const [isSynced, setIsSynced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSync = async () => {
    setIsLoading(true);
    
    // In a real application, this would connect to Google Calendar API
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSynced(true);
      toast({
        title: "Calendar synced",
        description: "Your classes have been synced with Google Calendar",
      });
    } catch (error) {
      toast({
        title: "Sync failed",
        description: "Could not sync with Google Calendar",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">Google Calendar Sync</h3>
        
        {isSynced ? (
          <div className="text-xs text-green-600 flex items-center">
            <div className="h-2 w-2 rounded-full bg-green-600 mr-1"></div>
            Synced with Google Calendar
          </div>
        ) : (
          <Alert variant="outline" className="py-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Connect to your Google Calendar to sync class schedule
            </AlertDescription>
          </Alert>
        )}
      </div>
      
      <Button 
        variant={isSynced ? "default" : "default"}
        size="sm" 
        className="w-full"
        onClick={handleSync}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
            Syncing...
          </>
        ) : isSynced ? (
          "Re-sync Calendar"
        ) : (
          "Sync with Google Calendar"
        )}
      </Button>
    </div>
  );
};

export default GoogleCalendarSync;
