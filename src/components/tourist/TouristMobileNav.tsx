
import { Button } from "@/components/ui/button";
import { Navigation, Calendar, Hotel, Utensils, Plane } from "lucide-react";

interface TouristMobileNavProps {
  activeTab: string;
  handleTabChange: (tab: string) => void;
}

const TouristMobileNav = ({ activeTab, handleTabChange }: TouristMobileNavProps) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-2 z-10">
      <div className="grid grid-cols-5 gap-1">
        <Button 
          variant={activeTab === "nearby" ? "default" : "ghost"} 
          size="sm"
          className="flex flex-col items-center h-16 text-xs p-1"
          onClick={() => handleTabChange("nearby")}
        >
          <Navigation className="h-5 w-5 mb-1" />
          Keşfet
        </Button>
        <Button 
          variant={activeTab === "plan" ? "default" : "ghost"} 
          size="sm"
          className="flex flex-col items-center h-16 text-xs p-1"
          onClick={() => handleTabChange("plan")}
        >
          <Calendar className="h-5 w-5 mb-1" />
          Gezi Planla
        </Button>
        <Button 
          variant={activeTab === "hotel" ? "default" : "ghost"} 
          size="sm"
          className="flex flex-col items-center h-16 text-xs p-1"
          onClick={() => handleTabChange("hotel")}
        >
          <Hotel className="h-5 w-5 mb-1" />
          Konaklama
        </Button>
        <Button 
          variant={activeTab === "restaurant" ? "default" : "ghost"} 
          size="sm"
          className="flex flex-col items-center h-16 text-xs p-1"
          onClick={() => handleTabChange("restaurant")}
        >
          <Utensils className="h-5 w-5 mb-1" />
          Restoran
        </Button>
        <Button 
          variant={activeTab === "flights" ? "default" : "ghost"} 
          size="sm"
          className="flex flex-col items-center h-16 text-xs p-1"
          onClick={() => handleTabChange("flights")}
        >
          <Plane className="h-5 w-5 mb-1" />
          Uçuşlar
        </Button>
      </div>
    </div>
  );
};

export default TouristMobileNav;
