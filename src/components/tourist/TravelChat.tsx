
import { useState } from "react";
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
    {role: 'assistant', content: 'Merhaba! Antalya hakkında sorularınızı yanıtlamaya hazırım. Size nasıl yardımcı olabilirim?'}
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { userType } = useAuth();

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = {role: 'user', content: inputMessage} as ChatMessage;
    setChatHistory(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);
    
    try {
      // Use the AI service via Edge Function
      const aiResponse = await sendMessageToAI(inputMessage, userType || 'tourist');
      
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
          placeholder="Antalya hakkında bir soru sorun..." 
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button onClick={handleSendMessage} disabled={isTyping}>
          {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
};

export default TravelChat;
