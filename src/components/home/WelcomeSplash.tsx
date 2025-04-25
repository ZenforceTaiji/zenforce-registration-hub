
import React, { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeSplashProps {
  onComplete: () => void;
}

const WelcomeSplash = ({ onComplete }: WelcomeSplashProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [hasPlayedGreetings, setHasPlayedGreetings] = useState(false);

  useEffect(() => {
    const bgMusic = new Audio("/lovable-uploads/taiji-background.mp3");
    const englishGreeting = new Audio("/lovable-uploads/english-greeting.mp3");
    const mandarinGreeting = new Audio("/lovable-uploads/mandarin-greeting.mp3");
    const cantoneseGreeting = new Audio("/lovable-uploads/cantonese-greeting.mp3");

    bgMusic.loop = true;
    
    const playSequentially = async () => {
      if (!isMuted) {
        bgMusic.volume = 0.2;
        await bgMusic.play();
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        await englishGreeting.play();
        await new Promise(resolve => setTimeout(resolve, 2000));
        await mandarinGreeting.play();
        await new Promise(resolve => setTimeout(resolve, 2000));
        await cantoneseGreeting.play();
        
        setHasPlayedGreetings(true);
      }
    };

    playSequentially().catch(console.error);

    return () => {
      bgMusic.pause();
      englishGreeting.pause();
      mandarinGreeting.pause();
      cantoneseGreeting.pause();
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

          {hasPlayedGreetings && (
            <Button
              variant="default"
              className="mt-4 bg-primary-600 hover:bg-primary-700"
              onClick={onComplete}
            >
              Enter Site
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeSplash;
