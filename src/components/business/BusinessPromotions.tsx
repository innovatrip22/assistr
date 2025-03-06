
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { BadgePercent, CalendarDays, PlusCircle, Pencil, Trash2, Check, Clock } from "lucide-react";

const mockPromotions = [
  {
    id: 1,
    title: "Yaz Özel İndirim",
    description: "Tüm yaz menüsünde %20 indirim fırsatı",
    discount: 20,
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    isActive: true,
    code: "YAZ20"
  },
  {
    id: 2,
    title: "Haftasonu Kahvaltı Özel",
    description: "Haftasonu kahvaltı menüsünde ikinci kişi ücretsiz",
    discount: 50,
    startDate: "2023-05-01",
    endDate: "2023-12-31",
    isActive: true,
    code: "WKND50"
  },
  {
    id: 3,
    title: "Erken Rezervasyon",
    description: "Bir hafta önceden rezervasyon yapanlara %15 indirim",
    discount: 15,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    isActive: true,
    code: "EARLY15"
  },
  {
    id: 4,
    title: "Kış Kampanyası",
    description: "Tüm kış menüsünde %25 indirim fırsatı",
    discount: 25,
    startDate: "2023-12-01",
    endDate: "2024-02-28",
    isActive: false,
    code: "WINTER25"
  }
];

const BusinessPromotions = () => {
  const [promotions] = useState(mockPromotions);
  const [isAdding, setIsAdding] = useState(false);

  const toggleAddForm = () => {
    setIsAdding(!isAdding);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Promosyonlar ve İndirimler</CardTitle>
              <CardDescription>İşletmenizin özel kampanya ve indirimlerini yönetin</CardDescription>
            </div>
            <Button onClick={toggleAddForm}>
              {isAdding ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  İptal
                </>
              ) : (
                <>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Yeni Promosyon
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {isAdding && (
            <Card className="border-dashed border-primary">
              <CardHeader>
                <CardTitle className="text-lg">Yeni Promosyon Ekle</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Promosyon Başlığı</label>
                  <Input placeholder="Örn. Yaz Sezonu İndirimi" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Açıklama</label>
                  <Textarea placeholder="Promosyon detayları ve kuralları..." rows={3} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">İndirim Oranı (%)</label>
                    <Input placeholder="20" type="number" min="1" max="100" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Promosyon Kodu</label>
                    <Input placeholder="YAZ2023" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Başlangıç Tarihi</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Bitiş Tarihi</label>
                    <Input type="date" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={toggleAddForm}>İptal</Button>
                <Button>Promosyonu Ekle</Button>
              </CardFooter>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {promotions.map(promotion => (
              <Card key={promotion.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        {promotion.title}
                        {promotion.isActive ? (
                          <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-200">Aktif</Badge>
                        ) : (
                          <Badge variant="outline" className="ml-2">Beklemede</Badge>
                        )}
                      </CardTitle>
                      <CardDescription>{promotion.description}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="text-lg font-bold">%{promotion.discount}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <BadgePercent className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm font-medium">Kod: {promotion.code}</span>
                    </div>
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">
                        {new Date(promotion.startDate).toLocaleDateString('tr-TR')} - {new Date(promotion.endDate).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">
                        {promotion.isActive 
                          ? `Bitimine ${Math.ceil((new Date(promotion.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} gün kaldı`
                          : `Başlamasına ${Math.ceil((new Date(promotion.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} gün kaldı`}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <Pencil className="h-4 w-4 mr-1" />
                    Düzenle
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Sil
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessPromotions;
