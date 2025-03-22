
import { useState } from "react";
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
  Check, 
  X,
  Info,
  Edit,
  PlusCircle,
  Trash,
  LineChart,
  DollarSign,
  FileText,
  Bed,
  Percent,
  Share
} from "lucide-react";
import { toast } from "sonner";

const HotelBusinessDemo = ({ userData }: { userData?: any }) => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [rooms, setRooms] = useState([
    { id: "1", name: "Standart Oda", price: "€75", capacity: 2, amenities: ["Klima", "TV", "Wi-Fi"] },
    { id: "2", name: "Deniz Manzaralı Oda", price: "€120", capacity: 2, amenities: ["Klima", "TV", "Wi-Fi", "Balkon", "Deniz Manzarası"] },
    { id: "3", name: "Aile Süiti", price: "€180", capacity: 4, amenities: ["Klima", "TV", "Wi-Fi", "Balkon", "Mutfak", "Oturma Odası"] },
    { id: "4", name: "Balayı Süiti", price: "€250", capacity: 2, amenities: ["Klima", "TV", "Wi-Fi", "Jakuzi", "Deniz Manzarası", "Özel Teras"] },
  ]);
  const [newRoom, setNewRoom] = useState({ name: "", price: "", capacity: 2, amenities: ["Klima", "TV", "Wi-Fi"] });
  const [editingRoom, setEditingRoom] = useState<null | string>(null);

  const bookings = [
    { 
      id: "B001", 
      name: userData?.name || "Ahmet Yılmaz", 
      roomType: "Deniz Manzaralı Oda",
      checkIn: "2023-09-25", 
      checkOut: "2023-09-28", 
      guests: 2, 
      status: "confirmed",
      notes: "Erken check-in talep ediliyor."
    },
    { 
      id: "B002", 
      name: "Mehmet Kaya", 
      roomType: "Standart Oda",
      checkIn: "2023-09-26", 
      checkOut: "2023-09-29", 
      guests: 1, 
      status: "pending",
      notes: ""
    },
    { 
      id: "B003", 
      name: userData?.name || "Ayşe Demir", 
      roomType: "Aile Süiti",
      checkIn: "2023-09-28", 
      checkOut: "2023-10-02", 
      guests: 4, 
      status: "confirmed",
      notes: "Çocuklar için ilave yatak talep edildi."
    }
  ];

  const reviews = [
    { 
      id: "REV001", 
      name: userData?.name || "Ali Şahin", 
      date: "2023-09-10", 
      rating: 5, 
      comment: "Harika bir konaklama deneyimi. Odalar temiz, personel çok ilgili. Kesinlikle tekrar tercih ederim." 
    },
    { 
      id: "REV002", 
      name: "Zeynep Yıldız", 
      date: "2023-09-08", 
      rating: 4, 
      comment: "Odalar çok güzeldi fakat kahvaltı biraz daha çeşitli olabilirdi." 
    },
    { 
      id: "REV003", 
      name: userData?.name || "Burak Çelik", 
      date: "2023-09-05", 
      rating: 5, 
      comment: "Deniz manzaralı odada kaldık ve manzara muhteşemdi. Hizmet kalitesi de çok yüksekti." 
    }
  ];

  const financialData = [
    { month: "Ocak", revenue: 65500, expenses: 42000 },
    { month: "Şubat", revenue: 59700, expenses: 40500 },
    { month: "Mart", revenue: 78800, expenses: 45200 },
    { month: "Nisan", revenue: 82300, expenses: 47100 },
    { month: "Mayıs", revenue: 98000, expenses: 52400 },
    { month: "Haziran", revenue: 115500, expenses: 58800 },
  ];

  const updateBookingStatus = (id: string, newStatus: string) => {
    // Gerçek uygulamada burada API çağrısı yapılırdı
    toast.success(`${id} numaralı rezervasyon ${newStatus === 'confirmed' ? 'onaylandı' : 'reddedildi'}`);
  };

  const addRoom = () => {
    if (!newRoom.name || !newRoom.price) {
      toast.error("Lütfen en azından oda adı ve fiyat girin");
      return;
    }

    setRooms([
      ...rooms,
      {
        id: `${rooms.length + 1}`,
        ...newRoom
      }
    ]);
    
    setNewRoom({ name: "", price: "", capacity: 2, amenities: ["Klima", "TV", "Wi-Fi"] });
    toast.success("Oda başarıyla eklendi");
  };

  const startEditRoom = (id: string) => {
    setEditingRoom(id);
  };

  const removeRoom = (id: string) => {
    setRooms(rooms.filter(room => room.id !== id));
    toast.success("Oda silindi");
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`} />
    ));
  };

  const promotions = [
    { id: "P1", name: "Erken Rezervasyon İndirimi", discount: "20%", validUntil: "2023-10-31", description: "30 gün önceden yapılan rezervasyonlarda geçerli" },
    { id: "P2", name: "Uzun Konaklama Fırsatı", discount: "15%", validUntil: "2023-12-31", description: "5 gece ve üzeri konaklamalarda geçerli" },
    { id: "P3", name: "Balayı Paketi", discount: "Özel paket", validUntil: "2023-12-31", description: "Romantik akşam yemeği ve spa masajı dahil" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center">
            <Hotel className="mr-2 h-6 w-6" />
            Otel İşletme Paneli (Demo)
          </h2>
          <p className="text-muted-foreground">
            Bu panel otel işletme sahiplerine özel olan panelin demo versiyonudur.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Doluluk Oranı
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">78%</div>
            <p className="text-sm text-muted-foreground">
              Geçen ay: 65% (+13%)
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Aktif Rezervasyonlar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-sm text-muted-foreground">
              Toplam 28 misafir
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Star className="mr-2 h-5 w-5" />
              Ortalama Puanınız
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4.6</div>
            <div className="flex">
              {renderStars(4.6)}
              <span className="text-sm text-muted-foreground ml-2">(68 değerlendirme)</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="bookings">
            <Calendar className="mr-2 h-4 w-4" />
            Rezervasyonlar
          </TabsTrigger>
          <TabsTrigger value="rooms">
            <Bed className="mr-2 h-4 w-4" />
            Oda Yönetimi
          </TabsTrigger>
          <TabsTrigger value="promotions">
            <Percent className="mr-2 h-4 w-4" />
            Promosyonlar
          </TabsTrigger>
          <TabsTrigger value="reviews">
            <MessageSquare className="mr-2 h-4 w-4" />
            Değerlendirmeler
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <LineChart className="mr-2 h-4 w-4" />
            Finansal Analiz
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="bookings" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Rezervasyon Yönetimi</CardTitle>
              <CardDescription>
                Otelinize gelen rezervasyonları görüntüleyin ve yönetin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">{booking.name}</CardTitle>
                            <CardDescription>
                              Rezervasyon Kodu: {booking.id}
                            </CardDescription>
                          </div>
                          <Badge className={booking.status === "confirmed" ? "bg-green-500" : "bg-amber-500"}>
                            {booking.status === "confirmed" ? "Onaylandı" : "Beklemede"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="py-2">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground block">Oda Tipi</span>
                            <span>{booking.roomType}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block">Giriş</span>
                            <span>{new Date(booking.checkIn).toLocaleDateString('tr-TR')}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block">Çıkış</span>
                            <span>{new Date(booking.checkOut).toLocaleDateString('tr-TR')}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block">Kişi</span>
                            <span>{booking.guests}</span>
                          </div>
                        </div>
                        {booking.notes && (
                          <div className="mt-2 p-2 bg-muted rounded-md text-sm">
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
                          <Button variant="outline" size="sm">
                            <Info className="mr-1 h-4 w-4" />
                            Detaylar
                          </Button>
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
              <CardTitle>Oda Yönetimi</CardTitle>
              <CardDescription>
                Otelinizin oda listesini düzenleyin ve yeni odalar ekleyin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Mevcut Odalar</h3>
                  <div className="space-y-4">
                    {rooms.map((room) => (
                      <Card key={room.id}>
                        <CardContent className="p-4 flex justify-between items-center">
                          <div>
                            <div className="font-medium">{room.name}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{room.capacity} Kişilik</Badge>
                              <span className="font-semibold">{room.price} / gece</span>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {room.amenities.map((amenity, index) => (
                                <span key={index} className="text-xs px-2 py-1 bg-blue-50 text-blue-800 rounded-full">
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => startEditRoom(room.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => removeRoom(room.id)}>
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
                  <h3 className="text-lg font-medium mb-4">Yeni Oda Ekle</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Oda Adı</Label>
                      <Input 
                        id="name"
                        value={newRoom.name}
                        onChange={(e) => setNewRoom({...newRoom, name: e.target.value})}
                        placeholder="Örn: Standart Oda"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Gecelik Fiyat</Label>
                      <Input 
                        id="price"
                        value={newRoom.price}
                        onChange={(e) => setNewRoom({...newRoom, price: e.target.value})}
                        placeholder="Örn: €75"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Kapasite</Label>
                      <select 
                        id="capacity"
                        value={newRoom.capacity}
                        onChange={(e) => setNewRoom({...newRoom, capacity: Number(e.target.value)})}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      >
                        <option value={1}>1 Kişilik</option>
                        <option value={2}>2 Kişilik</option>
                        <option value={3}>3 Kişilik</option>
                        <option value={4}>4 Kişilik</option>
                        <option value={6}>6 Kişilik</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amenities">Özellikler (virgülle ayırarak)</Label>
                      <Input 
                        id="amenities"
                        value={newRoom.amenities.join(", ")}
                        onChange={(e) => setNewRoom({...newRoom, amenities: e.target.value.split(", ")})}
                        placeholder="Örn: Klima, TV, Wi-Fi"
                      />
                    </div>
                  </div>
                  <Button onClick={addRoom} className="mt-4">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Oda Ekle
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="promotions" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Promosyon ve Kampanyalar</CardTitle>
              <CardDescription>
                Otelinizin mevcut promosyonlarını görüntüleyin ve yönetin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {promotions.map(promo => (
                    <Card key={promo.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle className="text-base">{promo.name}</CardTitle>
                          <Badge className="bg-green-500">{promo.discount}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="py-2">
                        <p className="text-sm">{promo.description}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Geçerlilik: {new Date(promo.validUntil).toLocaleDateString('tr-TR')} tarihine kadar
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Düzenle
                        </Button>
                        <Button variant="default" size="sm">
                          <Share className="h-4 w-4 mr-1" />
                          Paylaş
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                  <Card className="flex items-center justify-center h-44 border-dashed">
                    <Button variant="outline" className="flex items-center">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Yeni Promosyon Ekle
                    </Button>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Müşteri Değerlendirmeleri</CardTitle>
              <CardDescription>
                Oteliniz hakkında yapılan yorumları görüntüleyin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base">{review.name}</CardTitle>
                          <div className="flex">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <CardDescription>
                          {new Date(review.date).toLocaleDateString('tr-TR')}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{review.comment}</p>
                      </CardContent>
                      <CardFooter className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Yanıtla
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Finansal Analiz</CardTitle>
              <CardDescription>
                Otelinizin finansal performansını takip edin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        <DollarSign className="mr-2 h-4 w-4 text-green-500" />
                        Aylık Gelir
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">€115,500</div>
                      <p className="text-sm text-green-500">+18% geçen aya göre</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        <FileText className="mr-2 h-4 w-4 text-red-500" />
                        Aylık Gider
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">€58,800</div>
                      <p className="text-sm text-red-500">+12% geçen aya göre</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        <LineChart className="mr-2 h-4 w-4 text-blue-500" />
                        Net Kâr
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">€56,700</div>
                      <p className="text-sm text-green-500">+24% geçen aya göre</p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Son 6 Ay Finansal Özet</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative h-60">
                      <div className="absolute inset-0 flex flex-col">
                        {/* Simplified chart display for demo purposes */}
                        <div className="flex h-full">
                          {financialData.map((month, index) => (
                            <div key={index} className="flex-1 flex flex-col justify-end items-center gap-1 px-1">
                              <div 
                                className="w-full bg-blue-500 rounded-t"
                                style={{ height: `${(month.revenue / 120000) * 100}%` }}
                              ></div>
                              <div 
                                className="w-full bg-red-400 rounded-t"
                                style={{ height: `${(month.expenses / 120000) * 100}%` }}
                              ></div>
                              <span className="text-xs font-medium">{month.month}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-center mt-2 gap-6">
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-blue-500 rounded"></div>
                            <span className="text-xs">Gelir</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-red-400 rounded"></div>
                            <span className="text-xs">Gider</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HotelBusinessDemo;
