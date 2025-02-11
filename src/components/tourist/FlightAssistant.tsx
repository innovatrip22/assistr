
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Plane, Search } from "lucide-react";

interface FlightInfo {
  departure: string;
  arrival: string;
  time: string;
  gate: string;
  status: "On Time" | "Delayed" | "Boarding" | "Cancelled";
}

const FlightAssistant = () => {
  const [pnr, setPnr] = useState("");
  const [flightInfo, setFlightInfo] = useState<FlightInfo | null>(null);
  const { toast } = useToast();

  const handlePNRSearch = () => {
    if (pnr === "098765") {
      const statuses: FlightInfo["status"][] = [
        "On Time",
        "Delayed",
        "Boarding",
        "Cancelled",
      ];
      setFlightInfo({
        departure: "İstanbul (IST)",
        arrival: "Antalya (AYT)",
        time: "14:30",
        gate: "B7",
        status: statuses[Math.floor(Math.random() * statuses.length)],
      });
      toast({
        title: "PNR Bulundu",
        description: "Uçuş bilgileriniz görüntüleniyor.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "PNR Bulunamadı",
        description: "Lütfen geçerli bir PNR kodu giriniz.",
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Plane className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">Uçuş Asistanı</h2>
      </div>

      <Tabs defaultValue="pnr" className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="pnr" className="w-full">PNR Sorgula</TabsTrigger>
          <TabsTrigger value="search" className="w-full">Bilet Ara</TabsTrigger>
        </TabsList>

        <TabsContent value="pnr">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="PNR Kodu Giriniz"
                value={pnr}
                onChange={(e) => setPnr(e.target.value)}
              />
              <Button onClick={handlePNRSearch}>
                <Search className="w-4 h-4 mr-2" />
                Sorgula
              </Button>
            </div>

            {flightInfo && (
              <div className="mt-4 space-y-3 animate-fadeIn">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Kalkış</p>
                    <p className="font-medium">{flightInfo.departure}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Varış</p>
                    <p className="font-medium">{flightInfo.arrival}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Uçuş Saati</p>
                    <p className="font-medium">{flightInfo.time}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Kapı</p>
                    <p className="font-medium">{flightInfo.gate}</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Durum</p>
                  <p
                    className={`font-medium ${
                      flightInfo.status === "On Time"
                        ? "text-green-600"
                        : flightInfo.status === "Delayed"
                        ? "text-red-600"
                        : flightInfo.status === "Boarding"
                        ? "text-blue-600"
                        : "text-gray-600"
                    }`}
                  >
                    {flightInfo.status}
                  </p>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="search">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Nereden" />
              <Input placeholder="Nereye" />
              <Input type="date" placeholder="Gidiş Tarihi" />
              <Input type="date" placeholder="Dönüş Tarihi" />
            </div>
            <Button className="w-full">
              <Search className="w-4 h-4 mr-2" />
              Uçuş Ara
            </Button>
            <p className="text-sm text-gray-500 text-center">
              Bu özellik yakında hizmetinizde olacak.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FlightAssistant;
