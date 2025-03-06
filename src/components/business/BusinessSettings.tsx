
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateBusinessDetails } from "@/services";
import type { Business } from "@/services";

interface BusinessSettingsProps {
  business: Business | null;
  onUpdate: () => void;
}

const BusinessSettings = ({ business, onUpdate }: BusinessSettingsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBusinessDetails, setEditedBusinessDetails] = useState<Business | null>(business);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedBusinessDetails(prev => ({
      ...prev,
      [name]: value,
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
                <label className="block text-sm font-medium text-gray-700 mb-1">İşletme Adı</label>
                <Input
                  type="text"
                  name="name"
                  value={editedBusinessDetails?.name || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">İşletme Türü</label>
                <select 
                  name="type"
                  value={editedBusinessDetails?.type || "restaurant"}
                  onChange={e => handleInputChange(e as any)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="restaurant">Restoran</option>
                  <option value="hotel">Otel</option>
                  <option value="shop">Mağaza</option>
                  <option value="entertainment">Eğlence</option>
                  <option value="other">Diğer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                <Textarea
                  name="description"
                  value={editedBusinessDetails?.description || ""}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
                <Input
                  type="text"
                  name="address"
                  value={editedBusinessDetails?.address || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Konum</label>
                <Input
                  type="text"
                  name="location"
                  value={editedBusinessDetails?.location || ""}
                  onChange={handleInputChange}
                  placeholder="Antalya, Türkiye"
                />
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                <Input type="tel" placeholder="+90 xxx xxx xx xx" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                <Input type="email" placeholder="ornek@isletme.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Web Sitesi</label>
                <Input type="url" placeholder="https://www.isletme.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Çalışma Saatleri</label>
                <Input type="text" placeholder="Hafta içi: 09:00-18:00, Hafta sonu: 10:00-22:00" />
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                <Input type="text" placeholder="@isletme" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                <Input type="text" placeholder="facebook.com/isletme" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                <Input type="text" placeholder="@isletme" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">TripAdvisor</label>
                <Input type="text" placeholder="tripadvisor.com/isletme" />
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
