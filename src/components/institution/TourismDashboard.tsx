
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
import { MapPin, Calendar, Hotel, Plane, Building } from "lucide-react";

const visitorData = [
  { month: "Ocak", visitors: 14200 },
  { month: "Şubat", visitors: 16800 },
  { month: "Mart", visitors: 19500 },
  { month: "Nisan", visitors: 24700 },
  { month: "Mayıs", visitors: 28500 },
  { month: "Haziran", visitors: 32100 },
  { month: "Temmuz", visitors: 41800 },
];

const visitorsByCountry = [
  { name: "Türkiye", value: 45 },
  { name: "İngiltere", value: 20 },
  { name: "Almanya", value: 15 },
  { name: "Rusya", value: 12 },
  { name: "Diğer", value: 8 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const upcomingEvents = [
  {
    name: "Uluslararası Film Festivali",
    date: "15 Ağustos 2023",
    location: "Girne",
  },
  {
    name: "Zeytin Festivali",
    date: "24 Eylül 2023",
    location: "Lefke",
  },
  {
    name: "Turizm Fuarı",
    date: "10 Ekim 2023",
    location: "Lefkoşa",
  },
];

const TourismDashboard = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Turizm Bakanlığı Gösterge Paneli</CardTitle>
          <CardDescription>
            Ziyaretçi istatistikleri, etkinlikler ve turizm verileri
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Aylık Ziyaretçi Sayısı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Plane className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-2xl font-bold">41,800</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Geçen aya göre +30% artış
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Kayıtlı Turistik İşletme</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2 text-purple-500" />
                  <span className="text-2xl font-bold">893</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  24 onay bekleyen başvuru mevcut
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Otel Doluluk Oranı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Hotel className="h-4 w-4 mr-2 text-amber-500" />
                  <span className="text-2xl font-bold">76%</span>
                </div>
                <Progress value={76} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Temmuz ayı ortalaması
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Planlanmış Etkinlikler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-2xl font-bold">12</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Önümüzdeki 3 ay içinde
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Aylık Ziyaretçi İstatistikleri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={visitorData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="visitors" fill="#3b82f6" name="Ziyaretçi Sayısı" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ziyaretçi Ülkeleri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={visitorsByCountry}
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {visitorsByCountry.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-8">
                  <h4 className="text-sm font-medium mb-4">Yaklaşan Etkinlikler</h4>
                  <div className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="flex items-start">
                        <Calendar className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium">{event.name}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{event.date}</span>
                            <span>•</span>
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" /> {event.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TourismDashboard;
