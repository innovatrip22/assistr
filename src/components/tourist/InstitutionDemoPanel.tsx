// Fix the Switch import error by replacing with proper import
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface InstitutionDemoPanelProps {
  userData: any;
}

const InstitutionDemoPanel: React.FC<InstitutionDemoPanelProps> = ({ userData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kurum Demo Paneli</CardTitle>
        <CardDescription>
          Kurumlar için demo panel özelliklerini buradan ayarlayabilirsiniz.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="institutionName">Kurum Adı</Label>
            <Input id="institutionName" defaultValue="Örnek Kurum" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="institutionType">Kurum Tipi</Label>
            <Select>
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Kurum Tipi Seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="belediye">Belediye</SelectItem>
                <SelectItem value="su">Su İdaresi</SelectItem>
                <SelectItem value="elektrik">Elektrik Şirketi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="announcement">Duyuru Metni</Label>
          <Textarea
            id="announcement"
            defaultValue="Önemli duyurular burada yer alacaktır..."
            className="mt-2"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Label htmlFor="darkMode">Karanlık Mod</Label>
          <Switch id="darkMode" />
        </div>

        <Button>Kaydet</Button>
      </CardContent>
    </Card>
  );
};

export default InstitutionDemoPanel;
