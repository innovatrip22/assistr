
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Map, AlertTriangle, FileText, Bell, ClipboardCheck, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

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
  const [priceReports, setPriceReports] = useState<PriceReport[]>([
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

  const [problemBusinesses, setProblemBusinesses] = useState<BusinessIssue[]>([
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

  const [inspections, setInspections] = useState<Inspection[]>([
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

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedInspector, setSelectedInspector] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const inspectors = [
    "Mehmet Yılmaz",
    "Ayşe Demir",
    "Ali Kaya",
    "Fatma Öztürk",
    "Ahmet Şahin"
  ];

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [30.713324, 36.896893], // Antalya koordinatları
      zoom: 12
    });

    const densityPoints = [
      { lng: 30.713324, lat: 36.896893, intensity: 'high', location: 'Kaleiçi' },
      { lng: 30.663324, lat: 36.886893, intensity: 'medium', location: 'Konyaaltı' },
      { lng: 30.733324, lat: 36.876893, intensity: 'high', location: 'Lara' },
    ];

    densityPoints.forEach(point => {
      const el = document.createElement('div');
      el.className = `w-16 h-16 rounded-full ${
        point.intensity === 'high' ? 'bg-red-500/50' : 'bg-yellow-500/50'
      }`;

      new mapboxgl.Marker({ element: el })
        .setLngLat([point.lng, point.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h3 class="font-bold">${point.location}</h3><p>Yoğunluk: ${
              point.intensity === 'high' ? 'Yüksek' : 'Orta'
            }</p>`)
        )
        .addTo(map.current);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  const handleStartInspection = (business: string, source?: "problem" | "emergency" | "pending") => {
    if (!selectedInspector) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Lütfen bir denetmen seçin",
      });
      return;
    }

    // Önce mevcut denetimi tamamlandı olarak işaretle
    setInspections(currentInspections => 
      currentInspections.map(inspection => 
        inspection.business === business && inspection.status === "Pending"
          ? { ...inspection, status: "Completed", result: "Tamamlandı" }
          : inspection
      )
    );

    // Yeni denetim oluştur
    const newInspection: Inspection = {
      id: Math.random().toString(),
      business,
      date: new Date().toISOString().split('T')[0],
      inspector: selectedInspector,
      result: "İnceleniyor",
      status: "Pending"
    };

    // Eğer sorunlu işletmeler listesinden geliyorsa, listeden kaldır
    if (source === "problem") {
      setProblemBusinesses(currentBusinesses => 
        currentBusinesses.filter(b => b.name !== business)
      );
    }

    // Yeni denetimi ekle
    setInspections(prev => [...prev, newInspection]);

    // Denetmen seçimini sıfırla
    setSelectedInspector("");
    
    // Dialog'u kapat
    setDialogOpen(false);
    
    // Bildirim göster
    toast({
      title: "Denetim Başlatıldı",
      description: `${business} için denetim ${selectedInspector}'a atandı.`,
    });
  };

  const handleResolveReport = (reportId: string) => {
    setPriceReports(current =>
      current.map(report =>
        report.id === reportId
          ? { ...report, status: "Resolved" }
          : report
      )
    );

    toast({
      title: "Şikayet Çözüldü",
      description: "Fahiş fiyat şikayeti başarıyla çözüldü.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Kurum Paneli</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Harita Bileşeni */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Map className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Nüfus Yoğunluğu Haritası</h2>
            </div>
            <div className="aspect-video bg-gray-100 rounded-lg relative overflow-hidden">
              <div ref={mapContainer} className="absolute inset-0" />
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

          {/* Fahiş Fiyat Uyarıları */}
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
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      report.status === "Pending" 
                        ? "bg-yellow-100 text-yellow-800"
                        : report.status === "Resolved"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}>
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
                  {report.status === "Pending" && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleResolveReport(report.id)}
                    >
                      Çözüldü Olarak İşaretle
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sorunlu İşletmeler */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Sorunlu İşletmeler Listesi</h2>
            </div>
            <div className="space-y-4">
              {problemBusinesses.map((business) => (
                <Dialog 
                  key={business.id}
                  open={dialogOpen}
                  onOpenChange={setDialogOpen}
                >
                  <div className="bg-accent p-4 rounded-lg space-y-2">
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
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full">
                        Denetim Başlat
                      </Button>
                    </DialogTrigger>
                  </div>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{business.name} - Denetmen Ata</DialogTitle>
                      <DialogDescription>
                        <div className="space-y-4 mt-4">
                          <div>
                            <label className="text-sm font-medium">
                              Denetmen Seçin
                            </label>
                            <Select
                              value={selectedInspector}
                              onValueChange={setSelectedInspector}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Denetmen seçin" />
                              </SelectTrigger>
                              <SelectContent>
                                {inspectors.map((inspector) => (
                                  <SelectItem key={inspector} value={inspector}>
                                    {inspector}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <Button 
                            className="w-full"
                            onClick={() => handleStartInspection(business.name, "problem")}
                          >
                            Denetimi Başlat
                          </Button>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              ))}
              {problemBusinesses.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Sorunlu işletme bulunmamaktadır.
                </div>
              )}
            </div>
          </div>

          {/* Acil Bildirimler */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Acil Bildirimler</h2>
            </div>
            <Dialog>
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
                    <DialogTrigger asChild>
                      <Button variant="destructive" size="sm" className="mt-3">
                        Denetim Başlat
                      </Button>
                    </DialogTrigger>
                  </div>
                </div>
              </div>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Kaleiçi Bölgesi - Denetmen Ata</DialogTitle>
                  <DialogDescription>
                    <div className="space-y-4 mt-4">
                      <div>
                        <label className="text-sm font-medium">
                          Denetmen Seçin
                        </label>
                        <Select
                          value={selectedInspector}
                          onValueChange={setSelectedInspector}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Denetmen seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            {inspectors.map((inspector) => (
                              <SelectItem key={inspector} value={inspector}>
                                {inspector}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button 
                        className="w-full"
                        onClick={() => handleStartInspection("Kaleiçi Bölgesi", "emergency")}
                      >
                        Denetimi Başlat
                      </Button>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>

          {/* Bekleyen Denetimler */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <ClipboardCheck className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Denetim Talepleri</h2>
            </div>
            <div className="space-y-4">
              {inspections.filter(i => i.status === "Pending").map((inspection) => (
                <Dialog 
                  key={inspection.id}
                  open={dialogOpen}
                  onOpenChange={setDialogOpen}
                >
                  <div className="bg-accent p-4 rounded-lg space-y-2">
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
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full">
                        Denetimi Tamamla
                      </Button>
                    </DialogTrigger>
                  </div>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Denetimi Tamamla</DialogTitle>
                      <DialogDescription>
                        <div className="space-y-4 mt-4">
                          <div>
                            <label className="text-sm font-medium">
                              Denetim Sonucu
                            </label>
                            <Select
                              value={selectedInspector}
                              onValueChange={setSelectedInspector}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Sonuç seçin" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Uyarı Verildi">Uyarı Verildi</SelectItem>
                                <SelectItem value="Ceza Kesildi">Ceza Kesildi</SelectItem>
                                <SelectItem value="Kapatma Cezası">Kapatma Cezası</SelectItem>
                                <SelectItem value="Sorun Bulunamadı">Sorun Bulunamadı</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button 
                            className="w-full"
                            onClick={() => handleStartInspection(inspection.business, "pending")}
                          >
                            Denetimi Tamamla
                          </Button>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              ))}
              {inspections.filter(i => i.status === "Pending").length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Bekleyen denetim bulunmamaktadır.
                </div>
              )}
            </div>
          </div>

          {/* Geçmiş Denetimler */}
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
                      <p className="text-gray-500">Tarih</p>
                      <p>{inspection.date}</p>
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
              {inspections.filter(i => i.status === "Completed").length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Tamamlanmış denetim bulunmamaktadır.
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Institution;
