
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Video, Mic, ShieldAlert } from "lucide-react";
import { toast } from 'sonner';

interface EmotionPermissionDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (permissions: { camera: boolean; microphone: boolean }) => void;
}

const EmotionPermissionDialog: React.FC<EmotionPermissionDialogProps> = ({
  open,
  onClose,
  onConfirm
}) => {
  const [cameraPermission, setCameraPermission] = React.useState(true);
  const [microphonePermission, setMicrophonePermission] = React.useState(true);
  
  const handleConfirm = async () => {
    // If both are disabled, show warning
    if (!cameraPermission && !microphonePermission) {
      toast.warning("Duygu algılama için en az bir giriş kaynağı gereklidir", {
        description: "Tam özellikler için kamera veya mikrofon erişimi sağlayın"
      });
      return;
    }
    
    // Check for browser support
    if ((cameraPermission && !navigator.mediaDevices?.getUserMedia) || 
        (microphonePermission && !navigator.mediaDevices?.getUserMedia)) {
      toast.error("Tarayıcınız gerekli medya erişimini desteklemiyor", {
        description: "Daha modern bir tarayıcı kullanmayı deneyin"
      });
      return;
    }
    
    // In real app, we would request permissions here
    if (cameraPermission || microphonePermission) {
      try {
        // Request permissions based on user selection
        if (cameraPermission && microphonePermission) {
          await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        } else if (cameraPermission) {
          await navigator.mediaDevices.getUserMedia({ video: true });
        } else if (microphonePermission) {
          await navigator.mediaDevices.getUserMedia({ audio: true });
        }
        
        // If we got here, permissions were granted
        onConfirm({ 
          camera: cameraPermission, 
          microphone: microphonePermission 
        });
        
        toast.success("İzinler başarıyla alındı", {
          description: "Duygu algılama sistemi aktif edildi"
        });
        
      } catch (error) {
        console.error("Medya erişim hatası:", error);
        toast.error("İzinler alınamadı", {
          description: "Lütfen tarayıcı ayarlarınızdan izinleri kontrol edin"
        });
      }
    } else {
      // No permissions needed
      onConfirm({ camera: false, microphone: false });
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Duygu Durumu Algılama İzinleri</DialogTitle>
          <DialogDescription>
            Daha iyi bir deneyim için, duygu algılama sistemi kamera ve/veya mikrofonu kullanabilir. 
            Hangi özellikleri etkinleştirmek istediğinizi seçin.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between border p-3 rounded-md">
            <div className="flex items-center gap-3">
              <Video className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium text-sm">Kamera Erişimi</p>
                <p className="text-xs text-muted-foreground">Yüz ifadelerinizden duygu analizi</p>
              </div>
            </div>
            <Button
              variant={cameraPermission ? "default" : "outline"}
              size="sm"
              onClick={() => setCameraPermission(!cameraPermission)}
            >
              {cameraPermission ? "Açık" : "Kapalı"}
            </Button>
          </div>
          
          <div className="flex items-center justify-between border p-3 rounded-md">
            <div className="flex items-center gap-3">
              <Mic className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium text-sm">Mikrofon Erişimi</p>
                <p className="text-xs text-muted-foreground">Ses tonunuzdan duygu analizi</p>
              </div>
            </div>
            <Button
              variant={microphonePermission ? "default" : "outline"}
              size="sm"
              onClick={() => setMicrophonePermission(!microphonePermission)}
            >
              {microphonePermission ? "Açık" : "Kapalı"}
            </Button>
          </div>
          
          <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-md flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 dark:text-amber-300">
              Tüm duygu algılama işlemleri cihazınızda yerel olarak gerçekleştirilir ve hiçbir veri 
              sunuculara gönderilmez. İstediğiniz zaman bu özellikleri devre dışı bırakabilirsiniz.
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            İptal
          </Button>
          <Button onClick={handleConfirm}>
            Onaylayın ve Devam Edin
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmotionPermissionDialog;
