
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Institution } from "@/services";

interface DashboardContentProps {
  institution: Institution | null;
}

const DashboardContent = ({ institution }: DashboardContentProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kurum Gösterge Paneli</CardTitle>
        <CardDescription>
          Kurumunuzla ilgili genel bilgileri ve istatistikleri buradan görüntüleyebilirsiniz.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="bg-white hover:bg-gray-50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Kurum Adı</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-600">{institution?.name}</p>
            </CardContent>
          </Card>

          <Card className="bg-white hover:bg-gray-50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Kurum Türü</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{institution?.type}</p>
            </CardContent>
          </Card>

          <Card className="bg-white hover:bg-gray-50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Çalışma Saatleri</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{institution?.workingHours}</p>
            </CardContent>
          </Card>

          <Card className="bg-white hover:bg-gray-50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Web Sitesi</CardTitle>
            </CardHeader>
            <CardContent>
              <a href={institution?.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline font-medium">{institution?.website}</a>
            </CardContent>
          </Card>

          <Card className="bg-white hover:bg-gray-50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Telefon Numarası</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{institution?.phone}</p>
            </CardContent>
          </Card>

          <Card className="bg-white hover:bg-gray-50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Adres</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{institution?.address}</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardContent;
