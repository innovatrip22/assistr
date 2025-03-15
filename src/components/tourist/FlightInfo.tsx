
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plane, Search, MapPin, ArrowRight, Calendar, User, CreditCard } from "lucide-react";
import { format, addDays } from "date-fns";
import { tr } from "date-fns/locale";

const FlightInfo = () => {
  const [activeTab, setActiveTab] = useState("search");
  const [pnr, setPnr] = useState("");
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<any>(null);
  const [reservationStep, setReservationStep] = useState(1);
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  // Mock flight data
  const flightOptions = [
    {
      id: "f1",
      airline: "Turkish Airlines",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Turkish_Airlines_logo_2019_compact.svg/2560px-Turkish_Airlines_logo_2019_compact.svg.png",
      departureCity: "İstanbul",
      departureCode: "IST",
      arrivalCity: "Ercan",
      arrivalCode: "ECN",
      departureTime: "08:30",
      arrivalTime: "10:10",
      duration: "1s 40d",
      price: 1200,
      date: new Date(),
      aircraft: "Boeing 737-800",
      flightNumber: "TK982",
      baggage: "23 kg"
    },
    {
      id: "f2",
      airline: "Pegasus",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Pegasus_Airlines_logo.svg/2560px-Pegasus_Airlines_logo.svg.png",
      departureCity: "İstanbul",
      departureCode: "SAW",
      arrivalCity: "Ercan",
      arrivalCode: "ECN",
      departureTime: "12:45",
      arrivalTime: "14:25",
      duration: "1s 40d",
      price: 800,
      date: new Date(),
      aircraft: "Airbus A320",
      flightNumber: "PC1122",
      baggage: "20 kg"
    },
    {
      id: "f3",
      airline: "SunExpress",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/SunExpress_logo.svg/2560px-SunExpress_logo.svg.png",
      departureCity: "Ankara",
      departureCode: "ESB",
      arrivalCity: "Ercan",
      arrivalCode: "ECN",
      departureTime: "15:20",
      arrivalTime: "16:50",
      duration: "1s 30d",
      price: 950,
      date: new Date(),
      aircraft: "Boeing 737-800",
      flightNumber: "XQ7354",
      baggage: "15 kg"
    }
  ];

  // Handle PNR search
  const handlePNRSearch = () => {
    if (pnr === "098765" || pnr === "123456") {
      toast.success("PNR bulundu. Uçuş bilgileriniz görüntüleniyor.");
      // Select a random flight from mock data to display
      const randomFlight = flightOptions[Math.floor(Math.random() * flightOptions.length)];
      setSelectedFlight(randomFlight);
    } else {
      toast.error("Girilen PNR kodu ile ilgili bir kayıt bulunamadı.");
    }
  };

  // Handle flight search
  const handleFlightSearch = () => {
    if (!departureCity || !arrivalCity) {
      toast.error("Lütfen kalkış ve varış şehirlerini seçin");
      return;
    }

    // Simulate search with mock data
    toast.success("Uçuşlar bulundu!");
    setSearchResults(flightOptions);
  };

  // Handle flight selection
  const handleSelectFlight = (flight: any) => {
    setSelectedFlight(flight);
    setReservationStep(1);
  };

  // Handle payment submission
  const handlePaymentSubmit = () => {
    if (!paymentInfo.cardName || !paymentInfo.cardNumber || !paymentInfo.expiry || !paymentInfo.cvv) {
      toast.error("Lütfen tüm ödeme bilgilerini doldurun");
      return;
    }

    // Generate a random reservation code
    const reservationCode = `PNR${Math.floor(100000 + Math.random() * 900000)}`;
    
    toast.success("Rezervasyon başarıyla tamamlandı!");
    toast.info(`Rezervasyon kodunuz: ${reservationCode}`);
    
    // Reset form
    setReservationStep(1);
    setSelectedFlight(null);
    setSearchResults([]);
    setActiveTab("pnr");
    setPnr(reservationCode);
  };

  // Continue to payment step
  const handleContinueToPayment = () => {
    setReservationStep(2);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg overflow-hidden">
      <div className="flex items-center gap-3 p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <Plane className="w-6 h-6" />
        <h2 className="text-xl font-semibold">Uçuş Bilgileri</h2>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6 w-full bg-white/80 p-1 rounded-lg shadow-sm">
            <TabsTrigger 
              value="pnr" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all"
            >
              <Search className="h-4 w-4" />
              PNR Sorgula
            </TabsTrigger>
            <TabsTrigger 
              value="search" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all"
            >
              <Plane className="h-4 w-4" />
              Uçuş Ara
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pnr" className="space-y-4 animate-fadeIn">
            {!selectedFlight ? (
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl">PNR Sorgulama</CardTitle>
                  <CardDescription>
                    Rezervasyon kodunuzu girerek uçuş bilgilerinizi görüntüleyebilirsiniz
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="PNR Kodu Giriniz (örn: 098765)"
                      value={pnr}
                      onChange={(e) => setPnr(e.target.value)}
                      className="bg-white"
                    />
                    <Button 
                      onClick={handlePNRSearch}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-opacity"
                    >
                      <Search className="mr-2 h-4 w-4" />
                      Sorgula
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 italic">
                    * Test için "098765" veya "123456" PNR kodlarını kullanabilirsiniz.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <img src={selectedFlight.logo} alt={selectedFlight.airline} className="h-8" />
                        <div>
                          <h3 className="font-bold">{selectedFlight.airline}</h3>
                          <p className="text-sm">{selectedFlight.flightNumber}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{format(selectedFlight.date, 'dd MMMM yyyy', { locale: tr })}</p>
                        <p className="text-xs">PNR: {pnr}</p>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-6">
                      <div className="text-center">
                        <p className="text-3xl font-bold">{selectedFlight.departureTime}</p>
                        <p className="text-xl font-medium">{selectedFlight.departureCode}</p>
                        <p className="text-sm text-gray-600">{selectedFlight.departureCity}</p>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <p className="text-sm text-gray-500 mb-1">{selectedFlight.duration}</p>
                        <div className="relative w-32 md:w-48">
                          <div className="border-t-2 border-dashed border-gray-300 w-full"></div>
                          <Plane className="text-blue-600 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 -rotate-90" size={20} />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Direkt Uçuş</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-3xl font-bold">{selectedFlight.arrivalTime}</p>
                        <p className="text-xl font-medium">{selectedFlight.arrivalCode}</p>
                        <p className="text-sm text-gray-600">{selectedFlight.arrivalCity}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-500">Uçak</p>
                        <p className="font-medium">{selectedFlight.aircraft}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-500">Bagaj Hakkı</p>
                        <p className="font-medium">{selectedFlight.baggage}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-500">Durum</p>
                        <p className="font-medium text-green-600">Onaylandı</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedFlight(null)}
                    className="border-blue-500 text-blue-600 hover:bg-blue-50"
                  >
                    Yeni Sorgulama
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="search" className="space-y-4 animate-fadeIn">
            {!selectedFlight ? (
              <>
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl">Uçuş Ara</CardTitle>
                    <CardDescription>
                      Kalkış ve varış noktalarını seçerek uygun uçuşları bulabilirsiniz
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="departure">Nereden</Label>
                        <Select value={departureCity} onValueChange={setDepartureCity}>
                          <SelectTrigger id="departure" className="bg-white">
                            <SelectValue placeholder="Kalkış noktası seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="istanbul">İstanbul</SelectItem>
                            <SelectItem value="ankara">Ankara</SelectItem>
                            <SelectItem value="izmir">İzmir</SelectItem>
                            <SelectItem value="antalya">Antalya</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="arrival">Nereye</Label>
                        <Select value={arrivalCity} onValueChange={setArrivalCity}>
                          <SelectTrigger id="arrival" className="bg-white">
                            <SelectValue placeholder="Varış noktası seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ercan">Ercan</SelectItem>
                            <SelectItem value="larnaka">Larnaka</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="departure-date">Gidiş Tarihi</Label>
                        <Input 
                          id="departure-date" 
                          type="date" 
                          defaultValue={format(new Date(), 'yyyy-MM-dd')}
                          className="bg-white"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="return-date">Dönüş Tarihi</Label>
                        <Input 
                          id="return-date" 
                          type="date"
                          defaultValue={format(addDays(new Date(), 7), 'yyyy-MM-dd')}
                          className="bg-white"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="passengers">Yolcu Sayısı</Label>
                        <Select value={passengers} onValueChange={setPassengers}>
                          <SelectTrigger id="passengers" className="bg-white">
                            <SelectValue placeholder="Yolcu sayısı seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Yolcu</SelectItem>
                            <SelectItem value="2">2 Yolcu</SelectItem>
                            <SelectItem value="3">3 Yolcu</SelectItem>
                            <SelectItem value="4">4 Yolcu</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleFlightSearch} 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-opacity"
                    >
                      <Search className="mr-2 h-4 w-4" />
                      Uçuş Ara
                    </Button>
                  </CardContent>
                </Card>
                
                {searchResults.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Bulunan Uçuşlar</h3>
                    <div className="space-y-3">
                      {searchResults.map((flight) => (
                        <Card 
                          key={flight.id} 
                          className="bg-white/90 backdrop-blur-sm border-0 shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                          onClick={() => handleSelectFlight(flight)}
                        >
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row justify-between items-center">
                              <div className="flex items-center gap-3 mb-3 md:mb-0">
                                <img src={flight.logo} alt={flight.airline} className="h-8" />
                                <div>
                                  <p className="font-semibold">{flight.airline}</p>
                                  <p className="text-xs text-gray-500">{flight.flightNumber}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-4 mb-3 md:mb-0">
                                <div className="text-center">
                                  <p className="font-semibold">{flight.departureTime}</p>
                                  <p className="text-xs text-gray-500">{flight.departureCode}</p>
                                </div>
                                
                                <div className="flex flex-col items-center px-4">
                                  <p className="text-xs text-gray-500">{flight.duration}</p>
                                  <div className="relative w-16 md:w-24">
                                    <div className="border-t border-gray-300 w-full"></div>
                                    <ArrowRight className="text-gray-400 absolute top-1/2 right-0 transform -translate-y-1/2" size={12} />
                                  </div>
                                  <p className="text-xs text-gray-500">Direkt</p>
                                </div>
                                
                                <div className="text-center">
                                  <p className="font-semibold">{flight.arrivalTime}</p>
                                  <p className="text-xs text-gray-500">{flight.arrivalCode}</p>
                                </div>
                              </div>
                              
                              <div className="text-center md:text-right">
                                <p className="text-lg font-bold text-blue-600">{flight.price} ₺</p>
                                <p className="text-xs text-gray-500">Kişi Başı</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-4">
                {reservationStep === 1 ? (
                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-md overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
                      <h3 className="text-lg font-semibold">Uçuş Detayları</h3>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold">{selectedFlight.departureTime}</p>
                          <p className="text-xl font-medium">{selectedFlight.departureCode}</p>
                          <p className="text-sm text-gray-600">{selectedFlight.departureCity}</p>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <p className="text-sm text-gray-500 mb-1">{selectedFlight.duration}</p>
                          <div className="relative w-32 md:w-48">
                            <div className="border-t-2 border-dashed border-gray-300 w-full"></div>
                            <Plane className="text-blue-600 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 -rotate-90" size={20} />
                          </div>
                          <p className="text-sm text-gray-500 mt-1">Direkt Uçuş</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-3xl font-bold">{selectedFlight.arrivalTime}</p>
                          <p className="text-xl font-medium">{selectedFlight.arrivalCode}</p>
                          <p className="text-sm text-gray-600">{selectedFlight.arrivalCity}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">Uçak</p>
                          <p className="font-medium">{selectedFlight.aircraft}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">Bagaj Hakkı</p>
                          <p className="font-medium">{selectedFlight.baggage}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">Yolcu Sayısı</p>
                          <p className="font-medium">{passengers} Kişi</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pt-4 border-t">
                        <div>
                          <p className="text-gray-500">Toplam Tutar</p>
                          <p className="text-2xl font-bold text-blue-600">
                            {(selectedFlight.price * parseInt(passengers)).toLocaleString()} ₺
                          </p>
                        </div>
                        
                        <Button 
                          onClick={handleContinueToPayment}
                          className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-opacity"
                        >
                          Ödemeye Devam Et
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-md overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
                      <h3 className="text-lg font-semibold">Ödeme Bilgileri</h3>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="card-name">Kart Üzerindeki İsim</Label>
                            <Input 
                              id="card-name" 
                              placeholder="Ad Soyad" 
                              value={paymentInfo.cardName}
                              onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                              className="bg-white"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="card-number">Kart Numarası</Label>
                            <Input 
                              id="card-number" 
                              placeholder="0000 0000 0000 0000" 
                              value={paymentInfo.cardNumber}
                              onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                              className="bg-white"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Son Kullanma Tarihi</Label>
                              <Input 
                                id="expiry" 
                                placeholder="AA/YY" 
                                value={paymentInfo.expiry}
                                onChange={(e) => setPaymentInfo({...paymentInfo, expiry: e.target.value})}
                                className="bg-white"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV</Label>
                              <Input 
                                id="cvv" 
                                placeholder="123" 
                                value={paymentInfo.cvv}
                                onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                                className="bg-white"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pt-4 border-t">
                          <div>
                            <p className="text-gray-500">Ödenecek Tutar</p>
                            <p className="text-2xl font-bold text-blue-600">
                              {(selectedFlight.price * parseInt(passengers)).toLocaleString()} ₺
                            </p>
                          </div>
                          
                          <div className="flex gap-3 w-full md:w-auto">
                            <Button 
                              variant="outline" 
                              onClick={() => setReservationStep(1)}
                              className="flex-1 md:flex-auto border-blue-500 text-blue-600 hover:bg-blue-50"
                            >
                              Geri
                            </Button>
                            <Button 
                              onClick={handlePaymentSubmit}
                              className="flex-1 md:flex-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-opacity"
                            >
                              <CreditCard className="mr-2 h-4 w-4" />
                              Ödemeyi Tamamla
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FlightInfo;
