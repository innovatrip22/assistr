
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, MessageSquare, Navigation, Hotel, Plane, Bus, Landmark, Coffee, Utensils, Camera, ShoppingBag } from "lucide-react";
import TravelPlanner from "./TravelPlanner";
import NearbyPlaces from "./NearbyPlaces";
import TravelChat from "./TravelChat";

const TravelAssistant = () => {
  const [activeTab, setActiveTab] = useState("planner");
  const [activeServiceTab, setActiveServiceTab] = useState("tourism");

  const handleTabChange = (value: string) => {
    console.log("TravelAssistant tab changed to:", value);
    setActiveTab(value);
  };

  const handleServiceTabChange = (value: string) => {
    console.log("Service tab changed to:", value);
    setActiveServiceTab(value);
  };

  // Institution service tabs and their contents
  const serviceTabContents = {
    tourism: {
      icon: <Landmark className="w-8 h-8 text-primary mb-4" />,
      title: "Turizm Bakanlığı Hizmetleri",
      description: "KKTC'deki turistik yerler, etkinlikler ve kültürel miraslar hakkında bilgiler.",
      items: [
        {
          title: "Turistik Yerler",
          description: "KKTC'nin en popüler turistik yerlerini keşfedin.",
          icon: <Landmark className="w-5 h-5 text-primary" />
        },
        {
          title: "Etkinlik Takvimi",
          description: "KKTC'de düzenlenen etkinlikler ve festivallerden haberdar olun.",
          icon: <Calendar className="w-5 h-5 text-primary" />
        },
        {
          title: "Kültürel Miras",
          description: "KKTC'nin zengin kültürel mirası hakkında bilgi alın.",
          icon: <Building className="w-5 h-5 text-primary" />
        }
      ]
    },
    food: {
      icon: <Utensils className="w-8 h-8 text-primary mb-4" />,
      title: "Yiyecek & İçecek Kurumu",
      description: "KKTC'nin yerel lezzetleri, restoranları ve gıda güvenliği hakkında bilgiler.",
      items: [
        {
          title: "Yerel Lezzetler",
          description: "KKTC'nin geleneksel mutfağını ve özel lezzetlerini tanıyın.",
          icon: <Utensils className="w-5 h-5 text-primary" />
        },
        {
          title: "Restoran Rehberi",
          description: "KKTC'nin en iyi restoranlarını ve kafelerini keşfedin.",
          icon: <Coffee className="w-5 h-5 text-primary" />
        },
        {
          title: "Gıda Güvenliği",
          description: "Gıda güvenliği standartları ve bilgilendirmeler.",
          icon: <ShieldCheck className="w-5 h-5 text-primary" />
        }
      ]
    },
    transportation: {
      icon: <Bus className="w-8 h-8 text-primary mb-4" />,
      title: "Ulaştırma Bakanlığı",
      description: "KKTC içinde ulaşım seçenekleri, rota planlaması ve trafik bilgileri.",
      items: [
        {
          title: "Toplu Taşıma",
          description: "Otobüs güzergahları, saatleri ve ücretleri hakkında bilgi alın.",
          icon: <Bus className="w-5 h-5 text-primary" />
        },
        {
          title: "Taksi Hizmetleri",
          description: "Taksi ücretleri ve çağırma yöntemleri.",
          icon: <Car className="w-5 h-5 text-primary" />
        },
        {
          title: "Ulaşım Haritası",
          description: "KKTC'de ulaşım için interaktif haritalar ve yol bilgileri.",
          icon: <Map className="w-5 h-5 text-primary" />
        }
      ]
    },
    economy: {
      icon: <ShoppingBag className="w-8 h-8 text-primary mb-4" />,
      title: "Ekonomi Bakanlığı",
      description: "Alışveriş merkezleri, duty-free mağazaları ve ekonomik bilgiler.",
      items: [
        {
          title: "Alışveriş Rehberi",
          description: "KKTC'nin alışveriş merkezleri ve çarşıları hakkında bilgi alın.",
          icon: <ShoppingBag className="w-5 h-5 text-primary" />
        },
        {
          title: "Duty-Free Bilgileri",
          description: "Duty-free alışveriş kuralları ve limitleri.",
          icon: <PackageOpen className="w-5 h-5 text-primary" />
        },
        {
          title: "Para Birimi ve Bankalar",
          description: "Döviz kurları, banka ve ATM yerleri hakkında bilgiler.",
          icon: <CreditCard className="w-5 h-5 text-primary" />
        }
      ]
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Map className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">Gezi Asistanı</h2>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="planner" className="w-full">
            <Calendar className="mr-2 w-4 h-4" />
            Gezi Planlayıcı
          </TabsTrigger>
          <TabsTrigger value="nearby" className="w-full">
            <Navigation className="mr-2 w-4 h-4" />
            Yakındaki Yerler
          </TabsTrigger>
          <TabsTrigger value="services" className="w-full">
            <Building className="mr-2 w-4 h-4" />
            Kurum Hizmetleri
          </TabsTrigger>
          <TabsTrigger value="chat" className="w-full">
            <MessageSquare className="mr-2 w-4 h-4" />
            Sohbet
          </TabsTrigger>
        </TabsList>

        <div className="mt-4">
          <TabsContent value="planner" className="mt-0">
            <TravelPlanner />
          </TabsContent>

          <TabsContent value="nearby" className="mt-0">
            <NearbyPlaces />
          </TabsContent>

          <TabsContent value="services" className="mt-0">
            <Tabs value={activeServiceTab} onValueChange={handleServiceTabChange} className="w-full">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="tourism" className="w-full">
                  <Landmark className="mr-2 w-4 h-4" />
                  Turizm
                </TabsTrigger>
                <TabsTrigger value="food" className="w-full">
                  <Utensils className="mr-2 w-4 h-4" />
                  Yiyecek & İçecek
                </TabsTrigger>
                <TabsTrigger value="transportation" className="w-full">
                  <Bus className="mr-2 w-4 h-4" />
                  Ulaştırma
                </TabsTrigger>
                <TabsTrigger value="economy" className="w-full">
                  <ShoppingBag className="mr-2 w-4 h-4" />
                  Ekonomi
                </TabsTrigger>
              </TabsList>

              {Object.entries(serviceTabContents).map(([key, content]) => (
                <TabsContent key={key} value={key} className="mt-0">
                  <div className="text-center mb-6">
                    {content.icon}
                    <h3 className="text-xl font-semibold">{content.title}</h3>
                    <p className="text-muted-foreground mt-2">{content.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {content.items.map((item, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center gap-2">
                          {item.icon}
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>

          <TabsContent value="chat" className="mt-0">
            <TravelChat />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

// Add missing icon components
const Calendar = ({ className }: { className?: string }) => (
  <span className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
  </span>
);

const Building = ({ className }: { className?: string }) => (
  <span className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
  </span>
);

const ShieldCheck = ({ className }: { className?: string }) => (
  <span className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-8 8.5-4.5-1-8-3.5-8-8.5V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"/><path d="m9 12 2 2 4-4"/></svg>
  </span>
);

const Car = ({ className }: { className?: string }) => (
  <span className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></svg>
  </span>
);

const CreditCard = ({ className }: { className?: string }) => (
  <span className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
  </span>
);

const PackageOpen = ({ className }: { className?: string }) => (
  <span className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 10h6"/><path d="M9 14h6"/><path d="M12 22v-8.3a.7.7 0 0 0-.7-.7H4.7a.7.7 0 0 0-.7.7V22"/><path d="M20 22V6.7a.7.7 0 0 0-.7-.7H15"/><path d="m12 6-2-2H6.5L4 6"/><path d="M12 6h8"/><path d="M4 10v3"/><path d="M20 10v3"/></svg>
  </span>
);

export default TravelAssistant;
