
import { useState, useEffect } from "react";
import { MessageSquare, Calendar, Smile, Frown, ThumbsUp, Filter, CheckCircle, Archive } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { getFeedback } from "@/services";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

interface FeedbackManagementProps {
  onOpenResponseDialog: (id: string, type: 'feedback') => void;
}

const FeedbackManagement = ({ onOpenResponseDialog }: FeedbackManagementProps) => {
  const [feedbackItems, setFeedbackItems] = useState<any[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadFeedback();
  }, []);

  useEffect(() => {
    filterFeedback();
  }, [feedbackItems, filter, searchQuery]);

  const loadFeedback = async () => {
    try {
      const data = await getFeedback();
      setFeedbackItems(data);
    } catch (error) {
      console.error("Error loading feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterFeedback = () => {
    let filtered = [...feedbackItems];
    
    // Apply type filter
    if (filter !== "all") {
      filtered = filtered.filter(item => item.type === filter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.title?.toLowerCase().includes(query) || 
        item.message?.toLowerCase().includes(query) ||
        item.user_name?.toLowerCase().includes(query)
      );
    }
    
    setFilteredItems(filtered);
  };

  const getFeedbackTypeIcon = (type: string) => {
    switch (type) {
      case "complaint":
        return <Frown className="h-5 w-5 text-red-500" />;
      case "suggestion":
        return <Smile className="h-5 w-5 text-blue-500" />;
      case "appreciation":
        return <ThumbsUp className="h-5 w-5 text-green-500" />;
      default:
        return <MessageSquare className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case "complaint":
        return "Şikayet";
      case "suggestion":
        return "Öneri";
      case "appreciation":
        return "Teşekkür";
      default:
        return "Genel";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "complaint":
        return "bg-red-100 text-red-800 border-red-300";
      case "suggestion":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "appreciation":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMM yyyy, HH:mm', { locale: tr });
    } catch {
      return "Tarih bilinmiyor";
    }
  };

  if (loading) {
    return <div className="p-4">Yükleniyor...</div>;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Geri Bildirim Yönetimi</CardTitle>
          <CardDescription>
            Vatandaş ve personelden gelen bildirimler
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Input
                placeholder="Ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">
                <Filter className="h-4 w-4" />
              </span>
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Tümünü Göster" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümünü Göster</SelectItem>
                <SelectItem value="complaint">Şikayetler</SelectItem>
                <SelectItem value="suggestion">Öneriler</SelectItem>
                <SelectItem value="appreciation">Teşekkürler</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Tümü</TabsTrigger>
              <TabsTrigger value="new">Yeni</TabsTrigger>
              <TabsTrigger value="responded">Yanıtlanan</TabsTrigger>
              <TabsTrigger value="archived">Arşivlenen</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <ScrollArea className="h-[500px]">
                <div className="space-y-4 pr-4">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start gap-2">
                              {getFeedbackTypeIcon(item.type)}
                              <div>
                                <CardTitle className="text-base">{item.title || "Başlık belirtilmemiş"}</CardTitle>
                                <CardDescription>{item.user_name || "İsimsiz kullanıcı"}</CardDescription>
                              </div>
                            </div>
                            <Badge variant="outline" className={getTypeColor(item.type)}>
                              {getTypeName(item.type)}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <p className="text-sm mb-3">{item.message}</p>
                          
                          {item.response && (
                            <div className="bg-blue-50 p-2 rounded-md mb-2 border border-blue-200">
                              <p className="text-sm font-medium text-blue-800">Yanıtınız:</p>
                              <p className="text-sm">{item.response}</p>
                            </div>
                          )}
                          
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(item.created_at)}</span>
                            </div>
                            <div className="flex gap-2">
                              {!item.response && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-xs h-7 px-2"
                                  onClick={() => onOpenResponseDialog(item.id, 'feedback')}
                                >
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Yanıtla
                                </Button>
                              )}
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-xs h-7 px-2"
                              >
                                <Archive className="h-3 w-3 mr-1" />
                                Arşivle
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-500">Herhangi bir geri bildirim bulunamadı</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="new">
              <div className="text-center py-12">
                <p className="text-gray-500">Yeni geri bildirimler burada görüntülenecek</p>
              </div>
            </TabsContent>
            
            <TabsContent value="responded">
              <div className="text-center py-12">
                <p className="text-gray-500">Yanıtlanan geri bildirimler burada görüntülenecek</p>
              </div>
            </TabsContent>
            
            <TabsContent value="archived">
              <div className="text-center py-12">
                <p className="text-gray-500">Arşivlenen geri bildirimler burada görüntülenecek</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackManagement;
