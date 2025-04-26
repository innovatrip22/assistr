
import { useState, useEffect } from 'react';

export type EmotionType = "neutral" | "happy" | "sad" | "angry" | "calm" | "energetic" | "manual";

interface EmotionDetectorProps {
  onEmotionDetected: (emotion: EmotionType) => void;
  useCamera: boolean;
  useMicrophone: boolean;
  enabled: boolean;
}

interface EmotionValues {
  [key: string]: number;
}

const EmotionDetector: React.FC<EmotionDetectorProps> = ({ 
  onEmotionDetected, 
  useCamera, 
  useMicrophone, 
  enabled 
}) => {
  const [lastDetectedEmotion, setLastDetectedEmotion] = useState<EmotionType>("neutral");
  const [faceDetectionStatus, setFaceDetectionStatus] = useState<string>("idle");
  const [voiceAnalysisStatus, setVoiceAnalysisStatus] = useState<string>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Simulated emotion values - in a real app, these would be calculated based on camera/mic input
  const [emotionValues, setEmotionValues] = useState<EmotionValues>({
    happy: 0,
    sad: 0,
    angry: 0,
    calm: 0,
    energetic: 0,
    neutral: 1, // Default neutral state
  });

  useEffect(() => {
    if (!enabled) return;

    // Function to simulate emotion changes - would be replaced with actual ML analysis in production
    const simulateEmotionChanges = () => {
      // In a real app, this would analyze camera feed and/or microphone input
      // For demo, we're randomly selecting emotions
      
      // Generate random emotion values
      const randomEmotions: EmotionValues = {
        happy: Math.random() * 0.5,
        sad: Math.random() * 0.5,
        angry: Math.random() * 0.5,
        calm: Math.random() * 0.5,
        energetic: Math.random() * 0.5,
        neutral: Math.random() * 0.5,
      };
      
      // Find dominant emotion
      let dominantEmotion: EmotionType = "neutral";
      let maxValue = 0;
      
      (Object.keys(randomEmotions) as Array<keyof typeof randomEmotions>).forEach(emotion => {
        if (randomEmotions[emotion] > maxValue) {
          maxValue = randomEmotions[emotion];
          dominantEmotion = emotion as EmotionType;
        }
      });
      
      // Update the detected emotion
      setEmotionValues(randomEmotions);
      setLastDetectedEmotion(dominantEmotion);
      onEmotionDetected(dominantEmotion);
      
      if (process.env.NODE_ENV === 'development') {
        console.log("Emotion detected:", dominantEmotion, "with confidence:", maxValue.toFixed(2));
      }
    };

    // For demo purposes, simulate emotion changes every 30-60 seconds
    let timer: number | null = null;
    
    if (enabled) {
      // Initial short delay
      timer = window.setTimeout(() => {
        simulateEmotionChanges();
        
        // Then periodic checks
        timer = window.setInterval(simulateEmotionChanges, Math.random() * 30000 + 30000);
      }, 5000);
    }
    
    // Clean up timers
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [enabled, useCamera, useMicrophone, onEmotionDetected]);

  // This component is invisible, it only analyzes state
  return null;
};

export default EmotionDetector;
