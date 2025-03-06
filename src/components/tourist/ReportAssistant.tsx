
import { useState } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { FraudReportForm, EmergencyReportForm, PriceReportForm } from "@/components/tourist/ReportForms";
import { submitReports } from "@/services";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const ReportAssistant = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [audioData, setAudioData] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = async (type: string, data: any) => {
    setIsSubmitting(true);
    try {
      const reportData = {
        ...data,
        type,
        user_id: user?.id || 'anonymous',
        has_audio: audioData !== null
      };
      
      // Handle file upload if there's a photo
      if (data.photo) {
        // In a real implementation, this would upload the file to a server
        console.log("Photo to upload:", data.photo);
        // reportData.photo_url = uploadedUrl;
      }
      
      // Handle audio upload if recorded
      if (audioData) {
        // In a real implementation, this would upload the audio to a server
        console.log("Audio to upload:", audioData);
        // reportData.audio_url = uploadedAudioUrl;
      }
      
      await submitReports(type, reportData);
      
      toast({
        title: "Rapor Gönderildi",
        description: "Raporunuz başarıyla gönderildi.",
      });
      
      // Reset audio recording
      setAudioData(null);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Rapor gönderilirken hata oluştu",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Tabs defaultValue="price" className="w-full space-y-4">
      <TabsList>
        <TabsTrigger value="price">Fahiş Fiyat</TabsTrigger>
        <TabsTrigger value="fraud">Dolandırıcılık</TabsTrigger>
        <TabsTrigger value="emergency">Acil Durum</TabsTrigger>
      </TabsList>
      <TabsContent value="price">
        <PriceReportForm 
          onSubmit={(data) => handleSubmit("price", data)} 
          isSubmitting={isSubmitting}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          setAudioData={setAudioData}
          audioData={audioData}
        />
      </TabsContent>
      <TabsContent value="fraud">
        <FraudReportForm 
          onSubmit={(data) => handleSubmit("fraud", data)} 
          isSubmitting={isSubmitting}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          setAudioData={setAudioData}
          audioData={audioData}
        />
      </TabsContent>
      <TabsContent value="emergency">
        <EmergencyReportForm 
          onSubmit={(data) => handleSubmit("emergency", data)} 
          isSubmitting={isSubmitting}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          setAudioData={setAudioData}
          audioData={audioData}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ReportAssistant;
