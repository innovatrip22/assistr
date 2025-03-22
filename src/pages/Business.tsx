
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { 
  LogOut, Activity, ShoppingBag, Settings, MessageSquare, 
  BellRing, BarChart3, FileText, Users, Calendar, 
  BadgePercent, MessageCircle, Sun, Utensils, Hotel,
  MapPin, Landmark
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { getTouristStats, getBusinessDetails, updateBusinessDetails, getBusiness } from "@/services";
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

const BusinessPage = () => {
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

      const stats = await getTouristStats();
      setTouristStats(stats);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      toast.error("Veriler yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <div className="text-center space-y-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-primary">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  const tabItems = [
    { value: "dashboard", label: "Panel", icon: <Activity className="w-4 h-4" /> },
    { value: "products", label: "Ürünler", icon: <ShoppingBag className="w-4 h-4" /> },
    { value: "reservations", label: "Rezervasyonlar", icon: <Calendar className="w-4 h-4" /> },
    { value: "events", label: "Etkinlikler", icon: <Calendar className="w-4 h-4" /> },
    { value: "promotions", label: "Promosyonlar", icon: <BadgePercent className="w-4 h-4" /> },
    { value: "employees", label: "Personel", icon: <Users className="w-4 h-4" /> },
    { value: "feedback", label: "Geri Bildirimler", icon: <FileText className="w-4 h-4" /> },
    { value: "livechat", label: "Canlı Destek", icon: <MessageCircle className="w-4 h-4" /> },
    { value: "messages", label: "Mesajlar", icon: <MessageSquare className="w-4 h-4" /> },
    { value: "notifications", label: "Bildirimler", icon: <BellRing className="w-4 h-4" /> },
    { value: "settings", label: "Ayarlar", icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-6"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <Landmark className="mr-2 h-8 w-8 text-cyan-600" />
              KKTC İşletme Yönetim Paneli
            </h1>
            <p className="text-gray-600 mt-1">
              Hoş geldiniz, {business?.name || "İşletme Sahibi"}
            </p>
          </div>
          
          <Button variant="destructive" size="sm" onClick={signOut} className="flex items-center">
            <LogOut className="w-4 h-4 mr-2" />
            Çıkış Yap
          </Button>
        </motion.div>

        {/* Business Type Indicator */}
        <div className="mb-6">
          <Badge className="text-sm bg-cyan-100 text-cyan-800 border-cyan-200 hover:bg-cyan-200">
            {business?.type === "restaurant" && <Utensils className="w-3 h-3 mr-1" />}
            {business?.type === "hotel" && <Hotel className="w-3 h-3 mr-1" />}
            {business?.type === "entertainment" && <Sun className="w-3 h-3 mr-1" />}
            {business?.type === "shop" && <ShoppingBag className="w-3 h-3 mr-1" />}
            {business?.type === "other" && <Landmark className="w-3 h-3 mr-1" />}
            {!business?.type && <Landmark className="w-3 h-3 mr-1" />}
            {business?.type === "restaurant" && "Restoran"} 
            {business?.type === "hotel" && "Otel"} 
            {business?.type === "entertainment" && "Eğlence"} 
            {business?.type === "shop" && "Mağaza"} 
            {business?.type === "other" && "Diğer"}
            {!business?.type && "İşletme"}
          </Badge>
          
          {business?.location && (
            <Badge variant="outline" className="ml-2 text-sm">
              <MapPin className="w-3 h-3 mr-1" /> 
              {business.location}
            </Badge>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Günlük Ziyaretçi</p>
                  <h3 className="text-2xl font-bold">24</h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Bugünkü Rezervasyon</p>
                  <h3 className="text-2xl font-bold">6</h3>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Değerlendirme</p>
                  <h3 className="text-2xl font-bold">4.8/5</h3>
                </div>
                <div className="bg-amber-100 p-3 rounded-full">
                  <BarChart3 className="h-6 w-6 text-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Improved Tab Navigation */}
        <Tabs 
          value={activeTab} 
          onValueChange={handleTabChange} 
          className="w-full space-y-6"
        >
          <div className="relative">
            <div className="bg-white border rounded-lg shadow-sm overflow-x-auto mb-4">
              <TabsList className="p-1 w-max min-w-full flex">
                {tabItems.map(item => (
                  <TabsTrigger 
                    key={item.value} 
                    value={item.value} 
                    className={`
                      flex-1 min-w-[120px] py-3 px-4 transition-all duration-200
                      data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700
                      data-[state=active]:shadow-none
                    `}
                  >
                    <div className="flex items-center justify-center">
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>
          
          <TabsContent value="dashboard">
            <BusinessAnalytics touristStats={touristStats} />
          </TabsContent>

          <TabsContent value="products">
            <BusinessProducts />
          </TabsContent>

          <TabsContent value="reservations">
            <BusinessReservations />
          </TabsContent>

          <TabsContent value="events">
            <BusinessEvents />
          </TabsContent>

          <TabsContent value="promotions">
            <BusinessPromotions />
          </TabsContent>

          <TabsContent value="employees">
            <BusinessEmployees />
          </TabsContent>
          
          <TabsContent value="feedback">
            <BusinessFeedback />
          </TabsContent>
          
          <TabsContent value="livechat">
            <BusinessLiveChat />
          </TabsContent>

          <TabsContent value="messages">
            <BusinessMessages />
          </TabsContent>

          <TabsContent value="notifications">
            <BusinessNotifications />
          </TabsContent>

          <TabsContent value="settings">
            <BusinessSettings business={business} onUpdate={loadData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BusinessPage;
