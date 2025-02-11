
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FeedbackAssistant = () => {
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (message.trim()) {
      toast({
        title: "Şikayet Alındı",
        description: "En kısa sürede size dönüş yapılacaktır.",
      });
      setMessage("");
    }
  };

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
        </TabsList>

        <TabsContent value="chat">
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Merhaba! Size nasıl yardımcı olabilirim?
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Mesajınızı yazın..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button onClick={handleSubmit}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-500 text-center">
              Chatbot desteği yakında hizmetinizde olacak.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="complaint">
          <div className="space-y-4">
            <div className="grid gap-4">
              <div>
                <p className="text-sm font-medium mb-2">Şikayet Edilecek Kurum</p>
                <select className="w-full p-2 border rounded-md">
                  <option>Turizm Ofisi</option>
                  <option>Belediye</option>
                  <option>Emniyet Müdürlüğü</option>
                  <option>Tüketici Hakları</option>
                </select>
              </div>
              <Input placeholder="Konu" />
              <textarea
                className="w-full p-2 border rounded-md h-32"
                placeholder="Şikayetinizi detaylı bir şekilde açıklayın..."
              />
              <Button onClick={handleSubmit}>Şikayet Gönder</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeedbackAssistant;
