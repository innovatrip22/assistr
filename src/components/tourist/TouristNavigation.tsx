
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
  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="mb-4 w-full grid grid-cols-5 md:grid-cols-10 bg-gradient-to-r from-blue-100 to-purple-100 p-1 rounded-xl shadow-md border border-blue-200/50">
        {menuItems.map((item) => (
          <TabsTrigger 
            key={item.value} 
            value={item.value}
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 ease-in-out hover:bg-white/80"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start w-full">
              {item.icon}
              <span className="mt-1 sm:mt-0 sm:ml-2 hidden sm:inline-block">{item.label}</span>
              <span className="mt-1 sm:mt-0 sm:ml-2 text-xs inline-block sm:hidden">{item.label.substring(0, 3)}</span>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default TouristNavigation;
