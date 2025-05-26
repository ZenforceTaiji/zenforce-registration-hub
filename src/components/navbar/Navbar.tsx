
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { DesktopMenu, MobileMenu, LoginOptions } from ".";
import { LoginDialog } from "../LoginDialog";

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

  return (
    <nav className="bg-white shadow-sm border-b z-50 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/b4dc3270-34a9-4dd6-a619-d9ee7dfa8d90.png" 
                alt="ZenForce TaijiQuan Logo" 
                className="h-8 w-auto"
              />
              <div className="flex items-center">
                <span className="text-xl font-bold text-primary-600">ZenForce</span>
                <span className="text-xl font-medium text-gray-700">&nbsp;Taiji&nbsp;</span>
              </div>
            </Link>
            
            {/* Desktop menu with increased left margin */}
            <div className="ml-20">
              <DesktopMenu />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Desktop login options */}
            <LoginOptions onLoginClick={handleLoginClick} />

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-600 transition-colors"
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

      {/* Mobile menu */}
      <MobileMenu 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        onLoginClick={handleLoginClick}
      />

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
