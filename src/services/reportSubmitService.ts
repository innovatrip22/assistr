
import { delay } from "./testUtils";

export const submitReports = async (type: string, data: any): Promise<void> => {
  // Simulate API delay
  await delay(1000);
  
  console.log(`Submitting ${type} report:`, data);
  // In a real app, this would make an API call to submit the report
  return Promise.resolve();
};
