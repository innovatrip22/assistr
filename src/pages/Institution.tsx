import { useState, useEffect } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { 
  LogOut, 
  Activity, 
  FileText, 
  Users, 
  MapPin, 
  BellRing, 
  BarChart3, 
  Settings,
  AlertTriangle,
  Droplets,
  Zap,
  Wifi,
  Phone,
  MessageCircle,
  HelpCircle,
  Search,
  Filter
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { getInstitutionDetails, updateInstitutionDetails } from "@/services";
import type { Institution } from "@/services";

const InstitutionPage = () => {
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const { signOut } = useAuth();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const institutionData = await getInstitutionDetails();
      setInstitution(institutionData);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      toast.error("Veriler yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Yükleniyor...</div>;
  }

  const handleUpdate = async (updatedFields: Partial<Institution>) => {
    try {
      await updateInstitutionDetails(updatedFields);
      toast.success("Kurum bilgileri güncellendi!");
      loadData(); // Reload data to reflect changes
    } catch (error: any) {
      console.error("Update failed:", error);
      toast.error("Kurum bilgileri güncellenirken bir hata oluştu.");
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
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

      case "settings":
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
              <Button onClick={() => handleUpdate({
                  name: institution?.name,
                  type: institution?.type,
                  workingHours: institution?.workingHours,
                  website: institution?.website,
                  phone: institution?.phone,
                  address: institution?.address,
                  active: institution?.active,
                  verified: institution?.verified,
                  popular: institution?.popular,
                  featured: institution?.featured,
              })}>
                Güncelle
              </Button>
            </CardFooter>
          </Card>
        );

      default:
        return <div>Geçersiz sekme.</div>;
    }
  };

  const menuItems = [
    { id: "dashboard", label: "Gösterge Paneli", icon: <Activity className="w-4 h-4" /> },
    { id: "settings", label: "Ayarlar", icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 bg-opacity-90 relative">
      {/* Background image with overlay */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1589909202802-8f4aadce1849?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
          alt="KKTC Manzarası"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-white bg-opacity-85"></div>
      </div>

      <div className="relative z-10 flex flex-col h-screen">
        <header className="bg-white bg-opacity-90 border-b shadow-sm">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-gray-800"
            >
              KKTC Kurum Paneli
            </motion.h1>
            <Button variant="destructive" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Çıkış Yap
            </Button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar - visible on desktop */}
          <aside className="hidden md:block w-64 bg-white bg-opacity-90 border-r shadow-sm">
            <ScrollArea className="h-[calc(100vh-4rem)]">
              <div className="p-4">
                <nav className="space-y-1">
                  {menuItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={activeTab === item.id ? "secondary" : "ghost"}
                      className={`w-full justify-start ${
                        activeTab === item.id ? "bg-gray-100" : ""
                      }`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                    </Button>
                  ))}
                </nav>
              </div>
            </ScrollArea>
          </aside>

          {/* Main content */}
          <main className="flex-1 overflow-auto">
            {/* Mobile tabs - only visible on mobile */}
            <div className="md:hidden px-4 py-3 overflow-x-auto">
              <ScrollArea className="w-full">
                <div className="flex gap-2 min-w-max">
                  {menuItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={activeTab === item.id ? "secondary" : "outline"}
                      size="sm"
                      className="flex items-center"
                      onClick={() => setActiveTab(item.id)}
                    >
                      {item.icon}
                      <span className="ml-1">{item.label}</span>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Tab content */}
            <div className="container mx-auto px-4 py-6">
              {renderTabContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default InstitutionPage;
