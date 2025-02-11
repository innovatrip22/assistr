
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map, AlertTriangle, FileText, Bell, ClipboardCheck, History } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PriceReport {
  id: string;
  business: string;
  product: string;
  price: number;
  normalPrice: number;
  location: string;
  date: string;
  status: "Pending" | "Investigated" | "Resolved";
}

interface BusinessIssue {
  id: string;
  name: string;
  location: string;
  issue: string;
  reportCount: number;
  lastReport: string;
}

interface Inspection {
  id: string;
  business: string;
  date: string;
  inspector: string;
  result: string;
  status: "Completed" | "Pending";
}

const Institution = () => {
  const [priceReports] = useState<PriceReport[]>([
    {
      id: "1",
      business: "Sahil Restaurant",
      product: "Çay",
      price: 50,
      normalPrice: 15,
      location: "Konyaaltı",
      date: "2024-03-15",
      status: "Pending",
    },
    {
      id: "2",
      business: "Marina Market",
      product: "Su (0.5L)",
      price: 30,
      normalPrice: 8,
      location: "Liman",
      date: "2024-03-14",
      status: "Investigated",
    },
  ]);

  const [problemBusinesses] = useState<BusinessIssue[]>([
    {
      id: "1",
      name: "Plaj Cafe",
      location: "Konyaaltı Sahili",
      issue: "Fahiş Fiyat, Hijyen Sorunu",
      reportCount: 5,
      lastReport: "2024-03-15",
    },
    {
      id: "2",
      name: "Tourist Shop",
      location: "Kaleiçi",
      issue: "Yanıltıcı Fiyatlandırma",
      reportCount: 3,
      lastReport: "2024-03-14",
    },
  ]);

  const [inspections] = useState<Inspection[]>([
    {
      id: "1",
      business: "Sahil Restaurant",
      date: "2024-03-16",
      inspector: "Mehmet Yılmaz",
      result: "Uyarı Verildi",
      status: "Completed",
    },
    {
      id: "2",
      business: "Marina Market",
      date: "2024-03-17",
      inspector: "Ayşe Demir",
      result: "İnceleniyor",
      status: "Pending",
    },
  ]);

  useEffect(() => {
    console.log("Institution dashboard mounted");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Kurum Paneli</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Map className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Nüfus Yoğunluğu Haritası</h2>
            </div>
            <div className="aspect-video bg-gray-100 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.openstreetmap.org/export/embed.html?bbox=30.6%2C36.8%2C30.8%2C36.9&layer=mapnik')] bg-cover">
                {/* Yoğunluk noktaları */}
                <div className="absolute top-1/3 left-1/2 w-16 h-16 bg-red-500/50 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute top-2/3 left-1/4 w-12 h-12 bg-yellow-500/50 rounded-full" />
                <div className="absolute top-1/4 right-1/3 w-20 h-20 bg-red-500/50 rounded-full" />
              </div>
              <div className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 bg-red-500/50 rounded-full"></span>
                  <span>Yüksek Yoğunluk</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 bg-yellow-500/50 rounded-full"></span>
                  <span>Orta Yoğunluk</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Fahiş Fiyat Uyarısı</h2>
            </div>
            <div className="space-y-4">
              {priceReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-accent p-4 rounded-lg space-y-2"
                >
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{report.business}</h3>
                    <span className="text-sm px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                      {report.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">Ürün/Hizmet</p>
                      <p>{report.product}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Fiyat Farkı</p>
                      <p className="text-red-600">
                        +{((report.price / report.normalPrice - 1) * 100).toFixed(0)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Konum</p>
                      <p>{report.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Tarih</p>
                      <p>{report.date}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Detayları Görüntüle
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Sorunlu İşletmeler Listesi</h2>
            </div>
            <div className="space-y-4">
              {problemBusinesses.map((business) => (
                <div
                  key={business.id}
                  className="bg-accent p-4 rounded-lg space-y-2"
                >
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{business.name}</h3>
                    <span className="text-sm px-2 py-1 rounded-full bg-red-100 text-red-800">
                      {business.reportCount} Şikayet
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="text-gray-500">Konum:</span> {business.location}
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-500">Sorun:</span>{" "}
                      <span className="text-red-600">{business.issue}</span>
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-500">Son Bildirim:</span>{" "}
                      {business.lastReport}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    İşletme Detayları
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Acil Bildirimler</h2>
            </div>
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-800">
                    Kaleiçi Bölgesinde Yoğun Şikayet
                  </h3>
                  <p className="text-sm text-red-600 mt-1">
                    Son 24 saatte 5 farklı işletme hakkında fahiş fiyat şikayeti alındı.
                    Acil denetim gerekiyor.
                  </p>
                  <Button variant="destructive" size="sm" className="mt-3">
                    Denetim Başlat
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <ClipboardCheck className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Denetim Talepleri</h2>
            </div>
            <div className="space-y-4">
              {inspections.filter(i => i.status === "Pending").map((inspection) => (
                <div
                  key={inspection.id}
                  className="bg-accent p-4 rounded-lg space-y-2"
                >
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{inspection.business}</h3>
                    <span className="text-sm px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                      {inspection.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">Denetmen</p>
                      <p>{inspection.inspector}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Tarih</p>
                      <p>{inspection.date}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Denetime Başla
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <History className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Geçmiş Denetimler</h2>
            </div>
            <div className="space-y-4">
              {inspections.filter(i => i.status === "Completed").map((inspection) => (
                <div
                  key={inspection.id}
                  className="bg-accent p-4 rounded-lg space-y-2"
                >
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{inspection.business}</h3>
                    <span className="text-sm px-2 py-1 rounded-full bg-green-100 text-green-800">
                      {inspection.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">Denetmen</p>
                      <p>{inspection.inspector}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Sonuç</p>
                      <p>{inspection.result}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Raporu Görüntüle
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Institution;
