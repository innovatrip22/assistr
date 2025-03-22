
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Store, 
  Users, 
  Calendar, 
  Star, 
  Clock, 
  MessageSquare, 
  Utensils, 
  Check, 
  X,
  Info,
  Edit,
  PlusCircle,
  Trash,
  ChevronUp,
  ChevronDown,
  BarChart3,
  FileText,
  Settings,
  Upload,
  Save,
  AlertCircle,
  Search
} from "lucide-react";
import { toast } from "sonner";

interface MenuItem {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  featured?: boolean;
  available?: boolean;
  ingredients?: string[];
  image?: string;
  allergens?: string[];
}

interface Reservation {
  id: string;
  name: string;
  date: string;
  time: string;
  people: number;
  status: string;
  notes: string;
  phoneNumber?: string;
  tableNumber?: number;
  confirmed?: boolean;
}

interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  comment: string;
  source?: string;
  reply?: string;
}

const RestaurantPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { 
      id: "1", 
      name: "Şeftali Kebabı", 
      price: "€15", 
      category: "Ana Yemek", 
      description: "Özel yaprak ve kuzu eti ile", 
      featured: true,
      available: true,
      ingredients: ["Kuzu eti", "Asma yaprağı", "Baharatlar", "Soğan"]
    },
    { 
      id: "2", 
      name: "Hellim Salatası", 
      price: "€10", 
      category: "Salata", 
      description: "Mevsim yeşillikleri ve hellim peyniri ile",
      available: true,
      ingredients: ["Hellim peyniri", "Domates", "Salatalık", "Zeytinyağı"]
    },
    { 
      id: "3", 
      name: "Kolakas", 
      price: "€12", 
      category: "Ana Yemek", 
      description: "Kıbrıs mutfağına özgü sebze yemeği",
      available: true,
      ingredients: ["Kolakas", "Domates", "Soğan", "Zeytinyağı", "Baharatlar"]
    },
    { 
      id: "4", 
      name: "Macun Tatlısı", 
      price: "€8", 
      category: "Tatlı", 
      description: "Geleneksel Kıbrıs tatlısı",
      available: true,
      ingredients: ["Un", "Şeker", "Yağ", "Baharatlar"]
    },
    { 
      id: "5", 
      name: "Patates Köftesi", 
      price: "€9", 
      category: "Başlangıç", 
      description: "Patates ve baharatlarla hazırlanan geleneksel köfte",
      available: true,
      ingredients: ["Patates", "Soğan", "Baharatlar", "Maydanoz"]
    },
    { 
      id: "6", 
      name: "Molehiya", 
      price: "€14", 
      category: "Ana Yemek", 
      description: "Özel otlu Kıbrıs yemeği",
      available: true,
      ingredients: ["Molehiya otu", "Tavuk eti", "Soğan", "Sarımsak", "Limon"]
    },
    { 
      id: "7", 
      name: "Gülsümün Kahvesi", 
      price: "€4", 
      category: "İçecek", 
      description: "Kıbrıs usulü özel kahve",
      available: true,
      ingredients: ["Kahve", "Su", "Şeker (isteğe bağlı)"]
    },
  ]);
  
  const [newMenuItem, setNewMenuItem] = useState<MenuItem>({ 
    id: "", 
    name: "", 
    price: "", 
    category: "Ana Yemek", 
    description: "", 
    available: true 
  });
  
  const [editingMenuItem, setEditingMenuItem] = useState<string | null>(null);
  const [menuItemDetails, setMenuItemDetails] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const reservations: Reservation[] = [
    { 
      id: "R001", 
      name: "Ahmet Yılmaz", 
      date: "2023-09-25", 
      time: "19:30", 
      people: 4, 
      status: "confirmed",
      notes: "Pencere kenarı olursa seviniriz.",
      phoneNumber: "+90 555 123 4567",
      tableNumber: 12
    },
    { 
      id: "R002", 
      name: "Mehmet Kaya", 
      date: "2023-09-26", 
      time: "20:00", 
      people: 2, 
      status: "pending",
      notes: "",
      phoneNumber: "+90 533 987 6543"
    },
    { 
      id: "R003", 
      name: "Ayşe Demir", 
      date: "2023-09-26", 
      time: "13:00", 
      people: 6, 
      status: "confirmed",
      notes: "Doğum günü kutlaması, pasta getireceğiz.",
      phoneNumber: "+90 542 345 6789",
      tableNumber: 8
    },
    { 
      id: "R004", 
      name: "İsmail Şahin", 
      date: "2023-09-27", 
      time: "19:00", 
      people: 3, 
      status: "confirmed",
      notes: "Gluten alerjisi var.",
      phoneNumber: "+90 532 765 4321",
      tableNumber: 5
    },
    { 
      id: "R005", 
      name: "John Smith", 
      date: "2023-09-27", 
      time: "20:30", 
      people: 2, 
      status: "pending",
      notes: "İngilizce konuşuyor, vejetaryen menü istiyor.",
      phoneNumber: "+44 7700 900123"
    }
  ];

  const reviews: Review[] = [
    { 
      id: "REV001", 
      name: "Ali Şahin", 
      date: "2023-09-10", 
      rating: 5, 
      comment: "Mükemmel yemekler ve harika servis. Kesinlikle tekrar geleceğim.",
      source: "Google"
    },
    { 
      id: "REV002", 
      name: "Zeynep Yıldız", 
      date: "2023-09-08", 
      rating: 4, 
      comment: "Yemekler lezzetliydi fakat servis biraz yavaştı.",
      source: "Tripadvisor",
      reply: "Değerli yorumunuz için teşekkür ederiz. Servis hızımızı iyileştirmek için çalışıyoruz."
    },
    { 
      id: "REV003", 
      name: "Burak Çelik", 
      date: "2023-09-05", 
      rating: 5, 
      comment: "KKTC'de gittiğim en iyi restoranlardan biri. Hellim salatası bir harika!",
      source: "AssisTR"
    },
    { 
      id: "REV004", 
      name: "Sophie Wilson", 
      date: "2023-09-03", 
      rating: 3, 
      comment: "Food was delicious but the restaurant was too noisy and crowded.",
      source: "Google" 
    },
    { 
      id: "REV005", 
      name: "Murat Demir", 
      date: "2023-09-01", 
      rating: 5, 
      comment: "Şeftali kebabı için bile tekrar geleceğim, çok lezzetliydi. Personel çok ilgiliydi.",
      source: "AssisTR" 
    }
  ];

  const chartData = {
    weekly: [
      { day: "Pzt", customers: 24, revenue: 720 },
      { day: "Sal", customers: 18, revenue: 540 },
      { day: "Çar", customers: 30, revenue: 900 },
      { day: "Per", customers: 35, revenue: 1050 },
      { day: "Cum", customers: 42, revenue: 1260 },
      { day: "Cmt", customers: 58, revenue: 1740 },
      { day: "Paz", customers: 50, revenue: 1500 }
    ],
    mostOrdered: [
      { name: "Şeftali Kebabı", count: 48 },
      { name: "Hellim Salatası", count: 36 },
      { name: "Kolakas", count: 24 },
      { name: "Molehiya", count: 22 },
      { name: "Macun Tatlısı", count: 18 }
    ]
  };

  const performanceMetrics = {
    avgOrderValue: "€30",
    tablesPerDay: 25,
    repeatCustomers: "38%",
    reservationRate: "65%"
  };

  const updateReservationStatus = (id: string, newStatus: string) => {
    toast.success(`${id} numaralı rezervasyon ${newStatus === 'confirmed' ? 'onaylandı' : 'reddedildi'}`);
  };

  const addMenuItem = () => {
    if (!newMenuItem.name || !newMenuItem.price) {
      toast.error("Lütfen en azından isim ve fiyat girin");
      return;
    }

    setMenuItems([
      ...menuItems,
      {
        ...newMenuItem,
        id: `${menuItems.length + 1}`,
        available: true
      }
    ]);
    
    setNewMenuItem({ 
      id: "", 
      name: "", 
      price: "", 
      category: "Ana Yemek", 
      description: "", 
      available: true 
    });
    toast.success("Menü öğesi başarıyla eklendi");
  };

  const startEditMenuItem = (id: string) => {
    setEditingMenuItem(id);
  };

  const toggleMenuItemDetails = (id: string) => {
    if (menuItemDetails === id) {
      setMenuItemDetails(null);
    } else {
      setMenuItemDetails(id);
    }
  };

  const removeMenuItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
    toast.success("Menü öğesi silindi");
  };

  const toggleMenuItemAvailability = (id: string) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? {...item, available: !item.available} : item
    ));
    const item = menuItems.find(item => item.id === id);
    toast.success(`${item?.name} ${!item?.available ? 'mevcut' : 'mevcut değil'} olarak işaretlendi`);
  };

  const toggleMenuItemFeatured = (id: string) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? {...item, featured: !item.featured} : item
    ));
    const item = menuItems.find(item => item.id === id);
    toast.success(`${item?.name} ${!item?.featured ? 'öne çıkarıldı' : 'öne çıkarma kaldırıldı'}`);
  };

  const replyToReview = (id: string, reply: string) => {
    toast.success("Yoruma yanıt gönderildi");
  };

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`} />
        ))}
      </div>
    );
  };

  const filteredMenuItems = menuItems.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchLower) ||
      item.category.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center">
            <Utensils className="mr-2 h-6 w-6" />
            Restoran Yönetim Paneli
          </h2>
          <p className="text-muted-foreground">
            Restoranınızın rezervasyonlarını, menüsünü ve değerlendirmelerini yönetin.
          </p>
        </div>

        <Button onClick={() => setActiveTab("settings")} variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Restoran Ayarları
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 w-full flex overflow-x-auto">
          <TabsTrigger value="dashboard" className="flex items-center">
            <BarChart3 className="mr-2 h-4 w-4" />
            Genel Durum
          </TabsTrigger>
          <TabsTrigger value="reservations" className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            Rezervasyonlar
          </TabsTrigger>
          <TabsTrigger value="menu" className="flex items-center">
            <Utensils className="mr-2 h-4 w-4" />
            Menü Yönetimi
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center">
            <MessageSquare className="mr-2 h-4 w-4" />
            Değerlendirmeler
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Raporlar
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            Ayarlar
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  Bugünkü Müşteriler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">
                  Dün: 38 (+10.5%)
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  Bugünkü Rezervasyonlar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  Toplam 26 kişi
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Star className="mr-2 h-4 w-4 text-muted-foreground" />
                  Ortalama Puanınız
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.6</div>
                <div className="flex">
                  {renderRating(4.6)}
                  <span className="text-xs text-muted-foreground ml-2">(86 değerlendirme)</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                  Günlük Ciro
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€1,260</div>
                <p className="text-xs text-muted-foreground">
                  Geçen hafta aynı gün: €1,140 (+10.5%)
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Haftalık Performans</CardTitle>
                <CardDescription>Son 7 günün müşteri ve ciro verileri</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full">
                    <div className="flex h-[250px] items-end justify-between">
                      {chartData.weekly.map((day, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div className="flex flex-col items-center space-y-1">
                            <div
                              className="w-12 bg-primary rounded-t"
                              style={{ height: `${(day.customers / 60) * 200}px` }}
                            ></div>
                            <span className="text-xs font-medium">{day.day}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">En Çok Sipariş Edilenler</CardTitle>
                <CardDescription>Bu hafta en popüler menü öğeleri</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {chartData.mostOrdered.map((item, i) => (
                    <li key={i} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary/10 mr-3 flex items-center justify-center">
                          <span className="font-semibold text-sm text-primary">{i + 1}</span>
                        </div>
                        <span>{item.name}</span>
                      </div>
                      <Badge variant="secondary">{item.count} sipariş</Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Ortalama Sipariş Değeri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceMetrics.avgOrderValue}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Günlük Masa Dönüşü</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceMetrics.tablesPerDay}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Düzenli Müşteri Oranı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceMetrics.repeatCustomers}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Rezervasyon Doluluk Oranı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceMetrics.reservationRate}</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reservations" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Rezervasyon Yönetimi</CardTitle>
              <CardDescription>
                Restoranınıza gelen rezervasyonları görüntüleyin ve yönetin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div className="space-x-2">
                  <Badge>Bugün: 3</Badge>
                  <Badge variant="outline">Yarın: 5</Badge>
                  <Badge variant="outline">Bu hafta: 12</Badge>
                </div>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Yeni Rezervasyon
                </Button>
              </div>
              
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {reservations.map((reservation) => (
                    <Card key={reservation.id} className={reservation.status === "pending" ? "border-amber-300" : ""}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">{reservation.name}</CardTitle>
                            <CardDescription>
                              Rezervasyon Kodu: {reservation.id}
                            </CardDescription>
                          </div>
                          <Badge className={reservation.status === "confirmed" ? "bg-green-500" : "bg-amber-500"}>
                            {reservation.status === "confirmed" ? "Onaylandı" : "Beklemede"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="py-2">
                        <div className="grid grid-cols-5 gap-2 text-sm mb-3">
                          <div>
                            <span className="text-muted-foreground block">Tarih</span>
                            <span>{new Date(reservation.date).toLocaleDateString('tr-TR')}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block">Saat</span>
                            <span>{reservation.time}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block">Kişi</span>
                            <span>{reservation.people}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block">Telefon</span>
                            <span>{reservation.phoneNumber}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block">Masa No</span>
                            <span>{reservation.tableNumber || "Atanmadı"}</span>
                          </div>
                        </div>
                        {reservation.notes && (
                          <div className="p-2 bg-muted rounded-md text-sm">
                            <span className="font-medium">Not:</span> {reservation.notes}
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="flex justify-end gap-2">
                        {reservation.status === "pending" && (
                          <>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => updateReservationStatus(reservation.id, 'rejected')}
                            >
                              <X className="mr-1 h-4 w-4" />
                              Reddet
                            </Button>
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                            >
                              <Check className="mr-1 h-4 w-4" />
                              Onayla
                            </Button>
                          </>
                        )}
                        {reservation.status === "confirmed" && (
                          <>
                            <Button variant="outline" size="sm">
                              <Edit className="mr-1 h-4 w-4" />
                              Düzenle
                            </Button>
                            <Button variant="outline" size="sm">
                              <Info className="mr-1 h-4 w-4" />
                              Detaylar
                            </Button>
                          </>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="menu" className="mt-0">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Menü Yönetimi</CardTitle>
                  <CardDescription>
                    Restoranınızın menüsünü düzenleyin ve güncelleyin.
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="search" 
                      placeholder="Menüde ara..." 
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 mr-2"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    Dışa Aktar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Mevcut Menü Öğeleri</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 mr-2"
                        >
                          <rect x="3" y="3" width="7" height="7"></rect>
                          <rect x="14" y="3" width="7" height="7"></rect>
                          <rect x="14" y="14" width="7" height="7"></rect>
                          <rect x="3" y="14" width="7" height="7"></rect>
                        </svg>
                        Kategorilere Göre
                      </Button>
                      <Button variant="outline" size="sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 mr-2"
                        >
                          <line x1="4" y1="9" x2="20" y2="9"></line>
                          <line x1="4" y1="15" x2="20" y2="15"></line>
                          <line x1="10" y1="3" x2="8" y2="21"></line>
                          <line x1="16" y1="3" x2="14" y2="21"></line>
                        </svg>
                        Liste Görünümü
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {filteredMenuItems.map((item) => (
                      <Card key={item.id} className={`border ${!item.available ? 'border-red-300 bg-red-50' : item.featured ? 'border-amber-300' : ''}`}>
                        <CardContent className="p-4 flex justify-between items-start">
                          <div className="flex-grow">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{item.name}</h4>
                              {item.featured && (
                                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Öne Çıkan</Badge>
                              )}
                              {!item.available && (
                                <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Mevcut Değil</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{item.category}</Badge>
                              <span className="font-semibold">{item.price}</span>
                            </div>
                            
                            {menuItemDetails === item.id && item.ingredients && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                className="mt-4 bg-muted rounded-md p-3"
                              >
                                <h5 className="font-medium text-sm mb-2">İçindekiler</h5>
                                <div className="flex flex-wrap gap-1">
                                  {item.ingredients.map((ingredient, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {ingredient}
                                    </Badge>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </div>
                          <div className="flex flex-col gap-2 ml-4">
                            <Button variant="ghost" size="icon" onClick={() => toggleMenuItemDetails(item.id)}>
                              {menuItemDetails === item.id ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => toggleMenuItemAvailability(item.id)}>
                              {item.available ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4 text-green-500"
                                >
                                  <path d="M9 12l2 2 4-4"></path>
                                  <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"></path>
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4 text-red-500"
                                >
                                  <circle cx="12" cy="12" r="9"></circle>
                                  <path d="m15 9-6 6"></path>
                                  <path d="m9 9 6 6"></path>
                                </svg>
                              )}
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => toggleMenuItemFeatured(item.id)}>
                              <Star className={`h-4 w-4 ${item.featured ? "fill-yellow-500 text-yellow-500" : ""}`} />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => startEditMenuItem(item.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => removeMenuItem(item.id)}>
                              <Trash className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Yeni Menü Öğesi Ekle</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Yemek Adı</Label>
                      <Input 
                        id="name"
                        value={newMenuItem.name}
                        onChange={(e) => setNewMenuItem({...newMenuItem, name: e.target.value})}
                        placeholder="Örn: Şeftali Kebabı"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Fiyat</Label>
                      <Input 
                        id="price"
                        value={newMenuItem.price}
                        onChange={(e) => setNewMenuItem({...newMenuItem, price: e.target.value})}
                        placeholder="Örn: €15"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Kategori</Label>
                      <select 
                        id="category"
                        value={newMenuItem.category}
                        onChange={(e) => setNewMenuItem({...newMenuItem, category: e.target.value})}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      >
                        <option value="Ana Yemek">Ana Yemek</option>
                        <option value="Başlangıç">Başlangıç</option>
                        <option value="Salata">Salata</option>
                        <option value="Tatlı">Tatlı</option>
                        <option value="İçecek">İçecek</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Açıklama</Label>
                      <Input 
                        id="description"
                        value={newMenuItem.description}
                        onChange={(e) => setNewMenuItem({...newMenuItem, description: e.target.value})}
                        placeholder="Kısa bir açıklama"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ingredients">İçindekiler (virgülle ayırın)</Label>
                      <Input 
                        id="ingredients"
                        onChange={(e) => setNewMenuItem({
                          ...newMenuItem, 
                          ingredients: e.target.value.split(',').map(i => i.trim())
                        })}
                        placeholder="Örn: Un, şeker, yağ"
                      />
                    </div>
                    <div className="flex items-center space-x-2 mt-8">
                      <input
                        type="checkbox"
                        id="featured"
                        className="h-4 w-4"
                        checked={newMenuItem.featured || false}
                        onChange={(e) => setNewMenuItem({...newMenuItem, featured: e.target.checked})}
                      />
                      <label htmlFor="featured" className="text-sm font-medium">
                        Öne çıkan ürün olarak işaretle
                      </label>
                    </div>
                  </div>
                  <Button onClick={addMenuItem} className="mt-4">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Menüye Ekle
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-0">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Müşteri Değerlendirmeleri</CardTitle>
                  <CardDescription>
                    Restoranınıza yapılan yorumları görüntüleyin ve yönetin.
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 mr-2"
                    >
                      <path d="M3 3v18h18"></path>
                      <path d="m19 9-5 5-4-4-3 3"></path>
                    </svg>
                    Analiz
                  </Button>
                  <Button variant="outline">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 mr-2"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    Dışa Aktar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg flex-grow text-center">
                  <div className="text-3xl font-bold text-amber-500">4.6</div>
                  <div className="flex justify-center my-2">
                    {renderRating(4.6)}
                  </div>
                  <div className="text-sm text-muted-foreground">86 Değerlendirme</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg flex-grow">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="text-sm font-medium w-6">5★</span>
                      <div className="h-2 ml-2 flex-grow bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full" style={{width: "68%"}}></div>
                      </div>
                      <span className="text-sm ml-2 w-8">68%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium w-6">4★</span>
                      <div className="h-2 ml-2 flex-grow bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-green-400 h-full" style={{width: "24%"}}></div>
                      </div>
                      <span className="text-sm ml-2 w-8">24%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium w-6">3★</span>
                      <div className="h-2 ml-2 flex-grow bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-yellow-400 h-full" style={{width: "6%"}}></div>
                      </div>
                      <span className="text-sm ml-2 w-8">6%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium w-6">2★</span>
                      <div className="h-2 ml-2 flex-grow bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-orange-400 h-full" style={{width: "2%"}}></div>
                      </div>
                      <span className="text-sm ml-2 w-8">2%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium w-6">1★</span>
                      <div className="h-2 ml-2 flex-grow bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-red-500 h-full" style={{width: "0%"}}></div>
                      </div>
                      <span className="text-sm ml-2 w-8">0%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg flex-grow">
                  <h4 className="text-sm font-medium mb-2">Kaynak Dağılımı</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="text-sm w-24">Google</span>
                      <div className="h-2 ml-2 flex-grow bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full" style={{width: "45%"}}></div>
                      </div>
                      <span className="text-sm ml-2 w-8">45%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm w-24">Tripadvisor</span>
                      <div className="h-2 ml-2 flex-grow bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full" style={{width: "30%"}}></div>
                      </div>
                      <span className="text-sm ml-2 w-8">30%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm w-24">AssisTR</span>
                      <div className="h-2 ml-2 flex-grow bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-purple-500 h-full" style={{width: "25%"}}></div>
                      </div>
                      <span className="text-sm ml-2 w-8">25%</span>
                    </div>
                  </div>
                </div>
              </div>
            
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-2">
                            <CardTitle className="text-base">{review.name}</CardTitle>
                            {review.source && (
                              <Badge variant="outline" className="text-xs">
                                {review.source}
                              </Badge>
                            )}
                          </div>
                          <div className="flex">
                            {renderRating(review.rating)}
                          </div>
                        </div>
                        <CardDescription>
                          {new Date(review.date).toLocaleDateString('tr-TR')}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{review.comment}</p>
                        
                        {review.reply && (
                          <div className="mt-3 p-3 bg-muted rounded-md text-sm">
                            <div className="font-medium mb-1 flex items-center">
                              <Store className="h-3 w-3 mr-1" />
                              Yanıtınız:
                            </div>
                            <p>{review.reply}</p>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="flex justify-end gap-2">
                        {!review.reply && (
                          <Button variant="outline" size="sm" onClick={() => replyToReview(review.id, "")}>
                            <MessageSquare className="mr-1 h-4 w-4" />
                            Yanıtla
                          </Button>
                        )}
                        {review.reply && (
                          <Button variant="outline" size="sm">
                            <Edit className="mr-1 h-4 w-4" />
                            Yanıtı Düzenle
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <AlertCircle className="mr-1 h-4 w-4" />
                          Bildir
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Raporlar ve Analizler</CardTitle>
              <CardDescription>
                İş performansınızı analiz edin ve raporlar oluşturun.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Satış Raporları</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <ul className="space-y-2">
                      <li>
                        <Button variant="link" className="p-0 h-auto text-blue-600">Günlük Satış Raporu</Button>
                      </li>
                      <li>
                        <Button variant="link" className="p-0 h-auto text-blue-600">Haftalık Satış Özeti</Button>
                      </li>
                      <li>
                        <Button variant="link" className="p-0 h-auto text-blue-600">Aylık Gelir Analizi</Button>
                      </li>
                      <li>
                        <Button variant="link" className="p-0 h-auto text-blue-600">En Çok Satan Ürünler</Button>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Müşteri Analizleri</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <ul className="space-y-2">
                      <li>
                        <Button variant="link" className="p-0 h-auto text-blue-600">Müşteri Demografisi</Button>
                      </li>
                      <li>
                        <Button variant="link" className="p-0 h-auto text-blue-600">Müşteri Memnuniyeti</Button>
                      </li>
                      <li>
                        <Button variant="link" className="p-0 h-auto text-blue-600">Düzenli Müşteriler</Button>
                      </li>
                      <li>
                        <Button variant="link" className="p-0 h-auto text-blue-600">Yeni vs. Tekrar Gelen</Button>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Operasyonel Raporlar</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <ul className="space-y-2">
                      <li>
                        <Button variant="link" className="p-0 h-auto text-blue-600">Personel Performansı</Button>
                      </li>
                      <li>
                        <Button variant="link" className="p-0 h-auto text-blue-600">Masa Dönüş Süresi</Button>
                      </li>
                      <li>
                        <Button variant="link" className="p-0 h-auto text-blue-600">Stok Kullanım Raporu</Button>
                      </li>
                      <li>
                        <Button variant="link" className="p-0 h-auto text-blue-600">İş Saatleri Analizi</Button>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Özel Rapor Oluştur</CardTitle>
                  <CardDescription>
                    İhtiyacınıza göre özelleştirilmiş raporlar oluşturun.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="report-type">Rapor Tipi</Label>
                      <select 
                        id="report-type"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      >
                        <option value="sales">Satış Raporu</option>
                        <option value="customer">Müşteri Raporu</option>
                        <option value="inventory">Envanter Raporu</option>
                        <option value="employee">Personel Raporu</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Başlangıç Tarihi</Label>
                      <Input 
                        id="start-date"
                        type="date"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-date">Bitiş Tarihi</Label>
                      <Input 
                        id="end-date"
                        type="date"
                      />
                    </div>
                  </div>
                  <Button>
                    <FileText className="mr-2 h-4 w-4" />
                    Rapor Oluştur
                  </Button>
                </CardContent>
              </Card>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 mr-2"
                  >
                    <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z"></path>
                    <path d="M12 9h.01"></path>
                    <path d="M11 12h1v4h1"></path>
                  </svg>
                  AssisTR Yapay Zeka Önerileri
                </h4>
                <p className="text-sm mb-3">
                  Verilerinize göre, işletmenizin performansını artırmak için önerilen aksiyonlar:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 mr-2 mt-0.5 text-green-500"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    <span>Salı ve Çarşamba günleri, satışlarınızı artırmak için özel promosyonlar düşünebilirsiniz.</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 mr-2 mt-0.5 text-green-500"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    <span>"Kolakas" ve "Patates Köftesi" gibi yerel yemekler hakkında daha fazla bilgi paylaşmak rezervasyonları artırabilir.</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 mr-2 mt-0.5 text-green-500"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    <span>Müşteri yorumlarındaki "servis hızı" konusuna odaklanmak genel değerlendirme puanınızı artırabilir.</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Restoran Ayarları</CardTitle>
              <CardDescription>
                Restoranınızın genel ayarlarını ve bilgilerini yönetin.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Genel Bilgiler</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="restaurant-name">Restoran Adı</Label>
                    <Input 
                      id="restaurant-name"
                      defaultValue="Kıbrıs Lezzetleri Restoranı"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="restaurant-type">Restoran Tipi</Label>
                    <select 
                      id="restaurant-type"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      defaultValue="cypriot"
                    >
                      <option value="cypriot">Kıbrıs Mutfağı</option>
                      <option value="turkish">Türk Mutfağı</option>
                      <option value="mediterranean">Akdeniz Mutfağı</option>
                      <option value="international">Uluslararası</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="restaurant-address">Adres</Label>
                    <Input 
                      id="restaurant-address"
                      defaultValue="Girne Caddesi No: 123, Lefkoşa, KKTC"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="restaurant-phone">Telefon</Label>
                    <Input 
                      id="restaurant-phone"
                      defaultValue="+90 392 123 45 67"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="restaurant-email">E-posta</Label>
                    <Input 
                      id="restaurant-email"
                      defaultValue="info@kibrislezzetleri.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="restaurant-website">Web Sitesi</Label>
                    <Input 
                      id="restaurant-website"
                      defaultValue="www.kibrislezzetleri.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="restaurant-description">Restoran Açıklaması</Label>
                  <textarea 
                    id="restaurant-description"
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    defaultValue="Kıbrıs Lezzetleri Restoranı, Kuzey Kıbrıs'ın geleneksel lezzetlerini modern bir sunum ile müşterilerine sunmaktadır. Şeftali kebabından hellim salatalarına, kolakastan macun tatlısına kadar geniş bir yelpazede Kıbrıs mutfağının en seçkin örneklerini bulabilirsiniz."
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Çalışma Saatleri</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Pazartesi - Cuma</Label>
                    <div className="flex gap-2">
                      <Input defaultValue="11:00" type="time" className="w-1/2" />
                      <Input defaultValue="23:00" type="time" className="w-1/2" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Cumartesi - Pazar</Label>
                    <div className="flex gap-2">
                      <Input defaultValue="10:00" type="time" className="w-1/2" />
                      <Input defaultValue="00:00" type="time" className="w-1/2" />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="special-hours"
                    className="h-4 w-4"
                  />
                  <label htmlFor="special-hours" className="text-sm font-medium">
                    Özel günlerde farklı çalışma saatleri
                  </label>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Fotoğraflar ve Medya</h3>
                
                <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="space-y-3">
                    <div className="flex justify-center">
                      <Upload className="h-10 w-10 text-gray-400" />
                    </div>
                    <div>
                      <h4 className="text-base font-medium">Fotoğraf Yükle</h4>
                      <p className="text-sm text-muted-foreground">
                        Restoranınızın fotoğraflarını sürükleyin veya seçin
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Dosya Seç
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="relative group rounded-md overflow-hidden">
                    <img 
                      src="/placeholder.svg" 
                      alt="Restaurant" 
                      className="w-full h-32 object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button variant="ghost" size="icon" className="text-white">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-white">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="relative group rounded-md overflow-hidden">
                    <img 
                      src="/placeholder.svg" 
                      alt="Restaurant" 
                      className="w-full h-32 object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button variant="ghost" size="icon" className="text-white">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-white">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="relative group rounded-md overflow-hidden">
                    <img 
                      src="/placeholder.svg" 
                      alt="Restaurant" 
                      className="w-full h-32 object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button variant="ghost" size="icon" className="text-white">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-white">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="relative group rounded-md overflow-hidden">
                    <img 
                      src="/placeholder.svg" 
                      alt="Restaurant" 
                      className="w-full h-32 object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button variant="ghost" size="icon" className="text-white">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-white">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end gap-4">
                <Button variant="outline">İptal</Button>
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Değişiklikleri Kaydet
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RestaurantPanel;
