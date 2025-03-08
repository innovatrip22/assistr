import { useState, useEffect } from "react";
import { Siren, Calendar, Clock, CheckCircle, ReplyAll, Share2 } from "lucide-react";
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

interface EmergencyReportsListProps {
  onOpenResponseDialog: (id: string, type: 'report') => void;
  onAssignReport: (id: string) => void;
  loadData: () => void;
  limit?: number;
}

const EmergencyReportsList = ({ onOpenResponseDialog, onAssignReport, loadData, limit }: EmergencyReportsListProps) => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const data = await getReports();
      const filteredReports = data.filter(report => report.type === 'emergency');
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
          <Siren className="w-6 h-6 text-red-600" />
          <CardTitle>Acil Durum Bildirimleri</CardTitle>
        </div>
        <CardDescription>
          Acil müdahale gerektiren turist bildirimleri
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
                      ? 'border-red-400 bg-red-50' 
                      : report.status === 'processed'
                        ? 'border-blue-300 bg-blue-50'
                        : 'border-green-300 bg-green-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{report.title}</h3>
                      <p className="text-sm text-gray-600">{report.location || 'Konum belirtilmemiş'}</p>
                    </div>
                    <Badge variant={
                      report.status === 'pending' 
                        ? 'destructive' 
                        : report.status === 'processed'
                          ? 'secondary'
                          : 'default'
                    }>
                      {report.status === 'pending' 
                        ? 'Acil' 
                        : report.status === 'processed'
                          ? 'Müdahale Edildi'
                          : 'Çözüldü'
                      }
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                  
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
                            Müdahale Edildi
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
              <Siren className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Henüz acil durum bildirimi bulunmuyor</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default EmergencyReportsList;
