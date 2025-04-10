
import { useState, useEffect } from 'react';

type EmotionType = "neutral" | "happy" | "sad" | "angry" | "calm" | "energetic" | "manual";

interface EmotionDetectorProps {
  onEmotionDetected: (emotion: EmotionType) => void;
  useCamera: boolean;
  useMicrophone: boolean;
  enabled: boolean;
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

  // Simüle edilmiş duygu değerleri
  const emotionValues = {
    happy: 0,
    sad: 0,
    angry: 0,
    calm: 0,
    energetic: 0,
    neutral: 1, // Default olarak nötr durum
  };

  useEffect(() => {
    if (!enabled) return;

    // Demo amaçlı değişen duygu durumunu simüle eden fonksiyon
    const simulateEmotionChanges = () => {
      // Gerçek uygulamada burada ML modeliyle analiz yapılacak
      // Şu an için rastgele değişimler gösteriyoruz
      
      // Rastgele bir duygu seçelim
      const emotions: EmotionType[] = ["happy", "sad", "angry", "calm", "energetic", "neutral"];
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      
      // Güncellenmiş duyguyu dışarıya bildirelim
      setLastDetectedEmotion(randomEmotion);
      onEmotionDetected(randomEmotion);
      
      console.log("Detected emotion:", randomEmotion);
    };

    // Yalnızca demo amaçlı, her 30-60 saniye arasında duygu değişimi simüle ediliyor
    let timer: number | null = null;
    if (enabled) {
      // İlk çalıştırmada kısa bir gecikme
      timer = window.setTimeout(() => {
        simulateEmotionChanges();
        
        // Ardından periyodik olarak kontrol et (gerçek uygulamada sürekli analiz yapılacak)
        timer = window.setInterval(simulateEmotionChanges, Math.random() * 30000 + 30000);
      }, 5000);
    }
    
    // Cleanup
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [enabled, useCamera, useMicrophone, onEmotionDetected]);

  // Bu component görünmez, yalnızca durum analizi yapar
  return null;
};

export default EmotionDetector;
