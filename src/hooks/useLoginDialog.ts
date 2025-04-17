
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { checkPasswordStatus } from "@/services/passwordService";

export function useLoginDialog(type: "student" | "instructor" | "admin", onOpenChange: (open: boolean) => void) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordExpiring, setPasswordExpiring] = useState(false);
  const [daysUntilExpiry, setDaysUntilExpiry] = useState<number | null>(null);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [forcePasswordReset, setForcePasswordReset] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      toast({
        title: "Required Fields",
        description: "Please enter both username and password",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Attempt to authenticate the user
      const { data, error } = await supabase.auth.signInWithPassword({
        email: type === "student" ? `${username}@zen.martial.arts` : username,
        password: password,
      });

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      if (!data.user) {
        toast({
          title: "Login Failed",
          description: "User not found",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Check password status
      const passwordStatus = await checkPasswordStatus(data.user.id);
      
      // Handle suspended account
      if (passwordStatus.isSuspended) {
        toast({
          title: "Account Suspended",
          description: "Your account has been suspended due to password expiration. Please reset your password.",
          variant: "destructive",
        });
        setForcePasswordReset(true);
        setShowResetDialog(true);
        setLoading(false);
        return;
      }
      
      // Handle expired password
      if (passwordStatus.isExpired) {
        toast({
          title: "Password Expired",
          description: "Your password has expired. Please reset it now.",
          variant: "destructive",
        });
        setForcePasswordReset(true);
        setShowResetDialog(true);
        setLoading(false);
        return;
      }
      
      // Check if password is expiring soon (within 7 days)
      if (passwordStatus.daysUntilExpiry !== null && passwordStatus.daysUntilExpiry <= 7) {
        setPasswordExpiring(true);
        setDaysUntilExpiry(passwordStatus.daysUntilExpiry);
      }

      // Check if this is a first-time login with a temporary password
      if (type === "student" && sessionStorage.getItem("tempPassword") === password) {
        setIsFirstLogin(true);
        setShowResetDialog(true);
      } else {
        // Login successful, redirect to appropriate portal
        toast({
          title: "Login Successful",
          description: `Welcome back, ${type === "student" ? "Student" : type === "instructor" ? "Instructor" : "Administrator"}!`,
        });
        
        onOpenChange(false);
        
        if (type === "student") {
          navigate("/student-portal");
        } else if (type === "instructor") {
          navigate("/instructor-portal");
        } else if (type === "admin") {
          navigate("/admin-portal");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setShowResetDialog(true);
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    loading,
    showResetDialog,
    setShowResetDialog,
    passwordExpiring,
    daysUntilExpiry,
    isFirstLogin,
    forcePasswordReset,
    setForcePasswordReset,
    handleLogin,
    handleForgotPassword,
  };
}
