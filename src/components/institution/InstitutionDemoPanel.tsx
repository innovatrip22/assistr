
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Building,
  Map,
  FileText,
  BarChart3,
  Users,
  AlertTriangle,
  MapPin,
  Layers,
  Settings,
  Search,
  Check,
  Clock,
  FileSearch,
  TrendingUp,
  Calendar,
  RotateCw,
  Circle
} from "lucide-react";
import MapSection from "./MapSection";
import EmergencyReportsList from "./EmergencyReportsList";
import PriceReportsList from "./PriceReportsList";
import FraudReportsList from "./FraudReportsList";
import FeedbackList from "./FeedbackList";

const InstitutionDemoPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const statistics = {
    totalReports: 1243,
    resolvedReports: 983,
    pendingReports: 260,
    avgResponseTime: "8.6 saat",
    touristSatisfaction: 82,
    businessCompliance: 76,
    activeIssues: 42
  };

  const recentActivities = [
    { id: 1, type: "emergency", title: "Girne sahilinde acil durum raporu", time: "12 dakika önce", status: "processing" },
    { id: 2, type: "price", title: "Fiyat şikayeti yanıtlandı: Royal Restaurant", time: "23 dakika önce", status: "resolved" },
    { id: 3, type: "fraud", title: "Sahte tur operatörü raporu onaylandı", time: "48 dakika önce", status: "resolved" },
    { id: 4, type: "feedback", title: "Gazimağusa turizm ofisi hakkında geri bildirim", time: "1 saat önce", status: "processing" },
    { id: 5, type: "emergency", title: "Lefkoşa'da kayıp turist bildirimi", time: "2 saat önce", status: "resolved" }
  ];

  const renderActivityIcon = (type: string) => {
    switch (type) {
      case "emergency":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "price":
        return <FileSearch className="h-4 w-4 text-amber-500" />;
      case "fraud":
        return <AlertTriangle className="h-4 w-4 text-purple-500" />;
      case "feedback":
        return <FileText className="h-4 w-4 text-blue-500" />;
      default:
        return <Circle className="h-4 w-4" />;
    }
  };

  const trendingIssues = [
    { id: 1, title: "Restoranlarda fiyat şikayetleri", count: 28, trend: "up", percent: 12 },
    { id: 2, title: "Tur operatörleri sahte rezervasyonları", count: 16, trend: "up", percent: 8 },
    { id: 3, title: "Plajlarda temizlik sorunları", count: 12, trend: "down", percent: 5 },
    { id: 4, title: "Taksi ücretleri şikayetleri", count: 10, trend: "up", percent: 15 }
  ];

  const touristDistribution = [
    { region: "Girne", count: 4250, percent: 42 },
    { region: "Gazimağusa", count: 2850, percent: 28 },
    { region: "Lefkoşa", count: 1530, percent: 15 },
    { region: "İskele", count: 1020, percent: 10 },
    { region: "Güzelyurt", count: 510, percent: 5 }
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50">
          <CardTitle className="text-2xl font-bold text-center text-amber-800 flex items-center justify-center gap-2">
            <span className="bg-amber-100 p-2 rounded-full">
              <Building className="h-6 w-6 text-amber-600" />
            </span>
            Kamu Kurumu Yönetim Paneli Demosu
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-center mb-6">
            <p className="text-gray-700 mb-3">
              Bu demo, AssisTR platformunun kamu kurumları için sunduğu gelişmiş izleme, yanıt ve analiz 
              araçlarını göstermektedir. Turizm ekosistemindeki tüm paydaşların verilerini birleştirerek 
              karar vericilere yardımcı olur.
            </p>
            <div className="flex justify-center">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <RotateCw className="h-4 w-4" />
                Demo Verileri Güncelle
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
            <TabsList className="w-full flex overflow-x-auto">
              <TabsTrigger value="dashboard" className="flex items-center">
                <BarChart3 className="mr-2 h-4 w-4" />
                Gösterge Paneli
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center">
                <Map className="mr-2 h-4 w-4" />
                Turizm Haritası
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Şikayet & Raporlar
              </TabsTrigger>
              <TabsTrigger value="feedback" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Geri Bildirimler
              </TabsTrigger>
              <TabsTrigger value="analysis" className="flex items-center">
                <Layers className="mr-2 h-4 w-4" />
                Veri Analizi
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Ayarlar
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              {/* Dashboard Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 flex items-center">
                    <div className="rounded-full bg-blue-100 p-3 mr-4">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Toplam Raporlar</p>
                      <p className="text-2xl font-bold">{statistics.totalReports}</p>
                      <p className="text-xs text-muted-foreground">Son 30 gün</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex items-center">
                    <div className="rounded-full bg-green-100 p-3 mr-4">
                      <Check className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Çözülen Sorunlar</p>
                      <p className="text-2xl font-bold">{statistics.resolvedReports}</p>
                      <p className="text-xs text-green-600 font-medium">{Math.round((statistics.resolvedReports/statistics.totalReports)*100)}% çözüm oranı</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex items-center">
                    <div className="rounded-full bg-amber-100 p-3 mr-4">
                      <Clock className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Yanıt Süresi</p>
                      <p className="text-2xl font-bold">{statistics.avgResponseTime}</p>
                      <p className="text-xs text-muted-foreground">Ortalama</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex items-center">
                    <div className="rounded-full bg-purple-100 p-3 mr-4">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Turist Memnuniyeti</p>
                      <p className="text-2xl font-bold">%{statistics.touristSatisfaction}</p>
                      <p className="text-xs text-purple-600 font-medium">%3 artış</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Son Aktiviteler</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[320px] pr-4">
                      <div className="space-y-3">
                        {recentActivities.map((activity) => (
                          <div 
                            key={activity.id} 
                            className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                          >
                            <div className={`rounded-full p-2 ${
                              activity.type === 'emergency' ? 'bg-red-100' : 
                              activity.type === 'price' ? 'bg-amber-100' : 
                              activity.type === 'fraud' ? 'bg-purple-100' : 
                              'bg-blue-100'
                            }`}>
                              {renderActivityIcon(activity.type)}
                            </div>
                            <div className="flex-grow">
                              <p className="font-medium text-sm">{activity.title}</p>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs text-muted-foreground">{activity.time}</span>
                                <Badge className={
                                  activity.status === 'resolved' ? 'bg-green-100 text-green-800' : 
                                  'bg-amber-100 text-amber-800'
                                }>
                                  {activity.status === 'resolved' ? 'Çözüldü' : 'İşleniyor'}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
                
                {/* Trending Issues */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Öne Çıkan Sorunlar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[320px] pr-4">
                      <div className="space-y-3">
                        {trendingIssues.map((issue) => (
                          <div 
                            key={issue.id} 
                            className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                          >
                            <div className="flex-grow">
                              <p className="font-medium text-sm">{issue.title}</p>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs font-medium">{issue.count} rapor</span>
                                <div className="flex items-center text-xs">
                                  {issue.trend === 'up' ? (
                                    <TrendingUp className="h-3 w-3 text-red-500 mr-1" />
                                  ) : (
                                    <TrendingUp className="h-3 w-3 text-green-500 mr-1 transform rotate-180" />
                                  )}
                                  <span className={issue.trend === 'up' ? 'text-red-500' : 'text-green-500'}>
                                    {issue.trend === 'up' ? '+' : '-'}{issue.percent}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tourist Distribution */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Turist Dağılımı</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {touristDistribution.map((region) => (
                        <div key={region.region} className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">{region.region}</span>
                            <span className="text-sm text-muted-foreground">{region.count} turist</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${region.percent}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Upcoming Events */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Yaklaşan Etkinlikler</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                        <div className="rounded-full bg-blue-100 p-2">
                          <Calendar className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium text-sm">Girne Turizm Festivali</p>
                          <p className="text-xs text-muted-foreground">25-27 Eylül 2023</p>
                          <Badge className="mt-1 bg-green-100 text-green-800">128 kayıtlı turist</Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                        <div className="rounded-full bg-purple-100 p-2">
                          <Calendar className="h-4 w-4 text-purple-600" />
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium text-sm">Uluslararası Gastronomi Günleri</p>
                          <p className="text-xs text-muted-foreground">1-5 Ekim 2023</p>
                          <Badge className="mt-1 bg-green-100 text-green-800">82 kayıtlı turist</Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                        <div className="rounded-full bg-amber-100 p-2">
                          <Calendar className="h-4 w-4 text-amber-600" />
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium text-sm">Salamis Antik Kenti Gezi Turu</p>
                          <p className="text-xs text-muted-foreground">10 Ekim 2023</p>
                          <Badge className="mt-1 bg-green-100 text-green-800">45 kayıtlı turist</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="map">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>KKTC Turizm Haritası</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        Yeni Nokta
                      </Button>
                      <Button variant="outline" size="sm">
                        <Search className="h-4 w-4 mr-1" />
                        Filtreler
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <MapSection />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Şikayet ve Raporlar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="emergency">
                    <TabsList className="mb-4">
                      <TabsTrigger value="emergency" className="text-red-700">Acil Durumlar</TabsTrigger>
                      <TabsTrigger value="price">Fiyat Şikayetleri</TabsTrigger>
                      <TabsTrigger value="fraud">Dolandırıcılık</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="emergency">
                      <EmergencyReportsList />
                    </TabsContent>
                    
                    <TabsContent value="price">
                      <PriceReportsList />
                    </TabsContent>
                    
                    <TabsContent value="fraud">
                      <FraudReportsList />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="feedback">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Geri Bildirimler</CardTitle>
                </CardHeader>
                <CardContent>
                  <FeedbackList />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analysis">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Veri Analizi ve Raporlar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Turizm İstatistikleri</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-md space-y-2">
                            <h4 className="font-medium">Yıllık Ziyaretçi Sayısı</h4>
                            <div className="grid grid-cols-4 gap-2">
                              <div className="text-center">
                                <div className="text-xl font-bold">1.2M</div>
                                <div className="text-xs text-muted-foreground">Toplam</div>
                              </div>
                              <div className="text-center">
                                <div className="text-xl font-bold">780K</div>
                                <div className="text-xs text-muted-foreground">Türkiye</div>
                              </div>
                              <div className="text-center">
                                <div className="text-xl font-bold">240K</div>
                                <div className="text-xs text-muted-foreground">Avrupa</div>
                              </div>
                              <div className="text-center">
                                <div className="text-xl font-bold">180K</div>
                                <div className="text-xs text-muted-foreground">Diğer</div>
                              </div>
                            </div>
                            <div className="h-2 bg-blue-100 rounded-full overflow-hidden mt-2">
                              <div className="h-full bg-blue-500 rounded-full" style={{ width: "65%" }}></div>
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Türkiye: 65%</span>
                              <span>Avrupa: 20%</span>
                              <span>Diğer: 15%</span>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-md space-y-2">
                            <h4 className="font-medium">Konaklama İstatistikleri</h4>
                            <div className="grid grid-cols-3 gap-2">
                              <div className="text-center">
                                <div className="text-xl font-bold">4.5</div>
                                <div className="text-xs text-muted-foreground">Ortalama Gün</div>
                              </div>
                              <div className="text-center">
                                <div className="text-xl font-bold">€120</div>
                                <div className="text-xs text-muted-foreground">Gece/Kişi</div>
                              </div>
                              <div className="text-center">
                                <div className="text-xl font-bold">%78</div>
                                <div className="text-xs text-muted-foreground">Doluluk</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-md space-y-2">
                            <h4 className="font-medium">Ekonomik Etki</h4>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="text-center">
                                <div className="text-xl font-bold">$980M</div>
                                <div className="text-xs text-muted-foreground">Toplam Gelir</div>
                              </div>
                              <div className="text-center">
                                <div className="text-xl font-bold">%35</div>
                                <div className="text-xs text-muted-foreground">GSMH Payı</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">AI Destekli Analizler</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                            <h4 className="font-medium text-blue-800 mb-2">Turist Memnuniyeti Analizi</h4>
                            <p className="text-sm text-gray-700 mb-3">
                              AssisTR yapay zeka, 10,000+ yorum ve geri bildirimi analiz ederek memnuniyet 
                              faktörlerini belirledi:
                            </p>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Konaklama Kalitesi</span>
                                <div className="h-2 w-40 bg-gray-200 rounded-full overflow-hidden">
                                  <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }}></div>
                                </div>
                                <span className="text-xs font-medium">85%</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Yeme-İçme</span>
                                <div className="h-2 w-40 bg-gray-200 rounded-full overflow-hidden">
                                  <div className="h-full bg-green-500 rounded-full" style={{ width: "92%" }}></div>
                                </div>
                                <span className="text-xs font-medium">92%</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Ulaşım</span>
                                <div className="h-2 w-40 bg-gray-200 rounded-full overflow-hidden">
                                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "68%" }}></div>
                                </div>
                                <span className="text-xs font-medium">68%</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Fiyat-Performans</span>
                                <div className="h-2 w-40 bg-gray-200 rounded-full overflow-hidden">
                                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "72%" }}></div>
                                </div>
                                <span className="text-xs font-medium">72%</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-purple-50 p-4 rounded-md border border-purple-100">
                            <h4 className="font-medium text-purple-800 mb-2">Turizm Trendleri</h4>
                            <p className="text-sm text-gray-700 mb-3">
                              Yapay zeka, sosyal medya ve arama motoru verilerini analiz ederek KKTC için 
                              yükselen turizm trendlerini belirledi:
                            </p>
                            <div className="space-y-1">
                              <Badge className="bg-purple-100 text-purple-800 mr-1 mb-1">Gastronomi Turizmi (+32%)</Badge>
                              <Badge className="bg-purple-100 text-purple-800 mr-1 mb-1">Wellness & Spa (+24%)</Badge>
                              <Badge className="bg-purple-100 text-purple-800 mr-1 mb-1">Eko Turizm (+18%)</Badge>
                              <Badge className="bg-purple-100 text-purple-800 mr-1 mb-1">Dijital Göçebe (+15%)</Badge>
                              <Badge className="bg-purple-100 text-purple-800 mr-1 mb-1">Tarihi Yerler (+12%)</Badge>
                            </div>
                          </div>
                          
                          <Button className="w-full" variant="outline">
                            <FileText className="mr-2 h-4 w-4" />
                            Detaylı Raporu İndir
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Sistem Ayarları</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h3 className="text-lg font-medium">Erişim ve Güvenlik</h3>
                        <div className="space-y-1.5">
                          <label htmlFor="apiAccess" className="text-sm font-medium">API Erişimi</label>
                          <div className="flex">
                            <select
                              id="apiAccess"
                              className="flex h-10 w-full rounded-l-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                              defaultValue="restricted"
                            >
                              <option value="open">Açık Erişim</option>
                              <option value="restricted">Kısıtlı Erişim</option>
                              <option value="closed">Kapalı Erişim</option>
                            </select>
                            <Button variant="outline" className="rounded-l-none">Kaydet</Button>
                          </div>
                        </div>
                        
                        <div className="space-y-1.5">
                          <label htmlFor="dataSharing" className="text-sm font-medium">Veri Paylaşımı</label>
                          <div className="flex">
                            <select
                              id="dataSharing"
                              className="flex h-10 w-full rounded-l-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                              defaultValue="anonymized"
                            >
                              <option value="full">Tam Paylaşım</option>
                              <option value="anonymized">Anonimleştirilmiş Veri</option>
                              <option value="none">Paylaşım Yok</option>
                            </select>
                            <Button variant="outline" className="rounded-l-none">Kaydet</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="text-lg font-medium">Bildirimler</h3>
                        <div className="bg-gray-50 p-3 rounded-md space-y-3">
                          <div className="flex items-center justify-between">
                            <label htmlFor="emergencyAlert" className="text-sm">Acil Durum Bildirimleri</label>
                            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-5"></span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <label htmlFor="reportAlert" className="text-sm">Yeni Rapor Bildirimleri</label>
                            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-5"></span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <label htmlFor="statisticsAlert" className="text-sm">İstatistik Güncellemeleri</label>
                            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium">AI ve Veri Analizi Ayarları</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label htmlFor="aiModel" className="text-sm font-medium">AI Model Seçimi</label>
                          <select
                            id="aiModel"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                            defaultValue="gpt-4"
                          >
                            <option value="gpt-4">GPT-4 (Gelişmiş)</option>
                            <option value="gpt-3">GPT-3.5 (Standart)</option>
                            <option value="custom">Özelleştirilmiş Model</option>
                          </select>
                        </div>
                        
                        <div className="space-y-1.5">
                          <label htmlFor="dataRefresh" className="text-sm font-medium">Veri Yenileme Sıklığı</label>
                          <select
                            id="dataRefresh"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                            defaultValue="hours-6"
                          >
                            <option value="hours-1">Her saat</option>
                            <option value="hours-6">6 Saatte bir</option>
                            <option value="daily">Günlük</option>
                            <option value="weekly">Haftalık</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="space-y-1.5">
                        <label htmlFor="dataRetention" className="text-sm font-medium">Veri Saklama Politikası</label>
                        <select
                          id="dataRetention"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                          defaultValue="year-1"
                        >
                          <option value="month-3">3 Ay</option>
                          <option value="month-6">6 Ay</option>
                          <option value="year-1">1 Yıl</option>
                          <option value="year-3">3 Yıl</option>
                          <option value="indefinite">Süresiz</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button variant="outline" className="mr-2">Varsayılan Ayarlara Dön</Button>
                      <Button>Ayarları Kaydet</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstitutionDemoPanel;
