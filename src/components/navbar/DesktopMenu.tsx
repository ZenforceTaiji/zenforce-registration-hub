
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { History, GalleryHorizontal, BookMarked, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const DesktopMenu = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="hidden md:flex md:ml-10 md:items-center">
      <Link to="/">
        <Button 
          variant={isActive("/") ? "default" : "ghost"}
          className={`px-3 py-2 ${isActive("/") ? "bg-primary-50 text-primary-600" : "text-gray-700"} rounded-none border-b-2 ${isActive("/") ? "border-primary-600" : "border-transparent"}`}
        >
          Home
        </Button>
      </Link>
      
      <Link to="/history-of-taijiquan">
        <Button 
          variant={isActive("/history-of-taijiquan") ? "default" : "ghost"}
          className={`flex items-center gap-1 px-3 py-2 ${isActive("/history-of-taijiquan") ? "bg-primary-50 text-primary-600" : "text-gray-700"} rounded-none border-b-2 ${isActive("/history-of-taijiquan") ? "border-primary-600" : "border-transparent"}`}
        >
          <History className="h-4 w-4" />
          History of TaijiQuan
        </Button>
      </Link>
      
      <Link to="/gallery">
        <Button 
          variant={isActive("/gallery") ? "default" : "ghost"}
          className={`flex items-center gap-1 px-3 py-2 ${isActive("/gallery") ? "bg-primary-50 text-primary-600" : "text-gray-700"} rounded-none border-b-2 ${isActive("/gallery") ? "border-primary-600" : "border-transparent"}`}
        >
          <GalleryHorizontal className="h-4 w-4" />
          Gallery
        </Button>
      </Link>
      
      <Link to="/booking">
        <Button 
          variant={isActive("/booking") ? "default" : "ghost"}
          className={`flex items-center gap-1 px-3 py-2 ${isActive("/booking") ? "bg-primary-50 text-primary-600" : "text-gray-700"} rounded-none border-b-2 ${isActive("/booking") ? "border-primary-600" : "border-transparent"}`}
        >
          <BookMarked className="h-4 w-4" />
          Book a Session
        </Button>
      </Link>
      
      <Link to="/events">
        <Button 
          variant={isActive("/events") ? "default" : "ghost"}
          className={`flex items-center gap-1 px-3 py-2 ${isActive("/events") ? "bg-primary-50 text-primary-600" : "text-gray-700"} rounded-none border-b-2 ${isActive("/events") ? "border-primary-600" : "border-transparent"}`}
        >
          <Calendar className="h-4 w-4" />
          Events
        </Button>
      </Link>
    </div>
  );
};

export default DesktopMenu;
