
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff, AlertTriangle } from "lucide-react";
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
import { PasswordResetDialog } from "./PasswordResetDialog";
import { supabase } from "@/integrations/supabase/client";
import { checkPasswordStatus } from "@/services/passwordService";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  const [showPassword, setShowPassword] = useState(false);
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

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-gray-400">
                  <User className="h-4 w-4" />
                </div>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={
                    type === "student" 
                      ? "Enter membership number" 
                      : type === "instructor"
                        ? "Enter username"
                        : "Enter admin username"
                  }
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                {type === "student" && (
                  <button
                    type="button"
                    onClick={() => setShowResetDialog(true)}
                    className="text-xs text-accent-red hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute left-3 top-3 text-gray-400">
                  <Lock className="h-4 w-4" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
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
              {type === "student" && (
                <p className="text-xs text-gray-500">
                  Note: Student passwords expire every 30 days for security reasons.
                </p>
              )}
            </div>
          </div>

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
            <Button 
              onClick={handleLogin}
              className={
                type === "student" 
                  ? "bg-accent-red hover:bg-accent-red/90 text-white" 
                  : type === "admin"
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : ""
              }
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
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
