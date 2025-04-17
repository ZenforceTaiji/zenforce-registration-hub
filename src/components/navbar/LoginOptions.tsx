
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
          <Button variant="ghost" className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors">
            <User className="h-4 w-4" />
            Login
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="z-50 bg-white shadow-lg rounded-md w-56">
          <DropdownMenuItem 
            className="cursor-pointer flex items-center hover:bg-slate-100 py-2"
            onClick={() => onLoginClick("student")}
          >
            <BookOpen className="mr-2 h-4 w-4 text-primary-600" />
            <span>Student Login</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="cursor-pointer flex items-center hover:bg-slate-100 py-2"
            onClick={() => onLoginClick("instructor")}
          >
            <LogIn className="mr-2 h-4 w-4 text-primary-600" />
            <span>Instructor Login</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="cursor-pointer flex items-center hover:bg-slate-100 py-2"
            onClick={() => onLoginClick("admin")}
          >
            <Settings className="mr-2 h-4 w-4 text-primary-600" />
            <span>Admin Login</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Link to="/par-form">
        <Button className="flex items-center gap-1 px-4 py-2 bg-primary-600 text-white hover:bg-primary-700 rounded-md">
          <UserPlus className="h-4 w-4" />
          Register
        </Button>
      </Link>
    </div>
  );
};

export default LoginOptions;
