import type { ServiceItem, ServiceCategory, Enquiry, Feedback, AdminUser } from '../types';


const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('sri_kannathal_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const apiService = {
  // Public API methods
  async fetchCategories(): Promise<ServiceCategory[]> {
    const res = await fetch(`${API_BASE}/services/categories`);
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  async fetchServices(category?: string, search?: string): Promise<ServiceItem[]> {
    let url = `${API_BASE}/services?activeOnly=true`;
    if (category && category !== 'All') url += `&category=${encodeURIComponent(category)}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  async submitEnquiry(enquiryData: {
    name: string;
    phone: string;
    altPhone?: string;
    serviceRequested: string;
    address?: string;
    message?: string;
  }): Promise<{ message: string; data: Enquiry }> {
    const res = await fetch(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiryData),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data;
  },

  async fetchApprovedFeedbacks(): Promise<Feedback[]> {
    const res = await fetch(`${API_BASE}/feedbacks`);
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  async submitFeedback(feedbackData: {
    patientName: string;
    serviceReceived: string;
    rating: number;
    reviewText: string;
    location?: string;
  }): Promise<{ message: string; data: Feedback }> {
    const res = await fetch(`${API_BASE}/feedbacks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedbackData),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data;
  },

  // Admin Auth methods
  async loginAdmin(credentials: { email: string; password: string }): Promise<{ token: string; user: AdminUser }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return { token: data.token, user: data.user };
  },

  async checkAdminAuth(): Promise<AdminUser> {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.user;
  },

  async changePassword(passwords: { currentPassword: string; newPassword: string }): Promise<string> {
    const res = await fetch(`${API_BASE}/auth/change-password`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(passwords),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.message;
  },

  // Admin Protected Enquiries Management
  async fetchAllEnquiriesAdmin(status?: string, search?: string): Promise<Enquiry[]> {
    let url = `${API_BASE}/enquiries?`;
    if (status && status !== 'All') url += `status=${encodeURIComponent(status)}&`;
    if (search) url += `search=${encodeURIComponent(search)}`;

    const res = await fetch(url, { headers: getAuthHeaders() });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  async updateEnquiryStatusAdmin(id: string, status: string, adminNotes?: string): Promise<Enquiry> {
    const res = await fetch(`${API_BASE}/enquiries/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status, adminNotes }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  async deleteEnquiryAdmin(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/enquiries/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
  },

  // Admin Protected Feedback Management
  async fetchAllFeedbacksAdmin(): Promise<Feedback[]> {
    const res = await fetch(`${API_BASE}/feedbacks/all`, { headers: getAuthHeaders() });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  async toggleApproveFeedbackAdmin(id: string): Promise<Feedback> {
    const res = await fetch(`${API_BASE}/feedbacks/${id}/approve`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  async deleteFeedbackAdmin(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/feedbacks/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
  },

  // Admin Protected Services Management
  async fetchAllServicesAdmin(): Promise<ServiceItem[]> {
    const res = await fetch(`${API_BASE}/services`, { headers: getAuthHeaders() });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  async createServiceAdmin(serviceData: Partial<ServiceItem>): Promise<ServiceItem> {
    const res = await fetch(`${API_BASE}/services`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(serviceData),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  async updateServiceAdmin(id: string, serviceData: Partial<ServiceItem>): Promise<ServiceItem> {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(serviceData),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  async deleteServiceAdmin(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
  },
};
