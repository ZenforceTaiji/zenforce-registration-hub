
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Key, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function MFASettings() {
  const [enableTotp, setEnableTotp] = useState(true);
  const [enableSMS, setEnableSMS] = useState(false);
  const [leakedPasswordProtection, setLeakedPasswordProtection] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would call a Supabase function
      // to update the authentication settings through the admin API
      
      toast({
        title: "Security settings saved",
        description: "Your security settings have been updated successfully.",
      });
    } catch (error) {
      console.error("Failed to update security settings:", error);
      toast({
        title: "Failed to save settings",
        description: "There was a problem saving your security settings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-amber-600" />
          Multi-Factor Authentication Settings
        </CardTitle>
        <CardDescription>Configure authentication security options</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert variant="warning" className="mb-4 bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <AlertDescription>
            These settings require Supabase project configuration changes and are shown here for demonstration purposes.
            To fully implement them, visit the Supabase authentication settings.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <div>
              <Label htmlFor="enable-totp" className="font-medium">TOTP Authentication (Authenticator Apps)</Label>
              <p className="text-sm text-muted-foreground">Allow users to set up authenticator apps like Google Authenticator</p>
            </div>
            <Switch 
              id="enable-totp" 
              checked={enableTotp}
              onCheckedChange={setEnableTotp}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <div>
              <Label htmlFor="enable-sms" className="font-medium">SMS Authentication</Label>
              <p className="text-sm text-muted-foreground">Allow users to receive one-time codes via SMS</p>
            </div>
            <Switch 
              id="enable-sms" 
              checked={enableSMS}
              onCheckedChange={setEnableSMS}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <div>
              <Label htmlFor="leaked-password-protection" className="font-medium">Leaked Password Protection</Label>
              <p className="text-sm text-muted-foreground">Check passwords against HaveIBeenPwned.org database</p>
            </div>
            <Switch 
              id="leaked-password-protection" 
              checked={leakedPasswordProtection}
              onCheckedChange={setLeakedPasswordProtection}
            />
          </div>
        </div>

        <Button 
          onClick={handleSaveSettings} 
          className="w-full mt-4 bg-amber-700 hover:bg-amber-600"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Security Settings"}
        </Button>
      </CardContent>
    </Card>
  );
}
