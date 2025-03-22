
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
  Construction,
  Home,
  Droplet,
  User,
  Building,
  Receipt,
  LineChart
} from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  institutionType?: string[]; // Only show for these institution types
}

interface InstitutionSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  institutionType?: string; // Added to filter menu items by institution type
}

const InstitutionSidebar = ({ 
  activeTab, 
  setActiveTab, 
  institutionType = "" 
}: InstitutionSidebarProps) => {
  const isElectricityUtility = institutionType.includes("Elektrik") || !institutionType;
  const isWaterUtility = institutionType.includes("Su") || !institutionType;
  const isTourismAuthority = institutionType.includes("Turizm") || !institutionType;

  // All possible menu items
  const allMenuItems: MenuItem[] = [
    // Common for all institutions
    { id: "dashboard", label: "Gösterge Paneli", icon: <Activity className="w-4 h-4" /> },
    { id: "feedback", label: "Geri Bildirim", icon: <MessageSquare className="w-4 h-4" /> },
    { id: "reports", label: "Raporlama", icon: <FileText className="w-4 h-4" /> },
    { id: "users", label: "Kullanıcı Yönetimi", icon: <Users className="w-4 h-4" /> },
    { id: "applications", label: "Başvuru Takibi", icon: <ClipboardList className="w-4 h-4" /> },
    { id: "announcements", label: "Duyuru Yönetimi", icon: <Bell className="w-4 h-4" /> },
    { id: "documents", label: "Evrak Yönetimi", icon: <FileArchive className="w-4 h-4" /> },
    { id: "events", label: "Etkinlikler", icon: <Calendar className="w-4 h-4" /> },
    
    // Electricity utility specific
    { 
      id: "subscribers", 
      label: "Abone Yönetimi", 
      icon: <User className="w-4 h-4" />,
      institutionType: ["Elektrik"]
    },
    { 
      id: "billing", 
      label: "Faturalandırma", 
      icon: <Receipt className="w-4 h-4" />,
      institutionType: ["Elektrik", "Su"]
    },
    { 
      id: "electricity", 
      label: "Arıza Yönetimi", 
      icon: <Wrench className="w-4 h-4" />,
      institutionType: ["Elektrik"]
    },
    { 
      id: "consumption", 
      label: "Tüketim & Sayaç", 
      icon: <BarChart className="w-4 h-4" />,
      institutionType: ["Elektrik", "Su"]
    },
    { 
      id: "payment", 
      label: "Borç & Tahsilat", 
      icon: <CreditCard className="w-4 h-4" />,
      institutionType: ["Elektrik", "Su"]
    },
    { 
      id: "infrastructure", 
      label: "Yatırım & Altyapı", 
      icon: <Construction className="w-4 h-4" /> 
    },
    
    // Water utility specific
    { 
      id: "water", 
      label: "Su Kalitesi", 
      icon: <Droplet className="w-4 h-4" />,
      institutionType: ["Su"]
    },
    
    // Tourism authority specific
    { 
      id: "tourism", 
      label: "Turizm Verileri", 
      icon: <LineChart className="w-4 h-4" />,
      institutionType: ["Turizm"]
    },
    { 
      id: "accommodations", 
      label: "Konaklama Tesisleri", 
      icon: <Building className="w-4 h-4" />,
      institutionType: ["Turizm"]
    },
    
    // Settings is always last and available for all
    { id: "settings", label: "Sistem Ayarları", icon: <Settings className="w-4 h-4" /> },
  ];

  // Filter menu items based on institution type
  const menuItems = allMenuItems.filter(item => {
    if (!item.institutionType) return true; // Show to all if no specific type
    if (!institutionType) return true; // Show all in demo mode if no type specified
    return item.institutionType.some(type => institutionType.includes(type));
  });

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
