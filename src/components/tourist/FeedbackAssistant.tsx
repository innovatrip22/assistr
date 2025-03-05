import { useState } from "react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { 
  Button, 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { submitFeedback, getFeedbacks } from "@/services";

const FeedbackAssistant = () => {
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useState(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    try {
      const allFeedbacks = await getFeedbacks();
      setFeedbacks(allFeedbacks);
    } catch (error) {
      console.error("Error loading feedbacks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!feedbackText.trim()) {
      toast.error("Lütfen geri bildiriminizi yazın.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (!user?.id) {
        toast.error("Kullanıcı oturumu bulunamadı.");
        return;
      }
      
      await submitFeedback(user.id, feedbackText);
      toast.success("Geri bildiriminiz başarıyla gönderildi!");
      setFeedbackText("");
      loadFeedbacks(); // Reload feedbacks after submitting
    } catch (error) {
      console.error("Feedback submission error:", error);
      toast.error("Geri bildirim gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Geri Bildirim</CardTitle>
        <CardDescription>
          Antalya deneyiminizi iyileştirmemize yardımcı olun.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea 
          placeholder="Antalya hakkında ne düşünüyorsunuz?" 
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
        />
      </CardContent>
      <CardFooter>
        <Button disabled={isSubmitting} onClick={handleSubmit}>
          {isSubmitting ? "Gönderiliyor..." : "Geri Bildirimi Gönder"}
        </Button>
      </CardFooter>

      <CardContent>
        <h4 className="text-sm font-bold mb-2">Gönderilen Geri Bildirimler</h4>
        <div className="space-y-3">
          {feedbacks.length > 0 ? (
            feedbacks.map((feedback, index) => (
              <div key={index} className="p-3 rounded-md bg-gray-50 border border-gray-200">
                <p className="text-sm text-gray-700">{feedback.message}</p>
                <div className="text-xs text-gray-500 mt-1">
                  Gönderildi: {format(new Date(feedback.timestamp), 'dd MMM yyyy HH:mm', {locale: tr})}
                </div>
                {feedback.response && (
                  <div className="mt-2 p-2 rounded-md bg-blue-50 border border-blue-200">
                    <p className="text-xs font-medium text-blue-800">Yanıt:</p>
                    <p className="text-sm text-gray-600">{feedback.response}</p>
                    <div className="text-xs text-gray-500 mt-1">
                      Yanıtlandı: {format(new Date(feedback.response_timestamp || ""), 'dd MMM yyyy HH:mm', {locale: tr})}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-gray-500">Henüz geri bildirim gönderilmedi.</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackAssistant;
