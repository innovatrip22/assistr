
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, Phone, Video, User, Clock, Circle } from "lucide-react";

// Mock data for chat contacts
const mockContacts = [
  { 
    id: "1", 
    name: "Ahmet Yılmaz", 
    lastMessage: "Merhaba, odamla ilgili bir sorum var...", 
    time: "10:23", 
    status: "online" as const,
    avatar: "/assets/avatar1.jpg",
    unread: 2
  },
  { 
    id: "2", 
    name: "Ayşe Kaya", 
    lastMessage: "Rezervasyon yaptırmak istiyorum.", 
    time: "Dün", 
    status: "offline" as const,
    avatar: "/assets/avatar2.jpg",
    unread: 0
  },
  { 
    id: "3", 
    name: "Mehmet Şahin", 
    lastMessage: "Teşekkür ederim, iyi günler!", 
    time: "Dün", 
    status: "offline" as const,
    avatar: "/assets/avatar3.jpg",
    unread: 0
  },
  { 
    id: "4", 
    name: "Zeynep Türk", 
    lastMessage: "KKTC'ye ilk kez geliyorum ve...", 
    time: "21/07", 
    status: "online" as const,
    avatar: "/assets/avatar4.jpg",
    unread: 0
  }
];

// Mock messages for a conversation
const mockMessages = [
  {
    id: "1",
    sender: "customer" as const,
    message: "Merhaba, KKTC'ye ilk kez geliyorum ve işletmenizde konaklayacağım. Havaalanından işletmenize ulaşım konusunda bilgi alabilir miyim?",
    time: "10:15"
  },
  {
    id: "2",
    sender: "business" as const,
    message: "Merhaba, bizi tercih ettiğiniz için teşekkür ederiz! Ercan Havalimanı'ndan işletmemize ulaşmak için taksi veya havaalanı servisi kullanabilirsiniz. Yaklaşık 45 dakikalık bir yolculuk olacaktır.",
    time: "10:18"
  },
  {
    id: "3",
    sender: "customer" as const,
    message: "Havaalanı servisi rezervasyonu yapmam gerekiyor mu?",
    time: "10:20"
  },
  {
    id: "4",
    sender: "business" as const,
    message: "Evet, servis için rezervasyon yapmanız gerekiyor. Rezervasyon bilgilerinizi bizimle paylaşırsanız sizin için servis ayarlayabiliriz.",
    time: "10:22"
  },
  {
    id: "5",
    sender: "customer" as const,
    message: "Harika, teşekkür ederim! Uçuşum yarın saat 14:00'te Ercan Havalimanı'na iniş yapacak.",
    time: "10:23"
  }
];

interface Contact {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  status: "online" | "offline";
  avatar: string;
  unread: number;
}

interface Message {
  id: string;
  sender: "customer" | "business";
  message: string;
  time: string;
}

const BusinessLiveChat = () => {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedContact) {
      // Load conversation for selected contact
      // This would normally fetch from an API
      setMessages(mockMessages);
      
      // Mark messages as read
      setContacts(contacts.map(contact => 
        contact.id === selectedContact.id 
        ? { ...contact, unread: 0 } 
        : contact
      ));
    }
  }, [selectedContact]);

  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedContact) {
      const newMsg: Message = {
        id: Date.now().toString(),
        sender: "business",
        message: newMessage.trim(),
        time: new Date().toTimeString().split(' ')[0].slice(0, 5)
      };
      
      setMessages([...messages, newMsg]);
      setNewMessage("");
      
      // Update last message in contacts
      setContacts(contacts.map(contact => 
        contact.id === selectedContact.id 
        ? { 
            ...contact, 
            lastMessage: newMessage.trim(),
            time: "Şimdi" 
          } 
        : contact
      ));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
      {/* Contacts List */}
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Canlı Destek
          </CardTitle>
          <CardDescription>
            Müşterilerinizle sohbet edin
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[480px]">
            <div className="p-2">
              {contacts.map((contact) => (
                <div 
                  key={contact.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedContact?.id === contact.id ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback>
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                        contact.status === 'online' ? 'bg-green-500' : 'bg-gray-300'
                      }`}></span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-sm">{contact.name}</h3>
                        <span className="text-xs text-gray-500">{contact.time}</span>
                      </div>
                      <p className="text-sm text-gray-500 truncate mt-1">{contact.lastMessage}</p>
                    </div>
                    {contact.unread > 0 && (
                      <Badge className="ml-auto bg-primary">{contact.unread}</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="md:col-span-2">
        {selectedContact ? (
          <>
            <CardHeader className="border-b py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {selectedContact.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{selectedContact.name}</CardTitle>
                    <div className="flex items-center mt-1">
                      <Circle className={`h-2 w-2 mr-1 ${
                        selectedContact.status === 'online' ? 'text-green-500 fill-green-500' : 'text-gray-300 fill-gray-300'
                      }`} />
                      <CardDescription className="text-xs">
                        {selectedContact.status === 'online' ? 'Çevrimiçi' : 'Çevrimdışı'}
                      </CardDescription>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <User className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px]">
                <div className="flex flex-col gap-3 p-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'business' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === 'business'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <div className={`flex items-center justify-end mt-1 text-xs ${
                          message.sender === 'business' ? 'text-primary-foreground/70' : 'text-gray-500'
                        }`}>
                          <Clock className="h-3 w-3 mr-1" />
                          {message.time}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="border-t p-4">
              <div className="flex items-center w-full gap-2">
                <Input
                  placeholder="Mesajınızı yazın..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <MessageSquare className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700">Canlı Destek</h3>
            <p className="text-gray-500 mt-2">
              Sohbet etmek için soldaki listeden bir kişi seçin.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default BusinessLiveChat;
