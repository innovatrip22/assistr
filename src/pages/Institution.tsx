
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, BarChart3, CheckCircle, AlertTriangle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  getFeedbacks, 
  getReports,
  addFeedbackResponse,
  addReportResponse,
  getUserNotifications,
  getFeedbackSummary,
  getReportSummary
} from "@/services";
import MapSection from "@/components/institution/MapSection";
import FeedbackList from "@/components/institution/FeedbackList";
import EmergencyReportsList from "@/components/institution/EmergencyReportsList";
import FraudReportsList from "@/components/institution/FraudReportsList";
import PriceReportsList from "@/components/institution/PriceReportsList";
import ResponseDialog from "@/components/institution/ResponseDialog";
import AssignReportDialog from "@/components/institution/AssignReportDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Institution = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'feedback' | 'report' | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [notifications, setNotifications] = useState<any>({ total: 0 });
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [feedbackSummary, setFeedbackSummary] = useState<any>({
    totalFeedbacks: 0,
    totalComplaints: 0,
    totalPraises: 0,
    totalSuggestions: 0,
    averageRating: 0
  });
  const [reportSummary, setReportSummary] = useState<any>({
    totalReports: 0,
    totalPriceReports: 0,
    totalFraudReports: 0,
    totalEmergencyReports: 0,
    pendingReports: 0
  });
  
  const { signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Load data on component mount
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
      
      // Load summary data
      const feedbackData = await getFeedbackSummary();
      setFeedbackSummary(feedbackData);
      
      const reportData = await getReportSummary();
      setReportSummary(reportData);
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

  const calculatePercentage = (value: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">KKTC Turizm Kurumu Yönetim Paneli</h1>
            <p className="text-gray-600 mt-1">Turizm departmanı, bildirimleri ve istatistikleri yönetin</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1">
              <span className="font-semibold">{notifications.total}</span>
              <span className="hidden sm:inline">Yeni Bildirim</span>
            </div>
            <Button variant="destructive" size="sm" onClick={handleSignOut}>
              <LogOut className="mr-2 w-4 h-4" />
              <span className="hidden sm:inline">Çıkış Yap</span>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
            <TabsTrigger value="map">Harita Görünümü</TabsTrigger>
            <TabsTrigger value="reports">Raporlar ve Geri Bildirimler</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Metrics Cards */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Özet İstatistikler
                  </CardTitle>
                  <CardDescription>Kurum geneli raporlar ve geri bildirimler</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Toplam Raporlar</span>
                        <span className="font-medium">{reportSummary.totalReports}</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Toplam Geri Bildirimler</span>
                        <span className="font-medium">{feedbackSummary.totalFeedbacks}</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Bekleyen İşlemler</span>
                        <span className="font-medium">{reportSummary.pendingReports}</span>
                      </div>
                      <Progress value={calculatePercentage(reportSummary.pendingReports, reportSummary.totalReports)} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Ortalama Memnuniyet</span>
                        <span className="font-medium">{feedbackSummary.averageRating.toFixed(1)}/5</span>
                      </div>
                      <Progress value={feedbackSummary.averageRating * 20} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    Rapor Dağılımı
                  </CardTitle>
                  <CardDescription>Türlere göre rapor sayıları</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Fiyat Bildirimleri</span>
                        <span className="font-medium">{reportSummary.totalPriceReports}</span>
                      </div>
                      <Progress value={calculatePercentage(reportSummary.totalPriceReports, reportSummary.totalReports)} className="h-2 bg-blue-100">
                        <div className="h-full bg-blue-500 rounded-full"></div>
                      </Progress>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Dolandırıcılık Bildirimleri</span>
                        <span className="font-medium">{reportSummary.totalFraudReports}</span>
                      </div>
                      <Progress value={calculatePercentage(reportSummary.totalFraudReports, reportSummary.totalReports)} className="h-2 bg-amber-100">
                        <div className="h-full bg-amber-500 rounded-full"></div>
                      </Progress>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Acil Durum Bildirimleri</span>
                        <span className="font-medium">{reportSummary.totalEmergencyReports}</span>
                      </div>
                      <Progress value={calculatePercentage(reportSummary.totalEmergencyReports, reportSummary.totalReports)} className="h-2 bg-red-100">
                        <div className="h-full bg-red-500 rounded-full"></div>
                      </Progress>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-green-500" />
                    Geri Bildirim Dağılımı
                  </CardTitle>
                  <CardDescription>Türlere göre geri bildirim sayıları</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Şikayetler</span>
                        <span className="font-medium">{feedbackSummary.totalComplaints}</span>
                      </div>
                      <Progress value={calculatePercentage(feedbackSummary.totalComplaints, feedbackSummary.totalFeedbacks)} className="h-2 bg-red-100">
                        <div className="h-full bg-red-500 rounded-full"></div>
                      </Progress>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Övgüler</span>
                        <span className="font-medium">{feedbackSummary.totalPraises}</span>
                      </div>
                      <Progress value={calculatePercentage(feedbackSummary.totalPraises, feedbackSummary.totalFeedbacks)} className="h-2 bg-green-100">
                        <div className="h-full bg-green-500 rounded-full"></div>
                      </Progress>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Öneriler</span>
                        <span className="font-medium">{feedbackSummary.totalSuggestions}</span>
                      </div>
                      <Progress value={calculatePercentage(feedbackSummary.totalSuggestions, feedbackSummary.totalFeedbacks)} className="h-2 bg-blue-100">
                        <div className="h-full bg-blue-500 rounded-full"></div>
                      </Progress>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Sohbetler</span>
                        <span className="font-medium">{feedbackSummary.totalFeedbacks - (feedbackSummary.totalComplaints + feedbackSummary.totalPraises + feedbackSummary.totalSuggestions)}</span>
                      </div>
                      <Progress value={calculatePercentage(feedbackSummary.totalFeedbacks - (feedbackSummary.totalComplaints + feedbackSummary.totalPraises + feedbackSummary.totalSuggestions), feedbackSummary.totalFeedbacks)} className="h-2 bg-purple-100">
                        <div className="h-full bg-purple-500 rounded-full"></div>
                      </Progress>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <MapSection />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="overflow-hidden">
                  <CardHeader className="bg-amber-50 pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                      Acil Dikkat Gerektiren Konular
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      {reportSummary.pendingReports > 0 ? (
                        <>
                          {reportSummary.totalEmergencyReports > 0 && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-3">
                              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-medium text-red-900">Acil Durum Bildirimleri</h4>
                                <p className="text-sm text-red-700">Acil durum bildirimleri yanıt bekliyor, lütfen en kısa sürede kontrol edin.</p>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="mt-2 bg-white"
                                  onClick={() => {
                                    setActiveTab("reports");
                                  }}
                                >
                                  Bildirimleri Görüntüle
                                </Button>
                              </div>
                            </div>
                          )}
                          
                          {reportSummary.totalFraudReports > 0 && (
                            <div className="p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-3">
                              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-medium text-amber-900">Dolandırıcılık Bildirimleri</h4>
                                <p className="text-sm text-amber-700">Dolandırıcılık bildirimleri işlenmeyi bekliyor, lütfen inceleyin.</p>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="mt-2 bg-white"
                                  onClick={() => {
                                    setActiveTab("reports");
                                  }}
                                >
                                  Bildirimleri Görüntüle
                                </Button>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-md flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-green-900">Tüm Bildirimler İşlendi</h4>
                            <p className="text-sm text-green-700">Şu anda bekleyen acil bildirim bulunmamaktadır.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden">
                  <CardHeader className="bg-blue-50 pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-500" />
                      Son 7 Gün Performansı
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-center h-40">
                      <p className="text-gray-500 text-center">Haftalık performans grafiği burada görüntülenecek</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="map">
            <MapSection />
          </TabsContent>
          
          <TabsContent value="reports">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          </TabsContent>
        </Tabs>
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
