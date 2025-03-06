
import { supabase } from "@/integrations/supabase/client";

// Mock tourist data stats for KKTC
export const getTouristDataStats = async () => {
  // In a real application, this would fetch data from an API
  return {
    totalVisits: 125000,
    averageSpending: 950,
    mostPopularPlace: "Girne Limanı",
    total_tourists: 1800000,
    percentage_change: 12,
    average_spending: 950,
    spending_percentage_change: 6
  };
};

// Get feedback statistics
export const getFeedbackStats = async () => {
  try {
    const { data, error } = await supabase
      .from("feedbacks")
      .select("type, rating")
      .order("timestamp", { ascending: false });
    
    if (error) throw error;
    
    // Calculate statistics
    const totalFeedbacks = data?.length || 0;
    const complaints = data?.filter(f => f.type === "complaint").length || 0;
    const suggestions = data?.filter(f => f.type === "suggestion").length || 0;
    const praises = data?.filter(f => f.type === "praise").length || 0;
    const chatMessages = data?.filter(f => f.type === "chat").length || 0;
    
    // Calculate average rating
    const ratings = data?.filter(f => f.rating).map(f => f.rating) || [];
    const averageRating = ratings.length > 0 
      ? ratings.reduce((acc, val) => acc + val, 0) / ratings.length 
      : 0;
    
    return {
      totalFeedbacks,
      complaints,
      suggestions,
      praises,
      chatMessages,
      averageRating: parseFloat(averageRating.toFixed(1))
    };
  } catch (error) {
    console.error("Error fetching feedback stats:", error);
    return {
      totalFeedbacks: 0,
      complaints: 0,
      suggestions: 0,
      praises: 0,
      chatMessages: 0,
      averageRating: 0
    };
  }
};
