
import { useEffect, useRef, useState } from "react";
import { Map as MapIcon, AlertTriangle, TrendingUp, Traffic, Users } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getReports } from "@/services";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

// Mapbox token
mapboxgl.accessToken = "pk.eyJ1IjoiYW50YWx5YXR1cml6bSIsImEiOiJjbHMzdjNtMGIwYWNmMmtvNGVwZ3QzM29nIn0.KjYcUUiJVPbhbcAMKM66nA";

const MapSection = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [reports, setReports] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("heatmap");
  const [predictionData, setPredictionData] = useState({
    trafficLevel: "Normal",
    touristCount: "5,420",
    emergencyRisk: "Düşük",
    crowdPrediction: "Orta"
  });

  useEffect(() => {
    // Haritayı yükle
    if (mapContainer.current && !map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [30.7133, 36.8969], // Antalya koordinatları
        zoom: 12
      });

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
      
      // Harita yüklendiğinde
      map.current.on("load", () => {
        // Raporları çek ve haritaya ekle
        loadMapData();
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  const loadMapData = async () => {
    try {
      const reportData = await getReports();
      setReports(reportData);
      
      if (map.current && map.current.isStyleLoaded()) {
        // Burada haritaya veri ekleme işlemleri yapılabilir
        // Örnek ısı haritası için geçici veri
        addHeatmapLayer();
      }
    } catch (error) {
      console.error("Harita verisi yüklenirken hata:", error);
    }
  };

  const addHeatmapLayer = () => {
    if (!map.current || !map.current.isStyleLoaded()) return;

    // Örnek veri noktaları - gerçek uygulamada bu veriler API'den gelebilir
    const points = [
      [30.7133, 36.8969, 100], // Antalya merkez - yüksek yoğunluk
      [30.6890, 36.8850, 80],  // Başka bir nokta - orta yoğunluk
      [30.7350, 36.9100, 60],  // Başka bir nokta - düşük yoğunluk
      [30.7000, 36.9200, 90],  // Başka bir nokta - orta-yüksek yoğunluk
      [30.6500, 36.8800, 70]   // Başka bir nokta - orta yoğunluk
    ];

    // Kaynak ekleme
    const source = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: points.map(point => ({
          type: "Feature",
          properties: {
            intensity: point[2]
          },
          geometry: {
            type: "Point",
            coordinates: [point[0], point[1]]
          }
        }))
      }
    };

    // Eğer kaynak zaten varsa silip yeniden ekle
    if (map.current.getSource("heat-points")) {
      map.current.removeSource("heat-points");
    }
    
    if (map.current.getLayer("heatmap-layer")) {
      map.current.removeLayer("heatmap-layer");
    }

    // Kaynak ve katman ekle
    map.current.addSource("heat-points", source as any);
    map.current.addLayer({
      id: "heatmap-layer",
      type: "heatmap",
      source: "heat-points",
      paint: {
        "heatmap-weight": ["get", "intensity"],
        "heatmap-intensity": 0.8,
        "heatmap-color": [
          "interpolate",
          ["linear"],
          ["heatmap-density"],
          0, "rgba(0, 0, 255, 0)",
          0.2, "rgba(0, 255, 255, 0.6)",
          0.4, "rgba(0, 255, 0, 0.6)",
          0.6, "rgba(255, 255, 0, 0.6)",
          0.8, "rgba(255, 0, 0, 0.6)",
          1, "rgba(255, 0, 0, 0.8)"
        ],
        "heatmap-radius": 30,
        "heatmap-opacity": 0.8
      }
    });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <div className="flex items-center gap-3">
          <MapIcon className="w-6 h-6 text-primary" />
          <CardTitle>Antalya Haritası</CardTitle>
        </div>
        <CardDescription>
          Şehir genelindeki raporlar, yoğunluk ve tahminler
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
            <div className="h-[400px] rounded-lg overflow-hidden relative">
              <div ref={mapContainer} className="absolute inset-0" />
              
              <div className="absolute top-2 right-2 bg-white p-2 rounded-md shadow-md z-10">
                <div className="text-xs font-semibold mb-1">Yoğunluk Seviyesi</div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs">Düşük</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs">Orta-Düşük</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-xs">Orta</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-xs">Orta-Yüksek</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs">Yüksek</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="prediction" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 flex items-start gap-3">
                <TrendingUp className="w-10 h-10 text-primary" />
                <div>
                  <h3 className="font-medium">Yarınki Turist Yoğunluğu</h3>
                  <p className="text-sm text-gray-600">
                    Orta düzeyde yoğunluk bekleniyor. Öneri: 
                    Sahil bölgeleri, müzeler ve belirli turistik noktalarda personel sayısını artırın.
                  </p>
                  <Badge className="mt-2">{predictionData.crowdPrediction}</Badge>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 flex items-start gap-3">
                <AlertTriangle className="w-10 h-10 text-amber-500" />
                <div>
                  <h3 className="font-medium">Acil Durum Riski</h3>
                  <p className="text-sm text-gray-600">
                    Önümüzdeki 24 saat için düşük risk bekleniyor. Sahil güvenlik ve ilk yardım 
                    ekiplerinin normal seviyede tutulması önerilir.
                  </p>
                  <Badge variant="outline" className="mt-2 border-amber-500 text-amber-500">
                    {predictionData.emergencyRisk}
                  </Badge>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 flex items-start gap-3">
                <Users className="w-10 h-10 text-indigo-500" />
                <div>
                  <h3 className="font-medium">Bölgedeki Tahmini Turist Sayısı</h3>
                  <p className="text-sm text-gray-600">
                    Antalya merkez ve çevresinde bugün için tahmini turist sayısı.
                    Değişim: Dünden %5 artış.
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    {predictionData.touristCount}
                  </Badge>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 flex items-start gap-3">
                <Traffic className="w-10 h-10 text-green-500" />
                <div>
                  <h3 className="font-medium">Trafik Yoğunluğu Tahmini</h3>
                  <p className="text-sm text-gray-600">
                    Şehir içi ve turistik bölgelerde trafik yoğunluğu tahminleri.
                    Trafik akışının normal seyretmesi bekleniyor.
                  </p>
                  <Badge variant="outline" className="mt-2 border-green-500 text-green-500">
                    {predictionData.trafficLevel}
                  </Badge>
                </div>
              </div>
            </div>
            
            <Button className="mt-4" variant="outline">
              Detaylı Rapor İndir
            </Button>
          </TabsContent>
          
          <TabsContent value="traffic" className="mt-4">
            <div className="h-[400px] rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <Traffic className="w-16 h-16 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">Trafik verileri yükleniyor...</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MapSection;
