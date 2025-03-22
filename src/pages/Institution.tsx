import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmergencyReportsList } from "@/components/institution/EmergencyReportsList";
import { PriceReportsList } from "@/components/institution/PriceReportsList";
import { FraudReportsList } from "@/components/institution/FraudReportsList";
import { FeedbackList } from "@/components/institution/FeedbackList";
import { MapSection } from "@/components/institution/MapSection";
import InstitutionDemoPanel from "@/components/tourist/InstitutionDemoPanel";

// Import the custom icons from our utils folder
import { Tool, Clock, Globe, Upload, Share2, Switch } from "@/utils/iconUtils";

const Institution: React.FC = () => {
  const [userData, setUserData] = useState({
    name: "Örnek Kurum",
    type: "Belediye",
    announcement: "Önemli duyurular burada yer alacaktır...",
  });

  return (
    <div className="container mx-auto py-10">
      <Tabs defaultvalue="panel-1" className="w-[100%]">
        <TabsList>
          <TabsTrigger value="panel-1">
            <Tool className="mr-2 h-4 w-4" />
            Genel Ayarlar
          </TabsTrigger>
          <TabsTrigger value="panel-2">
            <Clock className="mr-2 h-4 w-4" />
            Acil Durum Raporları
          </TabsTrigger>
          <TabsTrigger value="panel-3">
            <Globe className="mr-2 h-4 w-4" />
            Fiyat Raporları
          </TabsTrigger>
          <TabsTrigger value="panel-4">
            <Upload className="mr-2 h-4 w-4" />
            Sahtecilik Raporları
          </TabsTrigger>
          <TabsTrigger value="panel-5">
            <Share2 className="mr-2 h-4 w-4" />
            Geri Bildirimler
          </TabsTrigger>
          <TabsTrigger value="panel-6">
            <Switch className="mr-2 h-4 w-4" />
            Harita
          </TabsTrigger>
        </TabsList>
        <TabsContent value="panel-1">
          <InstitutionDemoPanel userData={userData} />
        </TabsContent>
        <TabsContent value="panel-2">
          <EmergencyReportsList />
        </TabsContent>
        <TabsContent value="panel-3">
          <PriceReportsList />
        </TabsContent>
        <TabsContent value="panel-4">
          <FraudReportsList />
        </TabsContent>
        <TabsContent value="panel-5">
          <FeedbackList />
        </TabsContent>
        <TabsContent value="panel-6">
          <MapSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Institution;
