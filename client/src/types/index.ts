export interface ServiceCategory {
  _id: string;
  name: string;
  nameTamil?: string;
  slug: string;
  description?: string;
  icon?: string;
  order: number;
}

export interface ServiceItem {
  _id: string;
  name: string;
  nameTamil?: string;
  categoryName: string;
  description: string;
  features: string[];
  isClinical: boolean;
  isActive: boolean;
  badge?: string;
  order: number;
}

export interface Enquiry {
  _id: string;
  name: string;
  phone: string;
  altPhone?: string;
  serviceRequested: string;
  address?: string;
  message?: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Completed' | 'Cancelled';
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Feedback {
  _id: string;
  patientName: string;
  serviceReceived: string;
  rating: number;
  reviewText: string;
  location?: string;
  isApproved: boolean;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin';
}

export interface AuthState {
  token: string | null;
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
