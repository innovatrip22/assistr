
import { supabase } from "@/integrations/supabase/client";

// Define the isTestUser helper function
const isTestUser = (userId: string) => {
  return userId === 'test-user';
};

// Mock data for test users
const getMockReports = () => [
  {
    id: '1',
    type: 'price',
    business_name: 'Sahil Restoran',
    product_name: 'Su',
    paid_price: 50,
    normal_price: 10,
    location: 'Konyaaltı',
    description: 'Fahiş fiyatlı su satışı',
    status: 'processed',
    timestamp: new Date().toISOString(),
    user_id: 'test-user',
    response: 'Bildirimi aldık. İlgili işletmeye ceza kesilmiştir.',
    response_timestamp: new Date().toISOString()
  },
  {
    id: '2',
    type: 'fraud',
    location: 'Kaleiçi',
    description: 'Sahte bilet satışı yapılıyor',
    status: 'pending',
    timestamp: new Date().toISOString(),
    user_id: 'test-user'
  }
];

// Report methods
export const addReport = async (report: {
  type: 'price' | 'fraud' | 'emergency';
  location?: string;
  business_name?: string;
  product_name?: string;
  paid_price?: number;
  normal_price?: number;
  description: string;
  user_id: string;
}) => {
  // For test users, return mock data
  if (isTestUser(report.user_id)) {
    const mockReports = getMockReports();
    const newReport = {
      id: `${mockReports.length + 1}`,
      ...report,
      status: 'pending',
      timestamp: new Date().toISOString()
    };
    
    // Return the new mock report
    return newReport;
  }
  
  // Add a title field for the reports table
  const reportData = {
    ...report,
    title: report.type === 'price' 
      ? `Fahiş fiyat: ${report.business_name || 'Bilinmeyen işletme'}`
      : report.type === 'fraud'
      ? 'Dolandırıcılık bildirimi'
      : 'Acil durum bildirimi'
  };
  
  const { data, error } = await supabase
    .from('reports')
    .insert([reportData])
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const getReports = async (userId?: string) => {
  // For test users, return mock data
  if (userId && isTestUser(userId)) {
    return getMockReports();
  }
  
  let query = supabase
    .from('reports')
    .select('*')
    .order('timestamp', { ascending: false });
    
  if (userId) {
    query = query.eq('user_id', userId);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
};

export const updateReportStatus = async (id: string, status: 'pending' | 'processed') => {
  const { data, error } = await supabase
    .from('reports')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const addReportResponse = async (id: string, response: string) => {
  const { data, error } = await supabase
    .from('reports')
    .update({
      response,
      response_timestamp: new Date().toISOString(),
      status: 'processed'
    })
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  
  // Bildirim oluştur
  const report = data;
  if (report?.user_id) {
    await supabase
      .from('notifications')
      .insert({
        user_id: report.user_id,
        related_to: 'report',
        related_id: id
      });
  }
  
  return data;
};

// Method to get reports for specific business
export const getReportsForBusiness = async (businessName: string) => {
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .eq('business_name', businessName);
    
  if (error) throw error;
  return data || [];
};

// For compatibility with old code
export const submitReports = addReport;
