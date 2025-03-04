
import { useState } from "react";
import { Ban, Calendar, CheckCircle, Clock, ReplyAll } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { 
  getReports, 
  updateReportStatus 
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

interface PriceReportsListProps {
  onOpenResponseDialog: (id: string, type: 'report') => void;
  loadData: () => void;
}

const PriceReportsList = ({ onOpenResponseDialog, loadData }: PriceReportsListProps) => {
  const reports = getReports().filter(report => report.type === 'price');

  const handleUpdateReportStatus = (id: string, status: 'pending' | 'processed') => {
    updateReportStatus(id, status);
    loadData();
  };

  return (
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
          {reports.length > 0 ? (
            <div className="space-y-4">
              {reports.map((report, index) => (
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
                          onClick={() => onOpenResponseDialog(report.id, 'report')}
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
  );
};

export default PriceReportsList;
