
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Hotel, Search, Star, MapPin } from "lucide-react";

interface HotelInfo {
  name: string;
  stars: number;
  room: string;
  checkin: string;
  checkout: string;
  rating: number;
  reviews: string[];
  nearbyPlaces: {
    restaurants: string[];
    attractions: string[];
    transport: string[];
  };
  services: string[];
}

const AccommodationAssistant = () => {
  const [reservationCode, setReservationCode] = useState("");
  const [hotelInfo, setHotelInfo] = useState<HotelInfo | null>(null);
  const { toast } = useToast();

  const handleReservationSearch = () => {
    if (reservationCode === "098765") {
      setHotelInfo({
        name: "Grand Hotel Antalya",
        stars: 5,
        room: "Deluxe Deniz Manzaralı Oda",
        checkin: "2024-03-20",
        checkout: "2024-03-25",
        rating: 4.5,
        reviews: [
          "Muhteşem bir deneyimdi!",
          "Personel çok ilgiliydi",
          "Konumu mükemmel",
        ],
        nearbyPlaces: {
          restaurants: ["Sahil Restaurant", "Marina Cafe", "Balık Evi"],
          attractions: ["Kaleiçi", "Düden Şelalesi", "Konyaaltı Plajı"],
          transport: ["Antalya Havalimanı - 20dk", "Otobüs Durağı - 5dk"],
        },
        services: [
          "SPA Merkezi",
          "Açık Büfe Kahvaltı",
          "Havuz",
          "Fitness Salonu",
        ],
      });
      toast({
        title: "Rezervasyon Bulundu",
        description: "Otel bilgileriniz görüntüleniyor.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Rezervasyon Bulunamadı",
        description: "Lütfen geçerli bir rezervasyon kodu giriniz.",
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Hotel className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">Konaklama Asistanı</h2>
      </div>

      <Tabs defaultValue="search" className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="search" className="w-full">
            Otel Ara
          </TabsTrigger>
          <TabsTrigger value="reservation" className="w-full">
            Rezervasyon Sorgula
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Nerede konaklamak istiyorsunuz?" />
              <Input type="date" placeholder="Giriş Tarihi" />
              <Input type="date" placeholder="Çıkış Tarihi" />
              <Input type="number" placeholder="Kişi Sayısı" min="1" />
            </div>
            <Button className="w-full">
              <Search className="w-4 h-4 mr-2" />
              Otel Ara
            </Button>
            <p className="text-sm text-gray-500 text-center">
              Bu özellik yakında hizmetinizde olacak.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="reservation">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Rezervasyon Kodu Giriniz"
                value={reservationCode}
                onChange={(e) => setReservationCode(e.target.value)}
              />
              <Button onClick={handleReservationSearch}>
                <Search className="w-4 h-4 mr-2" />
                Sorgula
              </Button>
            </div>

            {hotelInfo && (
              <div className="mt-4 space-y-4 animate-fadeIn">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{hotelInfo.name}</h3>
                    <div className="flex">
                      {[...Array(hotelInfo.stars)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-primary font-medium">{hotelInfo.room}</p>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">Giriş Tarihi</p>
                      <p className="font-medium">{hotelInfo.checkin}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Çıkış Tarihi</p>
                      <p className="font-medium">{hotelInfo.checkout}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Yakındaki Yerler</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium">Restoranlar</p>
                      <ul className="text-sm text-gray-600">
                        {hotelInfo.nearbyPlaces.restaurants.map((restaurant) => (
                          <li key={restaurant} className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {restaurant}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Gezilecek Yerler</p>
                      <ul className="text-sm text-gray-600">
                        {hotelInfo.nearbyPlaces.attractions.map((attraction) => (
                          <li key={attraction} className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {attraction}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Otel Hizmetleri</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {hotelInfo.services.map((service) => (
                      <div
                        key={service}
                        className="text-sm text-gray-600 flex items-center gap-1"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        {service}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccommodationAssistant;
