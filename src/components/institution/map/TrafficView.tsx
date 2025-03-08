
import { useState, useEffect } from "react";
import { Car, Map, Zap, Droplet, Flame, Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Trafik veri yapısı
type TrafficData = {
  location: string;
  congestionLevel: "low" | "medium" | "high";
  reportCount: number;
  updatedAt: string;
};

type ElectricityData = {
  location: string;
  status: "normal" | "warning" | "critical";
  load: number;
  updatedAt: string;
};

type WaterData = {
  location: string;
  pressure: "normal" | "low" | "high";
  flow: number;
  updatedAt: string;
};

type GasData = {
  location: string;
  pressure: "normal" | "low" | "high";
  consumption: number;
  updatedAt: string;
};

const TrafficView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [trafficData, setTrafficData] = useState<TrafficData[]>([]);
  const [electricityData, setElectricityData] = useState<ElectricityData[]>([]);
  const [waterData, setWaterData] = useState<WaterData[]>([]);
  const [gasData, setGasData] = useState<GasData[]>([]);
  const [institutionType, setInstitutionType] = useState<string | null>(null);

  useEffect(() => {
    // Get the institution type from localStorage
    const savedInstitutionType = localStorage.getItem("testUserType");
    if (savedInstitutionType) {
      setInstitutionType(savedInstitutionType);
    }

    // Load the appropriate data based on institution type
    loadData(savedInstitutionType);
  }, []);

  const loadData = (institutionType: string | null) => {
    // Mock data for different institution types
    const mockTrafficData: TrafficData[] = [
      { location: "Girne - Merkez", congestionLevel: "high", reportCount: 12, updatedAt: new Date().toISOString() },
      { location: "Lefkoşa - Dereboyu", congestionLevel: "medium", reportCount: 8, updatedAt: new Date().toISOString() },
      { location: "Gazimağusa - Sahil", congestionLevel: "low", reportCount: 3, updatedAt: new Date().toISOString() },
      { location: "Girne - Limanı", congestionLevel: "high", reportCount: 15, updatedAt: new Date().toISOString() },
      { location: "Lefkoşa - Göçmenköy", congestionLevel: "medium", reportCount: 6, updatedAt: new Date().toISOString() },
    ];

    const mockElectricityData: ElectricityData[] = [
      { location: "Girne Trafo Merkezi", status: "normal", load: 75, updatedAt: new Date().toISOString() },
      { location: "Lefkoşa Ana Dağıtım", status: "warning", load: 92, updatedAt: new Date().toISOString() },
      { location: "Gazimağusa Üretim Tesisi", status: "normal", load: 60, updatedAt: new Date().toISOString() },
      { location: "Güzelyurt Trafo Merkezi", status: "critical", load: 98, updatedAt: new Date().toISOString() },
      { location: "İskele Dağıtım Hattı", status: "normal", load: 45, updatedAt: new Date().toISOString() },
    ];

    const mockWaterData: WaterData[] = [
      { location: "Girne Ana Depo", pressure: "normal", flow: 240, updatedAt: new Date().toISOString() },
      { location: "Lefkoşa Merkez İstasyonu", pressure: "high", flow: 450, updatedAt: new Date().toISOString() },
      { location: "Gazimağusa Arıtma Tesisi", pressure: "normal", flow: 380, updatedAt: new Date().toISOString() },
      { location: "Güzelyurt Baraj Hattı", pressure: "low", flow: 150, updatedAt: new Date().toISOString() },
      { location: "İskele Dağıtım Merkezi", pressure: "normal", flow: 210, updatedAt: new Date().toISOString() },
    ];

    const mockGasData: GasData[] = [
      { location: "Girne Dağıtım Hattı", pressure: "normal", consumption: 850, updatedAt: new Date().toISOString() },
      { location: "Lefkoşa Ana Vana", pressure: "high", consumption: 1240, updatedAt: new Date().toISOString() },
      { location: "Gazimağusa Terminal", pressure: "normal", consumption: 760, updatedAt: new Date().toISOString() },
      { location: "Güzelyurt Basınç İstasyonu", pressure: "low", consumption: 320, updatedAt: new Date().toISOString() },
      { location: "İskele Depolama Alanı", pressure: "normal", consumption: 480, updatedAt: new Date().toISOString() },
    ];

    setTrafficData(mockTrafficData);
    setElectricityData(mockElectricityData);
    setWaterData(mockWaterData);
    setGasData(mockGasData);
    
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const getStatusColor = (level: "normal" | "warning" | "critical" | "low" | "medium" | "high") => {
    switch (level) {
      case "normal":
      case "low": return "bg-green-100 text-green-700 border-green-300";
      case "warning":
      case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "critical":
      case "high": return "bg-red-100 text-red-700 border-red-300";
      default: return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusText = (level: string) => {
    switch (level) {
      case "normal": return "Normal";
      case "warning": return "Uyarı";
      case "critical": return "Kritik";
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
            {institutionType === 'ELEKTRIK' ? (
              <Zap className="w-16 h-16 mx-auto text-amber-400 mb-2" />
            ) : institutionType === 'SU' ? (
              <Droplet className="w-16 h-16 mx-auto text-blue-400 mb-2" />
            ) : institutionType === 'DOGALGAZ' ? (
              <Flame className="w-16 h-16 mx-auto text-orange-400 mb-2" />
            ) : institutionType === 'BELEDIYE' ? (
              <Building className="w-16 h-16 mx-auto text-gray-400 mb-2" />
            ) : (
              <Car className="w-16 h-16 mx-auto text-gray-400 mb-2" />
            )}
            <p className="text-gray-500">Veriler yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  // Render institution-specific view
  if (institutionType === 'ELEKTRIK') {
    return (
      <div className="h-[400px] rounded-lg overflow-auto relative border border-gray-200">
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">Şebeke Durum Raporu</h3>
            <span className="text-xs text-gray-500">Son güncelleme: {new Date().toLocaleTimeString()}</span>
          </div>
          
          <div className="space-y-3">
            {electricityData.map((item, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg border ${getStatusColor(item.status)} flex items-center justify-between`}
              >
                <div>
                  <h4 className="font-medium">{item.location}</h4>
                  <div className="flex items-center mt-1">
                    <Zap className="w-4 h-4 mr-1" />
                    <span className="text-sm">{item.load}% yük</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-medium">{getStatusText(item.status)}</span>
                  <p className="text-xs opacity-75">Durum</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-center">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                <span>Normal</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
                <span>Uyarı</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-1"></span>
                <span>Kritik</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (institutionType === 'SU') {
    return (
      <div className="h-[400px] rounded-lg overflow-auto relative border border-gray-200">
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">Su Şebekesi Basınç Durumu</h3>
            <span className="text-xs text-gray-500">Son güncelleme: {new Date().toLocaleTimeString()}</span>
          </div>
          
          <div className="space-y-3">
            {waterData.map((item, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg border ${getStatusColor(item.pressure)} flex items-center justify-between`}
              >
                <div>
                  <h4 className="font-medium">{item.location}</h4>
                  <div className="flex items-center mt-1">
                    <Droplet className="w-4 h-4 mr-1" />
                    <span className="text-sm">{item.flow} m³/saat</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-medium">{getStatusText(item.pressure)}</span>
                  <p className="text-xs opacity-75">Basınç</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-center">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                <span>Normal</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
                <span>Yüksek</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-1"></span>
                <span>Düşük</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (institutionType === 'DOGALGAZ') {
    return (
      <div className="h-[400px] rounded-lg overflow-auto relative border border-gray-200">
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">Doğalgaz Hat Durumu</h3>
            <span className="text-xs text-gray-500">Son güncelleme: {new Date().toLocaleTimeString()}</span>
          </div>
          
          <div className="space-y-3">
            {gasData.map((item, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg border ${getStatusColor(item.pressure)} flex items-center justify-between`}
              >
                <div>
                  <h4 className="font-medium">{item.location}</h4>
                  <div className="flex items-center mt-1">
                    <Flame className="w-4 h-4 mr-1" />
                    <span className="text-sm">{item.consumption} m³/gün</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-medium">{getStatusText(item.pressure)}</span>
                  <p className="text-xs opacity-75">Basınç</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-center">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                <span>Normal</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
                <span>Yüksek</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-1"></span>
                <span>Düşük</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Default traffic view for other institution types or when institution type is not set
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
              className={`p-3 rounded-lg border ${getStatusColor(item.congestionLevel)} flex items-center justify-between`}
            >
              <div>
                <h4 className="font-medium">{item.location}</h4>
                <div className="flex items-center mt-1">
                  <Car className="w-4 h-4 mr-1" />
                  <span className="text-sm">{item.reportCount} rapor</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-medium">{getStatusText(item.congestionLevel)}</span>
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
