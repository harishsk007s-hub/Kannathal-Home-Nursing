import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  MessageSquare,
  Stethoscope,
  LogOut,
  CheckCircle,
  Clock,
  Trash2,
  Plus,
  Search,
  ShieldCheck,
  Key,
  AlertCircle,
  RefreshCw,
  FileText,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';
import type { Enquiry, Feedback, ServiceItem } from '../types';
import { BrandLogo } from '../components/BrandLogo';


export const AdminDashboard: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'overview' | 'enquiries' | 'feedback' | 'services' | 'settings'>('overview');

  // Data States
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Enquiry filters
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState('All');
  const [enquirySearch, setEnquirySearch] = useState('');

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passMsg, setPassMsg] = useState('');
  const [passErr, setPassErr] = useState('');

  // Add/Edit Service state
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [serviceNameTamil, setServiceNameTamil] = useState('');
  const [serviceCategory, setServiceCategory] = useState('Home Nursing Services');
  const [serviceDesc, setServiceDesc] = useState('');
  const [serviceFeatures, setServiceFeatures] = useState('');
  const [serviceIsClinical, setServiceIsClinical] = useState(false);
  const [serviceBadge, setServiceBadge] = useState('');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const loadDashboardData = async () => {
    setDataLoading(true);
    try {
      const [enquiriesData, feedbacksData, servicesData] = await Promise.all([
        apiService.fetchAllEnquiriesAdmin(),
        apiService.fetchAllFeedbacksAdmin(),
        apiService.fetchAllServicesAdmin(),
      ]);
      setEnquiries(enquiriesData);
      setFeedbacks(feedbacksData);
      setServices(servicesData);
    } catch (err: any) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <BrandLogo size="lg" linkToHome={false} />
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
          <span>Authenticating session...</span>
        </div>
      </div>
    );
  }

  // Handle Enquiry Status Change
  const handleUpdateEnquiryStatus = async (id: string, newStatus: string) => {
    try {
      const updated = await apiService.updateEnquiryStatusAdmin(id, newStatus);
      setEnquiries((prev) => prev.map((item) => (item._id === id ? updated : item)));
    } catch (err: any) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const handleDeleteEnquiry = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this enquiry record?')) return;
    try {
      await apiService.deleteEnquiryAdmin(id);
      setEnquiries((prev) => prev.filter((item) => item._id !== id));
    } catch (err: any) {
      alert('Failed to delete enquiry: ' + err.message);
    }
  };

  // Handle Feedback Approval Toggle
  const handleToggleFeedbackApprove = async (id: string) => {
    try {
      const updated = await apiService.toggleApproveFeedbackAdmin(id);
      setFeedbacks((prev) => prev.map((item) => (item._id === id ? updated : item)));
    } catch (err: any) {
      alert('Failed to update feedback approval: ' + err.message);
    }
  };

  const handleDeleteFeedback = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this feedback review?')) return;
    try {
      await apiService.deleteFeedbackAdmin(id);
      setFeedbacks((prev) => prev.filter((item) => item._id !== id));
    } catch (err: any) {
      alert('Failed to delete feedback: ' + err.message);
    }
  };

  // Handle Add Service Submit
  const handleAddServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const featuresArray = serviceFeatures
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const created = await apiService.createServiceAdmin({
        name: serviceName,
        nameTamil: serviceNameTamil,
        categoryName: serviceCategory,
        description: serviceDesc,
        features: featuresArray,
        isClinical: serviceIsClinical,
        badge: serviceBadge,
        isActive: true,
      });

      setServices((prev) => [created, ...prev]);
      setShowAddServiceModal(false);
      setServiceName('');
      setServiceNameTamil('');
      setServiceDesc('');
      setServiceFeatures('');
      setServiceBadge('');
      alert('New Service added successfully!');
    } catch (err: any) {
      alert('Failed to add service: ' + err.message);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await apiService.deleteServiceAdmin(id);
      setServices((prev) => prev.filter((item) => item._id !== id));
    } catch (err: any) {
      alert('Failed to delete service: ' + err.message);
    }
  };

  // Handle Password Change (Frontend Demo Mode)
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassErr('');
    setPassMsg('');
    try {
      const res = await apiService.changeAdminPassword({ currentPassword, newPassword });
      setPassMsg(res.message);
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: any) {
      setPassErr(err.message || 'Failed to update password.');
    }
  };

  // Filtered Enquiries
  const filteredEnquiries = enquiries.filter((item) => {
    const matchesStatus = enquiryStatusFilter === 'All' || item.status === enquiryStatusFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      item.phone.includes(enquirySearch) ||
      item.serviceRequested.toLowerCase().includes(enquirySearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const pendingEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;
  const pendingFeedbacksCount = feedbacks.filter((f) => !f.isApproved).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header Bar */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <BrandLogo variant="dark" size="md" />
          <div className="space-y-0.5 border-t sm:border-t-0 sm:border-l border-slate-700 pt-2 sm:pt-0 sm:pl-4">
            <div className="inline-flex items-center gap-2 text-emerald-400 text-[10px] font-bold uppercase tracking-wider bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5" /> Admin Portal
            </div>
            <h1 className="text-xl font-extrabold font-heading">
              Welcome, {user?.name || 'Admin'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadDashboardData}
            disabled={dataLoading}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${dataLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={logout}
            className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'bg-emerald-700 text-white shadow'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" /> Overview
        </button>

        <button
          onClick={() => setActiveTab('enquiries')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'enquiries'
              ? 'bg-emerald-700 text-white shadow'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" /> Enquiries{' '}
          {pendingEnquiriesCount > 0 && (
            <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              {pendingEnquiriesCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('feedback')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'feedback'
              ? 'bg-emerald-700 text-white shadow'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="w-4 h-4" /> Feedback Approvals{' '}
          {pendingFeedbacksCount > 0 && (
            <span className="bg-amber-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              {pendingFeedbacksCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'services'
              ? 'bg-emerald-700 text-white shadow'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Stethoscope className="w-4 h-4" /> Manage Services ({services.length})
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'settings'
              ? 'bg-emerald-700 text-white shadow'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Key className="w-4 h-4" /> Security & Password
        </button>
      </div>

      {/* ================= TAB 1: OVERVIEW ================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs text-slate-500 font-semibold uppercase">Total Patient Enquiries</span>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold text-slate-900 font-heading">{enquiries.length}</span>
                <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs text-slate-500 font-semibold uppercase">New Pending Requests</span>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold text-rose-600 font-heading">{pendingEnquiriesCount}</span>
                <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
                  <Clock className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs text-slate-500 font-semibold uppercase">Approved Testimonials</span>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold text-emerald-700 font-heading">
                  {feedbacks.filter((f) => f.isApproved).length}
                </span>
                <div className="p-3 bg-teal-50 text-teal-700 rounded-xl">
                  <CheckCircle className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs text-slate-500 font-semibold uppercase">Active Healthcare Services</span>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold text-slate-900 font-heading">{services.length}</span>
                <div className="p-3 bg-amber-50 text-amber-700 rounded-xl">
                  <Stethoscope className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Enquiries Preview Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base font-heading">Recent Care Enquiries</h3>
              <button
                onClick={() => setActiveTab('enquiries')}
                className="text-xs font-bold text-emerald-700 hover:underline"
              >
                View All Enquiries →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold uppercase border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Patient Name</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {enquiries.slice(0, 5).map((enq) => (
                    <tr key={enq._id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">{enq.name}</td>
                      <td className="py-3 px-4 text-emerald-700 font-semibold">{enq.phone}</td>
                      <td className="py-3 px-4 font-medium text-slate-700">{enq.serviceRequested}</td>
                      <td className="py-3 px-4 text-slate-400">{new Date(enq.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            enq.status === 'New'
                              ? 'bg-rose-100 text-rose-700'
                              : enq.status === 'Completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {enq.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: ENQUIRIES ================= */}
      {activeTab === 'enquiries' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-heading">Manage Care Enquiries</h2>
              <p className="text-xs text-slate-500">Update request statuses and view patient details.</p>
            </div>

            {/* Filter controls */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search name/phone..."
                  value={enquirySearch}
                  onChange={(e) => setEnquirySearch(e.target.value)}
                  className="pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none w-full"
                />
              </div>

              <select
                value={enquiryStatusFilter}
                onChange={(e) => setEnquiryStatusFilter(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-white font-semibold uppercase">
                <tr>
                  <th className="py-3 px-4">Patient / Phone</th>
                  <th className="py-3 px-4">Service Requested</th>
                  <th className="py-3 px-4">Address / Message</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEnquiries.length > 0 ? (
                  filteredEnquiries.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 space-y-0.5">
                        <div className="font-bold text-slate-900">{item.name}</div>
                        <a href={`tel:${item.phone}`} className="text-emerald-700 font-semibold hover:underline block">
                          {item.phone}
                        </a>
                        {item.altPhone && <div className="text-slate-400 text-[10px]">Alt: {item.altPhone}</div>}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-800">{item.serviceRequested}</td>
                      <td className="py-3 px-4 max-w-xs text-slate-600">
                        <p className="font-semibold text-slate-800">{item.address || 'Alanganallur'}</p>
                        {item.message && <p className="text-[11px] text-slate-500 italic mt-0.5">{item.message}</p>}
                      </td>
                      <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                        {new Date(item.createdAt).toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={item.status}
                          onChange={(e) => handleUpdateEnquiryStatus(item._id, e.target.value)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-none ${
                            item.status === 'New'
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : item.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleDeleteEnquiry(item._id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-slate-400">
                      No enquiry records match your current filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 3: FEEDBACK APPROVALS ================= */}
      {activeTab === 'feedback' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-heading">Moderate Patient Feedback</h2>
            <p className="text-xs text-slate-500">Approve or unapprove testimonials before they appear on the public website.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-white font-semibold uppercase">
                <tr>
                  <th className="py-3 px-4">Patient / Service</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4">Review Text</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {feedbacks.length > 0 ? (
                  feedbacks.map((fb) => (
                    <tr key={fb._id} className="hover:bg-slate-50">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{fb.patientName}</div>
                        <div className="text-emerald-700 font-semibold">{fb.serviceReceived}</div>
                        <div className="text-slate-400 text-[10px]">{fb.location}</div>
                      </td>
                      <td className="py-3 px-4 font-bold text-amber-600">{fb.rating} / 5 ⭐</td>
                      <td className="py-3 px-4 max-w-sm text-slate-700 italic">"{fb.reviewText}"</td>
                      <td className="py-3 px-4">
                        {fb.isApproved ? (
                          <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full text-[10px] font-bold">
                            Approved & Public
                          </span>
                        ) : (
                          <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full text-[10px] font-bold">
                            Pending Review
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 flex items-center gap-2">
                        <button
                          onClick={() => handleToggleFeedbackApprove(fb._id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                            fb.isApproved
                              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              : 'bg-emerald-600 text-white hover:bg-emerald-700'
                          }`}
                        >
                          {fb.isApproved ? 'Unapprove' : 'Approve Review'}
                        </button>
                        <button
                          onClick={() => handleDeleteFeedback(fb._id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-slate-400">
                      No feedback submitted yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 4: SERVICES MANAGEMENT ================= */}
      {activeTab === 'services' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-heading">Services Catalog Management</h2>
              <p className="text-xs text-slate-500">Add, edit, or remove healthcare services.</p>
            </div>
            <button
              onClick={() => setShowAddServiceModal(!showAddServiceModal)}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              Add New Service
            </button>
          </div>

          {/* Add Service Inline Form */}
          {showAddServiceModal && (
            <form onSubmit={handleAddServiceSubmit} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="font-bold text-slate-900 text-sm font-heading">Add New Healthcare Service</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Service Name (English)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Surgical Suture Removal"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Service Name (Tamil)</label>
                  <input
                    type="text"
                    placeholder="e.g. தையல் பிரித்தல் சேவை"
                    value={serviceNameTamil}
                    onChange={(e) => setServiceNameTamil(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-xs font-semibold"
                  >
                    <option>Home Nursing Services</option>
                    <option>Elderly Care</option>
                    <option>Baby and Newborn Care</option>
                    <option>Maternity and Delivery Care</option>
                    <option>Bedridden Patient Care</option>
                    <option>Attendant and Caregiver Services</option>
                    <option>Palliative and Compassionate Care</option>
                    <option>Hospital-to-Home Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Badge Tag (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Popular / Comprehensive"
                    value={serviceBadge}
                    onChange={(e) => setServiceBadge(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Detailed description of service provided..."
                  value={serviceDesc}
                  onChange={(e) => setServiceDesc(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Features (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Feature 1, Feature 2, Feature 3"
                  value={serviceFeatures}
                  onChange={(e) => setServiceFeatures(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-xs"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isClinicalCheck"
                  checked={serviceIsClinical}
                  onChange={(e) => setServiceIsClinical(e.target.checked)}
                  className="rounded text-emerald-600"
                />
                <label htmlFor="isClinicalCheck" className="text-xs font-bold text-slate-800">
                  Mark as Clinical Procedure (Triggers medical disclaimer notice)
                </label>
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddServiceModal(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-800 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold shadow"
                >
                  Save Service
                </button>
              </div>
            </form>
          )}

          {/* List of Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s) => (
              <div key={s._id} className="p-4 border border-slate-200 rounded-xl space-y-2 relative bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                    {s.categoryName}
                  </span>
                  <button
                    onClick={() => handleDeleteService(s._id)}
                    className="text-rose-600 hover:text-rose-800 p-1"
                    title="Delete Service"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{s.name}</h4>
                {s.nameTamil && <p className="text-xs text-emerald-700 font-semibold">{s.nameTamil}</p>}
                <p className="text-xs text-slate-600 line-clamp-2">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 5: SETTINGS ================= */}
      {activeTab === 'settings' && (
        <div className="max-w-lg bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-heading">Change Admin Password</h2>
            <p className="text-xs text-slate-500">Update your account authentication secret.</p>
          </div>

          {passMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{passMsg}</span>
            </div>
          )}

          {passErr && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{passErr}</span>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Current Password</label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">New Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs shadow-md transition-all"
            >
              Update Admin Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
