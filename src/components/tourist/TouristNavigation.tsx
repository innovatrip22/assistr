
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TouristNavigationProps {
  activeTab: string;
  handleTabChange: (value: string) => void;
  menuItems: Array<{ value: string; label: string; icon: JSX.Element }>;
}

const TouristNavigation = ({
  activeTab,
  handleTabChange,
  menuItems,
}: TouristNavigationProps) => {
  // Separate menu items into logical groups
  const mainServices = menuItems.slice(0, 3);
  const reservations = menuItems.slice(3, 6);
  const support = menuItems.slice(6);

  return (
    <div className="space-y-6">
      {/* Main Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-6 w-full grid grid-cols-9 bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-2 rounded-2xl shadow-lg border border-blue-200">
          {menuItems.map((item) => (
            <TabsTrigger 
              key={item.value} 
              value={item.value}
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 ease-in-out hover:bg-white/80 rounded-xl py-3"
            >
              <div className="flex flex-col items-center justify-center space-y-1 w-full">
                <span className="text-lg">{item.icon}</span>
                <span className="mt-1 text-xs sm:text-sm font-medium">{item.label}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      {/* Category Labels for better navigation */}
      <div className="grid grid-cols-3 gap-6 text-center text-sm mb-3">
        <div className="text-blue-700 font-medium">Ana Hizmetler</div>
        <div className="text-blue-700 font-medium">Rezervasyonlar</div>
        <div className="text-blue-700 font-medium">Destek & Bildirim</div>
      </div>
    </div>
  );
};

export default TouristNavigation;
