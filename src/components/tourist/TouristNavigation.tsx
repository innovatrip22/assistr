
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

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
      <TabsList className="mb-6 w-full grid grid-cols-5 md:grid-cols-8 bg-gradient-to-r from-blue-500/10 to-primary/10 p-2 rounded-2xl shadow-lg border border-blue-100 dark:border-blue-900">
        {menuItems.map((item) => (
          <TabsTrigger 
            key={item.value} 
            value={item.value}
            className="group data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300 ease-in-out hover:bg-white/80 dark:hover:bg-gray-800/60 rounded-xl py-3"
          >
            <div className="flex flex-col items-center justify-center space-y-1 w-full">
              <motion.span 
                className="text-lg"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {item.icon}
              </motion.span>
              <span className="mt-1 text-xs sm:text-sm font-medium opacity-90 group-data-[state=active]:opacity-100">
                {item.label}
              </span>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default TouristNavigation;
