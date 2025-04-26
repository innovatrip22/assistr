import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';

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
  const [processingComplete, setProcessingComplete] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const analysisInterval = useRef<number | null>(null);

  const [emotionValues, setEmotionValues] = useState<EmotionValues>({
    happy: 0,
    sad: 0,
    angry: 0,
    calm: 0,
    energetic: 0,
    neutral: 1,
  });

  const emotionWeightMapping = {
    typing: {
      happy: 0.3,
      sad: 0.2,
      angry: 0.3,
      calm: 0.4,
      energetic: 0.3,
      neutral: 0.5
    },
    face: {
      happy: 0.5,
      sad: 0.5,
      angry: 0.6,
      calm: 0.4,
      energetic: 0.4,
      neutral: 0.3
    },
    voice: {
      happy: 0.4,
      sad: 0.5,
      angry: 0.6,
      calm: 0.5,
      energetic: 0.6,
      neutral: 0.3
    }
  };

  useEffect(() => {
    if (enabled) {
      if (initializing) {
        toast.info("Duygu algılama sistemi başlatılıyor...", {
          duration: 3000
        });
        
        setTimeout(() => {
          setInitializing(false);
          toast.success("Duygu algılama sistemi hazır", {
            description: "Sistem duygularınızı algılamak için çalışıyor"
          });
        }, 2000);
      }
      
      if (useCamera) {
        startCamera();
      }
      
      if (useMicrophone) {
        startMicrophone();
      }
      
      startEmotionAnalysis();
    } else {
      stopCamera();
      stopMicrophone();
      stopEmotionAnalysis();
    }
    
    return () => {
      stopCamera();
      stopMicrophone();
      stopEmotionAnalysis();
    };
  }, [enabled, useCamera, useMicrophone]);

  const startCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setErrorMessage("Kamera erişimi desteklenmiyor");
      setFaceDetectionStatus("error");
      return;
    }
    
    try {
      setFaceDetectionStatus("initializing");
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 320 },
          height: { ideal: 240 }
        }
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setFaceDetectionStatus("active");
      toast.success("Kamera başarıyla başlatıldı", { duration: 2000 });
      
      console.log("Yüz analizi modeli başlatıldı (simüle ediliyor)");
      
    } catch (err) {
      console.error("Kamera erişimi hatası:", err);
      setFaceDetectionStatus("error");
      setErrorMessage("Kamera erişimi reddedildi veya kullanılamıyor");
      toast.error("Kamera erişimi sağlanamadı", { 
        description: "Tarayıcı ayarlarınızdan kamera izinlerini kontrol edin"
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setFaceDetectionStatus("idle");
  };

  const startMicrophone = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setErrorMessage("Mikrofon erişimi desteklenmiyor");
      setVoiceAnalysisStatus("error");
      return;
    }
    
    try {
      setVoiceAnalysisStatus("initializing");
      
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });
      
      const audioTracks = stream.getAudioTracks();
      
      setVoiceAnalysisStatus("active");
      toast.success("Mikrofon başarıyla başlatıldı", { duration: 2000 });
      
      console.log("Ses analizi modeli başlatıldı (simüle ediliyor)");
      
      return () => {
        audioTracks.forEach(track => track.stop());
      };
      
    } catch (err) {
      console.error("Mikrofon erişimi hatası:", err);
      setVoiceAnalysisStatus("error");
      setErrorMessage("Mikrofon erişimi reddedildi veya kullanılamıyor");
      toast.error("Mikrofon erişimi sağlanamadı", {
        description: "Tarayıcı ayarlarınızdan mikrofon izinlerini kontrol edin"
      });
    }
  };

  const stopMicrophone = () => {
    setVoiceAnalysisStatus("idle");
  };

  const startEmotionAnalysis = () => {
    if (analysisInterval.current) {
      window.clearInterval(analysisInterval.current);
    }
    
    const initialDelay = setTimeout(() => {
      analyzeEmotions();
      
      analysisInterval.current = window.setInterval(() => {
        analyzeEmotions();
      }, 15000);
    }, 3000);
    
    return () => {
      clearTimeout(initialDelay);
      if (analysisInterval.current) {
        window.clearInterval(analysisInterval.current);
      }
    };
  };

  const stopEmotionAnalysis = () => {
    if (analysisInterval.current) {
      window.clearInterval(analysisInterval.current);
      analysisInterval.current = null;
    }
  };

  const analyzeEmotions = () => {
    if (!enabled) return;
    
    setProcessingComplete(false);
    
    const prevEmotions = { ...emotionValues };
    
    const simulatedInputs = {
      face: {
        happy: Math.random(),
        sad: Math.random() * 0.8,
        angry: Math.random() * 0.7,
        calm: Math.random() * 0.9,
        energetic: Math.random() * 0.6,
        neutral: Math.random() * 0.5
      },
      
      voice: {
        happy: Math.random() * 0.7,
        sad: Math.random() * 0.8,
        angry: Math.random() * 0.9,
        calm: Math.random() * 0.6,
        energetic: Math.random() * 0.8,
        neutral: Math.random() * 0.4
      },
      
      typing: {
        happy: Math.random() * 0.6,
        sad: Math.random() * 0.7,
        angry: Math.random() * 0.5,
        calm: Math.random() * 0.8,
        energetic: Math.random() * 0.7,
        neutral: Math.random() * 0.6
      }
    };
    
    const newEmotionValues: EmotionValues = {
      happy: 0,
      sad: 0,
      angry: 0,
      calm: 0,
      energetic: 0,
      neutral: 0
    };
    
    Object.keys(newEmotionValues).forEach(emotion => {
      if (useCamera) {
        newEmotionValues[emotion] += simulatedInputs.face[emotion as keyof typeof simulatedInputs.face] * 
                                     emotionWeightMapping.face[emotion as keyof typeof emotionWeightMapping.face];
      }
      
      if (useMicrophone) {
        newEmotionValues[emotion] += simulatedInputs.voice[emotion as keyof typeof simulatedInputs.voice] * 
                                     emotionWeightMapping.voice[emotion as keyof typeof emotionWeightMapping.voice];
      }
      
      newEmotionValues[emotion] += simulatedInputs.typing[emotion as keyof typeof simulatedInputs.typing] * 
                                   emotionWeightMapping.typing[emotion as keyof typeof emotionWeightMapping.typing];
    });
    
    let total = Object.values(newEmotionValues).reduce((sum, val) => sum + val, 0);
    if (total > 0) {
      Object.keys(newEmotionValues).forEach(emotion => {
        newEmotionValues[emotion] = newEmotionValues[emotion] / total;
      });
    } else {
      newEmotionValues.neutral = 1;
    }
    
    Object.keys(newEmotionValues).forEach(emotion => {
      newEmotionValues[emotion] = newEmotionValues[emotion] * 0.7 + prevEmotions[emotion] * 0.3;
    });
    
    let dominantEmotion: EmotionType = "neutral";
    let maxValue = 0;
    
    Object.entries(newEmotionValues).forEach(([emotion, value]) => {
      if (value > maxValue) {
        maxValue = value;
        dominantEmotion = emotion as EmotionType;
      }
    });
    
    setEmotionValues(newEmotionValues);
    
    if (dominantEmotion !== lastDetectedEmotion) {
      setLastDetectedEmotion(dominantEmotion);
      onEmotionDetected(dominantEmotion);
      
      const emotionNames: {[key in EmotionType]: string} = {
        happy: "Mutlu",
        sad: "Üzgün",
        angry: "Sinirli", 
        calm: "Sakin",
        energetic: "Enerjik",
        neutral: "Nötr",
        manual: "Manuel"
      };
      
      toast.info(`Duygusal durum algılandı: ${emotionNames[dominantEmotion]}`, {
        duration: 3000,
        icon: getEmotionIcon(dominantEmotion)
      });
      
      if (process.env.NODE_ENV === 'development') {
        console.log("Duygu algılama:", dominantEmotion, "- Güven oranı:", maxValue.toFixed(2));
        console.log("Tüm duygusal değerler:", newEmotionValues);
      }
    }
    
    setProcessingComplete(true);
  };

  const getEmotionIcon = (emotion: EmotionType): JSX.Element => {
    switch (emotion) {
      case "happy": return <span role="img" aria-label="mutlu">😊</span>;
      case "sad": return <span role="img" aria-label="üzgün">😢</span>;
      case "angry": return <span role="img" aria-label="sinirli">😠</span>;
      case "calm": return <span role="img" aria-label="sakin">😌</span>;
      case "energetic": return <span role="img" aria-label="enerjik">⚡</span>;
      default: return <span role="img" aria-label="nötr">😐</span>;
    }
  };

  return (
    <>
      {useCamera && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{ 
            position: 'absolute', 
            width: 1, 
            height: 1, 
            opacity: 0,
            pointerEvents: 'none',
            overflow: 'hidden'
          }}
          aria-hidden="true"
        />
      )}
      
      {process.env.NODE_ENV === 'development' && enabled && (
        <div 
          className="fixed bottom-16 right-4 bg-black/30 text-white text-xs px-2 py-1 rounded-full z-50"
          style={{ fontSize: '8px' }}
        >
          {faceDetectionStatus === 'active' && '👁️ '}
          {voiceAnalysisStatus === 'active' && '🎤 '}
          Duygu: {lastDetectedEmotion}
        </div>
      )}
    </>
  );
};

export default EmotionDetector;
