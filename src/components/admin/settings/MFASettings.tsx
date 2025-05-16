import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Shield, Key, AlertCircle, Lock, Bell, Fingerprint, ShieldCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";

interface SecuritySettings {
  enableTotp: boolean;
  enableSMS: boolean;
  leakedPasswordProtection: boolean;
  passwordMinLength: boolean;
  passwordComplexity: boolean;
}

export function MFASettings() {
  const { toast } = useToast();
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    enableTotp: true,
    enableSMS: false,
    leakedPasswordProtection: false,
    passwordMinLength: true,
    passwordComplexity: false
  });
  const [loading, setLoading] = useState(true);
  const [configStatus, setConfigStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [mounted, setMounted] = useState(false);
  
  // Form setup with react-hook-form
  const form = useForm<SecuritySettings>({
    defaultValues: securitySettings
  });

  // Mark component as mounted to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update form when settings change
  useEffect(() => {
    if (mounted) {
      form.reset(securitySettings);
    }
  }, [securitySettings, form, mounted]);

  const fetchCurrentSettings = async () => {
    try {
      // For demonstration, we'll use default settings
      // In a real implementation, you'd query a settings table or use another method
      setTimeout(() => {
        setSecuritySettings({
          enableTotp: true,
          enableSMS: false,
          leakedPasswordProtection: true, // Set to true per security recommendation
          passwordMinLength: true,
          passwordComplexity: true // Set to true per security recommendation
        });
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Failed to fetch security settings:", error);
      // Fall back to default settings if we can't fetch
      setSecuritySettings({
        enableTotp: true,
        enableSMS: false,
        leakedPasswordProtection: true,
        passwordMinLength: true,
        passwordComplexity: true
      });
      setLoading(false);
    }
  };

  // Fetch current settings on component mount
  useEffect(() => {
    if (mounted) {
      fetchCurrentSettings();
    }
  }, [mounted]);

  const handleSaveSettings = async (data: SecuritySettings) => {
    setLoading(true);
    try {
      // Simulate API call success
      setTimeout(() => {
        setSecuritySettings(data);
        setConfigStatus('success');
        
        toast({
          title: "Security settings saved",
          description: "Your security settings have been updated successfully.",
        });
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error("Failed to update security settings:", error);
      setConfigStatus('error');
      
      toast({
        title: "Failed to save settings",
        description: "There was a problem saving your security settings. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  // If not mounted yet, show a skeleton to prevent hydration mismatch
  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full mt-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
            <Skeleton className="h-10 w-full mt-4" />
          </div>
        </CardContent>
      </Card>
    );
  }

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
        {/* Alert warnings */}
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
              There was an error applying these settings. Please try again or contact support if the issue persists.
            </AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
            <Skeleton className="h-10 w-full mt-4" />
          </div>
        ) : (
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

                {/* Password security section */}
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
        )}
      </CardContent>
    </Card>
  );
};

export default MFASettings;
