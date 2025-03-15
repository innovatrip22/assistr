
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

  // Önerilen sorular
  const suggestedQuestions = [
    "KKTC'de en güzel plajlar nerede?",
    "Kıbrıs'ın meşhur yemekleri nelerdir?",
    "Girne'de gezilecek yerler",
    "KKTC'de ulaşım nasıl sağlanır?",
    "KKTC'de hava durumu nasıl?",
    "Para birimi nedir?"
  ];

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

  const handleSendMessage = async (message = inputMessage) => {
    if (!message.trim()) return;
    
    const userMessage = {role: 'user', content: message} as ChatMessage;
    setChatHistory(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);
    
    try {
      // Prepare conversation history for context (last 5 messages)
      const conversationContext = chatHistory.slice(-5);
      
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

  if (!isOpen) {
    return (
      <Button 
        onClick={toggleChat}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        size="icon"
      >
        <MessageSquare className="h-6 w-6 text-white" />
      </Button>
    );
  }

  if (isMinimized) {
    return (
      <div 
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-4 py-2 shadow-lg z-50 flex items-center cursor-pointer hover:from-blue-700 hover:to-purple-700 transition-all"
      >
        <MessageSquare className="h-5 w-5 mr-2" />
        <span className="font-medium">Sohbeti Aç</span>
      </div>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 sm:w-96 shadow-xl z-50 overflow-hidden flex flex-col rounded-lg border-0" style={{ height: '500px' }}>
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 flex justify-between items-center">
        <h3 className="font-medium flex items-center">
          <MessageSquare className="h-5 w-5 mr-2" />
          KKTC Turizm Asistanı
        </h3>
        <div className="flex items-center">
          <button 
            onClick={minimizeChat}
            className="text-white p-1 hover:bg-white/10 rounded-sm mr-1 transition-colors"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
          <button 
            onClick={toggleChat}
            className="text-white p-1 hover:bg-white/10 rounded-sm transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-3 bg-gray-50">
        <div className="space-y-4">
          {chatHistory.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`rounded-lg px-3 py-2 max-w-[80%] shadow-sm ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                    : 'bg-white border border-gray-200'
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-lg px-3 py-2 bg-white border border-gray-200 shadow-sm flex items-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2 text-blue-600" />
                <p className="text-sm">Yazıyor...</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      {/* Suggested Questions */}
      {chatHistory.length < 3 && (
        <div className="p-3 border-t">
          <p className="text-xs text-gray-500 mb-2">Önerilen Sorular:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestion(question)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-1 rounded-full transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Chat Input */}
      <div className="p-3 border-t bg-white">
        <div className="flex gap-2">
          <Input 
            placeholder="Bir soru sorun..." 
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
          <Button 
            size="icon" 
            onClick={() => handleSendMessage()}
            disabled={isTyping || !inputMessage.trim()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatbotButton;
