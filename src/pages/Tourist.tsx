
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FlightAssistant from "@/components/tourist/FlightAssistant";
import AccommodationAssistant from "@/components/tourist/AccommodationAssistant";
import TravelAssistant from "@/components/tourist/TravelAssistant";
import EventAssistant from "@/components/tourist/EventAssistant";
import FeedbackAssistant from "@/components/tourist/FeedbackAssistant";
import ReportAssistant from "@/components/tourist/ReportAssistant";
import { MessageSquare, Bell } from "lucide-react";
import { 
  getUserNotifications, 
  getFeedbacks, 
  getReports 
} from "@/services/dataService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { useAuth } from "@/hooks/useAuth";

const Tourist = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [notifications, setNotifications] = useState({
    feedbackNotifications: [],
    reportNotifications: [],
    total: 0
  });
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    console.log("Tourist dashboard mounted");
    setTimeout(() => setShowWelcome(false), 5000);
    
    // Load notifications on mount and every 30 seconds
    if (user) {
      loadNotifications();
      const intervalId = setInterval(() => loadNotifications(), 30000);
      return () => clearInterval(intervalId);
    } else {
      setIsLoading(false);
    }
  }, [user]);
  
  const loadNotifications = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const userNotifications = await getUserNotifications(user.id);
      setNotifications(userNotifications);
    } catch (error) {
      console.error("Error loading notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      {showWelcome && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 right-4 bg-white p-4 rounded-xl shadow-lg z-50 max-w-md"
        >
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Merhaba Oktay!</p>
              <p className="text-sm text-gray-600">
                Antalya'ya hoş geldiniz! Size nasıl yardımcı olabilirim?
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Notification Icon */}
      {notifications.total > 0 && (
        <div className="fixed top-4 right-4 z-50">
          <Dialog open={notificationDialogOpen} onOpenChange={setNotificationDialogOpen}>
            <DialogTrigger asChild>
              <button className="bg-white p-2 rounded-full shadow-md relative">
                <Bell className="w-6 h-6 text-primary" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {notifications.total}
                </Badge>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Bildirimler</DialogTitle>
                <DialogDescription>
                  Bildirimleriniz ve kurumlardan gelen yanıtlar
                </DialogDescription>
              </DialogHeader>
              
              <ScrollArea className="max-h-[400px] pr-4">
                {notifications.reportNotifications.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-medium text-lg mb-2">Rapor Yanıtları</h3>
                    <div className="space-y-3">
                      {notifications.reportNotifications.map((report: any, index: number) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <div className="mb-1">
                            {report.type === 'price' && <span className="text-orange-600 font-medium">Fahiş Fiyat Bildirimi</span>}
                            {report.type === 'fraud' && <span className="text-red-600 font-medium">Dolandırıcılık Bildirimi</span>}
                            {report.type === 'emergency' && <span className="text-red-600 font-medium">Acil Durum Bildirimi</span>}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                          <div className="bg-white p-2 rounded-md border border-blue-100">
                            <p className="text-sm font-medium text-blue-800">Yanıt:</p>
                            <p className="text-sm text-gray-600">{report.response}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {format(new Date(report.responseTimestamp || ""), 'dd MMM yyyy HH:mm', {locale: tr})}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {notifications.feedbackNotifications.length > 0 && (
                  <div>
                    <h3 className="font-medium text-lg mb-2">Geri Bildirim Yanıtları</h3>
                    <div className="space-y-3">
                      {notifications.feedbackNotifications.map((feedback: any, index: number) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <div className="mb-1">
                            {feedback.type === 'complaint' && (
                              <>
                                <span className="font-medium">{feedback.subject}</span>
                                <p className="text-xs text-gray-500">{feedback.institution}</p>
                              </>
                            )}
                            {feedback.type === 'chat' && <span className="font-medium">Chatbot Mesajı</span>}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{feedback.message}</p>
                          <div className="bg-white p-2 rounded-md border border-blue-100">
                            <p className="text-sm font-medium text-blue-800">Yanıt:</p>
                            <p className="text-sm text-gray-600">{feedback.response}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {format(new Date(feedback.responseTimestamp || ""), 'dd MMM yyyy HH:mm', {locale: tr})}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Turist Paneli</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FlightAssistant />
          <AccommodationAssistant />
          <TravelAssistant />
          <EventAssistant />
          <FeedbackAssistant />
          <ReportAssistant />
        </div>
      </motion.div>
    </div>
  );
};

export default Tourist;
