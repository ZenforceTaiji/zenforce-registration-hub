
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { History, GalleryHorizontal, BookMarked, Calendar, Mail, Info, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DesktopMenu = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="hidden md:flex space-x-3">
      <Link to="/">
        <Button 
          variant="ghost"
          className={`px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors ${
            isActive("/") ? "bg-primary-50 text-primary-600" : ""
          }`}
        >
          Home
        </Button>
      </Link>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className={`flex items-center gap-1 px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors ${
              isActive("/history-of-taijiquan") ? "bg-primary-50 text-primary-600" : ""
            }`}
          >
            TaijiQuan
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white">
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link to="/history-of-taijiquan" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                History of TaijiQuan
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/purpose-of-taijiquan" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                Purpose of TaijiQuan
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Link to="/gallery">
        <Button 
          variant="ghost"
          className={`flex items-center gap-1 px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors ${
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
          className={`flex items-center gap-1 px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors ${
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
          className={`flex items-center gap-1 px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors ${
            isActive("/events") ? "bg-primary-50 text-primary-600" : ""
          }`}
        >
          <Calendar className="h-4 w-4" />
          Events
        </Button>
      </Link>

      <Link to="/contact">
        <Button 
          variant="ghost"
          className={`flex items-center gap-1 px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors ${
            isActive("/contact") ? "bg-primary-50 text-primary-600" : ""
          }`}
        >
          <Mail className="h-4 w-4" />
          Contact
        </Button>
      </Link>

      <Link to="/about-us">
        <Button 
          variant="ghost"
          className={`flex items-center gap-1 px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors ${
            isActive("/about-us") ? "bg-primary-50 text-primary-600" : ""
          }`}
        >
          <Info className="h-4 w-4" />
          About Us
        </Button>
      </Link>
    </div>
  );
};

export default DesktopMenu;
