import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Badge
} from "@/components/ui/badge";
import {
  Button
} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  ScrollArea
} from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { 
  Store, 
  CircleAlert, 
  ShieldAlert, 
  CheckCircle, 
  AlertTriangle,
  X,
  Plus,
  Search,
  Filter
} from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  getBusinesses, 
  addBusiness, 
  updateBusinessStatus, 
  getReportsForBusiness,
  type Business
} from "@/services/dataService";

const businessFormSchema = z.object({
  name: z.string().min(3, {
    message: "İşletme adı en az 3 karakter olmalıdır.",
  }),
  type: z.enum(["restaurant", "hotel", "shop", "entertainment", "other"], {
    required_error: "İşletme türü seçiniz.",
  }),
  address: z.string().min(5, {
    message: "Adres en az 5 karakter olmalıdır.",
  }),
  status: z.enum(["verified", "unverified", "flagged"], {
    required_error: "Durum seçiniz.",
  }),
});

const BusinessPanel = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [businessReports, setBusinessReports] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const form = useForm<z.infer<typeof businessFormSchema>>({
    resolver: zodResolver(businessFormSchema),
    defaultValues: {
      name: "",
      type: "restaurant",
      address: "",
      status: "unverified",
    },
  });

  useEffect(() => {
    loadBusinesses();
  }, []);

  const loadBusinesses = () => {
    setBusinesses(getBusinesses());
  };

  const handleSelectBusiness = (business: Business) => {
    setSelectedBusiness(business);
    const reports = getReportsForBusiness(business.name);
    setBusinessReports(reports);
  };

  const handleUpdateBusinessStatus = (id: string, status: 'verified' | 'unverified' | 'flagged') => {
    updateBusinessStatus(id, status);
    loadBusinesses();
    if (selectedBusiness && selectedBusiness.id === id) {
      setSelectedBusiness({...selectedBusiness, status});
    }
    
    const statusMessages = {
      verified: "İşletme doğrulandı.",
      unverified: "İşletme doğrulanmamış olarak işaretlendi.",
      flagged: "İşletme riskli olarak işaretlendi."
    };
    
    toast({
      title: "Durum Güncellendi",
      description: statusMessages[status],
    });
  };

  const onSubmit = (data: z.infer<typeof businessFormSchema>) => {
    const businessData = {
      name: data.name,
      type: data.type,
      address: data.address,
      status: data.status,
    };
    
    addBusiness(businessData);
    loadBusinesses();
    form.reset();
    toast({
      title: "İşletme Eklendi",
      description: "Yeni işletme başarıyla kaydedildi.",
    });
  };

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          business.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || business.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-8">İşletme Paneli</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Store className="w-6 h-6 text-primary" />
                  <CardTitle>İşletmeler</CardTitle>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Yeni İşletme Ekle
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Yeni İşletme Ekle</DialogTitle>
                      <DialogDescription>
                        İşletme bilgilerini girerek sisteme yeni bir işletme ekleyin.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>İşletme Adı</FormLabel>
                              <FormControl>
                                <Input placeholder="İşletme adını giriniz" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>İşletme Türü</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="İşletme türü seçiniz" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="restaurant">Restoran</SelectItem>
                                  <SelectItem value="hotel">Otel</SelectItem>
                                  <SelectItem value="shop">Mağaza</SelectItem>
                                  <SelectItem value="entertainment">Eğlence Merkezi</SelectItem>
                                  <SelectItem value="other">Diğer</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Adres</FormLabel>
                              <FormControl>
                                <Textarea placeholder="İşletme adresini giriniz" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Durum</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Durum seçiniz" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="verified">Doğrulanmış</SelectItem>
                                  <SelectItem value="unverified">Doğrulanmamış</SelectItem>
                                  <SelectItem value="flagged">Riskli</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <DialogFooter>
                          <Button type="submit">İşletme Ekle</Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
              <CardDescription>
                Sistemde kayıtlı tüm işletmeleri görüntüleyin ve yönetin
              </CardDescription>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="İşletme ara..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select onValueChange={setFilterStatus} defaultValue="all">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Durum filtresi" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Durumlar</SelectItem>
                    <SelectItem value="verified">Doğrulanmış</SelectItem>
                    <SelectItem value="unverified">Doğrulanmamış</SelectItem>
                    <SelectItem value="flagged">Riskli</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>İşletme Adı</TableHead>
                      <TableHead>Türü</TableHead>
                      <TableHead>Durum</TableHead>
                      <TableHead>Raporlar</TableHead>
                      <TableHead>İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBusinesses.length > 0 ? (
                      filteredBusinesses.map((business) => (
                        <TableRow key={business.id} 
                          className={selectedBusiness?.id === business.id ? "bg-gray-100" : ""}
                          onClick={() => handleSelectBusiness(business)}
                        >
                          <TableCell className="font-medium">{business.name}</TableCell>
                          <TableCell>
                            {
                              business.type === "restaurant" ? "Restoran" :
                              business.type === "hotel" ? "Otel" :
                              business.type === "shop" ? "Mağaza" :
                              business.type === "entertainment" ? "Eğlence Merkezi" : "Diğer"
                            }
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                business.status === "verified" ? "default" : 
                                business.status === "flagged" ? "destructive" : "outline"
                              }
                            >
                              {
                                business.status === "verified" ? "Doğrulanmış" :
                                business.status === "flagged" ? "Riskli" : "Doğrulanmamış"
                              }
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              {business.priceReports > 0 && (
                                <Badge variant="secondary" className="text-xs">
                                  {business.priceReports} Fiyat
                                </Badge>
                              )}
                              {business.fraudReports > 0 && (
                                <Badge variant="destructive" className="text-xs">
                                  {business.fraudReports} Sahtekarlık
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              {business.status !== "verified" && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpdateBusinessStatus(business.id, "verified");
                                  }}
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                              )}
                              {business.status !== "flagged" && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpdateBusinessStatus(business.id, "flagged");
                                  }}
                                >
                                  <AlertTriangle className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                          Kriterlere uygun işletme bulunamadı
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <CircleAlert className="w-6 h-6 text-primary" />
                <CardTitle>İşletme Detayları</CardTitle>
              </div>
              <CardDescription>
                Seçili işletme hakkında detaylı bilgiler
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedBusiness ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold">{selectedBusiness.name}</h3>
                    <p className="text-gray-500">{selectedBusiness.address}</p>
                    <div className="flex items-center mt-2">
                      <Badge 
                        variant={
                          selectedBusiness.status === "verified" ? "default" : 
                          selectedBusiness.status === "flagged" ? "destructive" : "outline"
                        }
                        className="mr-2"
                      >
                        {
                          selectedBusiness.status === "verified" ? "Doğrulanmış" :
                          selectedBusiness.status === "flagged" ? "Riskli" : "Doğrulanmamış"
                        }
                      </Badge>
                      <span className="text-sm text-gray-500">
                        Kayıt: {format(new Date(selectedBusiness.registrationDate), 'dd MMM yyyy', {locale: tr})}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">İstatistikler</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-amber-50 p-3 rounded-lg">
                        <p className="text-amber-800 text-sm font-medium">Fiyat Raporları</p>
                        <p className="text-2xl font-bold text-amber-700">{selectedBusiness.priceReports}</p>
                      </div>
                      <div className="bg-red-50 p-3 rounded-lg">
                        <p className="text-red-800 text-sm font-medium">Sahtekarlık Raporları</p>
                        <p className="text-2xl font-bold text-red-700">{selectedBusiness.fraudReports}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Son Raporlar</h4>
                    {businessReports.length > 0 ? (
                      <ScrollArea className="h-[250px]">
                        <div className="space-y-3">
                          {businessReports.map((report, index) => (
                            <div 
                              key={index} 
                              className={`p-3 rounded-lg border ${
                                report.type === 'price' ? 'border-amber-300 bg-amber-50' : 
                                report.type === 'fraud' ? 'border-red-300 bg-red-50' : 
                                'border-gray-300 bg-gray-50'
                              }`}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h5 className="font-medium text-sm">
                                    {report.type === 'price' ? 'Fahiş Fiyat' : 
                                     report.type === 'fraud' ? 'Sahtekarlık' : 
                                     'Diğer'}
                                  </h5>
                                  {report.productName && (
                                    <p className="text-xs text-gray-600">{report.productName}</p>
                                  )}
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {format(new Date(report.timestamp), 'dd MMM', {locale: tr})}
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">{report.description}</p>
                              {report.type === 'price' && report.paidPrice && report.normalPrice && (
                                <div className="mt-1 text-xs flex gap-2">
                                  <span className="text-red-500">{report.paidPrice} TL</span>
                                  <span>vs</span>
                                  <span className="text-green-500">{report.normalPrice} TL</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    ) : (
                      <div className="text-center py-10 text-gray-500">
                        <ShieldAlert className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>Bu işletme için henüz rapor bulunmuyor</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500 h-[400px] flex flex-col items-center justify-center">
                  <Store className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Detayları görüntülemek için bir işletme seçin</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default BusinessPanel;
