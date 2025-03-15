
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageSquare, 
  X, 
  ChevronDown, 
  Send, 
  Loader2 
} from "lucide-react";
import { sendMessageToAI } from "@/services";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {role: 'assistant', content: 'Merhaba! KKTC seyahatiniz hakkında size nasıl yardımcı olabilirim?'}
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { userType } = useAuth();

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const minimizeChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(true);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = {role: 'user', content: inputMessage} as ChatMessage;
    setChatHistory(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);
    
    try {
      // Prepare conversation history for context (last 5 messages)
      const conversationContext = chatHistory.slice(-5);
      
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

  if (!isOpen) {
    return (
      <Button 
        onClick={toggleChat}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50"
        size="icon"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    );
  }

  if (isMinimized) {
    return (
      <div 
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-primary text-white rounded-full px-4 py-2 shadow-lg z-50 flex items-center cursor-pointer"
      >
        <MessageSquare className="h-5 w-5 mr-2" />
        <span className="font-medium">Sohbeti Aç</span>
      </div>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 sm:w-96 shadow-xl z-50 overflow-hidden flex flex-col" style={{ height: '450px' }}>
      {/* Chat Header */}
      <div className="bg-primary text-white p-3 flex justify-between items-center">
        <h3 className="font-medium flex items-center">
          <MessageSquare className="h-5 w-5 mr-2" />
          Turizm Asistanı
        </h3>
        <div className="flex items-center">
          <button 
            onClick={minimizeChat}
            className="text-white p-1 hover:bg-primary-foreground/20 rounded-sm mr-1"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
          <button 
            onClick={toggleChat}
            className="text-white p-1 hover:bg-primary-foreground/20 rounded-sm"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-3 bg-accent/20">
        <div className="space-y-3">
          {chatHistory.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`rounded-lg px-3 py-2 max-w-[80%] ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-lg px-3 py-2 bg-muted flex items-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <p className="text-sm">Yazıyor...</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      {/* Chat Input */}
      <div className="p-3 border-t">
        <div className="flex gap-2">
          <Input 
            placeholder="Bir soru sorun..." 
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button 
            size="icon" 
            onClick={handleSendMessage}
            disabled={isTyping || !inputMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatbotButton;
