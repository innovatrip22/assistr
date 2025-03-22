
import { supabase } from "@/integrations/supabase/client";
import { isTestUser } from "./testUtils";

// Mock data for test users
const mockTouristStats = {
  activeVisitors: 12450,
  hotelOccupancy: 78,
  averageRating: 4.4,
  previousMonth: {
    visitors: 10890,
    occupancy: 65,
    rating: 4.2
  },
  yearlyVisitors: 857230,
  yearlyGrowth: 12,
  tourismRevenue: 204,
  revenueTarget: 230,
  registeredBusinesses: 1245,
  newRegistrations: 142,
  popularDestinations: [
    { name: "Girne Limanı", visitors: 3240 },
    { name: "Bellapais Manastırı", visitors: 2150 },
    { name: "Salamis Harabeleri", visitors: 1890 },
    { name: "Kantara Kalesi", visitors: 1560 },
    { name: "Büyük Han", visitors: 1340 }
  ],
  visitorsByCountry: [
    { country: "Türkiye", percentage: 45 },
    { country: "İngiltere", percentage: 15 },
    { country: "Almanya", percentage: 10 },
    { country: "Rusya", percentage: 8 },
    { country: "Diğer", percentage: 22 }
  ]
};

// Get tourism statistics
export const getTouristStats = async (userId?: string) => {
  if (!userId || isTestUser(userId)) {
    return mockTouristStats;
  }
  
  // For real implementation, we would query from Supabase
  // Since the required tables don't exist yet, we'll return mock data for now
  return mockTouristStats;
};

// Get hotel occupancy data
export const getHotelOccupancy = async (period: "daily" | "weekly" | "monthly" = "monthly", userId?: string) => {
  if (!userId || isTestUser(userId)) {
    // Mock data based on requested period
    return {
      labels: period === "daily" 
        ? ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"]
        : period === "weekly"
        ? ["Hafta 1", "Hafta 2", "Hafta 3", "Hafta 4"]
        : ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran"],
      data: period === "daily" 
        ? [68, 72, 75, 82, 87, 95, 92]
        : period === "weekly"
        ? [70, 65, 78, 85]
        : [45, 52, 60, 68, 75, 82]
    };
  }
  
  // For real implementation, we would query from Supabase
  // Since the required tables don't exist yet, we'll return mock data
  return {
    labels: period === "daily" 
      ? ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"]
      : period === "weekly"
      ? ["Hafta 1", "Hafta 2", "Hafta 3", "Hafta 4"]
      : ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran"],
    data: period === "daily" 
      ? [68, 72, 75, 82, 87, 95, 92]
      : period === "weekly"
      ? [70, 65, 78, 85]
      : [45, 52, 60, 68, 75, 82]
  };
};

// Get visitor statistics
export const getVisitorStats = async (period: "weekly" | "monthly" | "yearly" = "monthly", userId?: string) => {
  if (!userId || isTestUser(userId)) {
    // Mock data based on requested period
    return {
      labels: period === "weekly" 
        ? ["Hafta 1", "Hafta 2", "Hafta 3", "Hafta 4"]
        : period === "monthly"
        ? ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran"]
        : ["2018", "2019", "2020", "2021", "2022", "2023"],
      data: period === "weekly" 
        ? [1250, 980, 1340, 1520]
        : period === "monthly"
        ? [7500, 8200, 10500, 12000, 14500, 15800]
        : [450000, 520000, 380000, 510000, 780000, 857230]
    };
  }
  
  // For real implementation, we would query from Supabase
  // Since the required tables don't exist yet, we'll return mock data
  return {
    labels: period === "weekly" 
      ? ["Hafta 1", "Hafta 2", "Hafta 3", "Hafta 4"]
      : period === "monthly"
      ? ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran"]
      : ["2018", "2019", "2020", "2021", "2022", "2023"],
    data: period === "weekly" 
      ? [1250, 980, 1340, 1520]
      : period === "monthly"
      ? [7500, 8200, 10500, 12000, 14500, 15800]
      : [450000, 520000, 380000, 510000, 780000, 857230]
  };
};
