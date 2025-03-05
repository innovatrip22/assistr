
import { useState, useEffect } from "react";
import { MessageSquare, Calendar, CheckCircle, Clock, ReplyAll } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { 
  getFeedbacks, 
  updateFeedbackStatus 
} from "@/services/dataService";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

interface FeedbackListProps {
  onOpenResponseDialog: (id: string, type: 'feedback') => void;
  loadData: () => void;
}

const FeedbackList = ({ onOpenResponseDialog, loadData }: FeedbackListProps) => {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    try {
      const data = await getFeedbacks();
      setFeedbacks(data);
    } catch (error) {
      console.error("Error loading feedbacks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateFeedbackStatus = async (id: string, status: 'pending' | 'processed') => {
    try {
      await updateFeedbackStatus(id, status);
      loadData();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
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
                        
                        {feedback.response && (
                          <div className="bg-blue-50 p-2 rounded-md mb-3 border border-blue-200">
                            <p className="text-sm font-medium text-blue-800">Yanıtınız:</p>
                            <p className="text-sm text-gray-600">{feedback.response}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {format(new Date(feedback.response_timestamp || ""), 'dd MMM yyyy HH:mm', {locale: tr})}
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
                                onClick={() => onOpenResponseDialog(feedback.id, 'feedback')}
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
                        
                        {feedback.response && (
                          <div className="bg-blue-50 p-2 rounded-md mb-3 border border-blue-200">
                            <p className="text-sm font-medium text-blue-800">Yanıtınız:</p>
                            <p className="text-sm text-gray-600">{feedback.response}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {format(new Date(feedback.response_timestamp || ""), 'dd MMM yyyy HH:mm', {locale: tr})}
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
                                onClick={() => onOpenResponseDialog(feedback.id, 'feedback')}
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
  );
};

export default FeedbackList;
