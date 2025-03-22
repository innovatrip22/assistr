
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { Institution } from "@/services";

interface SettingsContentProps {
  institution: Institution | null;
  onUpdate: (updatedFields: Partial<Institution>) => void;
  setInstitution: React.Dispatch<React.SetStateAction<Institution | null>>;
}

const SettingsContent = ({ institution, onUpdate, setInstitution }: SettingsContentProps) => {
  const handleSubmit = () => {
    if (!institution) return;
    
    onUpdate({
      name: institution.name,
      type: institution.type,
      workingHours: institution.workingHours,
      website: institution.website,
      phone: institution.phone,
      address: institution.address,
      active: institution.active,
      verified: institution.verified,
      popular: institution.popular,
      featured: institution.featured,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kurum Ayarları</CardTitle>
        <CardDescription>
          Kurum bilgilerini buradan güncelleyebilirsiniz.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
              Kurum Adı
            </label>
            <Input
              id="name"
              defaultValue={institution?.name || ""}
              className="col-span-3"
              onChange={(e) => setInstitution({ ...institution, name: e.target.value } as Institution)}
            />
          </div>

          <div>
            <label htmlFor="type" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
              Kurum Türü
            </label>
            <Input
              id="type"
              defaultValue={institution?.type || ""}
              className="col-span-3"
              onChange={(e) => setInstitution({ ...institution, type: e.target.value } as Institution)}
            />
          </div>

          <div>
            <label htmlFor="workingHours" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
              Çalışma Saatleri
            </label>
            <Input
              id="workingHours"
              defaultValue={institution?.workingHours || ""}
              className="col-span-3"
              onChange={(e) => setInstitution({ ...institution, workingHours: e.target.value } as Institution)}
            />
          </div>

          <div>
            <label htmlFor="website" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
              Web Sitesi
            </label>
            <Input
              id="website"
              defaultValue={institution?.website || ""}
              className="col-span-3"
              onChange={(e) => setInstitution({ ...institution, website: e.target.value } as Institution)}
            />
          </div>

          <div>
            <label htmlFor="phone" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
              Telefon Numarası
            </label>
            <Input
              id="phone"
              defaultValue={institution?.phone || ""}
              className="col-span-3"
              onChange={(e) => setInstitution({ ...institution, phone: e.target.value } as Institution)}
            />
          </div>

          <div>
            <label htmlFor="address" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
              Adres
            </label>
            <Input
              id="address"
              defaultValue={institution?.address || ""}
              className="col-span-3"
              onChange={(e) => setInstitution({ ...institution, address: e.target.value } as Institution)}
            />
          </div>

          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
              Aktif
            </label>
            <Switch
              id="active"
              checked={institution?.active}
              onCheckedChange={(checked) => setInstitution({ ...institution, active: checked } as Institution)}
            />
          </div>

          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
              Doğrulanmış
            </label>
            <Switch
              id="verified"
              checked={institution?.verified}
              onCheckedChange={(checked) => setInstitution({ ...institution, verified: checked } as Institution)}
            />
          </div>

          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
              Popüler
            </label>
            <Switch
              id="popular"
              checked={institution?.popular}
              onCheckedChange={(checked) => setInstitution({ ...institution, popular: checked } as Institution)}
            />
          </div>

          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
              Öne Çıkan
            </label>
            <Switch
              id="featured"
              checked={institution?.featured}
              onCheckedChange={(checked) => setInstitution({ ...institution, featured: checked } as Institution)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit}>
          Güncelle
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SettingsContent;
