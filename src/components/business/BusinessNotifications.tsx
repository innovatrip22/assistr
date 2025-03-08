
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, Clock, RefreshCcw, MessageSquare, FileWarning, DollarSign, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockNotifications = [
  {
    id: 1,
    title: "Yeni Turist Bildirildi",
    description: "KKTC'ye yaklaşık 200 yeni turist geldi. İşletmenize yönlendirmek için promosyon oluşturun.",
    time: "10 dakika önce",
    type: "info",
    isRead: false
  },
  {
    id: 2,
    title: "Yeni Değerlendirme",
    description: "İşletmenize yeni bir müşteri değerlendirmesi yapıldı. 5 yıldız ve olumlu yorumlar aldınız.",
    time: "30 dakika önce",
    type: "success",
    isRead: false
  },
  {
    id: 3,
    title: "Turizm Bakanlığı Denetimi",
    description: "Yarın işletmenizde Turizm Bakanlığı tarafından rutin denetim yapılacaktır.",
    time: "1 saat önce",
    type: "warning",
    isRead: false
  },
  {
    id: 4,
    title: "Rezervasyon Onayı",
    description: "Yeni bir rezervasyon talebi onaylandı. 4 kişilik, yarın 20:00.",
    time: "3 saat önce",
    type: "success",
    isRead: true
  },
  {
    id: 5,
    title: "Turist Yoğunluğu Tahmini",
    description: "Önümüzdeki hafta sonu için yüksek turist yoğunluğu bekleniyor. Hazırlıklı olun.",
    time: "1 gün önce",
    type: "info",
    isRead: true
  },
  {
    id: 6,
    title: "Ödeme Alındı",
    description: "Yapılan rezervasyon için ön ödeme alındı. Tutar: 1200₺",
    time: "2 gün önce",
    type: "success",
    isRead: true
  },
];

const BusinessNotifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      isRead: true
    })));
  };
  
  const shareNotification = (id: number) => {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
      alert(`"${notification.title}" bildirimi personele iletildi.`);
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "error":
        return <FileWarning className="h-5 w-5 text-red-500" />;
      case "info":
      default:
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
    }
  };

  const filteredNotifications = notifications.filter(notification => 
    filter === "all" || (filter === "unread" && !notification.isRead)
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Bildirimler</CardTitle>
            <CardDescription>
              {filter === "all" 
                ? "Tüm bildirimleriniz" 
                : "Okunmamış bildirimleriniz"}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge 
              variant={filter === "all" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setFilter("all")}
            >
              Tümü ({notifications.length})
            </Badge>
            <Badge 
              variant={filter === "unread" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setFilter("unread")}
            >
              Okunmamış ({notifications.filter(n => !n.isRead).length})
            </Badge>
            <button 
              className="text-sm text-primary hover:underline flex items-center"
              onClick={markAllAsRead}
            >
              <RefreshCcw className="h-3 w-3 mr-1" />
              Tümünü Okundu İşaretle
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-10">
            <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground">
              {filter === "all" 
                ? "Henüz bildiriminiz bulunmuyor." 
                : "Tüm bildirimlerinizi okudunuz."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map(notification => (
              <div 
                key={notification.id}
                className={`p-4 rounded-lg border ${
                  notification.isRead ? 'border-border' : 'border-primary'
                }`}
              >
                <div className="flex gap-3">
                  {getIconForType(notification.type)}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className={`font-medium ${notification.isRead ? '' : 'text-primary'}`}>
                        {notification.title}
                      </h3>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {notification.time}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.description}
                    </p>
                    <div className="flex justify-end mt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => shareNotification(notification.id)}
                      >
                        <Share2 className="h-3 w-3 mr-1" />
                        Personele İlet
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BusinessNotifications;
