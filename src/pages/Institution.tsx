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
  Menu
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

  // Fixing the section with the unclosed tags around line 652-668
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
                        <span className="text-red-600
