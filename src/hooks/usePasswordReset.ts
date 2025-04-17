
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { updatePassword } from "@/services/passwordService";

export function usePasswordReset(
  onOpenChange: (open: boolean) => void,
  initialMembershipNumber: string = ""
) {
  const { toast } = useToast();
  const [userMembershipNumber, setUserMembershipNumber] = useState(initialMembershipNumber);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (isFirstLogin: boolean, forceReset: boolean) => {
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

  return {
    userMembershipNumber,
    setUserMembershipNumber,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    handleResetPassword,
  };
}
