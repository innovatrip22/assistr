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

// Feedback methods
export const addFeedback = async (feedback: {
  type: 'chat' | 'complaint';
  message: string;
  institution?: string;
  subject?: string;
  user_id: string;
}) => {
  const { data, error } = await supabase
    .from('feedbacks')
    .insert([feedback])
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const getFeedbacks = async (userId?: string) => {
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
  const { data, error } = await supabase
    .from('reports')
    .insert([report])
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const getReports = async (userId?: string) => {
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
    
    return response.data.generatedText;
  } catch (error) {
    console.error('AI chat error:', error);
    throw error;
  }
};

export const saveChatHistory = async (userId: string, message: string, response: string) => {
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
  const { data, error } = await supabase
    .from('chat_history')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data || [];
};
