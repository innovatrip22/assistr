import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Send, Loader2, Bell } from "lucide-react";
import { toast } from "sonner";
import { 
  addFeedback, 
  getFeedbacks,
  sendMessageToAI,
  saveChatHistory,
  getChatHistory
} from "@/services/dataService";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";

const FeedbackAssistant = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: string, content: string}[]>([
    {role: 'assistant', content: 'Merhaba! Size nasıl yardımcı olabilirim? Görüş veya şikayetlerinizi iletebilirsiniz.'}
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [formData, setFormData] = useState({
    institution: "Turizm Ofisi",
    subject: "",
    complaint: ""
  });
  const [myFeedbacks, setMyFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, userType } = useAuth();

  useEffect(() => {
    if (user) {
      loadFeedbacks();
      loadChatHistory();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadFeedbacks = async () => {
    try {
      const feedbacks = await getFeedbacks(user?.id);
      setMyFeedbacks(feedbacks);
    } catch (error) {
      console.error("Error loading feedbacks:", error);
      toast.error("Geri bildirimler yüklenirken hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const loadChatHistory = async () => {
    try {
      if (user?.id) {
        const history = await getChatHistory(user.id);
        
        if (history.length > 0) {
          const formattedHistory = history.flatMap(entry => [
            { role: "user", content: entry.message },
            { role: "assistant", content: entry.response }
          ]).reverse();
          
          setChatHistory([
            { role: 'assistant', content: 'Merhaba! Size nasıl yardımcı olabilirim? Görüş veya şikayetlerinizi iletebilirsiniz.' },
            ...formattedHistory
          ]);
        }
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
    }
  };

  const generateResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    try {
      // OpenAI API üzerinden gerçek bir yanıt al
      const aiResponse = await sendMessageToAI(userMessage, userType || 'tourist');
      
      // Chat geçmişini kaydet
      if (user) {
        await saveChatHistory(user.id, userMessage, aiResponse);
      }
      
      setChatHistory(prev => [...prev, {role: 'assistant', content: aiResponse}]);
    } catch (error: any) {
      console.error("Error generating response:", error);
      toast.error("Yanıt oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
      setChatHistory(prev => [...prev, {role: 'assistant', content: "Üzgünüm, şu anda yanıt veremiyorum. Lütfen daha sonra tekrar deneyin."}]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const userMessage = {role: 'user', content: message};
    setChatHistory(prev => [...prev, userMessage]);
    setMessage("");
    
    generateResponse(userMessage.content);
  };

  const handleSubmitComplaint = async () => {
    if (!formData.subject.trim() || !formData.complaint.trim()) {
      toast.error("Lütfen tüm alanları doldurun");
      return;
    }
    
    if (!user) {
      toast.error("Lütfen önce giriş yapın");
      return;
    }
    
    try {
      // Gerçek veritabanına geri bildirim kaydet
      const feedback = await addFeedback({
        type: 'complaint',
        message: formData.complaint,
        institution: formData.institution,
        subject: formData.subject,
        user_id: user.id
      });
      
      // Add the new feedback to the list
      setMyFeedbacks(prev => [feedback, ...prev]);
      
      toast.success("Şikayetiniz alındı. En kısa sürede size dönüş yapılacaktır.");
      setFormData({
        institution: "Turizm Ofisi",
        subject: "",
        complaint: ""
      });
    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast.error("Şikayet gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  if (loading && user) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">Görüş Asistanı</h2>
      </div>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="chat" className="w-full">
            Chatbot
          </TabsTrigger>
          <TabsTrigger value="complaint" className="w-full">
            Şikayet Formu
          </TabsTrigger>
          <TabsTrigger value="my-feedbacks" className="w-full">
            Bildirimlerim
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat">
          <div className="space-y-4">
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {chatHistory.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex gap-3 ${message.role === 'assistant' ? 'bg-accent' : 'bg-gray-50'} p-4 rounded-lg`}
                  >
                    <div className={`flex-shrink-0 w-8 h-8 ${message.role === 'assistant' ? 'bg-primary' : 'bg-gray-300'} rounded-full flex items-center justify-center`}>
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3 bg-accent p-4 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Yanıt yazılıyor...</p>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <div className="flex gap-2">
              <Input
                placeholder="Mesajınızı yazın..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} disabled={isTyping}>
                {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="complaint">
          <div className="space-y-4">
            <div className="grid gap-4">
              <div>
                <p className="text-sm font-medium mb-2">Şikayet Edilecek Kurum</p>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={formData.institution}
                  onChange={(e) => setFormData({...formData, institution: e.target.value})}
                >
                  <option>Turizm Ofisi</option>
                  <option>Belediye</option>
                  <option>Emniyet Müdürlüğü</option>
                  <option>Tüketici Hakları</option>
                </select>
              </div>
              <Input 
                placeholder="Konu" 
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              />
              <textarea
                className="w-full p-2 border rounded-md h-32"
                placeholder="Şikayetinizi detaylı bir şekilde açıklayın..."
                value={formData.complaint}
                onChange={(e) => setFormData({...formData, complaint: e.target.value})}
              />
              <Button onClick={handleSubmitComplaint}>Şikayet Gönder</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="my-feedbacks">
          <ScrollArea className="h-[300px] pr-4">
            {myFeedbacks.length > 0 ? (
              <div className="space-y-4">
                {myFeedbacks.map((feedback, index) => (
                  <div 
                    key={index} 
                    className="border rounded-lg p-4"
                  >
                    <div className="flex justify-between mb-2">
                      <div>
                        <p className="font-medium">
                          {feedback.type === 'complaint' ? feedback.subject || 'Şikayet' : 'Chatbot Mesajı'}
                        </p>
                        {feedback.institution && (
                          <p className="text-xs text-gray-500">{feedback.institution}</p>
                        )}
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs ${feedback.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                        {feedback.status === 'pending' ? 'Beklemede' : 'İşlendi'}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{feedback.message}</p>
                    
                    {feedback.response && (
                      <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                        <div className="flex items-center gap-1 mb-1">
                          <Bell className="w-4 h-4 text-blue-500" />
                          <p className="text-sm font-medium text-blue-800">Yanıt:</p>
                        </div>
                        <p className="text-sm text-gray-600">{feedback.response}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Henüz gönderilen bildiriminiz bulunmuyor</p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeedbackAssistant;
