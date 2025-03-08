
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
    // Get the institution type from localStorage
    const savedInstitutionType = localStorage.getItem("testUserType");
    if (savedInstitutionType) {
      setInstitutionType(savedInstitutionType);
    }
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <div className="flex items-center gap-3">
          <MapIcon className="w-6 h-6 text-primary" />
          <CardTitle>
            {institutionType === 'BELEDIYE' ? "Belediye Bölgesi Haritası" : 
             institutionType === 'ELEKTRIK' ? "Elektrik Şebekesi Haritası" :
             institutionType === 'SU' ? "Su Şebekesi Haritası" :
             institutionType === 'DOGALGAZ' ? "Doğalgaz Şebekesi Haritası" : 
             institutionType === 'TURIZM' ? "Turizm Bölgeleri Haritası" :
             institutionType === 'BAKANLIK' ? "KKTC Genel Haritası" :
             "KKTC Haritası"}
          </CardTitle>
        </div>
        <CardDescription>
          {institutionType === 'BELEDIYE' ? "Belediye sınırları içindeki raporlar ve yoğunluk" : 
           institutionType === 'ELEKTRIK' ? "Elektrik şebekesi ve arızalar" :
           institutionType === 'SU' ? "Su şebekesi ve kesinti noktaları" :
           institutionType === 'DOGALGAZ' ? "Doğalgaz hatları ve basınç noktaları" : 
           institutionType === 'TURIZM' ? "Turistik bölgeler ve ziyaretçi yoğunluğu" :
           institutionType === 'BAKANLIK' ? "Tüm ada genelindeki turizm verileri" :
           "Bölge genelindeki raporlar, yoğunluk ve tahminler"}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="heatmap" onValueChange={handleTabChange} className="mb-4">
          <TabsList>
            <TabsTrigger value="heatmap">
              {institutionType === 'ELEKTRIK' ? "Elektrik Yoğunluğu" :
               institutionType === 'SU' ? "Su Kullanım Yoğunluğu" :
               institutionType === 'DOGALGAZ' ? "Gaz Tüketim Haritası" :
               "Yoğunluk Haritası"}
            </TabsTrigger>
            <TabsTrigger value="prediction">
              {institutionType === 'ELEKTRIK' ? "Elektrik Tahminleri" :
               institutionType === 'SU' ? "Su Tüketim Tahmini" :
               institutionType === 'DOGALGAZ' ? "Gaz Tahminleri" :
               "Yapay Zeka Öngörüleri"}
            </TabsTrigger>
            <TabsTrigger value="traffic">
              {institutionType === 'BELEDIYE' ? "Trafik Durumu" :
               institutionType === 'ELEKTRIK' ? "Şebeke Durumu" :
               institutionType === 'SU' ? "Su Basıncı" :
               institutionType === 'DOGALGAZ' ? "Hat Durumu" :
               "Trafik Durumu"}
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
