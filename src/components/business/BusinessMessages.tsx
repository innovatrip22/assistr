
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Search, Clock, Send } from "lucide-react";

const mockMessages = [
  {
    id: 1,
    sender: "John Doe",
    content: "Merhaba, restoranda özel bir etkinlik düzenlemek istiyoruz. 15 kişi olacağız. Yarın akşam 19:00 için uygun musunuz?",
    time: "2 saat önce",
    isRead: true,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    sender: "Maria Garcia",
    content: "Vejetaryen menünüz var mı? Yarın ziyaret etmeyi düşünüyoruz.",
    time: "5 saat önce",
    isRead: false,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    sender: "Alex Johnson",
    content: "Plaj havlusu kiralama hizmetiniz var mı? Fiyat nedir?",
    time: "Dün",
    isRead: true,
    avatar: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    id: 4,
    sender: "Emma Wilson",
    content: "Odamız için geç çıkış mümkün mü? Uçuşumuz akşam 19:00'da.",
    time: "2 gün önce",
    isRead: true,
    avatar: "https://randomuser.me/api/portraits/women/26.jpg"
  },
];

const BusinessMessages = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState<typeof mockMessages[0] | null>(null);
  const [replyText, setReplyText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleMessageSelect = (message: typeof mockMessages[0]) => {
    setSelectedMessage(message);
    // Mark as read if it wasn't
    if (!message.isRead) {
      setMessages(messages.map(msg => 
        msg.id === message.id ? { ...msg, isRead: true } : msg
      ));
    }
  };

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedMessage) return;
    
    // In a real app, this would send the reply to the backend
    alert(`Yanıt gönderildi: ${replyText}`);
    setReplyText("");
  };

  const filteredMessages = messages.filter(message => 
    message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Mesajlar</CardTitle>
          <CardDescription>Müşterilerinizden gelen mesajlar</CardDescription>
          <div className="relative mt-2">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Mesajlarda ara..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredMessages.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">Mesaj bulunamadı</p>
            ) : (
              filteredMessages.map(message => (
                <div 
                  key={message.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedMessage?.id === message.id 
                      ? 'bg-primary/10' 
                      : 'hover:bg-muted'
                  } ${!message.isRead ? 'border-l-4 border-primary' : ''}`}
                  onClick={() => handleMessageSelect(message)}
                >
                  <div className="flex gap-3">
                    <img 
                      src={message.avatar} 
                      alt={message.sender} 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 overflow-hidden">
                      <div className="flex justify-between items-center">
                        <h3 className={`font-medium ${!message.isRead ? 'text-primary' : ''}`}>
                          {message.sender}
                        </h3>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {message.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        {selectedMessage ? (
          <>
            <CardHeader>
              <div className="flex items-center gap-3">
                <img 
                  src={selectedMessage.avatar} 
                  alt={selectedMessage.sender} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <CardTitle>{selectedMessage.sender}</CardTitle>
                  <CardDescription className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {selectedMessage.time}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <p>{selectedMessage.content}</p>
              </div>
              
              <div className="pt-4">
                <h3 className="text-sm font-medium mb-2">Yanıtla</h3>
                <div className="space-y-2">
                  <Textarea 
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    placeholder="Mesajı yanıtlayın..."
                    rows={4}
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleSendReply} disabled={!replyText.trim()}>
                      <Send className="h-4 w-4 mr-2" />
                      Gönder
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </>
        ) : (
          <div className="h-full flex items-center justify-center p-6">
            <div className="text-center">
              <p className="text-muted-foreground">Görüntülemek için bir mesaj seçin</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default BusinessMessages;
