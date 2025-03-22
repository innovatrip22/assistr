
import { supabase } from "@/integrations/supabase/client";

// Define the Report type
export type Report = {
  id?: string;
  type: "price" | "fraud" | "emergency";
  title?: string;
  description: string;
  location?: string;
  business_name?: string;
  product_name?: string;
  normal_price?: number;
  paid_price?: number;
  user_id: string;
  status?: "pending" | "processed" | "responded";
  timestamp?: string;
  response?: string | null;
  response_timestamp?: string | null;
  has_audio?: boolean;
  has_photo?: boolean;
};

// Function to add report response
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

  if (error) {
    console.error("Error adding report response:", error);
    throw error;
  }
  return data;
};

// Function to submit reports
export const submitReports = async (type: string, data: any) => {
  const reportData = {
    ...data,
    type,
    user_id: data.user_id || "anonymous", // In a real app, this would be the user's ID
    timestamp: new Date().toISOString(),
    status: "pending",
    title: type === "price" ? `${data.business_name} - ${data.product_name}` : 
           type === "fraud" ? `Dolandırıcılık Bildirimi - ${data.location}` :
           `Acil Durum - ${data.location}`,
  };

  const { error } = await supabase
    .from("reports")
    .insert([reportData]);

  if (error) {
    console.error("Error submitting report:", error);
    throw error;
  }
  return true;
};

// Function to get reports
export const getReports = async () => {
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .order("timestamp", { ascending: false });

  if (error) {
    console.error("Error getting reports:", error);
    throw error;
  }
  return data;
};

// Function to get price reports
export const getPriceReports = async () => {
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("type", "price")
    .order("timestamp", { ascending: false });

  if (error) {
    console.error("Error getting price reports:", error);
    throw error;
  }
  return data;
};

// Function to get fraud reports
export const getFraudReports = async () => {
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("type", "fraud")
    .order("timestamp", { ascending: false });

  if (error) {
    console.error("Error getting fraud reports:", error);
    throw error;
  }
  return data;
};

// Function to get emergency reports
export const getEmergencyReports = async () => {
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("type", "emergency")
    .order("timestamp", { ascending: false });

  if (error) {
    console.error("Error getting emergency reports:", error);
    throw error;
  }
  return data;
};

// Function to update report status
export const updateReportStatus = async (id: string, status: 'pending' | 'processed' | 'responded') => {
  const { data, error } = await supabase
    .from("reports")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating report status:", error);
    throw error;
  }
  return data;
};

// Function to add a new report
export const addReport = async (reportData: any) => {
  const { error } = await supabase.from("reports").insert([
    {
      ...reportData,
      timestamp: new Date().toISOString(),
      status: reportData.status || "pending",
    },
  ]);

  if (error) {
    console.error("Error adding report:", error);
    throw error;
  }
  return true;
};

// Get report statistics
export const getReportSummary = async () => {
  const { data, error } = await supabase
    .from("reports")
    .select("type, status");

  if (error) {
    console.error("Error getting report summary:", error);
    throw error;
  }

  const totalPriceReports = data.filter(r => r.type === "price").length;
  const totalFraudReports = data.filter(r => r.type === "fraud").length;
  const totalEmergencyReports = data.filter(r => r.type === "emergency").length;
  const pendingReports = data.filter(r => r.status === "pending").length;

  return {
    totalReports: data.length,
    totalPriceReports,
    totalFraudReports,
    totalEmergencyReports,
    pendingReports
  };
};
