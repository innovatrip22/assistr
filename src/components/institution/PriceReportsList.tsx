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

interface PriceReportsListProps {
  onOpenResponseDialog: (id: string, type: 'report') => void;
  onAssignReport: (id: string) => void;
  loadData: () => void;
  limit?: number;
}

const PriceReportsList = ({ onOpenResponseDialog, onAssignReport, loadData, limit }: PriceReportsListProps) => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const data = await getReports();
      const filteredReports = data.filter(report => report.type === 'price');
      const limitedReports = limit ? filteredReports.slice(0, limit) : filteredReports;
      setReports(limitedReports);
    } catch (error) {
      console.error("Error loading reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateReportStatus = async (id: string, status: 'pending' | 'processed' | 'responded') => {
    try {
      await updateReportStatus(id, status);
      loadData();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <ShoppingCart className="w-6 h-6 text-primary" />
          <CardTitle>Fiyat Bildirimleri</CardTitle>
        </div>
        <CardDescription>
          Turistlerin aşırı fiyat şikayetleri
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          {reports.length > 0 ? (
            <div className="space-y-4">
              {reports.map((report, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border ${
                    report.status === 'pending' 
                      ? 'border-amber-300 bg-amber-50' 
                      : report.status === 'processed'
                        ? 'border-blue-300 bg-blue-50'
                        : 'border-green-300 bg-green-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{report.business_name || 'İşletme Belirtilmemiş'}</h3>
                      <p className="text-sm text-gray-600">{report.product_name || 'Ürün belirtilmemiş'}</p>
                    </div>
                    <Badge variant={
                      report.status === 'pending' 
                        ? 'outline' 
                        : report.status === 'processed'
                          ? 'secondary'
                          : 'default'
                    }>
                      {report.status === 'pending' 
                        ? 'Beklemede' 
                        : report.status === 'processed'
                          ? 'İşleniyor'
                          : 'Yanıtlandı'
                      }
                    </Badge>
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex gap-4 mb-1">
                      <div className="text-sm">
                        <span className="text-gray-500">Normal Fiyat:</span> {report.normal_price ? `₺${report.normal_price}` : 'Belirtilmemiş'}
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Ödenen Fiyat:</span> {report.paid_price ? `₺${report.paid_price}` : 'Belirtilmemiş'}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{report.description}</p>
                  </div>
                  
                  {report.response && (
                    <div className="bg-blue-50 p-2 rounded-md mb-3 border border-blue-200">
                      <p className="text-sm font-medium text-blue-800">Yanıtınız:</p>
                      <p className="text-sm text-gray-600">{report.response}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {report.response_timestamp 
                          ? format(new Date(report.response_timestamp), 'dd MMM yyyy HH:mm', {locale: tr})
                          : ''
                        }
                      </p>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {report.timestamp ? format(new Date(report.timestamp), 'dd MMM yyyy', {locale: tr}) : ''}
                      <Clock className="w-3 h-3 ml-2" />
                      {report.timestamp ? format(new Date(report.timestamp), 'HH:mm', {locale: tr}) : ''}
                    </div>
                    <div className="flex gap-2">
                      {!report.response && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onOpenResponseDialog(report.id, 'report')}
                        >
                          <ReplyAll className="w-3 h-3 mr-1" />
                          Yanıtla
                        </Button>
                      )}
                      
                      {report.status === 'pending' && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleUpdateReportStatus(report.id, 'processed')}
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            İşlendi
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => onAssignReport(report.id)}
                          >
                            <Share2 className="w-3 h-3 mr-1" />
                            Birime Ata
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Henüz fiyat şikayeti bulunmuyor</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PriceReportsList;
