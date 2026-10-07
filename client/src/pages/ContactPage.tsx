import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, ExternalLink, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { BUSINESS_INFO, getWhatsappUrl } from '../utils/constants';
import { ClinicalDisclaimerNotice } from '../components/ClinicalDisclaimerNotice';
import { apiService } from '../services/api';
import { BrandLogo } from '../components/BrandLogo';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [serviceRequested, setServiceRequested] = useState('Home Nursing Services');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
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

      setSuccessMsg(res.message || 'Thank you! Your enquiry has been received. Our team will contact you.');
      setName('');
      setPhone('');
      setAltPhone('');
      setAddress('');
      setMessage('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Submission failed. Please call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="flex justify-center mb-1">
          <BrandLogo size="lg" linkToHome={false} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          Contact Sri Kannathal Home Care
        </h1>
        <p className="text-slate-600 text-sm">
          We are available 24/7 to assist your family with nursing, caregiver support, and patient care inquiries.
        </p>
      </div>

      <ClinicalDisclaimerNotice />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl">
            <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3 font-heading">
              Official Contact Information
            </h2>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="pt-1">
                <BrandLogo variant="dark" size="md" linkToHome={false} />
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-400 text-xs">Office & Service Address:</p>
                    <p className="font-medium text-slate-200">{BUSINESS_INFO.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-400 text-xs">Direct Phone Lines:</p>
                    <div className="flex flex-col gap-1 mt-0.5">
                      <a href={BUSINESS_INFO.phone1Link} className="text-white font-bold hover:text-emerald-400 text-sm">
                        {BUSINESS_INFO.phone1}
                      </a>
                      <a href={BUSINESS_INFO.phone2Link} className="text-white font-bold hover:text-emerald-400 text-sm">
                        {BUSINESS_INFO.phone2}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-400 text-xs">WhatsApp Support:</p>
                    <a
                      href={getWhatsappUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-300 font-bold hover:underline text-sm inline-block mt-0.5"
                    >
                      {BUSINESS_INFO.whatsappNumber}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-400 text-xs">Operating Hours:</p>
                    <p className="font-semibold text-emerald-300">{BUSINESS_INFO.workingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5">
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow"
              >
                <ExternalLink className="w-4 h-4" />
                Google Maps Location Directions
              </a>

              <a
                href={getWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-teal-800 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 border border-teal-600"
              >
                <MessageCircle className="w-4 h-4" />
                Send Instant WhatsApp Message
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-lg space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-xl font-bold text-slate-900 font-heading">Send Us a Direct Care Enquiry</h2>
            <p className="text-xs text-slate-500">
              Fill out this form and our team in Alanganallur will call you back promptly.
            </p>
          </div>

          {successMsg ? (
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-slate-900 text-lg">Message Sent Successfully!</h3>
              <p className="text-xs text-slate-600">{successMsg}</p>
              <button
                onClick={() => setSuccessMsg('')}
                className="text-xs font-bold text-emerald-700 underline pt-2"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Primary Mobile Phone <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9360086005"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Alternate Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Optional second phone"
                    value={altPhone}
                    onChange={(e) => setAltPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Requested Service <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={serviceRequested}
                    onChange={(e) => setServiceRequested(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
                  >
                    <option>Home Nursing Services</option>
                    <option>Elderly Care & Attendant</option>
                    <option>Baby & Newborn Care</option>
                    <option>Bedridden Patient Care</option>
                    <option>Post-Surgical Wound Care</option>
                    <option>Catheter / Tube Care</option>
                    <option>Palliative & Cancer Care</option>
                    <option>Hospital Discharge Assistance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Location / Address in Madurai/Alanganallur
                </label>
                <input
                  type="text"
                  placeholder="e.g. Thanichiyam Main Road, Alanganallur"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Message / Patient Health Details
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about patient condition, shift preference (12hr/24hr)..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {submitting ? 'Sending Request...' : 'Submit Care Enquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
