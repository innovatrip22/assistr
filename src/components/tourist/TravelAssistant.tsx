
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, MessageSquare, Navigation, Send, Calendar as CalendarIcon, Clock, Landmark, Coffee, Utensils, Bus, Camera } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

const TravelAssistant = () => {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [nearbyPlaces, setNearbyPlaces] = useState([
    {
      name: "Antalya Havalimanı",
      distance: "12.5 km",
      duration: "20 dakika",
    },
    {
      name: "Kaleiçi",
      distance: "2.3 km",
      duration: "8 dakika",
    },
    {
      name: "Konyaaltı Plajı",
      distance: "5.1 km",
      duration: "15 dakika",
    },
  ]);

  const [planDate, setPlanDate] = useState<Date | undefined>(new Date());
  const [duration, setDuration] = useState("1");
  const [interests, setInterests] = useState<string[]>([]);
  const [chatHistory, setChatHistory] = useState<{role: string, content: string}[]>([
    {role: 'assistant', content: 'Merhaba! Size nasıl yardımcı olabilirim?'}
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [planGenerated, setPlanGenerated] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  const handleGetDirections = (place: string) => {
    if (userLocation) {
      window.open(
        `https://www.google.com/maps/dir/${userLocation.latitude},${userLocation.longitude}/${encodeURIComponent(
          place + " Antalya"
        )}`,
        "_blank"
      );
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const newMessage = {role: 'user', content: inputMessage};
    setChatHistory(prev => [...prev, newMessage]);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const responses = [
        "Antalya'da Kaleiçi ve Konyaaltı Plajı'nı kesinlikle görmelisiniz.",
        "Düden Şelalesi'ni ziyaret etmenizi öneririm, şehir merkezine çok yakın.",
        "Yanınıza güneş kremi ve şapka almayı unutmayın, Antalya'da hava çok sıcak olabilir.",
        "Aspendos Antik Tiyatrosu, antik dönemin en iyi korunmuş yapılarından biridir.",
        "Akşam yemeği için Kaleiçi'ndeki balık restoranlarını deneyebilirsiniz."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatHistory(prev => [...prev, {role: 'assistant', content: randomResponse}]);
    }, 1000);
    
    setInputMessage("");
  };

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
      ? prev.filter(i => i !== interest) 
      : [...prev, interest]
    );
  };

  const generateTravelPlan = () => {
    setIsGenerating(true);
    
    // Simulate plan generation
    setTimeout(() => {
      const days = parseInt(duration);
      const plan = {
        title: `${days} Günlük Antalya Gezi Planı`,
        date: planDate ? format(planDate, 'dd MMMM yyyy', {locale: tr}) : '',
        interests: interests,
        days: Array.from({length: days}, (_, index) => ({
          day: index + 1,
          activities: [
            {
              time: '09:00',
              activity: index === 0 ? 'Kaleiçi Turu' : index === 1 ? 'Aspendos Antik Tiyatrosu' : 'Olympos Antik Kenti',
              description: index === 0 
                ? 'Antalya\'nın tarihi merkezi Kaleiçi\'nde yürüyüş turu. Hadrian Kapısı, Yivli Minare ve tarihi sokaklar.' 
                : index === 1 
                ? 'Dünyanın en iyi korunmuş antik tiyatrolarından biri olan Aspendos\'u ziyaret.' 
                : 'Eşsiz doğası ve tarihi kalıntılarıyla ünlü Olympos Antik Kenti\'ni ziyaret.'
            },
            {
              time: '12:30',
              activity: 'Öğle Yemeği',
              description: index === 0 
                ? 'Kaleiçi\'ndeki otantik bir restoranda yerel lezzetler.' 
                : index === 1 
                ? 'Aspendos çevresindeki yerel bir restoranda öğle yemeği.' 
                : 'Olympos bölgesindeki bir sahil restoranında balık keyfi.'
            },
            {
              time: '14:00',
              activity: index === 0 ? 'Antalya Müzesi' : index === 1 ? 'Düden Şelalesi' : 'Konyaaltı Plajı',
              description: index === 0 
                ? 'Antalya\'nın zengin tarihini anlatan arkeoloji müzesini ziyaret.' 
                : index === 1 
                ? 'Muhteşem Düden Şelalesi\'nde doğa yürüyüşü ve fotoğraf çekimi.' 
                : 'Antalya\'nın ünlü Konyaaltı Plajı\'nda deniz ve güneş keyfi.'
            },
            {
              time: '17:00',
              activity: index === 0 ? 'Liman Bölgesi' : index === 1 ? 'Perge Antik Kenti' : 'Old Town Tekne Turu',
              description: index === 0 
                ? 'Antalya Marina ve çevresinde keyifli bir yürüyüş ve alışveriş.' 
                : index === 1 
                ? 'Helenistik dönemden kalma etkileyici Perge Antik Kenti ziyareti.' 
                : 'Tekne ile Antalya kıyılarında günbatımı turu.'
            },
            {
              time: '20:00',
              activity: 'Akşam Yemeği',
              description: index === 0 
                ? 'Liman bölgesinde deniz manzaralı bir restoranda akşam yemeği.' 
                : index === 1 
                ? 'Şehir merkezinde yerel bir restoranda Akdeniz mutfağının lezzetleri.' 
                : 'Balık restoranında taze deniz ürünleri ziyafeti.'
            }
          ]
        }))
      };
      
      setGeneratedPlan(plan);
      setPlanGenerated(true);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Map className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">Gezi Asistanı</h2>
      </div>

      <Tabs defaultValue="planner" className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="planner" className="w-full">
            Gezi Planlayıcı
          </TabsTrigger>
          <TabsTrigger value="nearby" className="w-full">
            Yakındaki Yerler
          </TabsTrigger>
          <TabsTrigger value="chat" className="w-full">
            Sohbet
          </TabsTrigger>
        </TabsList>

        <TabsContent value="planner">
          <div className="space-y-4">
            {!planGenerated ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tarih Seçin</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {planDate ? format(planDate, 'PPP', { locale: tr }) : 'Tarih seçin'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={planDate}
                            onSelect={setPlanDate}
                            locale={tr}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Gezi Süresi (Gün)</label>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      >
                        <option value="1">1 Gün</option>
                        <option value="2">2 Gün</option>
                        <option value="3">3 Gün</option>
                        <option value="4">4 Gün</option>
                        <option value="5">5 Gün</option>
                        <option value="7">7 Gün</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">İlgi Alanlarınız</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant={interests.includes('tarih') ? "default" : "outline"} 
                        onClick={() => toggleInterest('tarih')}
                        className="justify-start"
                      >
                        <Landmark className="mr-2 h-4 w-4" />
                        Tarih & Kültür
                      </Button>
                      <Button 
                        variant={interests.includes('yemek') ? "default" : "outline"} 
                        onClick={() => toggleInterest('yemek')}
                        className="justify-start"
                      >
                        <Utensils className="mr-2 h-4 w-4" />
                        Yeme & İçme
                      </Button>
                      <Button 
                        variant={interests.includes('kafe') ? "default" : "outline"} 
                        onClick={() => toggleInterest('kafe')}
                        className="justify-start"
                      >
                        <Coffee className="mr-2 h-4 w-4" />
                        Kafeler
                      </Button>
                      <Button 
                        variant={interests.includes('tur') ? "default" : "outline"} 
                        onClick={() => toggleInterest('tur')}
                        className="justify-start"
                      >
                        <Bus className="mr-2 h-4 w-4" />
                        Turlar
                      </Button>
                      <Button 
                        variant={interests.includes('fotograf') ? "default" : "outline"} 
                        onClick={() => toggleInterest('fotograf')}
                        className="justify-start"
                      >
                        <Camera className="mr-2 h-4 w-4" />
                        Fotoğraf Noktaları
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={generateTravelPlan} 
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Plan Oluşturuluyor...' : 'Gezi Planı Oluştur'}
                </Button>
              </>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-primary">{generatedPlan.title}</h3>
                  <Button variant="outline" size="sm" onClick={() => setPlanGenerated(false)}>
                    Yeni Plan
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Başlangıç: {generatedPlan.date}</span>
                  <Clock className="ml-2 h-4 w-4" />
                  <span>Süre: {duration} gün</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {generatedPlan.interests.map((interest: string) => (
                    <div key={interest} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      {interest}
                    </div>
                  ))}
                </div>
                
                <ScrollArea className="h-[400px]">
                  <div className="space-y-6">
                    {generatedPlan.days.map((day: any) => (
                      <Card key={day.day}>
                        <CardHeader className="pb-2">
                          <CardTitle>Gün {day.day}</CardTitle>
                          <CardDescription>
                            {generatedPlan.date ? format(
                              new Date(new Date(planDate as Date).setDate(new Date(planDate as Date).getDate() + day.day - 1)), 
                              'dd MMMM yyyy, EEEE', 
                              {locale: tr}
                            ) : ''}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {day.activities.map((activity: any, index: number) => (
                              <div key={index} className="flex gap-4">
                                <div className="w-16 font-medium text-right">{activity.time}</div>
                                <div className="flex-1">
                                  <div className="font-medium">{activity.activity}</div>
                                  <div className="text-sm text-muted-foreground">{activity.description}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="nearby">
          <div className="space-y-4">
            {userLocation ? (
              <>
                <div className="bg-accent p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Navigation className="w-4 h-4 text-primary" />
                    <p className="text-sm">
                      Konumunuz: {userLocation.latitude.toFixed(4)},{" "}
                      {userLocation.longitude.toFixed(4)}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  {nearbyPlaces.map((place) => (
                    <div
                      key={place.name}
                      className="bg-gray-50 p-4 rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-medium">{place.name}</h3>
                        <p className="text-sm text-gray-600">
                          {place.distance} • {place.duration}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => handleGetDirections(place.name)}
                      >
                        Yol Tarifi Al
                      </Button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-500 text-center">
                Yakındaki yerleri görebilmek için konum izni vermeniz gerekiyor.
              </p>
            )}
          </div>
        </TabsContent>

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
              </div>
            </ScrollArea>
            <div className="flex gap-2">
              <Input 
                placeholder="Mesajınızı yazın..." 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TravelAssistant;
