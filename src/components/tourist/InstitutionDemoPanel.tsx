
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface InstitutionDemoPanelProps {
  userData: any;
}

const InstitutionDemoPanel: React.FC<InstitutionDemoPanelProps> = ({ userData }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [institutionName, setInstitutionName] = useState("Örnek Kurum");
  const [institutionType, setInstitutionType] = useState("");
  const [announcement, setAnnouncement] = useState("Önemli duyurular burada yer alacaktır...");

  const handleSave = () => {
    toast.success("Ayarlar başarıyla kaydedildi!");
  };

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
            <Input 
              id="institutionName" 
              value={institutionName}
              onChange={(e) => setInstitutionName(e.target.value)}
              className="mt-2" 
            />
          </div>
          <div>
            <Label htmlFor="institutionType">Kurum Tipi</Label>
            <Select value={institutionType} onValueChange={setInstitutionType}>
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Kurum Tipi Seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="belediye">Belediye</SelectItem>
                <SelectItem value="su">Su İdaresi</SelectItem>
                <SelectItem value="elektrik">Elektrik Şirketi</SelectItem>
                <SelectItem value="gaz">Doğalgaz Kurumu</SelectItem>
                <SelectItem value="turizm">Turizm Bakanlığı</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="announcement">Duyuru Metni</Label>
          <Textarea
            id="announcement"
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            className="mt-2"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch 
            id="darkMode" 
            checked={darkMode}
            onCheckedChange={setDarkMode}
          />
          <Label htmlFor="darkMode">Karanlık Mod</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="notifications" />
          <Label htmlFor="notifications">Bildirimler</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="maintenance" />
          <Label htmlFor="maintenance">Bakım Modu</Label>
        </div>

        <Button onClick={handleSave}>Kaydet</Button>
      </CardContent>
    </Card>
  );
};

export default InstitutionDemoPanel;
