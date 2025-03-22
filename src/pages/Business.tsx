import { useState, useEffect } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { LogOut, Activity, ShoppingBag, Settings, MessageSquare, BellRing, BarChart3, FileText, Users, MapPin, Calendar, BadgePercent, MessageCircle, CoffeeIcon, UtensilsIcon, HotelIcon, CameraIcon, ShipIcon, HeartIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";
import { getTouristDataStats, getBusinessDetails, updateBusinessDetails, getBusiness } from "@/services";
import BusinessAnalytics from "@/components/business/BusinessAnalytics";
import BusinessProducts from "@/components/business/BusinessProducts";
import BusinessSettings from "@/components/business/BusinessSettings";
import BusinessMessages from "@/components/business/BusinessMessages";
import BusinessNotifications from "@/components/business/BusinessNotifications";
import BusinessReservations from "@/components/business/BusinessReservations";
import BusinessPromotions from "@/components/business/BusinessPromotions";
import BusinessEmployees from "@/components/business/BusinessEmployees";
import BusinessEvents from "@/components/business/BusinessEvents";
import BusinessFeedback from "@/components/business/BusinessFeedback";
import BusinessLiveChat from "@/components/business/BusinessLiveChat";
import type { Business } from "@/services";

const Business = () => {
  const [business, setBusiness] = useState<Business | null>(null);
  const [touristStats, setTouristStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const { signOut } = useAuth();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const businessData = await getBusinessDetails();
      setBusiness(businessData);

      const stats = await getTouristDataStats();
      setTouristStats(stats);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      toast.error("Veriler yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Yükleniyor...</div>;
  }

  const menuItems = [
    { id: "dashboard", label: "Gösterge Paneli", icon: <Activity className="w-4 h-4" /> },
    { id: "products", label: "Ürünler ve Hizmetler", icon: <ShoppingBag className="w-4 h-4" /> },
    { id: "reservations", label: "Rezervasyonlar", icon: <Calendar className="w-4 h-4" /> },
    { id: "events", label: "KKTC Etkinlikleri", icon: <CameraIcon className="w-4 h-4" /> },
    { id: "promotions", label: "Promosyonlar", icon: <BadgePercent className="w-4 h-4" /> },
    { id: "employees", label: "Personel Yönetimi", icon: <Users className="w-4 h-4" /> },
    { id: "feedback", label: "Müşteri Yorumları", icon: <FileText className="w-4 h-4" /> },
    { id: "livechat", label: "Canlı Destek", icon: <MessageCircle className="w-4 h-4" /> },
    { id: "messages", label: "Mesajlar", icon: <MessageSquare className="w-4 h-4" /> },
    { id: "notifications", label: "Bildirimler", icon: <BellRing className="w-4 h-4" /> },
    { id: "settings", label: "Ayarlar", icon: <Settings className="w-4 h-4" /> },
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case "dashboard":
        return <BusinessAnalytics touristStats={touristStats} />;
      case "products":
        return <BusinessProducts />;
      case "reservations":
        return <BusinessReservations />;
      case "events":
        return <BusinessEvents />;
      case "promotions":
        return <BusinessPromotions />;
      case "employees":
        return <BusinessEmployees />;
      case "feedback":
        return <BusinessFeedback />;
      case "livechat":
        return <BusinessLiveChat />;
      case "messages":
        return <BusinessMessages />;
      case "notifications":
        return <BusinessNotifications />;
      case "settings":
        return <BusinessSettings business={business} onUpdate={loadData} />;
      default:
        return <BusinessAnalytics touristStats={touristStats} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 bg-opacity-90 relative">
      {/* Background image with overlay */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1589909202802-8f4aadce1849?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
          alt="KKTC Manzarası"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-white bg-opacity-85"></div>
      </div>

      <div className="relative z-10 flex flex-col h-screen">
        <header className="bg-white bg-opacity-90 border-b shadow-sm">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-gray-800"
            >
              KKTC İşletme Paneli
            </motion.h1>
            <Button variant="destructive" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Çıkış Yap
            </Button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar - visible on desktop */}
          <aside className="hidden md:block w-64 bg-white bg-opacity-90 border-r shadow-sm">
            <ScrollArea className="h-[calc(100vh-4rem)]">
              <div className="p-4">
                <nav className="space-y-1">
                  {menuItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={activeTab === item.id ? "secondary" : "ghost"}
                      className={`w-full justify-start ${
                        activeTab === item.id ? "bg-gray-100" : ""
                      }`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                    </Button>
                  ))}
                </nav>
              </div>
            </ScrollArea>
          </aside>

          {/* Main content */}
          <main className="flex-1 overflow-auto">
            {/* Mobile tabs - only visible on mobile */}
            <div className="md:hidden px-4 py-3 overflow-x-auto">
              <ScrollArea className="w-full">
                <div className="flex gap-2 min-w-max">
                  {menuItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={activeTab === item.id ? "secondary" : "outline"}
                      size="sm"
                      className="flex items-center"
                      onClick={() => setActiveTab(item.id)}
                    >
                      {item.icon}
                      <span className="ml-1">{item.label}</span>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Tab content */}
            <div className="container mx-auto px-4 py-6">
              {renderTabContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Business;
