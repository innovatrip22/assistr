
import { Map } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const MapSection = () => {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Map className="w-6 h-6 text-primary" />
          <CardTitle>Antalya Haritası</CardTitle>
        </div>
        <CardDescription>
          Şehir genelindeki raporlar ve bildirimler
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Harita Yükleniyor...</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapSection;
