
import React, { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeSplashProps {
  onComplete: () => void;
}

const WelcomeSplash = ({ onComplete }: WelcomeSplashProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [hasPlayedGreetings, setHasPlayedGreetings] = useState(false);
  const [audioError, setAudioError] = useState(false);

  useEffect(() => {
    // Check if audio files exist before trying to play them
    const audioFiles = {
      background: "/lovable-uploads/taiji-background.mp3",
      english: "/lovable-uploads/english-greeting.mp3",
      mandarin: "/lovable-uploads/mandarin-greeting.mp3",
      cantonese: "/lovable-uploads/cantonese-greeting.mp3"
    };

    // Set hasPlayedGreetings to true after a short delay to ensure "Enter Site" button shows up
    const timer = setTimeout(() => {
      setHasPlayedGreetings(true);
    }, 2000);

    // Only attempt to play audio if not muted
    if (!isMuted) {
      try {
        const bgMusic = new Audio(audioFiles.background);
        bgMusic.loop = true;
        bgMusic.volume = 0.2;
        
        // Play background music but catch errors
        bgMusic.play().catch(err => {
          console.log('Audio file not available yet, skipping playback');
          setAudioError(true);
        });
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
        </div>
      </div>
    </div>
  );
};

export default WelcomeSplash;
