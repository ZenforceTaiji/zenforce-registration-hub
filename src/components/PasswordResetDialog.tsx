
import { useState } from "react";
import { Lock, Eye, EyeOff, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { updatePassword } from "@/services/passwordService";

interface PasswordResetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isFirstLogin?: boolean;
  forceReset?: boolean;
  membershipNumber?: string;
}

export function PasswordResetDialog({ 
  open, 
  onOpenChange,
  isFirstLogin = false,
  forceReset = false,
  membershipNumber = ""
}: PasswordResetDialogProps) {
  const { toast } = useToast();
  const [userMembershipNumber, setUserMembershipNumber] = useState(membershipNumber);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!isFirstLogin && !forceReset && !userMembershipNumber) {
      toast({
        title: "Required Field",
        description: "Please enter your membership number",
        variant: "destructive",
      });
      return;
    }

    if (!newPassword || !confirmPassword) {
      toast({
        title: "Required Fields",
        description: "Please enter and confirm your new password",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Your new password and confirmation don't match",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Your password must be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      if (isFirstLogin || forceReset) {
        // User is already authenticated, just update their password
        const user = await supabase.auth.getUser();
        
        if (user.error || !user.data.user) {
          throw new Error("User not authenticated");
        }
        
        const success = await updatePassword(user.data.user.id, newPassword);
        
        if (!success) {
          throw new Error("Failed to update password");
        }
        
        toast({
          title: "Password Updated",
          description: isFirstLogin 
            ? "Your password has been set successfully. It will expire in 30 days." 
            : "Your password has been reset successfully.",
        });
      } else {
        // User is not authenticated, send password reset email
        const { error } = await supabase.auth.resetPasswordForEmail(
          `${userMembershipNumber}@zen.martial.arts`,
          {
            redirectTo: `${window.location.origin}/student-portal?reset=true`,
          }
        );
        
        if (error) {
          throw error;
        }
        
        toast({
          title: "Password Reset Email Sent",
          description: "Check your email for a link to reset your password.",
        });
      }
      
      onOpenChange(false);
    } catch (error) {
      console.error("Password reset error:", error);
      toast({
        title: "Password Reset Failed",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isFirstLogin ? "Set New Password" : forceReset ? "Password Expired" : "Reset Password"}
          </DialogTitle>
          <DialogDescription>
            {isFirstLogin 
              ? "Please set a new password to replace your temporary password." 
              : forceReset
                ? "Your password has expired. Please set a new password to continue."
                : "Enter your membership number and we'll send you a password reset link."}
          </DialogDescription>
        </DialogHeader>
        
        {forceReset && (
          <Alert variant="destructive" className="mt-2">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Your account has been locked until you reset your password.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 py-4">
          {!isFirstLogin && !forceReset && (
            <div className="space-y-2">
              <Label htmlFor="membershipNumber">Membership Number</Label>
              <Input
                id="membershipNumber"
                value={userMembershipNumber}
                onChange={(e) => setUserMembershipNumber(e.target.value)}
                placeholder="Enter your membership number"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-gray-400">
                <Lock className="h-4 w-4" />
              </div>
              <Input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Password must be at least 8 characters long.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-gray-400">
                <Lock className="h-4 w-4" />
              </div>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="mt-2 sm:mt-0"
            disabled={loading || forceReset}
          >
            {forceReset ? "Log Out" : "Cancel"}
          </Button>
          <Button 
            onClick={handleResetPassword}
            className="bg-accent-red hover:bg-accent-red/90 text-white"
            disabled={loading}
          >
            {loading 
              ? "Processing..." 
              : isFirstLogin 
                ? "Set Password" 
                : forceReset 
                  ? "Update Password" 
                  : "Reset Password"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
