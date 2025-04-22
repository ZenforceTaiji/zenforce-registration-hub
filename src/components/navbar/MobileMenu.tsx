import React from "react";
import { Link, useLocation } from "react-router-dom";
import { History, GalleryHorizontal, BookMarked, Calendar, UserPlus, LogIn, Info } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: (type: "student" | "instructor" | "admin") => void;
}

const MobileMenu = ({ isOpen, onClose, onLoginClick }: MobileMenuProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white shadow-lg border-t">
      <div className="px-2 pt-2 pb-3 space-y-1">
        <Link
          to="/"
          className={`block px-3 py-2 rounded-md text-base font-medium ${
            isActive("/") ? "bg-primary-50 text-primary-600" : "text-gray-700 hover:bg-gray-50"
          }`}
          onClick={onClose}
        >
          Home
        </Link>
        <Link
          to="/history-of-taijiquan"
          className={`block px-3 py-2 rounded-md text-base font-medium ${
            isActive("/history-of-taijiquan") ? "bg-primary-50 text-primary-600" : "text-gray-700 hover:bg-gray-50"
          } flex items-center`}
          onClick={onClose}
        >
          <History className="mr-2 h-4 w-4" />
          History of TaijiQuan
        </Link>
        <Link
          to="/gallery"
          className={`block px-3 py-2 rounded-md text-base font-medium ${
            isActive("/gallery") ? "bg-primary-50 text-primary-600" : "text-gray-700 hover:bg-gray-50"
          } flex items-center`}
          onClick={onClose}
        >
          <GalleryHorizontal className="mr-2 h-4 w-4" />
          Gallery
        </Link>
        <Link
          to="/booking"
          className={`block px-3 py-2 rounded-md text-base font-medium ${
            isActive("/booking") ? "bg-primary-50 text-primary-600" : "text-gray-700 hover:bg-gray-50"
          } flex items-center`}
          onClick={onClose}
        >
          <BookMarked className="mr-2 h-4 w-4" />
          Book a Session
        </Link>
        <Link
          to="/events"
          className={`block px-3 py-2 rounded-md text-base font-medium ${
            isActive("/events") ? "bg-primary-50 text-primary-600" : "text-gray-700 hover:bg-gray-50"
          } flex items-center`}
          onClick={onClose}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Events
        </Link>
        
        <Link
          to="/about-us"
          className={`block px-3 py-2 rounded-md text-base font-medium ${
            isActive("/about-us") ? "bg-primary-50 text-primary-600" : "text-gray-700 hover:bg-gray-50"
          } flex items-center`}
          onClick={onClose}
        >
          <Info className="mr-2 h-4 w-4" />
          About Us
        </Link>
        
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-3">
            <div className="text-base font-medium">Login Options</div>
          </div>
          <div className="mt-3 space-y-1">
            <button
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 flex items-center"
              onClick={() => {
                onLoginClick("student");
                onClose();
              }}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Student Login
            </button>
            <button
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 flex items-center"
              onClick={() => {
                onLoginClick("instructor");
                onClose();
              }}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Instructor Login
            </button>
            <button
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 flex items-center"
              onClick={() => {
                onLoginClick("admin");
                onClose();
              }}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Admin Login
            </button>
          </div>
        </div>
        
        <div className="pt-2">
          <Link
            to="/par-form"
            className="block w-full text-center px-3 py-2 rounded-md text-base font-medium bg-primary-600 text-white hover:bg-primary-700"
            onClick={onClose}
          >
            <div className="flex items-center justify-center">
              <UserPlus className="mr-2 h-4 w-4" />
              Register
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
