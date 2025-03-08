
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { format, addDays, differenceInDays } from "date-fns";
import { tr } from "date-fns/locale";
import { toast } from "sonner";
import { 
  Hotel, 
  Search, 
  Calendar as CalendarIcon, 
  Users, 
  Plane, 
  ArrowRight, 
  Bus, 
  Car, 
  Bike, 
  Timer, 
  CreditCard, 
  TicketCheck, 
  Share2, 
  MapPin
} from "lucide-react";

// Dummy data for hotels
const hotels = [
  {
    id: "h1",
    name: "Merit Royal Hotel & Casino",
    location: "Girne",
    price: 2800,
    rating: 5,
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/367372905.jpg?k=b27a73cb9cfbddb6a857070991b0be91c40b1cc8d46a48ea0ffc0dbcbfef4e36&o=&hp=1",
    description: "Lüks bir sahil oteli ve casino",
    amenities: ["Havuz", "Spa", "Wi-Fi", "Restoran", "Bar"]
  },
  {
    id: "h2",
    name: "Elexus Hotel & Resort & Spa",
    location: "Girne",
    price: 2400,
    rating: 5,
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/85995379.jpg?k=cecf46a900e8c0fb3eda662841e7f04c6fdc4cbe2caf0c0b6747de261d037c71&o=&hp=1",
    description: "Deniz manzaralı lüks otel ve spa",
    amenities: ["Havuz", "Spa", "Wi-Fi", "Restoran", "Bar", "Fitness"]
  },
  {
    id: "h3",
    name: "Kaya Palazzo Resort & Casino",
    location: "Girne",
    price: 2300,
    rating: 5,
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/232160914.jpg?k=eef7d586d7ac37f5d3fd540fa267f40e3e9dd8f1bb1c2a03beab60151c78db87&o=&hp=1",
    description: "Modern tasarımlı resort ve casino",
    amenities: ["Havuz", "Spa", "Wi-Fi", "Restoran", "Bar", "Plaj"]
  },
  {
    id: "h4",
    name: "Acapulco Resort Convention Spa",
    location: "Girne",
    price: 1900,
    rating: 4.5,
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/354451484.jpg?k=67be6540231a5724894dc8b6cf28c773d3907e4777ca80f969fb3b9bb0e9101a&o=&hp=1",
    description: "Geniş plaj alanına sahip resort",
    amenities: ["Havuz", "Spa", "Wi-Fi", "Restoran", "Konferans"]
  },
  {
    id: "h5",
    name: "Cratos Premium Hotel",
    location: "Girne",
    price: 2000,
    rating: 4.5,
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/194214064.jpg?k=5b30e9be4c9a5fbcb7af40a739d0e44a6e5e43e0d5f4ed9f8c52c70a53fa4f68&o=&hp=1",
    description: "Premium hizmet veren casino ve resort",
    amenities: ["Havuz", "Spa", "Wi-Fi", "Restoran", "Casino", "Bar"]
  }
];

// Dummy data for flights that match with hotel dates
const flights = [
  { 
    id: "f1", 
    airline: "Turkish Airlines", 
    departure: "İstanbul", 
    arrival: "Ercan", 
    departureTime: "08:30", 
    arrivalTime: "10:10", 
    price: 1200,
    logo: "https://www.turkishairlines.com/theme/img/logo.png"
  },
  { 
    id: "f2", 
    airline: "Pegasus", 
    departure: "İstanbul", 
    arrival: "Ercan", 
    departureTime: "12:45", 
    arrivalTime: "14:25", 
    price: 800,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Pegasus_Airlines_logo.svg/2560px-Pegasus_Airlines_logo.svg.png"
  },
  { 
    id: "f3", 
    airline: "SunExpress", 
    departure: "Ankara", 
    arrival: "Ercan", 
    departureTime: "15:20", 
    arrivalTime: "16:50", 
    price: 950,
    logo: "https://www.sunexpress.com/static/pics/sunexpress-logo.png"
  }
];

// Dummy data for transfers
const transfers = [
  { 
    id: "t1", 
    type: "Özel Araç", 
    icon: <Car className="h-5 w-5" />, 
    price: 400, 
    duration: "40 dk", 
    capacity: "1-4 kişi",
    shared: false,
    distance: "45 km"
  },
  { 
    id: "t2", 
    type: "Minibüs", 
    icon: <Bus className="h-5 w-5" />, 
    price: 200, 
    duration: "55 dk", 
    capacity: "1-8 kişi",
    shared: false,
    distance: "45 km"
  },
  { 
    id: "t3", 
    type: "Paylaşımlı Servis", 
    icon: <Share2 className="h-5 w-5" />, 
    price: 100, 
    duration: "70 dk", 
    capacity: "Kişi başı",
    shared: true,
    distance: "45 km"
  }
];

// Dummy reservations for lookup
const reservations = [
  {
    code: "RES123456",
    hotelId: "h1",
    checkIn: new Date(2023, 6, 15),
    checkOut: new Date(2023, 6, 20),
    guests: 2,
    room: "Deluxe Deniz Manzaralı",
    status: "confirmed",
    totalPrice: 14000,
    flightTo: "f1",
    flightFrom: "f2",
    transfer: "t1"
  },
  {
    code: "RES789012",
    hotelId: "h3",
    checkIn: new Date(2023, 7, 10),
    checkOut: new Date(2023, 7, 15),
    guests: 2,
    room: "Standart Oda",
    status: "confirmed",
    totalPrice: 11500,
    flightTo: "f2",
    flightFrom: "f3",
    transfer: "t3"
  }
];

const HotelReservation = () => {
  const [activeTab, setActiveTab] = useState("search");
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(addDays(new Date(), 5));
  const [guests, setGuests] = useState("2");
  const [searchResults, setSearchResults] = useState<typeof hotels>([]);
  const [selectedHotel, setSelectedHotel] = useState<(typeof hotels)[0] | null>(null);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [reservationStep, setReservationStep] = useState(1);
  const [selectedFlightTo, setSelectedFlightTo] = useState("");
  const [selectedFlightFrom, setSelectedFlightFrom] = useState("");
  const [selectedTransfer, setSelectedTransfer] = useState("");
  const [reservationCode, setReservationCode] = useState("");
  const [foundReservation, setFoundReservation] = useState<typeof reservations[0] | null>(null);
  const [showFlights, setShowFlights] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  
  // Calculate total days of stay
  const totalDays = checkInDate && checkOutDate 
    ? differenceInDays(checkOutDate, checkInDate) 
    : 0;

  // Calculate total price of the reservation
  const calculateTotalPrice = () => {
    let total = 0;
    
    // Hotel price
    if (selectedHotel) {
      total += selectedHotel.price * totalDays * parseInt(guests);
    }
    
    // Flight prices
    if (selectedFlightTo) {
      const flight = flights.find(f => f.id === selectedFlightTo);
      if (flight) total += flight.price * parseInt(guests);
    }
    
    if (selectedFlightFrom) {
      const flight = flights.find(f => f.id === selectedFlightFrom);
      if (flight) total += flight.price * parseInt(guests);
    }
    
    // Transfer price
    if (selectedTransfer) {
      const transfer = transfers.find(t => t.id === selectedTransfer);
      if (transfer) {
        if (transfer.shared) {
          total += transfer.price * parseInt(guests);
        } else {
          total += transfer.price;
        }
      }
    }
    
    return total;
  };

  // Handler for searching hotels
  const handleSearch = () => {
    if (!checkInDate || !checkOutDate) {
      toast.error("Lütfen giriş ve çıkış tarihlerini seçin");
      return;
    }
    
    // Simulate API call with small delay
    setTimeout(() => {
      setSearchResults(hotels);
    }, 500);
  };

  // Handler for selecting a hotel
  const handleSelectHotel = (hotel: (typeof hotels)[0]) => {
    setSelectedHotel(hotel);
    setReservationStep(1);
    setShowFlights(false);
    setShowTransfer(false);
  };

  // Handler for proceeding to flight selection
  const handleContinueToFlights = () => {
    setShowFlights(true);
    setReservationStep(2);
  };

  // Handler for proceeding to transfer selection
  const handleContinueToTransfer = () => {
    setShowTransfer(true);
    setReservationStep(3);
  };

  // Handler for completing the reservation
  const handleCompleteReservation = () => {
    // Generate a random reservation code
    const newReservationCode = `RES${Math.floor(100000 + Math.random() * 900000)}`;
    
    toast.success("Rezervasyon başarıyla tamamlandı!");
    toast.info(`Rezervasyon kodunuz: ${newReservationCode}`);
    
    // Reset form and return to search
    setReservationStep(1);
    setSelectedHotel(null);
    setSelectedRoom("");
    setSelectedFlightTo("");
    setSelectedFlightFrom("");
    setSelectedTransfer("");
    setShowFlights(false);
    setShowTransfer(false);
    setActiveTab("lookup");
    setReservationCode(newReservationCode);
  };

  // Handler for looking up a reservation
  const handleLookupReservation = () => {
    if (!reservationCode.trim()) {
      toast.error("Lütfen rezervasyon kodunu girin");
      return;
    }
    
    const reservation = reservations.find(r => r.code === reservationCode);
    
    if (reservation) {
      setFoundReservation(reservation);
      toast.success("Rezervasyon bulundu!");
    } else {
      setFoundReservation(null);
      toast.error("Rezervasyon bulunamadı!");
    }
  };

  return (
    <div className="bg-white rounded-lg">
      <div className="flex items-center gap-3 mb-6">
        <Hotel className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-semibold">Otel Rezervasyonu</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Otel Ara
          </TabsTrigger>
          <TabsTrigger value="lookup" className="flex items-center gap-2">
            <TicketCheck className="h-4 w-4" />
            Rezervasyon Sorgula
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-4">
          {!selectedHotel ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Otel Ara</CardTitle>
                  <CardDescription>Tarih ve misafir sayısını seçerek arama yapın</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Giriş Tarihi</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkInDate ? format(checkInDate, 'PPP', { locale: tr }) : 'Giriş tarihi seçin'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={checkInDate}
                            onSelect={setCheckInDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Çıkış Tarihi</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkOutDate ? format(checkOutDate, 'PPP', { locale: tr }) : 'Çıkış tarihi seçin'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={checkOutDate}
                            onSelect={setCheckOutDate}
                            initialFocus
                            disabled={(date) => checkInDate ? date <= checkInDate : date <= new Date()}
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Misafir Sayısı</Label>
                      <Select value={guests} onValueChange={setGuests}>
                        <SelectTrigger>
                          <SelectValue placeholder="Misafir sayısı seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Kişi</SelectItem>
                          <SelectItem value="2">2 Kişi</SelectItem>
                          <SelectItem value="3">3 Kişi</SelectItem>
                          <SelectItem value="4">4 Kişi</SelectItem>
                          <SelectItem value="5">5 Kişi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-end">
                      <Button className="w-full" onClick={handleSearch}>
                        <Search className="mr-2 h-4 w-4" />
                        Otel Ara
                      </Button>
                    </div>
                  </div>
                  
                  {checkInDate && checkOutDate && (
                    <div className="text-sm text-muted-foreground">
                      Toplam konaklama: <span className="font-medium">{totalDays}</span> gece
                    </div>
                  )}
                </CardContent>
              </Card>

              {searchResults.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Arama Sonuçları</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {searchResults.map((hotel) => (
                      <Card key={hotel.id} className="overflow-hidden">
                        <div className="relative h-48 w-full">
                          <img 
                            src={hotel.image} 
                            alt={hotel.name}
                            className="h-full w-full object-cover"
                          />
                          <Badge className="absolute top-2 right-2 bg-primary">
                            {hotel.rating} ★
                          </Badge>
                        </div>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{hotel.name}</CardTitle>
                            <div className="text-lg font-bold">{hotel.price} ₺ <span className="text-sm font-normal">/ gece</span></div>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-1" /> 
                            {hotel.location}
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-sm">{hotel.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {hotel.amenities.map((amenity, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            className="w-full" 
                            onClick={() => handleSelectHotel(hotel)}
                          >
                            Rezervasyon Yap
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Rezervasyon</h3>
                <Button variant="outline" size="sm" onClick={() => setSelectedHotel(null)}>
                  Otellere Dön
                </Button>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/3">
                  <Card>
                    <div className="relative h-48 w-full">
                      <img 
                        src={selectedHotel.image} 
                        alt={selectedHotel.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{selectedHotel.name}</CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" /> 
                        {selectedHotel.location}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Giriş Tarihi:</span>
                          <span className="font-medium">{checkInDate ? format(checkInDate, 'dd MMM yyyy', { locale: tr }) : '-'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Çıkış Tarihi:</span>
                          <span className="font-medium">{checkOutDate ? format(checkOutDate, 'dd MMM yyyy', { locale: tr }) : '-'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Misafir Sayısı:</span>
                          <span className="font-medium">{guests} kişi</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Toplam Konaklama:</span>
                          <span className="font-medium">{totalDays} gece</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="w-full md:w-2/3 space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">1. Oda Seçimi</CardTitle>
                        {reservationStep > 1 && (
                          <Badge variant={selectedRoom ? "default" : "outline"}>
                            {selectedRoom || "Seçilmedi"}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    {reservationStep === 1 && (
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                            <SelectTrigger>
                              <SelectValue placeholder="Oda tipi seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Standart Oda">Standart Oda</SelectItem>
                              <SelectItem value="Deluxe Oda">Deluxe Oda</SelectItem>
                              <SelectItem value="Deluxe Deniz Manzaralı">Deluxe Deniz Manzaralı</SelectItem>
                              <SelectItem value="Aile Odası">Aile Odası</SelectItem>
                              <SelectItem value="Suite">Suite</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button 
                          className="w-full" 
                          onClick={handleContinueToFlights}
                          disabled={!selectedRoom}
                        >
                          Uçuşlara Devam Et
                        </Button>
                      </CardContent>
                    )}
                  </Card>

                  {showFlights && (
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">2. Uçuş Seçimi</CardTitle>
                          {reservationStep > 2 && (
                            <Badge variant={(selectedFlightTo && selectedFlightFrom) ? "default" : "outline"}>
                              {(selectedFlightTo && selectedFlightFrom) ? "Seçildi" : "Seçilmedi"}
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      {reservationStep === 2 && (
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium">Gidiş Uçuşu ({checkInDate ? format(checkInDate, 'dd MMM yyyy', { locale: tr }) : '-'})</h4>
                            <div className="space-y-2">
                              {flights.map(flight => (
                                <div 
                                  key={flight.id}
                                  className={`border rounded-lg p-3 flex justify-between items-center cursor-pointer hover:border-primary transition-colors ${selectedFlightTo === flight.id ? 'border-primary bg-primary/5' : ''}`}
                                  onClick={() => setSelectedFlightTo(flight.id)}
                                >
                                  <div className="flex items-center gap-3">
                                    <img src={flight.logo} alt={flight.airline} className="h-6" />
                                    <div>
                                      <div className="font-medium">{flight.airline}</div>
                                      <div className="text-sm text-muted-foreground">{flight.departure} - {flight.arrival}</div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-medium">{flight.price} ₺</div>
                                    <div className="text-sm">
                                      {flight.departureTime} <ArrowRight className="inline h-3 w-3" /> {flight.arrivalTime}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium">Dönüş Uçuşu ({checkOutDate ? format(checkOutDate, 'dd MMM yyyy', { locale: tr }) : '-'})</h4>
                            <div className="space-y-2">
                              {flights.map(flight => (
                                <div 
                                  key={`return-${flight.id}`}
                                  className={`border rounded-lg p-3 flex justify-between items-center cursor-pointer hover:border-primary transition-colors ${selectedFlightFrom === flight.id ? 'border-primary bg-primary/5' : ''}`}
                                  onClick={() => setSelectedFlightFrom(flight.id)}
                                >
                                  <div className="flex items-center gap-3">
                                    <img src={flight.logo} alt={flight.airline} className="h-6" />
                                    <div>
                                      <div className="font-medium">{flight.airline}</div>
                                      <div className="text-sm text-muted-foreground">{flight.arrival} - {flight.departure}</div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-medium">{flight.price} ₺</div>
                                    <div className="text-sm">
                                      {flight.departureTime} <ArrowRight className="inline h-3 w-3" /> {flight.arrivalTime}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <Button 
                            className="w-full" 
                            onClick={handleContinueToTransfer}
                            disabled={!selectedFlightTo || !selectedFlightFrom}
                          >
                            Transfer Seçimine Devam Et
                          </Button>
                        </CardContent>
                      )}
                    </Card>
                  )}

                  {showTransfer && (
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">3. Transfer Seçimi</CardTitle>
                          {reservationStep > 3 && (
                            <Badge variant={selectedTransfer ? "default" : "outline"}>
                              {selectedTransfer ? "Seçildi" : "Seçilmedi"}
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      {reservationStep === 3 && (
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium">Transfer Seçenekleri</h4>
                            <div className="space-y-2">
                              {transfers.map(transfer => (
                                <div 
                                  key={transfer.id}
                                  className={`border rounded-lg p-3 flex justify-between items-center cursor-pointer hover:border-primary transition-colors ${selectedTransfer === transfer.id ? 'border-primary bg-primary/5' : ''}`}
                                  onClick={() => setSelectedTransfer(transfer.id)}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 p-2 rounded-full">
                                      {transfer.icon}
                                    </div>
                                    <div>
                                      <div className="font-medium">{transfer.type}</div>
                                      <div className="text-sm text-muted-foreground">
                                        {transfer.capacity} - {transfer.distance}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-medium">{transfer.price} ₺{transfer.shared ? "/kişi" : ""}</div>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                      <Timer className="mr-1 h-3 w-3" /> {transfer.duration}
                                      {transfer.shared && <Badge className="ml-2 text-xs" variant="outline">Paylaşımlı</Badge>}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-3">
                            <div className="flex justify-between items-center font-medium">
                              <span>Toplam Tutar:</span>
                              <span className="text-lg">{calculateTotalPrice().toLocaleString()} ₺</span>
                            </div>
                            
                            <Button 
                              className="w-full" 
                              onClick={handleCompleteReservation}
                              disabled={!selectedTransfer}
                            >
                              <CreditCard className="mr-2 h-4 w-4" />
                              Rezervasyonu Tamamla
                            </Button>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  )}
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="lookup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rezervasyon Sorgula</CardTitle>
              <CardDescription>Rezervasyon kodunuzu girerek detayları görüntüleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input 
                  placeholder="Rezervasyon kodu (örn: RES123456)" 
                  value={reservationCode}
                  onChange={e => setReservationCode(e.target.value)}
                />
                <Button onClick={handleLookupReservation}>
                  <Search className="mr-2 h-4 w-4" />
                  Sorgula
                </Button>
              </div>
            </CardContent>
          </Card>

          {foundReservation && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Rezervasyon Detayları</CardTitle>
                  <Badge variant={foundReservation.status === "confirmed" ? "success" : "outline"}>
                    {foundReservation.status === "confirmed" ? "Onaylandı" : foundReservation.status}
                  </Badge>
                </div>
                <CardDescription>
                  Rezervasyon Kodu: <span className="font-medium">{foundReservation.code}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Otel Bilgileri</h3>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-2">
                          <div>
                            <span className="font-medium">Otel: </span>
                            {hotels.find(h => h.id === foundReservation.hotelId)?.name}
                          </div>
                          <div>
                            <span className="font-medium">Konaklama: </span>
                            {format(foundReservation.checkIn, 'dd MMM yyyy', { locale: tr })} - {format(foundReservation.checkOut, 'dd MMM yyyy', { locale: tr })}
                          </div>
                          <div>
                            <span className="font-medium">Oda Tipi: </span>
                            {foundReservation.room}
                          </div>
                          <div>
                            <span className="font-medium">Misafir Sayısı: </span>
                            {foundReservation.guests} kişi
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Uçuş Bilgileri</h3>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          <div>
                            <div className="font-medium">Gidiş Uçuşu:</div>
                            <div className="flex justify-between items-center mt-1">
                              <div className="flex items-center">
                                <Plane className="h-4 w-4 mr-2" />
                                <div>
                                  {flights.find(f => f.id === foundReservation.flightTo)?.airline} - {format(foundReservation.checkIn, 'dd MMM yyyy', { locale: tr })}
                                </div>
                              </div>
                              <div className="text-sm">
                                {flights.find(f => f.id === foundReservation.flightTo)?.departureTime} - {flights.find(f => f.id === foundReservation.flightTo)?.arrivalTime}
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="font-medium">Dönüş Uçuşu:</div>
                            <div className="flex justify-between items-center mt-1">
                              <div className="flex items-center">
                                <Plane className="h-4 w-4 mr-2" />
                                <div>
                                  {flights.find(f => f.id === foundReservation.flightFrom)?.airline} - {format(foundReservation.checkOut, 'dd MMM yyyy', { locale: tr })}
                                </div>
                              </div>
                              <div className="text-sm">
                                {flights.find(f => f.id === foundReservation.flightFrom)?.departureTime} - {flights.find(f => f.id === foundReservation.flightFrom)?.arrivalTime}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Transfer Bilgileri</h3>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          {transfers.find(t => t.id === foundReservation.transfer)?.icon}
                          <div className="ml-2">
                            <div className="font-medium">{transfers.find(t => t.id === foundReservation.transfer)?.type}</div>
                            <div className="text-sm text-muted-foreground">
                              {transfers.find(t => t.id === foundReservation.transfer)?.capacity} - {transfers.find(t => t.id === foundReservation.transfer)?.distance}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div>{transfers.find(t => t.id === foundReservation.transfer)?.price} ₺</div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Timer className="mr-1 h-3 w-3" /> {transfers.find(t => t.id === foundReservation.transfer)?.duration}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center font-medium">
                    <span>Toplam Tutar:</span>
                    <span className="text-lg">{foundReservation.totalPrice.toLocaleString()} ₺</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HotelReservation;
