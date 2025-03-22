
import { useState } from "react";
import { 
  Megaphone, 
  Calendar, 
  Clock, 
  Eye, 
  Users, 
  FileImage, 
  MoreHorizontal, 
  Edit,
  Trash,
  Plus,
  Filter,
  Search
} from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data
const mockAnnouncements = [
  {
    id: "ann-001",
    title: "Planlı Elektrik Kesintisi - Lefkoşa Bölgesi",
    content: "12 Haziran 2023 tarihinde 09:00-14:00 saatleri arasında Lefkoşa'nın Gönyeli bölgesinde bakım çalışmaları nedeniyle elektrik kesintisi yaşanacaktır.",
    publishDate: "2023-06-10T08:00:00Z",
    expiryDate: "2023-06-12T20:00:00Z",
    status: "published",
    target: "public",
    author: "Teknik Birim",
    views: 1245,
    image: ""
  },
  {
    id: "ann-002",
    title: "Yeni Sayaç Okuma Dönemi Başlıyor",
    content: "Tüm abonelerimize duyurulur, 1 Temmuz 2023 itibariyle yeni sayaç okuma ve faturalandırma dönemine geçilecektir. Detaylar için web sitemizi ziyaret ediniz.",
    publishDate: "2023-06-15T12:00:00Z",
    expiryDate: "2023-07-01T23:59:59Z",
    status: "scheduled",
    target: "subscribers",
    author: "Müşteri Hizmetleri",
    views: 0,
    image: ""
  },
  {
    id: "ann-003",
    title: "Kurum İçi Eğitim Duyurusu",
    content: "Tüm personelimize duyurulur, 20 Haziran 2023 tarihinde saat 14:00'te yeni veri tabanı yönetim sistemi hakkında eğitim toplantısı yapılacaktır. Katılım zorunludur.",
    publishDate: "2023-06-14T09:30:00Z",
    expiryDate: "2023-06-20T18:00:00Z",
    status: "published",
    target: "internal",
    author: "İnsan Kaynakları",
    views: 52,
    image: ""
  },
  {
    id: "ann-004",
    title: "Yeni Online Ödeme Sistemi",
    content: "Değerli abonelerimiz, 15 Haziran 2023 tarihinden itibaren yenilenen online ödeme sistemimiz hizmetinize sunulmuştur. Artık faturalarınızı daha kolay ve hızlı bir şekilde ödeyebilirsiniz.",
    publishDate: "2023-06-15T00:00:00Z",
    expiryDate: "2023-07-15T23:59:59Z",
    status: "draft",
    target: "public",
    author: "BT Departmanı",
    views: 0,
    image: ""
  },
  {
    id: "ann-005",
    title: "Elektrik Tasarrufu Kampanyası",
    content: "Yaz aylarında elektrik tüketiminin artması beklenmektedir. Tasarruf tedbirleri ve öneriler için web sitemizdeki özel bölümü ziyaret edebilirsiniz.",
    publishDate: "2023-06-01T10:00:00Z",
    expiryDate: "2023-08-31T23:59:59Z",
    status: "published",
    target: "public",
    author: "Halkla İlişkiler",
    views: 3215,
    image: ""
  }
];

const AnnouncementManagement = () => {
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingAnnouncement, setEditingAnnouncement] = useState<any | null>(null);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    publishDate: new Date().toISOString(),
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: "draft",
    target: "public",
    image: ""
  });

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMM yyyy, HH:mm", { locale: tr });
    } catch (error) {
      return "Geçersiz Tarih";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">Taslak</Badge>;
      case "scheduled":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Planlandı</Badge>;
      case "published":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Yayında</Badge>;
      case "archived":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">Arşivlendi</Badge>;
      default:
        return <Badge variant="outline">Belirsiz</Badge>;
    }
  };

  const getTargetBadge = (target: string) => {
    switch (target) {
      case "public":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Genel</Badge>;
      case "subscribers":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Aboneler</Badge>;
      case "internal":
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">Kurum İçi</Badge>;
      default:
        return <Badge variant="outline">Belirsiz</Badge>;
    }
  };

  const getFilteredAnnouncements = () => {
    let filtered = [...announcements];
    
    // Apply status filter
    if (filter !== "all") {
      filtered = filtered.filter(ann => ann.status === filter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(ann => 
        ann.title.toLowerCase().includes(query) ||
        ann.content.toLowerCase().includes(query) ||
        ann.author.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };

  const handleCreateAnnouncement = () => {
    const id = `ann-${(Math.floor(Math.random() * 1000) + 6).toString().padStart(3, '0')}`;
    const newItem = {
      id,
      ...newAnnouncement,
      views: 0,
      author: "Sistem Kullanıcısı" // In a real app, this would be the logged-in user
    };
    
    setAnnouncements([...announcements, newItem]);
    
    // Reset form
    setNewAnnouncement({
      title: "",
      content: "",
      publishDate: new Date().toISOString(),
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: "draft",
      target: "public",
      image: ""
    });
  };

  const handleUpdateAnnouncement = () => {
    if (!editingAnnouncement) return;
    
    const updatedAnnouncements = announcements.map(ann => 
      ann.id === editingAnnouncement.id ? editingAnnouncement : ann
    );
    
    setAnnouncements(updatedAnnouncements);
    setEditingAnnouncement(null);
  };

  const handleDeleteAnnouncement = (id: string) => {
    const updatedAnnouncements = announcements.filter(ann => ann.id !== id);
    setAnnouncements(updatedAnnouncements);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Duyuru Yönetimi</CardTitle>
              <CardDescription>Halka ve personele duyurular</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-4 md:mt-0">
                  <Plus className="h-4 w-4 mr-2" />
                  Yeni Duyuru
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Yeni Duyuru Oluştur</DialogTitle>
                  <DialogDescription>
                    Halka, abonelere veya kurum içi personele yönelik duyuru oluşturun.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Başlık</label>
                    <Input 
                      placeholder="Duyuru başlığı" 
                      value={newAnnouncement.title}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">İçerik</label>
                    <Textarea 
                      placeholder="Duyuru içeriği" 
                      className="min-h-[150px]"
                      value={newAnnouncement.content}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Yayın Tarihi</label>
                      <Input 
                        type="datetime-local" 
                        value={new Date(newAnnouncement.publishDate).toISOString().slice(0, 16)}
                        onChange={(e) => setNewAnnouncement({
                          ...newAnnouncement, 
                          publishDate: new Date(e.target.value).toISOString()
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Bitiş Tarihi</label>
                      <Input 
                        type="datetime-local" 
                        value={new Date(newAnnouncement.expiryDate).toISOString().slice(0, 16)}
                        onChange={(e) => setNewAnnouncement({
                          ...newAnnouncement, 
                          expiryDate: new Date(e.target.value).toISOString()
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Durum</label>
                      <Select 
                        value={newAnnouncement.status}
                        onValueChange={(value) => setNewAnnouncement({...newAnnouncement, status: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Durum seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Taslak</SelectItem>
                          <SelectItem value="scheduled">Planlandı</SelectItem>
                          <SelectItem value="published">Hemen Yayınla</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Hedef Kitle</label>
                      <Select 
                        value={newAnnouncement.target}
                        onValueChange={(value) => setNewAnnouncement({...newAnnouncement, target: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Hedef kitle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Genel</SelectItem>
                          <SelectItem value="subscribers">Aboneler</SelectItem>
                          <SelectItem value="internal">Kurum İçi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Görsel</label>
                    <Input type="file" />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline">İptal</Button>
                  <Button onClick={handleCreateAnnouncement}>Oluştur</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Input
                placeholder="Başlık, içerik veya yazar ile ara..."
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
                <SelectValue placeholder="Tüm Duyurular" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Duyurular</SelectItem>
                <SelectItem value="draft">Taslaklar</SelectItem>
                <SelectItem value="scheduled">Planlanan</SelectItem>
                <SelectItem value="published">Yayındaki</SelectItem>
                <SelectItem value="archived">Arşivlenen</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Tümü</TabsTrigger>
              <TabsTrigger value="public">Genel</TabsTrigger>
              <TabsTrigger value="subscribers">Aboneler</TabsTrigger>
              <TabsTrigger value="internal">Kurum İçi</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <ScrollArea className="h-[600px]">
                <div className="space-y-4 pr-4">
                  {getFilteredAnnouncements().map((announcement) => (
                    <Card key={announcement.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-base">{announcement.title}</CardTitle>
                            <CardDescription className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(announcement.publishDate)}
                            </CardDescription>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {getStatusBadge(announcement.status)}
                            {getTargetBadge(announcement.target)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <p className="text-sm mb-3 line-clamp-3">{announcement.content}</p>
                        
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {announcement.views} görüntülenme
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {announcement.author}
                            </span>
                          </div>
                          <div>
                            <Dialog>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DialogTrigger asChild>
                                    <DropdownMenuItem onClick={() => setEditingAnnouncement(announcement)}>
                                      <Edit className="h-4 w-4 mr-2" />
                                      Düzenle
                                    </DropdownMenuItem>
                                  </DialogTrigger>
                                  <DropdownMenuItem 
                                    className="text-red-600"
                                    onClick={() => handleDeleteAnnouncement(announcement.id)}
                                  >
                                    <Trash className="h-4 w-4 mr-2" />
                                    Sil
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                              
                              <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                  <DialogTitle>Duyuru Düzenle</DialogTitle>
                                  <DialogDescription>
                                    Mevcut duyuruyu düzenleyin.
                                  </DialogDescription>
                                </DialogHeader>
                                
                                {editingAnnouncement && (
                                  <div className="grid gap-4 py-4">
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">Başlık</label>
                                      <Input 
                                        placeholder="Duyuru başlığı" 
                                        value={editingAnnouncement.title}
                                        onChange={(e) => setEditingAnnouncement({
                                          ...editingAnnouncement, 
                                          title: e.target.value
                                        })}
                                      />
                                    </div>
                                    
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">İçerik</label>
                                      <Textarea 
                                        placeholder="Duyuru içeriği" 
                                        className="min-h-[150px]"
                                        value={editingAnnouncement.content}
                                        onChange={(e) => setEditingAnnouncement({
                                          ...editingAnnouncement, 
                                          content: e.target.value
                                        })}
                                      />
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <label className="text-sm font-medium">Durum</label>
                                        <Select 
                                          value={editingAnnouncement.status}
                                          onValueChange={(value) => setEditingAnnouncement({
                                            ...editingAnnouncement, 
                                            status: value
                                          })}
                                        >
                                          <SelectTrigger>
                                            <SelectValue placeholder="Durum seçin" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="draft">Taslak</SelectItem>
                                            <SelectItem value="scheduled">Planlandı</SelectItem>
                                            <SelectItem value="published">Yayında</SelectItem>
                                            <SelectItem value="archived">Arşivlendi</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div className="space-y-2">
                                        <label className="text-sm font-medium">Hedef Kitle</label>
                                        <Select 
                                          value={editingAnnouncement.target}
                                          onValueChange={(value) => setEditingAnnouncement({
                                            ...editingAnnouncement, 
                                            target: value
                                          })}
                                        >
                                          <SelectTrigger>
                                            <SelectValue placeholder="Hedef kitle" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="public">Genel</SelectItem>
                                            <SelectItem value="subscribers">Aboneler</SelectItem>
                                            <SelectItem value="internal">Kurum İçi</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setEditingAnnouncement(null)}>
                                    İptal
                                  </Button>
                                  <Button onClick={handleUpdateAnnouncement}>
                                    Güncelle
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="public">
              <ScrollArea className="h-[600px]">
                <div className="space-y-4 pr-4">
                  {getFilteredAnnouncements()
                    .filter(ann => ann.target === "public")
                    .map((announcement) => (
                      <Card key={announcement.id} className="overflow-hidden">
                        {/* Same card content as above */}
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <CardTitle className="text-base">{announcement.title}</CardTitle>
                              <CardDescription className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(announcement.publishDate)}
                              </CardDescription>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              {getStatusBadge(announcement.status)}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <p className="text-sm mb-3 line-clamp-3">{announcement.content}</p>
                          
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {announcement.views} görüntülenme
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {announcement.author}
                              </span>
                            </div>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="subscribers">
              <ScrollArea className="h-[600px]">
                <div className="space-y-4 pr-4">
                  {getFilteredAnnouncements()
                    .filter(ann => ann.target === "subscribers")
                    .map((announcement) => (
                      <Card key={announcement.id} className="overflow-hidden">
                        {/* Same card content as above */}
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <CardTitle className="text-base">{announcement.title}</CardTitle>
                              <CardDescription className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(announcement.publishDate)}
                              </CardDescription>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              {getStatusBadge(announcement.status)}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <p className="text-sm mb-3 line-clamp-3">{announcement.content}</p>
                          
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {announcement.views} görüntülenme
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {announcement.author}
                              </span>
                            </div>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="internal">
              <ScrollArea className="h-[600px]">
                <div className="space-y-4 pr-4">
                  {getFilteredAnnouncements()
                    .filter(ann => ann.target === "internal")
                    .map((announcement) => (
                      <Card key={announcement.id} className="overflow-hidden">
                        {/* Same card content as above */}
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <CardTitle className="text-base">{announcement.title}</CardTitle>
                              <CardDescription className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(announcement.publishDate)}
                              </CardDescription>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              {getStatusBadge(announcement.status)}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <p className="text-sm mb-3 line-clamp-3">{announcement.content}</p>
                          
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {announcement.views} görüntülenme
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {announcement.author}
                              </span>
                            </div>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnouncementManagement;
