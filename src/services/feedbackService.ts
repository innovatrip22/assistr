
import { supabase } from "@/integrations/supabase/client";

// Define the isTestUser helper function
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
