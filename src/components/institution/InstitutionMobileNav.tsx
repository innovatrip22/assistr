
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, Settings } from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface InstitutionMobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const InstitutionMobileNav = ({ activeTab, setActiveTab }: InstitutionMobileNavProps) => {
  const menuItems: MenuItem[] = [
    { id: "dashboard", label: "Gösterge Paneli", icon: <Activity className="w-4 h-4" /> },
    { id: "settings", label: "Ayarlar", icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="md:hidden px-4 py-3 overflow-x-auto">
      <ScrollArea className="w-full">
        <div className="flex gap-2 min-w-max">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "outline"}
              size="sm"
              className="flex items-center"
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              <span className="ml-1">{item.label}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default InstitutionMobileNav;
