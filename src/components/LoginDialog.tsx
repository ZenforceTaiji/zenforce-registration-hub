
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { checkPasswordStatus } from "@/services/passwordService";
import { PasswordResetDialog } from "./PasswordResetDialog";
import { LoginForm } from "./auth/LoginForm";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "student" | "instructor" | "admin";
}

export function LoginDialog({ open, onOpenChange, type }: LoginDialogProps) {
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

  return (
    <>
      <Dialog open={open} onOpenChange={(isOpen) => {
        // Only allow closing if not a forced password reset
        if (!forcePasswordReset || !isOpen) {
          onOpenChange(isOpen);
        }
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {type === "student" 
                ? "Student Login" 
                : type === "instructor" 
                  ? "Instructor Login" 
                  : "Administrator Login"}
            </DialogTitle>
            <DialogDescription>
              Enter your credentials to access the {
                type === "student" 
                  ? "student" 
                  : type === "instructor" 
                    ? "instructor" 
                    : "administrator"
              } portal
            </DialogDescription>
          </DialogHeader>

          {passwordExpiring && (
            <Alert variant="warning" className="bg-amber-50 border-amber-200">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <AlertDescription>
                Your password will expire in {daysUntilExpiry} day{daysUntilExpiry !== 1 ? 's' : ''}. 
                Please consider changing it soon.
              </AlertDescription>
            </Alert>
          )}

          <LoginForm 
            type={type}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            loading={loading}
            onForgotPassword={handleForgotPassword}
            onSubmit={handleLogin}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="mt-2 sm:mt-0"
              disabled={loading || forcePasswordReset}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <PasswordResetDialog
        open={showResetDialog}
        onOpenChange={(open) => {
          // Only allow dialog to close if it's not a forced password reset
          if (!forcePasswordReset || !open) {
            setShowResetDialog(open);
            
            // If this is a forced reset and dialog is closing, log the user out
            if (forcePasswordReset && !open) {
              supabase.auth.signOut();
              setForcePasswordReset(false);
            }
          }
        }}
        isFirstLogin={isFirstLogin}
        forceReset={forcePasswordReset}
        membershipNumber={username}
      />
    </>
  );
}
