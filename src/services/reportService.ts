import { supabase } from "@/integrations/supabase/client";

// Export the addReportResponse function if it doesn't exist
export const addReportResponse = async (id: string, response: string) => {
  const { data, error } = await supabase
    .from("reports")
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

// Add any other functions from reportService that may be needed
export const submitReports = async (type: string, data: any) => {
  const { error } = await supabase.from("reports").insert([
    {
      ...data,
      type,
      user_id: "anonymous", // In a real app, this would be the user's ID
      timestamp: new Date().toISOString(),
      status: "pending",
    },
  ]);

  if (error) throw error;
  return true;
};

export const getReports = async () => {
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .order("timestamp", { ascending: false });

  if (error) throw error;
  return data;
};
