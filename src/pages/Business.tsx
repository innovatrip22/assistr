import { useState, useEffect } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { LogOut, Activity, ShoppingBag, Settings, MessageSquare, BellRing } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { getTouristDataStats, getBusinessDetails, updateBusinessDetails, getBusiness } from "@/services";
import type { Business } from "@/services";

const Business = () => {
  const [business, setBusiness] = useState<Business | null>(null);
  const [touristStats, setTouristStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBusinessDetails, setEditedBusinessDetails] = useState<Business | null>(null);
  const navigate = useNavigate();
  const { signOut } = useAuth();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const businessData = await getBusinessDetails();
      setBusiness(businessData);
      setEditedBusinessDetails(businessData ? { ...businessData } : null);

      const stats = await getTouristDataStats();
      setTouristStats(stats);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      toast.error("Veriler yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

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
      setBusiness(editedBusinessDetails);
      setIsEditing(false);
    } catch (error: any) {
      console.error("Error updating business details:", error);
      toast.error("İşletme bilgileri güncellenirken bir hata oluştu.");
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Yükleniyor...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-800 mb-6"
        >
          İşletme Paneli
        </motion.h1>

        <Tabs defaultvalue="dashboard" className="w-full space-y-4">
          <TabsList className="bg-white border rounded-lg shadow-sm">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-gray-100">
              <Activity className="w-4 h-4 mr-2" />
              Panel
            </TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-gray-100">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Ürünler
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gray-100">
              <Settings className="w-4 h-4 mr-2" />
              Ayarlar
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-gray-100">
              <MessageSquare className="w-4 h-4 mr-2" />
              Mesajlar
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-gray-100">
              <BellRing className="w-4 h-4 mr-2" />
              Bildirimler
            </TabsTrigger>
          </TabsList>
          <div className="flex justify-end">
            <Button variant="destructive" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Çıkış Yap
            </Button>
          </div>
          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Toplam Turist</CardTitle>
                  <CardDescription>Bu ayki toplam turist sayısı</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{touristStats?.total_tourists || "Veri Yok"}</div>
                  <div className="text-sm text-gray-500">
                    <Badge variant="secondary">
                      <span className="capitalize">{touristStats?.percentage_change > 0 ? 'Artış' : 'Azalış'}</span>
                      <span className="ml-1">{touristStats?.percentage_change}%</span>
                    </Badge>
                    geçen aya göre
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ortalama Harcama</CardTitle>
                  <CardDescription>Turistlerin ortalama harcaması</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{touristStats?.average_spending || "Veri Yok"} TL</div>
                  <div className="text-sm text-gray-500">
                    <Badge variant="secondary">
                      <span className="capitalize">{touristStats?.spending_percentage_change > 0 ? 'Artış' : 'Azalış'}</span>
                      <span className="ml-1">{touristStats?.spending_percentage_change}%</span>
                    </Badge>
                    geçen aya göre
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Ürün Yönetimi</CardTitle>
                <CardDescription>Ürünlerinizi buradan yönetebilirsiniz.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Ürün yönetimi özellikleri yakında eklenecektir.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>İşletme Ayarları</CardTitle>
                <CardDescription>İşletme bilgilerinizi buradan düzenleyebilirsiniz.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">İşletme Adı</label>
                      <input
                        type="text"
                        name="name"
                        value={editedBusinessDetails?.name || ""}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Açıklama</label>
                      <textarea
                        name="description"
                        value={editedBusinessDetails?.description || ""}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Konum</label>
                      <input
                        type="text"
                        name="location"
                        value={editedBusinessDetails?.location || ""}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" onClick={() => {
                        setIsEditing(false);
                        setEditedBusinessDetails(business ? { ...business } : null);
                      }}>
                        İptal
                      </Button>
                      <Button onClick={handleSaveChanges}>Kaydet</Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p><strong>İşletme Adı:</strong> {business?.name}</p>
                    <p><strong>Açıklama:</strong> {business?.description}</p>
                    <p><strong>Konum:</strong> {business?.location}</p>
                    <Button onClick={() => setIsEditing(true)}>Düzenle</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Mesajlar</CardTitle>
                <CardDescription>Turistlerden gelen mesajları buradan görüntüleyebilirsiniz.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Mesajlaşma özellikleri yakında eklenecektir.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Bildirimler</CardTitle>
                <CardDescription>İşletmenizle ilgili bildirimleri buradan görüntüleyebilirsiniz.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Bildirim özellikleri yakında eklenecektir.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Business;
