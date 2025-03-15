
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Building, MapPin, Clock, Phone, ExternalLink, Search } from "lucide-react";

const buildings = [
  {
    id: "1",
    name: "Lefkoşa Belediyesi",
    type: "Belediye",
    address: "Selimiye Meydanı, Lefkoşa",
    openingHours: "08:30 - 17:00",
    phone: "+90 392 228 5400",
    distance: "1.2 km",
    website: "https://www.lefkosabelediyesi.org"
  },
  {
    id: "2",
    name: "Girne Kaymakamlığı",
    type: "Kaymakamlık",
    address: "Girne Merkez",
    openingHours: "08:30 - 16:30",
    phone: "+90 392 815 2148",
    distance: "2.5 km",
    website: "https://www.girne.gov.ct.tr"
  },
  {
    id: "3",
    name: "KKTC Merkez Bankası",
    type: "Banka",
    address: "Bedrettin Demirel Caddesi, Lefkoşa",
    openingHours: "08:30 - 16:30",
    phone: "+90 392 611 5000",
    distance: "0.8 km",
    website: "https://www.mb.gov.ct.tr"
  },
  {
    id: "4",
    name: "Turizm ve Çevre Bakanlığı",
    type: "Bakanlık",
    address: "Lefkoşa",
    openingHours: "08:30 - 16:30",
    phone: "+90 392 228 5441",
    distance: "1.5 km",
    website: "https://www.turizm.gov.ct.tr"
  },
  {
    id: "5",
    name: "Gazimağusa Belediyesi",
    type: "Belediye",
    address: "Gazimağusa Merkez",
    openingHours: "08:30 - 17:00",
    phone: "+90 392 366 2234",
    distance: "5.8 km",
    website: "https://www.magusa.org"
  }
];

const PublicBuildingsMap = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  
  const filteredBuildings = buildings.filter(building => {
    const matchesSearch = building.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         building.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || building.type.toLowerCase() === filter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Yakın Kamu Binaları</h2>
      </div>
      
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="bg-muted h-64 md:h-[400px] rounded-lg flex items-center justify-center relative">
              <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/33.3597,35.1736,12,0/800x400?access_token=pk.demo')] bg-center bg-cover opacity-80 rounded-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                <div className="text-center text-white p-4">
                  <Building className="h-8 w-8 mx-auto mb-2" />
                  <p className="max-w-xs">Bu demo'da gerçek harita gösterilmemektedir. Gerçek uygulamada burada tam çalışan bir harita olacaktır.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Arama ve Filtreleme</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex relative">
                  <Input
                    placeholder="Kamu binası ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-8"
                  />
                  <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
                
                <div>
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tüm Binalar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tüm Binalar</SelectItem>
                      <SelectItem value="belediye">Belediyeler</SelectItem>
                      <SelectItem value="bakanlık">Bakanlıklar</SelectItem>
                      <SelectItem value="kaymakamlık">Kaymakamlıklar</SelectItem>
                      <SelectItem value="banka">Bankalar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground mb-2">
                    Bulunan Kamu Binaları: {filteredBuildings.length}
                  </p>
                  <Button className="w-full" variant="outline">
                    Konumuma En Yakın
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Çalışma Saatleri Bilgisi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Pazartesi - Cuma</span>
                    <span className="font-medium">08:30 - 16:30</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Cumartesi</span>
                    <span className="font-medium">Kapalı</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Pazar</span>
                    <span className="font-medium">Kapalı</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 text-muted-foreground">
                    <span>Resmi tatillerde kapalıdır.</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Yakınımdaki Kamu Binaları</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBuildings.map((building) => (
              <Card key={building.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{building.name}</CardTitle>
                    <Badge variant="outline">
                      {building.distance}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm flex items-start">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <span>{building.address}</span>
                  </div>
                  <div className="text-sm flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{building.openingHours}</span>
                  </div>
                  <div className="text-sm flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{building.phone}</span>
                  </div>
                  <Button variant="outline" className="w-full mt-2" size="sm">
                    <ExternalLink className="h-3.5 w-3.5 mr-1" />
                    Web Sitesi
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicBuildingsMap;
