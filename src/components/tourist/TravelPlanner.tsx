
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, CalendarIcon, Clock, Landmark, Coffee, Utensils, Bus, Car, 
  Camera, MapPin, Euro, PlaneTakeoff, Ship, Train, Info } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

type InterestType = 'tarih' | 'yemek' | 'kafe' | 'tur' | 'fotograf';

type Transportation = {
  type: string;
  icon: JSX.Element;
  description: string;
  duration: string;
  price: string;
  frequency?: string;
};

type Activity = {
  time: string;
  activity: string;
  description: string;
  location?: string;
  cost?: string;
  image?: string;
  transportation?: Transportation[];
};

type DayPlan = {
  day: number;
  activities: Activity[];
};

type TravelPlan = {
  title: string;
  date: string;
  interests: string[];
  days: DayPlan[];
};

// Sample images for activities
const activityImages = {
  "Girne Limanı": "/lovable-uploads/5ecb91b8-3b2a-4493-95fe-ccb5e08148fa.png",
  "St. Hilarion Kalesi": "https://images.unsplash.com/photo-1635199893453-ddd501acda84?q=80&w=600&auto=format&fit=crop",
  "Girne Kalesi": "https://images.unsplash.com/photo-1566247514599-3f4e32d3d42a?q=80&w=600&auto=format&fit=crop",
  "Bellapais Manastırı": "https://images.unsplash.com/photo-1559682468-a6a29e7d9517?q=80&w=600&auto=format&fit=crop",
  "Karpaz Milli Parkı": "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?q=80&w=600&auto=format&fit=crop",
  "Apostolos Andreas Manastırı": "https://images.unsplash.com/photo-1580041065738-e72023775cdc?q=80&w=600&auto=format&fit=crop",
  "Salamis Harabeleri": "https://images.unsplash.com/photo-1560152217-4f33aa88d766?q=80&w=600&auto=format&fit=crop",
  "Gazimağusa Surları": "https://images.unsplash.com/photo-1548940740-204726a19ec3?q=80&w=600&auto=format&fit=crop",
  "Namık Kemal Zindanı": "https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?q=80&w=600&auto=format&fit=crop",
};

// Transportation options for different destinations
const transportationOptions = {
  "Girne": [
    {
      type: "Otobüs",
      icon: <Bus className="h-4 w-4" />,
      description: "Lefkoşa-Girne arası düzenli seferler",
      duration: "45 dakika",
      price: "40 TL (yaklaşık 2 €)",
      frequency: "Her saat başı"
    },
    {
      type: "Taksi",
      icon: <Car className="h-4 w-4" />,
      description: "Özel taksi hizmeti",
      duration: "30 dakika",
      price: "400-500 TL (yaklaşık 20-25 €)"
    },
    {
      type: "Araç Kiralama",
      icon: <Car className="h-4 w-4" />,
      description: "Günlük kiralık araç",
      duration: "30 dakika",
      price: "500-800 TL/gün (yaklaşık 25-40 €/gün)"
    }
  ],
  "Gazimağusa": [
    {
      type: "Otobüs",
      icon: <Bus className="h-4 w-4" />,
      description: "Lefkoşa-Gazimağusa arası düzenli seferler",
      duration: "1 saat 15 dakika",
      price: "50 TL (yaklaşık 2.5 €)",
      frequency: "Saatte bir"
    },
    {
      type: "Taksi",
      icon: <Car className="h-4 w-4" />,
      description: "Özel taksi hizmeti",
      duration: "1 saat",
      price: "500-600 TL (yaklaşık 25-30 €)"
    }
  ],
  "Karpaz": [
    {
      type: "Otobüs",
      icon: <Bus className="h-4 w-4" />,
      description: "Lefkoşa-Karpaz arası seferler (aktarmalı)",
      duration: "2 saat 30 dakika",
      price: "70 TL (yaklaşık 3.5 €)",
      frequency: "Günde 3 sefer"
    },
    {
      type: "Araç Kiralama",
      icon: <Car className="h-4 w-4" />,
      description: "Günlük kiralık araç önerilir",
      duration: "2 saat",
      price: "500-800 TL/gün (yaklaşık 25-40 €/gün)"
    }
  ]
};

const TravelPlanner = () => {
  const [planDate, setPlanDate] = useState<Date | undefined>(new Date());
  const [duration, setDuration] = useState("1");
  const [interests, setInterests] = useState<string[]>([]);
  const [planGenerated, setPlanGenerated] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<TravelPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTransportTab, setSelectedTransportTab] = useState<string>("bus");

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
      ? prev.filter(i => i !== interest) 
      : [...prev, interest]
    );
  };

  const getTransportForLocation = (location: string) => {
    if (location.includes("Girne")) return transportationOptions["Girne"];
    if (location.includes("Gazimağusa") || location.includes("Salamis")) return transportationOptions["Gazimağusa"];
    if (location.includes("Karpaz")) return transportationOptions["Karpaz"];
    return transportationOptions["Girne"]; // Default
  };

  const generateTravelPlan = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const days = parseInt(duration);
      const plan = {
        title: `${days} Günlük KKTC Gezi Planı`,
        date: planDate ? format(planDate, 'dd MMMM yyyy', {locale: tr}) : '',
        interests: interests,
        days: Array.from({length: days}, (_, index) => ({
          day: index + 1,
          activities: [
            {
              time: '09:00',
              activity: index === 0 ? 'Girne Limanı' : index === 1 ? 'Bellapais Manastırı' : 'Salamis Harabeleri',
              description: index === 0 
                ? 'KKTC\'nin en güzel bölgelerinden biri olan Girne Limanı\'nda yürüyüş ve tarihi binalar.' 
                : index === 1 
                ? 'Gotik mimarinin en güzel örneklerinden biri olan Bellapais Manastırı\'nı ziyaret.' 
                : 'Antik dönemden kalma muhteşem Salamis Harabeleri\'ni keşfetme.',
              location: index === 0 ? 'Girne Merkez' : index === 1 ? 'Girne, Bellapais Köyü' : 'Gazimağusa yakınları',
              cost: index === 0 ? 'Ücretsiz' : index === 1 ? 'Giriş: 45 TL' : 'Giriş: 45 TL',
              image: index === 0 
                ? activityImages["Girne Limanı"] 
                : index === 1 
                ? activityImages["Bellapais Manastırı"] 
                : activityImages["Salamis Harabeleri"],
              transportation: index === 0 
                ? getTransportForLocation("Girne") 
                : index === 1 
                ? getTransportForLocation("Girne") 
                : getTransportForLocation("Gazimağusa"),
            },
            {
              time: '12:30',
              activity: 'Öğle Yemeği',
              description: index === 0 
                ? 'Girne Limanı\'ndaki otantik bir restoranda yerel KKTC lezzetleri.' 
                : index === 1 
                ? 'Bellapais bölgesindeki tarihi bir restoranda geleneksel yemekler.' 
                : 'Salamis çevresindeki bir restoranda taze balık keyfi.',
              location: index === 0 ? 'Girne Limanı Restoranları' : index === 1 ? 'Bellapais Abbey Restaurant' : 'Salamis Bay Restaurant',
              cost: 'Kişi başı 250-350 TL (yaklaşık 12-18 €)',
            },
            {
              time: '14:00',
              activity: index === 0 ? 'St. Hilarion Kalesi' : index === 1 ? 'Karpaz Milli Parkı' : 'Gazimağusa Surları',
              description: index === 0 
                ? 'Eşsiz manzarası ile St. Hilarion Kalesi\'ni ziyaret ve fotoğraf çekimi.' 
                : index === 1 
                ? 'Muhteşem Karpaz Milli Parkı\'nda doğa yürüyüşü ve yabani eşekleri gözlemleme.' 
                : 'Venedikliler tarafından inşa edilen tarihi Gazimağusa Surları\'nı keşfetme.',
              location: index === 0 ? 'Girne dağları' : index === 1 ? 'Karpaz Yarımadası' : 'Gazimağusa Merkez',
              cost: index === 0 ? 'Giriş: 45 TL' : index === 1 ? 'Giriş: Ücretsiz' : 'Giriş: Ücretsiz',
              image: index === 0 
                ? activityImages["St. Hilarion Kalesi"] 
                : index === 1 
                ? activityImages["Karpaz Milli Parkı"] 
                : activityImages["Gazimağusa Surları"],
              transportation: index === 0 
                ? getTransportForLocation("Girne")
                : index === 1 
                ? getTransportForLocation("Karpaz") 
                : getTransportForLocation("Gazimağusa"),
            },
            {
              time: '17:00',
              activity: index === 0 ? 'Girne Kalesi' : index === 1 ? 'Apostolos Andreas Manastırı' : 'Namık Kemal Zindanı',
              description: index === 0 
                ? 'Tarihi Girne Kalesi\'ni ve içindeki Batık Gemi Müzesi\'ni ziyaret.' 
                : index === 1 
                ? 'Karpaz Yarımadası\'nın ucundaki önemli dini merkez Apostolos Andreas Manastırı\'nı ziyaret.' 
                : 'Tarihi öneme sahip Namık Kemal Zindanı ve Gazimağusa\'nın tarihi merkezini keşfetme.',
              location: index === 0 ? 'Girne Limanı yanı' : index === 1 ? 'Karpaz Yarımadası ucu' : 'Gazimağusa Suriçi',
              cost: index === 0 ? 'Giriş: 45 TL' : index === 1 ? 'Giriş: Ücretsiz (Bağış yapılabilir)' : 'Giriş: 30 TL',
              image: index === 0 
                ? activityImages["Girne Kalesi"] 
                : index === 1 
                ? activityImages["Apostolos Andreas Manastırı"] 
                : activityImages["Namık Kemal Zindanı"],
            },
            {
              time: '20:00',
              activity: 'Akşam Yemeği',
              description: index === 0 
                ? 'Girne\'de deniz manzaralı bir restoranda hellim ve şeftali kebabı tadımı.' 
                : index === 1 
                ? 'Yerel bir restoranda KKTC mutfağının özel lezzetleri molehiya ve kolakas.' 
                : 'Gazimağusa\'da tarihi bir mekanda geleneksel Kıbrıs mezelerini tatma.',
              location: index === 0 ? 'The Harbour Restaurant, Girne' : index === 1 ? 'Oasis Restaurant, Dipkarpaz' : 'Monk\'s Inn Restaurant, Gazimağusa',
              cost: 'Kişi başı 300-450 TL (yaklaşık 15-22 €)',
            }
          ]
        }))
      };
      
      setGeneratedPlan(plan);
      setPlanGenerated(true);
      setIsGenerating(false);
      toast.success("Gezi planınız oluşturuldu!");
    }, 2000);
  };

  return (
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
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" 
            onClick={generateTravelPlan} 
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Plan Oluşturuluyor...
              </>
            ) : 'Gezi Planı Oluştur'}
          </Button>
        </>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-primary">{generatedPlan?.title}</h3>
            <Button variant="outline" size="sm" onClick={() => setPlanGenerated(false)}>
              Yeni Plan
            </Button>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
            <span>Başlangıç: {generatedPlan?.date}</span>
            <Clock className="ml-2 h-4 w-4" />
            <span>Süre: {duration} gün</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {generatedPlan?.interests.map((interest: string) => (
              <div key={interest} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                {interest}
              </div>
            ))}
          </div>
          
          <ScrollArea className="h-[600px]">
            <div className="space-y-6">
              {generatedPlan?.days.map((day: DayPlan) => (
                <Card key={day.day} className="overflow-hidden">
                  <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-purple-50">
                    <CardTitle className="flex items-center text-blue-700">
                      <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                        {day.day}
                      </span>
                      Gün {day.day}
                    </CardTitle>
                    <CardDescription>
                      {planDate ? format(
                        new Date(new Date(planDate).setDate(new Date(planDate).getDate() + day.day - 1)), 
                        'dd MMMM yyyy, EEEE', 
                        {locale: tr}
                      ) : ''}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {day.activities.map((activity, index) => (
                        <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex gap-4">
                            <div className="min-w-16 text-center">
                              <div className="bg-blue-100 text-blue-700 rounded-lg py-1 font-medium">{activity.time}</div>
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="font-medium text-lg">{activity.activity}</div>
                              
                              {activity.location && (
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <MapPin className="h-3.5 w-3.5 mr-1" />
                                  {activity.location}
                                </div>
                              )}
                              
                              {activity.cost && (
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Euro className="h-3.5 w-3.5 mr-1" />
                                  {activity.cost}
                                </div>
                              )}
                              
                              <div className="text-sm text-muted-foreground">{activity.description}</div>
                              
                              {activity.image && (
                                <div className="mt-3">
                                  <img 
                                    src={activity.image} 
                                    alt={activity.activity} 
                                    className="rounded-lg w-full h-40 object-cover"
                                  />
                                </div>
                              )}
                              
                              {activity.transportation && (
                                <div className="mt-3 border-t pt-3">
                                  <p className="text-sm font-medium mb-2 flex items-center">
                                    <Bus className="h-4 w-4 mr-1" /> 
                                    Ulaşım Seçenekleri
                                  </p>
                                  
                                  <Tabs value={selectedTransportTab} onValueChange={setSelectedTransportTab}>
                                    <TabsList className="mb-2">
                                      {activity.transportation.map((option, idx) => (
                                        <TabsTrigger 
                                          key={idx} 
                                          value={option.type.toLowerCase().replace(" ", "-")}
                                          className="text-xs"
                                        >
                                          {option.icon} 
                                          <span className="ml-1">{option.type}</span>
                                        </TabsTrigger>
                                      ))}
                                    </TabsList>
                                    
                                    {activity.transportation.map((option, idx) => (
                                      <TabsContent 
                                        key={idx} 
                                        value={option.type.toLowerCase().replace(" ", "-")}
                                        className="border rounded-lg p-3"
                                      >
                                        <div className="space-y-2">
                                          <div className="text-sm">{option.description}</div>
                                          <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div className="flex items-center">
                                              <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                              <span>{option.duration}</span>
                                            </div>
                                            <div className="flex items-center">
                                              <Euro className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                              <span>{option.price}</span>
                                            </div>
                                            {option.frequency && (
                                              <div className="flex items-center col-span-2">
                                                <Info className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                                <span>Sefer Sıklığı: {option.frequency}</span>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </TabsContent>
                                    ))}
                                  </Tabs>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="bg-blue-50/50 px-6 py-3">
                    <div className="w-full flex flex-wrap gap-2 items-center justify-between">
                      <div className="flex items-center">
                        <Bus className="h-4 w-4 mr-1.5 text-blue-700" />
                        <span className="text-sm font-medium text-blue-700">Günlük Ulaşım Tavsiyesi:</span>
                      </div>
                      <Badge variant="outline" className="bg-white">
                        {day.day === 1 ? "Taksi + Yaya" : day.day === 2 ? "Kiralık Araç" : "Otobüs Turu"}
                      </Badge>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default TravelPlanner;
