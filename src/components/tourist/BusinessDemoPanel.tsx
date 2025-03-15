
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
  Trash
} from "lucide-react";
import { toast } from "sonner";

const BusinessDemoPanel = () => {
  const [activeTab, setActiveTab] = useState("reservations");
  const [menuItems, setMenuItems] = useState([
    { id: "1", name: "Şeftali Kebabı", price: "€15", category: "Ana Yemek", description: "Özel yaprak ve kuzu eti ile" },
    { id: "2", name: "Hellim Salatası", price: "€10", category: "Salata", description: "Mevsim yeşillikleri ve hellim peyniri ile" },
    { id: "3", name: "Kolakas", price: "€12", category: "Ana Yemek", description: "Kıbrıs mutfağına özgü sebze yemeği" },
    { id: "4", name: "Macun Tatlısı", price: "€8", category: "Tatlı", description: "Geleneksel Kıbrıs tatlısı" },
  ]);
  const [newMenuItem, setNewMenuItem] = useState({ name: "", price: "", category: "Ana Yemek", description: "" });
  const [editingMenuItem, setEditingMenuItem] = useState<null | string>(null);

  const reservations = [
    { 
      id: "R001", 
      name: "Ahmet Yılmaz", 
      date: "2023-09-25", 
      time: "19:30", 
      people: 4, 
      status: "confirmed",
      notes: "Pencere kenarı olursa seviniriz."
    },
    { 
      id: "R002", 
      name: "Mehmet Kaya", 
      date: "2023-09-26", 
      time: "20:00", 
      people: 2, 
      status: "pending",
      notes: ""
    },
    { 
      id: "R003", 
      name: "Ayşe Demir", 
      date: "2023-09-26", 
      time: "13:00", 
      people: 6, 
      status: "confirmed",
      notes: "Doğum günü kutlaması, pasta getireceğiz."
    }
  ];

  const reviews = [
    { 
      id: "REV001", 
      name: "Ali Şahin", 
      date: "2023-09-10", 
      rating: 5, 
      comment: "Mükemmel yemekler ve harika servis. Kesinlikle tekrar geleceğim." 
    },
    { 
      id: "REV002", 
      name: "Zeynep Yıldız", 
      date: "2023-09-08", 
      rating: 4, 
      comment: "Yemekler lezzetliydi fakat servis biraz yavaştı." 
    },
    { 
      id: "REV003", 
      name: "Burak Çelik", 
      date: "2023-09-05", 
      rating: 5, 
      comment: "KKTC'de gittiğim en iyi restoranlardan biri. Hellim salatası bir harika!" 
    }
  ];

  const updateReservationStatus = (id: string, newStatus: string) => {
    // Gerçek uygulamada burada API çağrısı yapılırdı
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
        id: `${menuItems.length + 1}`,
        ...newMenuItem
      }
    ]);
    
    setNewMenuItem({ name: "", price: "", category: "Ana Yemek", description: "" });
    toast.success("Menü öğesi başarıyla eklendi");
  };

  const startEditMenuItem = (id: string) => {
    setEditingMenuItem(id);
  };

  const removeMenuItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
    toast.success("Menü öğesi silindi");
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`} />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center">
            <Store className="mr-2 h-6 w-6" />
            İşletme Yönetim Paneli (Demo)
          </h2>
          <p className="text-muted-foreground">
            Bu panel işletme sahiplerine özel olan panelin demo versiyonudur.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Bugünkü Ziyaretçiler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <p className="text-sm text-muted-foreground">
              Dün: 18 (+33%)
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Bugünkü Rezervasyonlar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-sm text-muted-foreground">
              Toplam 12 kişi
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
            <div className="text-3xl font-bold">4.7</div>
            <div className="flex">
              {renderStars(4.7)}
              <span className="text-sm text-muted-foreground ml-2">(42 değerlendirme)</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="reservations">
            <Calendar className="mr-2 h-4 w-4" />
            Rezervasyonlar
          </TabsTrigger>
          <TabsTrigger value="menu">
            <Utensils className="mr-2 h-4 w-4" />
            Menü Yönetimi
          </TabsTrigger>
          <TabsTrigger value="reviews">
            <MessageSquare className="mr-2 h-4 w-4" />
            Değerlendirmeler
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="reservations" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Rezervasyon Yönetimi</CardTitle>
              <CardDescription>
                Restoranınıza gelen rezervasyonları görüntüleyin ve yönetin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {reservations.map((reservation) => (
                    <Card key={reservation.id}>
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
                        <div className="grid grid-cols-3 gap-2 text-sm">
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
                        </div>
                        {reservation.notes && (
                          <div className="mt-2 p-2 bg-muted rounded-md text-sm">
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
        
        <TabsContent value="menu" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Menü Yönetimi</CardTitle>
              <CardDescription>
                Restoranınızın menüsünü düzenleyin ve güncelleyin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Mevcut Menü Öğeleri</h3>
                  <div className="space-y-4">
                    {menuItems.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-4 flex justify-between items-center">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground">{item.description}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{item.category}</Badge>
                              <span className="font-semibold">{item.price}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
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
              <CardTitle>Müşteri Değerlendirmeleri</CardTitle>
              <CardDescription>
                Restoranınıza yapılan yorumları görüntüleyin.
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
      </Tabs>
    </div>
  );
};

export default BusinessDemoPanel;
