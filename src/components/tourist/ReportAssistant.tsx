
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Ban, PhoneCall } from "lucide-react";
import { toast } from "sonner";
import { addReport } from "@/services/dataService";

const ReportAssistant = () => {
  const [priceReport, setPriceReport] = useState({
    businessName: "",
    productName: "",
    paidPrice: "",
    normalPrice: "",
    location: "",
    description: ""
  });
  
  const [fraudReport, setFraudReport] = useState({
    location: "",
    datetime: "",
    description: ""
  });

  const handlePriceReport = () => {
    if (!priceReport.businessName || !priceReport.productName || !priceReport.paidPrice || !priceReport.description) {
      toast.error("Lütfen gerekli alanları doldurun");
      return;
    }
    
    // Save price report to our database
    addReport({
      type: 'price',
      businessName: priceReport.businessName,
      productName: priceReport.productName,
      paidPrice: Number(priceReport.paidPrice),
      normalPrice: Number(priceReport.normalPrice),
      location: priceReport.location,
      description: priceReport.description
    });
    
    toast.success("Fahiş fiyat bildiriminiz alındı. İlgili birimlere iletilmiştir.");
    setPriceReport({
      businessName: "",
      productName: "",
      paidPrice: "",
      normalPrice: "",
      location: "",
      description: ""
    });
  };

  const handleFraudReport = () => {
    if (!fraudReport.location || !fraudReport.description) {
      toast.error("Lütfen gerekli alanları doldurun");
      return;
    }
    
    // Save fraud report to our database
    addReport({
      type: 'fraud',
      location: fraudReport.location,
      description: fraudReport.description
    });
    
    toast.success("Dolandırıcılık bildiriminiz alındı. İlgili birimlere iletilmiştir.");
    setFraudReport({
      location: "",
      datetime: "",
      description: ""
    });
  };

  const handleEmergencyCall = (number: string) => {
    // Log emergency call
    addReport({
      type: 'emergency',
      description: `Acil durum numarası arandı: ${number}`
    });
    
    // Open phone dialer
    window.location.href = `tel:${number}`;
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
                <button
                  key={item.number}
                  onClick={() => handleEmergencyCall(item.number)}
                  className="bg-gray-50 p-4 rounded-lg flex items-center gap-3 hover:bg-gray-100 transition-colors"
                >
                  <PhoneCall className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.number}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="price">
          <div className="space-y-4">
            <Input 
              placeholder="İşletme Adı" 
              value={priceReport.businessName}
              onChange={(e) => setPriceReport({...priceReport, businessName: e.target.value})}
              required
            />
            <Input 
              placeholder="Ürün/Hizmet Adı" 
              value={priceReport.productName}
              onChange={(e) => setPriceReport({...priceReport, productName: e.target.value})}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input 
                type="number" 
                placeholder="Ödenen Fiyat" 
                value={priceReport.paidPrice}
                onChange={(e) => setPriceReport({...priceReport, paidPrice: e.target.value})}
                required
              />
              <Input 
                type="number" 
                placeholder="Normal Fiyat" 
                value={priceReport.normalPrice}
                onChange={(e) => setPriceReport({...priceReport, normalPrice: e.target.value})}
              />
            </div>
            <Input 
              placeholder="Konum" 
              value={priceReport.location}
              onChange={(e) => setPriceReport({...priceReport, location: e.target.value})}
            />
            <textarea
              className="w-full p-2 border rounded-md h-32"
              placeholder="Detaylı açıklama..."
              value={priceReport.description}
              onChange={(e) => setPriceReport({...priceReport, description: e.target.value})}
              required
            />
            <Button onClick={handlePriceReport} className="w-full">
              <Ban className="w-4 h-4 mr-2" />
              Fahiş Fiyat Bildir
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="fraud">
          <div className="space-y-4">
            <Input 
              placeholder="Olay Yeri" 
              value={fraudReport.location}
              onChange={(e) => setFraudReport({...fraudReport, location: e.target.value})}
              required
            />
            <Input 
              type="datetime-local" 
              value={fraudReport.datetime}
              onChange={(e) => setFraudReport({...fraudReport, datetime: e.target.value})}
            />
            <textarea
              className="w-full p-2 border rounded-md h-32"
              placeholder="Olayı detaylı bir şekilde anlatın..."
              value={fraudReport.description}
              onChange={(e) => setFraudReport({...fraudReport, description: e.target.value})}
              required
            />
            <Button onClick={handleFraudReport} className="w-full">
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
