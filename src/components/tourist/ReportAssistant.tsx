
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Ban, PhoneCall, Bell } from "lucide-react";
import { toast } from "sonner";
import { addReport, getReports } from "@/services/dataService";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";

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
  
  const [myReports, setMyReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    if (user) {
      loadReports();
    }
  }, [user]);
  
  const loadReports = async () => {
    try {
      if (user) {
        const reports = await getReports(user.id);
        setMyReports(reports.slice(0, 3)); // For demo we'll just take first 3
      }
      setLoading(false);
    } catch (error) {
      console.error("Error loading reports:", error);
      setLoading(false);
    }
  };

  const handlePriceReport = async () => {
    if (!priceReport.businessName || !priceReport.productName || !priceReport.paidPrice || !priceReport.description) {
      toast.error("Lütfen gerekli alanları doldurun");
      return;
    }
    
    try {
      if (!user) {
        toast.error("Lütfen önce giriş yapın");
        return;
      }
      
      // Save price report to our database
      const report = await addReport({
        type: 'price',
        business_name: priceReport.businessName,
        product_name: priceReport.productName,
        paid_price: Number(priceReport.paidPrice),
        normal_price: Number(priceReport.normalPrice),
        location: priceReport.location,
        description: priceReport.description,
        user_id: user.id
      });
      
      // Update local reports list
      setMyReports(prev => [report, ...prev]);
      
      toast.success("Fahiş fiyat bildiriminiz alındı. İlgili birimlere iletilmiştir.");
      setPriceReport({
        businessName: "",
        productName: "",
        paidPrice: "",
        normalPrice: "",
        location: "",
        description: ""
      });
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("Rapor gönderilirken bir hata oluştu");
    }
  };

  const handleFraudReport = async () => {
    if (!fraudReport.location || !fraudReport.description) {
      toast.error("Lütfen gerekli alanları doldurun");
      return;
    }
    
    try {
      if (!user) {
        toast.error("Lütfen önce giriş yapın");
        return;
      }
      
      // Save fraud report to our database
      const report = await addReport({
        type: 'fraud',
        location: fraudReport.location,
        description: fraudReport.description,
        user_id: user.id
      });
      
      // Update local reports list
      setMyReports(prev => [report, ...prev]);
      
      toast.success("Dolandırıcılık bildiriminiz alındı. İlgili birimlere iletilmiştir.");
      setFraudReport({
        location: "",
        datetime: "",
        description: ""
      });
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("Rapor gönderilirken bir hata oluştu");
    }
  };

  const handleEmergencyCall = async (number: string) => {
    try {
      if (!user) {
        toast.error("Lütfen önce giriş yapın");
        return;
      }
      
      // Log emergency call
      const report = await addReport({
        type: 'emergency',
        description: `Acil durum numarası arandı: ${number}`,
        user_id: user.id
      });
      
      // Update local reports list
      setMyReports(prev => [report, ...prev]);
      
      // Open phone dialer
      window.location.href = `tel:${number}`;
    } catch (error) {
      console.error("Error logging emergency call:", error);
    }
  };

  const emergencyNumbers = [
    { name: "Polis", number: "155" },
    { name: "Ambulans", number: "112" },
    { name: "İtfaiye", number: "110" },
    { name: "Jandarma", number: "156" },
  ];

  if (loading && user) {
    return <div>Yükleniyor...</div>;
  }

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
          <TabsTrigger value="my-reports" className="w-full">
            Bildirimlerim
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
        
        <TabsContent value="my-reports">
          <ScrollArea className="h-[300px] pr-4">
            {myReports.length > 0 ? (
              <div className="space-y-4">
                {myReports.map((report, index) => (
                  <div 
                    key={index} 
                    className="border rounded-lg p-4"
                  >
                    <div className="flex justify-between mb-2">
                      <div>
                        <p className="font-medium">
                          {report.type === 'price' && 'Fahiş Fiyat Bildirimi'}
                          {report.type === 'fraud' && 'Dolandırıcılık Bildirimi'}
                          {report.type === 'emergency' && 'Acil Durum Bildirimi'}
                        </p>
                        {report.location && (
                          <p className="text-xs text-gray-500">{report.location}</p>
                        )}
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        report.status === 'pending' 
                          ? report.type === 'emergency' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {report.status === 'pending' ? 'Beklemede' : 'İşlendi'}
                      </div>
                    </div>
                    
                    {report.type === 'price' && (
                      <div className="mb-2 text-sm">
                        <p><span className="font-medium">İşletme:</span> {report.business_name}</p>
                        <p><span className="font-medium">Ürün:</span> {report.product_name}</p>
                        <p><span className="font-medium">Fiyat:</span> {report.paid_price} TL {report.normal_price ? `(Normal: ${report.normal_price} TL)` : ''}</p>
                      </div>
                    )}
                    
                    <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                    
                    {report.response && (
                      <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                        <div className="flex items-center gap-1 mb-1">
                          <Bell className="w-4 h-4 text-blue-500" />
                          <p className="text-sm font-medium text-blue-800">Yanıt:</p>
                        </div>
                        <p className="text-sm text-gray-600">{report.response}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Henüz gönderilen bildiriminiz bulunmuyor</p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportAssistant;
