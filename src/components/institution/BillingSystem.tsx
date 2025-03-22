
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, Upload, FileText, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const invoices = [
  {
    id: "F-123456",
    subscriberId: "AB-123456",
    subscriberName: "Ali Yılmaz",
    period: "Temmuz 2023",
    amount: 756.40,
    dueDate: "15/07/2023",
    paidDate: "10/07/2023",
    status: "Ödenmiş",
    meterReading: 4532,
    consumption: 210,
  },
  {
    id: "F-123457",
    subscriberId: "AB-123457",
    subscriberName: "Ayşe Öztürk",
    period: "Temmuz 2023",
    amount: 892.15,
    dueDate: "15/07/2023",
    paidDate: null,
    status: "Ödenmedi",
    meterReading: 6721,
    consumption: 245,
  },
  {
    id: "F-123458",
    subscriberId: "AB-123458",
    subscriberName: "Mehmet Kaya",
    period: "Temmuz 2023",
    amount: 2780.50,
    dueDate: "15/07/2023",
    paidDate: "11/07/2023",
    status: "Ödenmiş",
    meterReading: 12453,
    consumption: 720,
  },
  {
    id: "F-123459",
    subscriberId: "AB-123459",
    subscriberName: "Zeynep Demir",
    period: "Temmuz 2023",
    amount: 685.20,
    dueDate: "15/07/2023",
    paidDate: null,
    status: "Gecikmiş",
    meterReading: 3541,
    consumption: 180,
  },
  {
    id: "F-123460",
    subscriberId: "AB-123460",
    subscriberName: "Kemal Şahin",
    period: "Temmuz 2023",
    amount: 4350.75,
    dueDate: "15/07/2023",
    paidDate: "05/07/2023",
    status: "Ödenmiş",
    meterReading: 28750,
    consumption: 1250,
  },
];

const BillingSystem = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isMeterReadingDialogOpen, setIsMeterReadingDialogOpen] = useState(false);

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.subscriberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.subscriberId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Faturalandırma Sistemi</CardTitle>
              <CardDescription>
                Faturaları yönetin, sayaç okumalarını girin ve tahsilatları takip edin
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Dialog open={isMeterReadingDialogOpen} onOpenChange={setIsMeterReadingDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Upload className="h-4 w-4" />
                    <span>Sayaç Okuma Girişi</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Sayaç Okuma Girişi</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="meterUploadType">Yükleme Tipi</Label>
                      <Select defaultValue="manual">
                        <SelectTrigger id="meterUploadType">
                          <SelectValue placeholder="Yükleme tipi seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manual">Manuel Giriş</SelectItem>
                          <SelectItem value="excel">Excel Dosyası</SelectItem>
                          <SelectItem value="api">API Entegrasyonu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subscriberId">Abone No</Label>
                      <Input id="subscriberId" placeholder="Abone numarası girin" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="meterNo">Sayaç No</Label>
                      <Input id="meterNo" placeholder="Sayaç numarası girin" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="readingDate">Okuma Tarihi</Label>
                      <Input id="readingDate" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="readingValue">Okuma Değeri (kWh)</Label>
                      <Input id="readingValue" type="number" placeholder="Sayaç değeri" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notlar</Label>
                      <Textarea id="notes" placeholder="Varsa eklemek istediğiniz notlar" />
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" onClick={() => setIsMeterReadingDialogOpen(false)}>
                        İptal
                      </Button>
                      <Button>Kaydet</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span>Yeni Fatura Oluştur</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="invoices">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="invoices" className="flex-1">Faturalar</TabsTrigger>
              <TabsTrigger value="readings" className="flex-1">Sayaç Okumaları</TabsTrigger>
              <TabsTrigger value="templates" className="flex-1">Fatura Şablonları</TabsTrigger>
              <TabsTrigger value="reports" className="flex-1">Fatura Raporları</TabsTrigger>
            </TabsList>
            
            <TabsContent value="invoices">
              <div className="flex justify-between mb-6">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Fatura ara... (Abone No, Abone İsmi, Fatura No)"
                    className="pl-8 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="july23">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Dönem" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="july23">Temmuz 2023</SelectItem>
                      <SelectItem value="june23">Haziran 2023</SelectItem>
                      <SelectItem value="may23">Mayıs 2023</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Durum" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tüm Durumlar</SelectItem>
                      <SelectItem value="paid">Ödenmiş</SelectItem>
                      <SelectItem value="unpaid">Ödenmemiş</SelectItem>
                      <SelectItem value="overdue">Gecikmiş</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fatura No</TableHead>
                      <TableHead>Abone</TableHead>
                      <TableHead>Dönem</TableHead>
                      <TableHead>Tutar (₺)</TableHead>
                      <TableHead>Son Ödeme</TableHead>
                      <TableHead>Tüketim (kWh)</TableHead>
                      <TableHead>Durum</TableHead>
                      <TableHead className="text-right">İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.subscriberName}</TableCell>
                        <TableCell>{invoice.period}</TableCell>
                        <TableCell>{invoice.amount.toFixed(2)}</TableCell>
                        <TableCell>{invoice.dueDate}</TableCell>
                        <TableCell>{invoice.consumption}</TableCell>
                        <TableCell>
                          {invoice.status === "Ödenmiş" ? (
                            <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Ödenmiş
                            </span>
                          ) : invoice.status === "Gecikmiş" ? (
                            <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Gecikmiş
                            </span>
                          ) : (
                            <span className="inline-flex items-center bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                              <XCircle className="w-3 h-3 mr-1" />
                              Ödenmedi
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedInvoice(invoice)}
                              >
                                <FileText className="h-4 w-4 mr-1" />
                                Detaylar
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[800px]">
                              <DialogHeader>
                                <DialogTitle>Fatura Detayları</DialogTitle>
                              </DialogHeader>
                              <div className="grid grid-cols-2 gap-6 py-4">
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Fatura Bilgileri</h4>
                                  <div className="space-y-1 text-sm">
                                    <p><span className="font-medium">Fatura No:</span> {invoices[0].id}</p>
                                    <p><span className="font-medium">Dönem:</span> {invoices[0].period}</p>
                                    <p><span className="font-medium">Düzenleme Tarihi:</span> 01/07/2023</p>
                                    <p><span className="font-medium">Son Ödeme Tarihi:</span> {invoices[0].dueDate}</p>
                                    <p><span className="font-medium">Fatura Durumu:</span> {invoices[0].status}</p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Abone Bilgileri</h4>
                                  <div className="space-y-1 text-sm">
                                    <p><span className="font-medium">Abone No:</span> {invoices[0].subscriberId}</p>
                                    <p><span className="font-medium">Ad Soyad:</span> {invoices[0].subscriberName}</p>
                                    <p><span className="font-medium">Sayaç No:</span> ELK-789012</p>
                                    <p><span className="font-medium">Abone Türü:</span> Mesken</p>
                                    <p><span className="font-medium">Adres:</span> Lefkoşa, Dereboyu Cad. No:45</p>
                                  </div>
                                </div>
                                <div className="col-span-2">
                                  <h4 className="text-sm font-medium mb-2">Tüketim ve Fiyatlandırma Detayları</h4>
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Kalem</TableHead>
                                        <TableHead className="text-right">Miktar</TableHead>
                                        <TableHead className="text-right">Birim Fiyat (₺)</TableHead>
                                        <TableHead className="text-right">Tutar (₺)</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      <TableRow>
                                        <TableCell>Elektrik Tüketimi (0-150 kWh)</TableCell>
                                        <TableCell className="text-right">150 kWh</TableCell>
                                        <TableCell className="text-right">2.25</TableCell>
                                        <TableCell className="text-right">337.50</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell>Elektrik Tüketimi (151-210 kWh)</TableCell>
                                        <TableCell className="text-right">60 kWh</TableCell>
                                        <TableCell className="text-right">3.45</TableCell>
                                        <TableCell className="text-right">207.00</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell>Dağıtım Bedeli</TableCell>
                                        <TableCell className="text-right"></TableCell>
                                        <TableCell className="text-right"></TableCell>
                                        <TableCell className="text-right">85.40</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell>Enerji Fonu</TableCell>
                                        <TableCell className="text-right"></TableCell>
                                        <TableCell className="text-right"></TableCell>
                                        <TableCell className="text-right">32.50</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell>KDV (%18)</TableCell>
                                        <TableCell className="text-right"></TableCell>
                                        <TableCell className="text-right"></TableCell>
                                        <TableCell className="text-right">94.00</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell colSpan={3} className="text-right font-bold">GENEL TOPLAM</TableCell>
                                        <TableCell className="text-right font-bold">756.40 ₺</TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                </div>
                                <div className="col-span-2 flex gap-2 justify-end mt-4">
                                  <Button variant="outline">E-Fatura Gönder</Button>
                                  <Button variant="outline">Yazdır</Button>
                                  <Button>Ödeme Al</Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="readings">
              <div className="p-4">
                <h3 className="text-lg font-medium mb-4">Sayaç Okumaları</h3>
                <p className="text-muted-foreground mb-8">
                  Elektrik sayaçlarının okuma değerlerini yönetin ve fatura dönemleri için tüketim verilerini takip edin.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Manuel Sayaç Okuma</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Tek bir abonenin sayaç değerini manuel olarak girin.
                      </p>
                      <Button 
                        className="w-full" 
                        onClick={() => setIsMeterReadingDialogOpen(true)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Yeni Okuma Gir
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Toplu Veri Yükleme</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Çoklu abone sayaç değerlerini Excel veya CSV dosyasından yükleyin.
                      </p>
                      <Button variant="outline" className="w-full">
                        <Upload className="h-4 w-4 mr-1" />
                        Dosya Yükle
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Otomatik Sayaç Okuma</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Akıllı sayaçlardan gelen verileri otomatik olarak sisteme aktar.
                      </p>
                      <Button variant="secondary" className="w-full">
                        API Entegrasyonu
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <h4 className="font-medium mb-4">Son Sayaç Okumaları</h4>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Okuma ID</TableHead>
                        <TableHead>Abone No</TableHead>
                        <TableHead>Sayaç No</TableHead>
                        <TableHead>Okuma Tarihi</TableHead>
                        <TableHead>Değer (kWh)</TableHead>
                        <TableHead>Önceki Değer</TableHead>
                        <TableHead>Tüketim</TableHead>
                        <TableHead>Durum</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">RD-001234</TableCell>
                        <TableCell>AB-123456</TableCell>
                        <TableCell>ELK-789012</TableCell>
                        <TableCell>05/07/2023</TableCell>
                        <TableCell>4532</TableCell>
                        <TableCell>4322</TableCell>
                        <TableCell>210 kWh</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Onaylandı
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">RD-001235</TableCell>
                        <TableCell>AB-123457</TableCell>
                        <TableCell>ELK-789013</TableCell>
                        <TableCell>05/07/2023</TableCell>
                        <TableCell>6721</TableCell>
                        <TableCell>6476</TableCell>
                        <TableCell>245 kWh</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Onaylandı
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">RD-001236</TableCell>
                        <TableCell>AB-123458</TableCell>
                        <TableCell>ELK-789014</TableCell>
                        <TableCell>05/07/2023</TableCell>
                        <TableCell>12453</TableCell>
                        <TableCell>11733</TableCell>
                        <TableCell>720 kWh</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Kontrol Gerekli
                          </span>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="templates">
              <div className="p-4">
                <h3 className="text-lg font-medium mb-4">Fatura Şablonları</h3>
                <p className="text-muted-foreground mb-8">
                  Farklı abone türleri ve dönemler için fatura şablonları oluşturun ve yönetin.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="border-blue-200 hover:border-blue-300 transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Mesken Aboneleri</CardTitle>
                      <CardDescription>Konut tipi abonelikler için fatura şablonu</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm"><span className="font-medium">Son Düzenleme:</span> 10/06/2023</p>
                        <p className="text-sm"><span className="font-medium">Versiyon:</span> 2.1</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">Görüntüle</Button>
                        <Button variant="outline" size="sm" className="flex-1">Düzenle</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-purple-200 hover:border-purple-300 transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Ticari Aboneler</CardTitle>
                      <CardDescription>İşyerleri ve ticari işletmeler için şablon</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm"><span className="font-medium">Son Düzenleme:</span> 15/05/2023</p>
                        <p className="text-sm"><span className="font-medium">Versiyon:</span> 1.8</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">Görüntüle</Button>
                        <Button variant="outline" size="sm" className="flex-1">Düzenle</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-green-200 hover:border-green-300 transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Sanayi Aboneleri</CardTitle>
                      <CardDescription>Sanayi tesisleri için fatura formatı</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm"><span className="font-medium">Son Düzenleme:</span> 20/06/2023</p>
                        <p className="text-sm"><span className="font-medium">Versiyon:</span> 3.2</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">Görüntüle</Button>
                        <Button variant="outline" size="sm" className="flex-1">Düzenle</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Şablon Bileşenleri</h4>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Yeni Şablon
                  </Button>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Bileşen Adı</TableHead>
                        <TableHead>Açıklama</TableHead>
                        <TableHead>Abone Türü</TableHead>
                        <TableHead>Durum</TableHead>
                        <TableHead className="text-right">İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Başlık Bölümü</TableCell>
                        <TableCell>Kurum logosu ve fatura başlık bilgileri</TableCell>
                        <TableCell>Tümü</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Aktif
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">Düzenle</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Kademeli Tarife Tablosu</TableCell>
                        <TableCell>Tüketim kademelerine göre fiyatlandırma tablosu</TableCell>
                        <TableCell>Mesken</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Aktif
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">Düzenle</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Vergi Detayları</TableCell>
                        <TableCell>Fatura vergi hesaplamalarının detaylandırılması</TableCell>
                        <TableCell>Ticari, Sanayi</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Aktif
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">Düzenle</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reports">
              <div className="p-4">
                <h3 className="text-lg font-medium mb-4">Fatura Raporları</h3>
                <p className="text-muted-foreground mb-8">
                  Fatura ve tahsilat verilerinizi analiz edin, raporlar oluşturun ve dışa aktarın.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Aylık Tahsilat Özeti</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Cari ay için tahsilat performansı ve ödeme durumları
                      </p>
                      <Button variant="outline" className="w-full">Raporu Görüntüle</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Abone Kategorisi Raporu</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Farklı abone türlerine göre faturalama ve ödeme istatistikleri
                      </p>
                      <Button variant="outline" className="w-full">Raporu Görüntüle</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Ödeme Kanalları Analizi</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Online, banka, vezne vb. ödeme kanallarının kullanım analizi
                      </p>
                      <Button variant="outline" className="w-full">Raporu Görüntüle</Button>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Önceden Hazırlanmış Raporlar</h4>
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-1" />
                    Özel Rapor Oluştur
                  </Button>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rapor Adı</TableHead>
                        <TableHead>Dönem</TableHead>
                        <TableHead>Oluşturulma Tarihi</TableHead>
                        <TableHead>Durum</TableHead>
                        <TableHead className="text-right">İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Temmuz 2023 Tahsilat Raporu</TableCell>
                        <TableCell>Temmuz 2023</TableCell>
                        <TableCell>12/07/2023</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Hazır
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">Görüntüle</Button>
                            <Button variant="outline" size="sm">İndir</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Gecikmiş Ödemeler Raporu</TableCell>
                        <TableCell>Haziran 2023</TableCell>
                        <TableCell>05/07/2023</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Hazır
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">Görüntüle</Button>
                            <Button variant="outline" size="sm">İndir</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Bölgesel Tüketim Raporu</TableCell>
                        <TableCell>Q2 2023</TableCell>
                        <TableCell>01/07/2023</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Hazır
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">Görüntüle</Button>
                            <Button variant="outline" size="sm">İndir</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingSystem;
