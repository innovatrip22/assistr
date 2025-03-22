
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Battery, Zap, AlertTriangle, CreditCard, MapPin } from "lucide-react";

const energyData = [
  { name: "00:00", value: 240 },
  { name: "03:00", value: 180 },
  { name: "06:00", value: 220 },
  { name: "09:00", value: 380 },
  { name: "12:00", value: 420 },
  { name: "15:00", value: 450 },
  { name: "18:00", value: 520 },
  { name: "21:00", value: 380 },
];

const regionData = [
  { name: "Lefkoşa", value: 35 },
  { name: "Girne", value: 30 },
  { name: "Gazimağusa", value: 20 },
  { name: "Güzelyurt", value: 10 },
  { name: "İskele", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const ElectricityDashboard = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>KIB-TEK Elektrik Kurumu Gösterge Paneli</CardTitle>
          <CardDescription>
            Elektrik kurumu verileri ve istatistikleri
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Toplam Abone Sayısı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Battery className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-2xl font-bold">248,732</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Geçen aya göre +2.3% artış
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Günlük Enerji Tüketimi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-yellow-500" />
                  <span className="text-2xl font-bold">3,470 MWh</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Dünkü tüketime göre +5.4% artış
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Aktif Arıza Sayısı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                  <span className="text-2xl font-bold">23</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  14 arıza ekibi görevde
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Bugünkü Tahsilat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-2xl font-bold">₺287,654</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Tahsilat hedefinin %82'si
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Günlük Enerji Tüketim Grafiği</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={energyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3b82f6" name="MW" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">En Çok Enerji Tüketen Bölgeler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={regionData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {regionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="text-sm">Üretim Kapasitesi</span>
                    </div>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElectricityDashboard;
