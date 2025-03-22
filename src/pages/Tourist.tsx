
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { 
  Map, MessageSquare, Calendar, Navigation, 
  FileText, Hotel, Plane, Utensils, 
  Building, Store, MapPin, User
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { getFeedbacks, getReports } from "@/services";
import TouristHeader from "@/components/tourist/TouristHeader";
import TouristNavigation from "@/components/tourist/TouristNavigation";
import TabContent from "@/components/tourist/TabContent";
import TouristMobileNav from "@/components/tourist/TouristMobileNav";
import TouristNotifications from "@/components/tourist/TouristNotifications";
import ChatbotButton from "@/components/tourist/ChatbotButton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

// Demo users data - 20 tourist users with different profiles
const demoUsers = [
  { id: 1, name: "Ahmet Yılmaz", nationality: "Türkiye", avatar: "AY", language: "Türkçe", interests: ["Tarih", "Plaj", "Yemek"] },
  { id: 2, name: "Sarah Johnson", nationality: "İngiltere", avatar: "SJ", language: "İngilizce", interests: ["Müzeler", "Yerel Kültür", "Doğa"] },
  { id: 3, name: "Michael Schmidt", nationality: "Almanya", avatar: "MS", language: "Almanca", interests: ["Hiking", "Arkeoloji", "Fotoğrafçılık"] },
  { id: 4, name: "Elena Petrova", nationality: "Rusya", avatar: "EP", language: "Rusça", interests: ["Alışveriş", "Spa", "Restoranlar"] },
  { id: 5, name: "Francesco Romano", nationality: "İtalya", avatar: "FR", language: "İtalyanca", interests: ["Tarih", "Yemek", "Şarap"] },
  { id: 6, name: "Yuki Tanaka", nationality: "Japonya", avatar: "YT", language: "Japonca", interests: ["Fotoğrafçılık", "Tarih", "Doğa"] },
  { id: 7, name: "Carlos Rodriguez", nationality: "İspanya", avatar: "CR", language: "İspanyolca", interests: ["Plaj", "Gece Hayatı", "Su Sporları"] },
  { id: 8, name: "Lisa Van der Berg", nationality: "Hollanda", avatar: "LV", language: "Felemenkçe", interests: ["Bisiklet", "Mimari", "Sanat"] },
  { id: 9, name: "Ali Hassan", nationality: "Mısır", avatar: "AH", language: "Arapça", interests: ["Arkeoloji", "Tarih", "Yemek"] },
  { id: 10, name: "Sofia Papadopoulos", nationality: "Yunanistan", avatar: "SP", language: "Yunanca", interests: ["Sahil", "Tarih", "Yerel Kültür"] },
  { id: 11, name: "Fatma Nur", nationality: "Türkiye", avatar: "FN", language: "Türkçe", interests: ["Alışveriş", "Spa", "Tarihi Yerler"] },
  { id: 12, name: "John Smith", nationality: "ABD", avatar: "JS", language: "İngilizce", interests: ["Macera", "Spor", "Yemek"] },
  { id: 13, name: "Ayşe Demir", nationality: "Türkiye", avatar: "AD", language: "Türkçe", interests: ["Müzeler", "Fotoğrafçılık", "Kahve"] },
  { id: 14, name: "Pierre Dubois", nationality: "Fransa", avatar: "PD", language: "Fransızca", interests: ["Gastronomi", "Sanat", "Tarih"] },
  { id: 15, name: "Wei Zhang", nationality: "Çin", avatar: "WZ", language: "Çince", interests: ["Alışveriş", "Fotoğrafçılık", "Tarih"] },
  { id: 16, name: "Maria Silva", nationality: "Brezilya", avatar: "MS", language: "Portekizce", interests: ["Plaj", "Dans", "Doğa"] },
  { id: 17, name: "Ivan Petrov", nationality: "Ukrayna", avatar: "IP", language: "Ukraynaca", interests: ["Doğa", "Tarih", "Yerel Festivaller"] },
  { id: 18, name: "Seo-yun Kim", nationality: "Güney Kore", avatar: "SK", language: "Korece", interests: ["K-Kültür", "Alışveriş", "Gastronomi"] },
  { id: 19, name: "Rajiv Patel", nationality: "Hindistan", avatar: "RP", language: "Hintçe", interests: ["Mimari", "Yemek", "Tarih"] },
  { id: 20, name: "Mehmet Öztürk", nationality: "Türkiye", avatar: "MÖ", language: "Türkçe", interests: ["Yemek", "Tarih", "Deniz"] }
];

const Tourist = () => {
  const [activeTab, setActiveTab] = useState("nearby");
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserSelector, setShowUserSelector] = useState(false);
  const [selectedUser, setSelectedUser] = useState(demoUsers[0]);
  const navigate = useNavigate();
  const { signOut } = useAuth();

  useEffect(() => {
    loadData();
  }, [selectedUser]);

  const loadData = async () => {
    try {
      // Fetch tourist-specific notifications
      const mockFeedbacks = await getFeedbacks();
      const mockReports = await getReports();
      
      // Generate personalized notifications based on selectedUser
      const userInterests = selectedUser.interests || [];
      const locationBasedNotifs = userInterests.map((interest, index) => ({
        id: `interest-${index}`,
        type: 'suggestion',
        message: `${interest} ile ilgilendiğinizi gördük. Yakında ${interest.toLowerCase()} etkinlikleri mevcut.`,
        timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      }));
      
      const newNotifications = [
        ...mockFeedbacks
          .filter(fb => fb.response) // Only show feedbacks with responses
          .slice(0, 2)
          .map(fb => ({
            id: fb.id,
            type: 'feedback',
            message: `Geri bildiriminize yanıt: ${fb.response?.substring(0, 50) || ''}...`,
            timestamp: fb.timestamp,
          })),
        ...mockReports
          .filter(report => report.response) // Only show reports with responses
          .slice(0, 2)
          .map(report => ({
            id: report.id,
            type: 'report',
            message: `Raporunuza yanıt: ${report.response?.substring(0, 50) || ''}...`,
            timestamp: report.timestamp,
          })),
        ...locationBasedNotifs.slice(0, 3)
      ];
      
      setNotifications(newNotifications);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Veriler yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Çıkış yapılırken bir hata oluştu.");
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Mobil menüyü kapat (eğer açıksa)
    if (showMobileMenu) {
      setShowMobileMenu(false);
    }
  };

  const toggleUserSelector = () => {
    setShowUserSelector(!showUserSelector);
  };

  const selectDemoUser = (user: any) => {
    setSelectedUser(user);
    setShowUserSelector(false);
    toast.success(`${user.name} hesabına geçiş yapıldı.`);
  };

  const menuItems = [
    { value: "nearby", label: "Yakındakiler", icon: <Navigation className="w-4 h-4" /> },
    { value: "plan", label: "Gezi Planla", icon: <Calendar className="w-4 h-4" /> },
    { value: "hotel", label: "Otel Rezervasyonu", icon: <Hotel className="w-4 h-4" /> },
    { value: "restaurant", label: "Restoran Rezervasyonu", icon: <Utensils className="w-4 h-4" /> },
    { value: "flights", label: "Uçuş Bilgileri", icon: <Plane className="w-4 h-4" /> },
    { value: "publicBuildings", label: "Yakın Kamu Binaları", icon: <Building className="w-4 h-4" /> },
    { value: "businessDemo", label: "İşletme Paneli (Demo)", icon: <Store className="w-4 h-4" /> },
    { value: "assistant", label: "Asistan", icon: <Map className="w-4 h-4" /> },
    { value: "feedback", label: "Geri Bildirim", icon: <MessageSquare className="w-4 h-4" /> },
    { value: "report", label: "Raporlar", icon: <FileText className="w-4 h-4" /> },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center space-y-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-primary">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <TouristHeader 
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
        handleSignOut={handleSignOut}
        notifications={notifications}
        handleTabChange={handleTabChange}
        activeTab={activeTab}
        menuItems={menuItems}
      />

      {/* Demo User Selector Button */}
      <div className="container mx-auto px-4 pt-2">
        <Button 
          variant="outline" 
          onClick={toggleUserSelector} 
          className="flex items-center gap-2 bg-white shadow-sm"
        >
          <Avatar className="h-6 w-6">
            <AvatarFallback>{selectedUser.avatar}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{selectedUser.name}</span>
          <User className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>

      <div className="container mx-auto py-4 px-4">
        {/* Desktop Menu */}
        <div className="hidden md:block mb-6">
          <TouristNavigation 
            activeTab={activeTab}
            handleTabChange={handleTabChange}
            menuItems={menuItems}
          />

          {/* Tabs Content */}
          <TabContent 
            activeTab={activeTab} 
            userData={selectedUser}
          />
        </div>
        
        {/* Mobile Content */}
        <div className="md:hidden">
          <div className="mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              {menuItems.find(item => item.value === activeTab)?.icon}
              <span className="ml-2">{menuItems.find(item => item.value === activeTab)?.label}</span>
            </h2>
          </div>

          <TabContent 
            activeTab={activeTab}
            userData={selectedUser}
          />
        </div>

        {/* Quick Actions - Mobile Only */}
        <TouristMobileNav activeTab={activeTab} handleTabChange={handleTabChange} />

        {/* Notifications Section */}
        <TouristNotifications notifications={notifications} />
      </div>

      {/* Demo User Selector Dialog */}
      <Dialog open={showUserSelector} onOpenChange={setShowUserSelector}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Demo Kullanıcı Seçin</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[400px] pr-4">
            <div className="grid grid-cols-1 gap-2">
              {demoUsers.map(user => (
                <Card 
                  key={user.id} 
                  className={`cursor-pointer hover:bg-blue-50 transition-colors ${selectedUser.id === user.id ? 'border-primary bg-blue-50' : ''}`}
                  onClick={() => selectDemoUser(user)}
                >
                  <CardHeader className="p-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{user.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{user.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{user.nationality} | {user.language}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="px-3 py-0 pb-3">
                    <div className="flex flex-wrap gap-1">
                      {user.interests.map((interest, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Sabit Chatbot Butonu */}
      <ChatbotButton />
    </div>
  );
};

export default Tourist;
