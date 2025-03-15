
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MessageSquare, 
  Send, 
  Loader2, 
  Info, 
  ThumbsUp, 
  ThumbsDown, 
  Bus, 
  Star, 
  Calendar 
} from "lucide-react";
import { toast } from "sonner";
import { sendMessageToAI } from "@/services";
import { useAuth } from "@/hooks/useAuth";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type BusStop = {
  name: string;
  location: string;
  lines: string[];
  departures: string[];
  facilities: string[];
};

type UserReview = {
  username: string;
  rating: number;
  comment: string;
  date: string;
};

const TravelChat = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {role: 'assistant', content: 'Merhaba! KKTC hakkında sorularınızı yanıtlamaya hazırım. Size nasıl yardımcı olabilirim?'}
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedBusStop, setSelectedBusStop] = useState<BusStop | null>(null);
  const [showReservationDialog, setShowReservationDialog] = useState(false);
  const [reservationType, setReservationType] = useState("tour");
  const { userType } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample bus stops data
  const busStops = [
    {
      name: "Lefkoşa Terminal",
      location: "Merkezi Lefkoşa",
      lines: ["Girne", "Gazimağusa", "Güzelyurt"],
      departures: ["Her saat başı 07:00-22:00", "Cuma-Cumartesi 07:00-00:00"],
      facilities: ["Bekleme salonu", "Kafeterya", "ATM", "WiFi"]
    },
    {
      name: "Girne Terminal",
      location: "Girne Merkez",
      lines: ["Lefkoşa", "Lapta", "Karşıyaka"],
      departures: ["Her saat başı 07:00-21:00", "Hafta sonu 08:00-22:00"],
      facilities: ["Bilet gişesi", "Bekleme alanı", "Restoran", "WC"]
    },
    {
      name: "Gazimağusa Terminal",
      location: "Gazimağusa Merkez",
      lines: ["Lefkoşa", "İskele", "Yeniboğaziçi"],
      departures: ["Her yarım saatte 06:30-20:30", "Pazar günleri 08:00-20:00"],
      facilities: ["Bilet ofisi", "Kiosk", "Market", "Taksi durağı"]
    }
  ];

  // Sample user reviews
  const userReviews = [
    {
      username: "Mehmet K.",
      rating: 5,
      comment: "Bellapais Manastırı harika bir yer. Rehberimiz çok bilgiliydi ve bölgenin tarihi hakkında detaylı bilgi verdi.",
      date: "15 Mayıs 2023"
    },
    {
      username: "Ayşe T.",
      rating: 4,
      comment: "Salamis antik kenti görülmeye değer. Yalnız yazın şapka ve su almayı unutmayın, çok sıcak oluyor.",
      date: "22 Haziran 2023"
    },
    {
      username: "Can B.",
      rating: 5,
      comment: "Girne Kalesi ve Batık Gemi Müzesi muhteşemdi. Giriş ücreti 15TL ve kesinlikle değer.",
      date: "10 Temmuz 2023"
    },
    {
      username: "Zeynep A.",
      rating: 3,
      comment: "Altın Kumsal plajı güzel ama hafta sonları çok kalabalık oluyor. Hafta içi gitmenizi öneririm.",
      date: "5 Ağustos 2023"
    }
  ];

  // Önerilen sorular - improved suggestions
  const suggestedQuestions = [
    "KKTC'de en popüler plajlar hangileri?",
    "Lefkoşa'da tarihi yerler nelerdir?",
    "KKTC'ye nasıl ulaşabilirim?",
    "KKTC'de konaklama fiyatları nasıl?",
    "KKTC'de yerel mutfak önerileri nelerdir?",
    "Kıbrıs'ta görülmesi gereken müzeler?"
  ];

  // Topic cards with more engaging content
  const topicCards = [
    {
      title: "Popüler Turistik Yerler",
      description: "Lefkoşa, Girne ve Gazimağusa'daki en popüler turistik mekanlar hakkında bilgi alın.",
      icon: <MessageSquare className="h-4 w-4 text-blue-600" />
    },
    {
      title: "Kıbrıs Mutfağı",
      description: "Hellim, şeftali kebabı ve diğer yerel tatlar hakkında bilgi edinin.",
      icon: <MessageSquare className="h-4 w-4 text-green-600" />
    },
    {
      title: "Plajlar",
      description: "KKTC'nin kristal berraklığındaki denizleri ve altın kumlu plajları hakkında bilgi alın.",
      icon: <MessageSquare className="h-4 w-4 text-orange-600" />
    },
    {
      title: "Etkinlikler ve Festivaller",
      description: "KKTC'de düzenlenen festival ve etkinlikler hakkında güncel bilgiler alın.",
      icon: <MessageSquare className="h-4 w-4 text-purple-600" />
    }
  ];

  // Enhanced topic cards with new transport information
  const transportCards = [
    {
      title: "Otobüs Durakları",
      description: "KKTC'deki otobüs durakları, hatlar ve sefer saatleri hakkında bilgi alın.",
      icon: <Bus className="h-4 w-4 text-blue-600" />,
      action: () => handleSuggestedQuestion("KKTC'deki otobüs durakları hakkında bilgi verir misin?")
    },
    {
      title: "Kullanıcı Değerlendirmeleri",
      description: "Diğer turistlerin KKTC deneyimleri hakkındaki görüşlerini inceleyin.",
      icon: <Star className="h-4 w-4 text-yellow-500" />,
      action: () => handleSuggestedQuestion("KKTC'deki turistik yerler hakkında ziyaretçi yorumları nelerdir?")
    },
    {
      title: "Rezervasyon Yap",
      description: "Tur, otel, araba kiralama ve restoran rezervasyonları için bilgi alın.",
      icon: <Calendar className="h-4 w-4 text-green-600" />,
      action: () => setShowReservationDialog(true)
    }
  ];

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSendMessage = async (message = inputMessage) => {
    if (!message.trim()) return;
    
    const userMessage = {role: 'user', content: message} as ChatMessage;
    setChatHistory(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);
    
    try {
      // Prepare conversation history for context (last 10 messages)
      const conversationContext = chatHistory.slice(-10);
      
      // Use the AI service via Edge Function with conversation history
      const aiResponse = await sendMessageToAI(
        message, 
        userType || 'tourist',
        conversationContext
      );
      
      setChatHistory(prev => [
        ...prev, 
        {role: 'assistant', content: aiResponse}
      ]);
    } catch (error) {
      console.error("Error generating response:", error);
      toast.error("Yanıt oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
      setChatHistory(prev => [
        ...prev, 
        {role: 'assistant', content: "Üzgünüm, şu anda yanıt veremiyorum. Lütfen daha sonra tekrar deneyin."}
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
    handleSendMessage(question);
  };

  const handleFeedback = (messageIndex: number, isPositive: boolean) => {
    toast.success(isPositive ? "Teşekkürler! Geri bildiriminiz alındı." : "Geri bildiriminiz için teşekkürler. Daha iyi olmaya çalışacağız.");
    // Here you could send feedback to your backend if needed
  };

  const handleBusStopClick = (busStop: BusStop) => {
    setSelectedBusStop(busStop);
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Rezervasyon talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.");
    setShowReservationDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold flex items-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          <MessageSquare className="mr-2 h-6 w-6 text-blue-600" />
          KKTC Turizm Asistanı
        </h2>
      </div>
      
      <div className="rounded-xl overflow-hidden shadow-lg border border-blue-200">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <h3 className="font-medium text-lg">Turizm Sohbet Asistanı</h3>
          <p className="text-sm opacity-90">KKTC hakkında bilgi almak için sorularınızı sorun</p>
        </div>
        <ScrollArea className="h-[450px] p-4 bg-gray-50">
          <div className="space-y-4">
            {chatHistory.map((message, index) => (
              <div 
                key={index} 
                className={`flex gap-3 ${message.role === 'assistant' ? '' : ''} p-3 rounded-lg`}
              >
                <div className={`flex-shrink-0 w-10 h-10 ${message.role === 'assistant' ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-200'} rounded-full flex items-center justify-center shadow-md`}>
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div className={`${message.role === 'assistant' ? 'bg-white' : 'bg-blue-50'} p-4 rounded-xl shadow-md border ${message.role === 'assistant' ? 'border-blue-100' : 'border-gray-100'} flex-1`}>
                  <p className="text-sm text-gray-700">
                    {message.content}
                  </p>
                  {message.role === 'assistant' && index > 0 && (
                    <div className="flex items-center justify-end mt-2 gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 rounded-full hover:bg-blue-50"
                        onClick={() => handleFeedback(index, true)}
                      >
                        <ThumbsUp className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 rounded-full hover:bg-red-50"
                        onClick={() => handleFeedback(index, false)}
                      >
                        <ThumbsDown className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md border border-blue-100">
                  <p className="text-sm text-gray-500">Yanıt yazılıyor...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        {/* Suggested Questions */}
        {chatHistory.length < 3 && (
          <div className="p-4 border-t border-gray-100 bg-white">
            <p className="text-xs text-gray-500 mb-2 font-medium">Önerilen Sorular:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full transition-colors shadow-sm"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="border-t p-4 bg-white">
          <div className="flex gap-2">
            <Input 
              placeholder="KKTC hakkında bir soru sorun..." 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg"
            />
            <Button onClick={() => handleSendMessage()} disabled={isTyping} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg">
              {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* New transport and reservation cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {transportCards.map((card, index) => (
          <Card 
            key={index} 
            className="border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer bg-white rounded-xl" 
            onClick={card.action}
          >
            <CardContent className="p-5">
              <div className="flex items-center mb-2">
                <div className="p-2 rounded-full bg-blue-50 mr-2">
                  {card.icon}
                </div>
                <h3 className="font-medium text-blue-900">{card.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Topic cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {topicCards.map((card, index) => (
          <Card key={index} className="border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer bg-white rounded-xl" onClick={() => handleSuggestedQuestion(`${card.title} hakkında bilgi verir misin?`)}>
            <CardContent className="p-5">
              <div className="flex items-center mb-2">
                <div className="p-2 rounded-full bg-blue-50 mr-2">
                  {card.icon}
                </div>
                <h3 className="font-medium text-blue-900">{card.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bus Stop Information Dialog */}
      <Dialog open={!!selectedBusStop} onOpenChange={(open) => !open && setSelectedBusStop(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedBusStop?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <div>
              <h4 className="text-sm font-medium">Konum:</h4>
              <p className="text-sm text-gray-600">{selectedBusStop?.location}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Otobüs Hatları:</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedBusStop?.lines.map((line, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {line}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium">Hareket Saatleri:</h4>
              <ul className="text-sm text-gray-600 list-disc pl-5">
                {selectedBusStop?.departures.map((time, index) => (
                  <li key={index}>{time}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium">Olanaklar:</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedBusStop?.facilities.map((facility, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                    {facility}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Bus Stops Section */}
      <div className="mt-6 bg-white p-5 rounded-xl border border-blue-200">
        <div className="flex items-center mb-4">
          <Bus className="text-blue-600 w-5 h-5 mr-2" />
          <h3 className="font-semibold text-blue-900">Otobüs Durakları</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {busStops.map((stop, index) => (
            <Card 
              key={index} 
              className="border border-blue-100 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer"
              onClick={() => handleBusStopClick(stop)}
            >
              <CardContent className="p-4">
                <h4 className="font-medium text-blue-800">{stop.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{stop.location}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {stop.lines.slice(0, 2).map((line, i) => (
                    <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                      {line}
                    </span>
                  ))}
                  {stop.lines.length > 2 && (
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">
                      +{stop.lines.length - 2} daha
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* User Reviews Section */}
      <div className="mt-6 bg-white p-5 rounded-xl border border-blue-200">
        <div className="flex items-center mb-4">
          <Star className="text-yellow-500 w-5 h-5 mr-2" />
          <h3 className="font-semibold text-blue-900">Ziyaretçi Değerlendirmeleri</h3>
        </div>
        <div className="space-y-4">
          {userReviews.map((review, index) => (
            <div key={index} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                    {review.username.charAt(0)}
                  </div>
                  <div className="ml-2">
                    <p className="font-medium text-gray-900">{review.username}</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="ml-2 text-xs text-gray-500">{review.date}</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Reservation Dialog */}
      <Dialog open={showReservationDialog} onOpenChange={setShowReservationDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Rezervasyon Yapın</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="tour" onValueChange={setReservationType}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="tour">Tur</TabsTrigger>
              <TabsTrigger value="hotel">Otel</TabsTrigger>
              <TabsTrigger value="car">Araç</TabsTrigger>
              <TabsTrigger value="restaurant">Restoran</TabsTrigger>
            </TabsList>
            <form onSubmit={handleReservationSubmit} className="mt-4 space-y-4">
              <TabsContent value="tour" className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Tur Adı</label>
                  <Input placeholder="Girne Kalesi Turu" />
                </div>
                <div>
                  <label className="text-sm font-medium">Tarih</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="text-sm font-medium">Kişi Sayısı</label>
                  <Input type="number" min="1" defaultValue="2" />
                </div>
              </TabsContent>
              <TabsContent value="hotel" className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Otel</label>
                  <Input placeholder="Merit Crystal Cove" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium">Giriş Tarihi</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Çıkış Tarihi</label>
                    <Input type="date" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Oda Sayısı</label>
                  <Input type="number" min="1" defaultValue="1" />
                </div>
              </TabsContent>
              <TabsContent value="car" className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Araç Tipi</label>
                  <Input placeholder="Ekonomik" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium">Alış Tarihi</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">İade Tarihi</label>
                    <Input type="date" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Alış Yeri</label>
                  <Input placeholder="Ercan Havalimanı" />
                </div>
              </TabsContent>
              <TabsContent value="restaurant" className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Restoran</label>
                  <Input placeholder="Niazi's Restaurant" />
                </div>
                <div>
                  <label className="text-sm font-medium">Tarih</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="text-sm font-medium">Saat</label>
                  <Input type="time" defaultValue="19:30" />
                </div>
                <div>
                  <label className="text-sm font-medium">Kişi Sayısı</label>
                  <Input type="number" min="1" defaultValue="2" />
                </div>
              </TabsContent>
              <div>
                <label className="text-sm font-medium">İletişim Bilgileriniz</label>
                <Input placeholder="E-posta veya telefon numarası" className="mb-2" />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Rezervasyon Talebi Gönder
              </Button>
            </form>
          </Tabs>
        </DialogContent>
      </Dialog>

      <div className="bg-blue-50 p-5 rounded-xl border border-blue-200 mt-6 flex items-start">
        <Info className="text-blue-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
        <div>
          <h4 className="font-medium text-blue-700">Kullanım İpucu</h4>
          <p className="text-sm text-blue-600 mt-1">
            KKTC Turizm Asistanı, adanın tarihi, kültürel zenginlikleri, plajları, yemekleri ve daha birçok konuda size yardımcı olabilir. Sorularınızı Türkçe olarak sorabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TravelChat;
