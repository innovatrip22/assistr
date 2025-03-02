
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

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

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = {role: 'user', content: inputMessage} as ChatMessage;
    setChatHistory(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);
    
    try {
      const antalyaTopics = {
        'plaj': [
          "Antalya'da en popüler plajlar Konyaaltı, Lara ve Kaputaş plajlarıdır. Konyaaltı şehir merkezine en yakın olanıdır ve 7 km uzunluğundadır.",
          "Lara Plajı, Antalya'nın doğusunda yer alan geniş ve kumlu bir plajdır. Birçok lüks otel bu bölgede bulunur.",
          "Kaputaş Plajı Antalya'nın en güzel plajlarından biridir. Kaş yakınlarında yer alır ve turkuaz rengi deniziyle ünlüdür."
        ],
        'müze': [
          "Antalya Müzesi, Türkiye'nin en büyük müzelerinden biridir ve Roma, Bizans, Selçuklu dönemlerine ait eserler sergiler.",
          "Kaleiçi'ndeki Suna-İnan Kıraç Müzesi, geleneksel Antalya evlerini ve yaşam tarzını sergileyen bir etnografya müzesidir.",
          "Side Müzesi, antik Side kentinde bulunan ve Roma dönemine ait heykellerin sergilendiği önemli bir müzedir."
        ],
        'tarihi': [
          "Antalya'daki Perge Antik Kenti, Helenistik ve Roma dönemlerine ait kalıntılarıyla ünlüdür. Stadyumu ve tiyatrosu görülmeye değer.",
          "Aspendos Antik Tiyatrosu, dünyanın en iyi korunmuş Roma tiyatrolarından biridir ve hala etkinlikler için kullanılabilmektedir.",
          "Phaselis Antik Kenti, üç ayrı limana sahip, ormanla çevrili, deniz kenarında yer alan etkileyici bir arkeolojik alandır."
        ],
        'yemek': [
          "Antalya mutfağında piyaz (kuru fasulye salatası), şiş köfte ve tandır kebabı öne çıkan lezzetlerdir.",
          "Deniz kenarındaki restoranlarda taze balık çeşitleri, özellikle levrek ve çipura tadabilirsiniz.",
          "Kaleiçi'nde yer alan geleneksel restoranlarda Akdeniz mutfağının tüm lezzetlerini bulabilirsiniz."
        ],
        'hava': [
          "Antalya'da Akdeniz iklimi hakimdir. Yazlar sıcak ve kurak (30-40°C), kışlar ılık ve yağışlı (10-15°C) geçer.",
          "Antalya yılda ortalama 300 gün güneşli gün sayısıyla Türkiye'nin en çok güneş alan şehirlerinden biridir.",
          "En ideal ziyaret zamanı Nisan-Mayıs ve Eylül-Ekim aylarıdır, bu dönemlerde hava ne çok sıcak ne de soğuktur."
        ],
        'ulaşım': [
          "Antalya şehir içi ulaşımda tramvay, otobüs ve dolmuşlar yaygın olarak kullanılır. Tramvay özellikle turistik bölgeleri kapsar.",
          "Havalimanından şehir merkezine ulaşım için HAVAŞ servisleri veya taksiler kullanılabilir.",
          "Antalya'dan çevre ilçelere ulaşım için düzenli otobüs seferleri mevcuttur."
        ],
        'alışveriş': [
          "Kaleiçi'nde geleneksel el sanatları, halılar ve hediyelik eşyalar satın alabilirsiniz.",
          "MarkAntalya ve TerraCity, şehirdeki modern alışveriş merkezleridir.",
          "Antalya'da her mahallede açık pazar kurulur, taze meyve ve sebzeler uygun fiyata bulunabilir."
        ]
      };

      let aiResponse;
      let matchFound = false;
      
      for (const [topic, responses] of Object.entries(antalyaTopics)) {
        if (inputMessage.toLowerCase().includes(topic)) {
          aiResponse = responses[Math.floor(Math.random() * responses.length)];
          matchFound = true;
          break;
        }
      }
      
      if (!matchFound) {
        const generalResponses = [
          "Antalya, Türkiye'nin güneyinde, Akdeniz kıyısında yer alan turistik bir şehirdir. Tarihi kalıntıları, plajları ve doğal güzellikleriyle ünlüdür.",
          "Antalya'da gezebileceğiniz yerler arasında Kaleiçi, Düden Şelalesi, Perge, Aspendos ve Phaselis bulunmaktadır.",
          "Antalya'nın farklı bölgeleri hakkında daha spesifik bilgi isterseniz sorabilirsiniz. Plajlar, tarihi yerler, müzeler veya yeme-içme mekanları hakkında yardımcı olabilirim.",
          "Antalya gezi planınız için size özel bir rota oluşturabilirim. Kaç gün kalacağınızı ve ilgi alanlarınızı belirtirseniz yardımcı olabilirim."
        ];
        
        aiResponse = generalResponses[Math.floor(Math.random() * generalResponses.length)];
      }
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setChatHistory(prev => [...prev, {role: 'assistant', content: aiResponse}]);
    } catch (error) {
      console.error("Error generating response:", error);
      toast.error("Yanıt oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
      setChatHistory(prev => [...prev, {role: 'assistant', content: "Üzgünüm, şu anda yanıt veremiyorum. Lütfen daha sonra tekrar deneyin."}]);
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
