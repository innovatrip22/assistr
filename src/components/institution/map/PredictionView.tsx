
import { TrendingUp, AlertTriangle, UserRound, Car } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PredictionData {
  trafficLevel: string;
  touristCount: string;
  emergencyRisk: string;
  crowdPrediction: string;
}

interface PredictionViewProps {
  predictionData: PredictionData;
}

const PredictionView = ({ predictionData }: PredictionViewProps) => {
  return (
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
        <UserRound className="w-10 h-10 text-indigo-500" />
        <div>
          <h3 className="font-medium">Bölgedeki Tahmini Turist Sayısı</h3>
          <p className="text-sm text-gray-600">
            KKTC bölgesi genelinde bugün için tahmini turist sayısı.
            Değişim: Dünden %3 artış.
          </p>
          <Badge variant="secondary" className="mt-2">
            {predictionData.touristCount}
          </Badge>
        </div>
      </div>
      
      <div className="border rounded-lg p-4 flex items-start gap-3">
        <Car className="w-10 h-10 text-green-500" />
        <div>
          <h3 className="font-medium">Trafik Yoğunluğu Tahmini</h3>
          <p className="text-sm text-gray-600">
            Bölge içi ve turistik noktalarda trafik yoğunluğu tahminleri.
            Trafik akışının normal seyretmesi bekleniyor.
          </p>
          <Badge variant="outline" className="mt-2 border-green-500 text-green-500">
            {predictionData.trafficLevel}
          </Badge>
        </div>
      </div>

      <Button className="mt-4 col-span-1 md:col-span-2" variant="outline">
        Detaylı Rapor İndir
      </Button>
    </div>
  );
};

export default PredictionView;
