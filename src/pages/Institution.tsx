
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Badge
} from "@/components/ui/badge";
import {
  Button
} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  ScrollArea
} from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  Map, 
  MessageSquare, 
  AlertTriangle, 
  Ban, 
  FileWarning, 
  CheckCircle,
  ReplyAll,
  X,
  Calendar,
  Clock
} from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { 
  getFeedbacks, 
  getReports, 
  updateFeedbackStatus, 
  updateReportStatus,
  addFeedbackResponse,
  addReportResponse
} from "@/services/dataService";
import { toast } from "sonner";

const Institution = () => {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'feedback' | 'report' | null>(null);
  const [responseText, setResponseText] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    // Load feedbacks and reports
    loadData();
  }, []);

  const loadData = () => {
    setFeedbacks(getFeedbacks());
    setReports(getReports());
  };

  const handleUpdateFeedbackStatus = (id: string, status: 'pending' | 'processed') => {
    updateFeedbackStatus(id, status);
    loadData();
  };

  const handleUpdateReportStatus = (id: string, status: 'pending' | 'processed') => {
    updateReportStatus(id, status);
    loadData();
  };

  const handleOpenResponseDialog = (id: string, type: 'feedback' | 'report') => {
    setSelectedId(id);
    setSelectedType(type);
    setResponseText("");
    setDialogOpen(true);
  };

  const handleSubmitResponse = () => {
    if (!responseText.trim()) {
      toast.error("Lütfen bir yanıt girin");
      return;
    }

    if (selectedType === 'feedback' && selectedId) {
      addFeedbackResponse(selectedId, responseText);
      toast.success("Yanıtınız başarıyla gönderildi");
    } else if (selectedType === 'report' && selectedId) {
      addReportResponse(selectedId, responseText);
      toast.success("Yanıtınız başarıyla gönderildi");
    }

    setDialogOpen(false);
    setResponseText("");
    setSelectedId(null);
    setSelectedType(null);
    loadData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Kurum Paneli</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map Section */}
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Map className="w-6 h-6 text-primary" />
                <CardTitle>Antalya Haritası</CardTitle>
              </div>
              <CardDescription>
                Şehir genelindeki raporlar ve bildirimler
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Harita Yükleniyor...</p>
              </div>
            </CardContent>
          </Card>

          {/* Reports Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Ban className="w-6 h-6 text-primary" />
                <CardTitle>Fahiş Fiyat Raporları</CardTitle>
              </div>
              <CardDescription>
                Turistler tarafından bildirilen aşırı fiyatlandırma raporları
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                {reports.filter(report => report.type === 'price').length > 0 ? (
                  <div className="space-y-4">
                    {reports
                      .filter(report => report.type === 'price')
                      .map((report, index) => (
                        <div 
                          key={index} 
                          className={`p-4 rounded-lg border ${report.status === 'pending' ? 'border-orange-300 bg-orange-50' : 'border-green-300 bg-green-50'}`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium">{report.businessName}</h3>
                              <p className="text-sm text-gray-600">{report.productName}</p>
                            </div>
                            <Badge variant={report.status === 'pending' ? 'outline' : 'secondary'}>
                              {report.status === 'pending' ? 'Bekliyor' : 'İşlendi'}
                            </Badge>
                          </div>
                          <div className="mb-2">
                            <div className="flex gap-2 text-sm">
                              <span className="font-medium">Fiyat:</span>
                              <span className="text-red-500">{report.paidPrice} TL</span>
                              {report.normalPrice && (
                                <>
                                  <span>vs</span>
                                  <span className="text-green-500">{report.normalPrice} TL</span>
                                </>
                              )}
                            </div>
                            {report.location && (
                              <div className="text-sm text-gray-600">
                                <span className="font-medium">Konum:</span> {report.location}
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                          
                          {/* Display response if available */}
                          {report.response && (
                            <div className="bg-blue-50 p-2 rounded-md mb-3 border border-blue-200">
                              <p className="text-sm font-medium text-blue-800">Yanıtınız:</p>
                              <p className="text-sm text-gray-600">{report.response}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {format(new Date(report.responseTimestamp || ""), 'dd MMM yyyy HH:mm', {locale: tr})}
                              </p>
                            </div>
                          )}
                          
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {format(new Date(report.timestamp), 'dd MMM yyyy', {locale: tr})}
                              <Clock className="w-3 h-3 ml-2" />
                              {format(new Date(report.timestamp), 'HH:mm', {locale: tr})}
                            </div>
                            <div className="flex gap-2">
                              {!report.response && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleOpenResponseDialog(report.id, 'report')}
                                >
                                  <ReplyAll className="w-3 h-3 mr-1" />
                                  Yanıtla
                                </Button>
                              )}
                              {report.status === 'pending' && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleUpdateReportStatus(report.id, 'processed')}
                                >
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  İşlendi
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <Ban className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Henüz fahiş fiyat raporu bulunmuyor</p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Problem Businesses Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <FileWarning className="w-6 h-6 text-primary" />
                <CardTitle>Sorunlu İşletmeler</CardTitle>
              </div>
              <CardDescription>
                Hakkında şikayet olan işletmeler
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                {reports.filter(report => report.type === 'fraud').length > 0 ? (
                  <div className="space-y-4">
                    {reports
                      .filter(report => report.type === 'fraud')
                      .map((report, index) => (
                        <div 
                          key={index} 
                          className={`p-4 rounded-lg border ${report.status === 'pending' ? 'border-red-300 bg-red-50' : 'border-green-300 bg-green-50'}`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium">Dolandırıcılık Bildirimi</h3>
                              <p className="text-sm text-gray-600">{report.location}</p>
                            </div>
                            <Badge variant={report.status === 'pending' ? 'destructive' : 'secondary'}>
                              {report.status === 'pending' ? 'Acil' : 'İşlendi'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                          
                          {/* Display response if available */}
                          {report.response && (
                            <div className="bg-blue-50 p-2 rounded-md mb-3 border border-blue-200">
                              <p className="text-sm font-medium text-blue-800">Yanıtınız:</p>
                              <p className="text-sm text-gray-600">{report.response}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {format(new Date(report.responseTimestamp || ""), 'dd MMM yyyy HH:mm', {locale: tr})}
                              </p>
                            </div>
                          )}
                          
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {format(new Date(report.timestamp), 'dd MMM yyyy', {locale: tr})}
                              <Clock className="w-3 h-3 ml-2" />
                              {format(new Date(report.timestamp), 'HH:mm', {locale: tr})}
                            </div>
                            <div className="flex gap-2">
                              {!report.response && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleOpenResponseDialog(report.id, 'report')}
                                >
                                  <ReplyAll className="w-3 h-3 mr-1" />
                                  Yanıtla
                                </Button>
                              )}
                              {report.status === 'pending' && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleUpdateReportStatus(report.id, 'processed')}
                                >
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  İşlendi
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <FileWarning className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Henüz dolandırıcılık raporu bulunmuyor</p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Emergencies Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-primary" />
                <CardTitle>Acil Durumlar</CardTitle>
              </div>
              <CardDescription>
                Acil durum bildirimleri
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                {reports.filter(report => report.type === 'emergency').length > 0 ? (
                  <div className="space-y-4">
                    {reports
                      .filter(report => report.type === 'emergency')
                      .map((report, index) => (
                        <div 
                          key={index} 
                          className={`p-4 rounded-lg border ${report.status === 'pending' ? 'border-red-300 bg-red-50' : 'border-green-300 bg-green-50'}`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium">Acil Durum Bildirimi</h3>
                            </div>
                            <Badge variant={report.status === 'pending' ? 'destructive' : 'secondary'}>
                              {report.status === 'pending' ? 'Acil' : 'İşlendi'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                          
                          {/* Display response if available */}
                          {report.response && (
                            <div className="bg-blue-50 p-2 rounded-md mb-3 border border-blue-200">
                              <p className="text-sm font-medium text-blue-800">Yanıtınız:</p>
                              <p className="text-sm text-gray-600">{report.response}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {format(new Date(report.responseTimestamp || ""), 'dd MMM yyyy HH:mm', {locale: tr})}
                              </p>
                            </div>
                          )}
                          
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {format(new Date(report.timestamp), 'dd MMM yyyy', {locale: tr})}
                              <Clock className="w-3 h-3 ml-2" />
                              {format(new Date(report.timestamp), 'HH:mm', {locale: tr})}
                            </div>
                            <div className="flex gap-2">
                              {!report.response && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleOpenResponseDialog(report.id, 'report')}
                                >
                                  <ReplyAll className="w-3 h-3 mr-1" />
                                  Yanıtla
                                </Button>
                              )}
                              {report.status === 'pending' && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleUpdateReportStatus(report.id, 'processed')}
                                >
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  İşlendi
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Henüz acil durum bildirimi bulunmuyor</p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Feedback Section */}
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-primary" />
                <CardTitle>Bildirimler ve Şikayetler</CardTitle>
              </div>
              <CardDescription>
                Turistlerden gelen şikayet ve geri bildirimler
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="complaints">
                <TabsList className="mb-4">
                  <TabsTrigger value="complaints">Şikayetler</TabsTrigger>
                  <TabsTrigger value="chat">Chatbot Mesajları</TabsTrigger>
                </TabsList>
                
                <TabsContent value="complaints">
                  <ScrollArea className="h-[400px]">
                    {feedbacks.filter(feedback => feedback.type === 'complaint').length > 0 ? (
                      <div className="space-y-4">
                        {feedbacks
                          .filter(feedback => feedback.type === 'complaint')
                          .map((feedback, index) => (
                            <div 
                              key={index} 
                              className={`p-4 rounded-lg border ${feedback.status === 'pending' ? 'border-yellow-300 bg-yellow-50' : 'border-green-300 bg-green-50'}`}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-medium">{feedback.subject}</h3>
                                  <p className="text-sm text-gray-600">{feedback.institution}</p>
                                </div>
                                <Badge variant={feedback.status === 'pending' ? 'outline' : 'secondary'}>
                                  {feedback.status === 'pending' ? 'Bekliyor' : 'İşlendi'}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{feedback.message}</p>
                              
                              {/* Display response if available */}
                              {feedback.response && (
                                <div className="bg-blue-50 p-2 rounded-md mb-3 border border-blue-200">
                                  <p className="text-sm font-medium text-blue-800">Yanıtınız:</p>
                                  <p className="text-sm text-gray-600">{feedback.response}</p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {format(new Date(feedback.responseTimestamp || ""), 'dd MMM yyyy HH:mm', {locale: tr})}
                                  </p>
                                </div>
                              )}
                              
                              <div className="flex justify-between items-center text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {format(new Date(feedback.timestamp), 'dd MMM yyyy', {locale: tr})}
                                  <Clock className="w-3 h-3 ml-2" />
                                  {format(new Date(feedback.timestamp), 'HH:mm', {locale: tr})}
                                </div>
                                <div className="flex gap-2">
                                  {!feedback.response && (
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleOpenResponseDialog(feedback.id, 'feedback')}
                                    >
                                      <ReplyAll className="w-3 h-3 mr-1" />
                                      Yanıtla
                                    </Button>
                                  )}
                                  {feedback.status === 'pending' && (
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleUpdateFeedbackStatus(feedback.id, 'processed')}
                                    >
                                      <CheckCircle className="w-3 h-3 mr-1" />
                                      İşlendi
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center py-10 text-gray-500">
                        <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>Henüz şikayet bulunmuyor</p>
                      </div>
                    )}
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="chat">
                  <ScrollArea className="h-[400px]">
                    {feedbacks.filter(feedback => feedback.type === 'chat').length > 0 ? (
                      <div className="space-y-4">
                        {feedbacks
                          .filter(feedback => feedback.type === 'chat')
                          .map((feedback, index) => (
                            <div 
                              key={index} 
                              className={`p-4 rounded-lg border ${feedback.status === 'pending' ? 'border-blue-300 bg-blue-50' : 'border-green-300 bg-green-50'}`}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-medium">Chatbot Mesajı</h3>
                                </div>
                                <Badge variant={feedback.status === 'pending' ? 'outline' : 'secondary'}>
                                  {feedback.status === 'pending' ? 'Yeni' : 'İncelendi'}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{feedback.message}</p>
                              
                              {/* Display response if available */}
                              {feedback.response && (
                                <div className="bg-blue-50 p-2 rounded-md mb-3 border border-blue-200">
                                  <p className="text-sm font-medium text-blue-800">Yanıtınız:</p>
                                  <p className="text-sm text-gray-600">{feedback.response}</p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {format(new Date(feedback.responseTimestamp || ""), 'dd MMM yyyy HH:mm', {locale: tr})}
                                  </p>
                                </div>
                              )}
                              
                              <div className="flex justify-between items-center text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {format(new Date(feedback.timestamp), 'dd MMM yyyy', {locale: tr})}
                                  <Clock className="w-3 h-3 ml-2" />
                                  {format(new Date(feedback.timestamp), 'HH:mm', {locale: tr})}
                                </div>
                                <div className="flex gap-2">
                                  {!feedback.response && (
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleOpenResponseDialog(feedback.id, 'feedback')}
                                    >
                                      <ReplyAll className="w-3 h-3 mr-1" />
                                      Yanıtla
                                    </Button>
                                  )}
                                  {feedback.status === 'pending' && (
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleUpdateFeedbackStatus(feedback.id, 'processed')}
                                    >
                                      <CheckCircle className="w-3 h-3 mr-1" />
                                      İncelendi
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center py-10 text-gray-500">
                        <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>Henüz chatbot mesajı bulunmuyor</p>
                      </div>
                    )}
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Response Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yanıt Gönder</DialogTitle>
            <DialogDescription>
              Kullanıcıya gönderilecek yanıtı yazın. Bu yanıt kullanıcının turist panelinde görüntülenecektir.
            </DialogDescription>
          </DialogHeader>
          
          <Textarea
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            placeholder="Yanıtınızı buraya yazın..."
            className="min-h-[120px]"
          />
          
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              İptal
            </Button>
            <Button onClick={handleSubmitResponse}>
              Yanıt Gönder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Institution;
