
import { toast } from "sonner";

interface GenerateAudioParams {
  text: string;
  voiceId: string;
  apiKey: string;
}

export const generateAudio = async ({ text, voiceId, apiKey }: GenerateAudioParams): Promise<Blob | null> => {
  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate audio');
    }

    return await response.blob();
  } catch (error) {
    console.error('Error generating audio:', error);
    toast.error("Failed to generate audio greeting");
    return null;
  }
};
