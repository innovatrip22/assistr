
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { 
  Map, MessageSquare, Calendar, Navigation, 
  FileText, Hotel, Plane, Utensils, 
  Building, MapPin
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { getFeedbacks, getReports } from "@/services";
import TouristHeader from "@/components/tourist/TouristHeader";
import TouristNavigation from "@/components/tourist/TouristNavigation";
import TabContent from "@/components/tourist/TabContent";
import TouristMobileNav from "@/components/tourist/TouristMobileNav";
import TouristNotifications from "@/components/tourist/TouristNotifications";
import ChatbotButton from "@/components/tourist/ChatbotButton";

const Tourist = () => {
  const [activeTab, setActiveTab] = useState("nearby");
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const { signOut } = useAuth();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Fetch tourist-specific notifications
      const mockFeedbacks = await getFeedbacks();
      const mockReports = await getReports();
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

  // Reorganized menu items with better grouping
  const menuItems = [
    // Main Services Group
    { value: "nearby", label: "Yakındakiler", icon: <Navigation className="w-4 h-4" /> },
    { value: "plan", label: "Gezi Planla", icon: <Calendar className="w-4 h-4" /> },
    { value: "publicBuildings", label: "Kamu Binaları", icon: <Building className="w-4 h-4" /> },
    
    // Reservations Group
    { value: "hotel", label: "Otel", icon: <Hotel className="w-4 h-4" /> },
    { value: "restaurant", label: "Restoran", icon: <Utensils className="w-4 h-4" /> },
    { value: "flights", label: "Uçuşlar", icon: <Plane className="w-4 h-4" /> },
    
    // Support & Feedback Group
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

      <div className="container mx-auto py-4 px-4">
        {/* Desktop Menu */}
        <div className="hidden md:block mb-6">
          <TouristNavigation 
            activeTab={activeTab}
            handleTabChange={handleTabChange}
            menuItems={menuItems}
          />

          {/* Tabs Content */}
          <TabContent activeTab={activeTab} />
        </div>
        
        {/* Mobile Content */}
        <div className="md:hidden">
          <div className="mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              {menuItems.find(item => item.value === activeTab)?.icon}
              <span className="ml-2">{menuItems.find(item => item.value === activeTab)?.label}</span>
            </h2>
          </div>

          <TabContent activeTab={activeTab} />
        </div>

        {/* Quick Actions - Mobile Only */}
        <TouristMobileNav activeTab={activeTab} handleTabChange={handleTabChange} />

        {/* Notifications Section */}
        <TouristNotifications notifications={notifications} />
      </div>

      {/* Sabit Chatbot Butonu */}
      <ChatbotButton />
    </div>
  );
};

export default Tourist;
