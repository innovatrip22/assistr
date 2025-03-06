
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, TrendingUp, TrendingDown, Users, CreditCard, MapPin } from "lucide-react";

interface BusinessAnalyticsProps {
  touristStats: any;
}

const BusinessAnalytics = ({ touristStats }: BusinessAnalyticsProps) => {
  // Monthly revenue data
  const revenueData = [
    { name: 'Oca', value: 4000 },
    { name: 'Şub', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Nis', value: 2780 },
    { name: 'May', value: 5890 },
    { name: 'Haz', value: 6390 },
    { name: 'Tem', value: 8490 },
  ];

  // Customer demographics data
  const demographicsData = [
    { name: 'Yerli', value: 35 },
    { name: 'Avrupa', value: 40 },
    { name: 'Asya', value: 15 },
    { name: 'Amerika', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">58,490₺</div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">+12.5%</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Geçen aya göre</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Toplam Müşteri</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">2,345</div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">+18.2%</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Geçen aya göre</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ortalama İşlem</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">245₺</div>
              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">+3.1%</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Geçen aya göre</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Memnuniyet Oranı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">92%</div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">+2.4%</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Geçen aya göre</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Aylık Gelir</CardTitle>
            <CardDescription>Son 7 aya ait gelir grafiği</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}₺`} />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Müşteri Demografisi</CardTitle>
            <CardDescription>Müşterilerin ülkelere göre dağılımı</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={demographicsData} 
                    cx="50%" 
                    cy="50%" 
                    innerRadius={60} 
                    outerRadius={90} 
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {demographicsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Turist Yoğunluğu</CardTitle>
            <CardDescription>Bölgedeki genel turist yoğunluğu</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-muted-foreground mr-2" />
                  <span>Toplam Turist</span>
                </div>
                <span className="font-medium">{touristStats?.total_tourists || "Veri Yok"}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-muted-foreground mr-2" />
                  <span>Ortalama Harcama</span>
                </div>
                <span className="font-medium">{touristStats?.average_spending || "Veri Yok"}₺</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
                  <span>En Popüler Yer</span>
                </div>
                <span className="font-medium">{touristStats?.mostPopularPlace || "Veri Yok"}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Activity className="h-5 w-5 text-muted-foreground mr-2" />
                  <span>Turist Değişimi</span>
                </div>
                <div className="flex items-center">
                  {touristStats?.percentage_change > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`font-medium ${touristStats?.percentage_change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {touristStats?.percentage_change || 0}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gelecek Öngörüleri</CardTitle>
            <CardDescription>Yapay zeka destekli işletme tahminleri</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-700 mb-2">Gelecek Hafta Öngörüsü</h3>
                <p className="text-sm text-blue-600">
                  Önümüzdeki hafta için %15 artış bekleniyor. Hafta sonu için ekstra personel planlaması yapmanız önerilir.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-700 mb-2">Satış Tahmini</h3>
                <p className="text-sm text-green-600">
                  Gelecek ay için 62,000₺ ciro hedefi gerçekçi görünüyor. Geçen yılın aynı dönemine göre %22 artış.
                </p>
              </div>
              <div className="p-4 bg-amber-50 rounded-lg">
                <h3 className="font-medium text-amber-700 mb-2">Stok Tavsiyesi</h3>
                <p className="text-sm text-amber-600">
                  Popüler ürünlerinizden X, Y ve Z için stok seviyelerinizi artırmanız önerilir. Talep artışı bekleniyor.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessAnalytics;
