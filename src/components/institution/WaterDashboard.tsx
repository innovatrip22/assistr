
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Droplet, Users, AlertTriangle, Flask, MapPin } from "lucide-react";

const waterUsageData = [
  { name: "Ocak", value: 1420 },
  { name: "Şubat", value: 1320 },
  { name: "Mart", value: 1280 },
  { name: "Nisan", value: 1520 },
  { name: "Mayıs", value: 1680 },
  { name: "Haziran", value: 1890 },
  { name: "Temmuz", value: 2340 },
];

const reservoirData = [
  { name: "Geçitköy", current: 78, capacity: 100 },
  { name: "Güzelyurt", current: 45, capacity: 100 },
  { name: "Lefkoşa", current: 65, capacity: 100 },
  { name: "Gazimağusa", current: 52, capacity: 100 },
];

const WaterDashboard = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Su İşleri Dairesi Gösterge Paneli</CardTitle>
          <CardDescription>
            Su rezervleri, tüketim ve arıza verileri
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Toplam Su Rezervi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Droplet className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-2xl font-bold">62%</span>
                </div>
                <Progress value={62} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Geçen aya göre -5% düşüş
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Aktif Abone Sayısı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-2xl font-bold">187,324</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Sayaçların %92'si aktif durumda
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Açık Arıza Bildirimleri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                  <span className="text-2xl font-bold">37</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  11 ekip sahada görevli
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Su Kalitesi İndeksi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Flask className="h-4 w-4 mr-2 text-purple-500" />
                  <span className="text-2xl font-bold">94/100</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Son 4 test sonucu: uygun
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Aylık Su Tüketimi (bin m³)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={waterUsageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#3b82f6" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Su Deposu Seviyeleri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {reservoirData.map((reservoir, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Droplet className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="text-sm">{reservoir.name} Deposu</span>
                      </div>
                      <span className="text-sm font-medium">{reservoir.current}%</span>
                    </div>
                    <Progress value={reservoir.current} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Kapasite: {reservoir.capacity} milyon m³
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaterDashboard;
