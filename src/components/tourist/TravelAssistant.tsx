
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map, MessageSquare, Navigation } from "lucide-react";

const TravelAssistant = () => {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

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
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Navigation className="w-4 h-4 text-primary" />
                  <p className="text-sm">
                    Konumunuz: {userLocation.latitude.toFixed(4)},{" "}
                    {userLocation.longitude.toFixed(4)}
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  Yakındaki turistik noktalar yakında listelenecek.
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center">
                Yakındaki yerleri görebilmek için konum izni vermeniz gerekiyor.
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TravelAssistant;
