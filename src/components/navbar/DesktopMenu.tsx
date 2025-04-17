
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { History, GalleryHorizontal, BookMarked, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const DesktopMenu = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="hidden md:flex ml-10 space-x-1">
      <Link to="/">
        <Button 
          variant="ghost"
          className={`px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors ${
            isActive("/") ? "bg-primary-50 text-primary-600" : ""
          }`}
        >
          Home
        </Button>
      </Link>
      
      <Link to="/history-of-taijiquan">
        <Button 
          variant="ghost"
          className={`flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors ${
            isActive("/history-of-taijiquan") ? "bg-primary-50 text-primary-600" : ""
          }`}
        >
          <History className="h-4 w-4" />
          History of TaijiQuan
        </Button>
      </Link>
      
      <Link to="/gallery">
        <Button 
          variant="ghost"
          className={`flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors ${
            isActive("/gallery") ? "bg-primary-50 text-primary-600" : ""
          }`}
        >
          <GalleryHorizontal className="h-4 w-4" />
          Gallery
        </Button>
      </Link>
      
      <Link to="/booking">
        <Button 
          variant="ghost"
          className={`flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors ${
            isActive("/booking") ? "bg-primary-50 text-primary-600" : ""
          }`}
        >
          <BookMarked className="h-4 w-4" />
          Book a Session
        </Button>
      </Link>
      
      <Link to="/events">
        <Button 
          variant="ghost"
          className={`flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors ${
            isActive("/events") ? "bg-primary-50 text-primary-600" : ""
          }`}
        >
          <Calendar className="h-4 w-4" />
          Events
        </Button>
      </Link>
    </div>
  );
};

export default DesktopMenu;
