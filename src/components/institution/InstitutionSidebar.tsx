
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, Settings } from "lucide-react";

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
    { id: "settings", label: "Ayarlar", icon: <Settings className="w-4 h-4" /> },
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
