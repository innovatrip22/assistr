
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map, MessageSquare, Navigation } from "lucide-react";
import TravelPlanner from "./TravelPlanner";
import NearbyPlaces from "./NearbyPlaces";
import TravelChat from "./TravelChat";

const TravelAssistant = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Map className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">Gezi Asistanı</h2>
      </div>

      <Tabs defaultValue="planner" className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="planner" className="w-full">
            Gezi Planlayıcı
          </TabsTrigger>
          <TabsTrigger value="nearby" className="w-full">
            Yakındaki Yerler
          </TabsTrigger>
          <TabsTrigger value="chat" className="w-full">
            Sohbet
          </TabsTrigger>
        </TabsList>

        <TabsContent value="planner">
          <TravelPlanner />
        </TabsContent>

        <TabsContent value="nearby">
          <NearbyPlaces />
        </TabsContent>

        <TabsContent value="chat">
          <TravelChat />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TravelAssistant;
