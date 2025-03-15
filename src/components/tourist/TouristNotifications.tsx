
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, MessageSquare, FileText } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

interface TouristNotificationsProps {
  notifications: any[];
}

const TouristNotifications = ({ notifications }: TouristNotificationsProps) => {
  if (notifications.length === 0) return null;

  return (
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
  );
};

export default TouristNotifications;
