
import { supabase } from "@/integrations/supabase/client";
import { getFeedbacks } from "./feedbackService";
import { getReports } from "./reportService";

// Define the isTestUser helper function
const isTestUser = (userId: string) => {
  return userId === 'test-user';
};

// Helper method to check if user has notifications
export const getUserNotifications = async (userId: string) => {
  // For test users, return mock data
  if (isTestUser(userId)) {
    const feedbackNotifications = (await getFeedbacks()).filter(fb => fb.response);
    const reportNotifications = (await getReports()).filter(rp => rp.response);
    
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
