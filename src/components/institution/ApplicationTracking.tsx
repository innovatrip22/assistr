
import { useState } from "react";
import { 
  FileText, 
  CalendarClock, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertCircle,
  ChevronRight,
  Plus,
  Download
} from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data
const mockApplications = [
  {
    id: "APP-1001",
    type: "meter_installation",
    applicant: "Ali Yılmaz",
    address: "Lefkoşa, Mersin 10 KKTC",
    status: "pending",
    priority: "normal",
    submitDate: "2023-06-01T10:23:45Z",
    lastUpdate: "2023-06-02T14:30:12Z",
    documents: ["kimlik.pdf", "tapu.pdf", "aplikasyon.pdf"],
    notes: "Tam bir aplikasyon belgesine ihtiyaç var",
    assignedTo: "Mehmet Kaya"
  },
  {
    id: "APP-1002",
    type: "electricity_connection",
    applicant: "Zeynep Demir",
    address: "Girne, Mersin 10 KKTC",
    status: "reviewing",
    priority: "high",
    submitDate: "2023-06-02T09:15:30Z",
    lastUpdate: "2023-06-03T11:20:45Z",
    documents: ["kimlik.pdf", "tapu.pdf", "proje.pdf", "harç.pdf"],
    notes: "",
    assignedTo: "Ayşe Şahin"
  },
  {
    id: "APP-1003",
    type: "tourist_facility",
    applicant: "Otel Turkuaz Ltd.",
    address: "İskele, Mersin 10 KKTC",
    status: "approved",
    priority: "high",
    submitDate: "2023-05-25T14:10:20Z",
    lastUpdate: "2023-06-01T16:45:30Z",
    documents: ["şirket_belgeleri.pdf", "izin.pdf", "proje.pdf", "çed_raporu.pdf"],
    notes: "Turizm Bakanlığı onayı alındı",
    assignedTo: "Ahmet Yılmaz"
  },
  {
    id: "APP-1004",
    type: "meter_installation",
    applicant: "Hasan Kaya",
    address: "Mağusa, Mersin 10 KKTC",
    status: "rejected",
    priority: "normal",
    submitDate: "2023-05-28T11:30:15Z",
    lastUpdate: "2023-06-02T09:15:40Z",
    documents: ["kimlik.pdf", "tapu.pdf"],
    notes: "Tapu belgesinde eksiklik var. Müracaat sahibine bilgi verildi.",
    assignedTo: "Fatma Demir"
  },
  {
    id: "APP-1005",
    type: "electricity_connection",
    applicant: "Mustafa Çelik",
    address: "Güzelyurt, Mersin 10 KKTC",
    status: "pending",
    priority: "urgent",
    submitDate: "2023-06-04T08:45:10Z",
    lastUpdate: "2023-06-04T08:45:10Z",
    documents: ["kimlik.pdf", "tapu.pdf", "proje.pdf"],
    notes: "Acil durumda elektrik bağlatması isteniyor.",
    assignedTo: ""
  }
];

const ApplicationTracking = () => {
  const [applications, setApplications] = useState(mockApplications);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [newNote, setNewNote] = useState("");
  const [selectedApplication, setSelectedApplication] = useState<any>(null);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMM yyyy, HH:mm", { locale: tr });
    } catch (error) {
      return "Geçersiz Tarih";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">Beklemede</Badge>;
      case "reviewing":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">İnceleniyor</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Onaylandı</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Reddedildi</Badge>;
      default:
        return <Badge variant="outline">Belirsiz</Badge>;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "meter_installation":
        return "Sayaç Kurulumu";
      case "electricity_connection":
        return "Elektrik Bağlantısı";
      case "tourist_facility":
        return "Turistik Tesis";
      default:
        return "Diğer";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "low":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">Düşük</Badge>;
      case "normal":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Normal</Badge>;
      case "high":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">Yüksek</Badge>;
      case "urgent":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Acil</Badge>;
      default:
        return <Badge variant="outline">Belirsiz</Badge>;
    }
  };

  const getFilteredApplications = () => {
    let filtered = [...applications];
    
    // Apply status filter
    if (filter !== "all") {
      filtered = filtered.filter(app => app.status === filter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(app => 
        app.id.toLowerCase().includes(query) ||
        app.applicant.toLowerCase().includes(query) ||
        app.address.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };

  const handleAddNote = () => {
    if (!selectedApplication || !newNote.trim()) return;
    
    // Update the notes for the selected application
    const updatedApplications = applications.map(app => {
      if (app.id === selectedApplication.id) {
        const updatedNotes = app.notes 
          ? `${app.notes}\n${new Date().toISOString().split('T')[0]}: ${newNote}`
          : `${new Date().toISOString().split('T')[0]}: ${newNote}`;
        
        return {
          ...app,
          notes: updatedNotes,
          lastUpdate: new Date().toISOString()
        };
      }
      return app;
    });
    
    setApplications(updatedApplications);
    setNewNote("");
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Başvuru Takibi</CardTitle>
              <CardDescription>Vatandaş ve firma başvuruları</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Yeni Başvuru
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Yeni Başvuru Ekle</DialogTitle>
                    <DialogDescription>
                      Yeni bir başvuru kaydı oluşturun. Tüm zorunlu alanları doldurduğunuzdan emin olun.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Başvuru Türü</label>
                        <Select defaultValue="meter_installation">
                          <SelectTrigger>
                            <SelectValue placeholder="Tür seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="meter_installation">Sayaç Kurulumu</SelectItem>
                            <SelectItem value="electricity_connection">Elektrik Bağlantısı</SelectItem>
                            <SelectItem value="tourist_facility">Turistik Tesis</SelectItem>
                            <SelectItem value="other">Diğer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Öncelik</label>
                        <Select defaultValue="normal">
                          <SelectTrigger>
                            <SelectValue placeholder="Öncelik seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Düşük</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="high">Yüksek</SelectItem>
                            <SelectItem value="urgent">Acil</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Başvuran</label>
                      <Input placeholder="Ad Soyad veya Firma Adı" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Adres</label>
                      <Textarea placeholder="Tam adres" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Belgeler</label>
                      <div className="flex items-center gap-2">
                        <Input type="file" multiple />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Notlar</label>
                      <Textarea placeholder="Eklemek istediğiniz notlar" />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline">İptal</Button>
                    <Button>Başvuru Oluştur</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Dışa Aktar
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Input
                placeholder="Başvuru No, Başvuran veya Adres ile ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">
                <Search className="h-4 w-4" />
              </span>
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Tüm Başvurular" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Başvurular</SelectItem>
                <SelectItem value="pending">Beklemede</SelectItem>
                <SelectItem value="reviewing">İnceleniyor</SelectItem>
                <SelectItem value="approved">Onaylanan</SelectItem>
                <SelectItem value="rejected">Reddedilen</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Tümü</TabsTrigger>
              <TabsTrigger value="meter">Sayaç Kurulumu</TabsTrigger>
              <TabsTrigger value="connection">Elektrik Bağlantısı</TabsTrigger>
              <TabsTrigger value="facility">Turistik Tesis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <Card>
                <ScrollArea className="h-[500px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Başvuru No</TableHead>
                        <TableHead>Tür</TableHead>
                        <TableHead>Başvuran</TableHead>
                        <TableHead>Tarih</TableHead>
                        <TableHead>Öncelik</TableHead>
                        <TableHead>Durum</TableHead>
                        <TableHead className="text-right">İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getFilteredApplications().map((app) => (
                        <TableRow key={app.id}>
                          <TableCell className="font-medium">{app.id}</TableCell>
                          <TableCell>{getTypeLabel(app.type)}</TableCell>
                          <TableCell>{app.applicant}</TableCell>
                          <TableCell>{formatDate(app.submitDate)}</TableCell>
                          <TableCell>{getPriorityBadge(app.priority)}</TableCell>
                          <TableCell>{getStatusBadge(app.status)}</TableCell>
                          <TableCell className="text-right">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setSelectedApplication(app)}>
                                  <ChevronRight className="h-4 w-4" />
                                  Detay
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                  <DialogTitle>Başvuru Detayı - {app.id}</DialogTitle>
                                  <DialogDescription>
                                    Başvuru bilgileri ve işlem geçmişi
                                  </DialogDescription>
                                </DialogHeader>
                                
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm font-medium">Başvuru Türü</p>
                                      <p>{getTypeLabel(app.type)}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">Durum</p>
                                      <div>{getStatusBadge(app.status)}</div>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <p className="text-sm font-medium">Başvuran</p>
                                    <p>{app.applicant}</p>
                                  </div>
                                  
                                  <div>
                                    <p className="text-sm font-medium">Adres</p>
                                    <p>{app.address}</p>
                                  </div>
                                  
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm font-medium">Başvuru Tarihi</p>
                                      <p>{formatDate(app.submitDate)}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">Son Güncelleme</p>
                                      <p>{formatDate(app.lastUpdate)}</p>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <p className="text-sm font-medium">Belgeler</p>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                      {app.documents.map((doc, index) => (
                                        <Badge key={index} variant="outline" className="bg-gray-100">
                                          <FileText className="h-3 w-3 mr-1" />
                                          {doc}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <p className="text-sm font-medium">Notlar</p>
                                    <div className="bg-gray-50 p-3 rounded-md border text-sm whitespace-pre-line">
                                      {app.notes || "Henüz not eklenmemiş."}
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <p className="text-sm font-medium">Not Ekle</p>
                                    <Textarea 
                                      placeholder="Yeni not ekleyin..." 
                                      value={newNote}
                                      onChange={(e) => setNewNote(e.target.value)}
                                    />
                                    <Button variant="outline" size="sm" onClick={handleAddNote}>
                                      Not Ekle
                                    </Button>
                                  </div>
                                </div>
                                
                                <DialogFooter className="flex justify-between">
                                  <div className="flex gap-2">
                                    <Button variant="destructive" size="sm">
                                      <XCircle className="h-4 w-4 mr-1" />
                                      Reddet
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      <AlertCircle className="h-4 w-4 mr-1" />
                                      Eksik Belge
                                    </Button>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                      <Clock className="h-4 w-4 mr-1" />
                                      İşleme Al
                                    </Button>
                                    <Button size="sm">
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      Onayla
                                    </Button>
                                  </div>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </Card>
            </TabsContent>
            
            <TabsContent value="meter">
              <div className="py-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium mb-1">Sayaç Kurulumu Başvuruları</h3>
                <p className="text-gray-500 mb-4">
                  {applications.filter(app => app.type === "meter_installation").length} başvuru bulundu
                </p>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrele
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="connection">
              <div className="py-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium mb-1">Elektrik Bağlantısı Başvuruları</h3>
                <p className="text-gray-500 mb-4">
                  {applications.filter(app => app.type === "electricity_connection").length} başvuru bulundu
                </p>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrele
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="facility">
              <div className="py-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium mb-1">Turistik Tesis Başvuruları</h3>
                <p className="text-gray-500 mb-4">
                  {applications.filter(app => app.type === "tourist_facility").length} başvuru bulundu
                </p>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrele
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationTracking;
