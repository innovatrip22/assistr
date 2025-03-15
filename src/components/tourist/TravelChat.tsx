
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Send, Loader2, Info, ThumbsUp, ThumbsDown } from "lucide-react";
import { toast } from "sonner";
import { sendMessageToAI } from "@/services";
import { useAuth } from "@/hooks/useAuth";

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const TravelChat = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {role: 'assistant', content: 'Merhaba! KKTC hakkında sorularınızı yanıtlamaya hazırım. Size nasıl yardımcı olabilirim?'}
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { userType } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
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
