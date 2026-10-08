import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  MessageCircle,
  ShieldCheck,
  Award,
  Users,
  Clock,
  CheckCircle2,
  Star,
  ArrowRight,
  ChevronRight,
  MapPin,
  ExternalLink,
  Sparkles,
  Activity,
} from 'lucide-react';
import { BUSINESS_INFO } from '../utils/constants';
import { ClinicalDisclaimerNotice } from '../components/ClinicalDisclaimerNotice';
import { apiService } from '../services/api';
import type { Feedback } from '../types';
import { useSEO } from '../utils/useSEO';


import { BrandLogo } from '../components/BrandLogo';

export const Home: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useSEO({
    title: 'Sri Kannathal Home Care & Nursing Service | Home Nursing & Patient Care Madurai',
    description: 'Sri Kannathal Home Care & Nursing Service provides professional home nursing, patient care, elderly care, and healthcare services at home in Alanganallur and Madurai.'
  });

  // Appointment Booking Form State
  const [quickName, setQuickName] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [quickDate, setQuickDate] = useState('');
  const [quickTime, setQuickTime] = useState('');
  const [quickService, setQuickService] = useState('Home Nursing Services');
  const [quickMessage, setQuickMessage] = useState('');
  const [quickSubmitting, setQuickSubmitting] = useState(false);
  const [quickSuccess, setQuickSuccess] = useState('');

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const feedbackData = await apiService.fetchApprovedFeedbacks();
        setFeedbacks(feedbackData);
      } catch (err) {
        console.error('Error loading home page data:', err);
      }
    };
    loadHomeData();
  }, []);


  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName || !quickPhone || !quickDate || !quickTime || !quickService) {
      alert("Please fill in all required fields.");
      return;
    }

    setQuickSubmitting(true);
    setQuickSuccess('');

    const textMessage = `New Appointment Booking\n\nName: ${quickName}\nPhone: ${quickPhone}\nDate: ${quickDate}\nTime: ${quickTime}\nReason: ${quickService}\nMessage: ${quickMessage || 'None'}`;
    const encodedMessage = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/919360086006?text=${encodedMessage}`;

    setTimeout(() => {
      setQuickSuccess('Your booking details are ready in WhatsApp.');
      setQuickSubmitting(false);
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      
      setQuickName('');
      setQuickPhone('');
      setQuickDate('');
      setQuickTime('');
      setQuickMessage('');
    }, 600);
  };



  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-900 text-white overflow-hidden py-12 lg:py-20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="flex flex-col lg:flex-row items-center gap-4">
                <BrandLogo variant="dark" size="hero" showText={false} linkToHome={false} className="bg-white/10 p-2 rounded-3xl backdrop-blur-md border border-white/20 shadow-xl" />
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-300 px-3.5 py-1.5 rounded-full text-xs font-semibold">
                  <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
                  <span>Alanganallur & Madurai’s Trusted Home Care</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight font-heading">
                <span className="block text-emerald-300 text-xl sm:text-3xl lg:text-4xl mb-1">
                  {BUSINESS_INFO.nameTamil}
                </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-emerald-200">
                  {BUSINESS_INFO.nameEnglish}
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Dedicated home nursing, elderly daily attendant care, newborn & mother care, diabetic wound dressing, and 24-hour caregiver support right at your home in Alanganallur and nearby areas of Madurai.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <a
                  href="#book-appointment"
                  className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <Clock className="w-5 h-5" />
                  Book Appointment
                </a>

                <a
                  href={BUSINESS_INFO.phone1Link}
                  className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-teal-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5 text-emerald-300" />
                  Call Now: {BUSINESS_INFO.phone1}
                </a>
              </div>

              {/* Highlights pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center justify-center lg:justify-start gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Qualified Nurses</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>12h / 24h Caregivers</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-1.5 col-span-2 sm:col-span-1">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Male & Female Staff</span>
                </div>
              </div>
            </div>

            {/* Right Hero Quick Request Card */}
            <div className="lg:col-span-5" id="book-appointment">
              <div className="glass-panel p-6 rounded-2xl shadow-2xl border border-white/20 text-slate-900">
                <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2 font-heading">
                  <img src="/logo.png" alt="Sri Kannathal Home Care & Nursing Service" className="w-6 h-6 object-contain" />
                  Book Appointment
                </h3>
                <p className="text-xs text-slate-600 mb-4">
                  Fill in the details below to book an appointment with our care team via WhatsApp.
                </p>

                {quickSuccess ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                    <p className="font-bold">{quickSuccess}</p>
                    <button
                      onClick={() => setQuickSuccess('')}
                      className="text-xs text-emerald-700 underline font-semibold mt-1"
                    >
                      Send another request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleQuickSubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={quickName}
                        onChange={(e) => setQuickName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile number"
                        value={quickPhone}
                        onChange={(e) => setQuickPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Preferred Date <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="date"
                          required
                          value={quickDate}
                          onChange={(e) => setQuickDate(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Preferred Time <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="time"
                          required
                          value={quickTime}
                          onChange={(e) => setQuickTime(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Service / Reason <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={quickService}
                        onChange={(e) => setQuickService(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
                      >
                        <option>Home Nursing Services</option>
                        <option>Elderly Care & Attendant</option>
                        <option>Baby & Newborn Care</option>
                        <option>Bedridden Patient Care</option>
                        <option>Wound Dressing & Sutures</option>
                        <option>Palliative & Cancer Care</option>
                        <option>General Checkup / Consultation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Optional Message
                      </label>
                      <textarea
                        placeholder="Any additional details..."
                        value={quickMessage}
                        onChange={(e) => setQuickMessage(e.target.value)}
                        rows={2}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={quickSubmitting}
                      className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 mt-2"
                    >
                      <span>{quickSubmitting ? 'Processing...' : 'Book Appointment via WhatsApp'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}

                <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between text-xs text-slate-500">
                  <span>Emergency Line 1: <a href={BUSINESS_INFO.phone1Link} className="font-bold text-slate-800">{BUSINESS_INFO.phone1}</a></span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CLINICAL DISCLAIMER NOTICE ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ClinicalDisclaimerNotice />
      </div>

      {/* ================= ABOUT SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <img src="/logo.png" alt="Sri Kannathal Home Care" className="w-5 h-5 object-contain" /> About Sri Kannathal Home Care
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Dedicated Home Healthcare Service in Alanganallur & Madurai
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed">
              <strong>{BUSINESS_INFO.nameTamil}</strong> ({BUSINESS_INFO.nameEnglish}) is committed to bringing hospital-grade comfort, skilled nursing procedures, and personal caregiver support directly to your home.
            </p>

            <p className="text-slate-600 text-sm leading-relaxed">
              Whether your family requires professional post-surgical dressing, continuous catheter or tube management, dedicated elderly mobility assistance, or loving newborn & postnatal mother care, our verified staff is available for 12-hour and 24-hour caregiver duties (subject to availability).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Local Area Focus</h4>
                  <p className="text-xs text-slate-500">Quick response in Alanganallur and nearby Madurai areas.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Experienced Caregivers</h4>
                  <p className="text-xs text-slate-500">Respectful male and female nursing staff & attendants.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 group"
              >
                Learn More About Our Team & Mission
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* About Image / Feature Box */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-800 to-teal-900 rounded-2xl p-6 text-white space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

            <h3 className="text-lg font-bold border-b border-emerald-700/60 pb-3 font-heading">
              Key Care Services Offered
            </h3>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Home Nursing & Surgical Dressing</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Diabetic Foot & Bedsore Care</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>IV Infusion, Catheter & Ryles Tube</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Elderly Daily Mobility Assistance</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Newborn Bathing & Postnatal Support</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>12-Hour / 24-Hour Patient Caregivers</span>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href={BUSINESS_INFO.phone1Link}
                className="w-full bg-white text-slate-900 hover:bg-emerald-50 text-center py-2.5 rounded-xl text-xs font-bold block shadow transition-colors"
              >
                Call Nursing Team: {BUSINESS_INFO.phone1}
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* ================= WHY CHOOSE US SECTION ================= */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4" /> Why Families Choose Us
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
              Trusted Home Care Provider in Madurai
            </h2>

            <p className="text-slate-400 text-sm">
              We prioritize patient dignity, clinical hygiene, and empathetic support at every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3 hover:border-emerald-500 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-heading">Certified Nursing Staff</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Qualified nurses for clinical wound dressing, catheter change, Ryles tube, and IV administration.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3 hover:border-emerald-500 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-teal-600/20 text-teal-400 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-heading">12-Hour & 24-Hour Shifts</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Flexible full-day, night shift, or 24/7 continuous caregiver support (subject to availability).
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3 hover:border-emerald-500 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-heading">Male & Female Caregivers</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Respectful caregiver match tailored to patient gender preferences for maximum comfort.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3 hover:border-emerald-500 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-heading">Alanganallur Local Access</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Fast doorstep service across Thanichiyam Road, Alanganallur, and nearby Madurai regions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Activity className="w-4 h-4" /> Simple 4-Step Process
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            How Our Home Care Works
          </h2>

          <p className="text-slate-600 text-sm">
            Quick and seamless setup to arrange home healthcare for your family.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-center relative">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center mx-auto shadow-md">
              1
            </div>
            <h3 className="text-sm font-bold text-slate-900 font-heading">Call or WhatsApp</h3>
            <p className="text-xs text-slate-600">
              Reach out to us at <a href={BUSINESS_INFO.phone1Link} className="text-emerald-700 font-bold">{BUSINESS_INFO.phone1}</a> or message on WhatsApp.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-center relative">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center mx-auto shadow-md">
              2
            </div>
            <h3 className="text-sm font-bold text-slate-900 font-heading">Care Need Assessment</h3>
            <p className="text-xs text-slate-600">
              We understand patient requirements, doctor prescriptions, and caregiver hours needed.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-center relative">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center mx-auto shadow-md">
              3
            </div>
            <h3 className="text-sm font-bold text-slate-900 font-heading">Nurse/Attendant Match</h3>
            <p className="text-xs text-slate-600">
              We assign qualified male or female caregivers or trained nurses for your specific service.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-center relative">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center mx-auto shadow-md">
              4
            </div>
            <h3 className="text-sm font-bold text-slate-900 font-heading">Doorstep Home Care</h3>
            <p className="text-xs text-slate-600">
              Our caregiver arrives at your home to deliver comfortable, compassionate health support.
            </p>
          </div>
        </div>
      </section>

      {/* ================= PATIENT FEEDBACK SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> Patient Reviews
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Feedback From Families We Served
            </h2>
          </div>

          <Link
            to="/feedback"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            View All Reviews & Submit Yours <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {feedbacks.length > 0 ? (
            feedbacks.slice(0, 3).map((fb) => (
              <div
                key={fb._id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(fb.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 italic leading-relaxed">"{fb.reviewText}"</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900">{fb.patientName}</h4>
                    <span className="text-[11px] text-emerald-700">{fb.serviceReceived}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{fb.location || 'Madurai'}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-xs text-slate-500">
              No public feedback loaded yet.
            </div>
          )}
        </div>
      </section>

      {/* ================= CONTACT & LOCATION SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-emerald-400 bg-emerald-950 border border-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase">
              <MapPin className="w-4 h-4" /> Business Location
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              Visit Us or Call for Immediate Assistance
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Address:</strong> {BUSINESS_INFO.address}</span>
              </p>

              <p className="flex items-center gap-2.5">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  <strong>Call Us:</strong>{' '}
                  <a href={BUSINESS_INFO.phone1Link} className="text-emerald-300 font-bold hover:underline">
                    {BUSINESS_INFO.phone1}
                  </a>{' '}
                  /{' '}
                  <a href={BUSINESS_INFO.phone2Link} className="text-emerald-300 font-bold hover:underline">
                    {BUSINESS_INFO.phone2}
                  </a>
                </span>
              </p>

              <p className="flex items-center gap-2.5">
                <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  <strong>WhatsApp:</strong>{' '}
                  <a
                    href="#book-appointment"
                    className="text-emerald-300 font-bold hover:underline"
                  >
                    {BUSINESS_INFO.whatsappNumber}
                  </a>
                </span>
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                Get Directions
              </a>

              <Link
                to="/contact"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 transition-all"
              >
                Full Contact Page
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
            <h3 className="font-bold text-sm text-white border-b border-slate-700 pb-2">
              Service Coverage Map Info
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We provide home healthcare and caregiver dispatch across Alanganallur, Thanichiyam Road, Palamedu, Vadipatti, and nearby villages and town areas in Madurai district.
            </p>
            <div className="p-3 bg-slate-900 rounded-xl text-xs text-emerald-400 font-semibold border border-slate-700 flex items-center justify-between">
              <span>Service Status:</span>
              <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full text-[11px]">
                Active & Accepting Care Requests
              </span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
