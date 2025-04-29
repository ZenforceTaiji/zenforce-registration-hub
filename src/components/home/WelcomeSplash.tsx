
import React, { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface WelcomeSplashProps {
  onComplete: () => void;
}

const WelcomeSplash = ({ onComplete }: WelcomeSplashProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [hasPlayedGreetings, setHasPlayedGreetings] = useState(false);
  const [audioError, setAudioError] = useState(false);

  useEffect(() => {
    // Set hasPlayedGreetings to true after a short delay to ensure "Enter Site" button shows up
    const timer = setTimeout(() => {
      setHasPlayedGreetings(true);
    }, 2000);

    // Only attempt to play audio if not muted
    if (!isMuted) {
      try {
        // Note: Audio playback is disabled until files are available
        console.log('Audio functionality is ready but files are not yet available');
        toast.info("Audio files not yet uploaded. Welcome splash will continue without audio.", {
          duration: 5000
        });
        setAudioError(true);
      } catch (error) {
        console.log('Audio playback error:', error);
        setAudioError(true);
      }
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast.info(isMuted ? "Audio unmuted" : "Audio muted", {
      duration: 2000
    });
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-red-900 to-red-950 flex flex-col items-center justify-center z-50">
      <div className="max-w-4xl w-full px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
          Welcome to ZenForce TaijiQuan SA
        </h1>
        
        <div className="relative w-full aspect-square max-w-lg mx-auto mb-8">
          <img
            src="/placeholder.svg"
            alt="ZenForce TaijiQuan Logo"
            className="w-full h-full object-contain animate-fade-in"
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="bg-white/10 hover:bg-white/20"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
          </Button>

          <div className="flex gap-4 mt-4">
            <Button
              variant="default"
              className="bg-primary-600 hover:bg-primary-700"
              onClick={onComplete}
            >
              Enter Site
            </Button>
          </div>

          <p className="text-white text-sm mt-2">
            Click "Enter Site" to access the greeting generator
          </p>
          
          {audioError && (
            <p className="text-amber-300 text-xs mt-2">
              Note: Audio files aren't available yet. You can still use the site.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeSplash;
