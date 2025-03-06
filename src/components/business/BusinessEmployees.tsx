
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, UserPlus, Mail, Phone, Calendar, Clock, UserCog, User, Pencil, Trash2 } from "lucide-react";

const mockEmployees = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    position: "Şef",
    email: "ahmet@example.com",
    phone: "+90 555 123 4567",
    hireDate: "2020-03-15",
    schedule: "Pazartesi-Cuma: 08:00-16:00",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Zeynep Kaya",
    position: "Garson",
    email: "zeynep@example.com",
    phone: "+90 555 987 6543",
    hireDate: "2021-06-10",
    schedule: "Çarşamba-Pazar: 16:00-00:00",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Mehmet Demir",
    position: "Barmen",
    email: "mehmet@example.com",
    phone: "+90 555 456 7890",
    hireDate: "2022-01-05",
    schedule: "Perşembe-Pazartesi: 18:00-02:00",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    id: 4,
    name: "Ayşe Çelik",
    position: "Kasiyer",
    email: "ayse@example.com",
    phone: "+90 555 789 0123",
    hireDate: "2021-12-01",
    schedule: "Salı-Cumartesi: 10:00-18:00",
    avatar: "https://randomuser.me/api/portraits/women/26.jpg"
  }
];

const BusinessEmployees = () => {
  const [employees, setEmployees] = useState(mockEmployees);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleAddForm = () => {
    setIsAdding(!isAdding);
  };

  const filteredEmployees = employees.filter(employee => {
    return employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <CardTitle>Personel Yönetimi</CardTitle>
              <CardDescription>İşletmenizin çalışanlarını yönetin</CardDescription>
            </div>
            <Button onClick={toggleAddForm}>
              {isAdding ? (
                <>İptal</>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Personel Ekle
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center border rounded-md p-1 max-w-md">
            <Input 
              placeholder="Personel ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          {isAdding && (
            <Card className="border-dashed border-primary">
              <CardHeader>
                <CardTitle className="text-lg">Yeni Personel Ekle</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Ad Soyad</label>
                    <Input placeholder="Ad Soyad" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Pozisyon</label>
                    <Input placeholder="Örn. Garson, Şef, Barmen" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">E-posta</label>
                    <Input type="email" placeholder="ornek@mail.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Telefon</label>
                    <Input placeholder="+90 xxx xxx xx xx" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">İşe Başlama Tarihi</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Çalışma Saatleri</label>
                    <Input placeholder="Örn. Pazartesi-Cuma: 09:00-17:00" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={toggleAddForm}>İptal</Button>
                <Button>Personel Ekle</Button>
              </CardFooter>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEmployees.map(employee => (
              <Card key={employee.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img 
                      src={employee.avatar} 
                      alt={employee.name} 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg">{employee.name}</h3>
                          <Badge className="mt-1">{employee.position}</Badge>
                        </div>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-4 text-sm">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{employee.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{employee.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{new Date(employee.hireDate).toLocaleDateString('tr-TR')}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{employee.schedule}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessEmployees;
