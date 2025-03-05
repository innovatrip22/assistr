
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { LogOut, Search, Map, Calendar, MessageSquare, Bell, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import {
  getFeedbacks,
  getReports,
} from "@/services";
import NearbyPlaces from "@/components/tourist/NearbyPlaces";
import TravelAssistant from "@/components/tourist/TravelAssistant";
import FeedbackAssistant from "@/components/tourist/FeedbackAssistant";
import ReportAssistant from "@/components/tourist/ReportAssistant";
import TravelPlanner from "@/components/tourist/TravelPlanner";
import TravelChat from "@/components/tourist/TravelChat";

const Tourist = () => {
  const [stats, setStats] = useState<any>({
    totalVisits: 125,
    averageSpending: 1250,
    mostPopularPlace: "Kaleiçi"
  });
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { signOut } = useAuth();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Mock notifications for demo purposes
      const mockFeedbacks = await getFeedbacks();
      const mockReports = await getReports();
      const newNotifications = [
        ...mockFeedbacks.slice(0, 2).map(fb => ({
          id: fb.id,
          type: 'feedback',
          message: `Yeni bir geri bildiriminiz var: ${fb.message?.substring(0, 50) || 'Geri bildirim'}...`,
          timestamp: fb.timestamp,
        })),
        ...mockReports.slice(0, 2).map(report => ({
          id: report.id,
          type: 'report',
          message: `Yeni bir raporunuz var: ${report.description?.substring(0, 50) || 'Rapor'}...`,
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

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Yükleniyor...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Turist Paneli</h1>
        <div className="flex items-center gap-4">
          <Badge variant="outline">
            <Bell className="mr-2 w-4 h-4" />
            {notifications.length} Bildirim
          </Badge>
          <Button variant="destructive" size="sm" onClick={handleSignOut}>
            <LogOut className="mr-2 w-4 h-4" />
            Çıkış Yap
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Toplam Ziyaret</CardTitle>
            <CardDescription>Bu ayki ziyaret sayısı</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalVisits || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ortalama Harcama</CardTitle>
            <CardDescription>Turist başına ortalama harcama</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.averageSpending || 0}₺</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>En Popüler Yer</CardTitle>
            <CardDescription>Bu ay en çok ziyaret edilen yer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.mostPopularPlace || "Yok"}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="travel">
        <TabsList className="mb-4">
          <TabsTrigger value="travel">
            <Search className="mr-2 w-4 h-4" />
            Keşfet
          </TabsTrigger>
          <TabsTrigger value="nearby">
            <Map className="mr-2 w-4 h-4" />
            Yakınında
          </TabsTrigger>
          <TabsTrigger value="plan">
            <Calendar className="mr-2 w-4 h-4" />
            Planla
          </TabsTrigger>
          <TabsTrigger value="assistant">
            <MessageSquare className="mr-2 w-4 h-4" />
            Asistan
          </TabsTrigger>
          <TabsTrigger value="feedback">
            <Bell className="mr-2 w-4 h-4" />
            Geri Bildirim
          </TabsTrigger>
          <TabsTrigger value="report">
            <FileText className="mr-2 w-4 h-4" />
            Raporlar
          </TabsTrigger>
          <TabsTrigger value="chat">
            <MessageSquare className="mr-2 w-4 h-4" />
            Chat
          </TabsTrigger>
        </TabsList>
        <TabsContent value="travel" className="space-y-4">
          <TravelAssistant />
        </TabsContent>
        <TabsContent value="nearby" className="space-y-4">
          <NearbyPlaces />
        </TabsContent>
        <TabsContent value="plan" className="space-y-4">
          <TravelPlanner />
        </TabsContent>
        <TabsContent value="assistant" className="space-y-4">
          <TravelAssistant />
        </TabsContent>
        <TabsContent value="feedback" className="space-y-4">
          <FeedbackAssistant />
        </TabsContent>
        <TabsContent value="report" className="space-y-4">
          <ReportAssistant />
        </TabsContent>
         <TabsContent value="chat" className="space-y-4">
          <TravelChat />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tourist;
