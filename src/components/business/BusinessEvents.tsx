
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Calendar as CalendarIcon, CalendarDays, Plus, Edit, Trash2 } from "lucide-react";

// Mock data for events
const mockEvents = [
  {
    id: "1",
    title: "Canlı Müzik Akşamı",
    date: new Date(2023, 7, 10),
    type: "entertainment",
    description: "KKTC yerel müzisyenlerinden canlı performans."
  },
  {
    id: "2",
    title: "KKTC Mutfağı Atölyesi",
    date: new Date(2023, 7, 15),
    type: "workshop",
    description: "Şef Mehmet Bey'in katılımıyla geleneksel KKTC yemekleri atölyesi."
  },
  {
    id: "3",
    title: "Yaz Sezonu Özel İndirim",
    date: new Date(2023, 7, 1),
    type: "promotion",
    description: "Tüm menüde %20 indirim fırsatı."
  },
  {
    id: "4",
    title: "Şarap Tadım Etkinliği",
    date: new Date(2023, 7, 20),
    type: "tasting",
    description: "KKTC'nin yerel üzümlerinden üretilen şarapların tadımı."
  }
];

interface Event {
  id: string;
  title: string;
  date: Date;
  type: string;
  description: string;
}

const BusinessEvents = () => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    date: new Date(),
    type: "promotion",
    description: ""
  });

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.type) {
      const event: Event = {
        id: Math.random().toString(36).substring(7),
        title: newEvent.title || "",
        date: newEvent.date || new Date(),
        type: newEvent.type || "promotion",
        description: newEvent.description || ""
      };
      
      setEvents([...events, event]);
      setNewEvent({
        title: "",
        date: new Date(),
        type: "promotion",
        description: ""
      });
      setIsDialogOpen(false);
    }
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setNewEvent({
      title: event.title,
      date: event.date,
      type: event.type,
      description: event.description
    });
    setIsDialogOpen(true);
  };

  const handleUpdateEvent = () => {
    if (selectedEvent && newEvent.title && newEvent.date && newEvent.type) {
      const updatedEvents = events.map(event => 
        event.id === selectedEvent.id 
        ? {
            ...event,
            title: newEvent.title || "",
            date: newEvent.date || new Date(),
            type: newEvent.type || "promotion",
            description: newEvent.description || ""
          } 
        : event
      );
      
      setEvents(updatedEvents);
      setNewEvent({
        title: "",
        date: new Date(),
        type: "promotion",
        description: ""
      });
      setSelectedEvent(null);
      setIsDialogOpen(false);
    }
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      const updatedEvents = events.filter(event => event.id !== selectedEvent.id);
      setEvents(updatedEvents);
      setSelectedEvent(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const getEventBadgeColor = (type: string) => {
    switch (type) {
      case "entertainment":
        return "bg-purple-100 text-purple-800";
      case "workshop":
        return "bg-blue-100 text-blue-800";
      case "promotion":
        return "bg-green-100 text-green-800";
      case "tasting":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">İşletme Etkinlikleri</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Etkinlik Ekle
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{selectedEvent ? "Etkinlik Düzenle" : "Yeni Etkinlik Ekle"}</DialogTitle>
              <DialogDescription>
                Etkinlik detaylarını girin ve kaydedin.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Başlık
                </Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Tarih
                </Label>
                <div className="col-span-3">
                  <Calendar
                    mode="single"
                    selected={newEvent.date}
                    onSelect={(date) => setNewEvent({ ...newEvent, date })}
                    className="border rounded-md p-3"
                    locale={tr}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Tür
                </Label>
                <select
                  id="type"
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  <option value="entertainment">Eğlence</option>
                  <option value="workshop">Atölye</option>
                  <option value="promotion">Promosyon</option>
                  <option value="tasting">Tadım</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Açıklama
                </Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => {
                setIsDialogOpen(false);
                setSelectedEvent(null);
                setNewEvent({
                  title: "",
                  date: new Date(),
                  type: "promotion",
                  description: ""
                });
              }}>
                İptal
              </Button>
              <Button type="button" onClick={selectedEvent ? handleUpdateEvent : handleAddEvent}>
                {selectedEvent ? "Güncelle" : "Ekle"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              Etkinlik Takvimi
            </CardTitle>
            <CardDescription>
              İşletmenizin planlanan tüm etkinlikleri
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="border rounded-md p-3"
              locale={tr}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Etkinlik Listesi</CardTitle>
            <CardDescription>
              Tüm etkinliklerinizi görüntüleyin ve yönetin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="p-4 border rounded-lg bg-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{event.title}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <CalendarIcon className="mr-1 h-4 w-4" />
                        {format(event.date, 'dd MMMM yyyy', { locale: tr })}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditEvent(event)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setSelectedEvent(event);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{event.description}</p>
                  <div className="mt-3">
                    <Badge className={getEventBadgeColor(event.type)}>
                      {event.type === "entertainment" && "Eğlence"}
                      {event.type === "workshop" && "Atölye"}
                      {event.type === "promotion" && "Promosyon"}
                      {event.type === "tasting" && "Tadım"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Etkinliği Sil</DialogTitle>
            <DialogDescription>
              Bu etkinliği silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              İptal
            </Button>
            <Button variant="destructive" onClick={handleDeleteEvent}>
              Sil
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BusinessEvents;
