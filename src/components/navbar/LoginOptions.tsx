
import React from "react";
import { Link } from "react-router-dom";
import { User, ChevronDown, BookOpen, LogIn, Settings, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LoginOptionsProps {
  onLoginClick: (type: "student" | "instructor" | "admin") => void;
}

const LoginOptions = ({ onLoginClick }: LoginOptionsProps) => {
  return (
    <div className="hidden md:flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-1 px-4 py-2 text-gray-300 hover:text-amber-500 hover:bg-black/50 rounded-md transition-colors">
            <User className="h-4 w-4" />
            Login
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="z-50 bg-black border-amber-900/50 shadow-lg rounded-md w-56">
          <DropdownMenuItem 
            className="cursor-pointer flex items-center hover:bg-amber-900/20 py-2 text-gray-300"
            onClick={() => onLoginClick("student")}
          >
            <BookOpen className="mr-2 h-4 w-4 text-amber-500" />
            <span>Student Login</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-amber-900/30" />
          <DropdownMenuItem 
            className="cursor-pointer flex items-center hover:bg-amber-900/20 py-2 text-gray-300"
            onClick={() => onLoginClick("instructor")}
          >
            <LogIn className="mr-2 h-4 w-4 text-amber-500" />
            <span>Instructor Login</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-amber-900/30" />
          <DropdownMenuItem 
            className="cursor-pointer flex items-center hover:bg-amber-900/20 py-2 text-gray-300"
            onClick={() => onLoginClick("admin")}
          >
            <Settings className="mr-2 h-4 w-4 text-amber-500" />
            <span>Admin Login</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Link to="/par-form">
        <Button className="flex items-center gap-1 px-4 py-2 bg-amber-700 text-white hover:bg-amber-600 rounded-md">
          <UserPlus className="h-4 w-4" />
          Register
        </Button>
      </Link>
    </div>
  );
};

export default LoginOptions;
