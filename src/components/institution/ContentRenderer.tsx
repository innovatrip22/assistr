
import { useState } from "react";
import { toast } from "sonner";
import { DashboardContent } from "@/components/institution";
import { SettingsContent } from "@/components/institution";
import { MapSection } from "@/components/institution";
import { EmergencyReportsList } from "@/components/institution";
import { PriceReportsList } from "@/components/institution";
import { FraudReportsList } from "@/components/institution";
import { ResponseDialog } from "@/components/institution";
import { AssignReportDialog } from "@/components/institution";
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
            onSubmit={handleAssignReport} 
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
      return <div>Geçersiz sekme.</div>;
  }
};

export default ContentRenderer;
