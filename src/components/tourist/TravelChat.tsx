
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, Loader2 } from "lucide-react";
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

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = {role: 'user', content: inputMessage} as ChatMessage;
    setChatHistory(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);
    
    try {
      // Prepare conversation history for context (last 10 messages)
      const conversationContext = chatHistory.slice(-10);
      
      // Use the AI service via Edge Function with conversation history
      const aiResponse = await sendMessageToAI(
        inputMessage, 
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold flex items-center">
          <MessageSquare className="mr-2 h-6 w-6" />
          KKTC Turizm Asistanı
        </h2>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <ScrollArea className="h-[400px] p-4">
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
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input 
              placeholder="KKTC hakkında bir soru sorun..." 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={isTyping}>
              {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg bg-accent/30">
          <h3 className="font-medium mb-2">Gezilecek Yerler</h3>
          <p className="text-sm text-muted-foreground">Asistana KKTC'deki popüler turistik yerler hakkında sorular sorabilirsiniz.</p>
        </div>
        <div className="p-4 border rounded-lg bg-accent/30">
          <h3 className="font-medium mb-2">Ulaşım</h3>
          <p className="text-sm text-muted-foreground">KKTC içindeki ulaşım seçenekleri ve tavsiyeler için asistana danışabilirsiniz.</p>
        </div>
        <div className="p-4 border rounded-lg bg-accent/30">
          <h3 className="font-medium mb-2">Yerel Yemekler</h3>
          <p className="text-sm text-muted-foreground">KKTC'nin meşhur yemekleri ve en iyi restoranları hakkında bilgi alabilirsiniz.</p>
        </div>
      </div>
    </div>
  );
};

export default TravelChat;
