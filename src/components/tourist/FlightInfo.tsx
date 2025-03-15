
import { Plane, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FlightInfo = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <Plane className="w-16 h-16 text-muted-foreground mb-4" />
      <h3 className="text-xl font-medium">Uçuş Bilgileri</h3>
      <p className="text-muted-foreground mb-4 text-center max-w-md">
        Uçuş bilgilerinize bu bölümden erişebilirsiniz. 
        PNR kodunuzu girerek uçuş detaylarınızı görüntüleyebilir veya yeni uçuş arayabilirsiniz.
      </p>
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5 text-primary" />
              PNR Sorgulama
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">PNR Kodu</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="6 haneli PNR kodunuz" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                  <Button size="sm">Sorgula</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Uçuş Ara
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full">Yeni Uçuş Araması Yap</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FlightInfo;
