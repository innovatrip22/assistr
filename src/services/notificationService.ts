
import { supabase } from "@/integrations/supabase/client";
import { getFeedbacks } from "./feedbackService";
import { getReports } from "./reportService";

// Define the isTestUser helper function
const isTestUser = (userId: string) => {
  return userId === 'test-user';
};

// Helper method to check if user has notifications
export const getUserNotifications = async (userId: string, userType?: string) => {
  // For test users, return mock data based on user type
  if (isTestUser(userId)) {
    const allFeedbacks = await getFeedbacks();
    const allReports = await getReports();
    
    // Filter notifications based on user type
    let feedbackNotifications = [];
    let reportNotifications = [];
    
    if (userType === 'tourist') {
      // Tourists see responses to their own feedbacks/reports
      feedbackNotifications = allFeedbacks.filter(fb => fb.response);
      reportNotifications = allReports.filter(rp => rp.response);
    } else if (userType === 'institution') {
      // Institutions see pending feedbacks and reports
      feedbackNotifications = allFeedbacks.filter(fb => fb.status === 'pending');
      reportNotifications = allReports.filter(rp => rp.status === 'pending');
    } else if (userType === 'business') {
      // Businesses see reports and feedbacks related to them
      // Use institution field instead of businessId for feedbacks
      feedbackNotifications = allFeedbacks.filter(fb => fb.institution === userId || fb.institution === 'business');
      // Use business_name field instead of businessId for reports
      reportNotifications = allReports.filter(rp => rp.business_name === userId);
    }
    
    return {
      feedbackNotifications,
      reportNotifications,
      total: feedbackNotifications.length + reportNotifications.length
    };
  }
  
  // For real users, use the database
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
