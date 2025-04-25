
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, Video, VideoOff, PhoneOff, Users, MessageSquare, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VideoConferenceProps {
  sessionId: string;
  userName: string;
  isHost?: boolean;
}

const VideoConference = ({ sessionId, userName, isHost = false }: VideoConferenceProps) => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [participants, setParticipants] = useState<string[]>([userName]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected">("connecting");
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate connection process
    const timer = setTimeout(() => {
      setConnectionStatus("connected");
      toast({
        title: "Connected",
        description: "You've joined the online class session",
      });
      
      // Simulate other participants joining
      if (isHost) {
        // Host would see students joining
        setTimeout(() => {
          setParticipants(prev => [...prev, "Jane Doe"]);
        }, 3000);
        
        setTimeout(() => {
          setParticipants(prev => [...prev, "John Smith"]);
        }, 7000);
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [isHost, toast]);
  
  // Access camera when component mounts
  useEffect(() => {
    const setupLocalVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: isVideoOn, 
          audio: isMicOn 
        });
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        
        return stream;
      } catch (error) {
        console.error("Error accessing media devices:", error);
        setIsVideoOn(false);
        toast({
          title: "Camera access denied",
          description: "Please check your browser permissions",
          variant: "destructive",
        });
      }
    };
    
    const stream = setupLocalVideo();
    
    return () => {
      stream.then(mediaStream => {
        if (mediaStream) {
          mediaStream.getTracks().forEach(track => track.stop());
        }
      }).catch(error => console.error("Error cleaning up media stream:", error));
    };
  }, [toast]);
  
  // Toggle microphone
  const toggleMicrophone = () => {
    setIsMicOn(!isMicOn);
    toast({
      title: isMicOn ? "Microphone muted" : "Microphone unmuted",
      description: isMicOn ? "Others cannot hear you now" : "Others can hear you now",
    });
  };
  
  // Toggle camera
  const toggleCamera = () => {
    setIsVideoOn(!isVideoOn);
    toast({
      title: isVideoOn ? "Camera turned off" : "Camera turned on",
      description: isVideoOn ? "Others cannot see you now" : "Others can see you now",
    });
  };
  
  // End call
  const endCall = () => {
    toast({
      title: "Call ended",
      description: "You've left the online class session",
    });
    
    // In a real implementation, this would disconnect from the WebRTC session
    setConnectionStatus("disconnected");
    
    // Redirect to summary page or course dashboard
    window.location.href = "/online-classes";
  };
  
  // Share screen
  const shareScreen = async () => {
    try {
      await navigator.mediaDevices.getDisplayMedia({ video: true });
      toast({
        title: "Screen sharing started",
        description: "Others can now see your screen",
      });
    } catch (error) {
      console.error("Error sharing screen:", error);
      toast({
        title: "Screen sharing failed",
        description: "Could not start screen sharing",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="flex flex-col h-screen">
      {/* Status bar */}
      <div className="bg-slate-800 text-white p-2 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
          <span className="text-sm">{connectionStatus === "connected" ? "Connected" : "Connecting..."}</span>
        </div>
        <div className="text-sm">Session ID: {sessionId}</div>
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-1" />
          <span>{participants.length}</span>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-900">
        {/* Local video (you) */}
        <Card className="relative bg-slate-800 overflow-hidden">
          <CardContent className="p-0 h-full">
            <video 
              ref={localVideoRef} 
              autoPlay 
              muted 
              playsInline 
              className={`w-full h-full object-cover ${!isVideoOn ? 'hidden' : ''}`}
            />
            {!isVideoOn && (
              <div className="flex items-center justify-center h-full">
                <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            )}
            <div className="absolute bottom-2 left-2 text-white text-sm bg-black bg-opacity-50 px-2 rounded">
              You {isMicOn ? '' : '(muted)'}
            </div>
          </CardContent>
        </Card>
        
        {/* Participant slots - in a real implementation these would be populated with actual peer connections */}
        {participants.slice(1).map((participant, index) => (
          <Card key={index} className="relative bg-slate-800 overflow-hidden">
            <CardContent className="p-0 h-full">
              <div className="flex items-center justify-center h-full">
                <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    {participant.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="absolute bottom-2 left-2 text-white text-sm bg-black bg-opacity-50 px-2 rounded">
                {participant}
              </div>
            </CardContent>
          </Card>
        ))}
        
        {/* Empty slots for potential participants */}
        {Array.from({ length: Math.max(0, 5 - participants.length) }).map((_, index) => (
          <Card key={`empty-${index}`} className="bg-slate-800/50 flex items-center justify-center">
            <CardContent className="text-slate-500 flex flex-col items-center justify-center">
              <Users className="h-8 w-8 mb-2" />
              <p className="text-sm">Waiting for participants...</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Controls */}
      <div className="bg-slate-800 p-4 flex items-center justify-center space-x-4">
        <Button 
          onClick={toggleMicrophone}
          variant={isMicOn ? "default" : "destructive"}
          size="icon"
          className="rounded-full h-12 w-12"
        >
          {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        </Button>
        
        <Button 
          onClick={toggleCamera}
          variant={isVideoOn ? "default" : "destructive"}
          size="icon"
          className="rounded-full h-12 w-12"
        >
          {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
        </Button>
        
        <Button 
          onClick={endCall}
          variant="destructive"
          size="icon"
          className="rounded-full h-12 w-12"
        >
          <PhoneOff className="h-5 w-5" />
        </Button>
        
        <Button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          variant="outline"
          size="icon"
          className="rounded-full h-12 w-12 bg-slate-700 border-slate-600"
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
        
        {isHost && (
          <Button 
            onClick={shareScreen}
            variant="outline"
            size="icon"
            className="rounded-full h-12 w-12 bg-slate-700 border-slate-600"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default VideoConference;
