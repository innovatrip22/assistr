
// Common utility functions used by multiple services

// Check if user is a test user
export const isTestUser = (userId: string) => {
  return userId === 'test-user';
};
