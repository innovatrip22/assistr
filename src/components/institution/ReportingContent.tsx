
import { useState } from "react";
import { BarChart3, DownloadCloud, RefreshCcw, Calendar as CalendarIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Progress } from "@/components/ui/progress";
import { BarChart, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Bar, Line } from "recharts";
import { DateRange } from "react-day-picker";

// Mock data
const consumptionData = [
  { month: "Ocak", value: 45200 },
  { month: "Şubat", value: 42800 },
  { month: "Mart", value: 38500 },
  { month: "Nisan", value: 35900 },
  { month: "Mayıs", value: 42300 },
  { month: "Haziran", value: 51800 },
  { month: "Temmuz", value: 63400 },
  { month: "Ağustos", value: 61200 },
  { month: "Eylül", value: 52700 },
  { month: "Ekim", value: 44800 },
  { month: "Kasım", value: 40100 },
  { month: "Aralık", value: 46500 }
];

const meterFailureData = [
  { month: "Ocak", failures: 24, total: 24680, rate: 0.097 },
  { month: "Şubat", failures: 21, total: 24710, rate: 0.085 },
  { month: "Mart", failures: 18, total: 24750, rate: 0.073 },
  { month: "Nisan", failures: 27, total: 24790, rate: 0.109 },
  { month: "Mayıs", failures: 32, total: 24820, rate: 0.129 },
  { month: "Haziran", failures: 29, total: 24850, rate: 0.117 }
];

const incidentResolutionData = [
  { day: "Pazartesi", avgTime: 3.2 },
  { day: "Salı", avgTime: 2.8 },
  { day: "Çarşamba", avgTime: 2.6 },
  { day: "Perşembe", avgTime: 4.1 },
  { day: "Cuma", avgTime: 3.7 },
  { day: "Cumartesi", avgTime: 5.4 },
  { day: "Pazar", avgTime: 6.2 }
];

const paymentRateData = [
  { month: "Ocak", rate: 92 },
  { month: "Şubat", rate: 88 },
  { month: "Mart", rate: 90 },
  { month: "Nisan", rate: 86 },
  { month: "Mayıs", rate: 84 },
  { month: "Haziran", rate: 82 }
];

const ReportingContent = () => {
  const [period, setPeriod] = useState("monthly");
  const [date, setDate] = useState<DateRange>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date()
  });

  // Ensure the date handler accepts DateRange
  const handleDateChange = (newDate: DateRange | undefined) => {
    if (newDate) {
      setDate(newDate);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Raporlama ve Analiz</CardTitle>
              <CardDescription>Sistem performans göstergeleri ve istatistikler</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              <Button variant="outline" size="sm">
                <DownloadCloud className="h-4 w-4 mr-2" />
                PDF İndir
              </Button>
              <Button variant="outline" size="sm">
                <DownloadCloud className="h-4 w-4 mr-2" />
                Excel İndir
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCcw className="h-4 w-4 mr-2" />
                Yenile
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Periyot Seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Günlük</SelectItem>
                <SelectItem value="weekly">Haftalık</SelectItem>
                <SelectItem value="monthly">Aylık</SelectItem>
                <SelectItem value="yearly">Yıllık</SelectItem>
              </SelectContent>
            </Select>
            
            <DatePickerWithRange date={date} setDate={handleDateChange} />
          </div>
          
          <Tabs defaultValue="consumption">
            <TabsList className="mb-6">
              <TabsTrigger value="consumption">Tüketim</TabsTrigger>
              <TabsTrigger value="meters">Sayaçlar</TabsTrigger>
              <TabsTrigger value="payments">Ödemeler</TabsTrigger>
              <TabsTrigger value="incidents">Arızalar</TabsTrigger>
              <TabsTrigger value="personnel">Personel</TabsTrigger>
              <TabsTrigger value="projects">Projeler</TabsTrigger>
            </TabsList>
            
            <TabsContent value="consumption">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Aylık Tüketim Raporu</CardTitle>
                    <CardDescription>kWh cinsinden</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={consumptionData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                      <div>Toplam Tüketim: 525,200 kWh</div>
                      <div>Ortalama: 43,767 kWh/ay</div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Kullanım Analizi</CardTitle>
                      <CardDescription>Tüketim dağılımı</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Konut</span>
                            <span className="text-sm font-medium">62%</span>
                          </div>
                          <Progress value={62} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">İşyeri</span>
                            <span className="text-sm font-medium">25%</span>
                          </div>
                          <Progress value={25} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Sanayi</span>
                            <span className="text-sm font-medium">8%</span>
                          </div>
                          <Progress value={8} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Kamu</span>
                            <span className="text-sm font-medium">5%</span>
                          </div>
                          <Progress value={5} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Bölgesel Tüketim</CardTitle>
                      <CardDescription>Son 30 gün</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Lefkoşa</span>
                            <span className="text-sm font-medium">14,350 kWh</span>
                          </div>
                          <Progress value={72} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Girne</span>
                            <span className="text-sm font-medium">11,260 kWh</span>
                          </div>
                          <Progress value={56} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Mağusa</span>
                            <span className="text-sm font-medium">8,740 kWh</span>
                          </div>
                          <Progress value={44} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Güzelyurt</span>
                            <span className="text-sm font-medium">5,620 kWh</span>
                          </div>
                          <Progress value={28} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">İskele</span>
                            <span className="text-sm font-medium">2,330 kWh</span>
                          </div>
                          <Progress value={12} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="meters">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Sayaç Arıza Oranları</CardTitle>
                  <CardDescription>Son 6 ay</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={meterFailureData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" orientation="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="failures"
                          stroke="#f59e0b"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="rate"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="p-3 bg-amber-50 rounded-md border border-amber-200">
                      <h4 className="text-sm font-medium text-amber-800">Toplam Arıza</h4>
                      <p className="text-2xl font-bold text-amber-700">151</p>
                      <p className="text-xs text-amber-600">Son 6 ay</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
                      <h4 className="text-sm font-medium text-blue-800">Ortalama Arıza Oranı</h4>
                      <p className="text-2xl font-bold text-blue-700">%0.10</p>
                      <p className="text-xs text-blue-600">Toplam sayaç sayısına göre</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Fatura Ödeme Oranları</CardTitle>
                  <CardDescription>Son 6 ay</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={paymentRateData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis domain={[75, 100]} />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="rate"
                          stroke="#10b981"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="p-3 bg-green-50 rounded-md border border-green-200">
                      <h4 className="text-sm font-medium text-green-800">Ortalama Ödeme</h4>
                      <p className="text-2xl font-bold text-green-700">%87</p>
                      <p className="text-xs text-green-600">Son 6 ay</p>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-md border border-amber-200">
                      <h4 className="text-sm font-medium text-amber-800">Geç Ödeme</h4>
                      <p className="text-2xl font-bold text-amber-700">%8</p>
                      <p className="text-xs text-amber-600">Vade sonrası ödenen</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded-md border border-red-200">
                      <h4 className="text-sm font-medium text-red-800">Ödenmeyen</h4>
                      <p className="text-2xl font-bold text-red-700">%5</p>
                      <p className="text-xs text-red-600">30 gün üzeri gecikme</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="incidents">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Arıza Çözüm Süreleri</CardTitle>
                  <CardDescription>Ortalama müdahale süresi (saat)</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={incidentResolutionData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="avgTime" fill="#ef4444" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-md border border-gray-200">
                      <h4 className="text-sm font-medium">Haftalık Ortalama</h4>
                      <p className="text-2xl font-bold">4.0 saat</p>
                      <p className="text-xs text-gray-600">Hedef: 3.5 saat</p>
                    </div>
                    <div className="p-3 rounded-md border border-gray-200">
                      <h4 className="text-sm font-medium">Toplam Arıza Sayısı</h4>
                      <p className="text-2xl font-bold">82</p>
                      <p className="text-xs text-gray-600">Son 7 gün</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="personnel">
              <div className="py-12 text-center">
                <BarChart3 className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium mb-1">Personel Raporları</h3>
                <p className="text-gray-500 mb-4">Bu sekme henüz içerik eklenmemiştir.</p>
                <Button>Rapor Oluştur</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="projects">
              <div className="py-12 text-center">
                <BarChart3 className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium mb-1">Proje Raporları</h3>
                <p className="text-gray-500 mb-4">Bu sekme henüz içerik eklenmemiştir.</p>
                <Button>Rapor Oluştur</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportingContent;
