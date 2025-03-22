
// Common utility functions used by multiple services

// Check if user is a test user
export const isTestUser = (userId: string) => {
  return userId === 'test-user';
};

/**
 * Utility function to simulate API delay
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after the specified delay
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
