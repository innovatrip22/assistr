
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  getFeedbacks, 
  getReports,
  addFeedbackResponse,
  addReportResponse,
  getUserNotifications
} from "@/services";
import MapSection from "@/components/institution/MapSection";
import FeedbackList from "@/components/institution/FeedbackList";
import EmergencyReportsList from "@/components/institution/EmergencyReportsList";
import FraudReportsList from "@/components/institution/FraudReportsList";
import PriceReportsList from "@/components/institution/PriceReportsList";
import ResponseDialog from "@/components/institution/ResponseDialog";
import AssignReportDialog from "@/components/institution/AssignReportDialog";

const Institution = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'feedback' | 'report' | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [notifications, setNotifications] = useState<any>({ total: 0 });
  const { signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Load feedbacks and reports
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // We're just calling these to ensure the data is fresh
      // The actual data will be fetched within each component
      await getFeedbacks();
      await getReports();
      
      // Load notifications specifically for institution
      const notifs = await getUserNotifications('test-user', 'institution');
      setNotifications(notifs);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Veriler yüklenirken bir hata oluştu.");
    }
  };

  const handleOpenResponseDialog = (id: string, type: 'feedback' | 'report') => {
    setSelectedId(id);
    setSelectedType(type);
    setDialogOpen(true);
  };

  const handleOpenAssignDialog = (id: string) => {
    setSelectedId(id);
    setAssignDialogOpen(true);
  };
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Çıkış yapılırken bir hata oluştu.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">KKTC Turizm Kurumu Paneli</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {notifications.total} Yeni Bildirim
            </span>
            <Button variant="destructive" size="sm" onClick={handleSignOut}>
              <LogOut className="mr-2 w-4 h-4" />
              Çıkış Yap
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map Section */}
          <MapSection />

          {/* Reports Sections */}
          <PriceReportsList 
            onOpenResponseDialog={handleOpenResponseDialog}
            onAssignReport={handleOpenAssignDialog}
            loadData={loadData}
          />
          
          <FraudReportsList 
            onOpenResponseDialog={handleOpenResponseDialog}
            onAssignReport={handleOpenAssignDialog}
            loadData={loadData}
          />
          
          <EmergencyReportsList 
            onOpenResponseDialog={handleOpenResponseDialog}
            onAssignReport={handleOpenAssignDialog}
            loadData={loadData}
          />

          {/* Feedback Section */}
          <FeedbackList 
            onOpenResponseDialog={handleOpenResponseDialog}
            loadData={loadData}
          />
        </div>
      </motion.div>

      {/* Response Dialog */}
      <ResponseDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        selectedId={selectedId}
        selectedType={selectedType}
        onSubmitSuccess={loadData}
      />

      {/* Assign Dialog */}
      <AssignReportDialog
        open={assignDialogOpen}
        onOpenChange={setAssignDialogOpen}
        selectedId={selectedId}
        onSubmitSuccess={loadData}
      />
    </div>
  );
};

export default Institution;
