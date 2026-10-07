import React, { useState } from 'react';
import { X, Send, CheckCircle, AlertCircle, MessageCircle } from 'lucide-react';


import { apiService } from '../services/api';
import { getWhatsappUrl } from '../utils/constants';

import { BrandLogo } from './BrandLogo';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledService?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  prefilledService = 'Home Nursing Care',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [serviceRequested, setServiceRequested] = useState(prefilledService);
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Synchronize prefilled service if changed
  React.useEffect(() => {
    if (prefilledService) setServiceRequested(prefilledService);
  }, [prefilledService]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await apiService.submitEnquiry({
        name,
        phone,
        altPhone,
        serviceRequested,
        address,
        message,
      });

      setSuccessMsg(res.message || 'Enquiry submitted successfully! We will contact you soon.');
      setName('');
      setPhone('');
      setAltPhone('');
      setAddress('');
      setMessage('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit enquiry. Please call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsappSend = () => {
    const customText = `Hello Sri Kannathal Care Team,\nName: ${name || 'Interested Patient/Family'}\nPhone: ${phone || 'Not provided'}\nService Requested: ${serviceRequested}\nLocation: ${address || 'Alanganallur/Madurai'}\nDetails: ${message || 'Please provide information.'}`;
    window.open(getWhatsappUrl(customText), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-emerald-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-700 px-6 py-3.5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo variant="dark" size="sm" linkToHome={false} showText={false} className="bg-white/10 p-1 rounded-xl" />
            <div>
              <h3 className="font-bold text-base font-heading">Book Service Enquiry</h3>
              <p className="text-emerald-100 text-[11px]">Sri Kannathal Home Care & Nursing Service</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {successMsg ? (
            <div className="text-center py-6 space-y-4">
              <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
              <h4 className="text-xl font-bold text-slate-800">Enquiry Received!</h4>
              <p className="text-slate-600 text-sm">{successMsg}</p>
              <div className="pt-4 flex flex-col gap-2">
                <button
                  onClick={onClose}
                  className="w-full bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-sm"
                >
                  Done
                </button>
                <button
                  onClick={handleWhatsappSend}
                  className="w-full bg-teal-50 text-teal-800 border border-teal-200 font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-teal-600" />
                  Also Chat on WhatsApp
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Service Requested <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={serviceRequested}
                  onChange={(e) => setServiceRequested(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name / Patient Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9360086005"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alternate Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="Additional contact number"
                  value={altPhone}
                  onChange={(e) => setAltPhone(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Address / Service Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Near Ayyappan Temple, Alanganallur"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Patient Condition & Specific Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe patient age, medical condition, hours needed (12hr/24hr)..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Submitting...' : 'Submit Care Enquiry'}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsappSend}
                  className="bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-300 font-bold px-4 py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  WhatsApp Us
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
