
import { delay } from "./testUtils";

// Institution type definition
export interface Institution {
  id: string;
  name: string;
  type: string;
  workingHours: string;
  website: string;
  phone: string;
  address: string;
  active: boolean;
  verified: boolean;
  popular: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

// Mock institution data
const MOCK_INSTITUTION: Institution = {
  id: "inst-1",
  name: "KKTC Turizm Bakanlığı",
  type: "Devlet Kurumu",
  workingHours: "9:00 - 17:00",
  website: "https://turizm.gov.ct.tr",
  phone: "+90 392 123 4567",
  address: "Lefkoşa, KKTC",
  active: true,
  verified: true,
  popular: true,
  featured: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

/**
 * Get institution details
 * @returns Promise with institution data
 */
export const getInstitutionDetails = async (): Promise<Institution> => {
  // Simulate API delay
  await delay(800);
  return MOCK_INSTITUTION;
};

/**
 * Update institution details
 * @param updates - Partial institution data to update
 * @returns Promise with updated institution data
 */
export const updateInstitutionDetails = async (
  updates: Partial<Institution>
): Promise<Institution> => {
  // Simulate API delay
  await delay(1000);
  
  // In a real app, this would be an API call
  const updatedInstitution = {
    ...MOCK_INSTITUTION,
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  return updatedInstitution;
};
