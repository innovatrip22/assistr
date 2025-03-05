
import { supabase } from "@/integrations/supabase/client";

// Define the Feedback type
export type Feedback = {
  id?: string;
  type: "chat" | "complaint";
  message: string;
  institution?: string;
  subject?: string;
  user_id: string;
  rating?: number;
};

// Function to add feedback
export const addFeedback = async (feedback: Feedback) => {
  const { data, error } = await supabase
    .from("feedbacks")
    .insert([
      {
        ...feedback,
        timestamp: new Date().toISOString(),
        status: "pending",
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Function to get feedbacks
export const getFeedbacks = async () => {
  const { data, error } = await supabase
    .from("feedbacks")
    .select("*")
    .order("timestamp", { ascending: false });

  if (error) throw error;
  return data;
};

// Function to respond to feedback
export const respondToFeedback = async (
  id: string,
  response: string
) => {
  const { data, error } = await supabase
    .from("feedbacks")
    .update({
      response,
      response_timestamp: new Date().toISOString(),
      status: "responded",
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Add the missing function addFeedbackResponse (same functionality as respondToFeedback)
export const addFeedbackResponse = async (id: string, response: string) => {
  return respondToFeedback(id, response);
};

// Add the missing updateFeedbackStatus function
export const updateFeedbackStatus = async (id: string, status: 'pending' | 'processed') => {
  const { data, error } = await supabase
    .from("feedbacks")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};
