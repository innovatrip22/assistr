
import { useState } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { FraudReportForm, EmergencyReportForm, PriceReportForm } from "@/components/tourist/ReportForms";
import { addReport } from "@/services";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const ReportAssistant = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (type: string, data: any) => {
    setIsSubmitting(true);
    try {
      const reportData = {
        ...data,
        type,
        user_id: user?.id || 'anonymous'
      };
      
      await addReport(reportData);
      
      toast({
        title: "Rapor Gönderildi",
        description: "Raporunuz başarıyla gönderildi.",
      });
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
        <PriceReportForm onSubmit={(data) => handleSubmit("price", data)} isSubmitting={isSubmitting} />
      </TabsContent>
      <TabsContent value="fraud">
        <FraudReportForm onSubmit={(data) => handleSubmit("fraud", data)} isSubmitting={isSubmitting} />
      </TabsContent>
      <TabsContent value="emergency">
        <EmergencyReportForm onSubmit={(data) => handleSubmit("emergency", data)} isSubmitting={isSubmitting} />
      </TabsContent>
    </Tabs>
  );
};

export default ReportAssistant;
