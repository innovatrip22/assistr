
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star, MapPin, CalendarDays, ChevronsRight, Clock, Heart, Share2, MessageCircle, Globe, Building, Utensils } from "lucide-react";

const touristProfiles = [
  { 
    id: 1, 
    name: "Ahmet Yılmaz", 
    age: 32, 
    nationality: "Türkiye", 
    avatar: "/placeholder.svg", 
    interests: ["Tarihi Yerler", "Plajlar", "Yerel Mutfak"],
    visitDuration: "5 gün",
    accommodation: "Salamis Bay Conti Resort",
    feedback: "Harika bir deneyim yaşadım, özellikle Girne'deki restoranlarda yediğim deniz ürünleri muhteşemdi.",
    rating: 4.5
  },
  { 
    id: 2, 
    name: "Sarah Johnson", 
    age: 28, 
    nationality: "İngiltere", 
    avatar: "/placeholder.svg", 
    interests: ["Fotoğrafçılık", "Sualtı Dalışı", "Kültür"],
    visitDuration: "7 gün",
    accommodation: "Acapulco Resort",
    feedback: "Kuzey Kıbrıs'ın muhteşem plajları ve tarihi yerleri beni çok etkiledi. Kesinlikle tekrar geleceğim.",
    rating: 5
  },
  { 
    id: 3, 
    name: "Mehmet Demir", 
    age: 45, 
    nationality: "Türkiye", 
    avatar: "/placeholder.svg", 
    interests: ["Kıbrıs Mutfağı", "Tarihi Yerler", "Kumarhane"],
    visitDuration: "3 gün",
    accommodation: "Merit Royal Hotel",
    feedback: "İş seyahati için geldim ama aynı zamanda harika bir tatil deneyimi yaşadım. AssisTR uygulaması çok yardımcı oldu.",
    rating: 4
  },
  { 
    id: 4, 
    name: "Maria Garcia", 
    age: 34, 
    nationality: "İspanya", 
    avatar: "/placeholder.svg", 
    interests: ["Şnorkelle Dalış", "Doğa Yürüyüşleri", "Yerel Pazarlar"],
    visitDuration: "10 gün",
    accommodation: "Elexus Hotel",
    feedback: "Kıbrıs'ın doğal güzellikleri beklentilerimin çok üzerindeydi. Karpaz Yarımadası'ndaki yaban eşekleri görülmeye değer.",
    rating: 4.8
  },
  { 
    id: 5, 
    name: "Ali Kaya", 
    age: 29, 
    nationality: "Türkiye", 
    avatar: "/placeholder.svg", 
    interests: ["Tarihi Kaleler", "Plajlar", "Gece Hayatı"],
    visitDuration: "4 gün",
    accommodation: "Cratos Premium Hotel",
    feedback: "Girne limanı muhteşem bir atmosfere sahip. Akşam yemeği için harika restoranlar var.",
    rating: 4.3
  },
  { 
    id: 6, 
    name: "John Smith", 
    age: 40, 
    nationality: "Amerika", 
    avatar: "/placeholder.svg", 
    interests: ["Golf", "Tarih", "Lüks Tatil"],
    visitDuration: "14 gün",
    accommodation: "Kaya Artemis Resort",
    feedback: "Golf sahalarının kalitesi ve bakımı dünya standartlarında. Konaklama ve servis mükemmeldi.",
    rating: 4.7
  },
  { 
    id: 7, 
    name: "Zeynep Öztürk", 
    age: 25, 
    nationality: "Türkiye", 
    avatar: "/placeholder.svg", 
    interests: ["Sosyal Medya", "Fotoğraf Çekme", "Alışveriş"],
    visitDuration: "6 gün",
    accommodation: "Malpas Hotel",
    feedback: "Instagram'lık manzaralar ve fotoğraf çekim noktaları için harika bir destinasyon.",
    rating: 4.2
  },
  { 
    id: 8, 
    name: "David Lee", 
    age: 36, 
    nationality: "Güney Kore", 
    avatar: "/placeholder.svg", 
    interests: ["Kumarhane", "Lüks Restoranlar", "Spa"],
    visitDuration: "5 gün",
    accommodation: "Lord's Palace Hotel",
    feedback: "Casinolar ve eğlence tesisleri çok kaliteli. Spa servisleri yorgunluğumu aldı.",
    rating: 4.6
  },
  { 
    id: 9, 
    name: "Ayşe Yıldız", 
    age: 31, 
    nationality: "Türkiye", 
    avatar: "/placeholder.svg", 
    interests: ["Balayı", "Romantik Mekanlar", "Manzara"],
    visitDuration: "7 gün",
    accommodation: "The Colony Hotel",
    feedback: "Balayı için mükemmel bir seçimdi. Romantik akşam yemekleri ve gün batımı manzaraları unutulmazdı.",
    rating: 5
  },
  { 
    id: 10, 
    name: "Michael Brown", 
    age: 42, 
    nationality: "İngiltere", 
    avatar: "/placeholder.svg", 
    interests: ["Yelken", "Su Sporları", "Dalış"],
    visitDuration: "12 gün",
    accommodation: "Denizkızı Hotel",
    feedback: "Deniz aktiviteleri ve su sporları için harika imkanlar var. Dalış turları çok profesyonelce organize edilmişti.",
    rating: 4.4
  },
  { 
    id: 11, 
    name: "Fatma Şahin", 
    age: 38, 
    nationality: "Türkiye", 
    avatar: "/placeholder.svg", 
    interests: ["Aile Tatili", "Çocuk Dostu", "Doğal Plajlar"],
    visitDuration: "8 gün",
    accommodation: "Noah's Ark Deluxe Hotel",
    feedback: "Çocuklar için harika aktiviteler ve güvenli plajlar var. Aile tatili için mükemmel bir seçim.",
    rating: 4.5
  },
  { 
    id: 12, 
    name: "Emma Wilson", 
    age: 27, 
    nationality: "İngiltere", 
    avatar: "/placeholder.svg", 
    interests: ["Yoga", "Meditasyon", "Doğa"],
    visitDuration: "15 gün",
    accommodation: "Riverside Garden Resort",
    feedback: "Sakin bir atmosfer ve doğayla iç içe bir konaklama. Zihinsel detoks için ideal bir ortam.",
    rating: 4.8
  },
  { 
    id: 13, 
    name: "Mustafa Arslan", 
    age: 33, 
    nationality: "Türkiye", 
    avatar: "/placeholder.svg", 
    interests: ["Macera", "Jeep Safari", "Doğa Sporları"],
    visitDuration: "6 gün",
    accommodation: "Merit Cyprus Gardens",
    feedback: "Jeep safari ve doğa sporları çok heyecan vericiydi. Rehberlerimiz çok bilgiliydi.",
    rating: 4.3
  },
  { 
    id: 14, 
    name: "Anna Petrova", 
    age: 30, 
    nationality: "Rusya", 
    avatar: "/placeholder.svg", 
    interests: ["Güneşlenme", "Spa", "Alışveriş"],
    visitDuration: "11 gün",
    accommodation: "Rocks Hotel",
    feedback: "Güzel plajlar ve kaliteli spa hizmetleri. Lefkoşa'daki kapalı çarşıda alışveriş yapmak çok keyifliydi.",
    rating: 4.6
  },
  { 
    id: 15, 
    name: "Hüseyin Çelik", 
    age: 48, 
    nationality: "Türkiye", 
    avatar: "/placeholder.svg", 
    interests: ["Tarih", "Arkeoloji", "Kültürel Turlar"],
    visitDuration: "7 gün",
    accommodation: "Dome Hotel",
    feedback: "Tarihi kalıntılar ve arkeolojik alanlar çok etkileyiciydi. Salamis antik kenti mutlaka görülmeli.",
    rating: 4.7
  },
  { 
    id: 16, 
    name: "Sophia Martinez", 
    age: 26, 
    nationality: "Meksika", 
    avatar: "/placeholder.svg", 
    interests: ["Partiler", "Gece Hayatı", "Plaj Kulüpleri"],
    visitDuration: "5 gün",
    accommodation: "Merit Royal Premium",
    feedback: "Gece kulüpleri ve plaj partileri çok eğlenceliydi. Genç turistler için ideal bir tatil yeri.",
    rating: 4.4
  },
  { 
    id: 17, 
    name: "Can Yılmaz", 
    age: 35, 
    nationality: "Türkiye", 
    avatar: "/placeholder.svg", 
    interests: ["Gastronomi", "Şarap Tadımı", "Gurme Turlar"],
    visitDuration: "4 gün",
    accommodation: "Savoy Ottoman Palace",
    feedback: "Yerel yemekler ve özellikle Kıbrıs şarapları çok lezzetliydi. Gurme turlar çok bilgilendiriciydi.",
    rating: 4.9
  },
  { 
    id: 18, 
    name: "Thomas Weber", 
    age: 39, 
    nationality: "Almanya", 
    avatar: "/placeholder.svg", 
    interests: ["Bisiklet Turu", "Doğa Fotoğrafçılığı", "Kuş Gözlemciliği"],
    visitDuration: "9 gün",
    accommodation: "Oscar Resort",
    feedback: "Bisiklet turları ve doğa fotoğrafçılığı için harika rotalar var. Özellikle Karpaz bölgesi çok güzeldi.",
    rating: 4.5
  },
  { 
    id: 19, 
    name: "Elif Demir", 
    age: 28, 
    nationality: "Türkiye", 
    avatar: "/placeholder.svg", 
    interests: ["Solo Seyahat", "Yerel Halkla Tanışma", "Kültürel Deneyimler"],
    visitDuration: "10 gün",
    accommodation: "Pia Bella Hotel",
    feedback: "Tek başına seyahat edenler için çok güvenli ve samimi bir ortam. Yerel halk çok misafirperver.",
    rating: 4.7
  },
  { 
    id: 20, 
    name: "Alex Turner", 
    age: 32, 
    nationality: "Avustralya", 
    avatar: "/placeholder.svg", 
    interests: ["Ekstrem Sporlar", "Paraşüt", "Su Kayağı"],
    visitDuration: "8 gün",
    accommodation: "Limak Cyprus Deluxe Hotel",
    feedback: "Su sporları ve ekstrem aktiviteler için mükemmel imkanlar. Paraşütle atlayış deneyimi muhteşemdi.",
    rating: 4.6
  }
];

type ActivityType = {
  id: number;
  type: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: string;
  rating: number;
  tags: string[];
};

const activitiesByTourist: Record<number, ActivityType[]> = {
  1: [
    {
      id: 1,
      type: "visit",
      name: "Salamis Antik Kenti Ziyareti",
      description: "KKTC'nin en önemli tarihi mekânlarından biri",
      date: "2023-09-15",
      time: "10:00 - 13:00",
      location: "Gazimağusa",
      price: "€15",
      rating: 4.8,
      tags: ["Tarih", "Antik", "Kültür"]
    },
    {
      id: 2,
      type: "dining",
      name: "Niazi's Restaurant & Bar",
      description: "Geleneksel Kıbrıs kebapları ve mezeleri",
      date: "2023-09-15",
      time: "19:30 - 21:30",
      location: "Girne",
      price: "€25",
      rating: 4.6,
      tags: ["Akşam Yemeği", "Yerel Mutfak", "Kebap"]
    },
    {
      id: 3,
      type: "beach",
      name: "Glapsides Plajı",
      description: "Kumlu sahili ve berrak deniziyle popüler bir plaj",
      date: "2023-09-16",
      time: "09:00 - 16:00",
      location: "Gazimağusa",
      price: "Ücretsiz",
      rating: 4.4,
      tags: ["Plaj", "Deniz", "Güneşlenme"]
    }
  ],
  2: [
    {
      id: 4,
      type: "diving",
      name: "Elusia Dalış Turu",
      description: "Zengin sualtı yaşamı ve mağara keşfi",
      date: "2023-08-22",
      time: "08:30 - 12:30",
      location: "Girne",
      price: "€60",
      rating: 4.9,
      tags: ["Dalış", "Sualtı", "Macera"]
    },
    {
      id: 5,
      type: "visit",
      name: "St. Hilarion Kalesi",
      description: "Etkileyici manzaralı ortaçağ kalesi",
      date: "2023-08-23",
      time: "11:00 - 14:00",
      location: "Girne Dağları",
      price: "€10",
      rating: 4.7,
      tags: ["Kale", "Manzara", "Tarih"]
    }
  ],
  3: [
    {
      id: 6,
      type: "dining",
      name: "Sabor Restaurant",
      description: "Otantik Kıbrıs lezzetleri sunan restoran",
      date: "2023-07-10",
      time: "20:00 - 22:00",
      location: "Girne",
      price: "€30",
      rating: 4.5,
      tags: ["Akşam Yemeği", "Kıbrıs Mutfağı", "Mezeler"]
    },
    {
      id: 7,
      type: "casino",
      name: "Merit Royal Casino",
      description: "Lüks ve eğlence dolu kumarhane deneyimi",
      date: "2023-07-11",
      time: "21:00 - 01:00",
      location: "Girne",
      price: "Değişken",
      rating: 4.3,
      tags: ["Kumarhane", "Eğlence", "Gece Hayatı"]
    }
  ]
};

// Generate sample activities for other tourists
for (let i = 4; i <= 20; i++) {
  const numActivities = Math.floor(Math.random() * 4) + 1; // 1-4 activities per tourist
  const activities: ActivityType[] = [];
  
  for (let j = 1; j <= numActivities; j++) {
    const activityTypes = ["visit", "dining", "beach", "diving", "tour", "casino", "shopping", "hiking"];
    const type = activityTypes[Math.floor(Math.random() * activityTypes.length)];
    
    activities.push({
      id: i * 10 + j,
      type,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} Activity ${j}`,
      description: `Sample description for ${type} activity`,
      date: `2023-0${Math.floor(Math.random() * 3) + 7}-${Math.floor(Math.random() * 28) + 1}`,
      time: `${Math.floor(Math.random() * 12) + 8}:00 - ${Math.floor(Math.random() * 12) + 8}:00`,
      location: ["Girne", "Gazimağusa", "Lefkoşa", "Güzelyurt", "İskele"][Math.floor(Math.random() * 5)],
      price: `€${Math.floor(Math.random() * 80) + 10}`,
      rating: Math.floor(Math.random() * 10) / 2 + 3, // 3.0-4.5
      tags: ["Sample Tag 1", "Sample Tag 2", "Sample Tag 3"].slice(0, Math.floor(Math.random() * 3) + 1)
    });
  }
  
  activitiesByTourist[i] = activities;
}

const renderRating = (rating: number) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-500 fill-yellow-500" : i < rating ? "text-yellow-500 fill-yellow-500 opacity-50" : "text-gray-300"}`}
        />
      ))}
      <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
};

const TouristDemoList = () => {
  const [selectedTourist, setSelectedTourist] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredTourists = touristProfiles.filter(tourist => {
    if (activeTab === "all") return true;
    if (activeTab === "tr") return tourist.nationality === "Türkiye";
    if (activeTab === "international") return tourist.nationality !== "Türkiye";
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Turist Demolar</h2>
        <p className="text-gray-600 mb-6">
          AssisTR platformunu kullanan turistlerin örnek profilleri ve aktiviteleri. Bu demolar, turistlerin 
          platform üzerinden nasıl hizmet aldığını ve deneyimlerinin nasıl iyileştiğini göstermektedir.
        </p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">Tüm Turistler</TabsTrigger>
            <TabsTrigger value="tr">Türkiye'den Gelenler</TabsTrigger>
            <TabsTrigger value="international">Uluslararası Turistler</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTourists.map(tourist => (
          <motion.div 
            key={tourist.id}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Card 
              className="cursor-pointer h-full flex flex-col" 
              onClick={() => setSelectedTourist(tourist.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={tourist.avatar} alt={tourist.name} />
                      <AvatarFallback>{tourist.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{tourist.name}</CardTitle>
                      <CardDescription>{tourist.age} yaş, {tourist.nationality}</CardDescription>
                    </div>
                  </div>
                  <Badge className={tourist.nationality === "Türkiye" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}>
                    {tourist.nationality === "Türkiye" ? "TR" : "INT"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CalendarDays className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                    <span className="text-gray-700">Kalış Süresi: {tourist.visitDuration}</span>
                  </div>
                  <div className="flex items-start">
                    <Building className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                    <span className="text-gray-700">Konaklama: {tourist.accommodation}</span>
                  </div>
                  <div className="flex items-start">
                    <Heart className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                    <div>
                      <span className="text-gray-700 block mb-1">İlgi Alanları:</span>
                      <div className="flex flex-wrap gap-1">
                        {tourist.interests.map((interest, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs bg-gray-50">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between items-center">
                {renderRating(tourist.rating)}
                <Button variant="ghost" size="sm">
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {selectedTourist && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col"
          >
            <div className="p-6 border-b">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={touristProfiles.find(t => t.id === selectedTourist)?.avatar} alt="Avatar" />
                    <AvatarFallback>
                      {touristProfiles.find(t => t.id === selectedTourist)?.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {touristProfiles.find(t => t.id === selectedTourist)?.name}
                    </h3>
                    <p className="text-gray-500">
                      {touristProfiles.find(t => t.id === selectedTourist)?.age} yaş, 
                      {touristProfiles.find(t => t.id === selectedTourist)?.nationality}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedTourist(null)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="profile" className="flex-grow flex flex-col overflow-hidden">
              <div className="border-b px-6">
                <TabsList className="justify-start">
                  <TabsTrigger value="profile">Profil</TabsTrigger>
                  <TabsTrigger value="activities">Aktiviteler</TabsTrigger>
                  <TabsTrigger value="feedback">Geri Bildirim</TabsTrigger>
                </TabsList>
              </div>
              
              <ScrollArea className="flex-grow">
                <TabsContent value="profile" className="p-6 m-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-medium text-gray-800 mb-3">Kişisel Bilgiler</h4>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <Globe className="h-5 w-5 mr-3 mt-0.5 text-gray-500" />
                            <div>
                              <p className="font-medium">Uyruk</p>
                              <p className="text-gray-600">
                                {touristProfiles.find(t => t.id === selectedTourist)?.nationality}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <CalendarDays className="h-5 w-5 mr-3 mt-0.5 text-gray-500" />
                            <div>
                              <p className="font-medium">Ziyaret Süresi</p>
                              <p className="text-gray-600">
                                {touristProfiles.find(t => t.id === selectedTourist)?.visitDuration}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Building className="h-5 w-5 mr-3 mt-0.5 text-gray-500" />
                            <div>
                              <p className="font-medium">Konaklama</p>
                              <p className="text-gray-600">
                                {touristProfiles.find(t => t.id === selectedTourist)?.accommodation}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-medium text-gray-800 mb-3">İlgi Alanları</h4>
                        <div className="flex flex-wrap gap-2">
                          {touristProfiles.find(t => t.id === selectedTourist)?.interests.map((interest, idx) => (
                            <Badge key={idx} className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-medium text-gray-800 mb-3">Ziyaret Bilgileri</h4>
                        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                          <div className="flex items-start">
                            <MapPin className="h-5 w-5 mr-3 mt-0.5 text-gray-500" />
                            <div>
                              <p className="font-medium">Ziyaret Edilen Bölgeler</p>
                              <p className="text-gray-600">
                                Girne, Gazimağusa, Lefkoşa
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Utensils className="h-5 w-5 mr-3 mt-0.5 text-gray-500" />
                            <div>
                              <p className="font-medium">Tercih Edilen Restoranlar</p>
                              <p className="text-gray-600">
                                Sedir Restaurant, Niazi's, Sabor
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Star className="h-5 w-5 mr-3 mt-0.5 text-gray-500" />
                            <div>
                              <p className="font-medium">Toplam Memnuniyet</p>
                              <div className="mt-1">
                                {renderRating(touristProfiles.find(t => t.id === selectedTourist)?.rating || 0)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-medium text-gray-800 mb-3">AssisTR Kullanım Verileri</h4>
                        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-3 rounded-md text-center">
                              <p className="text-sm text-gray-500">Uygulama Açılışı</p>
                              <p className="text-xl font-semibold text-blue-600">18 kez</p>
                            </div>
                            <div className="bg-white p-3 rounded-md text-center">
                              <p className="text-sm text-gray-500">AI Asistan Soruları</p>
                              <p className="text-xl font-semibold text-blue-600">12 soru</p>
                            </div>
                            <div className="bg-white p-3 rounded-md text-center">
                              <p className="text-sm text-gray-500">Rez. Yapılan Yerler</p>
                              <p className="text-xl font-semibold text-blue-600">3 yer</p>
                            </div>
                            <div className="bg-white p-3 rounded-md text-center">
                              <p className="text-sm text-gray-500">Rota Planlaması</p>
                              <p className="text-xl font-semibold text-blue-600">5 rota</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="activities" className="p-6 m-0">
                  <div className="space-y-6">
                    <h4 className="text-lg font-medium text-gray-800">Turist Aktiviteleri</h4>
                    
                    {activitiesByTourist[selectedTourist]?.length > 0 ? (
                      <div className="space-y-4">
                        {activitiesByTourist[selectedTourist].map((activity) => (
                          <Card key={activity.id} className="overflow-hidden">
                            <div className="flex items-center bg-gray-50 px-6 py-3">
                              <Badge className={`mr-3 ${
                                activity.type === "dining" ? "bg-green-100 text-green-800" :
                                activity.type === "visit" ? "bg-blue-100 text-blue-800" :
                                activity.type === "beach" ? "bg-amber-100 text-amber-800" :
                                activity.type === "diving" ? "bg-cyan-100 text-cyan-800" :
                                activity.type === "casino" ? "bg-purple-100 text-purple-800" :
                                "bg-gray-100 text-gray-800"
                              }`}>
                                {activity.type}
                              </Badge>
                              <h5 className="font-medium">{activity.name}</h5>
                              <div className="ml-auto">
                                {renderRating(activity.rating)}
                              </div>
                            </div>
                            <CardContent className="p-6">
                              <div className="space-y-4">
                                <p className="text-gray-600">{activity.description}</p>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  <div className="flex items-center">
                                    <CalendarDays className="h-4 w-4 mr-2 text-gray-500" />
                                    <span className="text-sm">{new Date(activity.date).toLocaleDateString('tr-TR')}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                    <span className="text-sm">{activity.time}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                                    <span className="text-sm">{activity.location}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="h-4 w-4 mr-2 text-gray-500"
                                    >
                                      <path d="M12 2v20"></path>
                                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                    </svg>
                                    <span className="text-sm">{activity.price}</span>
                                  </div>
                                </div>
                                
                                <div className="flex flex-wrap gap-2">
                                  {activity.tags.map((tag, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">Bu turist için kayıtlı aktivite bulunmamaktadır.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="feedback" className="p-6 m-0">
                  <div className="space-y-6">
                    <h4 className="text-lg font-medium text-gray-800">Turist Geri Bildirimi</h4>
                    
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">KKTC Seyahat Değerlendirmesi</CardTitle>
                          <div>
                            {renderRating(touristProfiles.find(t => t.id === selectedTourist)?.rating || 0)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700">
                          {touristProfiles.find(t => t.id === selectedTourist)?.feedback}
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-4">
                        <div className="flex items-center text-gray-500 text-sm">
                          <CalendarDays className="h-4 w-4 mr-1" />
                          <span>Eylül 2023</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Share2 className="h-4 w-4 mr-1" />
                            Paylaş
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Yanıtla
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-medium text-blue-700 mb-2">AssisTR Yapay Zeka Analizleri</h5>
                      <div className="space-y-3">
                        <div className="bg-white p-3 rounded-md">
                          <p className="font-medium text-sm text-gray-700">Duygu Analizi</p>
                          <div className="flex items-center mt-1">
                            <div className="h-2 flex-grow bg-gray-200 rounded-full overflow-hidden">
                              <div className="bg-green-500 h-full" style={{width: "78%"}}></div>
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-600">78% Pozitif</span>
                          </div>
                        </div>
                        
                        <div className="bg-white p-3 rounded-md">
                          <p className="font-medium text-sm text-gray-700">Öne Çıkan Temalar</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge className="bg-blue-100 text-blue-800">Yemekler</Badge>
                            <Badge className="bg-blue-100 text-blue-800">Konaklama Kalitesi</Badge>
                            <Badge className="bg-blue-100 text-blue-800">Plajlar</Badge>
                            <Badge className="bg-blue-100 text-blue-800">Tarihi Yerler</Badge>
                          </div>
                        </div>
                        
                        <div className="bg-white p-3 rounded-md">
                          <p className="font-medium text-sm text-gray-700">Gelişim Önerileri</p>
                          <ul className="mt-2 space-y-1 text-sm text-gray-600">
                            <li className="flex items-start">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4 mr-1 mt-0.5 text-blue-500"
                              >
                                <polyline points="9 11 12 14 22 4"></polyline>
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                              </svg>
                              Daha fazla çeviri hizmeti sunulması
                            </li>
                            <li className="flex items-start">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4 mr-1 mt-0.5 text-blue-500"
                              >
                                <polyline points="9 11 12 14 22 4"></polyline>
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                              </svg>
                              Ulaşım seçeneklerinin çeşitlendirilmesi
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TouristDemoList;
