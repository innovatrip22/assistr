
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, ThumbsUp, ThumbsDown, Star, Users } from "lucide-react";
import { getFeedbacks, addFeedbackResponse, Feedback } from "@/services";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const BusinessFeedback = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    try {
      setLoading(true);
      const data = await getFeedbacks();
      setFeedbacks(data);
    } catch (error) {
      console.error("Error loading feedbacks:", error);
      toast({
        variant: "destructive",
        title: "Geri bildirimler yüklenirken hata oluştu",
        description: "Lütfen daha sonra tekrar deneyin."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async () => {
    if (selectedFeedback?.id && replyText.trim()) {
      setIsSubmitting(true);
      try {
        await addFeedbackResponse(selectedFeedback.id, replyText);
        
        toast({
          title: "Yanıt gönderildi",
          description: "Geri bildirime yanıtınız başarıyla gönderildi."
        });
        
        // Reload feedbacks to update the list
        await loadFeedbacks();
        
        // Reset state
        setReplyText("");
        setSelectedFeedback(null);
        setIsReplyDialogOpen(false);
      } catch (error) {
        console.error("Error sending reply:", error);
        toast({
          variant: "destructive",
          title: "Yanıt gönderilirken hata oluştu",
          description: "Lütfen daha sonra tekrar deneyin."
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const renderStars = (rating: number | undefined) => {
    if (!rating) return null;
    
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star 
          key={i} 
          className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
        />
      ));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "complaint":
        return "bg-red-100 text-red-800";
      case "suggestion":
        return "bg-blue-100 text-blue-800";
      case "praise":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "complaint":
        return "Şikayet";
      case "suggestion":
        return "Öneri";
      case "praise":
        return "Övgü";
      default:
        return type;
    }
  };
  
  if (loading) {
    return <div className="flex justify-center items-center h-[400px]">Yükleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Geri Bildirimler & Şikayetler</h2>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-800">
            <ThumbsUp className="h-3 w-3 mr-1" />
            {feedbacks.filter(f => f.type === "praise").length} Övgü
          </Badge>
          <Badge className="bg-red-100 text-red-800">
            <ThumbsDown className="h-3 w-3 mr-1" />
            {feedbacks.filter(f => f.type === "complaint").length} Şikayet
          </Badge>
          <Badge className="bg-blue-100 text-blue-800">
            <MessageSquare className="h-3 w-3 mr-1" />
            {feedbacks.filter(f => f.type === "suggestion").length} Öneri
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Tümü</TabsTrigger>
          <TabsTrigger value="complaint">Şikayetler</TabsTrigger>
          <TabsTrigger value="suggestion">Öneriler</TabsTrigger>
          <TabsTrigger value="praise">Övgüler</TabsTrigger>
          <TabsTrigger value="unreplied">Yanıtlanmamış</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Tüm Geri Bildirimler
              </CardTitle>
              <CardDescription>
                Müşterilerinizden gelen tüm geri bildirimler
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedbacks.length > 0 ? (
                  feedbacks.map((feedback) => (
                    <FeedbackItem 
                      key={feedback.id} 
                      feedback={feedback} 
                      onReply={(feedback) => {
                        setSelectedFeedback(feedback);
                        setReplyText(feedback.response || "");
                        setIsReplyDialogOpen(true);
                      }}
                      renderStars={renderStars}
                      getTypeColor={getTypeColor}
                      getTypeLabel={getTypeLabel}
                    />
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Henüz geri bildirim bulunmuyor</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="complaint" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {feedbacks.filter(f => f.type === "complaint").length > 0 ? (
                  feedbacks.filter(f => f.type === "complaint").map((feedback) => (
                    <FeedbackItem 
                      key={feedback.id} 
                      feedback={feedback} 
                      onReply={(feedback) => {
                        setSelectedFeedback(feedback);
                        setReplyText(feedback.response || "");
                        setIsReplyDialogOpen(true);
                      }}
                      renderStars={renderStars}
                      getTypeColor={getTypeColor}
                      getTypeLabel={getTypeLabel}
                    />
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <ThumbsDown className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Henüz şikayet bulunmuyor</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suggestion" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {feedbacks.filter(f => f.type === "suggestion").length > 0 ? (
                  feedbacks.filter(f => f.type === "suggestion").map((feedback) => (
                    <FeedbackItem 
                      key={feedback.id} 
                      feedback={feedback} 
                      onReply={(feedback) => {
                        setSelectedFeedback(feedback);
                        setReplyText(feedback.response || "");
                        setIsReplyDialogOpen(true);
                      }}
                      renderStars={renderStars}
                      getTypeColor={getTypeColor}
                      getTypeLabel={getTypeLabel}
                    />
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Henüz öneri bulunmuyor</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="praise" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {feedbacks.filter(f => f.type === "praise").length > 0 ? (
                  feedbacks.filter(f => f.type === "praise").map((feedback) => (
                    <FeedbackItem 
                      key={feedback.id} 
                      feedback={feedback} 
                      onReply={(feedback) => {
                        setSelectedFeedback(feedback);
                        setReplyText(feedback.response || "");
                        setIsReplyDialogOpen(true);
                      }}
                      renderStars={renderStars}
                      getTypeColor={getTypeColor}
                      getTypeLabel={getTypeLabel}
                    />
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <ThumbsUp className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Henüz övgü bulunmuyor</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unreplied" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {feedbacks.filter(f => !f.response).length > 0 ? (
                  feedbacks.filter(f => !f.response).map((feedback) => (
                    <FeedbackItem 
                      key={feedback.id} 
                      feedback={feedback} 
                      onReply={(feedback) => {
                        setSelectedFeedback(feedback);
                        setReplyText(feedback.response || "");
                        setIsReplyDialogOpen(true);
                      }}
                      renderStars={renderStars}
                      getTypeColor={getTypeColor}
                      getTypeLabel={getTypeLabel}
                    />
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Tüm geri bildirimler yanıtlandı</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Reply Dialog */}
      <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Geri Bildirime Yanıt</DialogTitle>
            <DialogDescription>
              Müşteri geri bildirimine yanıt yazın. Bu, müşteri ile iletişiminizi güçlendirir.
            </DialogDescription>
          </DialogHeader>
          
          {selectedFeedback && (
            <div className="py-4">
              <div className="bg-gray-50 p-3 rounded-md mb-4">
                <div className="flex justify-between">
                  <h4 className="font-medium">{selectedFeedback.subject}</h4>
                  <div className="flex">
                    {renderStars(selectedFeedback.rating)}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-2">{selectedFeedback.message}</p>
                <div className="flex justify-between items-center mt-2">
                  <Badge className={getTypeColor(selectedFeedback.type)}>
                    {getTypeLabel(selectedFeedback.type)}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {selectedFeedback.timestamp && new Date(selectedFeedback.timestamp).toLocaleDateString('tr-TR')}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Yanıtınız</label>
                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Müşteriye yanıtınızı yazın..."
                    rows={4}
                  />
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsReplyDialogOpen(false);
              setSelectedFeedback(null);
              setReplyText("");
            }}>
              İptal
            </Button>
            <Button 
              onClick={handleReply} 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Gönderiliyor..." : "Yanıt Gönder"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// FeedbackItem component for rendering each feedback
const FeedbackItem = ({ 
  feedback, 
  onReply,
  renderStars,
  getTypeColor,
  getTypeLabel
}: { 
  feedback: Feedback; 
  onReply: (feedback: Feedback) => void;
  renderStars: (rating: number | undefined) => React.ReactNode;
  getTypeColor: (type: string) => string;
  getTypeLabel: (type: string) => string;
}) => {
  return (
    <div className="p-4 border rounded-lg bg-white">
      <div className="flex justify-between">
        <h3 className="font-medium">{feedback.subject}</h3>
        <div className="flex">
          {renderStars(feedback.rating)}
        </div>
      </div>
      
      <p className="text-sm text-gray-700 mt-2">{feedback.message}</p>
      
      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center gap-2">
          <Badge className={getTypeColor(feedback.type)}>
            {getTypeLabel(feedback.type)}
          </Badge>
          <span className="text-xs text-gray-500">
            {/* Display a placeholder for user ID if we don't have real user info */}
            {feedback.user_id?.substring(0, 8) || "Anonim"} • 
            {feedback.timestamp && new Date(feedback.timestamp).toLocaleDateString('tr-TR')}
          </span>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onReply(feedback)}
        >
          {feedback.response ? "Yanıtı Düzenle" : "Yanıtla"}
        </Button>
      </div>
      
      {feedback.response && (
        <div className="mt-3 bg-blue-50 p-3 rounded text-sm">
          <p className="text-xs font-medium text-blue-700 mb-1">Yanıtınız:</p>
          <p className="text-gray-700">{feedback.response}</p>
        </div>
      )}
    </div>
  );
};

export default BusinessFeedback;
