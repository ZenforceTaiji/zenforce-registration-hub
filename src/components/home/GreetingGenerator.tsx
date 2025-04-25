
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateAudio } from '@/utils/audioUtils';
import { toast } from 'sonner';

const GreetingGenerator = () => {
  const [apiKey, setApiKey] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const greetings = {
    english: {
      text: "Welcome to ZenForce TaijiQuan. We're delighted to have you here.",
      voiceId: "EXAVITQu4vr4xnSDxMaL" // Sarah voice
    },
    mandarin: {
      text: "欢迎来到正力太极拳。很高兴您能来到这里。",
      voiceId: "EXAVITQu4vr4xnSDxMaL" // Using Sarah with multilingual model
    },
    cantonese: {
      text: "歡迎來到正力太極拳。好高興你嚟到呢度。",
      voiceId: "EXAVITQu4vr4xnSDxMaL" // Using Sarah with multilingual model
    }
  };

  const handleGenerate = async () => {
    if (!apiKey) {
      toast.error("Please enter your ElevenLabs API key");
      return;
    }

    setIsGenerating(true);
    try {
      for (const [language, { text, voiceId }] of Object.entries(greetings)) {
        toast.loading(`Generating ${language} greeting...`);
        const audioBlob = await generateAudio({ text, voiceId, apiKey });
        
        if (audioBlob) {
          // Create a download link for the audio file
          const url = window.URL.createObjectURL(audioBlob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${language}-greeting.mp3`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
          toast.success(`${language} greeting generated successfully!`);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to generate greetings");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">Generate Greeting Audio Files</h2>
      <Input
        type="password"
        placeholder="Enter your ElevenLabs API key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        className="mb-4"
      />
      <Button 
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full"
      >
        {isGenerating ? "Generating..." : "Generate Greetings"}
      </Button>
    </div>
  );
};

export default GreetingGenerator;
