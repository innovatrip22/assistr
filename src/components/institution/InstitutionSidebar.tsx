
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Activity, 
  Settings, 
  MessageSquare, 
  FileText, 
  Users, 
  ClipboardList, 
  Bell, 
  FileArchive, 
  Calendar, 
  Wrench, 
  BarChart, 
  CreditCard, 
  Construction
} from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface InstitutionSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const InstitutionSidebar = ({ activeTab, setActiveTab }: InstitutionSidebarProps) => {
  const menuItems: MenuItem[] = [
    { id: "dashboard", label: "Gösterge Paneli", icon: <Activity className="w-4 h-4" /> },
    { id: "feedback", label: "Geri Bildirim", icon: <MessageSquare className="w-4 h-4" /> },
    { id: "reports", label: "Raporlama", icon: <FileText className="w-4 h-4" /> },
    { id: "users", label: "Kullanıcı Yönetimi", icon: <Users className="w-4 h-4" /> },
    { id: "applications", label: "Başvuru Takibi", icon: <ClipboardList className="w-4 h-4" /> },
    { id: "announcements", label: "Duyuru Yönetimi", icon: <Bell className="w-4 h-4" /> },
    { id: "documents", label: "Evrak Yönetimi", icon: <FileArchive className="w-4 h-4" /> },
    { id: "events", label: "Etkinlikler", icon: <Calendar className="w-4 h-4" /> },
    { id: "electricity", label: "Elektrik Arıza Yönetimi", icon: <Wrench className="w-4 h-4" /> },
    { id: "consumption", label: "Tüketim & Sayaç Yönetimi", icon: <BarChart className="w-4 h-4" /> },
    { id: "payment", label: "Borç & Tahsilat Raporları", icon: <CreditCard className="w-4 h-4" /> },
    { id: "infrastructure", label: "Yatırım & Altyapı", icon: <Construction className="w-4 h-4" /> },
    { id: "settings", label: "Sistem Ayarları", icon: <Settings className="w-4 h-4" /> },
  ];

  return (
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
  );
};

export default InstitutionSidebar;
