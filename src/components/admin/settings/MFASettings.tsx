
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Key, AlertCircle, Lock, Bell, Fingerprint, ShieldCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface SecuritySettings {
  enableTotp: boolean;
  enableSMS: boolean;
  leakedPasswordProtection: boolean;
  passwordMinLength: boolean;
  passwordComplexity: boolean;
}

export function MFASettings() {
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    enableTotp: true,
    enableSMS: false,
    leakedPasswordProtection: false,
    passwordMinLength: true,
    passwordComplexity: false
  });
  const [loading, setLoading] = useState(false);
  const [configStatus, setConfigStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Form setup with react-hook-form
  const form = useForm<SecuritySettings>({
    defaultValues: securitySettings
  });

  // Update form when settings change
  useEffect(() => {
    form.reset(securitySettings);
  }, [securitySettings, form]);

  const fetchCurrentSettings = async () => {
    try {
      setLoading(true);
      // In a real implementation, you would fetch the current settings from Supabase Admin API
      // For demonstration purposes, we'll simulate fetching from Supabase
      const { data, error } = await supabase.rpc('get_auth_settings');
      
      if (error) throw error;
      
      // If we have data, update our settings
      if (data) {
        setSecuritySettings({
          enableTotp: data.enable_totp || false,
          enableSMS: data.enable_sms || false,
          leakedPasswordProtection: data.leaked_password_protection || false,
          passwordMinLength: data.password_min_length || true,
          passwordComplexity: data.password_complexity || false
        });
      }
    } catch (error) {
      console.error("Failed to fetch security settings:", error);
      // Fall back to default settings if we can't fetch
      setSecuritySettings({
        enableTotp: true,
        enableSMS: false,
        leakedPasswordProtection: false,
        passwordMinLength: true,
        passwordComplexity: false
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch current settings on component mount
  useEffect(() => {
    fetchCurrentSettings();
  }, []);

  const handleSaveSettings = async (data: SecuritySettings) => {
    setLoading(true);
    try {
      // In a real implementation, this would call a Supabase Admin API or RPC function
      // to update the authentication settings
      const { error } = await supabase.rpc('update_auth_settings', {
        enable_totp: data.enableTotp,
        enable_sms: data.enableSMS,
        leaked_password_protection: data.leakedPasswordProtection,
        password_min_length: data.passwordMinLength,
        password_complexity: data.passwordComplexity
      });
      
      if (error) throw error;
      
      setSecuritySettings(data);
      setConfigStatus('success');
      
      toast({
        title: "Security settings saved",
        description: "Your security settings have been updated successfully.",
      });
    } catch (error) {
      console.error("Failed to update security settings:", error);
      setConfigStatus('error');
      
      toast({
        title: "Failed to save settings",
        description: "There was a problem saving your security settings. Please update them directly in the Supabase dashboard.",
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
          <ShieldCheck className="h-5 w-5 text-amber-600" />
          Multi-Factor Authentication Settings
        </CardTitle>
        <CardDescription>Configure authentication security options to enhance account protection</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert variant="warning" className="mb-4 bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <AlertDescription>
            These settings require Supabase project configuration changes. To fully implement them, please also visit the{" "}
            <a 
              href="https://supabase.com/dashboard/project/vyjhxyazgtdldzejjbzu/auth/providers" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-medium text-amber-700 underline hover:text-amber-800"
            >
              Supabase authentication settings
            </a>.
          </AlertDescription>
        </Alert>

        {configStatus === 'success' && (
          <Alert variant="success" className="mb-4 bg-green-50 border-green-200">
            <ShieldCheck className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Security Enhanced</AlertTitle>
            <AlertDescription className="text-green-700">
              Your security settings have been updated successfully. These changes will help protect user accounts from unauthorized access.
            </AlertDescription>
          </Alert>
        )}

        {configStatus === 'error' && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Configuration Error</AlertTitle>
            <AlertDescription>
              There was an error applying these settings. Please make changes directly in the{" "}
              <a 
                href="https://supabase.com/dashboard/project/vyjhxyazgtdldzejjbzu/auth/providers" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-medium underline"
              >
                Supabase authentication settings
              </a>.
            </AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSaveSettings)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Multi-Factor Authentication</h3>
              <div className="space-y-4 pl-1">
                <FormField
                  control={form.control}
                  name="enableTotp"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center">
                          <Fingerprint className="h-4 w-4 text-amber-600 mr-2" />
                          <FormLabel className="font-medium">TOTP Authentication (Authenticator Apps)</FormLabel>
                        </div>
                        <FormDescription className="text-sm text-muted-foreground">
                          Allow users to set up authenticator apps like Google Authenticator
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={loading}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="enableSMS"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center">
                          <Bell className="h-4 w-4 text-amber-600 mr-2" />
                          <FormLabel className="font-medium">SMS Authentication</FormLabel>
                        </div>
                        <FormDescription className="text-sm text-muted-foreground">
                          Allow users to receive one-time codes via SMS messages
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={loading}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <h3 className="text-lg font-medium pt-2">Password Security</h3>
              <div className="space-y-4 pl-1">
                <FormField
                  control={form.control}
                  name="leakedPasswordProtection"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center">
                          <Lock className="h-4 w-4 text-amber-600 mr-2" />
                          <FormLabel className="font-medium">Leaked Password Protection</FormLabel>
                        </div>
                        <FormDescription className="text-sm text-muted-foreground">
                          Check passwords against HaveIBeenPwned.org database to prevent use of compromised credentials
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={loading}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="passwordMinLength"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center">
                          <Key className="h-4 w-4 text-amber-600 mr-2" />
                          <FormLabel className="font-medium">Minimum Password Length (8+)</FormLabel>
                        </div>
                        <FormDescription className="text-sm text-muted-foreground">
                          Require passwords to be at least 8 characters long
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={loading}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="passwordComplexity"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center">
                          <Key className="h-4 w-4 text-amber-600 mr-2" />
                          <FormLabel className="font-medium">Password Complexity Requirements</FormLabel>
                        </div>
                        <FormDescription className="text-sm text-muted-foreground">
                          Require passwords to include uppercase, lowercase, numbers and special characters
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={loading}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button 
              type="submit"
              className="w-full mt-6 bg-amber-700 hover:bg-amber-600"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Security Settings"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
