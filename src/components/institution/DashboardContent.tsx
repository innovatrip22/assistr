
import { useState, useEffect } from "react";
import { Activity, AlertTriangle, CheckCircle, Users, Layers, Clock, Gauge } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import MapSection from "./MapSection";

// Mock data
const mockDashboardData = {
  dailyConsumption: 12540,
  energyBalance: 67,
  dailyIncidents: 8,
  resolvedIncidents: 6,
  totalSubscribers: 24680,
  activeMeters: 23950,
  lastCollections: 45600,
  unpaidDebts: 89700,
  systemStatus: {
    payment: true,
    meter: true,
    incident: true,
    notification: false
  }
};

const DashboardContent = () => {
  const [dashboardData, setDashboardData] = useState(mockDashboardData);
  const [loading, setLoading] = useState(false);

  const getStatusColor = (isActive: boolean) => {
    return isActive ? "bg-green-500" : "bg-red-500";
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Daily Consumption */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Günlük Tüketim</CardTitle>
            <CardDescription>Son 24 saat</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.dailyConsumption} kWh</div>
            <Progress 
              value={65} 
              className="h-2 mt-2" 
            />
            <p className="text-xs text-muted-foreground mt-1">
              Günlük ortalamadan %12 fazla
            </p>
          </CardContent>
        </Card>

        {/* Energy Balance */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Enerji Dengesi</CardTitle>
            <CardDescription>Şebeke durumu</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Gauge className="h-5 w-5 text-green-500" />
              <span className="text-2xl font-bold">%{dashboardData.energyBalance}</span>
            </div>
            <Progress 
              value={dashboardData.energyBalance} 
              className="h-2 mt-2" 
            />
            <p className="text-xs text-muted-foreground mt-1">
              Optimal çalışma değeri: %70-85
            </p>
          </CardContent>
        </Card>

        {/* Incidents */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Arıza Takibi</CardTitle>
            <CardDescription>Bugünkü durum</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">{dashboardData.dailyIncidents}</div>
                <p className="text-xs text-muted-foreground">Toplam arıza</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{dashboardData.resolvedIncidents}</div>
                <p className="text-xs text-muted-foreground">Çözülen</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-500">
                  {dashboardData.dailyIncidents - dashboardData.resolvedIncidents}
                </div>
                <p className="text-xs text-muted-foreground">Bekleyen</p>
              </div>
            </div>
            <Progress 
              value={(dashboardData.resolvedIncidents / dashboardData.dailyIncidents) * 100} 
              className="h-2 mt-3" 
            />
          </CardContent>
        </Card>

        {/* Users & Meters */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Aboneler</CardTitle>
            <CardDescription>Sayaç durumu</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">{dashboardData.totalSubscribers}</div>
                <p className="text-xs text-muted-foreground">Toplam abone</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{dashboardData.activeMeters}</div>
                <p className="text-xs text-muted-foreground">Aktif sayaç</p>
              </div>
            </div>
            <Progress 
              value={(dashboardData.activeMeters / dashboardData.totalSubscribers) * 100} 
              className="h-2 mt-3" 
            />
            <p className="text-xs text-muted-foreground mt-1">
              Aktif sayaç oranı: %{((dashboardData.activeMeters / dashboardData.totalSubscribers) * 100).toFixed(1)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Mali Durum</CardTitle>
            <CardDescription>Son tahsilatlar ve borçlar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-medium">Son Tahsilatlar (30 gün)</h4>
                  <span className="text-2xl font-bold">{dashboardData.lastCollections.toLocaleString()} TL</span>
                </div>
                <Button variant="outline" size="sm">
                  Detaylar
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-medium">Ödenmeyen Borçlar</h4>
                  <span className="text-2xl font-bold text-red-600">{dashboardData.unpaidDebts.toLocaleString()} TL</span>
                </div>
                <Button variant="outline" size="sm">
                  Listele
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Sistem Durumu</CardTitle>
            <CardDescription>Servislerin çalışma durumu</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(dashboardData.systemStatus.payment)}`}></div>
                  <span className="text-sm">Ödeme Sistemi</span>
                </div>
                <span className="text-sm font-medium">{dashboardData.systemStatus.payment ? 'Aktif' : 'Sorun'}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(dashboardData.systemStatus.meter)}`}></div>
                  <span className="text-sm">Sayaç Servisi</span>
                </div>
                <span className="text-sm font-medium">{dashboardData.systemStatus.meter ? 'Aktif' : 'Sorun'}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(dashboardData.systemStatus.incident)}`}></div>
                  <span className="text-sm">Arıza Servisi</span>
                </div>
                <span className="text-sm font-medium">{dashboardData.systemStatus.incident ? 'Aktif' : 'Sorun'}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(dashboardData.systemStatus.notification)}`}></div>
                  <span className="text-sm">Bildirim Servisi</span>
                </div>
                <span className="text-sm font-medium">{dashboardData.systemStatus.notification ? 'Aktif' : 'Sorun'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map Section */}
      <MapSection />

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Hızlı İşlemler</CardTitle>
          <CardDescription>Sık kullanılan işlemler</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button variant="outline" className="h-10">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Arıza Ekle
          </Button>
          <Button variant="outline" className="h-10">
            <Activity className="h-4 w-4 mr-2" />
            Duyuru Yayınla
          </Button>
          <Button variant="outline" className="h-10">
            <Layers className="h-4 w-4 mr-2" />
            Etkinlik Planla
          </Button>
          <Button variant="outline" className="h-10">
            <Users className="h-4 w-4 mr-2" />
            Abone Ekle
          </Button>
          <Button variant="outline" className="h-10">
            <Clock className="h-4 w-4 mr-2" />
            Raporları Görüntüle
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardContent;
