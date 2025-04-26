
import { Button } from "@/components/ui/button";
import { Navigation, Calendar, Hotel, Utensils, Plane } from "lucide-react";
import { motion } from "framer-motion";

interface TouristMobileNavProps {
  activeTab: string;
  handleTabChange: (tab: string) => void;
}

const TouristMobileNav = ({ activeTab, handleTabChange }: TouristMobileNavProps) => {
  return (
    <motion.div 
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-800 p-2 z-10 shadow-lg"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="grid grid-cols-5 gap-1">
        <NavButton 
          isActive={activeTab === "nearby"} 
          icon={<Navigation className="h-5 w-5" />}
          label="Keşfet"
          onClick={() => handleTabChange("nearby")}
        />
        <NavButton 
          isActive={activeTab === "plan"} 
          icon={<Calendar className="h-5 w-5" />}
          label="Gezi Planla"
          onClick={() => handleTabChange("plan")}
        />
        <NavButton 
          isActive={activeTab === "hotel"} 
          icon={<Hotel className="h-5 w-5" />}
          label="Konaklama"
          onClick={() => handleTabChange("hotel")}
        />
        <NavButton 
          isActive={activeTab === "restaurant"} 
          icon={<Utensils className="h-5 w-5" />}
          label="Restoran"
          onClick={() => handleTabChange("restaurant")}
        />
        <NavButton 
          isActive={activeTab === "flights"} 
          icon={<Plane className="h-5 w-5" />}
          label="Uçuşlar"
          onClick={() => handleTabChange("flights")}
        />
      </div>
    </motion.div>
  );
};

interface NavButtonProps {
  isActive: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const NavButton = ({ isActive, icon, label, onClick }: NavButtonProps) => {
  return (
    <Button 
      variant={isActive ? "default" : "ghost"} 
      size="sm"
      className={`flex flex-col items-center h-16 text-xs p-1 rounded-xl ${
        isActive ? 'bg-gradient-to-b from-primary to-primary/80' : ''
      }`}
      onClick={onClick}
    >
      <motion.div
        whileTap={{ scale: 0.9 }}
        animate={isActive ? { y: [0, -2, 0] } : {}}
        transition={{ duration: 0.2 }}
      >
        {icon}
      </motion.div>
      <span className="mt-1">{label}</span>
    </Button>
  );
};

export default TouristMobileNav;
