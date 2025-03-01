
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff } from "lucide-react";
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

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "student" | "instructor";
}

export function LoginDialog({ open, onOpenChange, type }: LoginDialogProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);

  const handleLogin = () => {
    if (!username || !password) {
      toast({
        title: "Required Fields",
        description: "Please enter both username and password",
        variant: "destructive",
      });
      return;
    }

    // For a real implementation, this would be an API call to verify credentials
    // For now, we'll just show a success toast and close the dialog
    
    toast({
      title: "Login Successful",
      description: `Welcome back, ${type === "student" ? "Student" : "Instructor"}!`,
    });
    
    onOpenChange(false);
    
    // Check if this is a first-time login with a temporary password
    if (type === "student") {
      const tempPassword = sessionStorage.getItem("tempPassword");
      if (tempPassword === password) {
        // Prompt the user to set a new password
        setShowResetDialog(true);
      } else {
        // Redirect to student portal after successful student login
        navigate("/student-portal");
      }
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {type === "student" ? "Student Login" : "Instructor Login"}
            </DialogTitle>
            <DialogDescription>
              Enter your credentials to access the {type === "student" ? "student" : "instructor"} portal
            </DialogDescription>
          </DialogHeader>

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
                  placeholder={type === "student" ? "Enter membership number" : "Enter username"}
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
            >
              Cancel
            </Button>
            <Button 
              onClick={handleLogin}
              className={type === "student" ? "bg-accent-red hover:bg-accent-red/90 text-white" : ""}
            >
              Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <PasswordResetDialog
        open={showResetDialog}
        onOpenChange={setShowResetDialog}
        isFirstLogin={password === sessionStorage.getItem("tempPassword")}
      />
    </>
  );
}
