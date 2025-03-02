
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
const feedbacks: Feedback[] = [
  {
    id: "f1",
    type: "complaint",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    message: "Otelde sunulan hizmet ile web sitesinde belirtilen hizmetler farklıydı.",
    institution: "Antalya Turizm Müdürlüğü",
    subject: "Otel Hizmet Şikayeti",
    status: "pending"
  },
  {
    id: "f2",
    type: "chat",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    message: "Antalya'da güvenle ziyaret edilebilecek plajlar hangileridir?",
    status: "pending"
  },
  {
    id: "f3",
    type: "complaint",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    message: "Tur rehberi bizi fazladan ücretli aktivitelere yönlendirmeye çalıştı.",
    institution: "Antalya Turizm Danışma",
    subject: "Tur Rehberi Şikayeti",
    status: "processed"
  }
];

const reports: Report[] = [
  {
    id: "r1",
    type: "price",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    location: "Kaleiçi, Antalya",
    businessName: "Manzara Restoran",
    productName: "Deniz Mahsülleri Tabağı",
    paidPrice: 950,
    normalPrice: 450,
    description: "Menüde 450 TL olarak gördüğüm ürün hesap geldiğinde 950 TL olarak fatura edildi.",
    status: "pending"
  },
  {
    id: "r2",
    type: "fraud",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    location: "Lara Plajı, Antalya",
    description: "Sahilde taksi olduğunu söyleyen kişi çok yüksek ücret aldı ve resmi taksi olmadığı anlaşıldı.",
    status: "pending"
  },
  {
    id: "r3",
    type: "emergency",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    location: "Konyaaltı Sahili, Antalya",
    description: "Denizde boğulma tehlikesi geçiren bir turist var. Acil yardım gerekiyor!",
    status: "pending"
  }
];

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

// Business methods for the Business panel
export type Business = {
  id: string;
  name: string;
  type: 'restaurant' | 'hotel' | 'shop' | 'entertainment' | 'other';
  address: string;
  priceReports: number;
  fraudReports: number;
  status: 'verified' | 'unverified' | 'flagged';
  registrationDate: string;
};

const businesses: Business[] = [
  {
    id: "b1",
    name: "Manzara Restoran",
    type: "restaurant",
    address: "Kaleiçi, Antalya",
    priceReports: 3,
    fraudReports: 0,
    status: "verified",
    registrationDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString()
  },
  {
    id: "b2",
    name: "Palmiye Otel",
    type: "hotel",
    address: "Lara, Antalya",
    priceReports: 1,
    fraudReports: 2,
    status: "flagged",
    registrationDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString()
  },
  {
    id: "b3",
    name: "Deniz Hediyelik Eşya",
    type: "shop",
    address: "Konyaaltı, Antalya",
    priceReports: 5,
    fraudReports: 1,
    status: "unverified",
    registrationDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString()
  }
];

export const getBusinesses = () => {
  return [...businesses];
};

export const getBusinessById = (id: string) => {
  return businesses.find(b => b.id === id) || null;
};

export const addBusiness = (business: Omit<Business, 'id' | 'priceReports' | 'fraudReports' | 'registrationDate'>) => {
  const newBusiness: Business = {
    ...business,
    id: generateId(),
    priceReports: 0,
    fraudReports: 0,
    registrationDate: new Date().toISOString()
  };
  businesses.push(newBusiness);
  return newBusiness;
};

export const updateBusinessStatus = (id: string, status: 'verified' | 'unverified' | 'flagged') => {
  const business = businesses.find(b => b.id === id);
  if (business) {
    business.status = status;
    return business;
  }
  return null;
};

// Method to get reports for specific business
export const getReportsForBusiness = (businessName: string) => {
  return reports.filter(r => r.businessName === businessName);
};
