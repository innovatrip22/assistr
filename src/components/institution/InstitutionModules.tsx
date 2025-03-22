
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
  Construction,
  Home,
  HelpCircle,
  MapPin,
  ChevronRight
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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
  const [activeTab, setActiveTab] = useState("dashboard");

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

  const tabItems = [
    { value: "dashboard", label: "Kontrol Paneli", icon: <LayoutDashboard className="h-5 w-5" /> },
    { value: "feedback", label: "Geri Bildirim", icon: <MessageSquare className="h-5 w-5" /> },
    { value: "reporting", label: "Raporlama", icon: <FileBarChart className="h-5 w-5" /> },
    { value: "users", label: "Kullanıcı Yönetimi", icon: <Users className="h-5 w-5" /> },
    { value: "applications", label: "Başvuru Takibi", icon: <FileText className="h-5 w-5" /> },
    { value: "announcements", label: "Duyuru Yönetimi", icon: <Megaphone className="h-5 w-5" /> },
    { value: "documents", label: "Evrak Yönetimi", icon: <FolderArchive className="h-5 w-5" /> },
    { value: "events", label: "Etkinlikler", icon: <CalendarDays className="h-5 w-5" /> },
    { value: "incidents", label: "Arıza Yönetimi", icon: <Zap className="h-5 w-5" /> },
    { value: "consumption", label: "Tüketim", icon: <BarChart3 className="h-5 w-5" /> },
    { value: "payment", label: "Borç & Tahsilat", icon: <Wallet className="h-5 w-5" /> },
    { value: "infrastructure", label: "Altyapı", icon: <Construction className="h-5 w-5" /> },
    { value: "settings", label: "Sistem Ayarları", icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Home className="h-4 w-4" />
        <ChevronRight className="h-4 w-4 mx-1" />
        <span>Kurum</span>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="font-medium text-gray-700">{activeTab === "dashboard" ? "Kontrol Paneli" : tabItems.find(tab => tab.value === activeTab)?.label}</span>
      </div>

      {/* Quick Actions */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <Button variant="outline" className="justify-start" onClick={() => setActiveTab("feedback")}>
          <MessageSquare className="h-4 w-4 mr-2" /> Geri Bildirim
        </Button>
        <Button variant="outline" className="justify-start" onClick={() => setActiveTab("reporting")}>
          <FileBarChart className="h-4 w-4 mr-2" /> Raporlama
        </Button>
        <Button variant="outline" className="justify-start" onClick={() => setActiveTab("applications")}>
          <FileText className="h-4 w-4 mr-2" /> Başvurular
        </Button>
        <Button variant="outline" className="justify-start" onClick={() => setActiveTab("announcements")}>
          <Megaphone className="h-4 w-4 mr-2" /> Duyurular
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <Card className="lg:w-64 h-fit sticky top-6">
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-150px)] lg:h-auto">
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-4">KKTC Modüller</h2>
                <div className="space-y-1">
                  {tabItems.map((item) => (
                    <Button
                      key={item.value}
                      variant={activeTab === item.value ? "default" : "ghost"}
                      className={`w-full justify-start ${activeTab === item.value ? 'bg-blue-600 text-white' : ''}`}
                      onClick={() => setActiveTab(item.value)}
                    >
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                    </Button>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start">
                    <HelpCircle className="h-5 w-5 mr-2" />
                    Yardım
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <MapPin className="h-5 w-5 mr-2" />
                    Konum Yönetimi
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === "dashboard" && <DashboardContent />}
          {activeTab === "feedback" && (
            <FeedbackManagement onOpenResponseDialog={handleOpenResponseDialog} />
          )}
          {activeTab === "reporting" && <ReportingContent />}
          {activeTab === "users" && <UserManagementContent />}
          {activeTab === "applications" && <ApplicationTracking />}
          {activeTab === "announcements" && <AnnouncementManagement />}
          
          {(activeTab === "documents" || 
            activeTab === "events" || 
            activeTab === "incidents" || 
            activeTab === "consumption" || 
            activeTab === "payment" || 
            activeTab === "infrastructure" || 
            activeTab === "settings") && (
            <Card>
              <CardContent className="p-6 text-center">
                {tabItems.find(item => item.value === activeTab)?.icon && (
                  <div className="mx-auto w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full mb-4">
                    {tabItems.find(item => item.value === activeTab)?.icon}
                  </div>
                )}
                <h3 className="text-lg font-medium mb-2">{tabItems.find(item => item.value === activeTab)?.label}</h3>
                <p className="text-gray-500 mb-4">Bu modül henüz tamamlanmamıştır.</p>
                <Button variant="outline" onClick={() => setActiveTab("dashboard")}>Ana Panele Dön</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

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
