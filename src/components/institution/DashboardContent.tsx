
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
          <Card>
            <CardHeader>
              <CardTitle>Kurum Adı</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{institution?.name}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kurum Türü</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{institution?.type}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Çalışma Saatleri</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{institution?.workingHours}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Web Sitesi</CardTitle>
            </CardHeader>
            <CardContent>
              <a href={institution?.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{institution?.website}</a>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle>Telefon Numarası</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{institution?.phone}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Adres</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{institution?.address}</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardContent;
