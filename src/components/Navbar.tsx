
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  User,
  ChevronDown,
  LogIn,
  BookOpen,
  UserPlus,
  Settings,
  Calendar,
  BookMarked,
  History,
  GalleryHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoginDialog } from "./LoginDialog";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [loginType, setLoginType] = useState<"student" | "instructor" | "admin">("student");

  const handleLoginClick = (type: "student" | "instructor" | "admin") => {
    setLoginType(type);
    setShowLoginDialog(true);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md border-b z-50 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">ZenForce</span>
              <span className="text-xl font-medium ml-1">TaijiQuan</span>
            </Link>
            
            {/* Desktop menu */}
            <div className="hidden md:ml-10 md:flex md:space-x-4">
              <Link to="/">
                <Button 
                  variant={isActive("/") ? "default" : "ghost"} 
                  className={`px-3 ${isActive("/") ? "bg-primary/10 text-primary" : ""}`}
                >
                  Home
                </Button>
              </Link>
              
              <Link to="/history-of-taijiquan">
                <Button 
                  variant={isActive("/history-of-taijiquan") ? "default" : "ghost"} 
                  className={`flex items-center gap-1 px-3 ${isActive("/history-of-taijiquan") ? "bg-primary/10 text-primary" : ""}`}
                >
                  <History className="h-4 w-4" />
                  History
                </Button>
              </Link>
              
              <Link to="/gallery">
                <Button 
                  variant={isActive("/gallery") ? "default" : "ghost"} 
                  className={`flex items-center gap-1 px-3 ${isActive("/gallery") ? "bg-primary/10 text-primary" : ""}`}
                >
                  <GalleryHorizontal className="h-4 w-4" />
                  Gallery
                </Button>
              </Link>
              
              <Link to="/booking">
                <Button 
                  variant={isActive("/booking") ? "default" : "ghost"} 
                  className={`flex items-center gap-1 px-3 ${isActive("/booking") ? "bg-primary/10 text-primary" : ""}`}
                >
                  <BookMarked className="h-4 w-4" />
                  Book a Session
                </Button>
              </Link>
              
              <Link to="/events">
                <Button 
                  variant={isActive("/events") ? "default" : "ghost"} 
                  className={`flex items-center gap-1 px-3 ${isActive("/events") ? "bg-primary/10 text-primary" : ""}`}
                >
                  <Calendar className="h-4 w-4" />
                  Events
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <div className="hidden md:flex space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1 px-3">
                    <User className="h-4 w-4" />
                    Login
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="z-50 bg-white shadow-lg rounded-md w-56">
                  <DropdownMenuItem 
                    className="cursor-pointer flex items-center hover:bg-slate-100 py-2"
                    onClick={() => handleLoginClick("student")}
                  >
                    <BookOpen className="mr-2 h-4 w-4 text-primary" />
                    <span>Student Login</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer flex items-center hover:bg-slate-100 py-2"
                    onClick={() => handleLoginClick("instructor")}
                  >
                    <LogIn className="mr-2 h-4 w-4 text-primary" />
                    <span>Instructor Login</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer flex items-center hover:bg-slate-100 py-2"
                    onClick={() => handleLoginClick("admin")}
                  >
                    <Settings className="mr-2 h-4 w-4 text-primary" />
                    <span>Admin Login</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link to="/par-form">
                <Button variant="default" className="flex items-center gap-1 px-4 bg-primary text-white hover:bg-primary/90">
                  <UserPlus className="h-4 w-4" />
                  Register
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-primary hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors"
                aria-expanded={isOpen}
              >
                <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/") ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/history-of-taijiquan"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/history-of-taijiquan") ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-50"
              } flex items-center`}
              onClick={() => setIsOpen(false)}
            >
              <History className="mr-2 h-4 w-4" />
              History of TaijiQuan
            </Link>
            <Link
              to="/gallery"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/gallery") ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-50"
              } flex items-center`}
              onClick={() => setIsOpen(false)}
            >
              <GalleryHorizontal className="mr-2 h-4 w-4" />
              Gallery
            </Link>
            <Link
              to="/booking"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/booking") ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-50"
              } flex items-center`}
              onClick={() => setIsOpen(false)}
            >
              <BookMarked className="mr-2 h-4 w-4" />
              Book a Session
            </Link>
            <Link
              to="/events"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/events") ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-50"
              } flex items-center`}
              onClick={() => setIsOpen(false)}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Events
            </Link>
            
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-3">
                <div className="text-base font-medium">Login Options</div>
              </div>
              <div className="mt-3 space-y-1">
                <button
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 flex items-center"
                  onClick={() => {
                    handleLoginClick("student");
                    setIsOpen(false);
                  }}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Student Login
                </button>
                <button
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 flex items-center"
                  onClick={() => {
                    handleLoginClick("instructor");
                    setIsOpen(false);
                  }}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Instructor Login
                </button>
                <button
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 flex items-center"
                  onClick={() => {
                    handleLoginClick("admin");
                    setIsOpen(false);
                  }}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Admin Login
                </button>
              </div>
            </div>
            
            <div className="pt-2">
              <Link
                to="/par-form"
                className="block w-full text-center px-3 py-2 rounded-md text-base font-medium bg-primary text-white hover:bg-primary/90"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Login dialog */}
      <LoginDialog 
        open={showLoginDialog} 
        onOpenChange={setShowLoginDialog} 
        type={loginType} 
      />
    </nav>
  );
};

export default Navbar;
