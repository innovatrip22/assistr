
import { useState } from "react";
import { format, addDays } from "date-fns";
import { tr } from "date-fns/locale";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { 
  Hotel, 
  Plane, 
  Calendar, 
  MapPin, 
  Users, 
  Search, 
  CreditCard, 
  Bookmark, 
  Car, 
  Bus,
  ArrowLeftRight,
  Loader2
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

// Mock data for hotels
const mockHotels = [
  {
    id: "h1",
    name: "Merit Royal Hotel",
    location: "Girne, KKTC",
    rating: 5,
    price: 220,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Havuz", "Spa", "Restoran", "Bar", "Wifi"]
  },
  {
    id: "h2",
    name: "Acapulco Resort",
    location: "Girne, KKTC",
    rating: 4.5,
    price: 180,
    image: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Havuz", "Plaj", "Restoran", "Bar", "Wifi"]
  },
  {
    id: "h3",
    name: "Salamis Bay Conti Resort",
    location: "Gazimağusa, KKTC",
    rating: 4,
    price: 160,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Havuz", "Plaj", "Restoran", "Bar", "Wifi"]
  }
];

// Mock data for existing reservations
const mockReservations = [
  {
    id: "RES12345",
    hotelName: "Merit Royal Hotel",
    location: "Girne, KKTC",
    checkIn: "2023-08-15",
    checkOut: "2023-08-20",
    guests: 2,
    roomType: "Deluxe",
    totalPrice: 1100,
    status: "confirmed",
    flightInfo: {
      outbound: {
        flightNo: "TK1214",
        departure: "Istanbul",
        departureDate: "2023-08-15",
        departureTime: "09:30",
        arrival: "Ercan",
        arrivalTime: "11:30",
      },
      inbound: {
        flightNo: "TK1215",
        departure: "Ercan",
        departureDate: "2023-08-20",
        departureTime: "16:30",
        arrival: "Istanbul",
        arrivalTime: "18:30",
      }
    },
    transferBooked: true,
    transferType: "Özel Transfer"
  }
];

// Form validation schema
const reservationSchema = z.object({
  location: z.string().min(1, { message: "Konum seçiniz" }),
  checkIn: z.date({ required_error: "Giriş tarihi seçiniz" }),
  checkOut: z.date({ required_error: "Çıkış tarihi seçiniz" }),
  guests: z.string().min(1, { message: "Kişi sayısı seçiniz" }),
  roomType: z.string().optional(),
});

const transferSchema = z.object({
  transferType: z.enum(["private", "shared", "none"], {
    required_error: "Transfer tipi seçiniz",
  }),
  passengers: z.string().min(1, { message: "Yolcu sayısı seçiniz" }),
});

const flightSchema = z.object({
  departureAirport: z.string().min(1, { message: "Kalkış havalimanı seçiniz" }),
  arrivalAirport: z.string().min(1, { message: "Varış havalimanı seçiniz" }),
  departureDate: z.date({ required_error: "Gidiş tarihi seçiniz" }),
  returnDate: z.date({ required_error: "Dönüş tarihi seçiniz" }),
  passengers: z.string().min(1, { message: "Yolcu sayısı seçiniz" }),
});

const HotelReservation = () => {
  const [activeTab, setActiveTab] = useState("search");
  const [searchResults, setSearchResults] = useState<typeof mockHotels | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [viewReservation, setViewReservation] = useState<(typeof mockReservations)[0] | null>(null);
  const [reservationCode, setReservationCode] = useState("");
  const [searchingReservation, setSearchingReservation] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<(typeof mockHotels)[0] | null>(null);
  const [bookingStep, setBookingStep] = useState(1);

  // Form for hotel search
  const hotelForm = useForm<z.infer<typeof reservationSchema>>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      location: "",
      guests: "2",
    },
  });

  // Form for flight booking
  const flightForm = useForm<z.infer<typeof flightSchema>>({
    resolver: zodResolver(flightSchema),
    defaultValues: {
      departureAirport: "Istanbul",
      arrivalAirport: "Ercan",
      passengers: "2",
    },
  });

  // Form for transfer booking
  const transferForm = useForm<z.infer<typeof transferSchema>>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      transferType: "private",
      passengers: "2",
    },
  });

  // Watch form values to sync
  const checkInDate = hotelForm.watch("checkIn");
  const checkOutDate = hotelForm.watch("checkOut");
  const guestCount = hotelForm.watch("guests");

  // Update flight dates to match hotel dates
  const updateFlightDates = () => {
    if (checkInDate) {
      flightForm.setValue("departureDate", checkInDate);
    }
    if (checkOutDate) {
      flightForm.setValue("returnDate", checkOutDate);
    }
    if (guestCount) {
      flightForm.setValue("passengers", guestCount);
      transferForm.setValue("passengers", guestCount);
    }
  };

  // Handle search for hotels
  const onSearchHotels = (data: z.infer<typeof reservationSchema>) => {
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setSearchResults(mockHotels);
      setIsSearching(false);
    }, 1500);
  };

  // Handle looking up a reservation
  const handleReservationLookup = () => {
    if (!reservationCode) {
      toast.error("Rezervasyon kodu giriniz.");
      return;
    }

    setSearchingReservation(true);
    // Simulate API call
    setTimeout(() => {
      const found = mockReservations.find(res => res.id === reservationCode);
      if (found) {
        setViewReservation(found);
        toast.success("Rezervasyon bulundu.");
      } else {
        toast.error("Rezervasyon bulunamadı. Lütfen kodu kontrol ediniz.");
      }
      setSearchingReservation(false);
    }, 1500);
  };

  // Handle selecting a hotel
  const handleSelectHotel = (hotel: typeof mockHotels[0]) => {
    setSelectedHotel(hotel);
    setBookingStep(2);
    updateFlightDates();
  };

  // Handle booking flight
  const onBookFlight = (data: z.infer<typeof flightSchema>) => {
    setBookingStep(3);
  };

  // Handle booking transfer
  const onBookTransfer = (data: z.infer<typeof transferSchema>) => {
    setBookingStep(4);
  };

  // Handle completing booking
  const handleCompleteBooking = () => {
    toast.success("Rezervasyon tamamlandı! Rezervasyon kodunuz: RES" + Math.floor(10000 + Math.random() * 90000));
    // Reset all
    setSelectedHotel(null);
    setBookingStep(1);
    setSearchResults(null);
    hotelForm.reset();
    flightForm.reset();
    transferForm.reset();
    setActiveTab("search");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Hotel className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">Otel & Seyahat Rezervasyonları</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="search">
            <Search className="mr-2 h-4 w-4" />
            Otel Ara
          </TabsTrigger>
          <TabsTrigger value="booking">
            <Calendar className="mr-2 h-4 w-4" />
            Rezervasyon Yap
          </TabsTrigger>
          <TabsTrigger value="view">
            <Bookmark className="mr-2 h-4 w-4" />
            Rezervasyonlarım
          </TabsTrigger>
        </TabsList>

        <div className="border rounded-lg p-4 min-h-[500px]">
          {/* Hotel Search Tab */}
          <TabsContent value="search" className="mt-0">
            <Form {...hotelForm}>
              <form onSubmit={hotelForm.handleSubmit(onSearchHotels)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <FormField
                    control={hotelForm.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Konum</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Konum seçin" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="girne">Girne, KKTC</SelectItem>
                            <SelectItem value="gazimagusa">Gazimağusa, KKTC</SelectItem>
                            <SelectItem value="lefkosa">Lefkoşa, KKTC</SelectItem>
                            <SelectItem value="guzelyurt">Güzelyurt, KKTC</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={hotelForm.control}
                    name="checkIn"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Giriş Tarihi</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: tr })
                                ) : (
                                  <span>Tarih seçin</span>
                                )}
                                <Calendar className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              locale={tr}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={hotelForm.control}
                    name="checkOut"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Çıkış Tarihi</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: tr })
                                ) : (
                                  <span>Tarih seçin</span>
                                )}
                                <Calendar className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => 
                                date < (hotelForm.getValues("checkIn") || new Date())
                              }
                              locale={tr}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={hotelForm.control}
                    name="guests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kişi Sayısı</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Kişi sayısı seçin" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1 Kişi</SelectItem>
                            <SelectItem value="2">2 Kişi</SelectItem>
                            <SelectItem value="3">3 Kişi</SelectItem>
                            <SelectItem value="4">4 Kişi</SelectItem>
                            <SelectItem value="5">5 Kişi</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSearching}>
                  {isSearching ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Aranıyor...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Otel Ara
                    </>
                  )}
                </Button>
              </form>
            </Form>

            {searchResults && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Arama Sonuçları</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.map((hotel) => (
                    <Card key={hotel.id} className="overflow-hidden">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-48 object-cover"
                      />
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{hotel.name}</CardTitle>
                          <Badge>{hotel.rating} ★</Badge>
                        </div>
                        <CardDescription className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {hotel.location}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {hotel.amenities.map((amenity, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                        <p className="font-bold text-lg">{hotel.price} € / gece</p>
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
          </TabsContent>

          {/* Booking Process Tab */}
          <TabsContent value="booking" className="mt-0">
            {!selectedHotel ? (
              <div className="text-center py-12">
                <Hotel className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Henüz bir otel seçmediniz</h3>
                <p className="text-muted-foreground mb-4">
                  Rezervasyon yapmak için önce otel araması yapınız.
                </p>
                <Button onClick={() => setActiveTab("search")}>
                  Otel Aramaya Git
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Stepper */}
                <div className="flex justify-between items-center mb-6">
                  {[1, 2, 3, 4].map((step) => (
                    <div 
                      key={step} 
                      className={`flex flex-col items-center ${bookingStep >= step ? 'text-primary' : 'text-muted-foreground'}`}
                    >
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center mb-1
                        ${bookingStep === step ? 'bg-primary text-white' : 
                          bookingStep > step ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}
                      `}>
                        {step}
                      </div>
                      <span className="text-xs font-medium">
                        {step === 1 ? 'Otel' : 
                          step === 2 ? 'Uçuş' : 
                          step === 3 ? 'Transfer' : 'Ödeme'}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Selected Hotel Summary - Always visible during booking process */}
                <div className="bg-muted p-4 rounded-lg flex gap-4 items-center">
                  <img 
                    src={selectedHotel.image} 
                    alt={selectedHotel.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{selectedHotel.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedHotel.location}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge>{selectedHotel.rating} ★</Badge>
                      <Badge variant="outline" className="text-xs">
                        {hotelForm.getValues('checkIn') && hotelForm.getValues('checkOut') && 
                          format(hotelForm.getValues('checkIn')!, "d MMM", { locale: tr }) + 
                          " - " + 
                          format(hotelForm.getValues('checkOut')!, "d MMM", { locale: tr })
                        }
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {hotelForm.getValues('guests')} Misafir
                      </Badge>
                    </div>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="font-bold text-lg">{selectedHotel.price} € / gece</p>
                    {hotelForm.getValues('checkIn') && hotelForm.getValues('checkOut') && (
                      <p className="text-sm text-muted-foreground">
                        Toplam: {selectedHotel.price * 
                          (Math.floor((hotelForm.getValues('checkOut')!.getTime() - 
                          hotelForm.getValues('checkIn')!.getTime()) / (1000 * 60 * 60 * 24))) || 1} €
                      </p>
                    )}
                  </div>
                </div>

                {/* Step 2: Flight Booking */}
                {bookingStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Uçuş Bilgileri</h3>
                    <Form {...flightForm}>
                      <form onSubmit={flightForm.handleSubmit(onBookFlight)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={flightForm.control}
                            name="departureAirport"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Kalkış Havalimanı</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Havalimanı seçin" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Istanbul">İstanbul Havalimanı</SelectItem>
                                    <SelectItem value="Ankara">Ankara Esenboğa</SelectItem>
                                    <SelectItem value="Izmir">İzmir Adnan Menderes</SelectItem>
                                    <SelectItem value="Antalya">Antalya Havalimanı</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={flightForm.control}
                            name="arrivalAirport"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Varış Havalimanı</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Havalimanı seçin" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Ercan">Ercan Havalimanı (KKTC)</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={flightForm.control}
                            name="departureDate"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Gidiş Tarihi</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP", { locale: tr })
                                        ) : (
                                          <span>Tarih seçin</span>
                                        )}
                                        <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <CalendarComponent
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) => date < new Date()}
                                      locale={tr}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={flightForm.control}
                            name="returnDate"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Dönüş Tarihi</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP", { locale: tr })
                                        ) : (
                                          <span>Tarih seçin</span>
                                        )}
                                        <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <CalendarComponent
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) => 
                                        date < (flightForm.getValues("departureDate") || new Date())
                                      }
                                      locale={tr}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={flightForm.control}
                          name="passengers"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Yolcu Sayısı</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Yolcu sayısı seçin" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="1">1 Yolcu</SelectItem>
                                  <SelectItem value="2">2 Yolcu</SelectItem>
                                  <SelectItem value="3">3 Yolcu</SelectItem>
                                  <SelectItem value="4">4 Yolcu</SelectItem>
                                  <SelectItem value="5">5 Yolcu</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Mock flight options */}
                        <div className="border rounded-md p-4 space-y-3">
                          <h4 className="font-medium">Uygun Uçuşlar</h4>
                          
                          {/* Outbound */}
                          <div className="p-3 border rounded-md bg-background">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Gidiş Uçuşu</span>
                              <Badge>Seçildi</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">09:30</p>
                                <p className="text-xs text-muted-foreground">İstanbul</p>
                              </div>
                              <div className="flex flex-col items-center">
                                <ArrowLeftRight className="w-4 h-4 text-muted-foreground mb-1" />
                                <p className="text-xs text-muted-foreground">2 saat</p>
                                <p className="text-xs font-medium">TK1214</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">11:30</p>
                                <p className="text-xs text-muted-foreground">Ercan</p>
                              </div>
                            </div>
                          </div>

                          {/* Return */}
                          <div className="p-3 border rounded-md bg-background">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Dönüş Uçuşu</span>
                              <Badge>Seçildi</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">16:30</p>
                                <p className="text-xs text-muted-foreground">Ercan</p>
                              </div>
                              <div className="flex flex-col items-center">
                                <ArrowLeftRight className="w-4 h-4 text-muted-foreground mb-1" />
                                <p className="text-xs text-muted-foreground">2 saat</p>
                                <p className="text-xs font-medium">TK1215</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">18:30</p>
                                <p className="text-xs text-muted-foreground">İstanbul</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between text-sm mt-2">
                            <span>Toplam:</span>
                            <span className="font-bold">280 €</span>
                          </div>
                        </div>

                        <div className="flex justify-between gap-2">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setBookingStep(1)}
                          >
                            Geri
                          </Button>
                          <Button type="submit">
                            Uçuş Bilgilerini Onayla ve Devam Et
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                )}

                {/* Step 3: Transfer Booking */}
                {bookingStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Transfer Seçenekleri</h3>
                    <Form {...transferForm}>
                      <form onSubmit={transferForm.handleSubmit(onBookTransfer)} className="space-y-4">
                        <FormField
                          control={transferForm.control}
                          name="transferType"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Transfer Tipi</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="space-y-1"
                                >
                                  <div className="flex items-center space-x-2 p-4 border rounded-md">
                                    <RadioGroupItem value="private" id="private" />
                                    <div className="grid gap-1 flex-1">
                                      <Label htmlFor="private" className="font-medium">Özel Transfer</Label>
                                      <p className="text-sm text-muted-foreground">
                                        Size özel araç ile konforlu transfer
                                      </p>
                                    </div>
                                    <div className="font-medium">60 €</div>
                                  </div>
                                  <div className="flex items-center space-x-2 p-4 border rounded-md">
                                    <RadioGroupItem value="shared" id="shared" />
                                    <div className="grid gap-1 flex-1">
                                      <Label htmlFor="shared" className="font-medium">Paylaşımlı Transfer</Label>
                                      <p className="text-sm text-muted-foreground">
                                        Diğer yolcular ile paylaşımlı araç
                                      </p>
                                    </div>
                                    <div className="font-medium">25 €</div>
                                  </div>
                                  <div className="flex items-center space-x-2 p-4 border rounded-md">
                                    <RadioGroupItem value="none" id="none" />
                                    <div className="grid gap-1 flex-1">
                                      <Label htmlFor="none" className="font-medium">Transfer İstemiyorum</Label>
                                      <p className="text-sm text-muted-foreground">
                                        Kendi ulaşımımı sağlayacağım
                                      </p>
                                    </div>
                                    <div className="font-medium">0 €</div>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={transferForm.control}
                          name="passengers"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Yolcu Sayısı</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Yolcu sayısı seçin" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="1">1 Yolcu</SelectItem>
                                  <SelectItem value="2">2 Yolcu</SelectItem>
                                  <SelectItem value="3">3 Yolcu</SelectItem>
                                  <SelectItem value="4">4 Yolcu</SelectItem>
                                  <SelectItem value="5">5 Yolcu</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="p-4 border rounded-md bg-muted/50">
                          <h4 className="font-medium mb-2">Transfer Bilgileri</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Gidiş Transferi:</span>
                              <span>Ercan Havalimanı → {selectedHotel.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Dönüş Transferi:</span>
                              <span>{selectedHotel.name} → Ercan Havalimanı</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Mesafe:</span>
                              <span>~45 km (yaklaşık 40 dakika)</span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between font-medium">
                              <span>Transfer ücreti:</span>
                              <span>{transferForm.getValues("transferType") === "private" ? "60 €" : 
                                     transferForm.getValues("transferType") === "shared" ? "25 €" : "0 €"}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between gap-2">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setBookingStep(2)}
                          >
                            Geri
                          </Button>
                          <Button type="submit">
                            Transfer Bilgilerini Onayla ve Devam Et
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                )}

                {/* Step 4: Payment & Confirmation */}
                {bookingStep === 4 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Ödeme ve Onay</h3>
                    
                    <div className="border rounded-md p-4 space-y-4">
                      <h4 className="font-medium">Rezervasyon Özeti</h4>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Hotel className="w-5 h-5 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-medium">{selectedHotel.name}</p>
                            <p className="text-sm text-muted-foreground">{selectedHotel.location}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Giriş Tarihi</p>
                            <p className="font-medium">
                              {hotelForm.getValues('checkIn') && 
                                format(hotelForm.getValues('checkIn')!, "PPP", { locale: tr })}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Çıkış Tarihi</p>
                            <p className="font-medium">
                              {hotelForm.getValues('checkOut') && 
                                format(hotelForm.getValues('checkOut')!, "PPP", { locale: tr })}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Misafir Sayısı</p>
                            <p className="font-medium">{hotelForm.getValues('guests')} Kişi</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Konaklama</p>
                            <p className="font-medium">
                              {hotelForm.getValues('checkIn') && hotelForm.getValues('checkOut') && 
                                Math.floor((hotelForm.getValues('checkOut')!.getTime() - 
                                hotelForm.getValues('checkIn')!.getTime()) / (1000 * 60 * 60 * 24)) || 1} Gece
                            </p>
                          </div>
                        </div>
                      </div>

                      <Separator />
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Plane className="w-5 h-5 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-medium">Uçuş Bilgileri</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Gidiş:</span>
                            <span>
                              {flightForm.getValues('departureAirport')} → {flightForm.getValues('arrivalAirport')}
                              {" "}({flightForm.getValues('departureDate') && 
                                format(flightForm.getValues('departureDate')!, "d MMM", { locale: tr })})
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Dönüş:</span>
                            <span>
                              {flightForm.getValues('arrivalAirport')} → {flightForm.getValues('departureAirport')}
                              {" "}({flightForm.getValues('returnDate') && 
                                format(flightForm.getValues('returnDate')!, "d MMM", { locale: tr })})
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Yolcu:</span>
                            <span>{flightForm.getValues('passengers')} Kişi</span>
                          </div>
                        </div>
                      </div>

                      <Separator />
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Car className="w-5 h-5 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-medium">Transfer Bilgileri</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Transfer Tipi:</span>
                            <span>
                              {transferForm.getValues('transferType') === 'private' 
                                ? 'Özel Transfer' 
                                : transferForm.getValues('transferType') === 'shared' 
                                ? 'Paylaşımlı Transfer' 
                                : 'Transfer Yok'}
                            </span>
                          </div>
                          {transferForm.getValues('transferType') !== 'none' && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Yolcu:</span>
                                <span>{transferForm.getValues('passengers')} Kişi</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Mesafe:</span>
                                <span>~45 km</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <Separator />
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Otel:</span>
                          <span>
                            {hotelForm.getValues('checkIn') && hotelForm.getValues('checkOut') && 
                              (selectedHotel.price * 
                                (Math.floor((hotelForm.getValues('checkOut')!.getTime() - 
                                hotelForm.getValues('checkIn')!.getTime()) / (1000 * 60 * 60 * 24))) || 1)} €
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Uçuş:</span>
                          <span>280 €</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Transfer:</span>
                          <span>
                            {transferForm.getValues('transferType') === 'private' 
                              ? '60 €' 
                              : transferForm.getValues('transferType') === 'shared' 
                              ? '25 €' 
                              : '0 €'}
                          </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold">
                          <span>Toplam:</span>
                          <span>
                            {hotelForm.getValues('checkIn') && hotelForm.getValues('checkOut') && 
                              ((selectedHotel.price * 
                                (Math.floor((hotelForm.getValues('checkOut')!.getTime() - 
                                hotelForm.getValues('checkIn')!.getTime()) / (1000 * 60 * 60 * 24)) || 1)) + 
                                280 + 
                                (transferForm.getValues('transferType') === 'private' 
                                  ? 60 
                                  : transferForm.getValues('transferType') === 'shared' 
                                  ? 25 
                                  : 0))} €
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-md p-4">
                      <h4 className="font-medium mb-3">Ödeme Bilgileri</h4>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Kart Üzerindeki İsim</Label>
                          <Input id="cardName" placeholder="Kart sahibinin adı" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Kart Numarası</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Son Kullanma Tarihi</Label>
                            <Input id="expiryDate" placeholder="AA/YY" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between gap-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setBookingStep(3)}
                      >
                        Geri
                      </Button>
                      <Button onClick={handleCompleteBooking}>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Ödemeyi Tamamla ve Rezervasyonu Onayla
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          {/* View Reservations Tab */}
          <TabsContent value="view" className="mt-0">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="col-span-2">
                  <Label htmlFor="reservationCode" className="mb-2 block">Rezervasyon Kodu</Label>
                  <Input 
                    id="reservationCode" 
                    placeholder="Örn: RES12345" 
                    value={reservationCode}
                    onChange={(e) => setReservationCode(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleReservationLookup}
                  disabled={searchingReservation}
                >
                  {searchingReservation ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Aranıyor...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Rezervasyon Ara
                    </>
                  )}
                </Button>
              </div>

              {viewReservation ? (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{viewReservation.hotelName}</CardTitle>
                        <CardDescription>{viewReservation.location}</CardDescription>
                      </div>
                      <Badge variant={viewReservation.status === "confirmed" ? "default" : "secondary"}>
                        {viewReservation.status === "confirmed" ? "Onaylandı" : "Beklemede"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Reservation details */}
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold flex items-center">
                          <Hotel className="mr-2 h-5 w-5" />
                          Rezervasyon Detayları
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Rezervasyon No:</span>
                            <span className="font-medium">{viewReservation.id}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Giriş Tarihi:</span>
                            <span>
                              {format(new Date(viewReservation.checkIn), "PPP", { locale: tr })}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Çıkış Tarihi:</span>
                            <span>
                              {format(new Date(viewReservation.checkOut), "PPP", { locale: tr })}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Misafir Sayısı:</span>
                            <span>{viewReservation.guests} Kişi</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Oda Tipi:</span>
                            <span>{viewReservation.roomType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Toplam Tutar:</span>
                            <span className="font-bold">{viewReservation.totalPrice} €</span>
                          </div>
                        </div>
                      </div>

                      {/* Flight details */}
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold flex items-center">
                          <Plane className="mr-2 h-5 w-5" />
                          Uçuş Bilgileri
                        </h4>
                        <div className="space-y-4 text-sm">
                          <div className="border rounded-md p-3 bg-background">
                            <div className="mb-2 text-muted-foreground">Gidiş Uçuşu</div>
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{viewReservation.flightInfo.outbound.departureTime}</p>
                                <p className="text-xs text-muted-foreground">{viewReservation.flightInfo.outbound.departure}</p>
                              </div>
                              <div className="flex flex-col items-center">
                                <ArrowLeftRight className="w-4 h-4 text-muted-foreground mb-1" />
                                <p className="text-xs font-medium">{viewReservation.flightInfo.outbound.flightNo}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{viewReservation.flightInfo.outbound.arrivalTime}</p>
                                <p className="text-xs text-muted-foreground">{viewReservation.flightInfo.outbound.arrival}</p>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {format(new Date(viewReservation.flightInfo.outbound.departureDate), "d MMMM yyyy", { locale: tr })}
                            </p>
                          </div>

                          <div className="border rounded-md p-3 bg-background">
                            <div className="mb-2 text-muted-foreground">Dönüş Uçuşu</div>
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{viewReservation.flightInfo.inbound.departureTime}</p>
                                <p className="text-xs text-muted-foreground">{viewReservation.flightInfo.inbound.departure}</p>
                              </div>
                              <div className="flex flex-col items-center">
                                <ArrowLeftRight className="w-4 h-4 text-muted-foreground mb-1" />
                                <p className="text-xs font-medium">{viewReservation.flightInfo.inbound.flightNo}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{viewReservation.flightInfo.inbound.arrivalTime}</p>
                                <p className="text-xs text-muted-foreground">{viewReservation.flightInfo.inbound.arrival}</p>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {format(new Date(viewReservation.flightInfo.inbound.departureDate), "d MMMM yyyy", { locale: tr })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Transfer details */}
                    {viewReservation.transferBooked && (
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold flex items-center">
                          <Car className="mr-2 h-5 w-5" />
                          Transfer Bilgileri
                        </h4>
                        <div className="border rounded-md p-4 bg-muted/30">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Transfer Tipi</p>
                              <p className="font-medium">{viewReservation.transferType}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Yolcu Sayısı</p>
                              <p className="font-medium">{viewReservation.guests} Kişi</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Gidiş Transferi</p>
                              <p>Ercan Havalimanı → {viewReservation.hotelName}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Dönüş Transferi</p>
                              <p>{viewReservation.hotelName} → Ercan Havalimanı</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setViewReservation(null)}>
                      Kapat
                    </Button>
                    <Button>
                      Rezervasyonu Yazdır
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Rezervasyon Bulunamadı</h3>
                  <p className="text-muted-foreground mb-4">
                    Rezervasyon kodunuzu girerek rezervasyon detaylarınızı görüntüleyebilirsiniz.
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Örnek rezervasyon kodu: RES12345
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default HotelReservation;
