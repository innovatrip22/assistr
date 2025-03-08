
import { TrendingUp, AlertTriangle, UserRound, Car, Zap, Droplet, Flame, Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

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
  const [institutionType, setInstitutionType] = useState<string | null>(null);

  useEffect(() => {
    // Get the institution type from localStorage
    const savedInstitutionType = localStorage.getItem("testUserType");
    if (savedInstitutionType) {
      setInstitutionType(savedInstitutionType);
    }
  }, []);

  // Render institution-specific prediction cards
  if (institutionType === 'ELEKTRIK') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4 flex items-start gap-3">
          <Zap className="w-10 h-10 text-amber-500" />
          <div>
            <h3 className="font-medium">Yarınki Elektrik Tüketimi</h3>
            <p className="text-sm text-gray-600">
              Yüksek düzeyde tüketim bekleniyor. Öneri: Dağıtım noktalarını kontrol edin ve yedek sistemleri hazır bulundurun.
            </p>
            <Badge className="mt-2">Yüksek</Badge>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="w-10 h-10 text-red-500" />
          <div>
            <h3 className="font-medium">Arıza Riski</h3>
            <p className="text-sm text-gray-600">
              Kuzey bölgesinde trafo arızası riski var. Önerilen: Bakım ekiplerini hazır bulundurun ve yedek trafo
              kontrollerini yapın.
            </p>
            <Badge variant="outline" className="mt-2 border-red-500 text-red-500">
              Yüksek Risk
            </Badge>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 flex items-start gap-3">
          <TrendingUp className="w-10 h-10 text-indigo-500" />
          <div>
            <h3 className="font-medium">Aylık Tüketim Tahmini</h3>
            <p className="text-sm text-gray-600">
              Geçen aya göre %7 artış bekleniyor. Yazlık bölgelerde tüketim artacak.
              İlk 10 gün: 8.5 MWh
            </p>
            <Badge variant="secondary" className="mt-2">
              8.5 MWh
            </Badge>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 flex items-start gap-3">
          <Zap className="w-10 h-10 text-green-500" />
          <div>
            <h3 className="font-medium">Yenilenebilir Enerji Üretimi</h3>
            <p className="text-sm text-gray-600">
              Güneş enerjisi üretiminde artış bekleniyor. Toplam tüketimin %25'ini karşılayacak.
            </p>
            <Badge variant="success" className="mt-2">
              %25 Tasarruf
            </Badge>
          </div>
        </div>

        <Button className="mt-4 col-span-1 md:col-span-2" variant="outline">
          Detaylı Rapor İndir
        </Button>
      </div>
    );
  }
  
  if (institutionType === 'SU') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4 flex items-start gap-3">
          <Droplet className="w-10 h-10 text-blue-500" />
          <div>
            <h3 className="font-medium">Su Tüketim Tahmini</h3>
            <p className="text-sm text-gray-600">
              Önümüzdeki hafta için yüksek su tüketimi bekleniyor. Rezervuarların dolu tutulması önerilir.
            </p>
            <Badge className="mt-2">Yüksek</Badge>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="w-10 h-10 text-amber-500" />
          <div>
            <h3 className="font-medium">Boru Hattı Risk Değerlendirmesi</h3>
            <p className="text-sm text-gray-600">
              Merkez mahallesindeki eski boru hattında sızıntı riski mevcut. Acil bakım önerilir.
            </p>
            <Badge variant="outline" className="mt-2 border-amber-500 text-amber-500">
              Orta Risk
            </Badge>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 flex items-start gap-3">
          <TrendingUp className="w-10 h-10 text-indigo-500" />
          <div>
            <h3 className="font-medium">Aylık Su Kullanımı</h3>
            <p className="text-sm text-gray-600">
              Turizm sezonu nedeniyle önceki aya göre %15 artış bekleniyor. En çok kullanım sahil bölgesinde.
            </p>
            <Badge variant="secondary" className="mt-2">
              430,000 m³
            </Badge>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 flex items-start gap-3">
          <Droplet className="w-10 h-10 text-green-500" />
          <div>
            <h3 className="font-medium">Su Tasarruf Potansiyeli</h3>
            <p className="text-sm text-gray-600">
              Arıtma sisteminde yapılacak iyileştirmelerle %12 tasarruf sağlanabilir.
            </p>
            <Badge variant="success" className="mt-2">
              %12 Tasarruf
            </Badge>
          </div>
        </div>

        <Button className="mt-4 col-span-1 md:col-span-2" variant="outline">
          Detaylı Rapor İndir
        </Button>
      </div>
    );
  }
  
  if (institutionType === 'DOGALGAZ') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4 flex items-start gap-3">
          <Flame className="w-10 h-10 text-orange-500" />
          <div>
            <h3 className="font-medium">Gaz Tüketim Tahmini</h3>
            <p className="text-sm text-gray-600">
              Hava sıcaklıklarının düşmesiyle tüketimde %20 artış bekleniyor. Depoların tam kapasiteye çıkarılması önerilir.
            </p>
            <Badge className="mt-2">Yüksek</Badge>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="w-10 h-10 text-red-500" />
          <div>
            <h3 className="font-medium">Güvenlik Risk Analizi</h3>
            <p className="text-sm text-gray-600">
              Doğu bölgesindeki basınç regülatörlerinde kontrol gerekiyor. Düzenli denetim yapılması önerilir.
            </p>
            <Badge variant="outline" className="mt-2 border-red-500 text-red-500">
              Dikkat
            </Badge>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 flex items-start gap-3">
          <TrendingUp className="w-10 h-10 text-indigo-500" />
          <div>
            <h3 className="font-medium">Mevsimsel Tüketim Analizi</h3>
            <p className="text-sm text-gray-600">
              Kış aylarında tüketim %40 artıyor. En yüksek tüketim merkez ve kuzey bölgesinde.
            </p>
            <Badge variant="secondary" className="mt-2">
              120,000 m³
            </Badge>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 flex items-start gap-3">
          <Flame className="w-10 h-10 text-green-500" />
          <div>
            <h3 className="font-medium">Verimlilik Potansiyeli</h3>
            <p className="text-sm text-gray-600">
              Dağıtım sisteminde yapılacak iyileştirmelerle %8 tasarruf sağlanabilir.
            </p>
            <Badge variant="success" className="mt-2">
              %8 Tasarruf
            </Badge>
          </div>
        </div>

        <Button className="mt-4 col-span-1 md:col-span-2" variant="outline">
          Detaylı Rapor İndir
        </Button>
      </div>
    );
  }
  
  if (institutionType === 'BELEDIYE') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4 flex items-start gap-3">
          <Building className="w-10 h-10 text-primary" />
          <div>
            <h3 className="font-medium">Şehir Yoğunluğu</h3>
            <p className="text-sm text-gray-600">
              Merkez bölgesinde yoğunluk artışı bekleniyor. Belediye hizmetlerinin artırılması önerilir.
            </p>
            <Badge className="mt-2">Orta</Badge>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 flex items-start gap-3">
          <Car className="w-10 h-10 text-amber-500" />
          <div>
            <h3 className="font-medium">Trafik Durum Tahmini</h3>
            <p className="text-sm text-gray-600">
              Yarın şehir merkezinde yoğun trafik bekleniyor. Alternatif güzergahların açık tutulması önerilir.
            </p>
            <Badge variant="outline" className="mt-2 border-amber-500 text-amber-500">
              Yoğun
            </Badge>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 flex items-start gap-3">
          <UserRound className="w-10 h-10 text-indigo-500" />
          <div>
            <h3 className="font-medium">Turist Ziyaretçi Tahmini</h3>
            <p className="text-sm text-gray-600">
              Şehir merkezinde hafta sonu yüksek turist sayısı bekleniyor. Turistik alanlarda ek personel bulundurulması önerilir.
            </p>
            <Badge variant="secondary" className="mt-2">
              1,200+
            </Badge>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 flex items-start gap-3">
          <Building className="w-10 h-10 text-green-500" />
          <div>
            <h3 className="font-medium">Altyapı İyileştirme Planlaması</h3>
            <p className="text-sm text-gray-600">
              Doğu bölgesinde altyapı iyileştirme çalışmalarının hızlandırılması önerilir.
            </p>
            <Badge variant="success" className="mt-2">
              Öncelikli
            </Badge>
          </div>
        </div>

        <Button className="mt-4 col-span-1 md:col-span-2" variant="outline">
          Detaylı Rapor İndir
        </Button>
      </div>
    );
  }
  
  // Default view for other institution types or when institution type is not set
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
