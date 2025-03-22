
import { useState, useEffect } from "react";
import { ShoppingCart, Calendar, Clock, CheckCircle, ReplyAll, Share2 } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { getReports, updateReportStatus } from "@/services";
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
import { toast } from "sonner";

interface PriceReportsListProps {
  onOpenResponseDialog: (id: string, type: 'report') => void;
  onAssignReport: (id: string) => void;
  loadData: () => void;
  limit?: number;
  institution?: string;
}

const PriceReportsList = ({ 
  onOpenResponseDialog, 
  onAssignReport, 
  loadData, 
  limit,
  institution 
}: PriceReportsListProps) => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        let reportData = await getReports();
        
        // Filter by institution if provided
        if (institution) {
          reportData = reportData.filter(report => 
            report.type === 'price'
          );
        } else {
          reportData = reportData.filter(report => report.type === 'price');
        }
        
        // Apply limit if provided
        if (limit && reportData.length > limit) {
          reportData = reportData.slice(0, limit);
        }
        
        setReports(reportData);
      } catch (error) {
        console.error("Error fetching price reports:", error);
        toast.error("Fiyat raporları yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [limit, institution]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">Beklemede</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">İşleniyor</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Çözüldü</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Reddedildi</Badge>;
      default:
        return <Badge variant="outline">Belirsiz</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd MMM yyyy, HH:mm', { locale: tr });
    } catch (error) {
      return "Geçersiz Tarih";
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      // Convert to acceptable status type
      const status = newStatus === "resolved" ? "responded" : "pending";
      await updateReportStatus(id, status);
      toast.success("Rapor durumu güncellendi");
      loadData();
    } catch (error) {
      console.error("Error updating report status:", error);
      toast.error("Durum güncellenirken bir hata oluştu");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <p>Yükleniyor...</p>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <ShoppingCart className="h-12 w-12 text-gray-400 mb-3" />
        <h3 className="font-medium text-lg mb-1">Fiyat Raporu Bulunmadı</h3>
        <p className="text-gray-500 mb-4">Şu anda görüntülenecek fiyat raporu bulunmamaktadır.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[500px]">
      <div className="space-y-4 pr-4">
        {reports.map((report) => (
          <Card key={report.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base font-medium">
                    {report.product_name || "İsimsiz Ürün"}
                  </CardTitle>
                  <CardDescription>
                    {report.business_name || "İsimsiz İşletme"}
                  </CardDescription>
                </div>
                {getStatusBadge(report.status)}
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Bildirilen Fiyat:</span>
                  <span className="font-medium">{report.paid_price} TL</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Normal Fiyat:</span>
                  <span className="font-medium">{report.normal_price} TL</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(report.created_at)}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs h-8"
                    onClick={() => onOpenResponseDialog(report.id, 'report')}
                  >
                    <ReplyAll className="h-3 w-3 mr-1" />
                    Yanıtla
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs h-8"
                    onClick={() => onAssignReport(report.id)}
                  >
                    <Share2 className="h-3 w-3 mr-1" />
                    Görevlendir
                  </Button>
                  <Button 
                    size="sm" 
                    variant={report.status === 'resolved' ? "success" : "outline"} 
                    className="text-xs h-8"
                    onClick={() => handleStatusChange(report.id, 'resolved')}
                    disabled={report.status === 'resolved'}
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Çözüldü
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default PriceReportsList;
