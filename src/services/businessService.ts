
import { supabase } from "@/integrations/supabase/client";

// Define the Business type
export type Business = {
  id: string;
  name: string;
  type: 'restaurant' | 'hotel' | 'shop' | 'entertainment' | 'other';
  address: string;
  status: 'verified' | 'unverified' | 'flagged';
  owner_id: string;
  created_at: string;
  description: string;
  location: string;
  // Additional fields used in the UI
  priceReports?: number;
  fraudReports?: number;
  registrationDate?: string;
  // Cyprus-specific fields
  region?: string;
  isHistorical?: boolean;
  establishedYear?: number; 
  servesTraditionalFood?: boolean;
  hasLocalArtisans?: boolean;
  servesMezze?: boolean;
  servesSeafood?: boolean;
  hasOutdoorSeating?: boolean;
  servesLocalWine?: boolean;
  hasLiveMusic?: boolean;
  specialties?: string[];
}

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
    owner_id: business.owner_id || '',
    created_at: business.created_at || new Date().toISOString(),
    description: business.description || '',
    location: business.address || '',
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

// Ensure these functions are properly implemented
export const getBusinessDetails = async (): Promise<Business> => {
  // Mocked data for demonstration - now with Cyprus-specific details
  return {
    id: "1",
    name: "Kıbrıs Lezzetleri",
    type: "restaurant",
    address: "Girne Caddesi No:42, Lefkoşa",
    status: "verified",
    owner_id: "user-123",
    created_at: new Date().toISOString(),
    description: "Geleneksel Kıbrıs mutfağının en lezzetli örneklerini sunan restoranımız, taze ve yerel malzemelerle hazırlanan özgün tariflerimizle hizmetinizdedir.",
    location: "Lefkoşa, KKTC",
    priceReports: 2,
    fraudReports: 0,
    region: "Lefkoşa",
    isHistorical: true,
    establishedYear: 1985,
    servesTraditionalFood: true,
    hasLocalArtisans: true,
    servesMezze: true,
    servesSeafood: true,
    hasOutdoorSeating: true,
    servesLocalWine: true,
    hasLiveMusic: true,
    specialties: ["Şeftali Kebabı", "Hellim", "Molehiya", "Macun Tatlısı", "Zivaniya"]
  };
};

export const updateBusinessDetails = async (business: Business): Promise<Business> => {
  // In a real app, this would update the business in the database
  console.log("Business updated:", business);
  return business;
};

export const getBusiness = async (): Promise<Business | null> => {
  return getBusinessDetails();
};

export const addBusiness = async (business: {
  name: string;
  type: 'restaurant' | 'hotel' | 'shop' | 'entertainment' | 'other';
  address: string;
  user_id: string;
}) => {
  // Convert user_id to owner_id for the database
  const { user_id, ...rest } = business;
  const businessData = {
    ...rest,
    owner_id: user_id,
    status: 'unverified' as const
  };

  const { data, error } = await supabase
    .from('businesses')
    .insert([businessData])
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
