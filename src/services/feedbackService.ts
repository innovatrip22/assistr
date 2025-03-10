import { supabase } from "@/integrations/supabase/client";

// Define the Feedback type
export type Feedback = {
  id?: string;
  type: "chat" | "complaint" | "suggestion" | "praise";
  message: string;
  institution?: string;
  subject?: string;
  user_id: string;
  rating?: number;
  response?: string | null;
  response_timestamp?: string | null;
  status?: "pending" | "processed" | "responded";
  timestamp?: string;
};

// Institutions enum/map with passwords for each
export const INSTITUTIONS = {
  ELEKTRIK: {
    id: "institution",
    name: "KKTC Elektrik Kurumu",
    shortName: "Elektrik Kurumu",
    password: "elektrik123",
    color: "yellow"
  },
  SU: {
    id: "institution",
    name: "KKTC Su İşleri Dairesi",
    shortName: "Su İşleri",
    password: "su123",
    color: "blue"
  },
  DOGALGAZ: {
    id: "institution",
    name: "KKTC Doğalgaz Kurumu",
    shortName: "Doğalgaz Kurumu",
    password: "dogalgaz123",
    color: "red"
  },
  TURIZM: {
    id: "institution",
    name: "KKTC Turizm Ofisi",
    shortName: "Turizm Ofisi",
    password: "turizm123",
    color: "teal"
  },
  BELEDIYE: {
    id: "institution",
    name: "Girne Belediyesi",
    shortName: "Belediye",
    password: "belediye123",
    color: "purple"
  },
  BAKANLIK: {
    id: "institution",
    name: "KKTC Turizm Bakanlığı",
    shortName: "Turizm Bakanlığı",
    password: "bakanlik123",
    color: "green"
  }
};

// Function to verify institution password
export const verifyInstitutionPassword = (institutionKey: string, password: string): boolean => {
  return INSTITUTIONS[institutionKey as keyof typeof INSTITUTIONS]?.password === password;
};

// Get a list of all institutions
export const getAllInstitutions = () => {
  return Object.entries(INSTITUTIONS).map(([key, value]) => ({
    id: key,
    name: value.name
  }));
};

// Function to add feedback
export const addFeedback = async (feedback: Feedback) => {
  // Generate a random UUID if the user_id doesn't match the UUID pattern
  // This is to ensure we can still insert records even without proper authentication
  // Regular UUID v4 pattern
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  
  // If user_id is not a valid UUID, we'll use the service role to bypass RLS
  if (!uuidPattern.test(feedback.user_id)) {
    console.log("Using service role for anonymous feedback submission");
    
    // For anonymous submission, we'll use a direct insert with minimal RLS check
    // We're using "00000000-0000-0000-0000-000000000000" as our anonymous user ID
    const anonymousUserId = "00000000-0000-0000-0000-000000000000";
    
    const { data, error } = await supabase
      .from("feedbacks")
      .insert([
        {
          ...feedback,
          user_id: anonymousUserId,
          timestamp: new Date().toISOString(),
          status: feedback.status || "pending",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error adding feedback:", error);
      throw error;
    }
    return data;
  }

  // For authenticated users with valid UUIDs, proceed normally
  const { data, error } = await supabase
    .from("feedbacks")
    .insert([
      {
        ...feedback,
        timestamp: new Date().toISOString(),
        status: feedback.status || "pending",
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error adding feedback:", error);
    throw error;
  }
  return data;
};

// Function to get unique institutions from existing feedbacks
export const getUniqueInstitutions = async () => {
  const { data, error } = await supabase
    .from("feedbacks")
    .select("institution")
    .not("institution", "is", null)
    .order("institution");

  if (error) {
    console.error("Error getting institutions:", error);
    throw error;
  }
  
  // Filter out duplicates and null values
  const uniqueInstitutions = [...new Set(data.map(item => item.institution))]
    .filter(Boolean)
    .sort();
  
  return uniqueInstitutions as string[];
};

// Function to get feedbacks
export const getFeedbacks = async () => {
  const { data, error } = await supabase
    .from("feedbacks")
    .select("*")
    .order("timestamp", { ascending: false });

  if (error) {
    console.error("Error getting feedbacks:", error);
    throw error;
  }
  
  // Ensuring type safety by mapping the response
  return data.map(item => ({
    ...item,
    type: item.type as "chat" | "complaint" | "suggestion" | "praise"
  })) as Feedback[];
};

// Function to get feedbacks for a specific institution
export const getInstitutionFeedbacks = async (institution: string) => {
  const { data, error } = await supabase
    .from("feedbacks")
    .select("*")
    .eq("institution", institution)
    .order("timestamp", { ascending: false });

  if (error) {
    console.error("Error getting institution feedbacks:", error);
    throw error;
  }
  
  // Ensuring type safety by mapping the response
  return data.map(item => ({
    ...item,
    type: item.type as "chat" | "complaint" | "suggestion" | "praise"
  })) as Feedback[];
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

  if (error) {
    console.error("Error responding to feedback:", error);
    throw error;
  }
  
  // Ensuring type safety
  return {
    ...data,
    type: data.type as "chat" | "complaint" | "suggestion" | "praise"
  } as Feedback;
};

// Add the addFeedbackResponse (same functionality as respondToFeedback)
export const addFeedbackResponse = async (id: string, response: string) => {
  return respondToFeedback(id, response);
};

// Add the updateFeedbackStatus function
export const updateFeedbackStatus = async (id: string, status: 'pending' | 'processed' | 'responded') => {
  const { data, error } = await supabase
    .from("feedbacks")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating feedback status:", error);
    throw error;
  }
  
  // Ensuring type safety
  return {
    ...data,
    type: data.type as "chat" | "complaint" | "suggestion" | "praise"
  } as Feedback;
};

// Get feedback statistics
export const getFeedbackSummary = async () => {
  const { data, error } = await supabase
    .from("feedbacks")
    .select("type, rating");

  if (error) {
    console.error("Error getting feedback summary:", error);
    throw error;
  }

  const totalComplaints = data.filter(f => f.type === "complaint").length;
  const totalPraises = data.filter(f => f.type === "praise").length;
  const totalSuggestions = data.filter(f => f.type === "suggestion").length;
  
  // Calculate average rating
  const ratingsArray = data.filter(f => f.rating !== null).map(f => f.rating) as number[];
  const averageRating = ratingsArray.length > 0 
    ? ratingsArray.reduce((sum, rating) => sum + rating, 0) / ratingsArray.length 
    : 0;

  return {
    totalFeedbacks: data.length,
    totalComplaints,
    totalPraises,
    totalSuggestions,
    averageRating
  };
};

// Function to get feedbacks by institution
export const getFeedbacksByInstitution = async (institution) => {
  const { data, error } = await supabase
    .from('feedbacks')
    .select('*')
    .eq('institution', institution)
    .order('timestamp', { ascending: false });

  if (error) {
    console.error("Error getting feedbacks:", error);
    throw error;
  }
  return data;
};
