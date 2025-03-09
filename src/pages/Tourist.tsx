
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { 
  Map, MessageSquare, Calendar, Bell, Navigation, 
  FileText, Hotel, Plane, Bus, User, Landmark, 
  Settings, LogOut, Menu, ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
import HotelReservation from "@/components/tourist/HotelReservation";

const Tourist = () => {
  const [activeTab, setActiveTab] = useState("nearby");
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

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

  const menuItems = [
    { value: "nearby", label: "Yakındakiler", icon: <Navigation className="w-4 h-4" /> },
    { value: "hotel", label: "Otel", icon: <Hotel className="w-4 h-4" /> },
    { value: "flights", label: "Uçuşlar", icon: <Plane className="w-4 h-4" /> },
    { value: "plan", label: "Gezi Planı", icon: <Calendar className="w-4 h-4" /> },
    { value: "assistant", label: "Asistan", icon: <Map className="w-4 h-4" /> },
    { value: "feedback", label: "Geri Bildirim", icon: <MessageSquare className="w-4 h-4" /> },
    { value: "report", label: "Raporlar", icon: <FileText className="w-4 h-4" /> },
    { value: "chat", label: "Sohbet", icon: <MessageSquare className="w-4 h-4" /> },
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
      <header className="sticky top-0 z-10 bg-white border-b shadow-sm py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="border-b p-4 bg-primary/5">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    <p className="font-medium">{user?.email || "Turist"}</p>
                  </div>
                </div>
                <ScrollArea className="h-[calc(100vh-60px)]">
                  <div className="py-2">
                    {menuItems.map((item) => (
                      <Button 
                        key={item.value}
                        variant={activeTab === item.value ? "default" : "ghost"}
                        className={`w-full justify-start rounded-none px-4 ${activeTab === item.value ? 'bg-primary/10 text-primary hover:bg-primary/20' : ''}`}
                        onClick={() => handleTabChange(item.value)}
                      >
                        {item.icon}
                        <span className="ml-2">{item.label}</span>
                        {activeTab === item.value && (
                          <ChevronRight className="ml-auto h-4 w-4" />
                        )}
                      </Button>
                    ))}
                  </div>
                  <div className="border-t mt-2 py-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start rounded-none px-4 text-destructive hover:text-destructive"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="ml-2">Çıkış Yap</span>
                    </Button>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/5ecb91b8-3b2a-4493-95fe-ccb5e08148fa.png" 
                alt="AssisTR Logo" 
                className="w-8 h-8 mr-2 rounded-md shadow-sm"
              />
              <h1 className="text-xl font-bold text-primary">AssisTR</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="relative"
                    onClick={() => toast.info(`${notifications.length} yanıtınız bulunmaktadır.`)}
                  >
                    <Bell className="h-4 w-4" />
                    {notifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {notifications.length}
                      </span>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Bildirimler</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Button variant="destructive" size="sm" onClick={handleSignOut}>
              Çıkış
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-4 px-4">
        {/* Desktop Menu */}
        <div className="hidden md:block mb-6">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="mb-4 w-full grid grid-cols-8">
              {menuItems.map((item) => (
                <TabsTrigger key={item.value} value={item.value}>
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tabs Content */}
            <div className="border rounded-lg p-6 bg-white shadow-sm">
              <TabsContent value="nearby" className="mt-0">
                <NearbyPlaces />
              </TabsContent>
              <TabsContent value="hotel" className="mt-0">
                <HotelReservation />
              </TabsContent>
              <TabsContent value="flights" className="mt-0">
                <div className="flex flex-col items-center justify-center py-10">
                  <Plane className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium">Uçuş Bilgileri</h3>
                  <p className="text-muted-foreground mb-4 text-center max-w-md">
                    Uçuş bilgilerinize Otel rezervasyon bölümünden erişebilirsiniz. 
                    Otel rezervasyonunuzla uyumlu uçuş seçenekleri sunulmaktadır.
                  </p>
                  <Button onClick={() => setActiveTab("hotel")}>
                    <Hotel className="mr-2 h-4 w-4" />
                    Otel Rezervasyonuna Git
                  </Button>
                </div>
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
        </div>
        
        {/* Mobile Content */}
        <div className="md:hidden">
          <div className="mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              {menuItems.find(item => item.value === activeTab)?.icon}
              <span className="ml-2">{menuItems.find(item => item.value === activeTab)?.label}</span>
            </h2>
          </div>

          <div className="border rounded-lg p-4 bg-white shadow-sm">
            {activeTab === "nearby" && <NearbyPlaces />}
            {activeTab === "hotel" && <HotelReservation />}
            {activeTab === "flights" && (
              <div className="flex flex-col items-center justify-center py-8">
                <Plane className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Uçuş Bilgileri</h3>
                <p className="text-muted-foreground mb-4 text-center text-sm">
                  Uçuş bilgilerinize Otel rezervasyon bölümünden erişebilirsiniz.
                </p>
                <Button size="sm" onClick={() => setActiveTab("hotel")}>
                  <Hotel className="mr-2 h-4 w-4" />
                  Otel Rezervasyonu
                </Button>
              </div>
            )}
            {activeTab === "plan" && <TravelPlanner />}
            {activeTab === "assistant" && <TravelAssistant />}
            {activeTab === "feedback" && <FeedbackAssistant />}
            {activeTab === "report" && <ReportAssistant />}
            {activeTab === "chat" && <TravelChat />}
          </div>
        </div>

        {/* Quick Actions - Mobile Only */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-2 z-10">
          <div className="grid grid-cols-4 gap-1">
            <Button 
              variant={activeTab === "nearby" ? "default" : "ghost"} 
              size="sm"
              className="flex flex-col items-center h-16 text-xs p-1"
              onClick={() => handleTabChange("nearby")}
            >
              <Navigation className="h-5 w-5 mb-1" />
              Keşfet
            </Button>
            <Button 
              variant={activeTab === "hotel" ? "default" : "ghost"} 
              size="sm"
              className="flex flex-col items-center h-16 text-xs p-1"
              onClick={() => handleTabChange("hotel")}
            >
              <Hotel className="h-5 w-5 mb-1" />
              Konaklama
            </Button>
            <Button 
              variant={activeTab === "plan" ? "default" : "ghost"} 
              size="sm"
              className="flex flex-col items-center h-16 text-xs p-1"
              onClick={() => handleTabChange("plan")}
            >
              <Calendar className="h-5 w-5 mb-1" />
              Plan
            </Button>
            <Button 
              variant={activeTab === "assistant" ? "default" : "ghost"} 
              size="sm"
              className="flex flex-col items-center h-16 text-xs p-1"
              onClick={() => handleTabChange("assistant")}
            >
              <Map className="h-5 w-5 mb-1" />
              Asistan
            </Button>
          </div>
        </div>

        {/* Notifications Section */}
        {notifications.length > 0 && (
          <div className="mt-8 mb-20 md:mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Bell className="w-5 h-5 text-primary mr-2" />
              Son Yanıtlar
            </h2>
            <div className="grid gap-4">
              {notifications.map((notification) => (
                <Card key={notification.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${notification.type === 'feedback' ? 'bg-blue-100' : 'bg-amber-100'}`}>
                        {notification.type === 'feedback' ? (
                          <MessageSquare className="h-4 w-4 text-blue-600" />
                        ) : (
                          <FileText className="h-4 w-4 text-amber-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-700">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-2">
                          {format(new Date(notification.timestamp), 'dd MMM yyyy HH:mm', {locale: tr})}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pb-4 pt-0">
                    <Button variant="ghost" size="sm" className="ml-auto text-xs">
                      Detayları Gör
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tourist;
