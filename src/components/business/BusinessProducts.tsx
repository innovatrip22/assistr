
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus, Tag } from "lucide-react";

const kktcProducts = [
  { id: 1, name: "Hellim Peyniri", price: 120, category: "Yiyecek", stock: 85, image: "https://images.unsplash.com/photo-1624806992066-5ffecaf220db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80" },
  { id: 2, name: "Kıbrıs Kahvesi", price: 40, category: "İçecek", stock: 150, image: "https://images.unsplash.com/photo-1635443544894-e2c7bb0053e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1640&q=80" },
  { id: 3, name: "Macun Tatlısı", price: 90, category: "Tatlı", stock: 45, image: "https://images.unsplash.com/photo-1587248720327-8eb72564be1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80" },
  { id: 4, name: "Girne Kalesi Turu", price: 250, category: "Tur", stock: 20, image: "https://images.unsplash.com/photo-1585938389612-a552a28d6914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80" },
  { id: 5, name: "Karpaz Plaj Şemsiyesi", price: 180, category: "Eşya", stock: 35, image: "https://images.unsplash.com/photo-1533614767844-1b444a492db0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80" },
  { id: 6, name: "St. Hilarion Kalesi Hatırası", price: 75, category: "Hediyelik", stock: 60, image: "https://images.unsplash.com/photo-1583144568008-76903e8e1107?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80" },
  { id: 7, name: "Kıbrıs Zeytinyağı", price: 150, category: "Yiyecek", stock: 70, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80" },
  { id: 8, name: "Salamis Harabeleri Gezisi", price: 300, category: "Tur", stock: 15, image: "https://images.unsplash.com/photo-1532939454649-30d618a20e63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80" },
  { id: 9, name: "Kıbrıs El Dokuması", price: 220, category: "Hediyelik", stock: 25, image: "https://images.unsplash.com/photo-1459186667841-31a2cda574da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80" },
];

const BusinessProducts = () => {
  const [products, setProducts] = useState(kktcProducts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [...new Set(products.map(product => product.category))];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 relative z-10">
      <Card className="bg-white bg-opacity-95">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>KKTC Ürün ve Hizmetleri</CardTitle>
              <CardDescription>İşletmenizin sunduğu yerel ürün ve hizmetleri yönetin</CardDescription>
            </div>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>Yeni Ürün</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <Button 
              variant={selectedCategory === null ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              Tümü
            </Button>
            {categories.map(category => (
              <Button 
                key={category} 
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="mb-6">
            <Input 
              placeholder="Ürün ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden bg-white">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-lg font-bold mt-1">{product.price}₺</p>
                    </div>
                    <Badge>{product.category}</Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <Tag className="h-4 w-4 mr-1" />
                    <span>Stok: {product.stock}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2 p-4 pt-0">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Pencil className="h-4 w-4 mr-1" />
                    Düzenle
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-red-500 hover:text-red-700">
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

export default BusinessProducts;
