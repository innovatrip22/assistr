
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, CheckCircle2, Clock, Users, XCircle, Info, Phone } from "lucide-react";

const mockReservations = [
  {
    id: 1,
    customerName: "Ali Yılmaz",
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    time: "19:00",
    people: 4,
    phone: "+90 555 123 4567",
    status: "pending",
    notes: "Pencere kenarı tercih ediliyor."
  },
  {
    id: 2,
    customerName: "Ayşe Demir",
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    time: "20:30",
    people: 2,
    phone: "+90 555 987 6543",
    status: "confirmed",
    notes: ""
  },
  {
    id: 3,
    customerName: "Mehmet Çelik",
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    time: "13:00",
    people: 6,
    phone: "+90 555 456 7890",
    status: "confirmed",
    notes: "Doğum günü kutlaması."
  },
  {
    id: 4,
    customerName: "Zeynep Kaya",
    date: new Date(new Date().setDate(new Date().getDate() + 3)),
    time: "18:00",
    people: 3,
    phone: "+90 555 789 0123",
    status: "pending",
    notes: ""
  },
  {
    id: 5,
    customerName: "Can Özkan",
    date: new Date(new Date().setDate(new Date().getDate() + 4)),
    time: "21:00",
    people: 8,
    phone: "+90 555 234 5678",
    status: "cancelled",
    notes: "Son dakika iptal."
  }
];

const formatDate = (date: Date) => {
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const BusinessReservations = () => {
  const [reservations] = useState(mockReservations);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  
  const handleConfirm = (id: number) => {
    // In a real app, this would update the reservation status
    alert(`Rezervasyon #${id} onaylandı.`);
  };
  
  const handleCancel = (id: number) => {
    // In a real app, this would update the reservation status
    alert(`Rezervasyon #${id} iptal edildi.`);
  };

  // Filter reservations by date and status
  const filteredReservations = reservations.filter(reservation => {
    const matchesDate = selectedDate 
      ? reservation.date.toDateString() === selectedDate.toDateString()
      : true;
    const matchesStatus = selectedStatus 
      ? reservation.status === selectedStatus
      : true;
    return matchesDate && matchesStatus;
  });

  // Count reservations by status
  const statusCounts = {
    all: reservations.length,
    pending: reservations.filter(r => r.status === "pending").length,
    confirmed: reservations.filter(r => r.status === "confirmed").length,
    cancelled: reservations.filter(r => r.status === "cancelled").length
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Takvim</CardTitle>
          <CardDescription>Rezervasyonları tarihe göre filtreleyin</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
          <div className="mt-4">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => setSelectedDate(undefined)}
            >
              Tüm Tarihleri Göster
            </Button>
          </div>
          
          <div className="mt-6 space-y-2">
            <h3 className="text-sm font-medium">Duruma Göre Filtrele</h3>
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant={selectedStatus === null ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedStatus(null)}
              >
                Tümü ({statusCounts.all})
              </Badge>
              <Badge 
                variant={selectedStatus === "pending" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedStatus("pending")}
              >
                Bekleyen ({statusCounts.pending})
              </Badge>
              <Badge 
                variant={selectedStatus === "confirmed" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedStatus("confirmed")}
              >
                Onaylı ({statusCounts.confirmed})
              </Badge>
              <Badge 
                variant={selectedStatus === "cancelled" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedStatus("cancelled")}
              >
                İptal ({statusCounts.cancelled})
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Rezervasyonlar</CardTitle>
          <CardDescription>
            {selectedDate 
              ? `${formatDate(selectedDate)} için rezervasyonlar` 
              : "Tüm rezervasyonlar"}
            {selectedStatus && ` - ${
              selectedStatus === "pending" ? "Bekleyen" : 
              selectedStatus === "confirmed" ? "Onaylı" : 
              "İptal"
            }`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredReservations.length === 0 ? (
            <div className="text-center py-10">
              <CalendarDays className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">
                {selectedDate 
                  ? `${formatDate(selectedDate)} için rezervasyon bulunamadı.`
                  : "Rezervasyon bulunamadı."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReservations.map(reservation => (
                <div 
                  key={reservation.id}
                  className="p-4 rounded-lg border flex flex-col md:flex-row md:items-center gap-4"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-medium">{reservation.customerName}</h3>
                      <Badge 
                        variant={
                          reservation.status === "confirmed" ? "success" :
                          reservation.status === "cancelled" ? "destructive" :
                          "outline"
                        }
                      >
                        {reservation.status === "pending" && "Bekleyen"}
                        {reservation.status === "confirmed" && "Onaylı"}
                        {reservation.status === "cancelled" && "İptal"}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center">
                        <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{formatDate(reservation.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Saat: {reservation.time}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{reservation.people} Kişi</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{reservation.phone}</span>
                      </div>
                    </div>
                    
                    {reservation.notes && (
                      <div className="mt-2 flex items-start">
                        <Info className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                        <span className="text-sm text-muted-foreground">{reservation.notes}</span>
                      </div>
                    )}
                  </div>
                  
                  {reservation.status === "pending" && (
                    <div className="flex gap-2 self-end md:self-center">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        onClick={() => handleConfirm(reservation.id)}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Onayla
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleCancel(reservation.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        İptal Et
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessReservations;
