
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { LogOut, Activity, ShoppingBag, Settings, MessageSquare, BellRing, BarChart3, FileText, Users, MapPin, Calendar, BadgePercent, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
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

const Business = () => {
  const [business, setBusiness] = useState<Business | null>(null);
  const [touristStats, setTouristStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Yükleniyor...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-800 mb-6"
        >
          KKTC İşletme Paneli
        </motion.h1>

        <Tabs defaultValue="dashboard" className="w-full space-y-4">
          <div className="flex justify-between items-center">
            <TabsList className="bg-white border rounded-lg shadow-sm overflow-x-auto">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-gray-100">
                <Activity className="w-4 h-4 mr-2" />
                Panel
              </TabsTrigger>
              <TabsTrigger value="products" className="data-[state=active]:bg-gray-100">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Ürünler
              </TabsTrigger>
              <TabsTrigger value="reservations" className="data-[state=active]:bg-gray-100">
                <Calendar className="w-4 h-4 mr-2" />
                Rezervasyonlar
              </TabsTrigger>
              <TabsTrigger value="events" className="data-[state=active]:bg-gray-100">
                <Calendar className="w-4 h-4 mr-2" />
                Etkinlikler
              </TabsTrigger>
              <TabsTrigger value="promotions" className="data-[state=active]:bg-gray-100">
                <BadgePercent className="w-4 h-4 mr-2" />
                Promosyonlar
              </TabsTrigger>
              <TabsTrigger value="employees" className="data-[state=active]:bg-gray-100">
                <Users className="w-4 h-4 mr-2" />
                Personel
              </TabsTrigger>
              <TabsTrigger value="feedback" className="data-[state=active]:bg-gray-100">
                <FileText className="w-4 h-4 mr-2" />
                Geri Bildirimler
              </TabsTrigger>
              <TabsTrigger value="livechat" className="data-[state=active]:bg-gray-100">
                <MessageCircle className="w-4 h-4 mr-2" />
                Canlı Destek
              </TabsTrigger>
              <TabsTrigger value="messages" className="data-[state=active]:bg-gray-100">
                <MessageSquare className="w-4 h-4 mr-2" />
                Mesajlar
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-gray-100">
                <BellRing className="w-4 h-4 mr-2" />
                Bildirimler
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-gray-100">
                <Settings className="w-4 h-4 mr-2" />
                Ayarlar
              </TabsTrigger>
            </TabsList>
            
            <Button variant="destructive" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Çıkış Yap
            </Button>
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

export default Business;
