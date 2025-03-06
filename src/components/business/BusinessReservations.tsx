
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Info, Check, X, Phone, User, Users, Edit, Trash2, Plus } from "lucide-react";

const mockReservations = [
  { 
    id: 1, 
    customerName: "Ahmet Yılmaz", 
    customerPhone: "+90 555 123 4567", 
    date: "2023-07-15", 
    time: "19:30", 
    partySize: 4, 
    status: "confirmed", 
    notes: "Pencere kenarı tercih ediliyor" 
  },
  { 
    id: 2, 
    customerName: "Ayşe Demir", 
    customerPhone: "+90 532 987 6543", 
    date: "2023-07-15", 
    time: "20:00", 
    partySize: 2, 
    status: "pending", 
    notes: "" 
  },
  { 
    id: 3, 
    customerName: "Mehmet Kaya", 
    customerPhone: "+90 541 456 7890", 
    date: "2023-07-16", 
    time: "13:00", 
    partySize: 6, 
    status: "confirmed", 
    notes: "Doğum günü kutlaması" 
  },
  { 
    id: 4, 
    customerName: "Zeynep Şahin", 
    customerPhone: "+90 505 789 0123", 
    date: "2023-07-16", 
    time: "14:30", 
    partySize: 3, 
    status: "cancelled", 
    notes: "" 
  }
];

const BusinessReservations = () => {
  const [reservations] = useState(mockReservations);
  const [isAdding, setIsAdding] = useState(false);

  const toggleAddForm = () => {
    setIsAdding(!isAdding);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Onaylandı</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Beklemede</Badge>;
      case "cancelled":
        return <Badge variant="destructive">İptal Edildi</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Rezervasyonlar</CardTitle>
              <CardDescription>Müşteri rezervasyonlarını görüntüleyin ve yönetin</CardDescription>
            </div>
            <Button onClick={toggleAddForm}>
              {isAdding ? (
                <>
                  <X className="h-4 w-4 mr-2" />
                  İptal
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Yeni Rezervasyon
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {isAdding && (
            <Card className="border-dashed border-primary">
              <CardHeader>
                <CardTitle className="text-lg">Yeni Rezervasyon Ekle</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Müşteri Adı</label>
                  <Input placeholder="Ahmet Yılmaz" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Telefon Numarası</label>
                  <Input placeholder="+90 555 123 4567" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Tarih</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Saat</label>
                    <Input type="time" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Kişi Sayısı</label>
                  <Input type="number" min="1" placeholder="2" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Notlar</label>
                  <Input placeholder="Özel istekler veya notlar" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={toggleAddForm}>İptal</Button>
                <Button>Rezervasyonu Ekle</Button>
              </CardFooter>
            </Card>
          )}

          <div className="grid grid-cols-1 gap-4">
            {reservations.map(reservation => (
              <Card key={reservation.id} className={`
                border-l-4 
                ${reservation.status === "confirmed" ? "border-l-green-500" : 
                  reservation.status === "pending" ? "border-l-amber-500" : 
                  "border-l-red-500"}
              `}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="font-medium">{reservation.customerName}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{reservation.customerPhone}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{reservation.partySize} Kişi</span>
                      </div>
                      {reservation.notes && (
                        <div className="flex items-center">
                          <Info className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{reservation.notes}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 md:mt-0 space-y-2">
                      <div className="flex justify-between md:justify-end items-center md:mb-2">
                        <span className="text-muted-foreground md:hidden">Durum:</span>
                        {getStatusBadge(reservation.status)}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{new Date(reservation.date).toLocaleDateString('tr-TR')}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{reservation.time}</span>
                      </div>
                      <div className="flex space-x-2 mt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-1" />
                          Düzenle
                        </Button>
                        {reservation.status === "pending" ? (
                          <Button variant="default" size="sm" className="flex-1">
                            <Check className="h-4 w-4 mr-1" />
                            Onayla
                          </Button>
                        ) : (
                          <Button variant="destructive" size="sm" className="flex-1">
                            <X className="h-4 w-4 mr-1" />
                            İptal
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessReservations;
