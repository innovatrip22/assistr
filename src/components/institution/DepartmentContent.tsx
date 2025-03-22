
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Institution } from "@/services";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MapSection, EmergencyReportsList, PriceReportsList, FraudReportsList } from "@/components/institution";
import { FileText, Users, ClipboardList, Bell, FileArchive, Calendar, Wrench, BarChart, CreditCard, Construction } from "lucide-react";

interface DepartmentContentProps {
  activeTab: string;
  institution: Institution | null;
}

const DepartmentContent = ({ activeTab, institution }: DepartmentContentProps) => {
  // Get title and icon based on the active tab
  const getTabInfo = () => {
    switch (activeTab) {
      case "reports":
        return { 
          title: "Raporlama", 
          description: "Kurum raporlarını görüntüleyin ve yönetin",
          icon: <FileText className="h-5 w-5 mr-2 text-primary" />
        };
      case "users":
        return { 
          title: "Kullanıcı Yönetimi", 
          description: "Kurum kullanıcılarını yönetin",
          icon: <Users className="h-5 w-5 mr-2 text-primary" />
        };
      case "applications":
        return { 
          title: "Başvuru Takibi", 
          description: "Vatandaş başvurularını takip edin",
          icon: <ClipboardList className="h-5 w-5 mr-2 text-primary" />
        };
      case "announcements":
        return { 
          title: "Duyuru Yönetimi", 
          description: "Kurumsal duyuruları yönetin",
          icon: <Bell className="h-5 w-5 mr-2 text-primary" />
        };
      case "documents":
        return { 
          title: "Evrak Yönetimi", 
          description: "Kurumsal evrak işlemlerini yönetin",
          icon: <FileArchive className="h-5 w-5 mr-2 text-primary" />
        };
      case "events":
        return { 
          title: "Etkinlikler", 
          description: "Kurumsal etkinlikleri planlayın ve yönetin",
          icon: <Calendar className="h-5 w-5 mr-2 text-primary" />
        };
      case "electricity":
        return { 
          title: "Elektrik Arıza Yönetimi", 
          description: "Elektrik arızalarını takip edin ve yönetin",
          icon: <Wrench className="h-5 w-5 mr-2 text-primary" />
        };
      case "consumption":
        return { 
          title: "Tüketim & Sayaç Yönetimi", 
          description: "Tüketim verilerini ve sayaçları yönetin",
          icon: <BarChart className="h-5 w-5 mr-2 text-primary" />
        };
      case "payment":
        return { 
          title: "Borç & Tahsilat Raporları", 
          description: "Borç ve tahsilat verilerini görüntüleyin",
          icon: <CreditCard className="h-5 w-5 mr-2 text-primary" />
        };
      case "infrastructure":
        return { 
          title: "Yatırım & Altyapı", 
          description: "Altyapı projelerini ve yatırımları takip edin",
          icon: <Construction className="h-5 w-5 mr-2 text-primary" />
        };
      case "feedback":
        return { 
          title: "Geri Bildirim", 
          description: "Vatandaş geri bildirimlerini yönetin",
          icon: <MessageSquare className="h-5 w-5 mr-2 text-primary" />
        };
      default:
        return { 
          title: activeTab.charAt(0).toUpperCase() + activeTab.slice(1), 
          description: "Departman içeriği",
          icon: <FileText className="h-5 w-5 mr-2 text-primary" />
        };
    }
  };

  const tabInfo = getTabInfo();
  
  // Special content for reports tab
  if (activeTab === "reports") {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center">
              {tabInfo.icon}
              <div>
                <CardTitle>{tabInfo.title}</CardTitle>
                <CardDescription>{tabInfo.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6">
              <EmergencyReportsList institution={institution} />
              <PriceReportsList institution={institution} />
              <FraudReportsList institution={institution} />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Special content for feedback tab
  if (activeTab === "feedback") {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center">
              {tabInfo.icon}
              <div>
                <CardTitle>{tabInfo.title}</CardTitle>
                <CardDescription>{tabInfo.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Gönderen</TableHead>
                  <TableHead>Konu</TableHead>
                  <TableHead>Tarih</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Ahmet Yılmaz</TableCell>
                  <TableCell>Hizmet Kalitesi Hakkında</TableCell>
                  <TableCell>15/07/2023</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Beklemede</span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Görüntüle</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Mehmet Kaya</TableCell>
                  <TableCell>Fatura İtirazı</TableCell>
                  <TableCell>12/07/2023</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Yanıtlandı</span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Görüntüle</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Zeynep Öztürk</TableCell>
                  <TableCell>Personel Teşekkürü</TableCell>
                  <TableCell>10/07/2023</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">İnceleniyor</span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Görüntüle</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Special content for electricity tab
  if (activeTab === "electricity") {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center">
              {tabInfo.icon}
              <div>
                <CardTitle>{tabInfo.title}</CardTitle>
                <CardDescription>{tabInfo.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <MapSection />
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Aktif Arıza Bildirimleri</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Arıza No</TableHead>
                    <TableHead>Yer</TableHead>
                    <TableHead>Bildirim Zamanı</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Atanan Ekip</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>ELK-A001</TableCell>
                    <TableCell>Lefkoşa, Dereboyu Cad.</TableCell>
                    <TableCell>Bugün, 14:35</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Kritik</span>
                    </TableCell>
                    <TableCell>Ekip 3</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Detaylar</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ELK-A002</TableCell>
                    <TableCell>Girne, İskele Cad.</TableCell>
                    <TableCell>Bugün, 12:20</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Orta</span>
                    </TableCell>
                    <TableCell>Ekip 1</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Detaylar</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ELK-A003</TableCell>
                    <TableCell>Gazimağusa, Salamis Yolu</TableCell>
                    <TableCell>Bugün, 10:45</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">İnceleniyor</span>
                    </TableCell>
                    <TableCell>Henüz atanmadı</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Detaylar</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Generic content for other tabs
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center">
            {tabInfo.icon}
            <div>
              <CardTitle>{tabInfo.title}</CardTitle>
              <CardDescription>{tabInfo.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-12 border-2 border-dashed rounded-lg">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">{tabInfo.title} İçeriği</h3>
              <p className="text-muted-foreground mb-4">
                Bu bölüm için içerik geliştirme devam etmektedir.
              </p>
              <Button>İçerik Ekle</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Import the MessageSquare icon
import { MessageSquare } from "lucide-react";

export default DepartmentContent;
