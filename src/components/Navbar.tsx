
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [loginType, setLoginType] = useState<"student" | "instructor" | "admin">("student");

  const handleLoginClick = (type: "student" | "instructor" | "admin") => {
    setLoginType(type);
    setShowLoginDialog(true);
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold text-accent-red">ZenForce</span>
                <span className="text-xl font-medium ml-1">TaijiQuan</span>
              </Link>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex space-x-2">
              <Link to="/">
                <Button variant="ghost">Home</Button>
              </Link>

              <Link to="/history-of-taijiquan">
                <Button variant="ghost" className="flex items-center gap-1">
                  <History className="h-4 w-4" />
                  History of TaijiQuan
                </Button>
              </Link>

              <Link to="/gallery">
                <Button variant="ghost" className="flex items-center gap-1">
                  <GalleryHorizontal className="h-4 w-4" />
                  Gallery
                </Button>
              </Link>

              <Link to="/booking">
                <Button variant="ghost" className="flex items-center gap-1">
                  <BookMarked className="h-4 w-4" />
                  Book a Session
                </Button>
              </Link>

              <Link to="/events">
                <Button variant="ghost" className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Events
                </Button>
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    Login
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem 
                    className="cursor-pointer flex items-center"
                    onClick={() => handleLoginClick("student")}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Student Login
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer flex items-center"
                    onClick={() => handleLoginClick("instructor")}
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Instructor Login
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer flex items-center"
                    onClick={() => handleLoginClick("admin")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Admin Login
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link to="/par-form">
                <Button variant="outline" className="flex items-center gap-1">
                  <UserPlus className="h-4 w-4" />
                  Register
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-red"
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

      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/history-of-taijiquan"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <History className="mr-2 h-4 w-4" />
              History of TaijiQuan
            </Link>
            <Link
              to="/gallery"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <GalleryHorizontal className="mr-2 h-4 w-4" />
              Gallery
            </Link>
            <Link
              to="/booking"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <BookMarked className="mr-2 h-4 w-4" />
              Book a Session
            </Link>
            <Link
              to="/events"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Events
            </Link>
            <button
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 flex items-center"
              onClick={() => {
                handleLoginClick("student");
                setIsOpen(false);
              }}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Student Login
            </button>
            <button
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 flex items-center"
              onClick={() => {
                handleLoginClick("instructor");
                setIsOpen(false);
              }}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Instructor Login
            </button>
            <button
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 flex items-center"
              onClick={() => {
                handleLoginClick("admin");
                setIsOpen(false);
              }}
            >
              <Settings className="mr-2 h-4 w-4" />
              Admin Login
            </button>
            <Link
              to="/par-form"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
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
