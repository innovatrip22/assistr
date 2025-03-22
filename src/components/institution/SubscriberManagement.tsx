
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, FileText, CheckCircle, AlertCircle } from "lucide-react";

const subscribers = [
  {
    id: "AB-123456",
    name: "Ali Yılmaz",
    identityNo: "12345678901",
    type: "Mesken",
    status: "Aktif",
    address: "Lefkoşa, Dereboyu Cad. No:45",
    meterNo: "ELK-789012",
    paymentStatus: "Ödenmiş",
  },
  {
    id: "AB-123457",
    name: "Ayşe Öztürk",
    identityNo: "23456789012",
    type: "Mesken",
    status: "Aktif",
    address: "Girne, İskele Cad. No:23",
    meterNo: "ELK-789013",
    paymentStatus: "Borçlu",
  },
  {
    id: "AB-123458",
    name: "Mehmet Kaya",
    identityNo: "34567890123",
    type: "Ticari",
    status: "Aktif",
    address: "Gazimağusa, Salamis Yolu No:78",
    meterNo: "ELK-789014",
    paymentStatus: "Ödenmiş",
  },
  {
    id: "AB-123459",
    name: "Zeynep Demir",
    identityNo: "45678901234",
    type: "Mesken",
    status: "Askıda",
    address: "Lefkoşa, Kumsal Sok. No:12",
    meterNo: "ELK-789015",
    paymentStatus: "Borçlu",
  },
  {
    id: "AB-123460",
    name: "Kemal Şahin",
    identityNo: "56789012345",
    type: "Sanayi",
    status: "Aktif",
    address: "Güzelyurt, Sanayi Bölgesi No:5",
    meterNo: "ELK-789016",
    paymentStatus: "Kısmi Ödeme",
  },
];

const meterReadings = [
  {
    id: "MR-001",
    meterNo: "ELK-789012",
    date: "05/07/2023",
    reading: "4532",
    consumption: "210",
    reader: "Hakan Demir",
  },
  {
    id: "MR-002",
    meterNo: "ELK-789012",
    date: "05/06/2023",
    reading: "4322",
    consumption: "195",
    reader: "Hakan Demir",
  },
  {
    id: "MR-003",
    meterNo: "ELK-789012",
    date: "05/05/2023",
    reading: "4127",
    consumption: "175",
    reader: "Serkan Yıldız",
  },
];

const SubscriberManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);
  const [isNewSubscriberDialogOpen, setIsNewSubscriberDialogOpen] = useState(false);

  const filteredSubscribers = subscribers.filter(
    (sub) =>
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.identityNo.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Abone Yönetimi</CardTitle>
              <CardDescription>
                Elektrik abonelerinizi görüntüleyin ve yönetin
              </CardDescription>
            </div>
            <Dialog open={isNewSubscriberDialogOpen} onOpenChange={setIsNewSubscriberDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  <span>Yeni Abone</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Yeni Abone Kaydı</DialogTitle>
                  <DialogDescription>
                    Sisteme yeni bir elektrik abonesi ekleyin. Tüm alanları doldurduktan sonra kaydet butonuna basın.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ad Soyad</Label>
                    <Input id="name" placeholder="Abonenin adı ve soyadı" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="identityNo">TC Kimlik / Pasaport No</Label>
                    <Input id="identityNo" placeholder="Kimlik numarası" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Adres</Label>
                    <Input id="address" placeholder="Tam adres" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input id="phone" placeholder="Telefon numarası" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="meterNo">Sayaç No</Label>
                    <Input id="meterNo" placeholder="Sayaç numarası" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Abone Türü</Label>
                    <Select>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Abone türü seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mesken">Mesken</SelectItem>
                        <SelectItem value="ticari">Ticari</SelectItem>
                        <SelectItem value="sanayi">Sanayi</SelectItem>
                        <SelectItem value="resmi">Resmi Daire</SelectItem>
                        <SelectItem value="tarimsal">Tarımsal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2 mt-4 flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsNewSubscriberDialogOpen(false)}>
                      İptal
                    </Button>
                    <Button>Kaydet</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Abone ara... (İsim, Abone No, TC Kimlik No)"
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Abone Türü" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Aboneler</SelectItem>
                  <SelectItem value="mesken">Mesken</SelectItem>
                  <SelectItem value="ticari">Ticari</SelectItem>
                  <SelectItem value="sanayi">Sanayi</SelectItem>
                  <SelectItem value="resmi">Resmi Daire</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Durum" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Durumlar</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="suspended">Askıda</SelectItem>
                  <SelectItem value="delinquent">Borçlu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Abone No</TableHead>
                  <TableHead>Ad Soyad</TableHead>
                  <TableHead>Tür</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Ödeme Durumu</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscribers.map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell className="font-medium">{subscriber.id}</TableCell>
                    <TableCell>{subscriber.name}</TableCell>
                    <TableCell>{subscriber.type}</TableCell>
                    <TableCell>
                      {subscriber.status === "Aktif" ? (
                        <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Askıda
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {subscriber.paymentStatus === "Ödenmiş" ? (
                        <span className="text-green-600">Ödenmiş</span>
                      ) : subscriber.paymentStatus === "Kısmi Ödeme" ? (
                        <span className="text-blue-600">Kısmi Ödeme</span>
                      ) : (
                        <span className="text-red-600">Borçlu</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedSubscriber(subscriber)}
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            Detaylar
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[800px]">
                          <DialogHeader>
                            <DialogTitle>Abone Detayları</DialogTitle>
                            <DialogDescription>
                              Abone bilgileri, tüketim geçmişi ve faturalar
                            </DialogDescription>
                          </DialogHeader>
                          <Tabs defaultValue="info">
                            <TabsList className="grid w-full grid-cols-4">
                              <TabsTrigger value="info">Genel Bilgiler</TabsTrigger>
                              <TabsTrigger value="consumption">Tüketim Geçmişi</TabsTrigger>
                              <TabsTrigger value="contracts">Sözleşmeler</TabsTrigger>
                              <TabsTrigger value="payments">Ödemeler</TabsTrigger>
                            </TabsList>
                            <TabsContent value="info" className="p-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Abone Bilgileri</h4>
                                  <div className="space-y-1 text-sm">
                                    <p><span className="font-medium">Abone No:</span> {subscribers[0].id}</p>
                                    <p><span className="font-medium">Ad Soyad:</span> {subscribers[0].name}</p>
                                    <p><span className="font-medium">TC Kimlik No:</span> {subscribers[0].identityNo}</p>
                                    <p><span className="font-medium">Abone Türü:</span> {subscribers[0].type}</p>
                                    <p><span className="font-medium">Durum:</span> {subscribers[0].status}</p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Adres ve İletişim</h4>
                                  <div className="space-y-1 text-sm">
                                    <p><span className="font-medium">Adres:</span> {subscribers[0].address}</p>
                                    <p><span className="font-medium">Telefon:</span> 0533 123 4567</p>
                                    <p><span className="font-medium">E-posta:</span> ali.yilmaz@example.com</p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Sayaç Bilgileri</h4>
                                  <div className="space-y-1 text-sm">
                                    <p><span className="font-medium">Sayaç No:</span> {subscribers[0].meterNo}</p>
                                    <p><span className="font-medium">Kurulum Tarihi:</span> 15/03/2020</p>
                                    <p><span className="font-medium">Son Okuma:</span> 4532 kWh (05/07/2023)</p>
                                    <p><span className="font-medium">Tüketim (Son 30 gün):</span> 210 kWh</p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Ödeme Bilgileri</h4>
                                  <div className="space-y-1 text-sm">
                                    <p><span className="font-medium">Ödeme Durumu:</span> {subscribers[0].paymentStatus}</p>
                                    <p><span className="font-medium">Son Fatura:</span> ₺756,40 (Temmuz 2023)</p>
                                    <p><span className="font-medium">Son Ödeme Tarihi:</span> 15/07/2023</p>
                                    <p><span className="font-medium">Ödeme Yöntemi:</span> Otomatik Ödeme</p>
                                  </div>
                                </div>
                              </div>
                            </TabsContent>
                            <TabsContent value="consumption" className="p-4">
                              <h4 className="text-sm font-medium mb-4">Tüketim Geçmişi ve Sayaç Okumaları</h4>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Tarih</TableHead>
                                    <TableHead>Sayaç No</TableHead>
                                    <TableHead>Okuma Değeri</TableHead>
                                    <TableHead>Tüketim (kWh)</TableHead>
                                    <TableHead>Okuma Yapan</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {meterReadings.map((reading) => (
                                    <TableRow key={reading.id}>
                                      <TableCell>{reading.date}</TableCell>
                                      <TableCell>{reading.meterNo}</TableCell>
                                      <TableCell>{reading.reading}</TableCell>
                                      <TableCell>{reading.consumption}</TableCell>
                                      <TableCell>{reading.reader}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TabsContent>
                            <TabsContent value="contracts" className="p-4">
                              <div className="flex justify-between items-center mb-4">
                                <h4 className="text-sm font-medium">Sözleşmeler</h4>
                                <Button size="sm">
                                  <Plus className="h-4 w-4 mr-1" />
                                  Yeni Sözleşme Yükle
                                </Button>
                              </div>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Sözleşme No</TableHead>
                                    <TableHead>Türü</TableHead>
                                    <TableHead>Başlangıç Tarihi</TableHead>
                                    <TableHead>Bitiş Tarihi</TableHead>
                                    <TableHead>Durum</TableHead>
                                    <TableHead className="text-right">İşlemler</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">SOZ-201278</TableCell>
                                    <TableCell>Elektrik Abonelik</TableCell>
                                    <TableCell>15/03/2020</TableCell>
                                    <TableCell>Süresiz</TableCell>
                                    <TableCell>
                                      <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                        Aktif
                                      </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                      <Button variant="outline" size="sm">Görüntüle</Button>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TabsContent>
                            <TabsContent value="payments" className="p-4">
                              <h4 className="text-sm font-medium mb-4">Fatura ve Ödeme Geçmişi</h4>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Fatura No</TableHead>
                                    <TableHead>Dönem</TableHead>
                                    <TableHead>Tutar</TableHead>
                                    <TableHead>Son Ödeme Tarihi</TableHead>
                                    <TableHead>Ödeme Tarihi</TableHead>
                                    <TableHead>Durum</TableHead>
                                    <TableHead className="text-right">İşlemler</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">F-789023</TableCell>
                                    <TableCell>Temmuz 2023</TableCell>
                                    <TableCell>₺756,40</TableCell>
                                    <TableCell>15/07/2023</TableCell>
                                    <TableCell>10/07/2023</TableCell>
                                    <TableCell>
                                      <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                        Ödenmiş
                                      </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                      <Button variant="outline" size="sm">E-Fatura</Button>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">F-765431</TableCell>
                                    <TableCell>Haziran 2023</TableCell>
                                    <TableCell>₺705,20</TableCell>
                                    <TableCell>15/06/2023</TableCell>
                                    <TableCell>12/06/2023</TableCell>
                                    <TableCell>
                                      <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                        Ödenmiş
                                      </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                      <Button variant="outline" size="sm">E-Fatura</Button>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TabsContent>
                          </Tabs>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriberManagement;
