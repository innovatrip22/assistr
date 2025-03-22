
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Building, 
  AlertTriangle, 
  MessageSquare, 
  DollarSign, 
  Users, 
  Clock, 
  CheckCircle,
  Map,
  FileBarChart,
  ShieldAlert
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import EmergencyReportsList from "../institution/EmergencyReportsList";
import PriceReportsList from "../institution/PriceReportsList";
import FraudReportsList from "../institution/FraudReportsList";
import FeedbackList from "../institution/FeedbackList";
import MapSection from "../institution/MapSection";

const InstitutionDemoPanel = ({ userData }: { userData?: any }) => {
  const [activeTab, setActiveTab] = useState("emergency");
  const [responseDialogOpen, setResponseDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [responseText, setResponseText] = useState("");
  const [assignTo, setAssignTo] = useState("");
  
  // Demo data
  const emergencyReports = [
    {
      id: "ER001",
      title: "Otel yangını",
      description: "Central Heights Otel'de küçük çaplı yangın çıktı.",
      location: "Girne, Merkez",
      status: "pending",
      priority: "high",
      timestamp: "2023-09-15T14:30:00",
      user_id: "user123",
      type: "emergency"
    },
    {
      id: "ER002",
      title: "Yol kazası",
      description: "Lefkoşa-Girne anayolunda trafik kazası meydana geldi.",
      location: "Lefkoşa-Girne Anayolu",
      status: "in_progress",
      priority: "high",
      timestamp: "2023-09-16T09:15:00",
      user_id: "user456",
      type: "emergency",
      assigned_to: "team_traffic"
    },
    {
      id: "ER003",
      title: "Gıda zehirlenmesi",
      description: "Sahil restoranında 5 turist gıda zehirlenmesi belirtileri gösteriyor.",
      location: "Magosa, Sahil Restoran",
      status: "resolved",
      priority: "medium",
      timestamp: "2023-09-14T20:45:00",
      user_id: "user789",
      type: "emergency",
      assigned_to: "team_health",
      response: "Sağlık ekipleri gönderildi, restoran geçici olarak kapatıldı."
    },
  ];

  const priceReports = [
    {
      id: "PR001",
      title: "Aşırı fiyatlandırma",
      description: "Sahil kafe normal fiyatın 3 katına çay satıyor.",
      business_name: "Blue Wave Cafe",
      product_name: "Çay",
      normal_price: 15,
      paid_price: 45,
      location: "Girne Marina",
      status: "pending",
      priority: "medium",
      timestamp: "2023-09-15T11:20:00",
      user_id: "user123",
      type: "price"
    },
    {
      id: "PR002",
      title: "Fiyat farkı",
      description: "Menüde yazan ve hesapta çıkan fiyatlar farklı.",
      business_name: "Sunset Restaurant",
      product_name: "Akşam yemeği",
      normal_price: 350,
      paid_price: 450,
      location: "Lefkoşa Merkez",
      status: "in_progress",
      priority: "medium",
      timestamp: "2023-09-16T19:30:00",
      user_id: "user456",
      type: "price",
      assigned_to: "price_control_team"
    },
  ];

  const fraudReports = [
    {
      id: "FR001",
      title: "Sahte tur operatörü",
      description: "Para alıp ortadan kaybolan tur operatörü.",
      business_name: "Cyprus Dream Tours",
      location: "Girne Limanı",
      status: "pending",
      priority: "high",
      timestamp: "2023-09-14T16:45:00",
      user_id: "user123",
      type: "fraud"
    },
    {
      id: "FR002",
      title: "Taksi dolandırıcılığı",
      description: "Taksimetre açmadan fazla ücret talep eden taksici.",
      business_name: "Bilinmiyor",
      location: "Ercan Havalimanı",
      status: "in_progress",
      priority: "medium",
      timestamp: "2023-09-15T22:10:00",
      user_id: "user456",
      type: "fraud",
      assigned_to: "fraud_investigation"
    },
  ];

  const feedbacks = [
    {
      id: "FB001",
      subject: "Turizm bilgilendirme merkezi",
      message: "Turizm ofisindeki personel çok yardımcısever ve bilgiliydi.",
      rating: 5,
      institution: "Turizm Bakanlığı",
      type: "compliment",
      status: "pending",
      timestamp: "2023-09-16T10:30:00",
      user_id: "user123"
    },
    {
      id: "FB002",
      subject: "Sahillerin temizliği",
      message: "Sahiller çok temiz ve bakımlı. Teşekkürler!",
      rating: 4,
      institution: "Belediye",
      type: "compliment",
      status: "responded",
      timestamp: "2023-09-15T12:20:00",
      user_id: "user456",
      response: "Değerli geri bildiriminiz için teşekkür ederiz. Kıbrıs'ta güzel zaman geçirmenizi dileriz.",
      response_timestamp: "2023-09-15T14:30:00"
    },
    {
      id: "FB003",
      subject: "Toplu taşıma sistemi",
      message: "Otobüsler çok seyrek ve zaman çizelgesi güvenilir değil.",
      rating: 2,
      institution: "Ulaştırma Bakanlığı",
      type: "complaint",
      status: "pending",
      timestamp: "2023-09-14T17:45:00",
      user_id: "user789"
    },
  ];

  const staff = [
    { id: "staff1", name: "Ahmet Yılmaz", department: "Acil Durum Ekibi", role: "Koordinatör" },
    { id: "staff2", name: "Ayşe Demir", department: "Fiyat Kontrol Ekibi", role: "Denetmen" },
    { id: "staff3", name: "Mehmet Kaya", department: "Dolandırıcılık İnceleme", role: "Soruşturmacı" },
    { id: "staff4", name: "Zeynep Öztürk", department: "Geri Bildirim Yönetimi", role: "İletişim Uzmanı" },
  ];

  const handleOpenResponseDialog = (item: any) => {
    setSelectedItem(item);
    setResponseText(item.response || "");
    setResponseDialogOpen(true);
  };

  const handleOpenAssignDialog = (item: any) => {
    setSelectedItem(item);
    setAssignTo(item.assigned_to || "");
    setAssignDialogOpen(true);
  };

  const handleSendResponse = () => {
    // Gerçek bir uygulamada API çağrısı yapılır
    toast.success(`${selectedItem.id} için yanıt gönderildi.`);
    setResponseDialogOpen(false);
    setResponseText("");
  };

  const handleAssignReport = () => {
    // Gerçek bir uygulamada API çağrısı yapılır
    toast.success(`${selectedItem.id} ${assignTo} yetkilisine atandı.`);
    setAssignDialogOpen(false);
    setAssignTo("");
  };

  const loadData = () => {
    // Veri yenileme fonksiyonu
    toast.success("Veriler yenilendi.");
  };

  // Mock implementations of required props
  const onOpenResponseDialog = handleOpenResponseDialog;
  const onAssignReport = handleOpenAssignDialog;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center">
            <Building className="mr-2 h-6 w-6" />
            Kurum Yönetim Paneli (Demo)
          </h2>
          <p className="text-muted-foreground">
            Bu panel kamu kurumlarına özel olan panelin demo versiyonudur.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
              Acil Durum Raporları
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{emergencyReports.filter(r => r.status === "pending").length}</div>
            <p className="text-sm text-muted-foreground">
              Bekleyen raporlar
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-yellow-500" />
              Fiyat Şikayetleri
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{priceReports.filter(r => r.status === "pending").length}</div>
            <p className="text-sm text-muted-foreground">
              Bekleyen incelemeler
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-blue-500" />
              Geri Bildirimler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{feedbacks.filter(f => f.status === "pending").length}</div>
            <p className="text-sm text-muted-foreground">
              Yanıtlanmamış bildirimler
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="emergency">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Acil Durumlar
          </TabsTrigger>
          <TabsTrigger value="price">
            <DollarSign className="mr-2 h-4 w-4" />
            Fiyat Şikayetleri
          </TabsTrigger>
          <TabsTrigger value="fraud">
            <ShieldAlert className="mr-2 h-4 w-4" />
            Dolandırıcılık
          </TabsTrigger>
          <TabsTrigger value="feedback">
            <MessageSquare className="mr-2 h-4 w-4" />
            Geri Bildirimler
          </TabsTrigger>
          <TabsTrigger value="map">
            <Map className="mr-2 h-4 w-4" />
            Harita
          </TabsTrigger>
          <TabsTrigger value="staff">
            <Users className="mr-2 h-4 w-4" />
            Personel
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="emergency" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Acil Durum Raporları</CardTitle>
              <CardDescription>
                Turistlerden gelen acil durum raporlarını görüntüleyin ve yönetin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EmergencyReportsList 
                onOpenResponseDialog={onOpenResponseDialog}
                onAssignReport={onAssignReport}
                loadData={loadData}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="price" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Fiyat Şikayetleri</CardTitle>
              <CardDescription>
                Turistlerden gelen aşırı fiyatlandırma şikayetlerini görüntüleyin ve yönetin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PriceReportsList 
                onOpenResponseDialog={onOpenResponseDialog}
                onAssignReport={onAssignReport}
                loadData={loadData}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="fraud" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Dolandırıcılık Raporları</CardTitle>
              <CardDescription>
                Turistlerden gelen dolandırıcılık ve sahtekarlık raporlarını görüntüleyin ve yönetin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FraudReportsList 
                onOpenResponseDialog={onOpenResponseDialog}
                onAssignReport={onAssignReport}
                loadData={loadData}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="feedback" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Geri Bildirimler</CardTitle>
              <CardDescription>
                Turistlerden gelen genel geri bildirimleri görüntüleyin ve yanıtlayın.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FeedbackList 
                onOpenResponseDialog={onOpenResponseDialog}
                loadData={loadData}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="map" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Harita Görünümü</CardTitle>
              <CardDescription>
                Turistlerin konumlarını ve yoğunluk haritasını görüntüleyin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MapSection />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="staff" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Personel Yönetimi</CardTitle>
              <CardDescription>
                Kurum çalışanlarının listesi ve görev durumları.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {staff.map((person) => (
                  <Card key={person.id}>
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <div className="font-medium">{person.name}</div>
                        <div className="text-sm text-muted-foreground">{person.department}</div>
                        <Badge className="mt-1">{person.role}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Görevleri Görüntüle
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Yanıt Dialog */}
      <Dialog open={responseDialogOpen} onOpenChange={setResponseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yanıt Gönder</DialogTitle>
            <DialogDescription>
              {selectedItem?.title || selectedItem?.subject} için yanıtınızı yazın.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="response">Yanıt</Label>
              <Textarea
                id="response"
                placeholder="Yanıtınızı buraya yazın..."
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setResponseDialogOpen(false)}>
              İptal
            </Button>
            <Button onClick={handleSendResponse}>Yanıt Gönder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Atama Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Personel Ata</DialogTitle>
            <DialogDescription>
              {selectedItem?.title} için sorumlu personel seçin.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="assignTo">Personel</Label>
              <select
                id="assignTo"
                className="w-full rounded-md border border-input bg-background p-2"
                value={assignTo}
                onChange={(e) => setAssignTo(e.target.value)}
              >
                <option value="">Seçiniz...</option>
                <option value="team_emergency">Acil Durum Ekibi</option>
                <option value="team_traffic">Trafik Ekibi</option>
                <option value="team_health">Sağlık Ekibi</option>
                <option value="price_control_team">Fiyat Denetim Ekibi</option>
                <option value="fraud_investigation">Dolandırıcılık İnceleme</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notlar (Opsiyonel)</Label>
              <Textarea
                id="notes"
                placeholder="Ekip için notlar..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>
              İptal
            </Button>
            <Button onClick={handleAssignReport}>Görevlendir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InstitutionDemoPanel;
