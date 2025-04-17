
import { useEffect } from "react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { PasswordResetDialog } from "./PasswordResetDialog";
import { LoginForm } from "./auth/LoginForm";
import { useLoginDialog } from "@/hooks/useLoginDialog";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "student" | "instructor" | "admin";
}

export function LoginDialog({ open, onOpenChange, type }: LoginDialogProps) {
  const {
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
  } = useLoginDialog(type, onOpenChange);

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
