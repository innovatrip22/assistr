
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
  const { signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Get the institution code from localStorage (in a real app this would come from the auth system)
    const institutionCode = localStorage.getItem("testUserType");
    
    // Find the institution key based on the institution code from test login
    const institutionKey = Object.keys(INSTITUTIONS).find(
      key => INSTITUTIONS[key as keyof typeof INSTITUTIONS].id === institutionCode
    );
    
    setCurrentInstitution(institutionKey || null);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  // Define the common menu items for all institutions
  const commonMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: <BarChart className="w-5 h-5" /> },
    { id: "users", label: "Kullanıcı Yönetimi", icon: <Users className="w-5 h-5" /> },
    { id: "applications", label: "Başvuru Takibi", icon: <FileText className="w-5 h-5" /> },
    { id: "announcements", label: "Duyuru Yönetimi", icon: <Bell className="w-5 h-5" /> },
    { id: "documents", label: "Evrak Yönetimi", icon: <File className="w-5 h-5" /> },
    { id: "settings", label: "Sistem Ayarları", icon: <Settings className="w-5 h-5" /> },
    { id: "feedback", label: "Geri Bildirim", icon: <MessageSquare className="w-5 h-5" /> },
    { id: "events", label: "Etkinlikler", icon: <Calendar className="w-5 h-5" /> },
    { id: "reports", label: "Raporlama", icon: <BarChart4 className="w-5 h-5" /> },
  ];

  // Define institution-specific menu items
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

  // Combine common menu items with institution-specific ones if an institution is selected
  const menuItems = currentInstitution 
    ? [...commonMenuItems, ...institutionSpecificMenuItems[currentInstitution]]
    : commonMenuItems;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-primary">
            {currentInstitution ? INSTITUTIONS[currentInstitution as keyof typeof INSTITUTIONS].name : "Kurum Paneli"}
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
            {currentInstitution ? INSTITUTIONS[currentInstitution as keyof typeof INSTITUTIONS].name : "Kurum Paneli"}
          </h2>
          <Button variant="outline" size="sm" onClick={() => toast.info("Menü")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </Button>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {activeSection === "dashboard" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <FeedbackList limit={5} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Son Acil Raporlar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <EmergencyReportsList limit={5} />
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeSection === "feedback" && (
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
                  <FeedbackList />
                </TabsContent>
                <TabsContent value="price">
                  <PriceReportsList />
                </TabsContent>
                <TabsContent value="fraud">
                  <FraudReportsList />
                </TabsContent>
                <TabsContent value="emergency">
                  <EmergencyReportsList />
                </TabsContent>
              </Tabs>
            </div>
          )}
          
          {/* Show content for institution-specific sections */}
          {activeSection !== "dashboard" && activeSection !== "feedback" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">
                {menuItems.find(item => item.id === activeSection)?.label || activeSection}
              </h1>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center p-12 border-2 border-dashed rounded-lg">
                    <div className="text-center">
                      <h3 className="mb-2 text-lg font-semibold">Bu bölüm yapım aşamasındadır</h3>
                      <p className="text-sm text-gray-500">
                        Bu fonksiyon yakında kullanıma açılacaktır.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Institution;
