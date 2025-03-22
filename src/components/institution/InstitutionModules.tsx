
import { useState } from "react";
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileBarChart, 
  Users, 
  FileText, 
  Megaphone, 
  FolderArchive, 
  CalendarDays, 
  Settings, 
  Zap, 
  BarChart3,
  Wallet,
  Construction
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardContent from "./DashboardContent";
import FeedbackManagement from "./FeedbackManagement";
import ReportingContent from "./ReportingContent";
import UserManagementContent from "./UserManagementContent";
import ApplicationTracking from "./ApplicationTracking";
import AnnouncementManagement from "./AnnouncementManagement";
import ResponseDialog from "./ResponseDialog";

interface InstitutionModulesProps {
  institutionType: string;
}

const InstitutionModules = ({ institutionType }: InstitutionModulesProps) => {
  const [responseDialogOpen, setResponseDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'feedback' | 'report' | null>(null);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);

  const handleOpenResponseDialog = (id: string, type: 'feedback' | 'report') => {
    setSelectedId(id);
    setSelectedType(type);
    setResponseDialogOpen(true);
  };

  const handleAssignReport = (id: string) => {
    setSelectedId(id);
    setAssignDialogOpen(true);
  };

  const loadData = () => {
    // Refresh data after dialog actions
    console.log("Reloading data...");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Tabs defaultValue="dashboard" className="space-y-6">
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <TabsList className="p-1">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-gray-100">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Kontrol Paneli
            </TabsTrigger>
            <TabsTrigger value="feedback" className="data-[state=active]:bg-gray-100">
              <MessageSquare className="h-4 w-4 mr-2" />
              Geri Bildirim
            </TabsTrigger>
            <TabsTrigger value="reporting" className="data-[state=active]:bg-gray-100">
              <FileBarChart className="h-4 w-4 mr-2" />
              Raporlama
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-gray-100">
              <Users className="h-4 w-4 mr-2" />
              Kullanıcı Yönetimi
            </TabsTrigger>
            <TabsTrigger value="applications" className="data-[state=active]:bg-gray-100">
              <FileText className="h-4 w-4 mr-2" />
              Başvuru Takibi
            </TabsTrigger>
            <TabsTrigger value="announcements" className="data-[state=active]:bg-gray-100">
              <Megaphone className="h-4 w-4 mr-2" />
              Duyuru Yönetimi
            </TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-gray-100">
              <FolderArchive className="h-4 w-4 mr-2" />
              Evrak Yönetimi
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-gray-100">
              <CalendarDays className="h-4 w-4 mr-2" />
              Etkinlikler
            </TabsTrigger>
            <TabsTrigger value="incidents" className="data-[state=active]:bg-gray-100">
              <Zap className="h-4 w-4 mr-2" />
              Arıza Yönetimi
            </TabsTrigger>
            <TabsTrigger value="consumption" className="data-[state=active]:bg-gray-100">
              <BarChart3 className="h-4 w-4 mr-2" />
              Tüketim
            </TabsTrigger>
            <TabsTrigger value="payment" className="data-[state=active]:bg-gray-100">
              <Wallet className="h-4 w-4 mr-2" />
              Borç & Tahsilat
            </TabsTrigger>
            <TabsTrigger value="infrastructure" className="data-[state=active]:bg-gray-100">
              <Construction className="h-4 w-4 mr-2" />
              Altyapı
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gray-100">
              <Settings className="h-4 w-4 mr-2" />
              Sistem Ayarları
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard">
          <DashboardContent />
        </TabsContent>

        <TabsContent value="feedback">
          <FeedbackManagement 
            onOpenResponseDialog={handleOpenResponseDialog} 
          />
        </TabsContent>

        <TabsContent value="reporting">
          <ReportingContent />
        </TabsContent>

        <TabsContent value="users">
          <UserManagementContent />
        </TabsContent>

        <TabsContent value="applications">
          <ApplicationTracking />
        </TabsContent>

        <TabsContent value="announcements">
          <AnnouncementManagement />
        </TabsContent>

        <TabsContent value="documents">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <FolderArchive className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <h3 className="text-lg font-medium mb-2">Evrak Yönetimi</h3>
            <p className="text-gray-500 mb-4">Bu modül henüz tamamlanmamıştır.</p>
          </div>
        </TabsContent>

        <TabsContent value="events">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <CalendarDays className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <h3 className="text-lg font-medium mb-2">Etkinlikler</h3>
            <p className="text-gray-500 mb-4">Bu modül henüz tamamlanmamıştır.</p>
          </div>
        </TabsContent>

        <TabsContent value="incidents">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <Zap className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <h3 className="text-lg font-medium mb-2">Arıza Yönetimi</h3>
            <p className="text-gray-500 mb-4">Bu modül henüz tamamlanmamıştır.</p>
          </div>
        </TabsContent>

        <TabsContent value="consumption">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <h3 className="text-lg font-medium mb-2">Tüketim & Sayaç Yönetimi</h3>
            <p className="text-gray-500 mb-4">Bu modül henüz tamamlanmamıştır.</p>
          </div>
        </TabsContent>

        <TabsContent value="payment">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <Wallet className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <h3 className="text-lg font-medium mb-2">Borç & Tahsilat Raporları</h3>
            <p className="text-gray-500 mb-4">Bu modül henüz tamamlanmamıştır.</p>
          </div>
        </TabsContent>

        <TabsContent value="infrastructure">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <Construction className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <h3 className="text-lg font-medium mb-2">Altyapı Yönetimi</h3>
            <p className="text-gray-500 mb-4">Bu modül henüz tamamlanmamıştır.</p>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <Settings className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <h3 className="text-lg font-medium mb-2">Sistem Ayarları</h3>
            <p className="text-gray-500 mb-4">Bu modül henüz tamamlanmamıştır.</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Response Dialog */}
      <ResponseDialog
        open={responseDialogOpen}
        onOpenChange={setResponseDialogOpen}
        selectedId={selectedId}
        selectedType={selectedType}
        onSubmitSuccess={loadData}
      />
    </div>
  );
};

export default InstitutionModules;
