
import { supabase } from "@/integrations/supabase/client";

// Define the isTestUser helper function
const isTestUser = (userId: string) => {
  return userId === 'test-user';
};

// Chat methods
export const sendMessageToAI = async (message: string, userType: string, conversationHistory: any[] = []) => {
  try {
    console.log("Sending message to AI with conversation history:", conversationHistory.length, "messages");
    
    const response = await supabase.functions.invoke('chat-ai', {
      body: { 
        message, 
        userType, 
        conversation: conversationHistory 
      },
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
