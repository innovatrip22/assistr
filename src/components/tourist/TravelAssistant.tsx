import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map, MessageSquare, Navigation, Send } from "lucide-react";

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
            <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg">
              <MessageSquare className="w-5 h-5 mt-1 text-primary" />
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-2">
                  Merhaba! Size nasıl yardımcı olabilirim?
                </p>
                <Input
                  placeholder="Örn: 2 günlük Antalya gezi rotası önerir misin?"
                />
              </div>
            </div>
            <Button className="w-full">Sohbeti Başlat</Button>
            <p className="text-sm text-gray-500 text-center">
              Yapay zeka destekli chatbot yakında hizmetinizde olacak.
            </p>
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
            <div className="bg-accent p-4 rounded-lg space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Merhaba! Antalya'da gezilecek yerler hakkında size önerilerde
                    bulunabilirim. Neye ilginiz var?
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Mesajınızı yazın..." />
              <Button>
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
