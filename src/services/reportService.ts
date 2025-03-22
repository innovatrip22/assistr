
import { delay } from "./testUtils";

// Simulates sending a response to a report
export const sendReportResponse = async (reportId: string, response: string): Promise<void> => {
  // Simulate API delay
  await delay(800);
  
  console.log(`Sending response to report ${reportId}: ${response}`);
  // In a real app, this would make an API call to update the report
  return Promise.resolve();
};

// Simulates assigning a report to a department
export const assignReport = async (reportId: string, departmentId: string): Promise<void> => {
  // Simulate API delay
  await delay(800);
  
  console.log(`Assigning report ${reportId} to department ${departmentId}`);
  // In a real app, this would make an API call to assign the report
  return Promise.resolve();
};

// Gets a list of available reports
export const getReports = async (): Promise<any[]> => {
  // Simulate API delay
  await delay(800);
  
  // Mock data for testing
  return [
    {
      id: "rep-1",
      type: "emergency",
      title: "Acil Tıbbi Yardım Gerekli",
      description: "Girne sahilinde yaşlı bir turist denizde boğulma tehlikesi geçirdi. Hızlı müdahale gerekiyor.",
      location: "Girne Sahili",
      status: "pending",
      timestamp: new Date().toISOString(),
    },
    {
      id: "rep-2",
      type: "emergency",
      title: "Kaza Bildirimi",
      description: "Lefkoşa-Girne anayolunda turistlerin bulunduğu araç kaza yaptı. Yaralılar var.",
      location: "Lefkoşa-Girne Anayolu",
      status: "processed",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      response: "Ambulans ve trafik ekipleri olay yerine yönlendirildi.",
      response_timestamp: new Date(Date.now() - 3000000).toISOString(),
    },
    {
      id: "rep-3",
      type: "price",
      business_name: "Sahil Restaurant",
      description: "Menüde yazan fiyatların iki katı ücret talep edildi. İngilizce menüde fiyatlar farklı.",
      location: "Gazimağusa",
      status: "pending",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "rep-4",
      type: "price",
      business_name: "Blue Diamond Hotel",
      description: "Rezervasyon sırasında belirtilen fiyattan daha yüksek ücret talep edildi. Ekstra hizmet bedeli olarak açıklandı.",
      location: "Girne",
      status: "responded",
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      response: "Şikayetiniz ilgili birimlerimize iletilmiştir. Otel yetkilileri ile görüşülüp gerekli uyarılar yapılacaktır.",
      response_timestamp: new Date(Date.now() - 100000000).toISOString(),
    },
    {
      id: "rep-5",
      type: "fraud",
      business_name: "Sahte Tur Operatörü",
      description: "Bize tur satarak para alan kişi ortadan kayboldu. Hiçbir tur hizmeti alamadık.",
      location: "Lefkoşa",
      status: "pending",
      timestamp: new Date(Date.now() - 259200000).toISOString(),
    }
  ];
};

// Updates the status of a report
export const updateReportStatus = async (reportId: string, status: 'pending' | 'processed' | 'responded'): Promise<void> => {
  // Simulate API delay
  await delay(800);
  
  console.log(`Updating report ${reportId} to status ${status}`);
  // In a real app, this would make an API call to update the report status
  return Promise.resolve();
};
