
import { useState, useEffect } from "react";
import { Car, Map } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Trafik veri yapısı
type TrafficData = {
  location: string;
  congestionLevel: "low" | "medium" | "high";
  reportCount: number;
  updatedAt: string;
};

const TrafficView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [trafficData, setTrafficData] = useState<TrafficData[]>([]);

  useEffect(() => {
    // Simüle edilmiş trafik verilerini yükle
    // Gerçek uygulamada bu verileri Supabase'den çekebilirsiniz
    const mockTrafficData: TrafficData[] = [
      { location: "Girne - Merkez", congestionLevel: "high", reportCount: 12, updatedAt: new Date().toISOString() },
      { location: "Lefkoşa - Dereboyu", congestionLevel: "medium", reportCount: 8, updatedAt: new Date().toISOString() },
      { location: "Gazimağusa - Sahil", congestionLevel: "low", reportCount: 3, updatedAt: new Date().toISOString() },
      { location: "Girne - Limanı", congestionLevel: "high", reportCount: 15, updatedAt: new Date().toISOString() },
      { location: "Lefkoşa - Göçmenköy", congestionLevel: "medium", reportCount: 6, updatedAt: new Date().toISOString() },
    ];

    // Gerçek bir API/Veritabanı çağrısını simüle ediyoruz
    setTimeout(() => {
      setTrafficData(mockTrafficData);
      setIsLoading(false);
    }, 1500);
  }, []);

  const getCongestionColor = (level: "low" | "medium" | "high") => {
    switch (level) {
      case "low": return "bg-green-100 text-green-700 border-green-300";
      case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "high": return "bg-red-100 text-red-700 border-red-300";
      default: return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getCongestionText = (level: "low" | "medium" | "high") => {
    switch (level) {
      case "low": return "Düşük";
      case "medium": return "Orta";
      case "high": return "Yüksek";
      default: return "Belirsiz";
    }
  };

  if (isLoading) {
    return (
      <div className="h-[400px] rounded-lg overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <Car className="w-16 h-16 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-500">Trafik verileri yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[400px] rounded-lg overflow-auto relative border border-gray-200">
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium">Güncel Trafik Durumu</h3>
          <span className="text-xs text-gray-500">Son güncelleme: {new Date().toLocaleTimeString()}</span>
        </div>
        
        <div className="space-y-3">
          {trafficData.map((item, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg border ${getCongestionColor(item.congestionLevel)} flex items-center justify-between`}
            >
              <div>
                <h4 className="font-medium">{item.location}</h4>
                <div className="flex items-center mt-1">
                  <Car className="w-4 h-4 mr-1" />
                  <span className="text-sm">{item.reportCount} rapor</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-medium">{getCongestionText(item.congestionLevel)}</span>
                <p className="text-xs opacity-75">Yoğunluk</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex justify-center">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
              <span>Düşük</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
              <span>Orta</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-1"></span>
              <span>Yüksek</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficView;
