
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
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
  
  // Demo data for module content
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
    // localStorage'dan kurum kodunu al (gerçek bir uygulamada bu auth sisteminden gelir)
    const institutionCode = localStorage.getItem("testUserType");
    console.log("Institution - Kurum tipi:", institutionCode);
    
    // Test girişinden kurum koduna göre kurum anahtarını bul
    if (institutionCode) {
      setCurrentInstitution(institutionCode);
      
      // Kurum adını ayarla
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
    // Bu normalde geri bildirim ve raporları yeniden yükler
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
    handleCloseResponseDialog();
    loadData();
  };

  const handleAssign = (unitId: string) => {
    toast.success(`Rapor ${unitId} birimine atandı`);
    handleCloseAssignDialog();
    loadData();
  };

  // Tüm kurumlar için ortak menü öğelerini tanımla
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

  // Kuruma özgü menü öğelerini tanımla
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

  // Ortak menü öğeleriyle kurum-spesifik olanları bir araya getir eğer bir kurum seçiliyse
  const menuItems = currentInstitution && institutionSpecificMenuItems[currentInstitution] 
    ? [...commonMenuItems, ...institutionSpecificMenuItems[currentInstitution]]
    : commonMenuItems;

  // Kuruma özgü içerik üretimi için yardımcı fonksiyonlar
  const renderInstitutionDashboardCards = () => {
    if (!currentInstitution) return null;
    
    switch(currentInstitution) {
      case 'ELEKTRIK':
        return (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Elektrik Arızaları</CardTitle>
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

  // Kuruma özgü içerik oluştur
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
    } else {
      // Kuruma özgü başlık için
      const menuItem = menuItems.find(item => item.id === activeSection);
      const sectionTitle = menuItem ? menuItem.label : activeSection;

      // Kuruma özgü içerikler
      let sectionContent;
      
      if (currentInstitution === 'ELEKTRIK' && activeSection === "power-outages") {
        sectionContent = (
          <div className="space-y-4">
            <p className="text-gray-600">Anlık elektrik arıza bildirimleri ve planlı kesintileri bu panelden yönetebilirsiniz.</p>
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
            <Button className="mt-4" onClick={() => toast.success("Yeni kesinti planlandı")}>Yeni Planlı Kesinti Ekle</Button>
          </div>
        );
      } else if (currentInstitution === 'SU' && activeSection === "water-outages") {
        sectionContent = (
          <div className="space-y-4">
            <p className="text-gray-600">Su kesintileri ve bakım çalışmalarını bu panelden takip edebilirsiniz.</p>
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
                      <p className="text-sm text-gray-600 mt-1">Ana boru hattı patlaması, 3 mahalleyi etkiliyor</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">08:20'de bildirildi</span>
                        <Button size="sm" variant="outline">Detaylar</Button>
                      </div>
                    </div>
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Girne - Zeytinlik</h4>
                        <span className="text-amber-600 text-sm">Devam Ediyor</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Boru değişimi, 2 sokağı etkiliyor</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">Dün 15:30'da başladı</span>
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
                        <h4 className="font-medium">Gazimağusa - Liman</h4>
                        <span className="text-blue-600 text-sm">Planlı</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Şebeke yenileme, yarın 08:00-16:00 arası</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">2 gün önce duyuruldu</span>
                        <Button size="sm" variant="outline">Düzenle</Button>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Lefkoşa - Göçmenköy</h4>
                        <span className="text-blue-600 text-sm">Planlı</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Ana vana değişimi, 14.05.2023, 09:00-15:00</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">5 gün önce duyuruldu</span>
                        <Button size="sm" variant="outline">Düzenle</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Button className="mt-4" onClick={() => toast.success("Yeni kesinti planlandı")}>Yeni Planlı Kesinti Ekle</Button>
          </div>
        );
      } else if (currentInstitution === 'DOGALGAZ' && activeSection === "gas-network") {
        sectionContent = (
          <div className="space-y-4">
            <p className="text-gray-600">Doğalgaz şebekesi ve ana hat yönetimi bu panelden yapılır.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Şebeke Durumu</CardTitle>
                  <CardDescription>Ana hatların durumu</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Lefkoşa Ana Hat</h4>
                        <span className="text-green-600 text-sm">Normal</span>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm">
                          <span>Basınç</span>
                          <span>6.2 bar</span>
                        </div>
                        <Progress value={62} className="h-2 mt-1" />
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm">
                          <span>Kapasite</span>
                          <span>78%</span>
                        </div>
                        <Progress value={78} className="h-2 mt-1" />
                      </div>
                    </div>
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Girne Ana Hat</h4>
                        <span className="text-amber-600 text-sm">Dikkat</span>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm">
                          <span>Basınç</span>
                          <span>5.4 bar</span>
                        </div>
                        <Progress value={54} className="h-2 mt-1" />
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm">
                          <span>Kapasite</span>
                          <span>92%</span>
                        </div>
                        <Progress value={92} className="h-2 mt-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Bakım Planı</CardTitle>
                  <CardDescription>Planlanan bakım çalışmaları</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[250px]">
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <div className="flex justify-between">
                          <h4 className="font-medium">Gazimağusa Bölgesi</h4>
                          <span className="text-blue-600 text-sm">17 Mayıs</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Vana değişimi ve basınç testleri</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-500">Ekip: Teknik-3</span>
                          <Button size="sm" variant="outline">Detaylar</Button>
                        </div>
                      </div>
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <div className="flex justify-between">
                          <h4 className="font-medium">Lefkoşa - Gönyeli</h4>
                          <span className="text-blue-600 text-sm">22 Mayıs</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Ana hatta bağlantı ve test</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-500">Ekip: Teknik-1</span>
                          <Button size="sm" variant="outline">Detaylar</Button>
                        </div>
                      </div>
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <div className="flex justify-between">
                          <h4 className="font-medium">Girne - Alsancak</h4>
                          <span className="text-blue-600 text-sm">29 Mayıs</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Şebeke genişletme çalışması</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-500">Ekip: Teknik-2</span>
                          <Button size="sm" variant="outline">Detaylar</Button>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Şebeke Haritası</CardTitle>
                  <CardDescription>Doğalgaz ana hat ve bölge dağılımı</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <MapSection />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => toast.info("Harita güncellendi")}>Haritayı Güncelle</Button>
                  <Button onClick={() => toast.success("Rapor oluşturuldu")}>Rapor Oluştur</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        );
      } else if (currentInstitution === 'TURIZM' && activeSection === "accommodation") {
        sectionContent = (
          <div className="space-y-4">
            <p className="text-gray-600">Bölgedeki konaklama tesisleri ve otel bilgilerini bu panelden yönetebilirsiniz.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Otel İstatistikleri</CardTitle>
                  <CardDescription>Genel bakış</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Kayıtlı Oteller</span>
                      <span className="font-medium">127</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Toplam Oda Kapasitesi</span>
                      <span className="font-medium">8,450</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Ortalama Doluluk</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">5 Yıldızlı Oteller</span>
                      <span className="font-medium">24</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Aktif Rezervasyonlar</span>
                      <span className="font-medium">3,245</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Doluluk Oranları</CardTitle>
                  <CardDescription>Son 30 gün</CardDescription>
                </CardHeader>
                <CardContent className="h-[200px]">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <BarChart className="h-16 w-16 mx-auto text-primary opacity-50" />
                      <p className="mt-2 text-sm text-muted-foreground">Grafik görselleştirmesi</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Otel Listesi</CardTitle>
                  <Button size="sm" onClick={() => toast.success("Yeni otel eklendi")}>Yeni Ekle</Button>
                </div>
                <CardDescription>Bölgedeki tüm oteller</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Grand Luxury Hotel</h3>
                          <p className="text-sm text-gray-500">Girne, Merkez</p>
                        </div>
                        <Badge>5 Yıldız</Badge>
                      </div>
                      <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Oda Sayısı:</span>
                          <span className="ml-1">124</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Doluluk:</span>
                          <span className="ml-1 text-green-600">89%</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Değerlendirme:</span>
                          <span className="ml-1">4.8/5</span>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end space-x-2">
                        <Button size="sm" variant="outline">Detaylar</Button>
                        <Button size="sm" variant="outline">Düzenle</Button>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Seaside Resort</h3>
                          <p className="text-sm text-gray-500">Gazimağusa, Sahil</p>
                        </div>
                        <Badge>4 Yıldız</Badge>
                      </div>
                      <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Oda Sayısı:</span>
                          <span className="ml-1">86</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Doluluk:</span>
                          <span className="ml-1 text-amber-600">72%</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Değerlendirme:</span>
                          <span className="ml-1">4.5/5</span>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end space-x-2">
                        <Button size="sm" variant="outline">Detaylar</Button>
                        <Button size="sm" variant="outline">Düzenle</Button>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Mountain View Hotel</h3>
                          <p className="text-sm text-gray-500">Lefkoşa, Merkezköy</p>
                        </div>
                        <Badge>3 Yıldız</Badge>
                      </div>
                      <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Oda Sayısı:</span>
                          <span className="ml-1">42</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Doluluk:</span>
                          <span className="ml-1 text-blue-600">65%</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Değerlendirme:</span>
                          <span className="ml-1">4.1/5</span>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end space-x-2">
                        <Button size="sm" variant="outline">Detaylar</Button>
                        <Button size="sm" variant="outline">Düzenle</Button>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        );
      } else if (currentInstitution === 'BELEDIYE' && activeSection === "municipal-services") {
        sectionContent = (
          <div className="space-y-4">
            <p className="text-gray-600">Belediye hizmetlerini ve vatandaş başvurularını bu panelden yönetebilirsiniz.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Hizmet İstatistikleri</CardTitle>
                  <CardDescription>Son 30 gün</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Altyapı Talepleri</span>
                        <span>86 talep</span>
                      </div>
                      <Progress value={86} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Temizlik Hizmetleri</span>
                        <span>124 talep</span>
                      </div>
                      <Progress value={62} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Park ve Bahçeler</span>
                        <span>42 talep</span>
                      </div>
                      <Progress value={21} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>İmar ve Ruhsat</span>
                        <span>58 talep</span>
                      </div>
                      <Progress value={29} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Aktif Hizmetler</CardTitle>
                  <CardDescription>Devam eden çalışmalar</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px]">
                    <div className="space-y-3">
                      <div className="border border-amber-200 bg-amber-50 rounded-md p-3">
                        <div className="flex justify-between">
                          <h4 className="font-medium">Merkez Cadde Asfaltlama</h4>
                          <Badge variant="outline" className="text-amber-600">Devam Ediyor</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">8 günlük çalışma, %65 tamamlandı</p>
                        <Progress value={65} className="h-2 mt-2 mb-2" />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Başlangıç: 05.05.2023</span>
                          <span>Bitiş: 15.05.2023</span>
                        </div>
                      </div>
                      <div className="border border-amber-200 bg-amber-50 rounded-md p-3">
                        <div className="flex justify-between">
                          <h4 className="font-medium">Göçmenköy Park Yenileme</h4>
                          <Badge variant="outline" className="text-amber-600">Devam Ediyor</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">4 haftalık proje, %40 tamamlandı</p>
                        <Progress value={40} className="h-2 mt-2 mb-2" />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Başlangıç: 20.04.2023</span>
                          <span>Bitiş: 20.05.2023</span>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Vatandaş Talepleri</CardTitle>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => toast.info("Talepler filtrelendi")}>Filtrele</Button>
                    <Button size="sm" onClick={() => toast.success("Rapor oluşturuldu")}>Rapor Oluştur</Button>
                  </div>
                </div>
                <CardDescription>Son gelen talepler</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-3">
                    <div className="border border-gray-200 rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback>AK</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">Ali Kahraman</h4>
                            <p className="text-sm text-gray-500">Lefkoşa, Kumsal Mah.</p>
                          </div>
                        </div>
                        <Badge>Yeni</Badge>
                      </div>
                      <p className="mt-2 text-sm">Kumsal mahallesi 4. sokakta asfalt çukurları oluştu, araçlar geçerken zorlanıyor.</p>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-xs text-gray-500">12.05.2023, 14:30</span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => toast.success("Talep yanıtlandı")}>Yanıtla</Button>
                          <Button size="sm" onClick={() => toast.success("Talep işleme alındı")}>İşleme Al</Button>
                        </div>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback>MY</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">Mehmet Yılmaz</h4>
                            <p className="text-sm text-gray-500">Girne, Zeytinlik</p>
                          </div>
                        </div>
                        <Badge variant="outline">İşlemde</Badge>
                      </div>
                      <p className="mt-2 text-sm">Zeytinlik bölgesindeki parkın çocuk oyun alanları bakımsız durumda.</p>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-xs text-gray-500">10.05.2023, 09:15</span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => toast.success("Talep güncellendi")}>Durum Güncelle</Button>
                          <Button size="sm" variant="outline" onClick={() => toast.success("Talep tamamlandı")}>Tamamlandı</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        );
      } else if (currentInstitution === 'BAKANLIK' && activeSection === "tourism-stats") {
        sectionContent = (
          <div className="space-y-4">
            <p className="text-gray-600">Turizm istatistiklerini ve ziyaretçi verilerini bu panelden takip edebilirsiniz.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Ziyaretçi Sayısı</CardTitle>
                  <CardDescription>Son 30 gün</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">124,587</p>
                  <p className="text-xs text-muted-foreground mt-1">Geçen ay: 105,320 (%18.3 artış)</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Ortalama Kalış</CardTitle>
                  <CardDescription>Son 30 gün</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">4.8 gün</p>
                  <p className="text-xs text-muted-foreground mt-1">Geçen ay: 4.2 gün (%14.3 artış)</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Turizm Geliri</CardTitle>
                  <CardDescription>Son 30 gün</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">€24.3M</p>
                  <p className="text-xs text-muted-foreground mt-1">Geçen ay: €19.7M (%23.3 artış)</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Milliyete Göre Ziyaretçiler</CardTitle>
                  <CardDescription>Son 30 gün, ilk 5 ülke</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Almanya</span>
                        <span>28,450 kişi</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Birleşik Krallık</span>
                        <span>24,120 kişi</span>
                      </div>
                      <Progress value={72} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Rusya</span>
                        <span>18,670 kişi</span>
                      </div>
                      <Progress value={56} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Hollanda</span>
                        <span>12,340 kişi</span>
                      </div>
                      <Progress value={37} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Fransa</span>
                        <span>8,760 kişi</span>
                      </div>
                      <Progress value={26} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Bölgesel Dağılım</CardTitle>
                  <CardDescription>Ziyaretçi yoğunluğu</CardDescription>
                </CardHeader>
                <CardContent className="h-[250px]">
                  <MapSection />
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Aylık Ziyaretçi Raporu</CardTitle>
                  <Button onClick={() => toast.success("Detaylı rapor indirildi")}>Rapor İndir</Button>
                </div>
                <CardDescription>Son 12 ay, aylık karşılaştırma</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <BarChart4 className="h-16 w-16 mx-auto text-primary opacity-50" />
                    <p className="mt-2 text-sm text-muted-foreground">Aylık ziyaretçi grafiği</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      } else if (activeSection === "users") {
        // Ortak bir modül olan kullanıcı yönetimi
        sectionContent = (
          <div className="space-y-4">
            <p className="text-gray-600">Sistem kullanıcılarını ve erişim izinlerini bu panelden yönetebilirsiniz.</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Toplam Kullanıcı</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">42</p>
                  <p className="text-xs text-muted-foreground mt-1">3 yeni kullanıcı</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Aktif Kullanıcılar</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">36</p>
                  <p className="text-xs text-muted-foreground mt-1">Son 7 günde</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Yöneticiler</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">8</p>
                  <p className="text-xs text-muted-foreground mt-1">Tam yetkili</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Departmanlar</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">6</p>
                  <p className="text-xs text-muted-foreground mt-1">Ayrı yetki grubu</p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Kullanıcı Listesi</CardTitle>
                  <Button onClick={() => toast.success("Yeni kullanıcı eklendi")}>Kullanıcı Ekle</Button>
                </div>
                <CardDescription>Sistem kullanıcıları ve yetkileri</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>AY</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">Ahmet Yılmaz</h4>
                            <p className="text-sm text-gray-500">ahmet.yilmaz@kurum.com</p>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline" className="text-blue-600">Yönetici</Badge>
                              <Badge variant="outline" className="text-green-600">Aktif</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Düzenle</Button>
                          <Button size="sm" variant="outline" className="text-red-600">Devre Dışı</Button>
                        </div>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>SK</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">Sevgi Kaya</h4>
                            <p className="text-sm text-gray-500">sevgi.kaya@kurum.com</p>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline" className="text-purple-600">Departman Yöneticisi</Badge>
                              <Badge variant="outline" className="text-green-600">Aktif</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Düzenle</Button>
                          <Button size="sm" variant="outline" className="text-red-600">Devre Dışı</Button>
                        </div>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>MD</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">Mehmet Demir</h4>
                            <p className="text-sm text-gray-500">mehmet.demir@kurum.com</p>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline" className="text-amber-600">Destek Personeli</Badge>
                              <Badge variant="outline" className="text-green-600">Aktif</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Düzenle</Button>
                          <Button size="sm" variant="outline" className="text-red-600">Devre Dışı</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        );
      } else if (activeSection === "reports") {
        // Ortak bir modül olan raporlama
        sectionContent = (
          <div className="space-y-4">
            <p className="text-gray-600">Sistem raporlarını ve istatistikleri bu panelden görüntüleyebilirsiniz.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Rapor Özeti</CardTitle>
                  <CardDescription>Son 30 gün içindeki raporlar</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Geri Bildirim Raporları</span>
                        <span>124 rapor</span>
                      </div>
                      <Progress value={62} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Performans Raporları</span>
                        <span>86 rapor</span>
                      </div>
                      <Progress value={43} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Finansal Raporlar</span>
                        <span>42 rapor</span>
                      </div>
                      <Progress value={21} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Operasyonel Raporlar</span>
                        <span>68 rapor</span>
                      </div>
                      <Progress value={34} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Hızlı Raporlar</CardTitle>
                  <CardDescription>Sık kullanılan raporlar</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" onClick={() => toast.success("Günlük özet raporu oluşturuldu")}>
                      <BarChart className="h-5 w-5 mb-1" />
                      <span className="text-sm">Günlük Özet</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" onClick={() => toast.success("Haftalık performans raporu oluşturuldu")}>
                      <Activity className="h-5 w-5 mb-1" />
                      <span className="text-sm">Performans</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" onClick={() => toast.success("Finansal rapor oluşturuldu")}>
                      <DollarSign className="h-5 w-5 mb-1" />
                      <span className="text-sm">Finansal</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" onClick={() => toast.success("Kullanıcı aktivite raporu oluşturuldu")}>
                      <Users className="h-5 w-5 mb-1" />
                      <span className="text-sm">Kullanıcı</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Rapor Geçmişi</CardTitle>
                  <Button onClick={() => toast.success("Yeni rapor oluşturuldu")}>Yeni Rapor</Button>
                </div>
                <CardDescription>Oluşturulan ve kaydedilen raporlar</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-2">
                    <div className="border border-gray-200 rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Aylık Performans Özeti</h4>
                          <p className="text-xs text-gray-500">Oluşturulma: 12.05.2023, 14:30</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => toast.success("Rapor indirildi")}>
                            <FileText className="h-4 w-4 mr-1" />
                            İndir
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => toast.success("Rapor görüntülendi")}>
                            <File className="h-4 w-4 mr-1" />
                            Görüntüle
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Kullanıcı Aktivite Raporu</h4>
                          <p className="text-xs text-gray-500">Oluşturulma: 10.05.2023, 09:45</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => toast.success("Rapor indirildi")}>
                            <FileText className="h-4 w-4 mr-1" />
                            İndir
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => toast.success("Rapor görüntülendi")}>
                            <File className="h-4 w-4 mr-1" />
                            Görüntüle
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Finansal Durum Raporu</h4>
                          <p className="text-xs text-gray-500">Oluşturulma: 05.05.2023, 16:20</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => toast.success("Rapor indirildi")}>
                            <FileText className="h-4 w-4 mr-1" />
                            İndir
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => toast.success("Rapor görüntülendi")}>
                            <File className="h-4 w-4 mr-1" />
                            Görüntüle
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        );
      } else {
        // Diğer bölümler için genel içerik
        sectionContent = (
          <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg space-y-4">
            <div className="text-center">
              <h3 className="mb-2 text-lg font-semibold">{sectionTitle} modülü</h3>
              <p className="text-sm text-gray-500 mb-6">
                Bu modül demo amaçlı kullanıma açılmıştır.
              </p>
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" onClick={() => toast.success("Demo veri yüklendi")}>Demo Veri Yükle</Button>
                  <Button variant="outline" onClick={() => toast.info("Rapor oluşturuldu")}>Rapor Oluştur</Button>
                  <Button variant="outline" onClick={() => toast.info("Ayarlar güncellenmiştir")}>Ayarları Güncelle</Button>
                  <Button variant="outline" onClick={() => toast.info("Yardım dokümanı açıldı")}>Yardım</Button>
                </div>
                <Button className="w-full mt-4" onClick={() => toast.success("İşlem başarıyla tamamlandı")}>
                  Tamamla
                </Button>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">{sectionTitle}</h1>
          <Card>
            <CardContent className="pt-6">
              {sectionContent}
            </CardContent>
          </Card>
        </div>
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-primary">
            {institutionName}
          </h2>
          <p className="text-sm text-gray-500">Yönetici Paneli</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center px-4 py-2 my-1 text-left rounded-lg ${
                activeSection === item.id
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveSection(item.id)}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t">
          <Button onClick={handleSignOut} variant="outline" className="w-full">
            Çıkış Yap
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {institutionName}
          </h2>
          <Button variant="outline" size="sm" onClick={() => toast.info("Menü")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </Button>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {renderActiveSection()}
        </main>
      </div>

      {/* Response Dialog */}
      {showResponseDialog && (
        <ResponseDialog
          isOpen={showResponseDialog}
          onClose={handleCloseResponseDialog}
          onRespond={handleRespond}
          itemType={selectedItemType}
        />
      )}

      {/* Assign Dialog */}
      {showAssignDialog && (
        <AssignReportDialog
          isOpen={showAssignDialog}
          onClose={handleCloseAssignDialog}
          onAssign={handleAssign}
        />
      )}
    </div>
  );
};

export default Institution;
