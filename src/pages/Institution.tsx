
import { useState, useEffect } from "react";
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
  ClipboardList,
  PenTool,
  Shield,
  PieChart,
  Tool,
  UserPlus,
  ListChecks,
  CheckCircle,
  AlertCircle,
  PlusCircle,
  Activity,
  ArrowUpDown,
  Search,
  Filter,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FeedbackList from "@/components/institution/FeedbackList";
import PriceReportsList from "@/components/institution/PriceReportsList";
import FraudReportsList from "@/components/institution/FraudReportsList";
import EmergencyReportsList from "@/components/institution/EmergencyReportsList";
import MapSection from "@/components/institution/MapSection";
import { toast } from "sonner";
import { INSTITUTIONS } from "@/services/feedbackService";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

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

  const handleOpenResponseDialog = (id: string, type: 'feedback' | 'report') => {
    setSelectedItemId(id);
    setSelectedItemType(type);
    setShowResponseDialog(true);
  };

  const handleAssignReport = (id: string) => {
    setSelectedItemId(id);
    setShowAssignDialog(true);
  };

  const loadData = () => {
    // Bu normalde geri bildirim ve raporları yeniden yükler
    toast.success("Veriler yenilendi");
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
    ],
    SU: [
      { id: "water-resources", label: "Su Kaynakları Yönetimi", icon: <Droplet className="w-5 h-5" /> },
      { id: "water-infrastructure", label: "Altyapı & Şebeke", icon: <Building className="w-5 h-5" /> },
      { id: "water-billing", label: "Su Faturalandırma", icon: <DollarSign className="w-5 h-5" /> },
      { id: "water-outages", label: "Su Kesintileri", icon: <Droplet className="w-5 h-5" /> },
    ],
    DOGALGAZ: [
      { id: "gas-network", label: "Doğalgaz Hattı Yönetimi", icon: <Flame className="w-5 h-5" /> },
      { id: "gas-maintenance", label: "Teknik Servis & Bakım", icon: <Settings className="w-5 h-5" /> },
      { id: "gas-billing", label: "Tahsilat & Borçlandırma", icon: <DollarSign className="w-5 h-5" /> },
      { id: "gas-security", label: "Güvenlik & Acil Durumlar", icon: <Bell className="w-5 h-5" /> },
    ],
    TURIZM: [
      { id: "accommodation", label: "Konaklama ve Otel", icon: <Hotel className="w-5 h-5" /> },
      { id: "tourism-events", label: "Turizm Etkinlikleri", icon: <Calendar className="w-5 h-5" /> },
      { id: "tourist-regions", label: "Turistik Bölgeler", icon: <Map className="w-5 h-5" /> },
      { id: "tourism-promotion", label: "Reklam & Tanıtım", icon: <Bell className="w-5 h-5" /> },
    ],
    BELEDIYE: [
      { id: "municipal-services", label: "Belediye Hizmetleri", icon: <Building className="w-5 h-5" /> },
      { id: "tax-collection", label: "Vergi & Harç Takibi", icon: <DollarSign className="w-5 h-5" /> },
      { id: "permits", label: "Ruhsat & İmar İzinleri", icon: <FileText className="w-5 h-5" /> },
      { id: "waste-management", label: "Çöp & Şehir Temizliği", icon: <Trash className="w-5 h-5" /> },
    ],
    BAKANLIK: [
      { id: "tourism-stats", label: "Turizm İstatistikleri", icon: <BarChart className="w-5 h-5" /> },
      { id: "licensing", label: "Otel & Acente Lisans", icon: <Key className="w-5 h-5" /> },
      { id: "incentives", label: "Teşvik Programları", icon: <DollarSign className="w-5 h-5" /> },
      { id: "international", label: "Uluslararası İşbirlikleri", icon: <Handshake className="w-5 h-5" /> },
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

      // Generate content based on the institution and section
      let sectionContent;
      
      if (currentInstitution === 'ELEKTRIK' && activeSection === "power-outages") {
        sectionContent = (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">Elektrik Arızaları ve Kesintiler</h3>
                <p className="text-gray-600">Anlık elektrik arıza bildirimleri ve planlı kesintileri bu panelden yönetebilirsiniz.</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrele
                </Button>
                <Button>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Yeni Kesinti Planla
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-red-50 border-red-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center text-red-700">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Aktif Arızalar
                  </CardTitle>
                  <CardDescription>Anlık müdahale gerektiren durumlar</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-700">8</div>
                  <div className="text-sm text-red-700">3 kritik öncelikli</div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="link" className="text-red-700 p-0">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Tümünü görüntüle
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-amber-50 border-amber-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center text-amber-700">
                    <Clock className="w-5 h-5 mr-2" />
                    Planlı Kesintiler
                  </CardTitle>
                  <CardDescription>Bakım için planlanan kesintiler</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-700">12</div>
                  <div className="text-sm text-amber-700">Önümüzdeki 7 gün</div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="link" className="text-amber-700 p-0">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Takvime git
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-green-50 border-green-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center text-green-700">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Tamamlanan Onarımlar
                  </CardTitle>
                  <CardDescription>Son 24 saat içinde</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-700">15</div>
                  <div className="text-sm text-green-700">Ortalama çözüm: 3.2 saat</div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="link" className="text-green-700 p-0">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Raporları görüntüle
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Aktif Arızalar</span>
                    <Badge variant="destructive">3 Kritik</Badge>
                  </CardTitle>
                  <CardDescription>Şu anda müdahale edilen arızalar</CardDescription>
                  <div className="mt-2">
                    <Input 
                      placeholder="Arıza veya bölge ara..." 
                      className="w-full"
                      prefix={<Search className="w-4 h-4" />}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Girne - Merkez</h4>
                        <Badge variant="destructive">Kritik</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Trafo arızası, yaklaşık 250 haneyi etkiliyor</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>12:30'da bildirildi (2.5 saat önce)</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Ekip Ata</Button>
                          <Button size="sm">Detaylar</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Lefkoşa - Göçmenköy</h4>
                        <Badge variant="destructive">Kritik</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Hat kopması, 3 sokağı etkiliyor</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>10:15'de bildirildi (4.8 saat önce)</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Ekip Ata</Button>
                          <Button size="sm">Detaylar</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Gazimağusa - Merkez</h4>
                        <Badge variant="destructive">Kritik</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Elektrik direği devrilmesi, acil müdahale gerekiyor</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>08:45'de bildirildi (6.2 saat önce)</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Ekip Ata</Button>
                          <Button size="sm">Detaylar</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between py-3 border-t">
                  <div className="text-sm text-gray-500">8 aktif arıza gösteriliyor</div>
                  <Button variant="link" size="sm">Tümünü Görüntüle</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Planlı Kesintiler</span>
                    <Select defaultValue="upcoming">
                      <SelectTrigger className="w-[180px] h-8">
                        <SelectValue placeholder="Filtrele" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upcoming">Yaklaşan Kesintiler</SelectItem>
                        <SelectItem value="ongoing">Devam Eden</SelectItem>
                        <SelectItem value="completed">Tamamlanan</SelectItem>
                        <SelectItem value="all">Tümü</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardTitle>
                  <CardDescription>Bakım ve onarım için planlanan kesintiler</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Gazimağusa - Sakarya</h4>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Planlı</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Hat bakımı, yarın 09:00-13:00 arası</p>
                      <div className="flex items-center text-xs text-gray-500 mt-1 mb-2">
                        <Users className="w-3 h-3 mr-1" />
                        <span>Etkilenen: ~120 hane</span>
                      </div>
                      <Progress value={60} className="h-1.5 mb-1" />
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">Hazırlık: %60 tamamlandı</span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Mesaj Gönder</Button>
                          <Button size="sm">Düzenle</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Girne - Karaoğlanoğlu</h4>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Planlı</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Trafo yenileme, 15.05.2023, 07:00-17:00</p>
                      <div className="flex items-center text-xs text-gray-500 mt-1 mb-2">
                        <Users className="w-3 h-3 mr-1" />
                        <span>Etkilenen: ~350 hane</span>
                      </div>
                      <Progress value={80} className="h-1.5 mb-1" />
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">Hazırlık: %80 tamamlandı</span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Mesaj Gönder</Button>
                          <Button size="sm">Düzenle</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center py-3 border-t">
                  <Button>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Yeni Planlı Kesinti Ekle
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Arıza Haritası</CardTitle>
                <CardDescription>Bölgesel arıza dağılımı ve ekiplerin konumu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <MapSection />
                </div>
              </CardContent>
            </Card>
          </div>
        );
      } else if (currentInstitution === 'SU' && activeSection === "water-outages") {
        sectionContent = (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">Su Kesintileri Yönetimi</h3>
                <p className="text-gray-600">Su kesintileri ve bakım çalışmalarını bu panelden takip edebilirsiniz.</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtreleme
                </Button>
                <Button>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Yeni Kesinti Planla
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center text-blue-700">
                    <Droplet className="w-5 h-5 mr-2" />
                    Rezervuar Durumu
                  </CardTitle>
                  <CardDescription>Ana depo seviyesi</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-700">82%</div>
                  <div className="text-sm text-blue-700">Normal seviye</div>
                  <Progress value={82} className="h-2 mt-2" />
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="link" className="text-blue-700 p-0">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Rezervuar detayları
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-red-50 border-red-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center text-red-700">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Aktif Kesintiler
                  </CardTitle>
                  <CardDescription>Acil müdahale gerektiren durumlar</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-700">7</div>
                  <div className="text-sm text-red-700">3 planlı, 4 acil</div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="link" className="text-red-700 p-0">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Tümünü görüntüle
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-green-50 border-green-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center text-green-700">
                    <Activity className="w-5 h-5 mr-2" />
                    Günlük Tüketim
                  </CardTitle>
                  <CardDescription>Son 24 saat</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-700">42.6k m³</div>
                  <div className="text-sm text-green-700">Ortalama: 40.2k m³</div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="link" className="text-green-700 p-0">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Tüketim raporu
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Aktif Kesintiler</span>
                    <Badge variant="destructive">4 Acil</Badge>
                  </CardTitle>
                  <CardDescription>Şu anda süren kesintiler</CardDescription>
                  <div className="mt-2">
                    <Input 
                      placeholder="Kesinti veya bölge ara..." 
                      className="w-full"
                      prefix={<Search className="w-4 h-4" />}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Lefkoşa - Kumsal</h4>
                        <Badge variant="destructive">Acil</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Ana boru hattı patlaması, 3 mahalleyi etkiliyor</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>08:20'de bildirildi (3.5 saat önce)</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Ekip Ata</Button>
                          <Button size="sm">Detaylar</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Girne - Zeytinlik</h4>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">Devam Ediyor</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Boru değişimi, 2 sokağı etkiliyor</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>Dün 15:30'da başladı</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Durum Güncelle</Button>
                          <Button size="sm">Detaylar</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between py-3 border-t">
                  <div className="text-sm text-gray-500">7 aktif kesinti gösteriliyor</div>
                  <Button variant="link" size="sm">Tümünü Görüntüle</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Su Kalitesi</span>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px] h-8">
                        <SelectValue placeholder="Filtrele" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tüm Bölgeler</SelectItem>
                        <SelectItem value="lefkosa">Lefkoşa</SelectItem>
                        <SelectItem value="girne">Girne</SelectItem>
                        <SelectItem value="magusa">Gazimağusa</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardTitle>
                  <CardDescription>İçme suyu kalite ölçümleri</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">pH Seviyesi</span>
                        <span className="text-sm font-medium">7.2</span>
                      </div>
                      <Progress value={72} className="h-2" />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">Asidik (0)</span>
                        <span className="text-xs text-gray-500">Bazik (14)</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Klor Seviyesi</span>
                        <span className="text-sm font-medium">0.8 mg/L</span>
                      </div>
                      <Progress value={53} className="h-2" />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">Düşük (0)</span>
                        <span className="text-xs text-gray-500">Yüksek (1.5)</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Bulanıklık</span>
                        <span className="text-sm font-medium">0.3 NTU</span>
                      </div>
                      <Progress value={30} className="h-2" />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">Temiz (0)</span>
                        <span className="text-xs text-gray-500">Bulanık (1)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center py-3 border-t">
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Detaylı Kalite Raporu
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Su Şebekesi Haritası</CardTitle>
                <CardDescription>Aktif kesintiler ve ekiplerin konumu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <MapSection />
                </div>
              </CardContent>
            </Card>
          </div>
        );
      } else if (currentInstitution === 'DOGALGAZ' && activeSection === "gas-network") {
        sectionContent = (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">Doğalgaz Hattı Yönetimi</h3>
                <p className="text-gray-600">Doğalgaz boru hatları ve basınç bilgilerini bu panelden yönetebilirsiniz.</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrele
                </Button>
                <Button>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Yeni Hat Ekle
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-amber-50 border-amber-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center text-amber-700">
                    <Activity className="w-5 h-5 mr-2" />
                    Gaz Basıncı
                  </CardTitle>
                  <CardDescription>Ana hat</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-700">6.2 bar</div>
                  <div className="text-sm text-amber-700">Optimum aralıkta</div>
                  <Progress value={75} className="h-2 mt-2" />
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="link" className="text-amber-700 p-0">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Geçmiş veriler
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-green-50 border-green-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center text-green-700">
                    <Users className="w-5 h-5 mr-2" />
                    Aktif Aboneler
                  </CardTitle>
                  <CardDescription>Gaz kullanan aboneler</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-700">8,245</div>
                  <div className="text-sm text-green-700">%3 artış</div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="link" className="text-green-700 p-0">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Abone raporları
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center text-blue-700">
                    <Flame className="w-5 h-5 mr-2" />
                    Günlük Tüketim
                  </CardTitle>
                  <CardDescription>Son 24 saat</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-700">156k m³</div>
                  <div className="text-sm text-blue-700">Ortalama: 145k m³</div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="link" className="text-blue-700 p-0">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Tüketim raporu
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Basınç Takibi</span>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Tüm Sistemler Normal</Badge>
                  </CardTitle>
                  <CardDescription>Kritik bölgelerdeki basınç değerleri</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Lefkoşa Ana Hat</h4>
                        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Normal</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">6.2 bar (Normal aralıkta)</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>Son güncelleme: 15 dk önce</span>
                        </div>
                        <Button size="sm" variant="outline">Detay</Button>
                      </div>
                    </div>
                    
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Girne Dağıtım Hattı</h4>
                        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Normal</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">5.8 bar (Normal aralıkta)</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>Son güncelleme: 20 dk önce</span>
                        </div>
                        <Button size="sm" variant="outline">Detay</Button>
                      </div>
                    </div>
                    
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Gazimağusa - Terminal</h4>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">İzleniyor</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">5.3 bar (Alt sınıra yakın)</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>Son güncelleme: 5 dk önce</span>
                        </div>
                        <Button size="sm" variant="outline">Detay</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between py-3 border-t">
                  <div className="text-sm text-gray-500">12 istasyon gösteriliyor</div>
                  <Button variant="link" size="sm">Tüm İstasyonlar</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Hat Bakımları</span>
                    <Select defaultValue="upcoming">
                      <SelectTrigger className="w-[180px] h-8">
                        <SelectValue placeholder="Filtrele" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upcoming">Yaklaşan Bakımlar</SelectItem>
                        <SelectItem value="ongoing">Devam Eden</SelectItem>
                        <SelectItem value="completed">Tamamlanan</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardTitle>
                  <CardDescription>Planlanan hat bakım çalışmaları</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Lefkoşa - Gönyeli Arası</h4>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Planlı</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Hat bakımı, 16.05.2023, 10:00-14:00</p>
                      <div className="flex items-center text-xs text-gray-500 mt-1 mb-2">
                        <Users className="w-3 h-3 mr-1" />
                        <span>Etkilenen: ~85 abone</span>
                      </div>
                      <Progress value={75} className="h-1.5 mb-1" />
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">Hazırlık: %75 tamamlandı</span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Bildirim Gönder</Button>
                          <Button size="sm">Düzenle</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Magosa Ana Vana</h4>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Planlı</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Vana değişimi, 18.05.2023, 08:00-12:00</p>
                      <div className="flex items-center text-xs text-gray-500 mt-1 mb-2">
                        <Users className="w-3 h-3 mr-1" />
                        <span>Etkilenen: ~120 abone</span>
                      </div>
                      <Progress value={60} className="h-1.5 mb-1" />
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">Hazırlık: %60 tamamlandı</span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Bildirim Gönder</Button>
                          <Button size="sm">Düzenle</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center py-3 border-t">
                  <Button>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Yeni Bakım Planla
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Doğalgaz Şebeke Haritası</CardTitle>
                <CardDescription>Hat durumu ve teknisyen konumları</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <MapSection />
                </div>
              </CardContent>
            </Card>
          </div>
        );
      } else if (currentInstitution === 'BELEDIYE' && activeSection === "municipal-services") {
        sectionContent = (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">Belediye Hizmetleri Yönetimi</h3>
                <p className="text-gray-600">Belediye hizmetleri ve vatandaş başvurularını bu panelden yönetebilirsiniz.</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrele
                </Button>
                <Button>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Yeni Hizmet Ekle
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-amber-50 border-amber-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center text-amber-700">
                    <ClipboardList className="w-5 h-5 mr-2" />
                    Açık Talepler
                  </CardTitle>
                  <CardDescription>Vatandaş başvuruları</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-700">134</div>
                  <div className="text-sm text-amber-700">28 öncelikli</div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="link" className="text-amber-700 p-0">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Talepleri görüntüle
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-purple-50 border-purple-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center text-purple-700">
                    <Calendar className="w-5 h-5 mr-2" />
                    Planlanan Etkinlikler
                  </CardTitle>
                  <CardDescription>Önümüzdeki hafta</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-700">8</div>
                  <div className="text-sm text-purple-700">2 büyük organizasyon</div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="link" className="text-purple-700 p-0">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Etkinlik takvimi
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center text-blue-700">
                    <FileText className="w-5 h-5 mr-2" />
                    Ruhsat Başvuruları
                  </CardTitle>
                  <CardDescription>Son 30 gün</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-700">62</div>
                  <div className="text-sm text-blue-700">43 onaylandı</div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="link" className="text-blue-700 p-0">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Başvuruları görüntüle
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Açık Başvurular</span>
                    <Badge variant="destructive">28 Öncelikli</Badge>
                  </CardTitle>
                  <CardDescription>Bekleyen vatandaş başvuruları</CardDescription>
                  <div className="mt-2">
                    <Input 
                      placeholder="Başvuru veya başvuran ara..." 
                      className="w-full"
                      prefix={<Search className="w-4 h-4" />}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Çöp Toplama Şikayeti</h4>
                        <Badge variant="destructive">Öncelikli</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Göçmenköy bölgesinde düzenli çöp toplanmıyor</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>Dün 09:15'te bildirildi</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Ekibe Yönlendir</Button>
                          <Button size="sm">İşleme Al</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Yol Çalışması Talebi</h4>
                        <Badge variant="destructive">Öncelikli</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Merkez caddesindeki çukurlar için tamir talebi</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>3 gün önce bildirildi</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Ekibe Yönlendir</Button>
                          <Button size="sm">İşleme Al</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Parkta Bakım Talebi</h4>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Normal</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Çocuk parkı ekipmanlarının bakımı gerekiyor</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>5 gün önce bildirildi</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Ekibe Yönlendir</Button>
                          <Button size="sm">İşleme Al</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between py-3 border-t">
                  <div className="text-sm text-gray-500">134 açık başvuru</div>
                  <Button variant="link" size="sm">Tümünü Görüntüle</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Güncel Hizmetler</span>
                    <Select defaultValue="ongoing">
                      <SelectTrigger className="w-[180px] h-8">
                        <SelectValue placeholder="Filtrele" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ongoing">Devam Eden</SelectItem>
                        <SelectItem value="scheduled">Planlanmış</SelectItem>
                        <SelectItem value="completed">Tamamlanmış</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardTitle>
                  <CardDescription>Devam eden belediye hizmetleri</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Ağaçlandırma Projesi</h4>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Devam Ediyor</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Sahil bölgesinde 200 ağaç dikimi</p>
                      <Progress value={60} className="h-1.5 mt-2 mb-1" />
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">İlerleme: %60</span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Güncelle</Button>
                          <Button size="sm">Rapor</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Yol Bakım Çalışması</h4>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Devam Ediyor</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Girne Caddesi asfalt yenileme</p>
                      <Progress value={30} className="h-1.5 mt-2 mb-1" />
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">İlerleme: %30</span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Güncelle</Button>
                          <Button size="sm">Rapor</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Çevre Temizlik Kampanyası</h4>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Devam Ediyor</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Şehir geneli çöp toplama ve temizlik</p>
                      <Progress value={75} className="h-1.5 mt-2 mb-1" />
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">İlerleme: %75</span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Güncelle</Button>
                          <Button size="sm">Rapor</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center py-3 border-t">
                  <Button>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Yeni Hizmet Planla
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Hizmet Haritası</CardTitle>
                <CardDescription>Devam eden hizmetler ve ekip konumları</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <MapSection />
                </div>
              </CardContent>
            </Card>
          </div>
        );
      } else if (currentInstitution === 'TURIZM' && activeSection === "tourism-promotion") {
        sectionContent = (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">Turizm Tanıtım Yönetimi</h3>
                <p className="text-gray-600">Turizm tanıtım ve reklam faaliyetlerini bu panelden yönetebilirsiniz.</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Kampanya Filtrele
                </Button>
                <Button>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Yeni Kampanya Ekle
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center text-blue-700">
                    <Globe className="w-5 h-5 mr-2" />
                    Aktif Kampanyalar
                  </CardTitle>
                  <CardDescription>Devam eden tanıtımlar</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-700">7</div>
                  <div className="text-sm text-blue-700">3 dijital, 4 geleneksel</div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="link" className="text-blue-700 p-0">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Kampanyaları görüntüle
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-purple-50 border-purple-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center text-purple-700">
                    <Calendar className="w-5 h-5 mr-2" />
                    Planlanan Etkinlikler
                  </CardTitle>
                  <CardDescription>Önümüzdeki 30 gün</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-700">5</div>
                  <div className="text-sm text-purple-700">2 uluslararası katılımlı</div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="link" className="text-purple-700 p-0">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Etkinlik takvimi
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-green-50 border-green-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center text-green-700">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Pazarlama Bütçesi
                  </CardTitle>
                  <CardDescription>Kalan yıllık bütçe</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-700">€126.5K</div>
                  <div className="text-sm text-green-700">Kullanılan: €73.5K (%36.8)</div>
                  <Progress value={36.8} className="h-2 mt-2" />
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="link" className="text-green-700 p-0">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Bütçe detayları
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Aktif Kampanyalar</span>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px] h-8">
                        <SelectValue placeholder="Filtrele" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tüm Kampanyalar</SelectItem>
                        <SelectItem value="digital">Dijital</SelectItem>
                        <SelectItem value="traditional">Geleneksel</SelectItem>
                        <SelectItem value="international">Uluslararası</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardTitle>
                  <CardDescription>Devam eden tanıtım kampanyaları</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Avrupa Pazarı Tanıtımı</h4>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Dijital</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Almanya, Hollanda ve İngiltere'de dijital reklam</p>
                      <div className="flex items-center gap-3 mt-2 mb-2 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>15 Nis - 15 Haz</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-3 h-3 mr-1" />
                          <span>Bütçe: €50,000</span>
                        </div>
                      </div>
                      <Progress value={40} className="h-1.5 mb-1" />
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">İlerleme: %40</span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Analitik</Button>
                          <Button size="sm">Rapor</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Sosyal Medya Kampanyası</h4>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Dijital</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Instagram ve Facebook influencer işbirlikleri</p>
                      <div className="flex items-center gap-3 mt-2 mb-2 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>1 May - 30 Haz</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-3 h-3 mr-1" />
                          <span>Bütçe: €30,000</span>
                        </div>
                      </div>
                      <Progress value={25} className="h-1.5 mb-1" />
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">İlerleme: %25</span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Analitik</Button>
                          <Button size="sm">Rapor</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between">
                        <h4 className="font-medium">TV Reklam Kampanyası</h4>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50">Geleneksel</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Avrupa TV kanallarında tanıtım spotları</p>
                      <div className="flex items-center gap-3 mt-2 mb-2 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>1 Nis - 31 May</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-3 h-3 mr-1" />
                          <span>Bütçe: €75,000</span>
                        </div>
                      </div>
                      <Progress value={65} className="h-1.5 mb-1" />
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">İlerleme: %65</span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Analitik</Button>
                          <Button size="sm">Rapor</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between py-3 border-t">
                  <div className="text-sm text-gray-500">7 aktif kampanya</div>
                  <Button variant="link" size="sm">Tümünü Görüntüle</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Planlanan Etkinlikler</span>
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">5 Yaklaşan Etkinlik</Badge>
                  </CardTitle>
                  <CardDescription>Yaklaşan tanıtım etkinlikleri</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Turizm Fuarı</h4>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">10 Gün Kaldı</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Berlin Uluslararası Turizm Fuarı katılımı</p>
                      <div className="flex items-center gap-3 mt-2 mb-2 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          <span>8 Katılımcı</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-3 h-3 mr-1" />
                          <span>Bütçe: €22,000</span>
                        </div>
                      </div>
                      <Progress value={80} className="h-1.5 mb-1" />
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">Hazırlık: %80</span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Katılımcılar</Button>
                          <Button size="sm">Detaylar</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Kültür Festivali</h4>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">3 Hafta Kaldı</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Lefkoşa Merkez'de uluslararası kültür festivali</p>
                      <div className="flex items-center gap-3 mt-2 mb-2 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          <span>25+ Katılımcı</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-3 h-3 mr-1" />
                          <span>Bütçe: €35,000</span>
                        </div>
                      </div>
                      <Progress value={60} className="h-1.5 mb-1" />
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">Hazırlık: %60</span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Katılımcılar</Button>
                          <Button size="sm">Detaylar</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center py-3 border-t">
                  <Button>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Yeni Etkinlik Ekle
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Pazarlama Performansı</CardTitle>
                <CardDescription>Kampanya etkileri ve turist dönüşüm oranları</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <div className="h-full bg-gray-50 rounded-md border flex items-center justify-center">
                    <p className="text-center text-gray-500">Kampanya performans ve analiz grafiği burada gösterilecek</p>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-gray-600">Web Sitesi Ziyaretleri</p>
                    <p className="text-lg font-bold mt-1">+24.8%</p>
                    <p className="text-xs text-gray-500">Geçen aya göre</p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm text-gray-600">Sosyal Medya Etkileşimi</p>
                    <p className="text-lg font-bold mt-1">+36.5%</p>
                    <p className="text-xs text-gray-500">Geçen aya göre</p>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-md">
                    <p className="text-sm text-gray-600">Rezervasyon Dönüşümü</p>
                    <p className="text-lg font-bold mt-1">+18.2%</p>
                    <p className="text-xs text-gray-500">Geçen aya göre</p>
                  </div>
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                    <p className="text-sm text-gray-600">Maliyet/Turist Oranı</p>
                    <p className="text-lg font-bold mt-1">€8.25</p>
                    <p className="text-xs text-gray-500">Hedef: €9.00</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      } else if (currentInstitution === 'BAKANLIK' && activeSection === "tourism-stats") {
        sectionContent = (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">Turizm İstatistikleri</h3>
                <p className="text-gray-600">Turizm istatistikleri ve raporlarını bu panelden inceleyebilirsiniz.</p>
              </div>
              <div className="flex space-x-2">
                <Select defaultValue="2023">
                  <SelectTrigger className="w-[100px] h-9">
                    <SelectValue placeholder="Yıl" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                    <SelectItem value="2020">2020</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Rapor İndir
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Toplam Ziyaretçi
                  </CardTitle>
                  <CardDescription>Bu yıl</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">857,230</div>
                  <div className="text-sm text-green-600 flex items-center">
                    <ArrowUpDown className="w-4 h-4 mr-1" />
                    %12 artış
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Turizm Gelirleri
                  </CardTitle>
                  <CardDescription>Bu yıl</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">€204M</div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600 flex items-center">
                      <ArrowUpDown className="w-4 h-4 mr-1" />
                      %15 artış
                    </span>
                    <span className="text-gray-500">Hedef: €230M</span>
                  </div>
                  <Progress value={88} className="h-1.5 mt-2" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Building className="w-5 h-5 mr-2" />
                    Kayıtlı İşletmeler
                  </CardTitle>
                  <CardDescription>Turizm işletmeleri</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1,245</div>
                  <div className="text-sm text-green-600 flex items-center">
                    <ArrowUpDown className="w-4 h-4 mr-1" />
                    142 yeni kayıt
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Ortalama Kalış
                  </CardTitle>
                  <CardDescription>Turist başına</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">6.2 gün</div>
                  <div className="text-sm text-green-600 flex items-center">
                    <ArrowUpDown className="w-4 h-4 mr-1" />
                    0.4 gün artış
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Ziyaretçi İstatistikleri</span>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Aylık Dağılım</Badge>
                  </CardTitle>
                  <CardDescription>Ülkelere göre ziyaretçi dağılımı</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 mb-4">
                    <div className="h-full bg-gray-50 rounded-md border flex items-center justify-center">
                      <p className="text-center text-gray-500">Ziyaretçi istatistik grafiği burada görüntülenecek</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span>İngiltere</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">232,470</span>
                        <span className="text-gray-500 text-xs">%27</span>
                        <Progress value={27} className="w-20 h-1.5" />
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                        <span>Almanya</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">188,590</span>
                        <span className="text-gray-500 text-xs">%22</span>
                        <Progress value={22} className="w-20 h-1.5" />
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span>Rusya</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">154,300</span>
                        <span className="text-gray-500 text-xs">%18</span>
                        <Progress value={18} className="w-20 h-1.5" />
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span>Türkiye</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">128,580</span>
                        <span className="text-gray-500 text-xs">%15</span>
                        <Progress value={15} className="w-20 h-1.5" />
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
                        <span>Diğer</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">153,290</span>
                        <span className="text-gray-500 text-xs">%18</span>
                        <Progress value={18} className="w-20 h-1.5" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Konaklama İstatistikleri</span>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px] h-8">
                        <SelectValue placeholder="Filtrele" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tüm Yıl</SelectItem>
                        <SelectItem value="q1">1. Çeyrek</SelectItem>
                        <SelectItem value="q2">2. Çeyrek</SelectItem>
                        <SelectItem value="q3">3. Çeyrek</SelectItem>
                        <SelectItem value="q4">4. Çeyrek</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardTitle>
                  <CardDescription>Bölgelere göre doluluk oranları</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 mb-4">
                    <div className="h-full bg-gray-50 rounded-md border flex items-center justify-center">
                      <p className="text-center text-gray-500">Konaklama istatistik grafiği burada görüntülenecek</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Girne</span>
                      <div className="flex items-center gap-2">
                        <Progress value={86} className="w-32 h-2" />
                        <span className="font-medium">86%</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Gazimağusa</span>
                      <div className="flex items-center gap-2">
                        <Progress value={72} className="w-32 h-2" />
                        <span className="font-medium">72%</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Lefkoşa</span>
                      <div className="flex items-center gap-2">
                        <Progress value={65} className="w-32 h-2" />
                        <span className="font-medium">65%</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>İskele</span>
                      <div className="flex items-center gap-2">
                        <Progress value={80} className="w-32 h-2" />
                        <span className="font-medium">80%</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Güzelyurt</span>
                      <div className="flex items-center gap-2">
                        <Progress value={55} className="w-32 h-2" />
                        <span className="font-medium">55%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Gelir İstatistikleri</CardTitle>
                <CardDescription>Aylık turizm geliri değişimi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <div className="h-full bg-gray-50 rounded-md border flex items-center justify-center">
                    <p className="text-center text-gray-500">Gelir istatistik grafiği burada görüntülenecek</p>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-gray-600">Toplam Gelir (Bu Yıl)</p>
                    <p className="text-lg font-bold mt-1">€204M</p>
                    <p className="text-xs text-green-600">%14.8 artış (YoY)</p>
                  </div>
                  
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm text-gray-600">Ortalama Harcama</p>
                    <p className="text-lg font-bold mt-1">€980</p>
                    <p className="text-xs text-green-600">%7.2 artış (YoY)</p>
                  </div>
                  
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-md">
                    <p className="text-sm text-gray-600">Ortalama Kalış</p>
                    <p className="text-lg font-bold mt-1">6.2 gün</p>
                    <p className="text-xs text-green-600">0.4 gün artış (YoY)</p>
                  </div>
                  
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                    <p className="text-sm text-gray-600">Yıllık Artış</p>
                    <p className="text-lg font-bold mt-1">+12.5%</p>
                    <p className="text-xs text-gray-600">Hedef: +15%</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center py-3 border-t">
                <Button>
                  <FileText className="w-4 h-4 mr-2" />
                  Detaylı Rapor İndir
                </Button>
              </CardFooter>
            </Card>
          </div>
        );
      } else if (activeSection === "users") {
        sectionContent = (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">Kullanıcı Yönetimi</h3>
                <p className="text-gray-600">Sistem kullanıcılarını ve yetkilerini yönetin</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrele
                </Button>
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Yeni Kullanıcı Ekle
                </Button>
              </div>
            </div>
            
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Sistem Kullanıcıları</CardTitle>
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input placeholder="Kullanıcı ara..." />
                    <Button type="submit" size="sm" variant="secondary">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>Kurumunuzdaki yetkili kullanıcılar</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b bg-muted/50">
                        <th className="h-10 px-4 text-left font-medium">İsim</th>
                        <th className="h-10 px-4 text-left font-medium">Kullanıcı Türü</th>
                        <th className="h-10 px-4 text-left font-medium">Departman</th>
                        <th className="h-10 px-4 text-left font-medium">Son Giriş</th>
                        <th className="h-10 px-4 text-left font-medium">Durum</th>
                        <th className="h-10 px-4 text-right font-medium">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">Ahmet Yılmaz</td>
                        <td className="p-4 align-middle">Yönetici</td>
                        <td className="p-4 align-middle">Bilgi İşlem</td>
                        <td className="p-4 align-middle text-sm">Bugün, 09:45</td>
                        <td className="p-4 align-middle">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aktif</Badge>
                        </td>
                        <td className="p-4 align-middle text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <PenTool className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Shield className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">Ayşe Demir</td>
                        <td className="p-4 align-middle">Operatör</td>
                        <td className="p-4 align-middle">Müşteri Hizmetleri</td>
                        <td className="p-4 align-middle text-sm">Bugün, 08:30</td>
                        <td className="p-4 align-middle">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aktif</Badge>
                        </td>
                        <td className="p-4 align-middle text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <PenTool className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Shield className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">Mehmet Çelik</td>
                        <td className="p-4 align-middle">Teknisyen</td>
                        <td className="p-4 align-middle">Teknik Servis</td>
                        <td className="p-4 align-middle text-sm">Dün, 17:15</td>
                        <td className="p-4 align-middle">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aktif</Badge>
                        </td>
                        <td className="p-4 align-middle text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <PenTool className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Shield className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">Zeynep Kaya</td>
                        <td className="p-4 align-middle">Süpervizör</td>
                        <td className="p-4 align-middle">Müşteri Hizmetleri</td>
                        <td className="p-4 align-middle text-sm">3 gün önce</td>
                        <td className="p-4 align-middle">
                          <Badge variant="outline" className="border-amber-500 text-amber-500">İzinde</Badge>
                        </td>
                        <td className="p-4 align-middle text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <PenTool className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Shield className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">Okan Şahin</td>
                        <td className="p-4 align-middle">Operatör</td>
                        <td className="p-4 align-middle">Saha Ekibi</td>
                        <td className="p-4 align-middle text-sm">1 hafta önce</td>
                        <td className="p-4 align-middle">
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Pasif</Badge>
                        </td>
                        <td className="p-4 align-middle text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <PenTool className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Shield className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t p-4">
                <div className="text-xs text-muted-foreground">
                  Toplam 24 kullanıcı gösteriliyor
                </div>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" disabled>
                      Önceki
                    </Button>
                    <Button variant="outline" size="sm">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      Sonraki
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rol Yönetimi</CardTitle>
                  <CardDescription>Kullanıcı rollerini ve yetkilerini yönetin</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Yönetici</h4>
                        <Button variant="outline" size="sm">Düzenle</Button>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Tüm sistem işlemlerine tam erişim</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="secondary">Kullanıcı Yönetimi</Badge>
                        <Badge variant="secondary">Raporlama</Badge>
                        <Badge variant="secondary">Sistem Ayarları</Badge>
                        <Badge variant="secondary">Tüm Yetkiler</Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">5 kullanıcı bu rolde</p>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Süpervizör</h4>
                        <Button variant="outline" size="sm">Düzenle</Button>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Operasyonel işlemlere erişim</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="secondary">Raporlama</Badge>
                        <Badge variant="secondary">Operasyon Yönetimi</Badge>
                        <Badge variant="secondary">Sınırlı Kullanıcı Yönetimi</Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">8 kullanıcı bu rolde</p>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Operatör</h4>
                        <Button variant="outline" size="sm">Düzenle</Button>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Günlük işlemlere erişim</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="secondary">Veri Girişi</Badge>
                        <Badge variant="secondary">Talep Yönetimi</Badge>
                        <Badge variant="secondary">Temel Raporlar</Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">11 kullanıcı bu rolde</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Yeni Rol Oluştur
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Kullanıcı Etkinliği</CardTitle>
                  <CardDescription>Sistem kullanım istatistikleri</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 mb-6">
                    <div className="h-full bg-gray-50 rounded-md border flex items-center justify-center">
                      <p className="text-center text-gray-500">Kullanıcı etkinlik grafiği burada görüntülenecek</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Aktif Kullanıcılar</span>
                        <span className="font-medium">18/24</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Ortalama Günlük Oturum</span>
                        <span className="font-medium">4.2 saat</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>İşlem Yoğunluğu</span>
                        <span className="font-medium">62%</span>
                      </div>
                      <Progress value={62} className="h-2" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t">
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Kullanım Raporu
                  </Button>
                  
                  <Button variant="outline">
                    <PieChart className="w-4 h-4 mr-2" />
                    Detaylı Analiz
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        );
      } else if (activeSection === "applications") {
        sectionContent = (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">Başvuru Takibi</h3>
                <p className="text-gray-600">Vatandaş başvurularını takip edin ve yönetin</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrele
                </Button>
                <Button>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Yeni Başvuru Ekle
                </Button>
              </div>
            </div>
            
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Başvuru Listesi</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[160px] h-8">
                        <SelectValue placeholder="Durum" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tüm Başvurular</SelectItem>
                        <SelectItem value="pending">Beklemede</SelectItem>
                        <SelectItem value="inProgress">İşleme Alındı</SelectItem>
                        <SelectItem value="completed">Tamamlandı</SelectItem>
                        <SelectItem value="rejected">Reddedildi</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input placeholder="Başvuru ara..." className="w-72" />
                  </div>
                </div>
                <CardDescription>Son 30 gün içindeki başvurular</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b bg-muted/50">
                        <th className="h-10 px-4 text-left font-medium">Başvuru No</th>
                        <th className="h-10 px-4 text-left font-medium">Başvuran</th>
                        <th className="h-10 px-4 text-left font-medium">Başvuru Konusu</th>
                        <th className="h-10 px-4 text-left font-medium">Tarih</th>
                        <th className="h-10 px-4 text-left font-medium">Durum</th>
                        <th className="h-10 px-4 text-right font-medium">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle font-medium">BAS-2023-1042</td>
                        <td className="p-4 align-middle">Ahmet Yılmaz</td>
                        <td className="p-4 align-middle">Elektrik bağlantı talebi</td>
                        <td className="p-4 align-middle text-sm">24.04.2023</td>
                        <td className="p-4 align-middle">
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Beklemede</Badge>
                        </td>
                        <td className="p-4 align-middle text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">İşleme Al</Button>
                            <Button size="sm">Görüntüle</Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle font-medium">BAS-2023-1041</td>
                        <td className="p-4 align-middle">Ayşe Demir</td>
                        <td className="p-4 align-middle">Sayaç değişim talebi</td>
                        <td className="p-4 align-middle text-sm">24.04.2023</td>
                        <td className="p-4 align-middle">
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">İşleme Alındı</Badge>
                        </td>
                        <td className="p-4 align-middle text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">Güncelle</Button>
                            <Button size="sm">Görüntüle</Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle font-medium">BAS-2023-1040</td>
                        <td className="p-4 align-middle">Mehmet Çelik</td>
                        <td className="p-4 align-middle">Adres değişikliği</td>
                        <td className="p-4 align-middle text-sm">23.04.2023</td>
                        <td className="p-4 align-middle">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Tamamlandı</Badge>
                        </td>
                        <td className="p-4 align-middle text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button size="sm">Görüntüle</Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle font-medium">BAS-2023-1039</td>
                        <td className="p-4 align-middle">Zeynep Kaya</td>
                        <td className="p-4 align-middle">Fatura itirazı</td>
                        <td className="p-4 align-middle text-sm">22.04.2023</td>
                        <td className="p-4 align-middle">
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">İşleme Alındı</Badge>
                        </td>
                        <td className="p-4 align-middle text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">Güncelle</Button>
                            <Button size="sm">Görüntüle</Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle font-medium">BAS-2023-1038</td>
                        <td className="p-4 align-middle">Ali Şahin</td>
                        <td className="p-4 align-middle">Kesinti bildirimi</td>
                        <td className="p-4 align-middle text-sm">21.04.2023</td>
                        <td className="p-4 align-middle">
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Reddedildi</Badge>
                        </td>
                        <td className="p-4 align-middle text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button size="sm">Görüntüle</Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t p-4">
                <div className="text-xs text-muted-foreground">
                  Toplam 124 başvuru gösteriliyor
                </div>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" disabled>
                      Önceki
                    </Button>
                    <Button variant="outline" size="sm">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      Sonraki
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <ListChecks className="w-5 h-5 mr-2" />
                    Başvuru Özeti
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Bekleyen Başvurular</span>
                      <span className="font-medium">42</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>İşleme Alınan</span>
                      <span className="font-medium">38</span>
                    </div>
                    <Progress value={38} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Tamamlanan</span>
                      <span className="font-medium">35</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Reddedilen</span>
                      <span className="font-medium">9</span>
                    </div>
                    <Progress value={9} className="h-2" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Ortalama Çözüm Süresi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-3xl font-bold">3.2</p>
                      <p className="text-sm text-gray-500">Gün</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-green-600">%12 iyileşme</p>
                      <p className="text-xs text-gray-500">Geçen aya göre</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Adres Değişikliği</span>
                      <span className="font-medium">1.5 gün</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Sayaç Değişimi</span>
                      <span className="font-medium">4.2 gün</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Bağlantı Talebi</span>
                      <span className="font-medium">5.7 gün</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Fatura İtirazı</span>
                      <span className="font-medium">2.3 gün</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <PieChart className="w-5 h-5 mr-2" />
                    Başvuru Dağılımı
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-40 mb-4">
                    <div className="h-full bg-gray-50 rounded-md border flex items-center justify-center">
                      <p className="text-center text-gray-500">Başvuru dağılımı grafiği burada görüntülenecek</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span>Bağlantı Talepleri</span>
                      </div>
                      <span className="font-medium">32%</span>
                    </div>
                    
                    <div className="flex justify-between text-sm items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                        <span>Sayaç İşlemleri</span>
                      </div>
                      <span className="font-medium">28%</span>
                    </div>
                    
                    <div className="flex justify-between text-sm items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span>Fatura İşlemleri</span>
                      </div>
                      <span className="font-medium">22%</span>
                    </div>
                    
                    <div className="flex justify-between text-sm items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span>Arıza Bildirimleri</span>
                      </div>
                      <span className="font-medium">18%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      } else if (activeSection === "documents") {
        sectionContent = (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">Evrak Yönetimi</h3>
                <p className="text-gray-600">Kurumsal evrak ve dökümanlarınızı yönetin</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrele
                </Button>
                <Button>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Yeni Evrak Ekle
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Klasörler</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="flex flex-col">
                    <Button variant="ghost" className="justify-start h-12 px-4 border-l-2 border-primary">
                      <File className="w-4 h-4 mr-2" />
                      Tüm Dokümanlar
                    </Button>
                    <Button variant="ghost" className="justify-start h-12 px-4 border-l-2 border-transparent">
                      <File className="w-4 h-4 mr-2" />
                      Resmi Yazışmalar
                    </Button>
                    <Button variant="ghost" className="justify-start h-12 px-4 border-l-2 border-transparent">
                      <File className="w-4 h-4 mr-2" />
                      Sözleşmeler
                    </Button>
                    <Button variant="ghost" className="justify-start h-12 px-4 border-l-2 border-transparent">
                      <File className="w-4 h-4 mr-2" />
                      Formlar ve Şablonlar
                    </Button>
                    <Button variant="ghost" className="justify-start h-12 px-4 border-l-2 border-transparent">
                      <File className="w-4 h-4 mr-2" />
                      Raporlar
                    </Button>
                    <Button variant="ghost" className="justify-start h-12 px-4 border-l-2 border-transparent">
                      <File className="w-4 h-4 mr-2" />
                      Prosedürler
                    </Button>
                    <Button variant="ghost" className="justify-start h-12 px-4 border-l-2 border-transparent">
                      <File className="w-4 h-4 mr-2" />
                      Çizimler ve Planlar
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center border-t p-4">
                  <Button variant="outline" className="w-full">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Yeni Klasör
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="col-span-3">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>Tüm Dokümanlar</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Input placeholder="Doküman ara..." className="w-64" />
                      <Select defaultValue="newest">
                        <SelectTrigger className="w-[130px] h-9">
                          <SelectValue placeholder="Sırala" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">En Yeni</SelectItem>
                          <SelectItem value="oldest">En Eski</SelectItem>
                          <SelectItem value="az">A-Z</SelectItem>
                          <SelectItem value="za">Z-A</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <CardDescription>Toplam 128 doküman</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b bg-muted/50">
                          <th className="h-10 px-4 text-left font-medium">Doküman Adı</th>
                          <th className="h-10 px-4 text-left font-medium">Tür</th>
                          <th className="h-10 px-4 text-left font-medium">Boyut</th>
                          <th className="h-10 px-4 text-left font-medium">Tarih</th>
                          <th className="h-10 px-4 text-left font-medium">Durum</th>
                          <th className="h-10 px-4 text-right font-medium">İşlemler</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle font-medium">2023_Calisma_Raporu.pdf</td>
                          <td className="p-4 align-middle">PDF</td>
                          <td className="p-4 align-middle">2.4 MB</td>
                          <td className="p-4 align-middle text-sm">24.04.2023</td>
                          <td className="p-4 align-middle">
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Onaylandı</Badge>
                          </td>
                          <td className="p-4 align-middle text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">İndir</Button>
                              <Button variant="ghost" size="sm">
                                <PenTool className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle font-medium">Stratejik_Plan_2023-2025.docx</td>
                          <td className="p-4 align-middle">Word</td>
                          <td className="p-4 align-middle">1.8 MB</td>
                          <td className="p-4 align-middle text-sm">22.04.2023</td>
                          <td className="p-4 align-middle">
                            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Taslak</Badge>
                          </td>
                          <td className="p-4 align-middle text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">İndir</Button>
                              <Button variant="ghost" size="sm">
                                <PenTool className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle font-medium">Bakim_Plani_2023.xlsx</td>
                          <td className="p-4 align-middle">Excel</td>
                          <td className="p-4 align-middle">780 KB</td>
                          <td className="p-4 align-middle text-sm">20.04.2023</td>
                          <td className="p-4 align-middle">
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Onaylandı</Badge>
                          </td>
                          <td className="p-4 align-middle text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">İndir</Button>
                              <Button variant="ghost" size="sm">
                                <PenTool className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle font-medium">Teknik_Sartname_Jenerator.pdf</td>
                          <td className="p-4 align-middle">PDF</td>
                          <td className="p-4 align-middle">1.2 MB</td>
                          <td className="p-4 align-middle text-sm">18.04.2023</td>
                          <td className="p-4 align-middle">
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">İnceleniyor</Badge>
                          </td>
                          <td className="p-4 align-middle text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">İndir</Button>
                              <Button variant="ghost" size="sm">
                                <PenTool className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle font-medium">Personel_Gorev_Tanimlari.docx</td>
                          <td className="p-4 align-middle">Word</td>
                          <td className="p-4 align-middle">950 KB</td>
                          <td className="p-4 align-middle text-sm">15.04.2023</td>
                          <td className="p-4 align-middle">
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Onaylandı</Badge>
                          </td>
                          <td className="p-4 align-middle text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">İndir</Button>
                              <Button variant="ghost" size="sm">
                                <PenTool className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t p-4">
                  <div className="text-xs text-muted-foreground">
                    15 doküman gösteriliyor (toplam 128)
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" disabled>
                        Önceki
                      </Button>
                      <Button variant="outline" size="sm">
                        1
                      </Button>
                      <Button variant="outline" size="sm">
                        2
                      </Button>
                      <Button variant="outline" size="sm">
                        3
                      </Button>
                      <Button variant="outline" size="sm">
                        Sonraki
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Son Etkinlikler</span>
                    <Badge>Son 24 Saat</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between">
                        <div className="flex space-x-3">
                          <Upload className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="text-sm font-medium">Stratejik_Plan_2023-2025.docx yüklendi</p>
                            <p className="text-xs text-gray-500">Ahmet Yılmaz tarafından</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">2 saat önce</span>
                      </div>
                    </div>
                    
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between">
                        <div className="flex space-x-3">
                          <PenTool className="w-5 h-5 text-amber-600" />
                          <div>
                            <p className="text-sm font-medium">Bakim_Plani_2023.xlsx düzenlendi</p>
                            <p className="text-xs text-gray-500">Mehmet Çelik tarafından</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">4 saat önce</span>
                      </div>
                    </div>
                    
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between">
                        <div className="flex space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="text-sm font-medium">2023_Calisma_Raporu.pdf onaylandı</p>
                            <p className="text-xs text-gray-500">Zeynep Kaya tarafından</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">8 saat önce</span>
                      </div>
                    </div>
                    
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between">
                        <div className="flex space-x-3">
                          <Share2 className="w-5 h-5 text-purple-600" />
                          <div>
                            <p className="text-sm font-medium">Teknik_Sartname_Jenerator.pdf paylaşıldı</p>
                            <p className="text-xs text-gray-500">Ali Şahin tarafından</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">12 saat önce</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center border-t p-4">
                  <Button variant="outline">Tüm Etkinlikler</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Doküman İstatistikleri</span>
                    <Select defaultValue="month">
                      <SelectTrigger className="w-[120px] h-8">
                        <SelectValue placeholder="Periyot" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="week">Bu Hafta</SelectItem>
                        <SelectItem value="month">Bu Ay</SelectItem>
                        <SelectItem value="quarter">Bu Çeyrek</SelectItem>
                        <SelectItem value="year">Bu Yıl</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-44 mb-4">
                    <div className="h-full bg-gray-50 rounded-md border flex items-center justify-center">
                      <p className="text-center text-gray-500">Doküman etkileşim grafiği burada görüntülenecek</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                      <p className="text-sm text-gray-600">Yüklenen Dosyalar</p>
                      <p className="text-lg font-bold mt-1">42</p>
                      <p className="text-xs text-green-600">%18 artış</p>
                    </div>
                    
                    <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-sm text-gray-600">Onaylanan Dosyalar</p>
                      <p className="text-lg font-bold mt-1">38</p>
                      <p className="text-xs text-green-600">%22 artış</p>
                    </div>
                    
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                      <p className="text-sm text-gray-600">Taslak Durumunda</p>
                      <p className="text-lg font-bold mt-1">15</p>
                      <p className="text-xs text-gray-600">%5 azalış</p>
                    </div>
                    
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-md">
                      <p className="text-sm text-gray-600">İndirme Sayısı</p>
                      <p className="text-lg font-bold mt-1">128</p>
                      <p className="text-xs text-green-600">%32 artış</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      } else if (activeSection === "settings") {
        sectionContent = (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">Sistem Ayarları</h3>
                <p className="text-gray-600">Sistem ayarlarını yapılandırın ve yönetin</p>
              </div>
              <Button>
                <Tool className="w-4 h-4 mr-2" />
                Gelişmiş Ayarlar
              </Button>
            </div>
            
            <Tabs defaultValue="general">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="general">Genel</TabsTrigger>
                <TabsTrigger value="security">Güvenlik</TabsTrigger>
                <TabsTrigger value="notifications">Bildirimler</TabsTrigger>
                <TabsTrigger value="integrations">Entegrasyonlar</TabsTrigger>
              </TabsList>
              <TabsContent value="general" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Genel Ayarlar</CardTitle>
                    <CardDescription>Kurumsal bilgilerinizi ve sistem ayarlarınızı yapılandırın.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Kurum Bilgileri</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm">Kurum Adı</label>
                          <Input defaultValue={institutionName} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm">Kurum Kodu</label>
                          <Input defaultValue={currentInstitution} disabled />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm">E-posta Adresi</label>
                          <Input defaultValue="bilgi@kurumadi.gov.ct" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm">Telefon</label>
                          <Input defaultValue="+90 392 123 4567" />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Sistem Davranışı</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Otomatik Oturum Kapatma</p>
                            <p className="text-sm text-gray-500">Belirli bir süre işlem yapılmadığında oturumu kapat</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Select defaultValue="30">
                              <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Süre" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="15">15 dakika</SelectItem>
                                <SelectItem value="30">30 dakika</SelectItem>
                                <SelectItem value="60">60 dakika</SelectItem>
                                <SelectItem value="never">Asla</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Veri Yenileme Sıklığı</p>
                            <p className="text-sm text-gray-500">Dashboard verilerinin otomatik yenilenme sıklığı</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Select defaultValue="5">
                              <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Süre" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1 dakika</SelectItem>
                                <SelectItem value="5">5 dakika</SelectItem>
                                <SelectItem value="15">15 dakika</SelectItem>
                                <SelectItem value="30">30 dakika</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Dil Tercihi</p>
                            <p className="text-sm text-gray-500">Sistem arayüz dili</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Select defaultValue="tr">
                              <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Dil" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="tr">Türkçe</SelectItem>
                                <SelectItem value="en">İngilizce</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Otomatik Yedekleme</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Otomatik Yedekleme</p>
                            <p className="text-sm text-gray-500">Verilerin otomatik olarak yedeklenmesi</p>
                          </div>
                          <Switch checked={true} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Yedekleme Sıklığı</p>
                            <p className="text-sm text-gray-500">Otomatik yedeklerin alınma sıklığı</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Select defaultValue="daily">
                              <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Sıklık" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="hourly">Saatlik</SelectItem>
                                <SelectItem value="daily">Günlük</SelectItem>
                                <SelectItem value="weekly">Haftalık</SelectItem>
                                <SelectItem value="monthly">Aylık</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t p-4">
                    <Button variant="outline">Varsayılana Sıfırla</Button>
                    <Button>Değişiklikleri Kaydet</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="security" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Güvenlik Ayarları</CardTitle>
                    <CardDescription>Sistem güvenlik tercihlerinizi yapılandırın.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Şifre Politikası</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Minimum Şifre Uzunluğu</p>
                            <p className="text-sm text-gray-500">En az kaç karakter olmalı</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Select defaultValue="8">
                              <SelectTrigger className="w-[100px]">
                                <SelectValue placeholder="Uzunluk" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="6">6 karakter</SelectItem>
                                <SelectItem value="8">8 karakter</SelectItem>
                                <SelectItem value="10">10 karakter</SelectItem>
                                <SelectItem value="12">12 karakter</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Şifre Karmaşıklığı</p>
                            <p className="text-sm text-gray-500">Özel karakter, büyük harf ve rakam gereksinimi</p>
                          </div>
                          <Switch checked={true} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Şifre Süresi</p>
                            <p className="text-sm text-gray-500">Kaç günde bir şifre yenilemesi istensin</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Select defaultValue="90">
                              <SelectTrigger className="w-[100px]">
                                <SelectValue placeholder="Süre" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="30">30 gün</SelectItem>
                                <SelectItem value="60">60 gün</SelectItem>
                                <SelectItem value="90">90 gün</SelectItem>
                                <SelectItem value="never">Sınırsız</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">İki Faktörlü Doğrulama</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">İki Faktörlü Doğrulama Zorunluluğu</p>
                            <p className="text-sm text-gray-500">Yönetici hesapları için zorunlu tutulsun mu?</p>
                          </div>
                          <Switch checked={true} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Doğrulama Metodu</p>
                            <p className="text-sm text-gray-500">Tercih edilen doğrulama yöntemi</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Select defaultValue="sms">
                              <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Metod" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sms">SMS Kodu</SelectItem>
                                <SelectItem value="email">E-posta Kodu</SelectItem>
                                <SelectItem value="app">Kimlik Doğrulayıcı</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Oturum Güvenliği</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">IP Kısıtlaması</p>
                            <p className="text-sm text-gray-500">Belirli IP aralıklarına erişim sınırlaması</p>
                          </div>
                          <Switch checked={false} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Başarısız Giriş Denemesi Limiti</p>
                            <p className="text-sm text-gray-500">Hesap kilitlenmeden önce izin verilen deneme sayısı</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Select defaultValue="5">
                              <SelectTrigger className="w-[100px]">
                                <SelectValue placeholder="Limit" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="3">3 deneme</SelectItem>
                                <SelectItem value="5">5 deneme</SelectItem>
                                <SelectItem value="10">10 deneme</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Oturum Kayıtları</p>
                            <p className="text-sm text-gray-500">Tüm oturumların günlüğünü tut</p>
                          </div>
                          <Switch checked={true} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t p-4">
                    <Button variant="outline">Varsayılana Sıfırla</Button>
                    <Button>Değişiklikleri Kaydet</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="notifications" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Bildirim Ayarları</CardTitle>
                    <CardDescription>Hangi olaylar için bildirim almak istediğinizi yapılandırın.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">E-posta Bildirimleri</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Yeni Başvuru Bildirimleri</p>
                            <p className="text-sm text-gray-500">Yeni bir vatandaş başvurusu alındığında</p>
                          </div>
                          <Switch checked={true} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Arıza Bildirimleri</p>
                            <p className="text-sm text-gray-500">Sisteme arıza kaydı girildiğinde</p>
                          </div>
                          <Switch checked={true} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Raporlar</p>
                            <p className="text-sm text-gray-500">Haftalık ve aylık raporlar</p>
                          </div>
                          <Switch checked={true} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Güvenlik Uyarıları</p>
                            <p className="text-sm text-gray-500">Şüpheli giriş denemeleri ve diğer güvenlik uyarıları</p>
                          </div>
                          <Switch checked={true} />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Sistem Bildirimleri</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Görev Atamaları</p>
                            <p className="text-sm text-gray-500">Size veya ekibinize yeni görev atandığında</p>
                          </div>
                          <Switch checked={true} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Görev Güncellemeleri</p>
                            <p className="text-sm text-gray-500">Mevcut görevlerde güncelleme olduğunda</p>
                          </div>
                          <Switch checked={true} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Sistem Bakım Bildirimleri</p>
                            <p className="text-sm text-gray-500">Planlı sistem bakımları hakkında</p>
                          </div>
                          <Switch checked={true} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Yeni Doküman Yüklemeleri</p>
                            <p className="text-sm text-gray-500">Sisteme yeni doküman yüklendiğinde</p>
                          </div>
                          <Switch checked={false} />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">SMS Bildirimleri</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Acil Arıza Bildirimleri</p>
                            <p className="text-sm text-gray-500">Kritik öneme sahip arızalarda</p>
                          </div>
                          <Switch checked={true} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Kesinti Duyuruları</p>
                            <p className="text-sm text-gray-500">Planlı kesinti duyuruları yapıldığında</p>
                          </div>
                          <Switch checked={false} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t p-4">
                    <Button variant="outline">Varsayılana Sıfırla</Button>
                    <Button>Değişiklikleri Kaydet</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="integrations" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Entegrasyon Ayarları</CardTitle>
                    <CardDescription>Diğer sistemlerle entegrasyon yapılandırmasını yönetin.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Aktif Entegrasyonlar</h4>
                      <div className="space-y-4">
                        <div className="border rounded-md p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <FileText className="w-5 h-5 text-blue-700" />
                              </div>
                              <div>
                                <h4 className="font-medium">E-Devlet Entegrasyonu</h4>
                                <p className="text-sm text-gray-500">Vatandaş verileri senkronizasyonu</p>
                              </div>
                            </div>
                            <Switch checked={true} />
                          </div>
                          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center">
                              <span className="text-gray-500 mr-2">Durum:</span>
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aktif</Badge>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-500 mr-2">Son Senkronizasyon:</span>
                              <span>Bugün, 08:30</span>
                            </div>
                          </div>
                          <div className="mt-3 flex justify-end">
                            <Button variant="outline" size="sm">Yapılandır</Button>
                          </div>
                        </div>
                        
                        <div className="border rounded-md p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <DollarSign className="w-5 h-5 text-green-700" />
                              </div>
                              <div>
                                <h4 className="font-medium">Ödeme Sistemi Entegrasyonu</h4>
                                <p className="text-sm text-gray-500">Online tahsilat ve fatura ödemeleri</p>
                              </div>
                            </div>
                            <Switch checked={true} />
                          </div>
                          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center">
                              <span className="text-gray-500 mr-2">Durum:</span>
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aktif</Badge>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-500 mr-2">Son İşlem:</span>
                              <span>Bugün, 10:15</span>
                            </div>
                          </div>
                          <div className="mt-3 flex justify-end">
                            <Button variant="outline" size="sm">Yapılandır</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Kullanılabilir Entegrasyonlar</h4>
                      <div className="space-y-4">
                        <div className="border rounded-md p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <MessageSquare className="w-5 h-5 text-gray-700" />
                              </div>
                              <div>
                                <h4 className="font-medium">SMS Hizmet Sağlayıcısı</h4>
                                <p className="text-sm text-gray-500">Toplu mesaj gönderimi için</p>
                              </div>
                            </div>
                            <Switch checked={false} />
                          </div>
                          <div className="mt-3 flex justify-end">
                            <Button variant="outline" size="sm">Yapılandır</Button>
                          </div>
                        </div>
                        
                        <div className="border rounded-md p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <Map className="w-5 h-5 text-gray-700" />
                              </div>
                              <div>
                                <h4 className="font-medium">Coğrafi Bilgi Sistemi (CBS)</h4>
                                <p className="text-sm text-gray-500">Altyapı ve arıza haritaları için</p>
                              </div>
                            </div>
                            <Switch checked={false} />
                          </div>
                          <div className="mt-3 flex justify-end">
                            <Button variant="outline" size="sm">Yapılandır</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">API Ayarları</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">API Erişimi</p>
                            <p className="text-sm text-gray-500">Dış sistemlerin API üzerinden veri erişimine izin ver</p>
                          </div>
                          <Switch checked={true} />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm">API Anahtarı</label>
                          <div className="flex">
                            <Input value="sk_live_51NQw3JD9XfPPZYbUm2XO..." disabled className="rounded-r-none" />
                            <Button variant="outline" className="rounded-l-none">Yenile</Button>
                          </div>
                          <p className="text-xs text-gray-500">Bu anahtarı güvenli bir şekilde saklayın ve yalnızca güvendiğiniz sistemlerle paylaşın.</p>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm">Webhook URL</label>
                          <Input defaultValue="https://api.kurumadi.gov.ct/webhook" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t p-4">
                    <Button variant="outline">Varsayılana Sıfırla</Button>
                    <Button>Değişiklikleri Kaydet</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        );
      } else {
        // Default content for other sections
        sectionContent = (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">{sectionTitle}</h3>
                <p className="text-gray-600">{sectionTitle} modülü ile ilgili işlemleri buradan gerçekleştirebilirsiniz.</p>
              </div>
              <Button>
                <PlusCircle className="w-4 h-4 mr-2" />
                Yeni {sectionTitle} Ekle
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>{sectionTitle} Modülü</CardTitle>
                <CardDescription>Bu modülde kullanabileceğiniz özellikler aşağıda listelenmiştir.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-6 hover:border-primary/50 hover:bg-primary/5 transition-colors">
                    <div className="mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <ListChecks className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-lg font-medium mb-2">{sectionTitle} Listesi</h3>
                    <p className="text-gray-600 mb-4">Mevcut {sectionTitle.toLowerCase()} kayıtlarını görüntüleyin ve yönetin.</p>
                    <Button variant="outline">Listeyi Görüntüle</Button>
                  </div>
                  
                  <div className="border rounded-md p-6 hover:border-primary/50 hover:bg-primary/5 transition-colors">
                    <div className="mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <PlusCircle className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-lg font-medium mb-2">Yeni {sectionTitle} Oluştur</h3>
                    <p className="text-gray-600 mb-4">Sisteme yeni bir {sectionTitle.toLowerCase()} kaydı ekleyin.</p>
                    <Button>Yeni Ekle</Button>
                  </div>
                  
                  <div className="border rounded-md p-6 hover:border-primary/50 hover:bg-primary/5 transition-colors">
                    <div className="mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <BarChart className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-lg font-medium mb-2">{sectionTitle} Raporları</h3>
                    <p className="text-gray-600 mb-4">{sectionTitle} ile ilgili raporları görüntüleyin ve analiz edin.</p>
                    <Button variant="outline">Raporları Görüntüle</Button>
                  </div>
                  
                  <div className="border rounded-md p-6 hover:border-primary/50 hover:bg-primary/5 transition-colors">
                    <div className="mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Settings className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-lg font-medium mb-2">{sectionTitle} Ayarları</h3>
                    <p className="text-gray-600 mb-4">{sectionTitle} modülü için sistem ayarlarını yapılandırın.</p>
                    <Button variant="outline">Ayarları Düzenle</Button>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Hızlı İstatistikler</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-50 border rounded-md">
                      <p className="text-sm text-gray-600">Toplam Kayıt</p>
                      <p className="text-xl font-bold mt-1">128</p>
                    </div>
                    <div className="p-4 bg-gray-50 border rounded-md">
                      <p className="text-sm text-gray-600">Bu Ay Eklenen</p>
                      <p className="text-xl font-bold mt-1">23</p>
                    </div>
                    <div className="p-4 bg-gray-50 border rounded-md">
                      <p className="text-sm text-gray-600">Aktif</p>
                      <p className="text-xl font-bold mt-1">105</p>
                    </div>
                    <div className="p-4 bg-gray-50 border rounded-md">
                      <p className="text-sm text-gray-600">Bekleyen</p>
                      <p className="text-xl font-bold mt-1">12</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <p className="text-sm text-gray-500">Bu modül için daha fazla bilgi ve eğitim materyallerine <Button variant="link" className="h-auto p-0">buradan</Button> ulaşabilirsiniz.</p>
              </CardFooter>
            </Card>
          </div>
        );
      }

      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">{sectionTitle}</h1>
          {sectionContent}
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
    </div>
  );
};

export default Institution;
