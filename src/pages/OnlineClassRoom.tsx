
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import VideoConference from "@/components/video-conference/VideoConference";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const OnlineClassRoom = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [isJoining, setIsJoining] = useState(true);
  const [userName, setUserName] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // In a real implementation, this would verify the session exists
    // and check if the user has paid/registered for this class
    
    // Simulate loading user data
    const timer = setTimeout(() => {
      // This would actually come from auth context or user profile
      setUserName("Student User");
      setIsJoining(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [sessionId]);
  
  if (!sessionId) {
    return (
      <div className="zen-container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Invalid Session</h1>
        <p className="mb-6">No session ID provided. Please check your link and try again.</p>
        <Button onClick={() => navigate("/")}>Return to Home</Button>
      </div>
    );
  }
  
  if (isJoining) {
    return (
      <div className="zen-container py-12 flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <h2 className="text-xl font-medium mb-2">Joining Online Class</h2>
        <p className="text-gray-500">Preparing your video and audio...</p>
      </div>
    );
  }
  
  return (
    <VideoConference 
      sessionId={sessionId} 
      userName={userName}
      isHost={false} // In a real app, this would be determined by role
    />
  );
};

export default OnlineClassRoom;
