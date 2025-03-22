
import { useState } from "react";
import { toast } from "sonner";
import { 
  Activity, 
  Settings, 
  MessageSquare, 
  FileText, 
  Users, 
  ClipboardList, 
  Bell, 
  FileArchive, 
  Calendar, 
  Wrench, 
  BarChart, 
  CreditCard, 
  Construction
} from "lucide-react";
import { DashboardContent } from "@/components/institution";
import { SettingsContent } from "@/components/institution";
import { MapSection } from "@/components/institution";
import { EmergencyReportsList } from "@/components/institution";
import { PriceReportsList } from "@/components/institution";
import { FraudReportsList } from "@/components/institution";
import { ResponseDialog } from "@/components/institution";
import { AssignReportDialog } from "@/components/institution";
import { DepartmentContent } from "@/components/institution";
import { sendReportResponse, assignReport } from "@/services";
import type { Institution } from "@/services";

interface ContentRendererProps {
  activeTab: string;
  institution: Institution | null;
  handleUpdate: (updatedFields: Partial<Institution>) => void;
  setInstitution: React.Dispatch<React.SetStateAction<Institution | null>>;
}

const ContentRenderer = ({ 
  activeTab, 
  institution,
  handleUpdate,
  setInstitution
}: ContentRendererProps) => {
  const [responseDialogOpen, setResponseDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedItemType, setSelectedItemType] = useState<'report' | 'feedback'>('report');

  const handleOpenResponseDialog = (id: string, type: 'report' | 'feedback') => {
    setSelectedItemId(id);
    setSelectedItemType(type);
    setResponseDialogOpen(true);
  };

  const handleOpenAssignDialog = (id: string) => {
    setSelectedItemId(id);
    setAssignDialogOpen(true);
  };

  const handleSendResponse = async (response: string) => {
    if (!selectedItemId) return;
    
    try {
      await sendReportResponse(selectedItemId, response);
      toast.success("Yanıt başarıyla gönderildi!");
      loadData();
    } catch (error) {
      console.error("Error sending response:", error);
      toast.error("Yanıt gönderilirken bir hata oluştu.");
    } finally {
      setResponseDialogOpen(false);
    }
  };

  const handleAssignReport = async (departmentId: string) => {
    if (!selectedItemId) return;
    
    try {
      await assignReport(selectedItemId, departmentId);
      toast.success("Rapor başarıyla birime atandı!");
      loadData();
    } catch (error) {
      console.error("Error assigning report:", error);
      toast.error("Rapor atanırken bir hata oluştu.");
    } finally {
      setAssignDialogOpen(false);
    }
  };

  const loadData = () => {
    // Refresh data
    // This function will be passed to the report lists
  };

  const getDepartmentIcon = (tab: string) => {
    switch (tab) {
      case "dashboard": return <Activity className="w-6 h-6 text-blue-600" />;
      case "feedback": return <MessageSquare className="w-6 h-6 text-indigo-600" />;
      case "reports": return <FileText className="w-6 h-6 text-emerald-600" />;
      case "users": return <Users className="w-6 h-6 text-violet-600" />;
      case "applications": return <ClipboardList className="w-6 h-6 text-amber-600" />;
      case "announcements": return <Bell className="w-6 h-6 text-rose-600" />;
      case "documents": return <FileArchive className="w-6 h-6 text-teal-600" />;
      case "events": return <Calendar className="w-6 h-6 text-cyan-600" />;
      case "electricity": return <Wrench className="w-6 h-6 text-red-600" />;
      case "consumption": return <BarChart className="w-6 h-6 text-green-600" />;
      case "payment": return <CreditCard className="w-6 h-6 text-orange-600" />;
      case "infrastructure": return <Construction className="w-6 h-6 text-gray-600" />;
      case "settings": return <Settings className="w-6 h-6 text-gray-600" />;
      default: return <Activity className="w-6 h-6 text-blue-600" />;
    }
  };

  const getDepartmentDescription = (tab: string) => {
    switch (tab) {
      case "dashboard": return "Kurumunuzla ilgili genel bilgileri ve istatistikleri buradan görüntüleyebilirsiniz.";
      case "feedback": return "Vatandaşlardan gelen geri bildirimleri görüntüleyip yanıtlayabilirsiniz.";
      case "reports": return "Kurum raporları ve istatistiklerini görüntüleyebilirsiniz.";
      case "users": return "Kurum çalışanları ve kullanıcı yönetimini buradan yapabilirsiniz.";
      case "applications": return "Kuruma yapılan başvuruları takip edebilirsiniz.";
      case "announcements": return "Kurumsal duyuruları yönetebilirsiniz.";
      case "documents": return "Resmi evrak ve belgeleri yönetebilirsiniz.";
      case "events": return "Kurum etkinliklerini düzenleyebilir ve takip edebilirsiniz.";
      case "electricity": return "Elektrik arızalarını ve bakım çalışmalarını yönetebilirsiniz.";
      case "consumption": return "Elektrik tüketim verilerini ve sayaç bilgilerini görüntüleyebilirsiniz.";
      case "payment": return "Borç ve tahsilat raporlarını görüntüleyebilirsiniz.";
      case "infrastructure": return "Altyapı ve yatırım projelerini takip edebilirsiniz.";
      case "settings": return "Sistem ayarlarını buradan yapılandırabilirsiniz.";
      default: return "İçerik bilgisi";
    }
  };

  const getDepartmentTitle = (tab: string) => {
    switch (tab) {
      case "dashboard": return "Gösterge Paneli";
      case "feedback": return "Geri Bildirim";
      case "reports": return "Raporlama";
      case "users": return "Kullanıcı Yönetimi";
      case "applications": return "Başvuru Takibi";
      case "announcements": return "Duyuru Yönetimi";
      case "documents": return "Evrak Yönetimi";
      case "events": return "Etkinlikler";
      case "electricity": return "Elektrik Arıza Yönetimi";
      case "consumption": return "Tüketim & Sayaç Yönetimi";
      case "payment": return "Borç & Tahsilat Raporları";
      case "infrastructure": return "Yatırım & Altyapı";
      case "settings": return "Sistem Ayarları";
      default: return "Bilinmeyen";
    }
  };

  switch (activeTab) {
    case "dashboard":
      return (
        <div className="space-y-6">
          <DashboardContent institution={institution} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EmergencyReportsList 
              onOpenResponseDialog={handleOpenResponseDialog} 
              onAssignReport={handleOpenAssignDialog}
              loadData={loadData}
              limit={5}
            />
            
            <div className="grid grid-cols-1 gap-6">
              <PriceReportsList 
                onOpenResponseDialog={handleOpenResponseDialog} 
                onAssignReport={handleOpenAssignDialog}
                loadData={loadData}
                limit={3}
              />
              
              <FraudReportsList 
                onOpenResponseDialog={handleOpenResponseDialog} 
                onAssignReport={handleOpenAssignDialog}
                loadData={loadData}
                limit={3}
              />
            </div>
          </div>
          
          <MapSection />
          
          <ResponseDialog 
            open={responseDialogOpen} 
            onOpenChange={setResponseDialogOpen} 
            onRespond={handleSendResponse} 
          />
          
          <AssignReportDialog 
            open={assignDialogOpen} 
            onOpenChange={setAssignDialogOpen} 
            onAssign={handleAssignReport} 
          />
        </div>
      );
    case "settings":
      return (
        <SettingsContent 
          institution={institution} 
          onUpdate={handleUpdate} 
          setInstitution={setInstitution} 
        />
      );
    default:
      return (
        <DepartmentContent 
          title={getDepartmentTitle(activeTab)}
          description={getDepartmentDescription(activeTab)}
          icon={getDepartmentIcon(activeTab)}
          institution={institution}
          departmentId={activeTab}
        />
      );
  }
};

export default ContentRenderer;
