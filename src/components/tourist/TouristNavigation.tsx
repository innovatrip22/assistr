
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
      <TabsList className="mb-4 w-full grid grid-cols-10">
        {menuItems.map((item) => (
          <TabsTrigger key={item.value} value={item.value}>
            {item.icon}
            <span className="ml-2">{item.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default TouristNavigation;
