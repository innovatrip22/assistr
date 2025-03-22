
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus, Tag, Search } from "lucide-react";

// Cyprus-specific products with appropriate images
const cypriotProducts = [
  { 
    id: 1, 
    name: "Şeftali Kebabı", 
    price: 85, 
    category: "Ana Yemek", 
    stock: 999, 
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3lwcnVzJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D"
  },
  { 
    id: 2, 
    name: "Hellim Salatası", 
    price: 65, 
    category: "Meze", 
    stock: 999, 
    image: "https://images.unsplash.com/photo-1609501676725-7186f017d49a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhhbG91bWl8ZW58MHx8MHx8fDA%3D"
  },
  { 
    id: 3, 
    name: "Molehiya", 
    price: 70, 
    category: "Ana Yemek", 
    stock: 50, 
    image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y3lwcnVzJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D"
  },
  { 
    id: 4, 
    name: "Zivaniya", 
    price: 45, 
    category: "İçecek", 
    stock: 150, 
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3lwcnVzJTIwZHJpbmt8ZW58MHx8MHx8fDA%3D"
  },
  { 
    id: 5, 
    name: "Pirohu (Kıbrıs Mantısı)", 
    price: 75, 
    category: "Ana Yemek", 
    stock: 100, 
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cee6a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZHVtcGxpbmd8ZW58MHx8MHx8fDA%3D"
  },
  { 
    id: 6, 
    name: "Macun Tatlısı", 
    price: 55, 
    category: "Tatlı", 
    stock: 75, 
    image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y3lwcnVzJTIwZGVzc2VydHxlbnwwfHwwfHx8MA%3D%3D"
  },
  { 
    id: 7, 
    name: "Kıbrıs Kahvesi", 
    price: 25, 
    category: "İçecek", 
    stock: 999, 
    image: "https://images.unsplash.com/photo-1462917882517-e150004895fa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGN5cHJ1cyUyMGNvZmZlZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  { 
    id: 8, 
    name: "Kıbrıs Zeytinyağı", 
    price: 90, 
    category: "Yerel Ürün", 
    stock: 50, 
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b2xpdmUlMjBvaWx8ZW58MHx8MHx8fDA%3D"
  },
  { 
    id: 9, 
    name: "Kıbrıs Çörek Otu Balı", 
    price: 120, 
    category: "Yerel Ürün", 
    stock: 30, 
    image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9uZXl8ZW58MHx8MHx8fDA%3D" 
  },
];

const BusinessProducts = () => {
  const [products, setProducts] = useState(cypriotProducts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Extract unique categories from products
  const categories = [...new Set(products.map(product => product.category))];

  // Filter products based on selected category and search term
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
              <CardDescription>İşletmenizin sunduğu Kıbrıs'a özgü ürün ve hizmetleri yönetin</CardDescription>
            </div>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>Yeni Ürün</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            <Button 
              variant={selectedCategory === null ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              Tümü
            </Button>
            {categories.map(category => (
              <Button 
                key={category} 
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-cyan-600 hover:bg-cyan-700 text-white" : ""}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Ürün ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 max-w-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <Badge className="absolute top-2 right-2 bg-cyan-600">{product.category}</Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{product.name}</h3>
                      <p className="text-lg font-bold mt-1 text-cyan-700">{product.price}₺</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <Tag className="h-4 w-4 mr-1" />
                    <span>Stok: {product.stock}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2 p-4 pt-0 border-t">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Pencil className="h-4 w-4 mr-1" />
                    Düzenle
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-red-500 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Sil
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Aradığınız kriterlere uygun ürün bulunamadı.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory(null);
                }}
              >
                Tüm ürünleri göster
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessProducts;
