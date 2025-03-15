
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Utensils, Star, Users, Clock, Calendar as CalendarIcon, CheckCircle, MapPin } from "lucide-react";
import { toast } from "sonner";

const RestaurantReservation = () => {
  const [activeTab, setActiveTab] = useState("restaurants");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [reservationDetails, setReservationDetails] = useState({
    people: "2",
    time: "19:30",
    notes: "",
  });
  const [reservationCode, setReservationCode] = useState("");

  const restaurants = [
    {
      id: "1",
      name: "Palmiye Restaurant",
      cuisine: "Kıbrıs Mutfağı",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
      location: "Girne, KKTC",
      priceRange: "€€",
      openingHours: "11:00 - 23:00",
    },
    {
      id: "2",
      name: "Harbour Bistro",
      cuisine: "Akdeniz",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
      location: "Lefkoşa, KKTC",
      priceRange: "€€€",
      openingHours: "12:00 - 23:30",
    },
    {
      id: "3",
      name: "Meydan Lokantası",
      cuisine: "Yerel Mutfak",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
      location: "Gazimağusa, KKTC",
      priceRange: "€",
      openingHours: "10:00 - 22:00",
    },
  ];

  const bookedReservations = [
    {
      id: "RES12345",
      restaurant: "Palmiye Restaurant",
      date: "2023-09-25",
      time: "19:30",
      people: 2,
      status: "confirmed"
    }
  ];

  const handleReservationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReservationDetails({
      ...reservationDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleTimeChange = (value: string) => {
    setReservationDetails({
      ...reservationDetails,
      time: value
    });
  };

  const handlePeopleChange = (value: string) => {
    setReservationDetails({
      ...reservationDetails,
      people: value
    });
  };

  const startReservation = (restaurantId: string) => {
    setSelectedRestaurant(restaurantId);
    setBookingStep(2);
  };

  const confirmReservation = () => {
    // Gerçekte bir API çağrısı yapılırdı
    const restaurant = restaurants.find(r => r.id === selectedRestaurant);
    if (!restaurant) return;
    
    // Demo rezervasyon kodu oluştur
    const reservationCode = `RES${Math.floor(Math.random() * 100000)}`;
    setReservationCode(reservationCode);
    setBookingStep(3);
    
    toast.success("Rezervasyon başarıyla oluşturuldu!");
  };

  const resetReservation = () => {
    setSelectedRestaurant(null);
    setBookingStep(1);
    setReservationCode("");
  };

  const renderReservationForm = () => {
    const restaurant = restaurants.find(r => r.id === selectedRestaurant);
    if (!restaurant) return null;

    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <div className="relative h-48 md:h-64 rounded-lg overflow-hidden mb-4">
              <img 
                src={restaurant.image} 
                alt={restaurant.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold">{restaurant.name}</h3>
            <div className="flex items-center gap-1 mb-2">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <span className="text-sm">{restaurant.rating}</span>
              <span className="text-sm text-muted-foreground ml-2">{restaurant.cuisine}</span>
              <Badge variant="outline" className="ml-2">{restaurant.priceRange}</Badge>
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{restaurant.location}</span>
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <Clock className="h-3 w-3" />
              <span>{restaurant.openingHours}</span>
            </p>
          </div>
          
          <div className="md:w-1/2 space-y-4">
            <h4 className="font-medium">Rezervasyon Detayları</h4>
            <div className="space-y-2">
              <Label htmlFor="date">Tarih</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="border rounded-md p-3 bg-white shadow-sm"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="time">Saat</Label>
                <Select value={reservationDetails.time} onValueChange={handleTimeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Saat Seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12:00">12:00</SelectItem>
                    <SelectItem value="12:30">12:30</SelectItem>
                    <SelectItem value="13:00">13:00</SelectItem>
                    <SelectItem value="13:30">13:30</SelectItem>
                    <SelectItem value="19:00">19:00</SelectItem>
                    <SelectItem value="19:30">19:30</SelectItem>
                    <SelectItem value="20:00">20:00</SelectItem>
                    <SelectItem value="20:30">20:30</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="people">Kişi Sayısı</Label>
                <Select value={reservationDetails.people} onValueChange={handlePeopleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Kişi Sayısı" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Kişi</SelectItem>
                    <SelectItem value="2">2 Kişi</SelectItem>
                    <SelectItem value="3">3 Kişi</SelectItem>
                    <SelectItem value="4">4 Kişi</SelectItem>
                    <SelectItem value="5">5 Kişi</SelectItem>
                    <SelectItem value="6">6 Kişi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notlar</Label>
              <Input
                id="notes"
                name="notes"
                placeholder="Özel istekleriniz (opsiyonel)"
                value={reservationDetails.notes}
                onChange={handleReservationChange}
              />
            </div>
            
            <div className="flex gap-4 pt-4">
              <Button variant="outline" onClick={resetReservation}>
                İptal
              </Button>
              <Button onClick={confirmReservation}>
                Rezervasyonu Onayla
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderConfirmation = () => {
    const restaurant = restaurants.find(r => r.id === selectedRestaurant);
    if (!restaurant) return null;

    return (
      <div className="flex flex-col items-center justify-center py-8 text-center max-w-md mx-auto">
        <div className="bg-green-100 rounded-full p-3 mb-4">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Rezervasyonunuz Onaylandı!</h3>
        <p className="text-muted-foreground mb-4">
          {restaurant.name} restoranında {selectedDate?.toLocaleDateString('tr-TR')} tarihinde saat {reservationDetails.time}'da {reservationDetails.people} kişilik rezervasyonunuz oluşturuldu.
        </p>
        
        <div className="bg-muted p-4 rounded-lg w-full mb-6 shadow-inner">
          <div className="text-sm text-muted-foreground mb-2">Rezervasyon Kodu</div>
          <div className="text-xl font-mono font-bold">{reservationCode}</div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-6">
          Bu kodu kaybetmeyin! Rezervasyonunuzu görüntülemek veya iptal etmek için bu kodu kullanacaksınız.
        </p>
        
        <Button onClick={resetReservation} className="bg-gradient-to-r from-blue-600 to-purple-600 transition-all hover:from-blue-700 hover:to-purple-700">
          Yeni Rezervasyon
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Restoran Rezervasyonu</h2>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList className="bg-gradient-to-r from-blue-50 to-purple-50">
            <TabsTrigger value="restaurants" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">Restoranlar</TabsTrigger>
            <TabsTrigger value="reservations" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">Rezervasyonlarım</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        {activeTab === "restaurants" && (
          <div className="mt-0">
            {bookingStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map((restaurant) => (
                  <Card key={restaurant.id} className="overflow-hidden hover:shadow-md transition-shadow border-none shadow-lg">
                    <div className="relative h-48">
                      <img 
                        src={restaurant.image} 
                        alt={restaurant.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-white">{restaurant.name}</h3>
                            <p className="text-sm text-white/80">{restaurant.cuisine}</p>
                          </div>
                          <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-md">
                            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                            <span className="text-sm font-medium">{restaurant.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardContent className="pt-4">
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{restaurant.location}</span>
                      </div>
                      <div className="flex items-center mt-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{restaurant.priceRange}</span>
                        <Separator orientation="vertical" className="mx-2 h-4" />
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{restaurant.openingHours}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all hover:from-blue-700 hover:to-purple-700" 
                        onClick={() => startReservation(restaurant.id)}
                      >
                        <Utensils className="mr-2 h-4 w-4" />
                        Rezervasyon Yap
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
            
            {bookingStep === 2 && renderReservationForm()}
            {bookingStep === 3 && renderConfirmation()}
          </div>
        )}
        
        {activeTab === "reservations" && (
          <div className="mt-0">
            {bookedReservations.length > 0 ? (
              <div className="space-y-4">
                {bookedReservations.map((reservation) => (
                  <Card key={reservation.id} className="border-none shadow-lg overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{reservation.restaurant}</CardTitle>
                          <CardDescription>
                            Rezervasyon Kodu: {reservation.id}
                          </CardDescription>
                        </div>
                        <Badge className={reservation.status === "confirmed" ? "bg-gradient-to-r from-green-500 to-emerald-500" : "bg-amber-500"}>
                          {reservation.status === "confirmed" ? "Onaylandı" : "Beklemede"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{new Date(reservation.date).toLocaleDateString('tr-TR')}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{reservation.time}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{reservation.people} Kişi</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 pt-2 pb-4">
                      <Button variant="outline" size="sm">
                        Değiştir
                      </Button>
                      <Button variant="destructive" size="sm">
                        İptal Et
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-inner">
                <Utensils className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Henüz rezervasyonunuz yok</h3>
                <p className="text-muted-foreground mt-1 mb-4">
                  Hemen bir restoran seçerek rezervasyon yapabilirsiniz.
                </p>
                <Button 
                  onClick={() => setActiveTab("restaurants")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 transition-all hover:from-blue-700 hover:to-purple-700"
                >
                  Restoranlara Göz At
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantReservation;
