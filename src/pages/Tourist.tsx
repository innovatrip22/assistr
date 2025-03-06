
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Map, MessageSquare, Calendar, Bell, Navigation, FileText } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState("nearby");
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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
            {notifications.length} Yanıt
          </Badge>
          <Button variant="destructive" size="sm" onClick={handleSignOut}>
            Çıkış Yap
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-4 w-full grid grid-cols-6">
          <TabsTrigger value="nearby">
            <Navigation className="mr-2 w-4 h-4" />
            Yakındakiler
          </TabsTrigger>
          <TabsTrigger value="plan">
            <Calendar className="mr-2 w-4 h-4" />
            Gezi Planı
          </TabsTrigger>
          <TabsTrigger value="assistant">
            <Map className="mr-2 w-4 h-4" />
            Asistan
          </TabsTrigger>
          <TabsTrigger value="feedback">
            <MessageSquare className="mr-2 w-4 h-4" />
            Geri Bildirim
          </TabsTrigger>
          <TabsTrigger value="report">
            <FileText className="mr-2 w-4 h-4" />
            Raporlar
          </TabsTrigger>
          <TabsTrigger value="chat">
            <MessageSquare className="mr-2 w-4 h-4" />
            Sohbet
          </TabsTrigger>
        </TabsList>

        <div className="border rounded-lg p-6 bg-white">
          <TabsContent value="nearby" className="mt-0">
            <NearbyPlaces />
          </TabsContent>
          <TabsContent value="plan" className="mt-0">
            <TravelPlanner />
          </TabsContent>
          <TabsContent value="assistant" className="mt-0">
            <TravelAssistant />
          </TabsContent>
          <TabsContent value="feedback" className="mt-0">
            <FeedbackAssistant />
          </TabsContent>
          <TabsContent value="report" className="mt-0">
            <ReportAssistant />
          </TabsContent>
          <TabsContent value="chat" className="mt-0">
            <TravelChat />
          </TabsContent>
        </div>
      </Tabs>

      {/* Notifications Section */}
      {notifications.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Son Yanıtlar</h2>
          <div className="grid gap-4">
            {notifications.map((notification) => (
              <Card key={notification.id}>
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {format(new Date(notification.timestamp), 'dd MMM yyyy HH:mm', {locale: tr})}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tourist;
