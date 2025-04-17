
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { History, GalleryHorizontal, BookMarked, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const DesktopMenu = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="hidden md:ml-10 md:flex md:space-x-1">
      <Link to="/">
        <Button 
          variant="ghost" 
          className={`px-3 ${isActive("/") ? "bg-primary-50 text-primary-600" : "text-gray-700"}`}
        >
          Home
        </Button>
      </Link>
      
      <Link to="/history-of-taijiquan">
        <Button 
          variant="ghost" 
          className={`flex items-center gap-1 px-3 ${isActive("/history-of-taijiquan") ? "bg-primary-50 text-primary-600" : "text-gray-700"}`}
        >
          <History className="h-4 w-4" />
          History
        </Button>
      </Link>
      
      <Link to="/gallery">
        <Button 
          variant="ghost" 
          className={`flex items-center gap-1 px-3 ${isActive("/gallery") ? "bg-primary-50 text-primary-600" : "text-gray-700"}`}
        >
          <GalleryHorizontal className="h-4 w-4" />
          Gallery
        </Button>
      </Link>
      
      <Link to="/booking">
        <Button 
          variant="ghost" 
          className={`flex items-center gap-1 px-3 ${isActive("/booking") ? "bg-primary-50 text-primary-600" : "text-gray-700"}`}
        >
          <BookMarked className="h-4 w-4" />
          Book a Session
        </Button>
      </Link>
      
      <Link to="/events">
        <Button 
          variant="ghost" 
          className={`flex items-center gap-1 px-3 ${isActive("/events") ? "bg-primary-50 text-primary-600" : "text-gray-700"}`}
        >
          <Calendar className="h-4 w-4" />
          Events
        </Button>
      </Link>
    </div>
  );
};

export default DesktopMenu;
