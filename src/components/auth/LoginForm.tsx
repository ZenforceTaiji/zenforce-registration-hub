
import { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  type: "student" | "instructor" | "admin";
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  loading: boolean;
  onForgotPassword: () => void;
  onSubmit: () => void;
}

export function LoginForm({
  type,
  username,
  setUsername,
  password,
  setPassword,
  loading,
  onForgotPassword,
  onSubmit
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
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
              onClick={onForgotPassword}
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

      <Button 
        onClick={onSubmit}
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
    </div>
  );
}
