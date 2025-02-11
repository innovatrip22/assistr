
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Ban, PhoneCall } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ReportAssistant = () => {
  const [report, setReport] = useState({
    type: "",
    location: "",
    description: "",
  });
  const { toast } = useToast();

  const handleSubmit = () => {
    if (report.description.trim()) {
      toast({
        title: "Bildirim Alındı",
        description: "İlgili birimlere iletilmiştir.",
      });
      setReport({ type: "", location: "", description: "" });
    }
  };

  const emergencyNumbers = [
    { name: "Polis", number: "155" },
    { name: "Ambulans", number: "112" },
    { name: "İtfaiye", number: "110" },
    { name: "Jandarma", number: "156" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">Bildirme Asistanı</h2>
      </div>

      <Tabs defaultValue="emergency" className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="emergency" className="w-full">
            Acil Durum
          </TabsTrigger>
          <TabsTrigger value="price" className="w-full">
            Fahiş Fiyat
          </TabsTrigger>
          <TabsTrigger value="fraud" className="w-full">
            Dolandırıcılık
          </TabsTrigger>
        </TabsList>

        <TabsContent value="emergency">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {emergencyNumbers.map((item) => (
                <a
                  key={item.number}
                  href={`tel:${item.number}`}
                  className="bg-gray-50 p-4 rounded-lg flex items-center gap-3 hover:bg-gray-100 transition-colors"
                >
                  <PhoneCall className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.number}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="price">
          <div className="space-y-4">
            <Input placeholder="İşletme Adı" />
            <Input placeholder="Ürün/Hizmet Adı" />
            <div className="grid grid-cols-2 gap-4">
              <Input type="number" placeholder="Ödenen Fiyat" />
              <Input type="number" placeholder="Normal Fiyat" />
            </div>
            <Input placeholder="Konum" />
            <textarea
              className="w-full p-2 border rounded-md h-32"
              placeholder="Detaylı açıklama..."
              value={report.description}
              onChange={(e) =>
                setReport({ ...report, description: e.target.value })
              }
            />
            <Button onClick={handleSubmit} className="w-full">
              <Ban className="w-4 h-4 mr-2" />
              Fahiş Fiyat Bildir
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="fraud">
          <div className="space-y-4">
            <Input placeholder="Olay Yeri" />
            <Input type="datetime-local" />
            <textarea
              className="w-full p-2 border rounded-md h-32"
              placeholder="Olayı detaylı bir şekilde anlatın..."
              value={report.description}
              onChange={(e) =>
                setReport({ ...report, description: e.target.value })
              }
            />
            <Button onClick={handleSubmit} className="w-full">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Dolandırıcılık Bildir
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportAssistant;
