
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Institution } from "@/services";

interface DepartmentContentProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  institution: Institution | null;
  departmentId: string;
}

const DepartmentContent = ({ 
  title, 
  description, 
  icon, 
  institution, 
  departmentId 
}: DepartmentContentProps) => {
  
  const renderDepartmentContent = () => {
    switch (departmentId) {
      case "feedback":
        return (
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="active">Aktif Geri Bildirimler</TabsTrigger>
              <TabsTrigger value="resolved">Çözülen Geri Bildirimler</TabsTrigger>
              <TabsTrigger value="all">Tüm Geri Bildirimler</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Geri Bildirim İstatistikleri</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-600">Bekleyen</p>
                      <p className="text-2xl font-bold">24</p>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg">
                      <p className="text-sm text-amber-600">İşlemde</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm text-green-600">Çözüldü</p>
                      <p className="text-2xl font-bold">48</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <Card key={item} className="hover:bg-gray-50 transition-colors">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg">Hizmet Kalitesi Hakkında</CardTitle>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">Beklemede</span>
                      </div>
                      <CardDescription>Mehmet Y. - 2 gün önce</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3">
                        Kurumunuzda geçen hafta aldığım hizmet konusunda bazı önerilerim olacak...
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Yanıtla</Button>
                        <Button size="sm" variant="outline">Görevlendir</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="resolved" className="space-y-4">
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <Card key={item} className="hover:bg-gray-50 transition-colors">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg">İşlem Süresi Hakkında</CardTitle>
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs">Çözüldü</span>
                      </div>
                      <CardDescription>Ayşe K. - 1 hafta önce</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3">
                        İşlemlerimin çok hızlı halledilmesinden memnun kaldım...
                      </p>
                      <div className="bg-gray-50 p-3 rounded-lg border text-sm">
                        <p className="font-medium">Yanıtınız:</p>
                        <p className="text-gray-600">Değerli geri bildiriminiz için teşekkür ederiz...</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>Tüm Geri Bildirimler</CardTitle>
                  <CardDescription>Son 30 günde alınan tüm geri bildirimler</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-700">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                          <th className="px-6 py-3">ID</th>
                          <th className="px-6 py-3">Konu</th>
                          <th className="px-6 py-3">Gönderen</th>
                          <th className="px-6 py-3">Tarih</th>
                          <th className="px-6 py-3">Durum</th>
                          <th className="px-6 py-3">İşlem</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[1, 2, 3, 4, 5].map((item) => (
                          <tr key={item} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4">FB-{1000 + item}</td>
                            <td className="px-6 py-4">Çeşitli Konular</td>
                            <td className="px-6 py-4">Kullanıcı {item}</td>
                            <td className="px-6 py-4">10.06.2023</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded text-xs ${
                                item % 3 === 0 ? 'bg-green-100 text-green-800' : 
                                item % 3 === 1 ? 'bg-blue-100 text-blue-800' : 
                                'bg-amber-100 text-amber-800'
                              }`}>
                                {item % 3 === 0 ? 'Çözüldü' : 
                                 item % 3 === 1 ? 'Beklemede' : 
                                 'İşlemde'}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <Button size="sm" variant="outline">Detay</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        );
      
      case "reports":
        return (
          <Tabs defaultValue="daily" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="daily">Günlük Raporlar</TabsTrigger>
              <TabsTrigger value="weekly">Haftalık Raporlar</TabsTrigger>
              <TabsTrigger value="monthly">Aylık Raporlar</TabsTrigger>
            </TabsList>
            <TabsContent value="daily" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="hover:bg-gray-50 transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Ziyaretçi İstatistikleri</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">1,245</p>
                    <p className="text-sm text-green-600">+12% artış</p>
                  </CardContent>
                </Card>
                <Card className="hover:bg-gray-50 transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">İşlem Sayısı</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">328</p>
                    <p className="text-sm text-green-600">+5% artış</p>
                  </CardContent>
                </Card>
                <Card className="hover:bg-gray-50 transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Memnuniyet Oranı</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">92%</p>
                    <p className="text-sm text-green-600">+3% artış</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Günlük Aktivite Raporu</CardTitle>
                  <CardDescription>Son 24 saat içindeki işlem dağılımı</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <p>Grafik burada görüntülenecek</p>
                    <p className="text-sm">Son 24 saatlik veriler</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="weekly">
              <Card>
                <CardHeader>
                  <CardTitle>Haftalık Performans Raporu</CardTitle>
                  <CardDescription>Son 7 gün içindeki performans metrikleri</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <p>Haftalık performans grafiği burada görüntülenecek</p>
                    <p className="text-sm">Son 7 günün verileri</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="monthly">
              <Card>
                <CardHeader>
                  <CardTitle>Aylık Genel Bakış</CardTitle>
                  <CardDescription>Son 30 gün içindeki genel istatistikler</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <p>Aylık istatistik grafiği burada görüntülenecek</p>
                    <p className="text-sm">Son 30 günün verileri</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        );
        
      case "electricity":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-red-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-red-800">Aktif Arızalar</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-red-800">12</p>
                  <p className="text-sm text-red-600">3 kritik durum</p>
                </CardContent>
              </Card>
              <Card className="bg-amber-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-amber-800">İşlem Bekleyen</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-amber-800">28</p>
                  <p className="text-sm text-amber-600">Son 24 saat</p>
                </CardContent>
              </Card>
              <Card className="bg-blue-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-blue-800">Devam Eden Onarım</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-blue-800">7</p>
                  <p className="text-sm text-blue-600">2 saha ekibi görevde</p>
                </CardContent>
              </Card>
              <Card className="bg-green-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-green-800">Çözülen Arızalar</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-green-800">42</p>
                  <p className="text-sm text-green-600">Bu hafta</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Arıza Haritası</CardTitle>
                <CardDescription>Bölgesel elektrik arıza dağılımı</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center bg-gray-50">
                <div className="text-center text-gray-500">
                  <p>Arıza haritası burada görüntülenecek</p>
                  <p className="text-sm">KKTC geneli</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Son Bildirilen Arızalar</CardTitle>
                <CardDescription>Son 24 saat içinde bildirilen arızalar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-700">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-6 py-3">Arıza No</th>
                        <th className="px-6 py-3">Bölge</th>
                        <th className="px-6 py-3">Tip</th>
                        <th className="px-6 py-3">Bildirim Zamanı</th>
                        <th className="px-6 py-3">Durum</th>
                        <th className="px-6 py-3">İşlem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4, 5].map((item) => (
                        <tr key={item} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4">EL-{2000 + item}</td>
                          <td className="px-6 py-4">{
                            item % 5 === 0 ? 'Girne' : 
                            item % 5 === 1 ? 'Lefkoşa' : 
                            item % 5 === 2 ? 'Gazimağusa' :
                            item % 5 === 3 ? 'Güzelyurt' : 'İskele'
                          }</td>
                          <td className="px-6 py-4">{
                            item % 3 === 0 ? 'Genel Kesinti' : 
                            item % 3 === 1 ? 'Voltaj Sorunu' : 'Trafo Arızası'
                          }</td>
                          <td className="px-6 py-4">12.06.2023 {10 + item}:30</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-xs ${
                              item % 4 === 0 ? 'bg-green-100 text-green-800' : 
                              item % 4 === 1 ? 'bg-blue-100 text-blue-800' : 
                              item % 4 === 2 ? 'bg-amber-100 text-amber-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {item % 4 === 0 ? 'Çözüldü' : 
                               item % 4 === 1 ? 'Onarımda' : 
                               item % 4 === 2 ? 'Beklemede' : 'Kritik'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">Detay</Button>
                              <Button size="sm" variant="outline">Görevlendir</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        );
        
      // You can implement similar rich content for other departments
      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>{title} - İçerik</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center bg-gray-50 rounded-lg">
                <div className="mb-4">{icon}</div>
                <h3 className="text-lg font-medium mb-2">{title} İçeriği</h3>
                <p className="text-gray-500 mb-4">Bu bölüm şu anda geliştirme aşamasındadır.</p>
                <Button>İçerik Ekle</Button>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            {icon}
            <CardTitle>{title}</CardTitle>
          </div>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
      
      {renderDepartmentContent()}
    </div>
  );
};

export default DepartmentContent;
