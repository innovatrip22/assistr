
import { useState, useEffect } from "react";
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
  const [institutionType, setInstitutionType] = useState<string | null>(null);

  useEffect(() => {
    // localStorage'dan kurum tipini al
    const savedInstitutionType = localStorage.getItem("testUserType");
    if (savedInstitutionType) {
      setInstitutionType(savedInstitutionType);
      console.log("MapSection - Kurum tipi yüklendi:", savedInstitutionType);
    }
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Kurum tipine özgü başlık ve açıklamaları belirle
  const getTitle = () => {
    switch(institutionType) {
      case 'BELEDIYE': return "Belediye Bölgesi Haritası";
      case 'ELEKTRIK': return "Elektrik Şebekesi Haritası";
      case 'SU': return "Su Şebekesi Haritası";
      case 'DOGALGAZ': return "Doğalgaz Şebekesi Haritası";
      case 'TURIZM': return "Turizm Bölgeleri Haritası";
      case 'BAKANLIK': return "KKTC Genel Haritası";
      default: return "KKTC Haritası";
    }
  };

  const getDescription = () => {
    switch(institutionType) {
      case 'BELEDIYE': return "Belediye sınırları içindeki raporlar ve yoğunluk";
      case 'ELEKTRIK': return "Elektrik şebekesi ve arızalar";
      case 'SU': return "Su şebekesi ve kesinti noktaları";
      case 'DOGALGAZ': return "Doğalgaz hatları ve basınç noktaları";
      case 'TURIZM': return "Turistik bölgeler ve ziyaretçi yoğunluğu";
      case 'BAKANLIK': return "Tüm ada genelindeki turizm verileri";
      default: return "Bölge genelindeki raporlar, yoğunluk ve tahminler";
    }
  };

  // Tab etiketlerini kurum tipine göre belirle
  const getHeatmapLabel = () => {
    switch(institutionType) {
      case 'ELEKTRIK': return "Elektrik Yoğunluğu";
      case 'SU': return "Su Kullanım Yoğunluğu";
      case 'DOGALGAZ': return "Gaz Tüketim Haritası";
      default: return "Yoğunluk Haritası";
    }
  };

  const getPredictionLabel = () => {
    switch(institutionType) {
      case 'ELEKTRIK': return "Elektrik Tahminleri";
      case 'SU': return "Su Tüketim Tahmini";
      case 'DOGALGAZ': return "Gaz Tahminleri";
      default: return "Yapay Zeka Öngörüleri";
    }
  };

  const getTrafficLabel = () => {
    switch(institutionType) {
      case 'BELEDIYE': return "Trafik Durumu";
      case 'ELEKTRIK': return "Şebeke Durumu";
      case 'SU': return "Su Basıncı";
      case 'DOGALGAZ': return "Hat Durumu";
      default: return "Trafik Durumu";
    }
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <div className="flex items-center gap-3">
          <MapIcon className="w-6 h-6 text-primary" />
          <CardTitle>{getTitle()}</CardTitle>
        </div>
        <CardDescription>{getDescription()}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="heatmap" onValueChange={handleTabChange} className="mb-4">
          <TabsList>
            <TabsTrigger value="heatmap">
              {getHeatmapLabel()}
            </TabsTrigger>
            <TabsTrigger value="prediction">
              {getPredictionLabel()}
            </TabsTrigger>
            <TabsTrigger value="traffic">
              {getTrafficLabel()}
            </TabsTrigger>
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
