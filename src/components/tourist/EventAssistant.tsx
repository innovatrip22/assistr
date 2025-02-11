import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const EventAssistant = () => {
  const upcomingEvents = [
    {
      title: "Antalya Film Festivali",
      date: "20 Mart 2024",
      location: "Kültür Merkezi",
      type: "Festival",
      rules: ["Bilet zorunludur", "Fotoğraf çekilebilir", "Smart casual kıyafet"],
    },
    {
      title: "Akdeniz Müzik Festivali",
      date: "25 Mart 2024",
      location: "Açık Hava Tiyatrosu",
      type: "Konser",
      rules: [
        "18 yaş sınırı vardır",
        "Bilet zorunludur",
        "Dışarıdan yiyecek/içecek alınmaz",
      ],
    },
  ];

  const handleBuyTicket = (eventTitle: string) => {
    window.open("https://www.biletix.com/search/" + encodeURIComponent(eventTitle), "_blank");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">Etkinlik Asistanı</h2>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="upcoming" className="w-full">
            Yaklaşan Etkinlikler
          </TabsTrigger>
          <TabsTrigger value="rules" className="w-full">
            Etkinlik Şartları
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.title}
                className="bg-accent p-4 rounded-lg space-y-2"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{event.title}</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBuyTicket(event.title)}
                  >
                    Bilet Al
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Tarih</p>
                    <p>{event.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Konum</p>
                    <p>{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Info className="w-4 h-4 text-primary" />
                  <p className="text-sm text-primary">{event.type}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rules">
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.title}
                className="bg-gray-50 p-4 rounded-lg space-y-2"
              >
                <h3 className="font-semibold">{event.title}</h3>
                <ul className="space-y-1">
                  {event.rules.map((rule) => (
                    <li key={rule} className="text-sm text-gray-600 flex gap-2">
                      <span className="text-primary">•</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventAssistant;
