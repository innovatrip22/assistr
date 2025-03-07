
import { useState } from "react";
import { Map as MapIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

import HeatmapView from "./map/HeatmapView";
import PredictionView from "./map/PredictionView";
import TrafficView from "./map/TrafficView";

const MapSection = () => {
  const [activeTab, setActiveTab] = useState("heatmap");
  const [predictionData] = useState({
    trafficLevel: "Normal",
    touristCount: "3,250",
    emergencyRisk: "Düşük",
    crowdPrediction: "Orta"
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <div className="flex items-center gap-3">
          <MapIcon className="w-6 h-6 text-primary" />
          <CardTitle>KKTC Haritası</CardTitle>
        </div>
        <CardDescription>
          Bölge genelindeki raporlar, yoğunluk ve tahminler
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="heatmap" onValueChange={handleTabChange} className="mb-4">
          <TabsList>
            <TabsTrigger value="heatmap">Yoğunluk Haritası</TabsTrigger>
            <TabsTrigger value="prediction">Yapay Zeka Öngörüleri</TabsTrigger>
            <TabsTrigger value="traffic">Trafik Durumu</TabsTrigger>
          </TabsList>
          
          <TabsContent value="heatmap" className="mt-4">
            <HeatmapView />
          </TabsContent>
          
          <TabsContent value="prediction" className="mt-4">
            <PredictionView predictionData={predictionData} />
          </TabsContent>
          
          <TabsContent value="traffic" className="mt-4">
            <TrafficView />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MapSection;
