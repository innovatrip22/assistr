
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
  Hotel, 
  Users, 
  Calendar, 
  Star, 
  Clock, 
  MessageSquare, 
  Bed, 
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
  Search,
  BellRing,
  Key,
  User,
  Percent,
  CreditCard,
  Coffee,
  ShowerHead
} from "lucide-react";
import { toast } from "sonner";

interface RoomType {
  id: string;
  name: string;
  price: string;
  capacity: number;
  description: string;
  amenities: string[];
  available: number;
  image?: string;
}

interface Booking {
  id: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  status: string;
  price: string;
  paymentStatus: string;
  notes: string;
  phone?: string;
  email?: string;
}

interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  comment: string;
  source?: string;
  reply?: string;
  country?: string;
}

const HotelPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  
  const roomTypes: RoomType[] = [
    {
      id: "1",
      name: "Standart Oda",
      price: "€120",
      capacity: 2,
      description: "Konforlu ve ferah standart oda, bir çift kişilik yatak içerir.",
      amenities: ["Klima", "Mini Bar", "Ücretsiz Wi-Fi", "LCD TV", "Kasa"],
      available: 8
    },
    {
      id: "2",
      name: "Deluxe Oda",
      price: "€180",
      capacity: 2,
      description: "Deniz manzaralı geniş deluxe oda, lüks banyo ve oturma alanı ile.",
      amenities: ["Klima", "Mini Bar", "Ücretsiz Wi-Fi", "LCD TV", "Kasa", "Deniz Manzarası", "Balkon"],
      available: 5
    },
    {
      id: "3",
      name: "Aile Odası",
      price: "€250",
      capacity: 4,
      description: "İki yatak odalı geniş aile süiti, oturma alanı ve tam donanımlı mutfak ile.",
      amenities: ["Klima", "Mini Bar", "Ücretsiz Wi-Fi", "LCD TV", "Kasa", "Mutfak", "Oturma Alanı", "Çamaşır Makinesi"],
      available: 3
    },
    {
      id: "4",
      name: "Executive Süit",
      price: "€320",
      capacity: 2,
      description: "Lüks executive süit, özel jakuzi ve panoramik deniz manzarası sunar.",
      amenities: ["Klima", "Mini Bar", "Ücretsiz Wi-Fi", "LCD TV", "Kasa", "Jakuzi", "Deniz Manzarası", "Balkon", "Özel Şef Hizmeti"],
      available: 2
    },
    {
      id: "5",
      name: "Başkanlık Süiti",
      price: "€500",
      capacity: 4,
      description: "En üst katta konumlanmış ultra lüks başkanlık süiti, özel teras ve havuz ile.",
      amenities: ["Klima", "Mini Bar", "Ücretsiz Wi-Fi", "LCD TV", "Kasa", "Jakuzi", "Özel Havuz", "Deniz Manzarası", "Teras", "Özel Butler"],
      available: 1
    }
  ];

  const bookings: Booking[] = [
    {
      id: "B001",
      guestName: "Ali Yılmaz",
      checkIn: "2023-09-25",
      checkOut: "2023-09-30",
      guests: 2,
      roomType: "Deluxe Oda",
      status: "confirmed",
      price: "€900",
      paymentStatus: "paid",
      notes: "Oda servisi istiyor, erken check-in talep ediyor.",
      phone: "+90 532 123 4567",
      email: "ali.yilmaz@example.com"
    },
    {
      id: "B002",
      guestName: "Sarah Johnson",
      checkIn: "2023-09-26",
      checkOut: "2023-10-03",
      guests: 1,
      roomType: "Standart Oda",
      status: "confirmed",
      price: "€840",
      paymentStatus: "partial",
      notes: "İngilizce konuşuyor, havaalanı transferi ayarlanacak.",
      phone: "+44 7700 900123",
      email: "sarah.j@example.com"
    },
    {
      id: "B003",
      guestName: "Mehmet ve Ayşe Demir",
      checkIn: "2023-09-28",
      checkOut: "2023-10-05",
      guests: 4,
      roomType: "Aile Odası",
      status: "pending",
      price: "€1750",
      paymentStatus: "pending",
      notes: "2 çocuk (5 ve 8 yaşlarında), bebek karyolası gerekiyor.",
      phone: "+90 555 987 6543",
      email: "mehmet.demir@example.com"
    },
    {
      id: "B004",
      guestName: "Hans Müller",
      checkIn: "2023-10-01",
      checkOut: "2023-10-08",
      guests: 2,
      roomType: "Executive Süit",
      status: "confirmed",
      price: "€2240",
      paymentStatus: "paid",
      notes: "Balayı çifti, özel süsleme ve şampanya isteniyor.",
      phone: "+49 151 1234567",
      email: "hans.mueller@example.com"
    },
    {
      id: "B005",
      guestName: "Alexandra Smith",
      checkIn: "2023-10-05",
      checkOut: "2023-10-12",
      guests: 3,
      roomType: "Deluxe Oda",
      status: "confirmed",
      price: "€1260",
      paymentStatus: "paid",
      notes: "Gluten alerjisi var, özel yemek hizmetleri ayarlanacak.",
      phone: "+1 555 123 4567",
      email: "alex.smith@example.com"
    }
  ];

  const reviews: Review[] = [
    {
      id: "REV001",
      name: "Ahmet Yıldız",
      date: "2023-09-10",
      country: "Türkiye",
      rating: 5,
      comment: "Harika bir konaklama deneyimi yaşadık. Otel personeli çok ilgiliydi, odalar temiz ve konforluydu. Kesinlikle tekrar geleceğiz.",
      source: "Booking.com"
    },
    {
      id: "REV002",
      name: "Emma Wilson",
      date: "2023-09-08",
      country: "İngiltere",
      rating: 4,
      comment: "The hotel was very nice with great sea views. The breakfast was good but could have more variety. Staff were friendly and helpful.",
      source: "Tripadvisor",
      reply: "Thank you for your feedback, Emma! We're glad you enjoyed your stay and we've noted your comments about breakfast variety."
    },
    {
      id: "REV003",
      name: "Mehmet Kaya",
      date: "2023-09-05",
      country: "Türkiye",
      rating: 5,
      comment: "KKTC'de kaldığım en iyi otel! Manzara muhteşem, havuz ve plaj erişimi çok rahat. Kahvaltı zengin ve lezzetliydi.",
      source: "AssisTR"
    },
    {
      id: "REV004",
      name: "Hans Schmidt",
      date: "2023-09-03",
      country: "Almanya",
      rating: 3,
      comment: "Die Zimmer waren sauber, aber die Klimaanlage war laut. Der Strand und Pool waren sehr schön. Für den Preis hatte ich etwas mehr erwartet.",
      source: "Expedia"
    },
    {
      id: "REV005",
      name: "Zeynep Demir",
      date: "2023-09-01",
      country: "Türkiye",
      rating: 5,
      comment: "Çok güzel bir deneyimdi. Özellikle Spa merkezindeki hizmet kalitesi beklentilerimin üzerindeydi. Personel her konuda yardımcı oldu.",
      source: "AssisTR"
    }
  ];

  const chartData = {
    occupancy: [
      { month: "Oca", rate: 62 },
      { month: "Şub", rate: 58 },
      { month: "Mar", rate: 65 },
      { month: "Nis", rate: 75 },
      { month: "May", rate: 85 },
      { month: "Haz", rate: 92 },
      { month: "Tem", rate: 98 },
      { month: "Ağu", rate: 99 },
      { month: "Eyl", rate: 88 },
      { month: "Eki", rate: 76 },
      { month: "Kas", rate: 65 },
      { month: "Ara", rate: 72 }
    ],
    roomTypes: [
      { type: "Standart Oda", bookings: 145 },
      { type: "Deluxe Oda", bookings: 120 },
      { type: "Aile Odası", bookings: 85 },
      { type: "Executive Süit", bookings: 40 },
      { type: "Başkanlık Süiti", bookings: 10 }
    ]
  };

  const performanceMetrics = {
    avgDailyRate: "€210",
    revPAR: "€182",
    avgStayDuration: "5.3 gün",
    repeatGuestRate: "28%"
  };

  const updateBookingStatus = (id: string, newStatus: string) => {
    toast.success(`${id} numaralı rezervasyon ${newStatus === 'confirmed' ? 'onaylandı' : 'reddedildi'}`);
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

  const filteredRoomTypes = roomTypes.filter(room => {
    const searchLower = searchTerm.toLowerCase();
    return (
      room.name.toLowerCase().includes(searchLower) ||
      room.description.toLowerCase().includes(searchLower) ||
      room.amenities.some(amenity => amenity.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center">
            <Hotel className="mr-2 h-6 w-6" />
            Otel Yönetim Paneli
          </h2>
          <p className="text-muted-foreground">
            Otelinizin rezervasyonlarını, odalarını ve değerlendirmelerini yönetin.
          </p>
        </div>

        <Button onClick={() => setActiveTab("settings")} variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Otel Ayarları
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 w-full flex overflow-x-auto">
          <TabsTrigger value="dashboard" className="flex items-center">
            <BarChart3 className="mr-2 h-4 w-4" />
            Genel Durum
          </TabsTrigger>
          <TabsTrigger value="bookings" className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            Rezervasyonlar
          </TabsTrigger>
          <TabsTrigger value="rooms" className="flex items-center">
            <Bed className="mr-2 h-4 w-4" />
            Oda Yönetimi
          </TabsTrigger>
          <TabsTrigger value="guests" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Misafirler
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
                  <Bed className="mr-2 h-4 w-4 text-muted-foreground" />
                  Bugün Doluluk Oranı
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">88%</div>
                <p className="text-xs text-muted-foreground">
                  Dün: 85% (+3.5%)
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Key className="mr-2 h-4 w-4 text-muted-foreground" />
                  Bugün Giriş Yapacaklar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  Toplam 23 misafir
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
                <div className="text-2xl font-bold">4.7</div>
                <div className="flex">
                  {renderRating(4.7)}
                  <span className="text-xs text-muted-foreground ml-2">(124 değerlendirme)</span>
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
                  Günlük Gelir
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€4,560</div>
                <p className="text-xs text-muted-foreground">
                  Geçen hafta aynı gün: €4,120 (+10.7%)
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Yıllık Doluluk Oranları</CardTitle>
                <CardDescription>Son 12 ayın doluluk oranları</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full">
                    <div className="flex h-[250px] items-end justify-between">
                      {chartData.occupancy.map((month, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div className="flex flex-col items-center space-y-1">
                            <div
                              className="w-5 bg-primary rounded-t"
                              style={{ height: `${(month.rate / 100) * 230}px` }}
                            ></div>
                            <span className="text-xs font-medium">{month.month}</span>
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
                <CardTitle className="text-lg">Oda Tipi Dağılımı</CardTitle>
                <CardDescription>Rezervasyonların oda tiplerine göre dağılımı</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {chartData.roomTypes.map((room, i) => (
                    <li key={i} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary/10 mr-3 flex items-center justify-center">
                          <span className="font-semibold text-sm text-primary">{i + 1}</span>
                        </div>
                        <span>{room.type}</span>
                      </div>
                      <Badge variant="secondary">{room.bookings} rezervasyon</Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Ortalama Günlük Oda Ücreti</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceMetrics.avgDailyRate}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">RevPAR</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceMetrics.revPAR}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Ortalama Konaklama Süresi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceMetrics.avgStayDuration}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Tekrar Gelen Misafir Oranı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceMetrics.repeatGuestRate}</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Bugünkü Görevler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-md">
                    <div className="flex items-center">
                      <div className="bg-amber-100 p-2 rounded-full mr-3">
                        <Key className="h-4 w-4 text-amber-700" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">12 Check-in İşlemi</p>
                        <p className="text-xs text-muted-foreground">8 oda hazır, 4 hazırlanıyor</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Detaylar</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-md">
                    <div className="flex items-center">
                      <div className="bg-red-100 p-2 rounded-full mr-3">
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
                          className="h-4 w-4 text-red-700"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-sm">8 Check-out İşlemi</p>
                        <p className="text-xs text-muted-foreground">3 geç çıkış talebi mevcut</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Detaylar</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <ShowerHead className="h-4 w-4 text-blue-700" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">15 Oda Temizliği</p>
                        <p className="text-xs text-muted-foreground">8 tamamlandı, 7 bekliyor</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Detaylar</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <Coffee className="h-4 w-4 text-green-700" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">4 Özel Yemek Talebi</p>
                        <p className="text-xs text-muted-foreground">2 kahvaltı, 2 akşam yemeği</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Detaylar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Son Bildirimler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 pb-3 border-b">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <BellRing className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Yeni rezervasyon alındı</p>
                      <p className="text-xs text-muted-foreground">John Smith, 12-18 Ekim tarihleri arasında Executive Süit rezervasyonu yaptı.</p>
                      <p className="text-xs text-blue-600 mt-1">10 dakika önce</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 pb-3 border-b">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <MessageSquare className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Yeni değerlendirme</p>
                      <p className="text-xs text-muted-foreground">Emma Wilson Booking.com üzerinden 4 yıldızlı bir değerlendirme yaptı.</p>
                      <p className="text-xs text-amber-600 mt-1">45 dakika önce</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 pb-3 border-b">
                    <div className="bg-red-100 p-2 rounded-full">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Oda 305'te teknik arıza</p>
                      <p className="text-xs text-muted-foreground">Klima sistemi arızalandı, teknik ekip bildirimi aldı.</p>
                      <p className="text-xs text-red-600 mt-1">1 saat önce</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Ödeme onaylandı</p>
                      <p className="text-xs text-muted-foreground">Ali Yılmaz'ın €900 tutarındaki ödemesi başarıyla alındı.</p>
                      <p className="text-xs text-green-600 mt-1">3 saat önce</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Rezervasyon Yönetimi</CardTitle>
              <CardDescription>
                Otelinize gelen rezervasyonları görüntüleyin ve yönetin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div className="space-x-2">
                  <Badge>Bugün Giriş: 12</Badge>
                  <Badge variant="outline">Bugün Çıkış: 8</Badge>
                  <Badge variant="outline">Bekleyen: 18</Badge>
                </div>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Yeni Rezervasyon
                </Button>
              </div>
              
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <Card key={booking.id} className={booking.status === "pending" ? "border-amber-300" : ""}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">{booking.guestName}</CardTitle>
                            <CardDescription>
                              Rezervasyon Kodu: {booking.id}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Badge className={booking.status === "confirmed" ? "bg-green-500" : "bg-amber-500"}>
                              {booking.status === "confirmed" ? "Onaylandı" : "Beklemede"}
                            </Badge>
                            <Badge className={
                              booking.paymentStatus === "paid" ? "bg-green-100 text-green-800" : 
                              booking.paymentStatus === "partial" ? "bg-blue-100 text-blue-800" : 
                              "bg-amber-100 text-amber-800"
                            }>
                              {booking.paymentStatus === "paid" ? "Ödendi" : 
                               booking.paymentStatus === "partial" ? "Kısmi Ödeme" : 
                               "Ödeme Bekliyor"}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="py-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3">
                          <div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span className="text-muted-foreground font-medium">Tarihler</span>
                            </div>
                            <div className="mt-1">
                              <div>{new Date(booking.checkIn).toLocaleDateString('tr-TR')} - {new Date(booking.checkOut).toLocaleDateString('tr-TR')}</div>
                              <div className="text-xs text-muted-foreground">{Math.round((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / (1000 * 60 * 60 * 24))} gece</div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center">
                              <Bed className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span className="text-muted-foreground font-medium">Oda Tipi</span>
                            </div>
                            <div className="mt-1">
                              <div>{booking.roomType}</div>
                              <div className="text-xs text-muted-foreground">{booking.guests} Misafir</div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span className="text-muted-foreground font-medium">İletişim</span>
                            </div>
                            <div className="mt-1">
                              <div>{booking.phone}</div>
                              <div className="text-xs text-muted-foreground truncate">{booking.email}</div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center">
                              <CreditCard className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span className="text-muted-foreground font-medium">Ödeme</span>
                            </div>
                            <div className="mt-1">
                              <div>{booking.price}</div>
                              <div className="text-xs text-muted-foreground">
                                {booking.paymentStatus === "paid" ? "Tam Ödeme" : 
                                 booking.paymentStatus === "partial" ? "Ön Ödeme Alındı" : 
                                 "Ödeme Bekleniyor"}
                              </div>
                            </div>
                          </div>
                        </div>
                        {booking.notes && (
                          <div className="p-2 bg-muted rounded-md text-sm">
                            <span className="font-medium">Not:</span> {booking.notes}
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="flex justify-end gap-2">
                        {booking.status === "pending" && (
                          <>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => updateBookingStatus(booking.id, 'rejected')}
                            >
                              <X className="mr-1 h-4 w-4" />
                              Reddet
                            </Button>
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            >
                              <Check className="mr-1 h-4 w-4" />
                              Onayla
                            </Button>
                          </>
                        )}
                        {booking.status === "confirmed" && (
                          <>
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
                                className="h-4 w-4 mr-1"
                              >
                                <rect x="4" y="5" width="16" height="16" rx="2"></rect>
                                <rect x="9" y="3" width="6" height="4" rx="1"></rect>
                                <path d="M10 14h4"></path>
                              </svg>
                              Check-in
                            </Button>
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
        
        <TabsContent value="rooms" className="mt-0">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Oda Yönetimi</CardTitle>
                  <CardDescription>
                    Otelinizin odalarını ve oda tiplerini yönetin.
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="search" 
                      placeholder="Oda tipinde ara..." 
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Yeni Oda Tipi
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredRoomTypes.map((room) => (
                  <Card key={room.id} className="flex flex-col h-full">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{room.name}</CardTitle>
                        <Badge>{room.price} / gece</Badge>
                      </div>
                      <CardDescription>
                        Kapasite: {room.capacity} kişi • Mevcut: {room.available} oda
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="py-2 flex-grow">
                      <p className="text-sm text-gray-600 mb-4">{room.description}</p>
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Olanaklar</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {room.amenities.map((amenity, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Doluluk Durumu</h4>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${room.available === 0 ? 'bg-red-500' : room.available < 3 ? 'bg-amber-500' : 'bg-green-500'}`} 
                              style={{ width: `${100 - (room.available / (room.available + 2)) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                            <span>Doluluk: {Math.round(100 - (room.available / (room.available + 2)) * 100)}%</span>
                            <span>{room.available} boş / {room.available + 2} toplam</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <PlusCircle className="h-4 w-4 mr-1" />
                        Fiyat Politikası
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Düzenle
                        </Button>
                        <Button variant="outline" size="sm">
                          <Info className="h-4 w-4 mr-1" />
                          Detaylar
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <Separator className="my-8" />
              
              <div>
                <h3 className="text-lg font-medium mb-6">Günlük Oda Durumu</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Bugün: {new Date().toLocaleDateString('tr-TR')}</h4>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="bg-green-100 text-green-800">Boş: 15</Badge>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">Dolu: 35</Badge>
                      <Badge variant="outline" className="bg-amber-100 text-amber-800">Temizleniyor: 5</Badge>
                      <Badge variant="outline" className="bg-red-100 text-red-800">Bakımda: 2</Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-base">1. Kat</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2">
                        <div className="grid grid-cols-5 gap-2">
                          {[101, 102, 103, 104, 105, 106, 107, 108, 109, 110].map((room) => (
                            <div 
                              key={room} 
                              className={`h-10 flex items-center justify-center rounded text-sm font-medium ${
                                [101, 104, 107, 110].includes(room) 
                                  ? 'bg-green-100 text-green-800' 
                                  : [102, 103, 105, 108, 109].includes(room)
                                    ? 'bg-blue-100 text-blue-800'
                                    : room === 106
                                      ? 'bg-amber-100 text-amber-800'
                                      : ''
                              }`}
                            >
                              {room}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-base">2. Kat</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2">
                        <div className="grid grid-cols-5 gap-2">
                          {[201, 202, 203, 204, 205, 206, 207, 208, 209, 210].map((room) => (
                            <div 
                              key={room} 
                              className={`h-10 flex items-center justify-center rounded text-sm font-medium ${
                                [202, 207, 209].includes(room) 
                                  ? 'bg-green-100 text-green-800' 
                                  : [201, 203, 204, 205, 206, 210].includes(room)
                                    ? 'bg-blue-100 text-blue-800'
                                    : room === 208
                                      ? 'bg-amber-100 text-amber-800'
                                      : ''
                              }`}
                            >
                              {room}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-base">3. Kat</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2">
                        <div className="grid grid-cols-5 gap-2">
                          {[301, 302, 303, 304, 305, 306, 307, 308, 309, 310].map((room) => (
                            <div 
                              key={room} 
                              className={`h-10 flex items-center justify-center rounded text-sm font-medium ${
                                [301, 302, 304, 306, 310].includes(room) 
                                  ? 'bg-green-100 text-green-800' 
                                  : [303, 307, 308, 309].includes(room)
                                    ? 'bg-blue-100 text-blue-800'
                                    : room === 305
                                      ? 'bg-red-100 text-red-800'
                                      : ''
                              }`}
                            >
                              {room}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="guests" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Misafir Yönetimi</CardTitle>
              <CardDescription>
                Otelinizde konaklayan misafirlerin bilgilerini yönetin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div className="space-x-2">
                  <Badge>57 Aktif Misafir</Badge>
                  <Badge variant="outline">12 Bugün Giriş</Badge>
                  <Badge variant="outline">8 Bugün Çıkış</Badge>
                </div>
                <div className="flex gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="search" 
                      placeholder="Misafir ara..." 
                      className="pl-8"
                    />
                  </div>
                  <Button>
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
              
              <div className="rounded-md border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted">
                      <th className="py-3 px-4 text-left font-medium">Misafir Adı</th>
                      <th className="py-3 px-4 text-left font-medium">Oda</th>
                      <th className="py-3 px-4 text-left font-medium">Giriş</th>
                      <th className="py-3 px-4 text-left font-medium">Çıkış</th>
                      <th className="py-3 px-4 text-left font-medium">Durum</th>
                      <th className="py-3 px-4 text-left font-medium">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="bg-white">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                            <span className="font-medium text-gray-600">AY</span>
                          </div>
                          <div>
                            <div className="font-medium">Ali Yılmaz</div>
                            <div className="text-xs text-muted-foreground">+90 532 123 4567</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>Deluxe Oda</div>
                        <div className="text-xs text-muted-foreground">204</div>
                      </td>
                      <td className="py-3 px-4">25.09.2023</td>
                      <td className="py-3 px-4">30.09.2023</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Info className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                            <span className="font-medium text-gray-600">SJ</span>
                          </div>
                          <div>
                            <div className="font-medium">Sarah Johnson</div>
                            <div className="text-xs text-muted-foreground">+44 7700 900123</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>Standart Oda</div>
                        <div className="text-xs text-muted-foreground">108</div>
                      </td>
                      <td className="py-3 px-4">26.09.2023</td>
                      <td className="py-3 px-4">03.10.2023</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Info className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                            <span className="font-medium text-gray-600">HM</span>
                          </div>
                          <div>
                            <div className="font-medium">Hans Müller</div>
                            <div className="text-xs text-muted-foreground">+49 151 1234567</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>Executive Süit</div>
                        <div className="text-xs text-muted-foreground">Bekleniyor</div>
                      </td>
                      <td className="py-3 px-4">01.10.2023</td>
                      <td className="py-3 px-4">08.10.2023</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-amber-100 text-amber-800">Bekleniyor</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Info className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                            <span className="font-medium text-gray-600">MD</span>
                          </div>
                          <div>
                            <div className="font-medium">Mehmet Demir</div>
                            <div className="text-xs text-muted-foreground">+90 555 987 6543</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>Aile Odası</div>
                        <div className="text-xs text-muted-foreground">Bekleniyor</div>
                      </td>
                      <td className="py-3 px-4">28.09.2023</td>
                      <td className="py-3 px-4">05.10.2023</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-amber-100 text-amber-800">Bekleniyor</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Info className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">VIP Misafirler</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                          <span className="font-medium text-gray-600">HM</span>
                        </div>
                        <div>
                          <div className="font-medium">Hans Müller</div>
                          <div className="text-xs text-muted-foreground">Executive Süit • 01.10 - 08.10</div>
                        </div>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800">Balayı</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                          <span className="font-medium text-gray-600">CY</span>
                        </div>
                        <div>
                          <div className="font-medium">Can Yıldırım</div>
                          <div className="text-xs text-muted-foreground">Başkanlık Süiti • 05.10 - 12.10</div>
                        </div>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800">Ünlü</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                          <span className="font-medium text-gray-600">AS</span>
                        </div>
                        <div>
                          <div className="font-medium">Alexandra Smith</div>
                          <div className="text-xs text-muted-foreground">Deluxe Oda • 05.10 - 12.10</div>
                        </div>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800">Özel İhtiyaç</Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Bugünkü Özel Talepler</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
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
                            className="h-4 w-4 text-blue-700"
                          >
                            <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0"></path>
                            <path d="M12 7v5l3 3"></path>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-sm">Ali Yılmaz - Oda 204</p>
                          <p className="text-xs text-muted-foreground">Erken Check-in</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">İşaretle</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="bg-green-100 p-2 rounded-full mr-3">
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
                            className="h-4 w-4 text-green-700"
                          >
                            <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"></path>
                            <path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z"></path>
                            <path d="M5 18v2"></path>
                            <path d="M19 18v2"></path>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-sm">Sarah Johnson - Oda 108</p>
                          <p className="text-xs text-muted-foreground">Havaalanı Transferi</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">İşaretle</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="bg-amber-100 p-2 rounded-full mr-3">
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
                            className="h-4 w-4 text-amber-700"
                          >
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <line x1="10" y1="9" x2="8" y2="9"></line>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-sm">Alexandra Smith - Oda Bekleniyor</p>
                          <p className="text-xs text-muted-foreground">Özel Menü (Gluten Free)</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">İşaretle</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-0">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Misafir Değerlendirmeleri</CardTitle>
                  <CardDescription>
                    Otelinize yapılan yorumları görüntüleyin ve yönetin.
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
                  <div className="text-3xl font-bold text-amber-500">4.7</div>
                  <div className="flex justify-center my-2">
                    {renderRating(4.7)}
                  </div>
                  <div className="text-sm text-muted-foreground">124 Değerlendirme</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg flex-grow">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="text-sm font-medium w-6">5★</span>
                      <div className="h-2 ml-2 flex-grow bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full" style={{width: "78%"}}></div>
                      </div>
                      <span className="text-sm ml-2 w-8">78%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium w-6">4★</span>
                      <div className="h-2 ml-2 flex-grow bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-green-400 h-full" style={{width: "15%"}}></div>
                      </div>
                      <span className="text-sm ml-2 w-8">15%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium w-6">3★</span>
                      <div className="h-2 ml-2 flex-grow bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-yellow-400 h-full" style={{width: "5%"}}></div>
                      </div>
                      <span className="text-sm ml-2 w-8">5%</span>
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
                      <span className="text-sm w-24">Booking.com</span>
                      <div className="h-2 ml-2 flex-grow bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full" style={{width: "42%"}}></div>
                      </div>
                      <span className="text-sm ml-2 w-8">42%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm w-24">Tripadvisor</span>
                      <div className="h-2 ml-2 flex-grow bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full" style={{width: "35%"}}></div>
                      </div>
                      <span className="text-sm ml-2 w-8">35%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm w-24">Expedia</span>
                      <div className="h-2 ml-2 flex-grow bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-yellow-500 h-full" style={{width: "13%"}}></div>
                      </div>
                      <span className="text-sm ml-2 w-8">13%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm w-24">AssisTR</span>
                      <div className="h-2 ml-2 flex-grow bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-purple-500 h-full" style={{width: "10%"}}></div>
                      </div>
                      <span className="text-sm ml-2 w-8">10%</span>
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
                            {review.country && (
                              <Badge variant="outline" className="text-xs">
                                {review.country}
                              </Badge>
                            )}
                            {review.source && (
                              <Badge variant="outline" className="text-xs bg-blue-50">
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
                              <Hotel className="h-3 w-3 mr-1" />
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
                    <CardTitle className="text-lg">Gelir Raporları</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <ul className="space-y-2">
                      <li>
                        <Button variant="link" className="p-0 h-auto text-blue-600">Günlük Gelir Raporu</Button>
                      </li>
                      <li>
                        <Button variant="link" className="p-0 h-auto text-blue-600">Haftalık Doluluk Oranları</Button>
                      </li>
                      <li>
                        <Button variant="link" className="p-0 h-auto text-blue-600">Aylık Gelir Analizi</Button>
                      </li>
                      <li>
                        <Button variant="link" className="p-0 h-auto text-blue-600">RevPAR ve ADR Raporu</Button>
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
                        <Button variant="link" className="p-0 h-auto text-blue-600">Oda Tipi Dağılımı</Button>
                      </li>
                      <li>
                        <Button variant="link" className="p-0 h-auto text-blue-600">Konaklama Süresi Analizi</Button>
                      </li>
                      <li>
                        <Button variant="link" className="p-0 h-auto text-blue-600">Kanal Bazlı Rezervasyonlar</Button>
                      </li>
                      <li>
                        <Button variant="link" className="p-0 h-auto text-blue-600">Personel Performansı</Button>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Misafir Analizleri</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <ul className="space-y-2">
                      <li>
                        <Button variant="link" className="p-0 h-auto text-blue-600">Misafir Demografisi</Button>
                      </li>
                      <li>
                        <Button variant="link" className="p-0 h-auto text-blue-600">Memnuniyet Analizi</Button>
                      </li>
                      <li>
                        <Button variant="link" className="p-0 h-auto text-blue-600">Tekrar Konaklama Oranları</Button>
                      </li>
                      <li>
                        <Button variant="link" className="p-0 h-auto text-blue-600">Özel Talep Analizi</Button>
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
                        <option value="revenue">Gelir Raporu</option>
                        <option value="occupancy">Doluluk Raporu</option>
                        <option value="guest">Misafir Raporu</option>
                        <option value="marketing">Pazarlama Raporu</option>
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
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-medium mb-4 flex items-center text-blue-800">
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
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  Performans İyileştirme Önerileri
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-blue-700 mb-2">Doluluk Artırma Stratejileri</h5>
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
                          className="h-4 w-4 mr-2 mt-0.5 text-blue-600"
                        >
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                        <span>Salı-Perşembe arası doluluk oranlarını artırmak için hafta içi özel paketler oluşturun.</span>
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
                          className="h-4 w-4 mr-2 mt-0.5 text-blue-600"
                        >
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                        <span>Düşük sezon döneminde (Kasım-Mart) tematik etkinlikler düzenleyerek doluluk oranını %15 artırabilirsiniz.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-blue-700 mb-2">RevPAR İyileştirme</h5>
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
                          className="h-4 w-4 mr-2 mt-0.5 text-blue-600"
                        >
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                        <span>Deluxe Odalar için upselling stratejileri geliştirilmelidir. Özel tekliflerle dönüşüm oranı %20 artırılabilir.</span>
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
                          className="h-4 w-4 mr-2 mt-0.5 text-blue-600"
                        >
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                        <span>Dinamik fiyatlandırma ile yüksek talep dönemlerinde oda fiyatlarını %10-15 artırabilirsiniz.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-blue-700 mb-2">Maliyet Optimizasyonu</h5>
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
                          className="h-4 w-4 mr-2 mt-0.5 text-blue-600"
                        >
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                        <span>Enerji tüketiminde akıllı sistemlere geçiş yaparak yıllık %12 tasarruf sağlanabilir.</span>
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
                          className="h-4 w-4 mr-2 mt-0.5 text-blue-600"
                        >
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                        <span>Tedarikçi kontratlarının yeniden müzakere edilmesi ile %8-10 maliyet avantajı sağlanabilir.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-blue-700 mb-2">Misafir Memnuniyeti Artırma</h5>
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
                          className="h-4 w-4 mr-2 mt-0.5 text-blue-600"
                        >
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                        <span>Alman misafirler için özel karşılama programları geliştirilmelidir. Bu pazar segmentinde %25 artış potansiyeli var.</span>
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
                          className="h-4 w-4 mr-2 mt-0.5 text-blue-600"
                        >
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                        <span>Yemek menüsü çeşitliliğinin artırılması ile ilgili geri bildirimler mevcut, bu konuya odaklanılmalıdır.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Otel Ayarları</CardTitle>
              <CardDescription>
                Otelinizin genel ayarlarını ve bilgilerini yönetin.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Genel Bilgiler</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hotel-name">Otel Adı</Label>
                    <Input 
                      id="hotel-name"
                      defaultValue="KKTC Paradise Resort & Spa"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hotel-type">Otel Kategorisi</Label>
                    <select 
                      id="hotel-type"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      defaultValue="5-star"
                    >
                      <option value="3-star">3 Yıldızlı</option>
                      <option value="4-star">4 Yıldızlı</option>
                      <option value="5-star">5 Yıldızlı</option>
                      <option value="boutique">Butik Otel</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hotel-address">Adres</Label>
                    <Input 
                      id="hotel-address"
                      defaultValue="Girne Sahil Yolu No: 123, Girne, KKTC"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hotel-phone">Telefon</Label>
                    <Input 
                      id="hotel-phone"
                      defaultValue="+90 392 123 45 67"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hotel-email">E-posta</Label>
                    <Input 
                      id="hotel-email"
                      defaultValue="info@kktcparadiseresort.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hotel-website">Web Sitesi</Label>
                    <Input 
                      id="hotel-website"
                      defaultValue="www.kktcparadiseresort.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hotel-description">Otel Açıklaması</Label>
                  <textarea 
                    id="hotel-description"
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    defaultValue="KKTC Paradise Resort & Spa, Kuzey Kıbrıs'ın eşsiz doğası içerisinde, Akdeniz'in berrak sularına nazır konumuyla misafirlerine unutulmaz bir tatil deneyimi sunmaktadır. Modern mimari ve lüks detaylarla tasarlanmış odalarımız, damak zevkinize hitap eden dünya mutfaklarından seçkin lezzetler sunan restoranlarımız ve profesyonel ekibimizle hizmetinizdeyiz."
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Giriş - Çıkış Ayarları</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="check-in-time">Check-in Saati</Label>
                    <Input 
                      id="check-in-time"
                      type="time"
                      defaultValue="14:00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="check-out-time">Check-out Saati</Label>
                    <Input 
                      id="check-out-time"
                      type="time"
                      defaultValue="12:00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="early-check-in">Erken Check-in Ücreti</Label>
                    <Input 
                      id="early-check-in"
                      defaultValue="€30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="late-check-out">Geç Check-out Ücreti</Label>
                    <Input 
                      id="late-check-out"
                      defaultValue="€25"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="flex-check-in"
                    className="h-4 w-4"
                    defaultChecked
                  />
                  <label htmlFor="flex-check-in" className="text-sm font-medium">
                    Esnek check-in/check-out (doluluk durumuna göre)
                  </label>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Fiyat ve Promosyon Ayarları</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Para Birimi</Label>
                    <select 
                      id="currency"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      defaultValue="EUR"
                    >
                      <option value="EUR">Euro (€)</option>
                      <option value="USD">Dolar ($)</option>
                      <option value="GBP">İngiliz Sterlini (£)</option>
                      <option value="TRY">Türk Lirası (₺)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax-rate">KDV Oranı (%)</Label>
                    <Input 
                      id="tax-rate"
                      type="number"
                      defaultValue="18"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discount-policy">İndirim Politikası</Label>
                    <select 
                      id="discount-policy"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      defaultValue="early-booking"
                    >
                      <option value="early-booking">Erken Rezervasyon</option>
                      <option value="last-minute">Son Dakika</option>
                      <option value="seasonal">Sezonsal İndirimler</option>
                      <option value="custom">Özel İndirimler</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cancellation-fee">İptal Ücreti (%)</Label>
                    <Input 
                      id="cancellation-fee"
                      type="number"
                      defaultValue="30"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="dynamic-pricing"
                    className="h-4 w-4"
                    defaultChecked
                  />
                  <label htmlFor="dynamic-pricing" className="text-sm font-medium">
                    Dinamik fiyatlandırma kullan (doluluk ve talebe göre)
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
                        Otelinizin fotoğraflarını sürükleyin veya seçin
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
                      alt="Hotel" 
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
                    <Badge className="absolute bottom-2 left-2 bg-amber-500">Ana Görsel</Badge>
                  </div>
                  <div className="relative group rounded-md overflow-hidden">
                    <img 
                      src="/placeholder.svg" 
                      alt="Hotel" 
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
                      alt="Hotel" 
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
                      alt="Hotel" 
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

export default HotelPanel;
