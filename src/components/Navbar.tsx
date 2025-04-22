
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { DesktopMenu, MobileMenu, LoginOptions } from "./navbar";
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

  return (
    <nav className="bg-white shadow-sm border-b z-50 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="https://images.unsplash.com/photo-1500673922987-e212871fec22" 
                alt="ZenForce Logo" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-primary-600">ZenForce</span>
              <span className="text-xl font-medium ml-1 text-gray-700">TaijiQuan</span>
            </Link>
            
            {/* Desktop menu */}
            <DesktopMenu />
          </div>

          <div className="flex items-center">
            {/* Desktop login options */}
            <LoginOptions onLoginClick={handleLoginClick} />

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
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
