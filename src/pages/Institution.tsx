
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { 
  BarChart, 
  Users, 
  FileText, 
  Bell, 
  File, 
  Settings, 
  MessageSquare, 
  Calendar, 
  BarChart4,
  Zap,
  Droplet,
  Flame,
  Hotel,
  Building,
  TrendingUp,
  Key,
  DollarSign,
  Handshake,
  Trash,
  Map,
  Activity,
  ShieldAlert,
  ShoppingBag,
  UserCog,
  Megaphone,
  ReceiptText,
  ServerCrash,
  Gauge,
  Wrench,
  Menu,
  Search,
  PenTool,
  BookOpen,
  BriefcaseBusiness,
  Share2,
  BadgeHelp,
  Headphones,
  PlusCircle,
  Clock,
  Wallet,
  Download,
  Upload,
  AlarmCheck,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  XCircle,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FeedbackList from "@/components/institution/FeedbackList";
import PriceReportsList from "@/components/institution/PriceReportsList";
import FraudReportsList from "@/components/institution/FraudReportsList";
import EmergencyReportsList from "@/components/institution/EmergencyReportsList";
import MapSection from "@/components/institution/MapSection";
import ResponseDialog from "@/components/institution/ResponseDialog";
import AssignReportDialog from "@/components/institution/AssignReportDialog";
import { toast } from "sonner";
import { INSTITUTIONS } from "@/services/feedbackService";

const Institution = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [currentInstitution, setCurrentInstitution] = useState<string | null>(null);
  const [institutionName, setInstitutionName] = useState<string>("Kurum Paneli");
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [showResponseDialog, setShowResponseDialog] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedItemType, setSelectedItemType] = useState<'feedback' | 'report' | null>(null);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [demoStats, setDemoStats] = useState({
    totalReports: 157,
    pendingTasks: 24,
    satisfactionRate: 4.2,
    todayVisits: 1243,
    activeAlerts: 7,
    completedTasks: 18,
  });
  
  const [demoEvents, setDemoEvents] = useState([
    { id: 1, title: "Sistem bakımı", date: "15 Mayıs 2023", status: "scheduled" },
    { id: 2, title: "Personel eğitimi", date: "18 Mayıs 2023", status: "scheduled" },
    { id: 3, title: "Yazılım güncellemesi", date: "12 Mayıs 2023", status: "completed" },
  ]);
  
  const [demoNotices, setDemoNotices] = useState([
    { id: 1, title: "Acil durum tatbikatı", date: "14 Mayıs 2023", important: true },
    { id: 2, title: "Yeni yönetmelik duyurusu", date: "10 Mayıs 2023", important: false },
  ]);

  useEffect(() => {
    const institutionCode = localStorage.getItem("testUserType");
    console.log("Institution - Kurum tipi:", institutionCode);
    
    if (institutionCode) {
      setCurrentInstitution(institutionCode);
      
      switch(institutionCode) {
        case 'ELEKTRIK': 
          setInstitutionName("Elektrik Kurumu");
          break;
        case 'SU': 
          setInstitutionName("Su İşleri Dairesi");
          break;
        case 'DOGALGAZ': 
          setInstitutionName("Doğalgaz Kurumu");
          break;
        case 'BELEDIYE': 
          setInstitutionName("Belediye");
          break;
        case 'TURIZM': 
          setInstitutionName("Turizm Ofisi");
          break;
        case 'BAKANLIK': 
          setInstitutionName("Turizm Bakanlığı");
          break;
        default:
          setInstitutionName("Kurum Paneli");
      }
    }
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleOpenResponseDialog = useCallback((id: string, type: 'feedback' | 'report') => {
    setSelectedItemId(id);
    setSelectedItemType(type);
    setShowResponseDialog(true);
  }, []);

  const handleAssignReport = useCallback((id: string) => {
    setSelectedItemId(id);
    setShowAssignDialog(true);
  }, []);

  const loadData = useCallback(() => {
    toast.success("Veriler yenilendi");
  }, []);

  const handleCloseResponseDialog = () => {
    setShowResponseDialog(false);
    setSelectedItemId(null);
    setSelectedItemType(null);
  };

  const handleCloseAssignDialog = () => {
    setShowAssignDialog(false);
    setSelectedItemId(null);
  };

  const handleRespond = (response: string) => {
    toast.success("Yanıt gönderildi");
    setShowResponseDialog(false);
    setSelectedItemId(null);
    setSelectedItemType(null);
    loadData();
  };

  const handleAssign = (unitId: string) => {
    toast.success(`Rapor ${unitId} birimine atandı`);
    setShowAssignDialog(false);
    setSelectedItemId(null);
    loadData();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const commonMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: <BarChart className="w-5 h-5" /> },
    { id: "feedback", label: "Geri Bildirim", icon: <MessageSquare className="w-5 h-5" /> },
    { id: "reports", label: "Raporlama", icon: <BarChart4 className="w-5 h-5" /> },
    { id: "users", label: "Kullanıcı Yönetimi", icon: <Users className="w-5 h-5" /> },
    { id: "applications", label: "Başvuru Takibi", icon: <FileText className="w-5 h-5" /> },
    { id: "announcements", label: "Duyuru Yönetimi", icon: <Bell className="w-5 h-5" /> },
    { id: "documents", label: "Evrak Yönetimi", icon: <File className="w-5 h-5" /> },
    { id: "events", label: "Etkinlikler", icon: <Calendar className="w-5 h-5" /> },
    { id: "settings", label: "Sistem Ayarları", icon: <Settings className="w-5 h-5" /> },
  ];

  const institutionSpecificMenuItems: Record<string, Array<{ id: string, label: string, icon: JSX.Element }>> = {
    ELEKTRIK: [
      { id: "power-outages", label: "Elektrik Arıza Yönetimi", icon: <Zap className="w-5 h-5" /> },
      { id: "consumption", label: "Tüketim & Sayaç Yönetimi", icon: <TrendingUp className="w-5 h-5" /> },
      { id: "debt", label: "Borç & Tahsilat Raporları", icon: <DollarSign className="w-5 h-5" /> },
      { id: "infrastructure", label: "Yatırım & Altyapı", icon: <Building className="w-5 h-5" /> },
      { id: "maintenance", label: "Bakım & Onarım", icon: <Wrench className="w-5 h-5" /> },
      { id: "monitoring", label: "Şebeke İzleme", icon: <Activity className="w-5 h-5" /> },
    ],
    SU: [
      { id: "water-resources", label: "Su Kaynakları Yönetimi", icon: <Droplet className="w-5 h-5" /> },
      { id: "water-infrastructure", label: "Altyapı & Şebeke", icon: <Building className="w-5 h-5" /> },
      { id: "water-billing", label: "Su Faturalandırma", icon: <DollarSign className="w-5 h-5" /> },
      { id: "water-outages", label: "Su Kesintileri", icon: <Droplet className="w-5 h-5" /> },
      { id: "water-quality", label: "Su Kalite Kontrol", icon: <ShieldAlert className="w-5 h-5" /> },
      { id: "water-maintenance", label: "Bakım Planlaması", icon: <Wrench className="w-5 h-5" /> },
    ],
    DOGALGAZ: [
      { id: "gas-network", label: "Doğalgaz Hattı Yönetimi", icon: <Flame className="w-5 h-5" /> },
      { id: "gas-maintenance", label: "Teknik Servis & Bakım", icon: <Settings className="w-5 h-5" /> },
      { id: "gas-billing", label: "Tahsilat & Borçlandırma", icon: <DollarSign className="w-5 h-5" /> },
      { id: "gas-security", label: "Güvenlik & Acil Durumlar", icon: <Bell className="w-5 h-5" /> },
      { id: "gas-pressure", label: "Basınç İzleme", icon: <Gauge className="w-5 h-5" /> },
      { id: "gas-leakage", label: "Sızıntı Tespiti", icon: <ServerCrash className="w-5 h-5" /> },
    ],
    TURIZM: [
      { id: "accommodation", label: "Konaklama ve Otel", icon: <Hotel className="w-5 h-5" /> },
      { id: "tourism-events", label: "Turizm Etkinlikleri", icon: <Calendar className="w-5 h-5" /> },
      { id: "tourist-regions", label: "Turistik Bölgeler", icon: <Map className="w-5 h-5" /> },
      { id: "tourism-promotion", label: "Reklam & Tanıtım", icon: <Megaphone className="w-5 h-5" /> },
      { id: "tourism-packages", label: "Tur Paketleri", icon: <ShoppingBag className="w-5 h-5" /> },
      { id: "tourism-guides", label: "Rehber Yönetimi", icon: <UserCog className="w-5 h-5" /> },
    ],
    BELEDIYE: [
      { id: "municipal-services", label: "Belediye Hizmetleri", icon: <Building className="w-5 h-5" /> },
      { id: "tax-collection", label: "Vergi & Harç Takibi", icon: <DollarSign className="w-5 h-5" /> },
      { id: "permits", label: "Ruhsat & İmar İzinleri", icon: <FileText className="w-5 h-5" /> },
      { id: "waste-management", label: "Çöp & Şehir Temizliği", icon: <Trash className="w-5 h-5" /> },
      { id: "city-planning", label: "Şehir Planlama", icon: <Map className="w-5 h-5" /> },
      { id: "public-transport", label: "Toplu Taşıma", icon: <Activity className="w-5 h-5" /> },
    ],
    BAKANLIK: [
      { id: "tourism-stats", label: "Turizm İstatistikleri", icon: <BarChart className="w-5 h-5" /> },
      { id: "licensing", label: "Otel & Acente Lisans", icon: <Key className="w-5 h-5" /> },
      { id: "incentives", label: "Teşvik Programları", icon: <DollarSign className="w-5 h-5" /> },
      { id: "international", label: "Uluslararası İşbirlikleri", icon: <Handshake className="w-5 h-5" /> },
      { id: "tourism-laws", label: "Turizm Mevzuatı", icon: <FileText className="w-5 h-5" /> },
      { id: "tourism-complaints", label: "Şikayet Yönetimi", icon: <MessageSquare className="w-5 h-5" /> },
    ],
  };

  const menuItems = currentInstitution && institutionSpecificMenuItems[currentInstitution] 
    ? [...commonMenuItems, ...institutionSpecificMenuItems[currentInstitution]]
    : commonMenuItems;

  const renderInstitutionDashboardCards = () => {
    if (!currentInstitution) return null;
    
    switch(currentInstitution) {
      case 'ELEKTRIK':
        return (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Elektrik Arıza Yönetimi</CardTitle>
                <CardDescription>Son 24 saat</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">23</p>
                <p className="text-xs text-muted-foreground mt-1">8 çözüldü</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Sistem Yükü</CardTitle>
                <CardDescription>Anlık değer</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">76%</p>
                <p className="text-xs text-muted-foreground mt-1">Normal seviye</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Toplam Tüketim</CardTitle>
                <CardDescription>Bu ay</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">8.2 GW</p>
                <p className="text-xs text-muted-foreground mt-1">Geçen ay: 7.9 GW</p>
              </CardContent>
            </Card>
          </>
        );
      
      case 'SU':
        return (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Su Kesintileri</CardTitle>
                <CardDescription>Son 24 saat</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">7</p>
                <p className="text-xs text-muted-foreground mt-1">3 planlı, 4 acil</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Rezervuar Seviyesi</CardTitle>
                <CardDescription>Ana depo</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">82%</p>
                <p className="text-xs text-muted-foreground mt-1">Normal seviye</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Günlük Tüketim</CardTitle>
                <CardDescription>Son 24 saat</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">42.6k m³</p>
                <p className="text-xs text-muted-foreground mt-1">Ortalama: 40.2k m³</p>
              </CardContent>
            </Card>
          </>
        );
      
      case 'DOGALGAZ':
        return (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Gaz Basıncı</CardTitle>
                <CardDescription>Ana hat</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">6.2 bar</p>
                <p className="text-xs text-muted-foreground mt-1">Optimum aralıkta</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Aktif Aboneler</CardTitle>
                <CardDescription>Gaz kullanan</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">8,245</p>
                <p className="text-xs text-muted-foreground mt-1">%3 artış</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Günlük Tüketim</CardTitle>
                <CardDescription>Son 24 saat</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">156k m³</p>
                <p className="text-xs text-muted-foreground mt-1">Ortalama: 145k m³</p>
              </CardContent>
            </Card>
          </>
        );
      
      case 'BELEDIYE':
        return (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Açık Talepler</CardTitle>
                <CardDescription>Vatandaş başvuruları</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">134</p>
                <p className="text-xs text-muted-foreground mt-1">28 öncelikli</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Planlanan Etkinlikler</CardTitle>
                <CardDescription>Önümüzdeki hafta</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">8</p>
                <p className="text-xs text-muted-foreground mt-1">2 büyük organizasyon</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Ruhsat Başvuruları</CardTitle>
                <CardDescription>Son 30 gün</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">62</p>
                <p className="text-xs text-muted-foreground mt-1">43 onaylandı</p>
              </CardContent>
            </Card>
          </>
        );
      
      case 'TURIZM':
        return (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Aktif Turistler</CardTitle>
                <CardDescription>Şu anda bölgede</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">12,450</p>
                <p className="text-xs text-muted-foreground mt-1">Geçen hafta: 10,890</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Otel Doluluk Oranı</CardTitle>
                <CardDescription>Bölge geneli</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">78%</p>
                <p className="text-xs text-muted-foreground mt-1">Geçen ay: 65%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Turist Memnuniyeti</CardTitle>
                <CardDescription>Ortalama puanlama</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">4.4/5</p>
                <p className="text-xs text-muted-foreground mt-1">Son ay: 4.2/5</p>
              </CardContent>
            </Card>
          </>
        );
      
      case 'BAKANLIK':
        return (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Toplam Ziyaretçi</CardTitle>
                <CardDescription>Bu yıl</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">857,230</p>
                <p className="text-xs text-muted-foreground mt-1">%12 artış</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Turizm Gelirleri</CardTitle>
                <CardDescription>Bu yıl</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">€204M</p>
                <p className="text-xs text-muted-foreground mt-1">Hedef: €230M</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Kayıtlı İşletmeler</CardTitle>
                <CardDescription>Turizm işletmeleri</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">1,245</p>
                <p className="text-xs text-muted-foreground mt-1">142 yeni kayıt</p>
              </CardContent>
            </Card>
          </>
        );

      default:
        return (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Toplam Geri Bildirim</CardTitle>
                <CardDescription>Son 30 gün</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">157</p>
                <p className="text-xs text-muted-foreground mt-1">%12 artış</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Bekleyen Görevler</CardTitle>
                <CardDescription>Acil yanıt bekleyen</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">24</p>
                <p className="text-xs text-muted-foreground mt-1">3 acil durum</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Memnuniyet Oranı</CardTitle>
                <CardDescription>Ortalama puanlama</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">4.2/5</p>
                <p className="text-xs text-muted-foreground mt-1">Son ay: 4.0/5</p>
              </CardContent>
            </Card>
          </>
        );
    }
  };

  const renderSectionTemplate = (title: string, description: string, children: React.ReactNode) => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={loadData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Yenile
          </Button>
          <Button variant="default" size="sm">
            <PlusCircle className="w-4 h-4 mr-2" />
            Yeni Ekle
          </Button>
        </div>
      </div>
      {description && <p className="text-muted-foreground">{description}</p>}
      {children}
    </div>
  );

  const renderActiveSection = () => {
    if (activeSection === "dashboard") {
      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">{institutionName} Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderInstitutionDashboardCards()}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Bölgesel Dağılım</CardTitle>
                <CardDescription>İlçelere göre görev dağılımı</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <MapSection />
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Son Geri Bildirimler</CardTitle>
              </CardHeader>
              <CardContent>
                <FeedbackList 
                  onOpenResponseDialog={handleOpenResponseDialog} 
                  loadData={loadData} 
                  limit={5} 
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Son Acil Raporlar</CardTitle>
              </CardHeader>
              <CardContent>
                <EmergencyReportsList 
                  onOpenResponseDialog={handleOpenResponseDialog} 
                  onAssignReport={handleAssignReport} 
                  loadData={loadData} 
                  limit={5} 
                />
              </CardContent>
            </Card>
          </div>
        </div>
      );
    } else if (activeSection === "feedback") {
      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Geri Bildirim Yönetimi</h1>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">Tüm Geri Bildirimler</TabsTrigger>
              <TabsTrigger value="price">Fiyat Raporları</TabsTrigger>
              <TabsTrigger value="fraud">Dolandırıcılık</TabsTrigger>
              <TabsTrigger value="emergency">Acil Durumlar</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <FeedbackList onOpenResponseDialog={handleOpenResponseDialog} loadData={loadData} />
            </TabsContent>
            <TabsContent value="price">
              <PriceReportsList onOpenResponseDialog={handleOpenResponseDialog} onAssignReport={handleAssignReport} loadData={loadData} />
            </TabsContent>
            <TabsContent value="fraud">
              <FraudReportsList onOpenResponseDialog={handleOpenResponseDialog} onAssignReport={handleAssignReport} loadData={loadData} />
            </TabsContent>
            <TabsContent value="emergency">
              <EmergencyReportsList onOpenResponseDialog={handleOpenResponseDialog} onAssignReport={handleAssignReport} loadData={loadData} />
            </TabsContent>
          </Tabs>
        </div>
      );
    } else if (activeSection === "users") {
      return renderSectionTemplate(
        "Kullanıcı Yönetimi",
        "Sistem kullanıcılarını, personelleri ve yetkilerini yönetin.",
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Input placeholder="Kullanıcı ara..." className="max-w-sm" />
            <Button variant="outline">
              <Search className="h-4 w-4" />
            </Button>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kullanıcılar</SelectItem>
                <SelectItem value="active">Aktif Kullanıcılar</SelectItem>
                <SelectItem value="inactive">Pasif Kullanıcılar</SelectItem>
                <SelectItem value="admin">Yöneticiler</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <div className="p-4 grid grid-cols-5 font-medium bg-muted">
              <div>Kullanıcı</div>
              <div>E-posta</div>
              <div>Rol</div>
              <div>Durum</div>
              <div>İşlemler</div>
            </div>
            {[
              { id: 1, name: "Ahmet Yılmaz", email: "ahmet@kurum.gov.ct", role: "Yönetici", status: "active" },
              { id: 2, name: "Ayşe Kaya", email: "ayse@kurum.gov.ct", role: "Müdür", status: "active" },
              { id: 3, name: "Mehmet Demir", email: "mehmet@kurum.gov.ct", role: "Teknik Personel", status: "active" },
              { id: 4, name: "Fatma Şahin", email: "fatma@kurum.gov.ct", role: "Veri Giriş", status: "inactive" },
              { id: 5, name: "Ali Çelik", email: "ali@kurum.gov.ct", role: "Saha Personeli", status: "active" },
            ].map((user) => (
              <div key={user.id} className="p-4 grid grid-cols-5 items-center border-t">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>{user.name}</div>
                </div>
                <div>{user.email}</div>
                <div>{user.role}</div>
                <div>
                  {user.status === "active" ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aktif</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Pasif</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <PenTool className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (activeSection === "applications") {
      return renderSectionTemplate(
        "Başvuru Takibi",
        "Vatandaşlardan gelen başvuruları yönetin ve takip edin.",
        <div className="space-y-6">
          <Tabs defaultValue="pending">
            <TabsList>
              <TabsTrigger value="pending">Bekleyen Başvurular</TabsTrigger>
              <TabsTrigger value="processing">İşlemdeki Başvurular</TabsTrigger>
              <TabsTrigger value="completed">Tamamlanan Başvurular</TabsTrigger>
              <TabsTrigger value="rejected">Reddedilen Başvurular</TabsTrigger>
            </TabsList>
            <TabsContent value="pending">
              <div className="rounded-md border mt-4">
                {[
                  { id: "APP001", title: "İzin Başvurusu", applicant: "Hasan Kaya", date: "12.05.2023", type: "Belge" },
                  { id: "APP002", title: "Abonelik Başvurusu", applicant: "Sevgi Yılmaz", date: "13.05.2023", type: "Hizmet" },
                  { id: "APP003", title: "Arıza Bildirimi", applicant: "Kemal Öztürk", date: "14.05.2023", type: "Teknik" },
                ].map((app) => (
                  <div key={app.id} className="p-4 border-b last:border-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{app.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <span>{app.applicant}</span>
                          <span>•</span>
                          <span>{app.date}</span>
                          <Badge variant="outline">{app.type}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">İncele</Button>
                        <Button size="sm">İşleme Al</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="processing">
              <div className="rounded-md border mt-4">
                {[
                  { id: "APP004", title: "Emlak Vergisi İtirazı", applicant: "Cem Yıldız", date: "10.05.2023", type: "Mali", progress: 65 },
                  { id: "APP005", title: "Boru Hattı Onarımı", applicant: "Leyla Kaya", date: "09.05.2023", type: "Altyapı", progress: 30 },
                ].map((app) => (
                  <div key={app.id} className="p-4 border-b last:border-0">
                    <div className="flex justify-between items-center">
                      <div className="flex-1 mr-4">
                        <div className="flex justify-between mb-1">
                          <h3 className="font-medium">{app.title}</h3>
                          <span className="text-sm">{app.progress}%</span>
                        </div>
                        <Progress value={app.progress} className="h-2 mb-2" />
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{app.applicant}</span>
                          <span>•</span>
                          <span>{app.date}</span>
                          <Badge variant="outline">{app.type}</Badge>
                        </div>
                      </div>
                      <Button size="sm">Güncelle</Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="completed">
              <div className="rounded-md border mt-4">
                {[
                  { id: "APP006", title: "Elektrik Bağlantısı", applicant: "Deniz Arslan", date: "05.05.2023", type: "Teknik", completedDate: "08.05.2023" },
                  { id: "APP007", title: "İmar İzni", applicant: "Gül Korkmaz", date: "02.05.2023", type: "İdari", completedDate: "07.05.2023" },
                ].map((app) => (
                  <div key={app.id} className="p-4 border-b last:border-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{app.title}</h3>
                          <Badge className="bg-green-100 text-green-800">Tamamlandı</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <span>{app.applicant}</span>
                          <span>•</span>
                          <span>Başvuru: {app.date}</span>
                          <span>•</span>
                          <span>Tamamlanma: {app.completedDate}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Detaylar</Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="rejected">
              <div className="rounded-md border mt-4">
                {[
                  { id: "APP008", title: "Özel İzin Talebi", applicant: "Burak Şahin", date: "07.05.2023", type: "İdari", rejectionReason: "Belge eksikliği" },
                ].map((app) => (
                  <div key={app.id} className="p-4 border-b last:border-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{app.title}</h3>
                          <Badge variant="destructive">Reddedildi</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <span>{app.applicant}</span>
                          <span>•</span>
                          <span>Başvuru: {app.date}</span>
                          <span>•</span>
                          <span>Sebep: {app.rejectionReason}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Detaylar</Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      );
    } else if (activeSection === "announcements") {
      return renderSectionTemplate(
        "Duyuru Yönetimi",
        "Kurumsal duyuruları oluşturun, düzenleyin ve yayınlayın.",
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Input placeholder="Duyuru ara..." className="max-w-sm" />
            <Button variant="outline">
              <Search className="h-4 w-4" />
            </Button>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Duyurular</SelectItem>
                <SelectItem value="active">Aktif Duyurular</SelectItem>
                <SelectItem value="scheduled">Planlanmış</SelectItem>
                <SelectItem value="expired">Süresi Dolmuş</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: 1, title: "Planlı Bakım Çalışması", content: "15 Mayıs 2023 tarihinde 09:00-14:00 saatleri arasında bakım çalışması yapılacaktır.", date: "10.05.2023", status: "active", important: true },
              { id: 2, title: "Hizmet Saatleri Değişikliği", content: "1 Haziran 2023 tarihinden itibaren hizmet saatlerimiz 08:30-17:00 olarak güncellenmiştir.", date: "08.05.2023", status: "active", important: false },
              { id: 3, title: "Online Fatura Ödeme Hizmeti", content: "Artık faturalarınızı online olarak ödeyebilirsiniz. Detaylı bilgi için web sitemizi ziyaret edin.", date: "05.05.2023", status: "active", important: false },
              { id: 4, title: "Yeni Abonelik Koşulları", content: "1 Temmuz 2023'ten itibaren geçerli olacak yeni abonelik koşulları açıklanmıştır.", date: "02.05.2023", status: "scheduled", important: true },
              { id: 5, title: "Personel Alımı", content: "Kurumumuza yeni personel alımı yapılacaktır. Son başvuru tarihi 30 Mayıs 2023.", date: "01.05.2023", status: "active", important: false },
              { id: 6, title: "Sistem Güncellemesi", content: "20 Nisan 2023 tarihinde gerçekleştirilen sistem güncellemesi başarıyla tamamlanmıştır.", date: "20.04.2023", status: "expired", important: false },
            ].map((announcement) => (
              <Card key={announcement.id} className={announcement.important ? "border-l-4 border-l-primary" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    {announcement.status === "active" && <Badge className="bg-green-100 text-green-800">Aktif</Badge>}
                    {announcement.status === "scheduled" && <Badge className="bg-blue-100 text-blue-800">Planlanmış</Badge>}
                    {announcement.status === "expired" && <Badge variant="outline">Süresi Dolmuş</Badge>}
                  </div>
                  <CardDescription className="text-sm">{announcement.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{announcement.content}</p>
                </CardContent>
                <CardFooter className="pt-0 flex justify-end gap-2">
                  <Button variant="ghost" size="sm">
                    <PenTool className="h-4 w-4 mr-1" />
                    Düzenle
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash className="h-4 w-4 mr-1" />
                    Sil
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      );
    } else if (activeSection === "documents") {
      return renderSectionTemplate(
        "Evrak Yönetimi",
        "Gelen ve giden evrakları düzenleyin, arşivleyin ve takip edin.",
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Input placeholder="Evrak ara..." className="max-w-sm" />
            <Button variant="outline">
              <Search className="h-4 w-4" />
            </Button>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Evraklar</SelectItem>
                <SelectItem value="incoming">Gelen Evrak</SelectItem>
                <SelectItem value="outgoing">Giden Evrak</SelectItem>
                <SelectItem value="internal">İç Yazışma</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="incoming">
            <TabsList>
              <TabsTrigger value="incoming">Gelen Evrak</TabsTrigger>
              <TabsTrigger value="outgoing">Giden Evrak</TabsTrigger>
              <TabsTrigger value="internal">İç Yazışma</TabsTrigger>
              <TabsTrigger value="archived">Arşiv</TabsTrigger>
            </TabsList>
            <TabsContent value="incoming">
              <div className="rounded-md border mt-4">
                <div className="p-4 grid grid-cols-6 font-medium bg-muted">
                  <div>Evrak No</div>
                  <div className="col-span-2">Konu</div>
                  <div>Gönderen</div>
                  <div>Tarih</div>
                  <div>İşlemler</div>
                </div>
                {[
                  { id: "DOC001", subject: "Yeni Yönetmelik Bildirimi", sender: "Bakanlık", date: "14.05.2023", status: "pending" },
                  { id: "DOC002", subject: "İşbirliği Teklifi", sender: "ABC Şirketi", date: "12.05.2023", status: "processing" },
                  { id: "DOC003", subject: "Bütçe Onayı", sender: "Maliye Dairesi", date: "10.05.2023", status: "completed" },
                  { id: "DOC004", subject: "Personel Talebi", sender: "İnsan Kaynakları", date: "08.05.2023", status: "pending" },
                ].map((doc) => (
                  <div key={doc.id} className="p-4 grid grid-cols-6 items-center border-t">
                    <div>{doc.id}</div>
                    <div className="col-span-2">{doc.subject}</div>
                    <div>{doc.sender}</div>
                    <div>{doc.date}</div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <PenTool className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="outgoing">
              <div className="rounded-md border mt-4">
                <div className="p-4 grid grid-cols-6 font-medium bg-muted">
                  <div>Evrak No</div>
                  <div className="col-span-2">Konu</div>
                  <div>Alıcı</div>
                  <div>Tarih</div>
                  <div>İşlemler</div>
                </div>
                {[
                  { id: "DOC005", subject: "Faaliyet Raporu", recipient: "Bakanlık", date: "13.05.2023", status: "sent" },
                  { id: "DOC006", subject: "Toplantı Daveti", recipient: "Paydaşlar", date: "11.05.2023", status: "sent" },
                  { id: "DOC007", subject: "Onay Talebi", recipient: "Yönetim Kurulu", date: "09.05.2023", status: "waiting" },
                ].map((doc) => (
                  <div key={doc.id} className="p-4 grid grid-cols-6 items-center border-t">
                    <div>{doc.id}</div>
                    <div className="col-span-2">{doc.subject}</div>
                    <div>{doc.recipient}</div>
                    <div>{doc.date}</div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <PenTool className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="internal">
              <div className="rounded-md border mt-4">
                <div className="p-4 grid grid-cols-6 font-medium bg-muted">
                  <div>Evrak No</div>
                  <div className="col-span-2">Konu</div>
                  <div>Birim</div>
                  <div>Tarih</div>
                  <div>İşlemler</div>
                </div>
                {[
                  { id: "DOC008", subject: "Haftalık Toplantı Notları", department: "Tüm Birimler", date: "15.05.2023", status: "sent" },
                  { id: "DOC009", subject: "Yeni Proje Bilgilendirme", department: "Teknik Birim", date: "14.05.2023", status: "sent" },
                ].map((doc) => (
                  <div key={doc.id} className="p-4 grid grid-cols-6 items-center border-t">
                    <div>{doc.id}</div>
                    <div className="col-span-2">{doc.subject}</div>
                    <div>{doc.department}</div>
                    <div>{doc.date}</div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="archived">
              <div className="rounded-md border mt-4">
                <div className="p-4 grid grid-cols-6 font-medium bg-muted">
                  <div>Evrak No</div>
                  <div className="col-span-2">Konu</div>
                  <div>Kaynak/Hedef</div>
                  <div>Arşiv Tarihi</div>
                  <div>İşlemler</div>
                </div>
                {[
                  { id: "DOC010", subject: "2022 Yılı Faaliyet Raporu", source: "Bakanlık", date: "01.02.2023", status: "archived" },
                  { id: "DOC011", subject: "Eski Proje Dokümanları", source: "Teknik Birim", date: "15.03.2023", status: "archived" },
                ].map((doc) => (
                  <div key={doc.id} className="p-4 grid grid-cols-6 items-center border-t">
                    <div>{doc.id}</div>
                    <div className="col-span-2">{doc.subject}</div>
                    <div>{doc.source}</div>
                    <div>{doc.date}</div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      );
    } else if (activeSection === "events") {
      return renderSectionTemplate(
        "Etkinlikler",
        "Kurumsal etkinlikleri planlayın, yönetin ve takip edin.",
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Input placeholder="Etkinlik ara..." className="max-w-sm" />
            <Button variant="outline">
              <Search className="h-4 w-4" />
            </Button>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Etkinlikler</SelectItem>
                <SelectItem value="upcoming">Yaklaşan Etkinlikler</SelectItem>
                <SelectItem value="past">Geçmiş Etkinlikler</SelectItem>
                <SelectItem value="cancelled">İptal Edilenler</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: 1, title: "Halka Açık Bilgilendirme", date: "20.05.2023", time: "14:00", location: "Ana Bina Konferans Salonu", status: "upcoming", attendees: 120, organizer: "Halkla İlişkiler" },
              { id: 2, title: "Basın Toplantısı", date: "25.05.2023", time: "10:00", location: "Basın Merkezi", status: "upcoming", attendees: 45, organizer: "Kurumsal İletişim" },
              { id: 3, title: "Personel Eğitimi", date: "18.05.2023", time: "09:00", location: "Eğitim Merkezi", status: "upcoming", attendees: 30, organizer: "İnsan Kaynakları" },
              { id: 4, title: "Proje Değerlendirme", date: "10.05.2023", time: "15:30", location: "Toplantı Salonu B", status: "past", attendees: 12, organizer: "Proje Birimi" },
              { id: 5, title: "Acil Durum Tatbikatı", date: "05.05.2023", time: "11:00", location: "Tüm Bina", status: "past", attendees: 150, organizer: "Güvenlik Birimi" },
              { id: 6, title: "Bahar Kutlaması", date: "30.05.2023", time: "16:00", location: "Bahçe", status: "cancelled", attendees: 200, organizer: "Sosyal Komite" },
            ].map((event) => (
              <Card key={event.id} className={
                event.status === "cancelled" ? "opacity-70" : ""
              }>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    {event.status === "upcoming" && <Badge className="bg-blue-100 text-blue-800">Yaklaşan</Badge>}
                    {event.status === "past" && <Badge variant="outline">Geçmiş</Badge>}
                    {event.status === "cancelled" && <Badge variant="destructive">İptal</Badge>}
                  </div>
                  <CardDescription className="text-sm">{event.date} • {event.time}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Map className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{event.attendees} katılımcı</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <BadgeHelp className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Organizatör: {event.organizer}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex justify-end gap-2">
                  <Button variant="ghost" size="sm">
                    <PenTool className="h-4 w-4 mr-1" />
                    Düzenle
                  </Button>
                  {event.status === "upcoming" && (
                    <Button variant="ghost" size="sm">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      İptal Et
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      );
    } else if (activeSection === "settings") {
      return renderSectionTemplate(
        "Sistem Ayarları",
        "Sistem ayarlarını yapılandırın ve parametreleri yönetin.",
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Genel Ayarlar</CardTitle>
                <CardDescription>Temel kurum bilgileri ve çalışma parametreleri</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="font-medium">Kurum Adı</div>
                  <Input value={institutionName} />
                </div>
                <div className="space-y-2">
                  <div className="font-medium">Çalışma Saatleri</div>
                  <Input value="08:30 - 17:00" />
                </div>
                <div className="space-y-2">
                  <div className="font-medium">İletişim E-posta</div>
                  <Input value="info@kurum.gov.ct" />
                </div>
                <div className="space-y-2">
                  <div className="font-medium">Telefon Numarası</div>
                  <Input value="+90 392 123 4567" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Değişiklikleri Kaydet</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bildirim Ayarları</CardTitle>
                <CardDescription>Sistem bildirimlerini özelleştirin</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">E-posta Bildirimleri</div>
                    <div className="text-sm text-muted-foreground">Sistem olayları için e-posta bildirimleri</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Acil Durum Uyarıları</div>
                    <div className="text-sm text-muted-foreground">Kritik uyarılar için SMS bildirimleri</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Rapor Özetleri</div>
                    <div className="text-sm text-muted-foreground">Haftalık özet raporları</div>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Kullanıcı Geri Bildirimleri</div>
                    <div className="text-sm text-muted-foreground">Yeni vatandaş geri bildirimleri için bildirimler</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Değişiklikleri Kaydet</Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sistem Bakımı</CardTitle>
              <CardDescription>Veri yedekleme ve sistem bakım işlemleri</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Otomatik Yedekleme</div>
                  <div className="text-sm text-muted-foreground">Günlük otomatik yedekleme işlemi</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <div className="font-medium">Son Yedekleme</div>
                <div className="flex items-center">
                  <CheckCircle2 className="text-green-600 mr-2 h-5 w-5" />
                  <span>Bugün, 02:30 (Başarılı)</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Manuel Yedekle
              </Button>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Yedekten Geri Yükle
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    } else if (currentInstitution === 'ELEKTRIK' && activeSection === "power-outages") {
      return renderSectionTemplate(
        "Elektrik Arıza Yönetimi",
        "Anlık elektrik arıza bildirimleri ve planlı kesintileri bu panelden yönetebilirsiniz.",
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Aktif Arızalar</CardTitle>
                <CardDescription>Şu anda müdahale edilen arızalar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Girne - Merkez</h4>
                      <span className="text-red-600 text-sm">Kritik</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Trafo arızası, yaklaşık 250 haneyi etkiliyor</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">12:30'da bildirildi</span>
                      <Button size="sm" variant="outline">Detaylar</Button>
                    </div>
                  </div>
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Lefkoşa - Göçmenköy</h4>
                      <span className="text-amber-600 text-sm">Orta</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Hat kopması, 3 sokağı etkiliyor</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">10:15'de bildirildi</span>
                      <Button size="sm" variant="outline">Detaylar</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Planlı Kesintiler</CardTitle>
                <CardDescription>Bakım ve onarım için planlanan kesintiler</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Gazimağusa - Sakarya</h4>
                      <span className="text-blue-600 text-sm">Planlı</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Hat bakımı, yarın 09:00-13:00 arası</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">3 gün önce duyuruldu</span>
                      <Button size="sm" variant="outline">Düzenle</Button>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Girne - Karaoğlanoğlu</h4>
                      <span className="text-blue-600 text-sm">Planlı</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Trafo yenileme, 15.05.2023, 07:00-17:00</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">1 hafta önce duyuruldu</span>
                      <Button size="sm" variant="outline">Düzenle</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Arıza Ekipleri</CardTitle>
                <CardDescription>Saha ekiplerinin durumu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Ekip A - Girne</h4>
                      <Badge className="bg-red-100 text-red-800">Görevde</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Girne Merkez trafo arızası müdahalesi</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">Tahmini süre: 2 saat</span>
                      <Button size="sm" variant="outline">İletişim</Button>
                    </div>
                  </div>
                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Ekip B - Lefkoşa</h4>
                      <Badge className="bg-amber-100 text-amber-800">Yolda</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Göçmenköy arızasına gidiyor</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">Varış: 10 dk</span>
                      <Button size="sm" variant="outline">İletişim</Button>
                    </div>
                  </div>
                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Ekip C - Mağusa</h4>
                      <Badge className="bg-green-100 text-green-800">Müsait</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Beklemede</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">Merkez istasyonda</span>
                      <Button size="sm" variant="outline">Görevlendir</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>İstatistikler</CardTitle>
                <CardDescription>Son 30 gündeki arıza verileri</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Arıza Sayısı</span>
                      <span className="text-sm font-medium">56</span>
                    </div>
                    <Progress value={56} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Ortalama Müdahale Süresi</span>
                      <span className="text-sm font-medium">45 dk</span>
                    </div>
                    <Progress value={45} max={120} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Çözüm Oranı</span>
                      <span className="text-sm font-medium">%97</span>
                    </div>
                    <Progress value={97} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Tekrarlanan Arızalar</span>
                      <span className="text-sm font-medium">8</span>
                    </div>
                    <Progress value={8} max={56} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Button className="mt-4" onClick={() => toast.success("Yeni kesinti planlandı")}>Yeni Planlı Kesinti Ekle</Button>
        </div>
      );
    } else if (currentInstitution === 'SU' && activeSection === "water-outages") {
      return renderSectionTemplate(
        "Su Kesintileri",
        "Su kesintileri ve bakım çalışmalarını bu panelden takip edebilirsiniz.",
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Aktif Kesintiler</CardTitle>
                <CardDescription>Şu anda süren kesintiler</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Lefkoşa - Kumsal</h4>
                      <span className="text-red-600 text-sm">Acil</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Ana boru hattı arızası, 3 mahalle etkileniyor</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">45 dakika önce bildirildi</span>
                      <Button size="sm" variant="outline">Detaylar</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Planlı Kesintiler</CardTitle>
                <CardDescription>Bakım ve onarım için planlanan kesintiler</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Girne - Zeytinlik</h4>
                      <span className="text-blue-600 text-sm">Planlı</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Boru yenileme, 17.05.2023, 08:00-18:00</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">5 gün önce duyuruldu</span>
                      <Button size="sm" variant="outline">Düzenle</Button>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Mağusa - Maraş</h4>
                      <span className="text-blue-600 text-sm">Planlı</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Şebeke bakımı, 18.05.2023, 10:00-15:00</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">2 gün önce duyuruldu</span>
                      <Button size="sm" variant="outline">Düzenle</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Su Kesintisi Tankers</CardTitle>
              <CardDescription>Kesinti bölgelerine gönderilen su tankerleri</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border rounded-md">
                  <div className="flex justify-between">
                    <h4 className="font-medium">Tanker 1 - Lefkoşa Kumsal</h4>
                    <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Kumsal bölgesine su dağıtımı yapıyor</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">Kapasite: 10 ton</span>
                    <span className="text-xs text-gray-500">Saat: 14:00-17:00</span>
                  </div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="flex justify-between">
                    <h4 className="font-medium">Tanker 2 - Lefkoşa Kumsal</h4>
                    <Badge className="bg-amber-100 text-amber-800">Hazırlanıyor</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">15:00'da bölgeye hareket edecek</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">Kapasite: 8 ton</span>
                    <Button size="sm" variant="outline">Takip Et</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Altyapı Durumu</CardTitle>
                <CardDescription>Kritik su altyapısının durumu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Ana Boru Hattı</span>
                      <span className="text-sm text-amber-600 font-medium">Dikkat</span>
                    </div>
                    <Progress value={65} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Lefkoşa-Girne hattında basınç düşüklüğü</p>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Pompa İstasyonları</span>
                      <span className="text-sm text-green-600 font-medium">Normal</span>
                    </div>
                    <Progress value={90} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Tüm pompa istasyonları çalışıyor</p>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Şehir İçi Şebekesi</span>
                      <span className="text-sm text-red-600 font-medium">Arıza</span>
                    </div>
                    <Progress value={40} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Lefkoşa Kumsal'da tamir çalışması</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>İstatistikler</CardTitle>
                <CardDescription>Son 30 gündeki su kesintisi verileri</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-md p-3 text-center">
                    <h4 className="text-2xl font-bold">12</h4>
                    <p className="text-xs text-muted-foreground">Toplam Kesinti</p>
                  </div>
                  <div className="border rounded-md p-3 text-center">
                    <h4 className="text-2xl font-bold">4.3s</h4>
                    <p className="text-xs text-muted-foreground">Ortalama Süre</p>
                  </div>
                  <div className="border rounded-md p-3 text-center">
                    <h4 className="text-2xl font-bold">8</h4>
                    <p className="text-xs text-muted-foreground">Planlı Bakım</p>
                  </div>
                  <div className="border rounded-md p-3 text-center">
                    <h4 className="text-2xl font-bold">4</h4>
                    <p className="text-xs text-muted-foreground">Acil Müdahale</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Müdahale Hızı</span>
                    <span className="text-sm font-medium">32 dk</span>
                  </div>
                  <Progress value={32} max={60} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">Arıza bildirimi ile müdahale arası geçen süre</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <Button className="mt-4" onClick={() => toast.success("Yeni kesinti planlandı")}>
            <AlarmCheck className="w-4 h-4 mr-2" />
            Yeni Planlı Kesinti Ekle
          </Button>
        </div>
      );
    } else if (currentInstitution === 'DOGALGAZ' && activeSection === "gas-network") {
      return renderSectionTemplate(
        "Doğalgaz Hattı Yönetimi",
        "Doğalgaz şebekesinin durumunu izleyin ve yönetin.",
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Hat Basıncı</CardTitle>
                <CardDescription>Ana hat</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <Gauge className="w-12 h-12 mx-auto text-amber-500" />
                  <p className="text-3xl font-bold mt-2">6.2 bar</p>
                  <p className="text-xs text-muted-foreground mt-1">Normal aralık: 5.8-6.5 bar</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Aktif Vana Sayısı</CardTitle>
                <CardDescription>Şebeke geneli</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold">124/126</div>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <Badge className="bg-green-100 text-green-800">124 Aktif</Badge>
                    <Badge variant="outline" className="bg-red-100 text-red-800">2 Kapalı</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">2 vana bakım için kapatıldı</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Gaz Sıcaklığı</CardTitle>
                <CardDescription>Ortalama değer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <Flame className="w-12 h-12 mx-auto text-red-500" />
                  <p className="text-3xl font-bold mt-2">18.5°C</p>
                  <p className="text-xs text-muted-foreground mt-1">Normal aralık: 15-22°C</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Şebeke Durumu</CardTitle>
                <CardDescription>Anlık şebeke verileri</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Ana Hat Basıncı</span>
                      <span className="text-sm text-green-600 font-medium">Normal</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">6.2 bar (normal aralık: 5.8-6.5 bar)</p>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Sekonder Hat Basıncı</span>
                      <span className="text-sm text-green-600 font-medium">Normal</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">3.8 bar (normal aralık: 3.5-4.2 bar)</p>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Lefkoşa Bölgesi</span>
                      <span className="text-sm text-amber-600 font-medium">Dikkat</span>
                    </div>
                    <Progress value={55} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Basınç düşüşü - izleme devam ediyor</p>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Girne Bölgesi</span>
                      <span className="text-sm text-green-600 font-medium">Normal</span>
                    </div>
                    <Progress value={90} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">3.9 bar - stabil</p>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Gazimağusa Bölgesi</span>
                      <span className="text-sm text-green-600 font-medium">Normal</span>
                    </div>
                    <Progress value={88} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">4.0 bar - stabil</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Acil Durum İstasyonları</CardTitle>
                <CardDescription>Ana vana ve basınç düşürme istasyonları</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <h4 className="font-medium">İstasyon #1 - Lefkoşa Merkez</h4>
                      <Badge className="bg-green-100 text-green-800">Normal</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Giriş:</span> 6.2 bar
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Çıkış:</span> 4.0 bar
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Sıcaklık:</span> 18.2°C
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Son Bakım:</span> 12.04.2023
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <h4 className="font-medium">İstasyon #2 - Girne</h4>
                      <Badge className="bg-green-100 text-green-800">Normal</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Giriş:</span> 5.9 bar
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Çıkış:</span> 3.9 bar
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Sıcaklık:</span> 19.1°C
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Son Bakım:</span> 15.04.2023
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <h4 className="font-medium">İstasyon #3 - Gazimağusa</h4>
                      <Badge className="bg-amber-100 text-amber-800">Bakım Planlandı</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Giriş:</span> 6.0 bar
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Çıkış:</span> 4.0 bar
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Sıcaklık:</span> 18.5°C
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Bakım Tarihi:</span> 20.05.2023
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Hat Bakım Planı</CardTitle>
              <CardDescription>Yaklaşan bakım ve kontrol çalışmaları</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="p-3 grid grid-cols-6 font-medium bg-muted">
                  <div>Kod</div>
                  <div className="col-span-2">Bölge/Hat</div>
                  <div>Tarih</div>
                  <div>Durum</div>
                  <div>İşlemler</div>
                </div>
                {[
                  { id: "M001", area: "Lefkoşa - Göçmenköy Ana Hat", date: "18.05.2023", status: "scheduled" },
                  { id: "M002", area: "Girne İstasyon #2 Bakımı", date: "25.05.2023", status: "scheduled" },
                  { id: "M003", area: "Gazimağusa İstasyon #3 Bakımı", date: "20.05.2023", status: "scheduled" },
                  { id: "M004", area: "Lefkoşa - Hamitköy Vana Kontrolü", date: "10.05.2023", status: "completed" },
                ].map((task) => (
                  <div key={task.id} className="p-3 grid grid-cols-6 items-center border-t">
                    <div>{task.id}</div>
                    <div className="col-span-2">{task.area}</div>
                    <div>{task.date}</div>
                    <div>
                      {task.status === "scheduled" && <Badge className="bg-blue-100 text-blue-800">Planlandı</Badge>}
                      {task.status === "completed" && <Badge className="bg-green-100 text-green-800">Tamamlandı</Badge>}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <PenTool className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      );
    } else if (currentInstitution === 'BELEDIYE' && activeSection === "city-planning") {
      return renderSectionTemplate(
        "Şehir Planlama",
        "Şehir planlama projelerini ve imar faaliyetlerini yönetin.",
        <div className="space-y-6">
          <Tabs defaultValue="projects">
            <TabsList>
              <TabsTrigger value="projects">Aktif Projeler</TabsTrigger>
              <TabsTrigger value="zoning">İmar Planları</TabsTrigger>
              <TabsTrigger value="permits">Ruhsat Başvuruları</TabsTrigger>
              <TabsTrigger value="infrastructure">Altyapı Projeleri</TabsTrigger>
            </TabsList>
            <TabsContent value="projects">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {[
                  { id: 1, title: "Merkez Caddesi Yenileme", description: "Merkez caddesinin yaya dostu olarak yenilenmesi projesi", status: "progress", progress: 65, budget: "2.5M €", endDate: "01.09.2023" },
                  { id: 2, title: "Yeşil Alan Projesi", description: "Şehir genelinde 5 yeni park alanı oluşturulması", status: "progress", progress: 30, budget: "1.2M €", endDate: "15.10.2023" },
                  { id: 3, title: "Bisiklet Yolları", description: "Toplam 12 km bisiklet yolu inşası projesi", status: "planning", progress: 10, budget: "800K €", endDate: "01.03.2024" },
                  { id: 4, title: "Tarihi Merkez Restorasyonu", description: "Tarihi binaların restore edilmesi projesi", status: "progress", progress: 45, budget: "3.2M €", endDate: "01.12.2023" },
                  { id: 5, title: "Akıllı Trafik Sistemi", description: "Akıllı kavşak ve trafik izleme sistemi", status: "planning", progress: 5, budget: "1.7M €", endDate: "01.04.2024" },
                  { id: 6, title: "Sahil Şeridi Düzenlemesi", description: "Sahil şeridinin rekreasyon alanı olarak düzenlenmesi", status: "completed", progress: 100, budget: "950K €", endDate: "01.04.2023" },
                ].map((project) => (
                  <Card key={project.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        {project.status === "progress" && <Badge className="bg-blue-100 text-blue-800">Devam Ediyor</Badge>}
                        {project.status === "planning" && <Badge className="bg-amber-100 text-amber-800">Planlama</Badge>}
                        {project.status === "completed" && <Badge className="bg-green-100 text-green-800">Tamamlandı</Badge>}
                      </div>
                      <CardDescription className="text-sm">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>İlerleme</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Bütçe:</span> {project.budget}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Bitiş:</span> {project.endDate}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="outline" size="sm" className="w-full">Detaylar</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="zoning">
              <div className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>İmar Planları</CardTitle>
                    <CardDescription>Onaylanmış ve planlanan imar planları</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="p-3 grid grid-cols-6 font-medium bg-muted">
                        <div>Plan No</div>
                        <div className="col-span-2">Bölge</div>
                        <div>Onay Tarihi</div>
                        <div>Durum</div>
                        <div>İşlemler</div>
                      </div>
                      {[
                        { id: "P001", area: "Lefkoşa Merkez Bölgesi", date: "15.01.2023", status: "active" },
                        { id: "P002", area: "Girne Sahil Şeridi", date: "20.03.2023", status: "active" },
                        { id: "P003", area: "Gazimağusa Gelişim Bölgesi", date: "10.04.2023", status: "active" },
                        { id: "P004", area: "Lefke Kentsel Dönüşüm", date: "--", status: "review" },
                        { id: "P005", area: "Güzelyurt Tarım Alanları", date: "--", status: "planning" },
                      ].map((plan) => (
                        <div key={plan.id} className="p-3 grid grid-cols-6 items-center border-t">
                          <div>{plan.id}</div>
                          <div className="col-span-2">{plan.area}</div>
                          <div>{plan.date}</div>
                          <div>
                            {plan.status === "active" && <Badge className="bg-green-100 text-green-800">Aktif</Badge>}
                            {plan.status === "review" && <Badge className="bg-amber-100 text-amber-800">İncelemede</Badge>}
                            {plan.status === "planning" && <Badge className="bg-blue-100 text-blue-800">Planlama</Badge>}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Map className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="permits">
              <div className="space-y-4 mt-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Input placeholder="Başvuru ara..." className="max-w-sm" />
                  <Button variant="outline">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filtrele" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tüm Başvurular</SelectItem>
                      <SelectItem value="pending">Bekleyen</SelectItem>
                      <SelectItem value="approved">Onaylanan</SelectItem>
                      <SelectItem value="rejected">Reddedilen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-md border">
                  <div className="p-3 grid grid-cols-6 font-medium bg-muted">
                    <div>Başvuru No</div>
                    <div className="col-span-2">Proje</div>
                    <div>Başvuru Tarihi</div>
                    <div>Durum</div>
                    <div>İşlemler</div>
                  </div>
                  {[
                    { id: "R001", project: "Yeni Konut İnşaatı", address: "Lefkoşa, Göçmenköy", date: "12.05.2023", status: "pending" },
                    { id: "R002", project: "Otel Renovasyonu", address: "Girne, Merkez", date: "05.05.2023", status: "review" },
                    { id: "R003", project: "AVM İnşaatı", address: "Mağusa, Sakarya", date: "28.04.2023", status: "pending" },
                    { id: "R004", project: "Villa Projesi", address: "Girne, Karaoğlanoğlu", date: "20.04.2023", status: "approved" },
                    { id: "R005", project: "Ofis Binası", address: "Lefkoşa, Mermerköy", date: "15.04.2023", status: "rejected" },
                  ].map((permit) => (
                    <div key={permit.id} className="p-3 grid grid-cols-6 items-center border-t">
                      <div>{permit.id}</div>
                      <div className="col-span-2">
                        <div>{permit.project}</div>
                        <div className="text-xs text-muted-foreground">{permit.address}</div>
                      </div>
                      <div>{permit.date}</div>
                      <div>
                        {permit.status === "pending" && <Badge className="bg-blue-100 text-blue-800">Bekliyor</Badge>}
                        {permit.status === "review" && <Badge className="bg-amber-100 text-amber-800">İncelemede</Badge>}
                        {permit.status === "approved" && <Badge className="bg-green-100 text-green-800">Onaylandı</Badge>}
                        {permit.status === "rejected" && <Badge variant="destructive">Reddedildi</Badge>}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <PenTool className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="infrastructure">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Yol Projeleri</CardTitle>
                    <CardDescription>Yol yapım ve bakım projeleri</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { title: "Ana Arter Genişletme", description: "Lefkoşa-Girne anayolu genişletme", status: "progress", progress: 35 },
                        { title: "Asfalt Yenileme", description: "Şehir içi yolların asfalt yenilemesi", status: "progress", progress: 70 },
                        { title: "Kavşak İnşası", description: "Yeni akıllı kavşak sistemi", status: "planning", progress: 10 },
                      ].map((project, index) => (
                        <div key={index} className="p-3 border rounded-md">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{project.title}</h4>
                            {project.status === "progress" && <Badge className="bg-blue-100 text-blue-800">Devam Ediyor</Badge>}
                            {project.status === "planning" && <Badge className="bg-amber-100 text-amber-800">Planlama</Badge>}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                          <div className="mt-2">
                            <div className="flex justify-between text-sm mb-1">
                              <span>İlerleme</span>
                              <span>{project.progress}%</span>
                            </div>
                            <Progress value={project.progress} className="h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Su ve Kanalizasyon</CardTitle>
                    <CardDescription>Su ve kanalizasyon altyapı projeleri</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { title: "Ana Kanalizasyon Hattı", description: "Merkez bölgesinin kanalizasyon yenilemesi", status: "progress", progress: 55 },
                        { title: "İçme Suyu Şebekesi", description: "İçme suyu hatları yenileme projesi", status: "progress", progress: 40 },
                        { title: "Arıtma Tesisi", description: "Yeni arıtma tesisi kurulumu", status: "planning", progress: 15 },
                      ].map((project, index) => (
                        <div key={index} className="p-3 border rounded-md">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{project.title}</h4>
                            {project.status === "progress" && <Badge className="bg-blue-100 text-blue-800">Devam Ediyor</Badge>}
                            {project.status === "planning" && <Badge className="bg-amber-100 text-amber-800">Planlama</Badge>}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                          <div className="mt-2">
                            <div className="flex justify-between text-sm mb-1">
                              <span>İlerleme</span>
                              <span>{project.progress}%</span>
                            </div>
                            <Progress value={project.progress} className="h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      );
    } else if (currentInstitution === 'TURIZM' && activeSection === "accommodation") {
      return renderSectionTemplate(
        "Konaklama ve Otel",
        "Konaklama tesisleri ve otelleri yönetin.",
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Toplam Konaklama</CardTitle>
                <CardDescription>Kayıtlı tesisler</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">213</p>
                <div className="flex space-x-2 mt-2">
                  <Badge className="bg-blue-100 text-blue-800">128 Otel</Badge>
                  <Badge className="bg-green-100 text-green-800">85 Diğer</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Doluluk Oranı</CardTitle>
                <CardDescription>Mevcut ortalama</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">78%</p>
                <p className="text-xs text-muted-foreground mt-1">Geçen ay: 65%</p>
                <Progress value={78} className="h-2 mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Ortalama Fiyat</CardTitle>
                <CardDescription>Gecelik</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">€85</p>
                <p className="text-xs text-muted-foreground mt-1">Yüksek sezon: €110</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Konaklama Tesisleri</CardTitle>
              <CardDescription>Tüm kayıtlı konaklama tesisleri</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Input placeholder="Tesis ara..." className="max-w-sm" />
                <Button variant="outline">
                  <Search className="h-4 w-4" />
                </Button>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrele" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Tesisler</SelectItem>
                    <SelectItem value="hotel">Oteller</SelectItem>
                    <SelectItem value="resort">Tatil Köyleri</SelectItem>
                    <SelectItem value="hostel">Pansiyonlar</SelectItem>
                    <SelectItem value="apartment">Daireler</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <div className="p-3 grid grid-cols-7 font-medium bg-muted">
                  <div>Kod</div>
                  <div className="col-span-2">Tesis</div>
                  <div>Tür</div>
                  <div>Kapasite</div>
                  <div>Durum</div>
                  <div>İşlemler</div>
                </div>
                {[
                  { id: "H001", name: "Palm Beach Hotel", type: "hotel", location: "Girne", capacity: 150, status: "active", rating: 4.5 },
                  { id: "H002", name: "Golden Bay Resort", type: "resort", location: "Gazimağusa", capacity: 200, status: "active", rating: 4.7 },
                  { id: "H003", name: "Kyrenia Lodge", type: "hotel", location: "Girne", capacity: 80, status: "active", rating: 4.2 },
                  { id: "H004", name: "Sunset Apartments", type: "apartment", location: "Alsancak", capacity: 40, status: "active", rating: 4.0 },
                  { id: "H005", name: "Nicosia Central", type: "hotel", location: "Lefkoşa", capacity: 120, status: "renovation", rating: 0 },
                ].map((hotel) => (
                  <div key={hotel.id} className="p-3 grid grid-cols-7 items-center border-t">
                    <div>{hotel.id}</div>
                    <div className="col-span-2">
                      <div>{hotel.name}</div>
                      <div className="text-xs text-muted-foreground">{hotel.location}</div>
                    </div>
                    <div>
                      {hotel.type === "hotel" && <Badge className="bg-blue-100 text-blue-800">Otel</Badge>}
                      {hotel.type === "resort" && <Badge className="bg-purple-100 text-purple-800">Tatil Köyü</Badge>}
                      {hotel.type === "apartment" && <Badge className="bg-amber-100 text-amber-800">Daire</Badge>}
                    </div>
                    <div>{hotel.capacity} oda</div>
                    <div>
                      {hotel.status === "active" && (
                        <div className="flex items-center space-x-1">
                          <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                          <span className="text-sm">{hotel.rating}/5</span>
                        </div>
                      )}
                      {hotel.status === "renovation" && <Badge variant="outline">Renovasyon</Badge>}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <PenTool className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Headphones className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Yeni Başvurular</CardTitle>
                <CardDescription>Bekleyen tesis başvuruları</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Sea View Boutique Hotel", type: "hotel", location: "Girne", status: "pending" },
                    { name: "Mountain Lodge", type: "hostel", location: "Karşıyaka", status: "review" },
                  ].map((hotel, index) => (
                    <div key={index} className="p-3 border rounded-md">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{hotel.name}</h4>
                        {hotel.status === "pending" && <Badge className="bg-blue-100 text-blue-800">Bekliyor</Badge>}
                        {hotel.status === "review" && <Badge className="bg-amber-100 text-amber-800">İncelemede</Badge>}
                      </div>
                      <div className="flex items-center gap-2 text-sm mt-1">
                        <span className="text-muted-foreground">Tür:</span>
                        <span>{hotel.type === "hotel" ? "Otel" : "Pansiyon"}</span>
                        <span>•</span>
                        <span className="text-muted-foreground">Yer:</span>
                        <span>{hotel.location}</span>
                      </div>
                      <div className="flex justify-end gap-2 mt-2">
                        <Button size="sm" variant="outline">İncele</Button>
                        <Button size="sm">Onayla</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Yaklaşan Denetimler</CardTitle>
                <CardDescription>Planlanan tesis denetimleri</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Olive Tree Hotel", date: "20.05.2023", type: "Yıllık Denetim", inspector: "Ali Yılmaz" },
                    { name: "Pine Bay Resort", date: "25.05.2023", type: "Hijyen Denetimi", inspector: "Ayşe Kaya" },
                    { name: "City Central", date: "01.06.2023", type: "Yıllık Denetim", inspector: "Mehmet Demir" },
                  ].map((inspection, index) => (
                    <div key={index} className="p-3 border rounded-md">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{inspection.name}</h4>
                        <span className="text-sm">{inspection.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm mt-1">
                        <span className="text-muted-foreground">Tür:</span>
                        <span>{inspection.type}</span>
                        <span>•</span>
                        <span className="text-muted-foreground">Denetçi:</span>
                        <span>{inspection.inspector}</span>
                      </div>
                      <div className="flex justify-end mt-2">
                        <Button size="sm" variant="outline">Detaylar</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    } else if (currentInstitution === 'BAKANLIK' && activeSection === "tourism-stats") {
      return renderSectionTemplate(
        "Turizm İstatistikleri",
        "KKTC turizm istatistikleri ve raporları.",
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Toplam Ziyaretçi</CardTitle>
                <CardDescription>Bu yıl</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">857,230</p>
                <div className="flex items-center text-green-600 mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-xs">%12 artış</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Geceleme Sayısı</CardTitle>
                <CardDescription>Bu yıl</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">3.2M</p>
                <div className="flex items-center text-green-600 mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-xs">%8 artış</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Turizm Gelirleri</CardTitle>
                <CardDescription>Bu yıl</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">€204M</p>
                <div className="flex items-center text-green-600 mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-xs">%15 artış</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Ortalama Harcama</CardTitle>
                <CardDescription>Kişi başı/gün</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">€75</p>
                <div className="flex items-center text-green-600 mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-xs">%5 artış</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ziyaretçi Milliyetleri</CardTitle>
                <CardDescription>Ülkelere göre dağılım</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Türkiye</span>
                      <span className="text-sm font-medium">58%</span>
                    </div>
                    <Progress value={58} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">İngiltere</span>
                      <span className="text-sm font-medium">15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Almanya</span>
                      <span className="text-sm font-medium">8%</span>
                    </div>
                    <Progress value={8} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Rusya</span>
                      <span className="text-sm font-medium">7%</span>
                    </div>
                    <Progress value={7} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">İran</span>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                    <Progress value={5} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Diğer</span>
                      <span className="text-sm font-medium">7%</span>
                    </div>
                    <Progress value={7} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Bölgelere Göre Turist Dağılımı</CardTitle>
                <CardDescription>Bölgelere göre turist yoğunluğu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Girne</span>
                      <span className="text-sm font-medium">52%</span>
                    </div>
                    <Progress value={52} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Gazimağusa</span>
                      <span className="text-sm font-medium">18%</span>
                    </div>
                    <Progress value={18} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Lefkoşa</span>
                      <span className="text-sm font-medium">12%</span>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">İskele-Bafra</span>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                    <Progress value={10} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Güzelyurt</span>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                    <Progress value={5} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Lefke</span>
                      <span className="text-sm font-medium">3%</span>
                    </div>
                    <Progress value={3} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Turizm Göstergeleri</CardTitle>
              <CardDescription>Aylık trend analizi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="p-3 grid grid-cols-6 font-medium bg-muted">
                  <div>Ay</div>
                  <div>Ziyaretçi Sayısı</div>
                  <div>Geceleme</div>
                  <div>Ortalama Kalış</div>
                  <div>Doluluk Oranı</div>
                  <div>Gelir (€)</div>
                </div>
                {[
                  { month: "Mayıs", visitors: "82,500", nights: "280,450", stay: "3.4", occupancy: "68%", revenue: "20.5M" },
                  { month: "Nisan", visitors: "76,200", nights: "258,300", stay: "3.4", occupancy: "62%", revenue: "18.1M" },
                  { month: "Mart", visitors: "65,800", nights: "210,560", stay: "3.2", occupancy: "55%", revenue: "15.3M" },
                  { month: "Şubat", visitors: "52,300", nights: "166,240", stay: "3.2", occupancy: "48%", revenue: "12.2M" },
                  { month: "Ocak", visitors: "48,100", nights: "148,790", stay: "3.1", occupancy: "45%", revenue: "10.8M" },
                ].map((data, index) => (
                  <div key={index} className="p-3 grid grid-cols-6 items-center border-t">
                    <div>{data.month}</div>
                    <div>{data.visitors}</div>
                    <div>{data.nights}</div>
                    <div>{data.stay} gün</div>
                    <div>{data.occupancy}</div>
                    <div>{data.revenue}</div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                PDF Raporu İndir
              </Button>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Seyahat Amacı</CardTitle>
                <CardDescription>Turistlerin seyahat amacı dağılımı</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Tatil / Eğlence</span>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">İş / Toplantı</span>
                      <span className="text-sm font-medium">12%</span>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Sağlık Turizmi</span>
                      <span className="text-sm font-medium">8%</span>
                    </div>
                    <Progress value={8} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Kültür / Tarih</span>
                      <span className="text-sm font-medium">7%</span>
                    </div>
                    <Progress value={7} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Eğitim</span>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                    <Progress value={5} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Diğer</span>
                      <span className="text-sm font-medium">3%</span>
                    </div>
                    <Progress value={3} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Turizm İşletmeleri</CardTitle>
                <CardDescription>Türlerine göre tesis sayıları</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="border rounded-md p-4 text-center">
                    <h4 className="text-2xl font-bold">412</h4>
                    <p className="text-xs text-muted-foreground mt-1">Toplam Tesis</p>
                  </div>
                  <div className="border rounded-md p-4 text-center">
                    <h4 className="text-2xl font-bold">28,950</h4>
                    <p className="text-xs text-muted-foreground mt-1">Toplam Yatak</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">5 Yıldızlı Oteller</span>
                      <span className="text-sm font-medium">42</span>
                    </div>
                    <Progress value={42} max={412} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">4 Yıldızlı Oteller</span>
                      <span className="text-sm font-medium">65</span>
                    </div>
                    <Progress value={65} max={412} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">3 Yıldızlı Oteller</span>
                      <span className="text-sm font-medium">83</span>
                    </div>
                    <Progress value={83} max={412} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Tatil Köyleri</span>
                      <span className="text-sm font-medium">38</span>
                    </div>
                    <Progress value={38} max={412} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Butik Oteller</span>
                      <span className="text-sm font-medium">56</span>
                    </div>
                    <Progress value={56} max={412} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Pansiyonlar ve Diğer</span>
                      <span className="text-sm font-medium">128</span>
                    </div>
                    <Progress value={128} max={412} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    } else {
      const menuItem = menuItems.find(item => item.id === activeSection);
      const sectionTitle = menuItem ? menuItem.label : activeSection;

      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">{sectionTitle}</h1>
          <div className="flex items-center justify-center p-12 border rounded-lg bg-muted/40">
            <div className="text-center space-y-3">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="text-lg font-medium">Bu modül geliştirme aşamasındadır</h3>
              <p className="text-muted-foreground max-w-md">Bu özellik yakında kullanıma açılacaktır. Gelişmelerden haberdar olmak için bildirimleri takip edebilirsiniz.</p>
              <Button variant="outline" onClick={() => toast.success("Modül hazır olduğunda bildirim alacaksınız")}>
                Haber Ver
              </Button>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex w-64 flex-col border-r">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">{institutionName}</h2>
        </div>
        <ScrollArea className="flex-1">
          <div className="py-2">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "secondary" : "ghost"}
                className="w-full justify-start mb-1 px-4"
                onClick={() => setActiveSection(item.id)}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Button>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleSignOut}
          >
            <Settings className="mr-2 h-4 w-4" />
            Çıkış Yap
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-background/80 z-50 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 md:hidden`}>
        <div className="bg-background h-full w-64 border-r shadow-lg">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold truncate">{institutionName}</h2>
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              <XCircle className="h-5 w-5" />
            </Button>
          </div>
          <ScrollArea className="h-[calc(100%-8rem)]">
            <div className="py-2">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "secondary" : "ghost"}
                  className="w-full justify-start mb-1 px-4"
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </Button>
              ))}
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleSignOut}
            >
              <Settings className="mr-2 h-4 w-4" />
              Çıkış Yap
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center p-4 border-b">
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex-1 md:hidden mx-auto">
            <h2 className="text-xl font-bold text-center">{institutionName}</h2>
          </div>
          <div className="md:flex items-center space-x-4 hidden">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Ara..."
                className="w-64 pl-8"
              />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback>KP</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {renderActiveSection()}
        </div>
      </div>

      {showResponseDialog && selectedItemId && (
        <ResponseDialog
          open={showResponseDialog}
          onOpenChange={handleCloseResponseDialog}
          onRespond={handleRespond}
        />
      )}

      {showAssignDialog && selectedItemId && (
        <AssignReportDialog
          open={showAssignDialog}
          onOpenChange={handleCloseAssignDialog}
          onAssign={handleAssign}
        />
      )}
    </div>
  );
};

export default Institution;

