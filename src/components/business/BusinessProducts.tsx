
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus, Tag } from "lucide-react";

const dummyProducts = [
  { id: 1, name: "Akdeniz Salatası", price: 75, category: "Yemek", stock: 999, image: "https://picsum.photos/id/20/200/200" },
  { id: 2, name: "Türk Kahvesi", price: 40, category: "İçecek", stock: 999, image: "https://picsum.photos/id/30/200/200" },
  { id: 3, name: "Baklava (Porsiyon)", price: 120, category: "Tatlı", stock: 50, image: "https://picsum.photos/id/40/200/200" },
  { id: 4, name: "Antalya Turu", price: 500, category: "Tur", stock: 15, image: "https://picsum.photos/id/50/200/200" },
  { id: 5, name: "Plaj Havlusu", price: 150, category: "Eşya", stock: 200, image: "https://picsum.photos/id/60/200/200" },
  { id: 6, name: "Antalya Hatırası", price: 85, category: "Hediyelik", stock: 75, image: "https://picsum.photos/id/70/200/200" },
];

const BusinessProducts = () => {
  const [products, setProducts] = useState(dummyProducts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [...new Set(products.map(product => product.category))];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Ürün ve Hizmetler</CardTitle>
              <CardDescription>İşletmenizin sunduğu ürün ve hizmetleri yönetin</CardDescription>
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
              <Card key={product.id} className="overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-40 object-cover"
                />
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
