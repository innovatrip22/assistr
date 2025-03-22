
import { useState } from "react";
import { 
  Save, 
  Settings, 
  Bell, 
  Mail, 
  MessageSquare, 
  Database, 
  ServerOff, 
  ShieldAlert, 
  Languages 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SettingsContent = () => {
  const [smtpSettings, setSmtpSettings] = useState({
    server: "smtp.elektrik.gov.ct",
    port: "587",
    username: "notifications@elektrik.gov.ct",
    password: "********",
    encryption: "tls"
  });

  const [generalSettings, setGeneralSettings] = useState({
    institutionName: "KKTC Elektrik Kurumu",
    contactEmail: "info@elektrik.gov.ct",
    contactPhone: "+90 392 123 4567",
    autoLogout: "30",
    language: "tr",
    theme: "light"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    enableEmailNotifications: true,
    enableSmsNotifications: true,
    enableSystemAlerts: true,
    notifyOnNewApplication: true,
    notifyOnFeedback: true,
    notifyOnSystemIssue: true,
    dailySummary: false
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            <CardTitle>Sistem Ayarları</CardTitle>
          </div>
          <CardDescription>
            Sistem yapılandırması ve entegrasyon ayarları
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general">
            <TabsList className="mb-6">
              <TabsTrigger value="general">
                <Settings className="h-4 w-4 mr-2" />
                Genel
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="h-4 w-4 mr-2" />
                Bildirimler
              </TabsTrigger>
              <TabsTrigger value="email">
                <Mail className="h-4 w-4 mr-2" />
                E-posta
              </TabsTrigger>
              <TabsTrigger value="sms">
                <MessageSquare className="h-4 w-4 mr-2" />
                SMS
              </TabsTrigger>
              <TabsTrigger value="backup">
                <Database className="h-4 w-4 mr-2" />
                Yedekleme
              </TabsTrigger>
              <TabsTrigger value="monitoring">
                <ServerOff className="h-4 w-4 mr-2" />
                İzleme
              </TabsTrigger>
              <TabsTrigger value="security">
                <ShieldAlert className="h-4 w-4 mr-2" />
                Güvenlik
              </TabsTrigger>
              <TabsTrigger value="localization">
                <Languages className="h-4 w-4 mr-2" />
                Yerelleştirme
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="general">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Kurum Adı</label>
                      <Input 
                        value={generalSettings.institutionName} 
                        onChange={(e) => setGeneralSettings({...generalSettings, institutionName: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">İletişim E-posta</label>
                      <Input 
                        type="email" 
                        value={generalSettings.contactEmail} 
                        onChange={(e) => setGeneralSettings({...generalSettings, contactEmail: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">İletişim Telefon</label>
                      <Input 
                        value={generalSettings.contactPhone} 
                        onChange={(e) => setGeneralSettings({...generalSettings, contactPhone: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Otomatik Çıkış Süresi (dakika)</label>
                      <Input 
                        type="number" 
                        value={generalSettings.autoLogout} 
                        onChange={(e) => setGeneralSettings({...generalSettings, autoLogout: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Dil</label>
                      <Select 
                        value={generalSettings.language}
                        onValueChange={(value) => setGeneralSettings({...generalSettings, language: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Dil seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tr">Türkçe</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Tema</label>
                      <Select 
                        value={generalSettings.theme}
                        onValueChange={(value) => setGeneralSettings({...generalSettings, theme: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Tema seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Açık</SelectItem>
                          <SelectItem value="dark">Koyu</SelectItem>
                          <SelectItem value="system">Sistem</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications">
              <div className="space-y-6">
                <Card className="border border-gray-200">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base">Bildirim Tercihleri</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">E-posta Bildirimleri</p>
                          <p className="text-sm text-gray-500">E-posta yoluyla sistem bildirimleri</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.enableEmailNotifications} 
                          onCheckedChange={(checked) => setNotificationSettings({
                            ...notificationSettings, 
                            enableEmailNotifications: checked
                          })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">SMS Bildirimleri</p>
                          <p className="text-sm text-gray-500">SMS yoluyla sistem bildirimleri</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.enableSmsNotifications} 
                          onCheckedChange={(checked) => setNotificationSettings({
                            ...notificationSettings, 
                            enableSmsNotifications: checked
                          })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Sistem Uyarıları</p>
                          <p className="text-sm text-gray-500">Sistem sorunları hakkında bildirimler</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.enableSystemAlerts} 
                          onCheckedChange={(checked) => setNotificationSettings({
                            ...notificationSettings, 
                            enableSystemAlerts: checked
                          })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Yeni Başvuru Bildirimleri</p>
                          <p className="text-sm text-gray-500">Yeni başvuru geldiğinde bildirim</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.notifyOnNewApplication} 
                          onCheckedChange={(checked) => setNotificationSettings({
                            ...notificationSettings, 
                            notifyOnNewApplication: checked
                          })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Geri Bildirim Bildirimleri</p>
                          <p className="text-sm text-gray-500">Yeni geri bildirim geldiğinde bildirim</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.notifyOnFeedback} 
                          onCheckedChange={(checked) => setNotificationSettings({
                            ...notificationSettings, 
                            notifyOnFeedback: checked
                          })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Günlük Özet</p>
                          <p className="text-sm text-gray-500">Günlük işlem özeti e-postası</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.dailySummary} 
                          onCheckedChange={(checked) => setNotificationSettings({
                            ...notificationSettings, 
                            dailySummary: checked
                          })}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="email">
              <div className="space-y-6">
                <Card className="border border-gray-200">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base">E-posta Sunucu Ayarları</CardTitle>
                    <CardDescription>Bildirim ve iletişim için e-posta sunucu yapılandırması</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">SMTP Sunucu</label>
                          <Input 
                            value={smtpSettings.server} 
                            onChange={(e) => setSmtpSettings({...smtpSettings, server: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Port</label>
                          <Input 
                            value={smtpSettings.port} 
                            onChange={(e) => setSmtpSettings({...smtpSettings, port: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Şifreleme</label>
                          <Select 
                            value={smtpSettings.encryption}
                            onValueChange={(value) => setSmtpSettings({...smtpSettings, encryption: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Şifreleme seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">Yok</SelectItem>
                              <SelectItem value="ssl">SSL</SelectItem>
                              <SelectItem value="tls">TLS</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Kullanıcı Adı</label>
                          <Input 
                            value={smtpSettings.username} 
                            onChange={(e) => setSmtpSettings({...smtpSettings, username: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Şifre</label>
                          <Input 
                            type="password" 
                            value={smtpSettings.password} 
                            onChange={(e) => setSmtpSettings({...smtpSettings, password: e.target.value})}
                          />
                        </div>
                        <div className="pt-6">
                          <Button>Test Bağlantısı</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base">E-posta Şablonları</CardTitle>
                    <CardDescription>Otomatik e-posta içerik şablonları</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Yeni Başvuru Bildirimi</label>
                        <Textarea 
                          placeholder="E-posta içeriği" 
                          className="h-32"
                          defaultValue="Sayın {{name}}, başvurunuz alınmıştır. Başvuru numaranız: {{application_id}}"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Başvuru Durum Değişikliği</label>
                        <Textarea 
                          placeholder="E-posta içeriği" 
                          className="h-32"
                          defaultValue="Sayın {{name}}, {{application_id}} numaralı başvurunuzun durumu {{status}} olarak güncellenmiştir."
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="sms">
              <div className="py-12 text-center">
                <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium mb-1">SMS Ayarları</h3>
                <p className="text-gray-500 mb-4">Bu modül henüz tamamlanmamıştır.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="backup">
              <div className="py-12 text-center">
                <Database className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium mb-1">Yedekleme Ayarları</h3>
                <p className="text-gray-500 mb-4">Bu modül henüz tamamlanmamıştır.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="monitoring">
              <div className="py-12 text-center">
                <ServerOff className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium mb-1">Sistem İzleme</h3>
                <p className="text-gray-500 mb-4">Bu modül henüz tamamlanmamıştır.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="security">
              <div className="py-12 text-center">
                <ShieldAlert className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium mb-1">Güvenlik Ayarları</h3>
                <p className="text-gray-500 mb-4">Bu modül henüz tamamlanmamıştır.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="localization">
              <div className="py-12 text-center">
                <Languages className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium mb-1">Yerelleştirme Ayarları</h3>
                <p className="text-gray-500 mb-4">Bu modül henüz tamamlanmamıştır.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">İptal</Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Kaydet
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SettingsContent;
