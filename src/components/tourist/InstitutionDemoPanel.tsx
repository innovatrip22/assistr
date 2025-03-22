
import { useState, useEffect } from "react";
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
  ShieldAlert,
  FileText,
  Calendar,
  Settings,
  Zap,
  BarChart3,
  Hammer,
  Droplet
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import EmergencyReportsList from "../institution/EmergencyReportsList";
import PriceReportsList from "../institution/PriceReportsList";
import FraudReportsList from "../institution/FraudReportsList";
import FeedbackList from "../institution/FeedbackList";
import MapSection from "../institution/MapSection";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

const InstitutionDemoPanel = ({ userData }: { userData?: any }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [responseDialogOpen, setResponseDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [responseText, setResponseText] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  
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
    { id: "staff5", name: "Ali Can", department: "Elektrik Arıza Ekibi", role: "Teknisyen" },
    { id: "staff6", name: "Fatma Yıldız", department: "Su İşleri", role: "Mühendis" },
    { id: "staff7", name: "Kemal Doğan", department: "Altyapı Bakım", role: "Şef" },
    { id: "staff8", name: "Sevgi Kara", department: "Tahsilat Birimi", role: "Muhasebeci" },
  ];

  const announcements = [
    { id: "ann1", title: "Elektrik Kesintisi Duyurusu", content: "22 Eylül tarihinde 09:00-14:00 saatleri arasında Lefkoşa merkez bölgesinde planlı elektrik kesintisi uygulanacaktır.", date: "2023-09-18", type: "electricity" },
    { id: "ann2", title: "Su Kesintisi Duyurusu", content: "23 Eylül tarihinde 10:00-16:00 saatleri arasında Girne sahil bölgesinde bakım çalışmaları nedeniyle su kesintisi olacaktır.", date: "2023-09-19", type: "water" },
    { id: "ann3", title: "Turizm Festivali", content: "25-30 Eylül tarihleri arasında Gazimağusa'da Uluslararası Turizm ve Kültür Festivali düzenlenecektir.", date: "2023-09-20", type: "tourism" },
    { id: "ann4", title: "Belediye Hizmet Binası Taşınıyor", content: "1 Ekim tarihinden itibaren Lefkoşa Belediyesi yeni hizmet binasında faaliyetlerine devam edecektir.", date: "2023-09-21", type: "municipality" },
  ];

  const electricityFaults = [
    { id: "ef1", title: "Sokak Lambası Arızası", location: "Lefkoşa, Dereboyu Caddesi", status: "pending", priority: "medium", timestamp: "2023-09-18T09:30:00", reporter: "Vatandaş", assignedTo: "Ali Can" },
    { id: "ef2", title: "Elektrik Direği Hasarı", location: "Girne, Harbour Bölgesi", status: "in_progress", priority: "high", timestamp: "2023-09-17T14:20:00", reporter: "Devriye Ekibi", assignedTo: "Teknik Ekip" },
    { id: "ef3", title: "Voltaj Dalgalanması", location: "Gazimağusa, Üniversite Bölgesi", status: "resolved", priority: "high", timestamp: "2023-09-16T08:15:00", reporter: "Birden Fazla Vatandaş", assignedTo: "Mühendislik Ekibi" },
  ];
  
  const applications = [
    { id: "app1", title: "Elektrik Aboneliği Başvurusu", applicant: "Mehmet Demir", status: "pending", date: "2023-09-15", type: "new_subscription" },
    { id: "app2", title: "Su Aboneliği Taşıma", applicant: "Ayşe Kaya", status: "in_review", date: "2023-09-16", type: "transfer" },
    { id: "app3", title: "İş Yeri Ruhsatı", applicant: "Ali Yılmaz", status: "approved", date: "2023-09-14", type: "business_permit" },
    { id: "app4", title: "Turizm İşletme Belgesi", applicant: "Zeynep Öz", status: "pending", date: "2023-09-17", type: "tourism_license" },
  ];
  
  const documents = [
    { id: "doc1", title: "2023 Elektrik Altyapı Planı", type: "pdf", size: "2.4 MB", updated: "2023-08-10", department: "Elektrik İşleri" },
    { id: "doc2", title: "Su Şebekesi Haritası", type: "dwg", size: "5.1 MB", updated: "2023-07-22", department: "Su İşleri" },
    { id: "doc3", title: "Turizm İstatistikleri Raporu", type: "xlsx", size: "1.8 MB", updated: "2023-09-05", department: "Turizm Bakanlığı" },
    { id: "doc4", title: "Belediye Meclis Kararları", type: "pdf", size: "3.2 MB", updated: "2023-09-12", department: "Belediye" },
  ];
  
  const events = [
    { id: "evt1", title: "Elektrik Teknisyenleri Eğitimi", date: "2023-10-05", time: "09:00-16:00", location: "Lefkoşa Teknik Üniversitesi", department: "Elektrik İşleri" },
    { id: "evt2", title: "Su Tasarrufu Sempozyumu", date: "2023-10-12", time: "10:00-15:00", location: "Girne Kültür Merkezi", department: "Su İşleri" },
    { id: "evt3", title: "Turizm Çalıştayı", date: "2023-10-18", time: "09:30-17:30", location: "Gazimağusa Kongre Merkezi", department: "Turizm" },
    { id: "evt4", title: "Belediye Personel Toplantısı", date: "2023-09-25", time: "14:00-16:00", location: "Belediye Binası", department: "Belediye" },
  ];
  
  const consumptionData = [
    { month: "Ocak", electricity: 450, water: 320 },
    { month: "Şubat", electricity: 420, water: 300 },
    { month: "Mart", electricity: 480, water: 350 },
    { month: "Nisan", electricity: 520, water: 380 },
    { month: "Mayıs", electricity: 580, water: 420 },
    { month: "Haziran", electricity: 650, water: 480 },
    { month: "Temmuz", electricity: 720, water: 550 },
    { month: "Ağustos", electricity: 750, water: 580 },
    { month: "Eylül", electricity: 680, water: 520 },
    { month: "Ekim", electricity: 590, water: 450 },
    { month: "Kasım", electricity: 510, water: 380 },
    { month: "Aralık", electricity: 470, water: 340 },
  ];
  
  const investmentData = [
    { name: "Elektrik Altyapısı", value: 35 },
    { name: "Su Altyapısı", value: 25 },
    { name: "Yol Çalışmaları", value: 20 },
    { name: "Turizm Tesisleri", value: 15 },
    { name: "Diğer", value: 5 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  const collectionData = [
    { month: "Ocak", collected: 780000, target: 850000 },
    { month: "Şubat", collected: 820000, target: 850000 },
    { month: "Mart", collected: 880000, target: 900000 },
    { month: "Nisan", collected: 890000, target: 900000 },
    { month: "Mayıs", collected: 940000, target: 950000 },
    { month: "Haziran", collected: 980000, target: 950000 },
    { month: "Temmuz", collected: 990000, target: 1000000 },
    { month: "Ağustos", collected: 1050000, target: 1000000 },
    { month: "Eylül", collected: 920000, target: 950000 },
  ];

  const userManagementData = [
    { id: "user1", name: "Ahmet Yılmaz", email: "ahmet.yilmaz@kurum.gov.ct", role: "Admin", department: "Bilgi İşlem", lastLogin: "2023-09-20 09:45" },
    { id: "user2", name: "Ayşe Demir", email: "ayse.demir@kurum.gov.ct", role: "Supervisor", department: "Elektrik İşleri", lastLogin: "2023-09-19 14:30" },
    { id: "user3", name: "Mehmet Kaya", email: "mehmet.kaya@kurum.gov.ct", role: "Technician", department: "Su İşleri", lastLogin: "2023-09-20 08:15" },
    { id: "user4", name: "Zeynep Öztürk", email: "zeynep.ozturk@kurum.gov.ct", role: "Manager", department: "Turizm", lastLogin: "2023-09-18 16:20" },
    { id: "user5", name: "Ali Can", email: "ali.can@kurum.gov.ct", role: "User", department: "Belediye", lastLogin: "2023-09-20 10:05" },
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

  const handleAddAnnouncement = () => {
    toast.success("Duyuru başarıyla eklendi.");
  };

  const handleAddDocument = () => {
    toast.success("Evrak başarıyla eklendi.");
  };

  const handleAddEvent = () => {
    toast.success("Etkinlik başarıyla eklendi.");
  };

  const handleProcessApplication = (appId: string, action: 'approve' | 'reject') => {
    toast.success(`Başvuru ${action === 'approve' ? 'onaylandı' : 'reddedildi'}.`);
  };

  const handleUserAction = (userId: string, action: string) => {
    toast.success(`Kullanıcı ${action} işlemi başarıyla gerçekleştirildi.`);
  };

  const handleSystemSettingSave = () => {
    toast.success("Sistem ayarları başarıyla kaydedildi.");
  };

  const handleResolveElectricityFault = (faultId: string) => {
    toast.success(`Arıza #${faultId} başarıyla çözüldü olarak işaretlendi.`);
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
        <div className="flex items-center space-x-2">
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Birim Seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Birimler</SelectItem>
              <SelectItem value="electricity">Elektrik İşleri</SelectItem>
              <SelectItem value="water">Su İşleri</SelectItem>
              <SelectItem value="tourism">Turizm</SelectItem>
              <SelectItem value="municipality">Belediye</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={loadData} variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Verileri Yenile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
              Acil Durumlar
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
              <FileText className="mr-2 h-5 w-5 text-blue-500" />
              Başvurular
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{applications.filter(a => a.status === "pending").length}</div>
            <p className="text-sm text-muted-foreground">
              İşlem bekleyen başvurular
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Zap className="mr-2 h-5 w-5 text-yellow-500" />
              Elektrik Arızaları
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{electricityFaults.filter(f => f.status === "pending").length}</div>
            <p className="text-sm text-muted-foreground">
              Bekleyen arıza bildirimleri
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-green-500" />
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
        <TabsList className="mb-4 flex flex-wrap">
          <TabsTrigger value="dashboard">
            <BarChart3 className="mr-2 h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="feedback">
            <MessageSquare className="mr-2 h-4 w-4" />
            Geri Bildirimler
          </TabsTrigger>
          <TabsTrigger value="report">
            <FileBarChart className="mr-2 h-4 w-4" />
            Raporlama
          </TabsTrigger>
          <TabsTrigger value="userManagement">
            <Users className="mr-2 h-4 w-4" />
            Kullanıcı Yönetimi
          </TabsTrigger>
          <TabsTrigger value="applications">
            <FileText className="mr-2 h-4 w-4" />
            Başvuru Takibi
          </TabsTrigger>
          <TabsTrigger value="announcements">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Duyuru Yönetimi
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="mr-2 h-4 w-4" />
            Evrak Yönetimi
          </TabsTrigger>
          <TabsTrigger value="events">
            <Calendar className="mr-2 h-4 w-4" />
            Etkinlikler
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4" />
            Sistem Ayarları
          </TabsTrigger>
          <TabsTrigger value="electricityFaults">
            <Zap className="mr-2 h-4 w-4" />
            Elektrik Arıza Yönetimi
          </TabsTrigger>
          <TabsTrigger value="consumption">
            <BarChart3 className="mr-2 h-4 w-4" />
            Tüketim & Sayaç Yönetimi
          </TabsTrigger>
          <TabsTrigger value="collection">
            <DollarSign className="mr-2 h-4 w-4" />
            Borç & Tahsilat Raporları
          </TabsTrigger>
          <TabsTrigger value="investment">
            <Hammer className="mr-2 h-4 w-4" />
            Yatırım & Altyapı
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Genel Durum</CardTitle>
              <CardDescription>
                Kurum genelinde önemli göstergelerin özeti
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Başvuru İstatistikleri</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={[
                        { name: "Elektrik", pending: 12, inProgress: 8, resolved: 24 },
                        { name: "Su", pending: 8, inProgress: 5, resolved: 18 },
                        { name: "Turizm", pending: 15, inProgress: 10, resolved: 27 },
                        { name: "Belediye", pending: 10, inProgress: 7, resolved: 22 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pending" name="Bekleyen" fill="#ff8042" />
                        <Bar dataKey="inProgress" name="İşlemde" fill="#8884d8" />
                        <Bar dataKey="resolved" name="Tamamlanan" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Tüketim Verileri</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-end mb-2">
                      <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Periyot" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="week">Haftalık</SelectItem>
                          <SelectItem value="month">Aylık</SelectItem>
                          <SelectItem value="year">Yıllık</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={consumptionData.slice(0, 6)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="electricity" name="Elektrik (MWh)" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="water" name="Su (m³ bin)" stroke="#82ca9d" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-md">Acil Durum Bildirimleri</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {emergencyReports.slice(0, 2).map(report => (
                        <div key={report.id} className="border-b pb-3">
                          <div className="flex justify-between">
                            <div className="font-medium">{report.title}</div>
                            <Badge variant={
                              report.priority === "high" ? "destructive" : 
                              report.priority === "medium" ? "default" : "outline"
                            }>
                              {report.priority === "high" ? "Yüksek" : 
                               report.priority === "medium" ? "Orta" : "Düşük"}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">{report.location}</div>
                          <div className="flex justify-between items-center mt-2">
                            <div className="text-xs text-muted-foreground">
                              {new Date(report.timestamp).toLocaleString('tr-TR')}
                            </div>
                            <Badge variant={
                              report.status === "pending" ? "outline" : 
                              report.status === "in_progress" ? "secondary" : "success"
                            }>
                              {report.status === "pending" ? "Bekliyor" : 
                               report.status === "in_progress" ? "İşlemde" : "Çözüldü"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" className="w-full">
                        Tümünü Görüntüle
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-md">Elektrik Arızaları</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {electricityFaults.slice(0, 2).map(fault => (
                        <div key={fault.id} className="border-b pb-3">
                          <div className="flex justify-between">
                            <div className="font-medium">{fault.title}</div>
                            <Badge variant={
                              fault.priority === "high" ? "destructive" : 
                              fault.priority === "medium" ? "default" : "outline"
                            }>
                              {fault.priority === "high" ? "Yüksek" : 
                               fault.priority === "medium" ? "Orta" : "Düşük"}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">{fault.location}</div>
                          <div className="flex justify-between items-center mt-2">
                            <div className="text-xs text-muted-foreground">
                              {new Date(fault.timestamp).toLocaleString('tr-TR')}
                            </div>
                            <Badge variant={
                              fault.status === "pending" ? "outline" : 
                              fault.status === "in_progress" ? "secondary" : "success"
                            }>
                              {fault.status === "pending" ? "Bekliyor" : 
                               fault.status === "in_progress" ? "İşlemde" : "Çözüldü"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" className="w-full">
                        Tümünü Görüntüle
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-md">Son Duyurular</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {announcements.slice(0, 2).map(announcement => (
                        <div key={announcement.id} className="border-b pb-3">
                          <div className="flex justify-between">
                            <div className="font-medium">{announcement.title}</div>
                            <Badge>
                              {announcement.type === "electricity" ? "Elektrik" : 
                               announcement.type === "water" ? "Su" : 
                               announcement.type === "tourism" ? "Turizm" : "Belediye"}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {announcement.content}
                          </div>
                          <div className="text-xs text-muted-foreground mt-2">
                            {announcement.date}
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" className="w-full">
                        Tümünü Görüntüle
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="feedback" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Geri Bildirimler</CardTitle>
              <CardDescription>
                Turistlerden ve vatandaşlardan gelen geri bildirimleri görüntüleyin ve yanıtlayın.
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
        
        <TabsContent value="report" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Raporlama</CardTitle>
              <CardDescription>
                Kurum faaliyetleri ve istatistiklerle ilgili raporlar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="emergency">
                <TabsList className="mb-4">
                  <TabsTrigger value="emergency">Acil Durumlar</TabsTrigger>
                  <TabsTrigger value="price">Fiyat Şikayetleri</TabsTrigger>
                  <TabsTrigger value="fraud">Dolandırıcılık</TabsTrigger>
                  <TabsTrigger value="custom">Özel Raporlar</TabsTrigger>
                </TabsList>
                
                <TabsContent value="emergency">
                  <EmergencyReportsList 
                    onOpenResponseDialog={onOpenResponseDialog}
                    onAssignReport={onAssignReport}
                    loadData={loadData}
                  />
                </TabsContent>
                
                <TabsContent value="price">
                  <PriceReportsList 
                    onOpenResponseDialog={onOpenResponseDialog}
                    onAssignReport={onAssignReport}
                    loadData={loadData}
                  />
                </TabsContent>
                
                <TabsContent value="fraud">
                  <FraudReportsList 
                    onOpenResponseDialog={onOpenResponseDialog}
                    onAssignReport={onAssignReport}
                    loadData={loadData}
                  />
                </TabsContent>
                
                <TabsContent value="custom">
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:justify-between md:space-x-4">
                      <div className="space-y-2 mb-4 md:mb-0">
                        <Label htmlFor="reportType">Rapor Türü</Label>
                        <Select defaultValue="visitor">
                          <SelectTrigger id="reportType" className="w-full md:w-[250px]">
                            <SelectValue placeholder="Rapor Türü Seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="visitor">Ziyaretçi İstatistikleri</SelectItem>
                            <SelectItem value="financial">Finansal Rapor</SelectItem>
                            <SelectItem value="personnel">Personel Performansı</SelectItem>
                            <SelectItem value="infrastructure">Altyapı Durum Raporu</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2 mb-4 md:mb-0">
                        <Label htmlFor="reportPeriod">Zaman Aralığı</Label>
                        <Select defaultValue="month">
                          <SelectTrigger id="reportPeriod" className="w-full md:w-[250px]">
                            <SelectValue placeholder="Zaman Aralığı Seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="day">Günlük</SelectItem>
                            <SelectItem value="week">Haftalık</SelectItem>
                            <SelectItem value="month">Aylık</SelectItem>
                            <SelectItem value="quarter">3 Aylık</SelectItem>
                            <SelectItem value="year">Yıllık</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2 mb-4 md:mb-0">
                        <Label htmlFor="reportFormat">Çıktı Formatı</Label>
                        <Select defaultValue="pdf">
                          <SelectTrigger id="reportFormat" className="w-full md:w-[250px]">
                            <SelectValue placeholder="Format Seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                            <SelectItem value="csv">CSV</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-end">
                        <Button>Rapor Oluştur</Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">Önceden Oluşturulmuş Raporlar</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center border-b pb-2">
                          <div>
                            <span className="font-medium">Aylık Turizm İstatistikleri</span>
                            <p className="text-sm text-muted-foreground">Ağustos 2023</p>
                          </div>
                          <Button variant="outline" size="sm">İndir</Button>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                          <div>
                            <span className="font-medium">Elektrik Tüketim Raporu</span>
                            <p className="text-sm text-muted-foreground">Q3 2023</p>
                          </div>
                          <Button variant="outline" size="sm">İndir</Button>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                          <div>
                            <span className="font-medium">Turist Şikayet Analizi</span>
                            <p className="text-sm text-muted-foreground">Yaz 2023</p>
                          </div>
                          <Button variant="outline" size="sm">İndir</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="userManagement" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Kullanıcı Yönetimi</CardTitle>
              <CardDescription>
                Kurum personeli kullanıcı hesaplarını yönetin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  <Input placeholder="Kullanıcı ara..." className="w-[250px]" />
                  <Button variant="outline" size="sm">Ara</Button>
                </div>
                <Button>
                  <Users className="mr-2 h-4 w-4" />
                  Yeni Kullanıcı Ekle
                </Button>
              </div>
              
              <div className="rounded-md border">
                <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b bg-muted/50">
                  <div>İsim</div>
                  <div>E-posta</div>
                  <div>Rol</div>
                  <div>Departman</div>
                  <div>Son Giriş</div>
                  <div>İşlemler</div>
                </div>
                
                {userManagementData.map(user => (
                  <div key={user.id} className="grid grid-cols-6 gap-4 p-4 border-b">
                    <div>{user.name}</div>
                    <div className="text-sm">{user.email}</div>
                    <div>
                      <Badge variant={
                        user.role === "Admin" ? "destructive" : 
                        user.role === "Manager" || user.role === "Supervisor" ? "default" : "outline"
                      }>
                        {user.role}
                      </Badge>
                    </div>
                    <div>{user.department}</div>
                    <div className="text-sm text-muted-foreground">{user.lastLogin}</div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleUserAction(user.id, "düzenleme")}>
                        Düzenle
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleUserAction(user.id, "pasif")}>
                        Pasif Et
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-between">
                <div className="text-sm text-muted-foreground">Toplam 5 kullanıcıdan 1-5 arası gösteriliyor</div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" disabled>Önceki</Button>
                  <Button variant="outline" size="sm" disabled>Sonraki</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="applications" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Başvuru Takibi</CardTitle>
              <CardDescription>
                Vatandaş ve işletme başvurularını görüntüleyin ve yönetin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Başvuru Tipi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tüm Başvurular</SelectItem>
                      <SelectItem value="new_subscription">Yeni Abonelik</SelectItem>
                      <SelectItem value="transfer">Abonelik Taşıma</SelectItem>
                      <SelectItem value="business_permit">İş Yeri Ruhsatı</SelectItem>
                      <SelectItem value="tourism_license">Turizm Lisansı</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Durum" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tüm Durumlar</SelectItem>
                      <SelectItem value="pending">Bekleyen</SelectItem>
                      <SelectItem value="in_review">İncelemede</SelectItem>
                      <SelectItem value="approved">Onaylandı</SelectItem>
                      <SelectItem value="rejected">Reddedildi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={loadData} variant="outline" size="sm">
                  <Clock className="mr-2 h-4 w-4" />
                  Yenile
                </Button>
              </div>
              
              <div className="rounded-md border">
                <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b bg-muted/50">
                  <div>Başvuru</div>
                  <div>Başvuran</div>
                  <div>Tarih</div>
                  <div>Durum</div>
                  <div>İşlemler</div>
                </div>
                
                {applications.map(app => (
                  <div key={app.id} className="grid grid-cols-5 gap-4 p-4 border-b">
                    <div>
                      <div className="font-medium">{app.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {app.type === "new_subscription" ? "Yeni Abonelik" : 
                         app.type === "transfer" ? "Abonelik Taşıma" : 
                         app.type === "business_permit" ? "İş Yeri Ruhsatı" : "Turizm Lisansı"}
                      </div>
                    </div>
                    <div>{app.applicant}</div>
                    <div>{app.date}</div>
                    <div>
                      <Badge variant={
                        app.status === "pending" ? "outline" : 
                        app.status === "in_review" ? "secondary" : 
                        app.status === "approved" ? "success" : "destructive"
                      }>
                        {app.status === "pending" ? "Bekliyor" : 
                         app.status === "in_review" ? "İncelemede" : 
                         app.status === "approved" ? "Onaylandı" : "Reddedildi"}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        disabled={app.status === "approved" || app.status === "rejected"}
                        onClick={() => handleOpenResponseDialog(app)}
                      >
                        İncele
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm"
                        disabled={app.status === "approved" || app.status === "rejected"}
                        onClick={() => handleProcessApplication(app.id, 'approve')}
                      >
                        Onayla
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        disabled={app.status === "approved" || app.status === "rejected"}
                        onClick={() => handleProcessApplication(app.id, 'reject')}
                      >
                        Reddet
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="announcements" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Duyuru Yönetimi</CardTitle>
              <CardDescription>
                Kurumsal duyuruları oluşturun ve yönetin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Yeni Duyuru Ekle</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="annTitle">Duyuru Başlığı</Label>
                          <Input id="annTitle" placeholder="Başlık girin" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="annContent">Duyuru İçeriği</Label>
                          <Textarea id="annContent" placeholder="Duyuru içeriği..." rows={5} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="annType">Duyuru Tipi</Label>
                          <Select defaultValue="general">
                            <SelectTrigger id="annType">
                              <SelectValue placeholder="Duyuru tipi seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">Genel</SelectItem>
                              <SelectItem value="electricity">Elektrik</SelectItem>
                              <SelectItem value="water">Su</SelectItem>
                              <SelectItem value="tourism">Turizm</SelectItem>
                              <SelectItem value="municipality">Belediye</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="annDate">Yayın Tarihi</Label>
                          <Input id="annDate" type="date" />
                        </div>
                        <Button className="w-full" onClick={handleAddAnnouncement}>Duyuru Ekle</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Mevcut Duyurular</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {announcements.map(ann => (
                          <Card key={ann.id}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="font-medium">{ann.title}</div>
                                  <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                    {ann.content}
                                  </div>
                                  <div className="text-xs text-muted-foreground mt-2">
                                    Yayın Tarihi: {ann.date}
                                  </div>
                                </div>
                                <Badge>
                                  {ann.type === "electricity" ? "Elektrik" : 
                                   ann.type === "water" ? "Su" : 
                                   ann.type === "tourism" ? "Turizm" : 
                                   ann.type === "municipality" ? "Belediye" : "Genel"}
                                </Badge>
                              </div>
                              <div className="flex justify-end space-x-2 mt-3">
                                <Button variant="outline" size="sm">Düzenle</Button>
                                <Button variant="destructive" size="sm">Kaldır</Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Evrak Yönetimi</CardTitle>
              <CardDescription>
                Kurumsal evrakları ve dökümanları yönetin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Yeni Evrak Yükle</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="docTitle">Evrak Başlığı</Label>
                          <Input id="docTitle" placeholder="Başlık girin" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="docDepartment">Departman</Label>
                          <Select defaultValue="general">
                            <SelectTrigger id="docDepartment">
                              <SelectValue placeholder="Departman seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">Genel</SelectItem>
                              <SelectItem value="electricity">Elektrik İşleri</SelectItem>
                              <SelectItem value="water">Su İşleri</SelectItem>
                              <SelectItem value="tourism">Turizm</SelectItem>
                              <SelectItem value="municipality">Belediye</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="docType">Evrak Tipi</Label>
                          <Select defaultValue="pdf">
                            <SelectTrigger id="docType">
                              <SelectValue placeholder="Evrak tipi seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pdf">PDF</SelectItem>
                              <SelectItem value="doc">Word Belgesi</SelectItem>
                              <SelectItem value="xlsx">Excel Dosyası</SelectItem>
                              <SelectItem value="dwg">CAD Dosyası</SelectItem>
                              <SelectItem value="other">Diğer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="docUpload">Dosya Yükle</Label>
                          <div className="border-2 border-dashed border-muted-foreground/25 rounded-md p-6 text-center cursor-pointer hover:bg-muted transition-colors">
                            <FileText className="h-10 w-10 text-muted-foreground/50 mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">
                              Dosyayı buraya sürükleyin veya tıklayın
                            </p>
                            <input type="file" className="hidden" id="docUpload" />
                          </div>
                        </div>
                        <Button className="w-full" onClick={handleAddDocument}>Evrak Yükle</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Mevcut Evraklar</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {documents.map(doc => (
                          <Card key={doc.id}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div className="flex items-center">
                                  <FileText className="h-8 w-8 mr-2 text-blue-500" />
                                  <div>
                                    <div className="font-medium">{doc.title}</div>
                                    <div className="text-xs text-muted-foreground mt-1">
                                      {doc.type.toUpperCase()} · {doc.size} · Son Güncelleme: {doc.updated}
                                    </div>
                                    <div className="text-xs mt-1">
                                      <Badge variant="outline">{doc.department}</Badge>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <Button variant="outline" size="sm">İndir</Button>
                                  <Button variant="destructive" size="sm">Sil</Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="events" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Etkinlikler</CardTitle>
              <CardDescription>
                Kurumsal etkinlikleri planlayın ve yönetin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Yeni Etkinlik Oluştur</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="eventTitle">Etkinlik Başlığı</Label>
                          <Input id="eventTitle" placeholder="Başlık girin" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="eventDate">Tarih</Label>
                            <Input id="eventDate" type="date" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="eventTime">Saat</Label>
                            <Input id="eventTime" placeholder="10:00-16:00" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="eventLocation">Konum</Label>
                          <Input id="eventLocation" placeholder="Etkinlik konumu" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="eventDepartment">Departman</Label>
                          <Select defaultValue="general">
                            <SelectTrigger id="eventDepartment">
                              <SelectValue placeholder="Departman seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">Genel</SelectItem>
                              <SelectItem value="electricity">Elektrik İşleri</SelectItem>
                              <SelectItem value="water">Su İşleri</SelectItem>
                              <SelectItem value="tourism">Turizm</SelectItem>
                              <SelectItem value="municipality">Belediye</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="eventDetails">Detaylar</Label>
                          <Textarea id="eventDetails" placeholder="Etkinlik detayları..." rows={3} />
                        </div>
                        <Button className="w-full" onClick={handleAddEvent}>Etkinlik Oluştur</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Yaklaşan Etkinlikler</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {events.map(event => (
                          <Card key={event.id}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="font-medium">{event.title}</div>
                                  <div className="text-sm mt-1">
                                    <Calendar className="h-3 w-3 inline mr-1" />
                                    {event.date} · <Clock className="h-3 w-3 inline mr-1 ml-1" />{event.time}
                                  </div>
                                  <div className="text-sm text-muted-foreground mt-1">
                                    {event.location}
                                  </div>
                                  <div className="text-xs mt-2">
                                    <Badge variant="outline">{event.department}</Badge>
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <Button variant="outline" size="sm">Düzenle</Button>
                                  <Button variant="destructive" size="sm">İptal</Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Sistem Ayarları</CardTitle>
              <CardDescription>
                Kurumsal sistem yapılandırma ve ayarlarını yönetin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Genel Ayarlar</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="institutionName">Kurum Adı</Label>
                        <Input id="institutionName" defaultValue="KKTC Elektrik Kurumu" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="institutionEmail">Kurumsal E-posta</Label>
                        <Input id="institutionEmail" defaultValue="info@kktcelektrik.gov.ct" type="email" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="institutionPhone">Telefon</Label>
                        <Input id="institutionPhone" defaultValue="+90 392 123 45 67" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="institutionAddress">Adres</Label>
                        <Input id="institutionAddress" defaultValue="Lefkoşa, KKTC" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="institutionLogo">Logo</Label>
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-muted flex items-center justify-center rounded">
                          <Building className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <Button variant="outline">Logo Değiştir</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Bildirim Ayarları</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">E-posta Bildirimleri</h4>
                        <p className="text-sm text-muted-foreground">Yeni raporlar e-posta ile bildirilsin</p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">SMS Bildirimleri</h4>
                        <p className="text-sm text-muted-foreground">Acil durumlar SMS ile bildirilsin</p>
                      </div>
                      <Switch id="sms-notifications" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Sistem Bildirimleri</h4>
                        <p className="text-sm text-muted-foreground">Panel içi bildirimleri aktif et</p>
                      </div>
                      <Switch id="system-notifications" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Veri Yedekleme</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="backupFrequency">Yedekleme Sıklığı</Label>
                        <Select defaultValue="daily">
                          <SelectTrigger id="backupFrequency">
                            <SelectValue placeholder="Yedekleme sıklığı seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Saatlik</SelectItem>
                            <SelectItem value="daily">Günlük</SelectItem>
                            <SelectItem value="weekly">Haftalık</SelectItem>
                            <SelectItem value="monthly">Aylık</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="backupRetention">Yedek Saklama Süresi</Label>
                        <Select defaultValue="30">
                          <SelectTrigger id="backupRetention">
                            <SelectValue placeholder="Saklama süresi seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7">7 Gün</SelectItem>
                            <SelectItem value="30">30 Gün</SelectItem>
                            <SelectItem value="90">3 Ay</SelectItem>
                            <SelectItem value="365">1 Yıl</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button>Manuel Yedekleme Başlat</Button>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <div className="space-x-2">
                    <Button variant="outline">Varsayılana Sıfırla</Button>
                    <Button onClick={handleSystemSettingSave}>Ayarları Kaydet</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="electricityFaults" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Elektrik Arıza Yönetimi</CardTitle>
              <CardDescription>
                Bildirilen elektrik arızalarını görüntüleyin ve yönetin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Öncelik" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tüm Öncelikler</SelectItem>
                      <SelectItem value="high">Yüksek</SelectItem>
                      <SelectItem value="medium">Orta</SelectItem>
                      <SelectItem value="low">Düşük</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Durum" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tüm Durumlar</SelectItem>
                      <SelectItem value="pending">Bekleyen</SelectItem>
                      <SelectItem value="in_progress">İşlemde</SelectItem>
                      <SelectItem value="resolved">Çözüldü</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={loadData} variant="outline" size="sm">
                  <Clock className="mr-2 h-4 w-4" />
                  Yenile
                </Button>
              </div>
              
              <div className="rounded-md border">
                <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b bg-muted/50">
                  <div>Arıza</div>
                  <div>Konum</div>
                  <div>Bildirim Zamanı</div>
                  <div>Öncelik</div>
                  <div>Durum</div>
                  <div>İşlemler</div>
                </div>
                
                {electricityFaults.map(fault => (
                  <div key={fault.id} className="grid grid-cols-6 gap-4 p-4 border-b">
                    <div>
                      <div className="font-medium">{fault.title}</div>
                      <div className="text-sm text-muted-foreground">
                        Bildiren: {fault.reporter}
                      </div>
                    </div>
                    <div>{fault.location}</div>
                    <div className="text-sm">
                      {new Date(fault.timestamp).toLocaleString('tr-TR')}
                    </div>
                    <div>
                      <Badge variant={
                        fault.priority === "high" ? "destructive" : 
                        fault.priority === "medium" ? "default" : "outline"
                      }>
                        {fault.priority === "high" ? "Yüksek" : 
                         fault.priority === "medium" ? "Orta" : "Düşük"}
                      </Badge>
                    </div>
                    <div>
                      <Badge variant={
                        fault.status === "pending" ? "outline" : 
                        fault.status === "in_progress" ? "secondary" : "success"
                      }>
                        {fault.status === "pending" ? "Bekliyor" : 
                         fault.status === "in_progress" ? "İşlemde" : "Çözüldü"}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        disabled={fault.status === "resolved"}
                        onClick={() => handleOpenAssignDialog(fault)}
                      >
                        Görevlendir
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm"
                        disabled={fault.status === "resolved"}
                        onClick={() => handleResolveElectricityFault(fault.id)}
                      >
                        Çözüldü
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Arıza Haritası</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[400px] bg-muted flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Map className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Arıza haritası burada görüntülenecek</p>
                      <p className="text-sm">Gerçek uygulamada etkileşimli harita yer alacaktır</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="consumption" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Tüketim & Sayaç Yönetimi</CardTitle>
              <CardDescription>
                Elektrik ve su tüketimlerini takip edin ve analiz edin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Tüketim Analizi</h3>
                <div className="flex gap-2">
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Periyot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Haftalık</SelectItem>
                      <SelectItem value="month">Aylık</SelectItem>
                      <SelectItem value="year">Yıllık</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Elektrik Tüketimi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={consumptionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="electricity" name="Elektrik (MWh)" stroke="#8884d8" fill="#8884d8" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Su Tüketimi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={consumptionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="water" name="Su (m³ bin)" stroke="#82ca9d" fill="#82ca9d" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Sayaç Yönetimi</h3>
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b bg-muted/50">
                    <div>Sayaç No</div>
                    <div>Tür</div>
                    <div>Lokasyon</div>
                    <div>Son Okuma</div>
                    <div>Durum</div>
                    <div>İşlemler</div>
                  </div>
                  
                  <div className="grid grid-cols-6 gap-4 p-4 border-b">
                    <div>ELK-12345</div>
                    <div>Elektrik</div>
                    <div>Lefkoşa Merkez</div>
                    <div>12 Eylül 2023</div>
                    <div><Badge variant="success">Aktif</Badge></div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Okuma Gir</Button>
                      <Button variant="outline" size="sm">Detaylar</Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-6 gap-4 p-4 border-b">
                    <div>ELK-67890</div>
                    <div>Elektrik</div>
                    <div>Girne Sahil</div>
                    <div>15 Eylül 2023</div>
                    <div><Badge variant="success">Aktif</Badge></div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Okuma Gir</Button>
                      <Button variant="outline" size="sm">Detaylar</Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-6 gap-4 p-4 border-b">
                    <div>SU-54321</div>
                    <div>Su</div>
                    <div>Gazimağusa</div>
                    <div>10 Eylül 2023</div>
                    <div><Badge variant="success">Aktif</Badge></div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Okuma Gir</Button>
                      <Button variant="outline" size="sm">Detaylar</Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-6 gap-4 p-4 border-b">
                    <div>SU-09876</div>
                    <div>Su</div>
                    <div>Lefkoşa Doğu</div>
                    <div>8 Eylül 2023</div>
                    <div><Badge variant="destructive">Arızalı</Badge></div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Servis Talebi</Button>
                      <Button variant="outline" size="sm">Detaylar</Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-6 gap-4 p-4">
                    <div>ELK-13579</div>
                    <div>Elektrik</div>
                    <div>Güzelyurt</div>
                    <div>14 Eylül 2023</div>
                    <div><Badge variant="outline">Askıda</Badge></div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Aktifleştir</Button>
                      <Button variant="outline" size="sm">Detaylar</Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between">
                  <div className="text-sm text-muted-foreground">Toplam 25 sayaçtan 1-5 arası gösteriliyor</div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" disabled>Önceki</Button>
                    <Button variant="outline" size="sm">Sonraki</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="collection" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Borç & Tahsilat Raporları</CardTitle>
              <CardDescription>
                Kurumsal borç ve tahsilat verilerini görüntüleyin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Tahsilat Performansı</h3>
                <div className="flex gap-2">
                  <Select defaultValue="month">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Periyot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quarter">Çeyrek</SelectItem>
                      <SelectItem value="month">Aylık</SelectItem>
                      <SelectItem value="year">Yıllık</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mb-8">
                <Card>
                  <CardContent className="pt-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={collectionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="collected" name="Tahsil Edilen (TL)" fill="#8884d8" />
                        <Bar dataKey="target" name="Hedef (TL)" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <DollarSign className="mr-2 h-5 w-5 text-green-500" />
                      Toplam Tahsilat
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">8.250.000 TL</div>
                    <p className="text-sm text-muted-foreground">
                      Son 3 ayda toplanan
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                      Ödenmemiş Borçlar
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">2.850.000 TL</div>
                    <p className="text-sm text-muted-foreground">
                      Toplam bakiye
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-blue-500" />
                      Tahsilat Oranı
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">74%</div>
                    <p className="text-sm text-muted-foreground">
                      Hedefin %96'sı
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Borç Durum Raporu</h3>
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b bg-muted/50">
                    <div>Bölge</div>
                    <div>Toplam Borç</div>
                    <div>30 Gün İçinde</div>
                    <div>30-60 Gün</div>
                    <div>60-90 Gün</div>
                    <div>90+ Gün</div>
                  </div>
                  
                  <div className="grid grid-cols-6 gap-4 p-4 border-b">
                    <div>Lefkoşa</div>
                    <div>980.000 TL</div>
                    <div>420.000 TL</div>
                    <div>280.000 TL</div>
                    <div>180.000 TL</div>
                    <div>100.000 TL</div>
                  </div>
                  
                  <div className="grid grid-cols-6 gap-4 p-4 border-b">
                    <div>Girne</div>
                    <div>850.000 TL</div>
                    <div>380.000 TL</div>
                    <div>250.000 TL</div>
                    <div>150.000 TL</div>
                    <div>70.000 TL</div>
                  </div>
                  
                  <div className="grid grid-cols-6 gap-4 p-4 border-b">
                    <div>Gazimağusa</div>
                    <div>620.000 TL</div>
                    <div>320.000 TL</div>
                    <div>180.000 TL</div>
                    <div>80.000 TL</div>
                    <div>40.000 TL</div>
                  </div>
                  
                  <div className="grid grid-cols-6 gap-4 p-4">
                    <div>Güzelyurt</div>
                    <div>400.000 TL</div>
                    <div>200.000 TL</div>
                    <div>120.000 TL</div>
                    <div>50.000 TL</div>
                    <div>30.000 TL</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="investment" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Yatırım & Altyapı</CardTitle>
              <CardDescription>
                Kurumsal yatırımları ve altyapı projelerini takip edin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Yatırım Dağılımı</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={investmentData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {investmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Altyapı Projeleri Özeti</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Elektrik Şebeke Yenileme</span>
                          <span className="text-sm font-medium">65%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Akıllı Sayaç Dönüşümü</span>
                          <span className="text-sm font-medium">40%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "40%" }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Su Şebekesi İyileştirme</span>
                          <span className="text-sm font-medium">70%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-cyan-600 h-2.5 rounded-full" style={{ width: "70%" }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Yol Altyapı Çalışmaları</span>
                          <span className="text-sm font-medium">55%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: "55%" }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Turizm Tesisleri Yenileme</span>
                          <span className="text-sm font-medium">30%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "30%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Devam Eden Projeler</h3>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h4 className="font-medium">Lefkoşa Elektrik Şebeke Modernizasyonu</h4>
                          <p className="text-sm text-muted-foreground">
                            Merkez bölgede elektrik altyapısının yenilenmesi ve kapasite artırımı çalışmaları
                          </p>
                          <div className="flex items-center text-sm">
                            <Droplet className="h-4 w-4 mr-1 text-blue-500" />
                            <span className="text-muted-foreground">Elektrik İşleri Dairesi</span>
                            <span className="mx-2">•</span>
                            <span>Bütçe: 12.5 Milyon TL</span>
                          </div>
                        </div>
                        <Badge variant="outline">Devam Ediyor</Badge>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">İlerleme</span>
                          <span className="text-sm font-medium">65%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h4 className="font-medium">Girne Su Dağıtım Şebekesi İyileştirme</h4>
                          <p className="text-sm text-muted-foreground">
                            Turistik bölgelerde su dağıtım hatlarının yenilenmesi ve su kaybının azaltılması
                          </p>
                          <div className="flex items-center text-sm">
                            <Droplet className="h-4 w-4 mr-1 text-cyan-500" />
                            <span className="text-muted-foreground">Su İşleri Dairesi</span>
                            <span className="mx-2">•</span>
                            <span>Bütçe: 8.3 Milyon TL</span>
                          </div>
                        </div>
                        <Badge variant="outline">Devam Ediyor</Badge>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">İlerleme</span>
                          <span className="text-sm font-medium">70%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-cyan-600 h-2.5 rounded-full" style={{ width: "70%" }}></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h4 className="font-medium">Gazimağusa Turizm Tesisleri Yenileme</h4>
                          <p className="text-sm text-muted-foreground">
                            Antik bölge çevresindeki turizm tesislerinin modernizasyonu
                          </p>
                          <div className="flex items-center text-sm">
                            <Building className="h-4 w-4 mr-1 text-purple-500" />
                            <span className="text-muted-foreground">Turizm Bakanlığı</span>
                            <span className="mx-2">•</span>
                            <span>Bütçe: 5.7 Milyon TL</span>
                          </div>
                        </div>
                        <Badge variant="outline">Devam Ediyor</Badge>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">İlerleme</span>
                          <span className="text-sm font-medium">30%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "30%" }}></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Tamamlanan Projeler</h3>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b bg-muted/50">
                    <div>Proje Adı</div>
                    <div>Departman</div>
                    <div>Bütçe</div>
                    <div>Tamamlanma</div>
                    <div>Durum</div>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-4 p-4 border-b">
                    <div>Lefkoşa Güneş Enerji Santrali</div>
                    <div>Elektrik İşleri</div>
                    <div>15.2 Milyon TL</div>
                    <div>10 Haziran 2023</div>
                    <div><Badge variant="success">Tamamlandı</Badge></div>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-4 p-4 border-b">
                    <div>Akıllı Su Sayaçları Pilot Bölge</div>
                    <div>Su İşleri</div>
                    <div>3.8 Milyon TL</div>
                    <div>22 Mayıs 2023</div>
                    <div><Badge variant="success">Tamamlandı</Badge></div>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-4 p-4">
                    <div>Girne Liman Bölgesi Altyapı</div>
                    <div>Belediye</div>
                    <div>6.5 Milyon TL</div>
                    <div>15 Nisan 2023</div>
                    <div><Badge variant="success">Tamamlandı</Badge></div>
                  </div>
                </div>
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

