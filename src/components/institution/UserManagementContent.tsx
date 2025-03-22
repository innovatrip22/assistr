
import { useState } from "react";
import { User, UserPlus, Shield, Clock, MapPin, Key, EyeOff, Eye, MoreHorizontal, Trash, Lock, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for users
const mockUsers = [
  {
    id: "user-1",
    name: "Ahmet Yılmaz",
    email: "ahmet.yilmaz@elektrik.gov.ct",
    role: "admin",
    department: "Yönetim",
    lastLogin: "2023-06-15T09:24:53Z",
    status: "active",
    ipAddress: "192.168.1.45",
    createdAt: "2022-01-10T08:30:00Z"
  },
  {
    id: "user-2",
    name: "Ayşe Kaya",
    email: "ayse.kaya@elektrik.gov.ct",
    role: "operator",
    department: "Müşteri Hizmetleri",
    lastLogin: "2023-06-14T14:12:05Z",
    status: "active",
    ipAddress: "192.168.1.32",
    createdAt: "2022-03-22T10:15:00Z"
  },
  {
    id: "user-3",
    name: "Mehmet Demir",
    email: "mehmet.demir@elektrik.gov.ct",
    role: "technician",
    department: "Teknik",
    lastLogin: "2023-06-12T08:45:30Z",
    status: "active",
    ipAddress: "192.168.1.56",
    createdAt: "2022-02-15T09:45:00Z"
  },
  {
    id: "user-4",
    name: "Zeynep Şahin",
    email: "zeynep.sahin@elektrik.gov.ct",
    role: "viewer",
    department: "Muhasebe",
    lastLogin: "2023-06-10T11:32:40Z",
    status: "inactive",
    ipAddress: "192.168.1.22",
    createdAt: "2022-05-05T13:20:00Z"
  },
  {
    id: "user-5",
    name: "Mustafa Çelik",
    email: "mustafa.celik@elektrik.gov.ct",
    role: "operator",
    department: "Satış",
    lastLogin: "2023-06-15T10:05:12Z",
    status: "active",
    ipAddress: "192.168.1.78",
    createdAt: "2022-04-18T11:30:00Z"
  }
];

const UserManagementContent = () => {
  const [users, setUsers] = useState(mockUsers);
  const [showPassword, setShowPassword] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "viewer",
    department: "",
    password: ""
  });

  const roleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-red-100 text-red-800 border-red-300">Yönetici</Badge>;
      case "operator":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">Operatör</Badge>;
      case "technician":
        return <Badge className="bg-amber-100 text-amber-800 border-amber-300">Teknisyen</Badge>;
      case "viewer":
        return <Badge className="bg-green-100 text-green-800 border-green-300">Gözlemci</Badge>;
      default:
        return <Badge>Bilinmiyor</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Bilinmiyor";
    const date = new Date(dateString);
    return date.toLocaleString('tr-TR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCreateUser = () => {
    // This would normally connect to an API to create the user
    console.log("Creating user:", newUser);
    // For demo purposes, add to local state
    const newId = `user-${users.length + 1}`;
    const createdUser = {
      id: newId,
      ...newUser,
      status: "active",
      lastLogin: "",
      ipAddress: "",
      createdAt: new Date().toISOString()
    };
    setUsers([...users, createdUser]);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Kullanıcı Yönetimi</CardTitle>
              <CardDescription>Panel kullanıcılarının ayarları ve yetkilendirme</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-4 md:mt-0">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Yeni Kullanıcı
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Yeni Kullanıcı Ekle</DialogTitle>
                  <DialogDescription>
                    Yeni bir panel kullanıcısı oluşturun. Kullanıcıya otomatik bir şifre sıfırlama bağlantısı gönderilecektir.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">İsim Soyisim</label>
                    <Input 
                      id="name" 
                      value={newUser.name} 
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">E-posta</label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={newUser.email} 
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="department" className="text-sm font-medium">Departman</label>
                    <Input 
                      id="department" 
                      value={newUser.department} 
                      onChange={(e) => setNewUser({...newUser, department: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="role" className="text-sm font-medium">Rol</label>
                    <Select 
                      value={newUser.role} 
                      onValueChange={(value) => setNewUser({...newUser, role: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Rol seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Yönetici</SelectItem>
                        <SelectItem value="operator">Operatör</SelectItem>
                        <SelectItem value="technician">Teknisyen</SelectItem>
                        <SelectItem value="viewer">Gözlemci</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">Geçici Şifre</label>
                    <div className="relative">
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"} 
                        value={newUser.password} 
                        onChange={(e) => setNewUser({...newUser, password: e.target.value})} 
                      />
                      <button 
                        type="button" 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" type="button">
                    İptal
                  </Button>
                  <Button type="button" onClick={handleCreateUser}>
                    Kullanıcı Oluştur
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Tüm Kullanıcılar</TabsTrigger>
              <TabsTrigger value="active">Aktif</TabsTrigger>
              <TabsTrigger value="inactive">Pasif</TabsTrigger>
              <TabsTrigger value="admins">Yöneticiler</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <Card>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Kullanıcı</TableHead>
                          <TableHead>Rol</TableHead>
                          <TableHead>Departman</TableHead>
                          <TableHead>Son Giriş</TableHead>
                          <TableHead>Durum</TableHead>
                          <TableHead className="w-[100px]">İşlemler</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map(user => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-medium">{user.name}</span>
                                <span className="text-sm text-gray-500">{user.email}</span>
                              </div>
                            </TableCell>
                            <TableCell>{roleLabel(user.role)}</TableCell>
                            <TableCell>{user.department}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1 text-gray-500" />
                                <span className="text-sm">{formatDate(user.lastLogin)}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={user.status === "active" ? "default" : "secondary"}>
                                {user.status === "active" ? "Aktif" : "Pasif"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Lock className="h-4 w-4 mr-2" />
                                    Şifre Sıfırla
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Check className="h-4 w-4 mr-2" />
                                    {user.status === "active" ? "Pasif Yap" : "Aktif Yap"}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash className="h-4 w-4 mr-2" />
                                    Kullanıcıyı Sil
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="active">
              <Card>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Kullanıcı</TableHead>
                          <TableHead>Rol</TableHead>
                          <TableHead>Departman</TableHead>
                          <TableHead>Son Giriş</TableHead>
                          <TableHead className="w-[100px]">İşlemler</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.filter(user => user.status === "active").map(user => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-medium">{user.name}</span>
                                <span className="text-sm text-gray-500">{user.email}</span>
                              </div>
                            </TableCell>
                            <TableCell>{roleLabel(user.role)}</TableCell>
                            <TableCell>{user.department}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1 text-gray-500" />
                                <span className="text-sm">{formatDate(user.lastLogin)}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Lock className="h-4 w-4 mr-2" />
                                    Şifre Sıfırla
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Check className="h-4 w-4 mr-2" />
                                    Pasif Yap
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash className="h-4 w-4 mr-2" />
                                    Kullanıcıyı Sil
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="inactive">
              <Card>
                <CardContent className="p-6 text-center">
                  <User className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium mb-1">Pasif Kullanıcılar</h3>
                  {users.filter(user => user.status === "inactive").length === 0 ? (
                    <p className="text-gray-500">Pasif kullanıcı bulunmamaktadır.</p>
                  ) : (
                    <p className="text-gray-500">
                      {users.filter(user => user.status === "inactive").length} pasif kullanıcı bulundu.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="admins">
              <Card>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Kullanıcı</TableHead>
                          <TableHead>Departman</TableHead>
                          <TableHead>Son Giriş</TableHead>
                          <TableHead>Durum</TableHead>
                          <TableHead className="w-[100px]">İşlemler</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.filter(user => user.role === "admin").map(user => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-medium">{user.name}</span>
                                <span className="text-sm text-gray-500">{user.email}</span>
                              </div>
                            </TableCell>
                            <TableCell>{user.department}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1 text-gray-500" />
                                <span className="text-sm">{formatDate(user.lastLogin)}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={user.status === "active" ? "default" : "secondary"}>
                                {user.status === "active" ? "Aktif" : "Pasif"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Lock className="h-4 w-4 mr-2" />
                                    Şifre Sıfırla
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Check className="h-4 w-4 mr-2" />
                                    {user.status === "active" ? "Pasif Yap" : "Aktif Yap"}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash className="h-4 w-4 mr-2" />
                                    Kullanıcıyı Sil
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Rol Yetkileri</CardTitle>
          <CardDescription>Kullanıcı rollerinin erişim haklarını yapılandırın</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-red-500" />
                  Yönetici (Admin)
                </h3>
                <p className="text-sm text-gray-500">Tam erişim</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gray-50">
                  <CardHeader className="py-2 px-4">
                    <CardTitle className="text-sm">Kullanıcı Yönetimi</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 px-4">
                    <div className="flex items-center justify-between py-1">
                      <span className="text-sm">Görüntüleme</span>
                      <Switch checked={true} disabled />
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-sm">Düzenleme</span>
                      <Switch checked={true} disabled />
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-sm">Silme</span>
                      <Switch checked={true} disabled />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-50">
                  <CardHeader className="py-2 px-4">
                    <CardTitle className="text-sm">Raporlar</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 px-4">
                    <div className="flex items-center justify-between py-1">
                      <span className="text-sm">Görüntüleme</span>
                      <Switch checked={true} disabled />
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-sm">Dışa Aktarma</span>
                      <Switch checked={true} disabled />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-50">
                  <CardHeader className="py-2 px-4">
                    <CardTitle className="text-sm">Sistem Ayarları</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 px-4">
                    <div className="flex items-center justify-between py-1">
                      <span className="text-sm">Görüntüleme</span>
                      <Switch checked={true} disabled />
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-sm">Düzenleme</span>
                      <Switch checked={true} disabled />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* More roles would follow with similar structure */}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">İptal</Button>
          <Button>Değişiklikleri Kaydet</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserManagementContent;
