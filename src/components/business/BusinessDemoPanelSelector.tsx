
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hotel, Utensils, RotateCw } from "lucide-react";
import RestaurantPanel from "./RestaurantPanel";
import HotelPanel from "./HotelPanel";

const BusinessDemoPanelSelector = () => {
  const [activePanel, setActivePanel] = useState<string>("restaurant");

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
          <CardTitle className="text-2xl font-bold text-center text-green-800 flex items-center justify-center gap-2">
            <span className="bg-green-100 p-2 rounded-full">
              {activePanel === "restaurant" ? (
                <Utensils className="h-6 w-6 text-green-600" />
              ) : (
                <Hotel className="h-6 w-6 text-green-600" />
              )}
            </span>
            İşletme Demosu - {activePanel === "restaurant" ? "Restoran" : "Otel"} Paneli
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex justify-center mb-4">
            <Tabs
              value={activePanel}
              onValueChange={setActivePanel}
              className="w-full max-w-md"
            >
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="restaurant" className="flex items-center gap-2">
                  <Utensils className="h-4 w-4" />
                  Restoran Paneli
                </TabsTrigger>
                <TabsTrigger value="hotel" className="flex items-center gap-2">
                  <Hotel className="h-4 w-4" />
                  Otel Paneli
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="text-center mb-6">
            <p className="text-gray-700 mb-3">
              Bu demo, AssisTR platformunda işletmelerin kullanabileceği dijital yönetim araçlarını 
              göstermektedir. Gerçek verilerle entegre şekilde çalışan bu sistem, işletmelerin 
              operasyonlarını dijitalleştirmesine yardımcı olur.
            </p>
            <div className="flex justify-center">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <RotateCw className="h-4 w-4" />
                Demo Verileri Güncelle
              </Button>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 bg-white">
            {activePanel === "restaurant" ? <RestaurantPanel /> : <HotelPanel />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessDemoPanelSelector;
