
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

// Define the Business type
export type Business = {
  id: string;
  name: string;
  type: 'restaurant' | 'hotel' | 'shop' | 'entertainment' | 'other';
  address: string;
  status: 'verified' | 'unverified' | 'flagged';
  user_id: string;
  created_at: string;
  // Additional fields used in the UI
  priceReports?: number;
  fraudReports?: number;
  registrationDate?: string;
}

// Function to check if user is a test user
const isTestUser = (userId: string) => {
  return userId === 'test-user';
};

// Mock data for test users
const getMockFeedbacks = () => [
  {
    id: '1',
    type: 'complaint',
    message: 'Hizmet çok yavaştı',
    institution: 'Turizm Ofisi',
    subject: 'Kötü hizmet',
    status: 'processed',
    timestamp: new Date().toISOString(),
    user_id: 'test-user',
    response: 'Şikayetiniz için teşekkür ederiz. Hizmet kalitemizi artırmak için çalışıyoruz.',
    response_timestamp: new Date().toISOString()
  },
  {
    id: '2',
    type: 'complaint',
    message: 'Plaj çok kalabalıktı',
    institution: 'Belediye',
    subject: 'Plaj düzeni',
    status: 'pending',
    timestamp: new Date().toISOString(),
    user_id: 'test-user'
  }
];

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

// Feedback methods
export const addFeedback = async (feedback: {
  type: 'chat' | 'complaint';
  message: string;
  institution?: string;
  subject?: string;
  user_id: string;
}) => {
  // For test users, return mock data
  if (isTestUser(feedback.user_id)) {
    const mockFeedbacks = getMockFeedbacks();
    const newFeedback = {
      id: `${mockFeedbacks.length + 1}`,
      ...feedback,
      status: 'pending',
      timestamp: new Date().toISOString()
    };
    
    // Return the new mock feedback
    return newFeedback;
  }
  
  const { data, error } = await supabase
    .from('feedbacks')
    .insert([feedback])
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const getFeedbacks = async (userId?: string) => {
  // For test users, return mock data
  if (userId && isTestUser(userId)) {
    return getMockFeedbacks();
  }
  
  let query = supabase
    .from('feedbacks')
    .select('*')
    .order('timestamp', { ascending: false });
    
  if (userId) {
    query = query.eq('user_id', userId);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
};

export const updateFeedbackStatus = async (id: string, status: 'pending' | 'processed') => {
  const { data, error } = await supabase
    .from('feedbacks')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const addFeedbackResponse = async (id: string, response: string) => {
  const { data, error } = await supabase
    .from('feedbacks')
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
  const feedback = data;
  if (feedback?.user_id) {
    await supabase
      .from('notifications')
      .insert({
        user_id: feedback.user_id,
        related_to: 'feedback',
        related_id: id
      });
  }
  
  return data;
};

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
  
  const { data, error } = await supabase
    .from('reports')
    .insert([report])
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

// Helper method to check if user has notifications
export const getUserNotifications = async (userId: string) => {
  // For test users, return mock data
  if (isTestUser(userId)) {
    const feedbackNotifications = getMockFeedbacks().filter(fb => fb.response);
    const reportNotifications = getMockReports().filter(rp => rp.response);
    
    return {
      feedbackNotifications,
      reportNotifications,
      total: feedbackNotifications.length + reportNotifications.length
    };
  }
  
  const { data: notifications, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .eq('is_read', false);
    
  if (error) throw error;
  
  const feedbackIds = notifications
    ?.filter(n => n.related_to === 'feedback')
    .map(n => n.related_id) || [];
    
  const reportIds = notifications
    ?.filter(n => n.related_to === 'report')
    .map(n => n.related_id) || [];
    
  // Handle empty arrays for the in operator
  const { data: feedbackNotifications, error: feedbackError } = feedbackIds.length 
    ? await supabase
        .from('feedbacks')
        .select('*')
        .in('id', feedbackIds)
    : { data: [], error: null };
    
  if (feedbackError) throw feedbackError;
  
  // Handle empty arrays for the in operator
  const { data: reportNotifications, error: reportError } = reportIds.length 
    ? await supabase
        .from('reports')
        .select('*')
        .in('id', reportIds)
    : { data: [], error: null };
    
  if (reportError) throw reportError;
  
  return {
    feedbackNotifications: feedbackNotifications || [],
    reportNotifications: reportNotifications || [],
    total: (feedbackNotifications?.length || 0) + (reportNotifications?.length || 0)
  };
};

// Business methods
export const getBusinesses = async (): Promise<Business[]> => {
  const { data, error } = await supabase
    .from('businesses')
    .select('*');
    
  if (error) throw error;
  
  // For demo purposes, add some fake metrics to each business
  const businessesWithMetrics = (data || []).map(business => ({
    ...business,
    // Cast the type field to ensure it matches the Business type
    type: business.type as 'restaurant' | 'hotel' | 'shop' | 'entertainment' | 'other',
    // Cast the status field to ensure it matches the Business type
    status: (business.status || 'unverified') as 'verified' | 'unverified' | 'flagged',
    // Handle potential null values
    user_id: business.user_id || '',
    created_at: business.created_at || new Date().toISOString(),
    // Add UI specific fields
    priceReports: Math.floor(Math.random() * 5),
    fraudReports: Math.floor(Math.random() * 3),
    registrationDate: business.created_at || new Date().toISOString()
  }));
  
  return businessesWithMetrics as Business[];
};

export const getBusinessById = async (id: string) => {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows returned"
  return data;
};

export const addBusiness = async (business: {
  name: string;
  type: 'restaurant' | 'hotel' | 'shop' | 'entertainment' | 'other';
  address: string;
  user_id: string;
}) => {
  const { data, error } = await supabase
    .from('businesses')
    .insert([business])
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const updateBusinessStatus = async (id: string, status: 'verified' | 'unverified' | 'flagged') => {
  const { data, error } = await supabase
    .from('businesses')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
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

// Chat methods
export const sendMessageToAI = async (message: string, userType: string) => {
  try {
    const response = await supabase.functions.invoke('chat-ai', {
      body: { message, userType },
    });
    
    // Add error handling if response or response.data is undefined
    if (!response || !response.data) {
      console.error('Invalid response from chat-ai function', response);
      return "Üzgünüm, şu anda yanıt veremiyorum. Lütfen daha sonra tekrar deneyin.";
    }
    
    // If there's an error in the response, use the error message
    if (response.data.error) {
      console.error('Error from chat-ai function:', response.data.error);
      return response.data.generatedText || "Üzgünüm, şu anda yanıt veremiyorum. Lütfen daha sonra tekrar deneyin.";
    }
    
    return response.data.generatedText;
  } catch (error) {
    console.error('AI chat error:', error);
    throw error;
  }
};

export const saveChatHistory = async (userId: string, message: string, response: string) => {
  // Skip saving for test users
  if (isTestUser(userId)) {
    return { id: 'test-chat-id' };
  }
  
  const { data, error } = await supabase
    .from('chat_history')
    .insert([
      { user_id: userId, message, response }
    ])
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const getChatHistory = async (userId: string) => {
  // For test users, return empty array
  if (isTestUser(userId)) {
    return [];
  }
  
  const { data, error } = await supabase
    .from('chat_history')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data || [];
};
