import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { updateBusinessDetails } from "@/services";
import type { Business } from "@/services";

interface BusinessSettingsProps {
  business: Business | null;
  onUpdate: () => void;
}

const BusinessSettings = ({ business, onUpdate }: BusinessSettingsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBusinessDetails, setEditedBusinessDetails] = useState<Business | null>(business);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedBusinessDetails(prev => ({
      ...prev,
      [name]: value,
    } as Business));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setEditedBusinessDetails(prev => ({
      ...prev,
      [name]: checked,
    } as Business));
  };

  const handleSaveChanges = async () => {
    try {
      if (!editedBusinessDetails) {
        toast.error("Güncellenecek veri bulunamadı.");
        return;
      }
      await updateBusinessDetails(editedBusinessDetails);
      toast.success("İşletme bilgileri başarıyla güncellendi!");
      setIsEditing(false);
      onUpdate();
    } catch (error: any) {
      console.error("Error updating business details:", error);
      toast.error("İşletme bilgileri güncellenirken bir hata oluştu.");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>İşletme Bilgileri</CardTitle>
          <CardDescription>İşletmenizin temel bilgilerini buradan güncelleyebilirsiniz</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">İşletme Adı</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  value={editedBusinessDetails?.name || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="type">İşletme Türü</Label>
                <select 
                  id="type"
                  name="type"
                  value={editedBusinessDetails?.type || "restaurant"}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="restaurant">Restoran</option>
                  <option value="hotel">Otel</option>
                  <option value="shop">Mağaza</option>
                  <option value="entertainment">Eğlence</option>
                  <option value="other">Diğer</option>
                </select>
              </div>

              <div>
                <Label htmlFor="description">Açıklama</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={editedBusinessDetails?.description || ""}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="address">Adres</Label>
                <Input
                  id="address"
                  type="text"
                  name="address"
                  value={editedBusinessDetails?.address || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="location">Konum</Label>
                <select 
                  id="location"
                  name="location"
                  value={editedBusinessDetails?.location?.split(',')[0] || ""}
                  onChange={(e) => handleInputChange({
                    ...e,
                    target: {...e.target, name: 'location', value: `${e.target.value}, KKTC`}
                  } as any)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Lefkoşa">Lefkoşa</option>
                  <option value="Girne">Girne</option>
                  <option value="Gazimağusa">Gazimağusa</option>
                  <option value="Güzelyurt">Güzelyurt</option>
                  <option value="İskele">İskele</option>
                  <option value="Lefke">Lefke</option>
                </select>
              </div>

              <Separator className="my-4" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">KKTC Özel Bilgileri</h3>
                
                <div>
                  <Label htmlFor="establishedYear">Kuruluş Yılı</Label>
                  <Input
                    id="establishedYear"
                    type="number"
                    name="establishedYear"
                    value={editedBusinessDetails?.establishedYear || ""}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="isHistorical" 
                    checked={editedBusinessDetails?.isHistorical || false}
                    onCheckedChange={(checked) => handleCheckboxChange('isHistorical', checked as boolean)} 
                  />
                  <Label htmlFor="isHistorical">Tarihi bir binada hizmet veriyoruz</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="servesTraditionalFood" 
                    checked={editedBusinessDetails?.servesTraditionalFood || false}
                    onCheckedChange={(checked) => handleCheckboxChange('servesTraditionalFood', checked as boolean)} 
                  />
                  <Label htmlFor="servesTraditionalFood">Geleneksel Kıbrıs yemekleri sunuyoruz</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="hasLocalArtisans" 
                    checked={editedBusinessDetails?.hasLocalArtisans || false}
                    onCheckedChange={(checked) => handleCheckboxChange('hasLocalArtisans', checked as boolean)} 
                  />
                  <Label htmlFor="hasLocalArtisans">Yerel zanaatkarlarla çalışıyoruz</Label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => {
                  setIsEditing(false);
                  setEditedBusinessDetails(business);
                }}>
                  İptal
                </Button>
                <Button onClick={handleSaveChanges}>Kaydet</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">İşletme Adı</h3>
                  <p className="mt-1">{business?.name || "Belirtilmemiş"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">İşletme Türü</h3>
                  <p className="mt-1">
                    {business?.type === "restaurant" && "Restoran"}
                    {business?.type === "hotel" && "Otel"}
                    {business?.type === "shop" && "Mağaza"}
                    {business?.type === "entertainment" && "Eğlence"}
                    {business?.type === "other" && "Diğer"}
                    {!business?.type && "Belirtilmemiş"}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Adres</h3>
                  <p className="mt-1">{business?.address || "Belirtilmemiş"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Konum</h3>
                  <p className="mt-1">{business?.location || "Belirtilmemiş"}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">Açıklama</h3>
                  <p className="mt-1">{business?.description || "Belirtilmemiş"}</p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <h3 className="text-lg font-medium mb-3">KKTC Özel Bilgileri</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Kuruluş Yılı</h3>
                    <p className="mt-1">{business?.establishedYear || "Belirtilmemiş"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Tarihi Bina</h3>
                    <p className="mt-1">{business?.isHistorical ? "Evet" : "Hayır"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Geleneksel Kıbrıs Mutfağı</h3>
                    <p className="mt-1">{business?.servesTraditionalFood ? "Evet" : "Hayır"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Yerel Zanaatkarlar</h3>
                    <p className="mt-1">{business?.hasLocalArtisans ? "Evet" : "Hayır"}</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button onClick={() => setIsEditing(true)}>Düzenle</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>İletişim Bilgileri</CardTitle>
          <CardDescription>Müşterilerin size ulaşabileceği iletişim bilgileri</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Telefon</Label>
                <Input id="phone" type="tel" placeholder="+90 xxx xxx xx xx" />
              </div>
              <div>
                <Label htmlFor="email">E-posta</Label>
                <Input id="email" type="email" placeholder="ornek@isletme.com" />
              </div>
              <div>
                <Label htmlFor="website">Web Sitesi</Label>
                <Input id="website" type="url" placeholder="https://www.isletme.com" />
              </div>
              <div>
                <Label htmlFor="hours">Çalışma Saatleri</Label>
                <Input id="hours" type="text" placeholder="Hafta içi: 09:00-18:00, Hafta sonu: 10:00-22:00" />
              </div>
            </div>
            <div className="pt-4">
              <Button>Güncelle</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sosyal Medya</CardTitle>
          <CardDescription>Sosyal medya hesaplarınızı ekleyin veya güncelleyin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <Input id="instagram" type="text" placeholder="@isletme" />
              </div>
              <div>
                <Label htmlFor="facebook">Facebook</Label>
                <Input id="facebook" type="text" placeholder="facebook.com/isletme" />
              </div>
              <div>
                <Label htmlFor="twitter">Twitter</Label>
                <Input id="twitter" type="text" placeholder="@isletme" />
              </div>
              <div>
                <Label htmlFor="tripadvisor">TripAdvisor</Label>
                <Input id="tripadvisor" type="text" placeholder="tripadvisor.com/isletme" />
              </div>
            </div>
            <div className="pt-4">
              <Button>Güncelle</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessSettings;
