
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, ThumbsUp, ThumbsDown, Star, Users } from "lucide-react";

// Mock data for feedback
const mockFeedbacks = [
  {
    id: "1",
    user: "Ahmet Y.",
    type: "complaint" as const,
    subject: "Hizmet Kalitesi",
    message: "Girne'deki restoranınızda servis biraz yavaştı. Daha hızlı olabilir.",
    rating: 3,
    date: "10 Ağustos 2023",
    reply: null
  },
  {
    id: "2",
    user: "Ayşe K.",
    type: "suggestion" as const,
    subject: "Menü Önerisi",
    message: "KKTC'ye özgü daha fazla yerel yemek eklemenizi öneririm.",
    rating: 4,
    date: "5 Ağustos 2023",
    reply: "Öneriniz için teşekkür ederiz. Menümüze daha fazla KKTC lezzeti eklemeyi planlıyoruz."
  },
  {
    id: "3",
    user: "Mehmet S.",
    type: "praise" as const,
    subject: "Personel",
    message: "Resepsiyondaki personel çok yardımcı oldu. Teşekkürler!",
    rating: 5,
    date: "1 Ağustos 2023",
    reply: null
  },
  {
    id: "4",
    user: "Zeynep T.",
    type: "complaint" as const,
    subject: "Temizlik",
    message: "Otel odası beklediğim kadar temiz değildi.",
    rating: 2,
    date: "29 Temmuz 2023",
    reply: "Geri bildiriminiz için teşekkür ederiz. Temizlik ekibimizle bu konuda görüşeceğiz."
  }
];

interface Feedback {
  id: string;
  user: string;
  type: "complaint" | "suggestion" | "praise";
  subject: string;
  message: string;
  rating: number;
  date: string;
  reply: string | null;
}

const BusinessFeedback = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(mockFeedbacks);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);

  const handleReply = () => {
    if (selectedFeedback && replyText.trim()) {
      const updatedFeedbacks = feedbacks.map(feedback => 
        feedback.id === selectedFeedback.id 
        ? { ...feedback, reply: replyText } 
        : feedback
      );
      
      setFeedbacks(updatedFeedbacks);
      setReplyText("");
      setSelectedFeedback(null);
      setIsReplyDialogOpen(false);
    }
  };

  const renderStars = (rating: number) => {
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
                {feedbacks.map((feedback) => (
                  <FeedbackItem 
                    key={feedback.id} 
                    feedback={feedback} 
                    onReply={(feedback) => {
                      setSelectedFeedback(feedback);
                      setReplyText(feedback.reply || "");
                      setIsReplyDialogOpen(true);
                    }}
                    renderStars={renderStars}
                    getTypeColor={getTypeColor}
                    getTypeLabel={getTypeLabel}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="complaint" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {feedbacks.filter(f => f.type === "complaint").map((feedback) => (
                  <FeedbackItem 
                    key={feedback.id} 
                    feedback={feedback} 
                    onReply={(feedback) => {
                      setSelectedFeedback(feedback);
                      setReplyText(feedback.reply || "");
                      setIsReplyDialogOpen(true);
                    }}
                    renderStars={renderStars}
                    getTypeColor={getTypeColor}
                    getTypeLabel={getTypeLabel}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suggestion" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {feedbacks.filter(f => f.type === "suggestion").map((feedback) => (
                  <FeedbackItem 
                    key={feedback.id} 
                    feedback={feedback} 
                    onReply={(feedback) => {
                      setSelectedFeedback(feedback);
                      setReplyText(feedback.reply || "");
                      setIsReplyDialogOpen(true);
                    }}
                    renderStars={renderStars}
                    getTypeColor={getTypeColor}
                    getTypeLabel={getTypeLabel}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="praise" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {feedbacks.filter(f => f.type === "praise").map((feedback) => (
                  <FeedbackItem 
                    key={feedback.id} 
                    feedback={feedback} 
                    onReply={(feedback) => {
                      setSelectedFeedback(feedback);
                      setReplyText(feedback.reply || "");
                      setIsReplyDialogOpen(true);
                    }}
                    renderStars={renderStars}
                    getTypeColor={getTypeColor}
                    getTypeLabel={getTypeLabel}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unreplied" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {feedbacks.filter(f => f.reply === null).map((feedback) => (
                  <FeedbackItem 
                    key={feedback.id} 
                    feedback={feedback} 
                    onReply={(feedback) => {
                      setSelectedFeedback(feedback);
                      setReplyText(feedback.reply || "");
                      setIsReplyDialogOpen(true);
                    }}
                    renderStars={renderStars}
                    getTypeColor={getTypeColor}
                    getTypeLabel={getTypeLabel}
                  />
                ))}
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
                  <span className="text-xs text-gray-500">{selectedFeedback.date}</span>
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
            <Button onClick={handleReply}>
              Yanıt Gönder
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
  renderStars: (rating: number) => React.ReactNode;
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
            {feedback.user} • {feedback.date}
          </span>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onReply(feedback)}
        >
          {feedback.reply ? "Yanıtı Düzenle" : "Yanıtla"}
        </Button>
      </div>
      
      {feedback.reply && (
        <div className="mt-3 bg-blue-50 p-3 rounded text-sm">
          <p className="text-xs font-medium text-blue-700 mb-1">Yanıtınız:</p>
          <p className="text-gray-700">{feedback.reply}</p>
        </div>
      )}
    </div>
  );
};

export default BusinessFeedback;
