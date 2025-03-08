
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FeedbackList from "@/components/institution/FeedbackList";
import PriceReportsList from "@/components/institution/PriceReportsList";
import FraudReportsList from "@/components/institution/FraudReportsList";
import EmergencyReportsList from "@/components/institution/EmergencyReportsList";
import MapSection from "@/components/institution/MapSection";
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
            <Button className="mt-4">Yeni Planlı Kesinti Ekle</Button>
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
            <Button className="mt-4">Yeni Planlı Kesinti Ekle</Button>
          </div>
        );
      } else {
        // Diğer bölümler için genel içerik
        sectionContent = (
          <div className="flex items-center justify-center p-12 border-2 border-dashed rounded-lg">
            <div className="text-center">
              <h3 className="mb-2 text-lg font-semibold">{sectionTitle} modülü hazırlanıyor</h3>
              <p className="text-sm text-gray-500">
                Bu fonksiyon yakında kullanıma açılacaktır.
              </p>
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
    </div>
  );
};

export default Institution;
