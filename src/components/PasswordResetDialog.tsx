
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
import { PasswordResetForm } from "./auth/PasswordResetForm";
import { usePasswordReset } from "@/hooks/usePasswordReset";

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
  const {
    userMembershipNumber,
    setUserMembershipNumber,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    handleResetPassword,
  } = usePasswordReset(onOpenChange, membershipNumber);

  const handleSubmit = () => {
    handleResetPassword(isFirstLogin, forceReset);
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

        <PasswordResetForm
          membershipNumber={userMembershipNumber}
          setMembershipNumber={setUserMembershipNumber}
          showMembershipField={!isFirstLogin && !forceReset}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />

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
            onClick={handleSubmit}
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
