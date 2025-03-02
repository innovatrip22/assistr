
// Simple in-memory database to store form submissions
type Feedback = {
  id: string;
  type: 'chat' | 'complaint';
  timestamp: string;
  message: string;
  institution?: string;
  subject?: string;
  status: 'pending' | 'processed';
};

type Report = {
  id: string;
  type: 'price' | 'fraud' | 'emergency';
  timestamp: string;
  location?: string;
  businessName?: string;
  productName?: string;
  paidPrice?: number;
  normalPrice?: number;
  description: string;
  status: 'pending' | 'processed';
};

// In-memory storage (simulates a database)
const feedbacks: Feedback[] = [];
const reports: Report[] = [];

// Generate unique ID
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Feedback methods
export const addFeedback = (feedback: Omit<Feedback, 'id' | 'timestamp' | 'status'>) => {
  const newFeedback: Feedback = {
    ...feedback,
    id: generateId(),
    timestamp: new Date().toISOString(),
    status: 'pending'
  };
  feedbacks.push(newFeedback);
  return newFeedback;
};

export const getFeedbacks = () => {
  return [...feedbacks].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const updateFeedbackStatus = (id: string, status: 'pending' | 'processed') => {
  const feedback = feedbacks.find(f => f.id === id);
  if (feedback) {
    feedback.status = status;
    return feedback;
  }
  return null;
};

// Report methods
export const addReport = (report: Omit<Report, 'id' | 'timestamp' | 'status'>) => {
  const newReport: Report = {
    ...report,
    id: generateId(),
    timestamp: new Date().toISOString(),
    status: 'pending'
  };
  reports.push(newReport);
  return newReport;
};

export const getReports = () => {
  return [...reports].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const updateReportStatus = (id: string, status: 'pending' | 'processed') => {
  const report = reports.find(r => r.id === id);
  if (report) {
    report.status = status;
    return report;
  }
  return null;
};
