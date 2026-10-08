import React from 'react';
import { Phone, MessageCircle, ShieldCheck, CheckCircle2, MapPin } from 'lucide-react';

import { BUSINESS_INFO, getWhatsappUrl } from '../utils/constants';
import { ClinicalDisclaimerNotice } from '../components/ClinicalDisclaimerNotice';

import { BrandLogo } from '../components/BrandLogo';
import { useSEO } from '../utils/useSEO';

export const AboutUs: React.FC = () => {
  useSEO({
    title: 'About Us | Sri Kannathal Home Care & Nursing Service',
    description: 'Learn about Sri Kannathal Home Care & Nursing Service. We deliver dignified, professional, and reliable home nursing care and patient attendants in Alanganallur and Madurai.'
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-3xl space-y-4">
          <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
            About Our Nursing Agency
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading">
            <span className="block text-emerald-300 text-2xl sm:text-3xl mb-1">{BUSINESS_INFO.nameTamil}</span>
            {BUSINESS_INFO.nameEnglish}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Delivering dignified, professional, and reliable home nursing care, patient attendants, and elderly assistance across Alanganallur and nearby areas of Madurai.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href={BUSINESS_INFO.phone1Link}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow"
            >
              <Phone className="w-4 h-4" />
              Call {BUSINESS_INFO.phone1}
            </a>
            <a
              href={getWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="shrink-0 bg-white/10 p-4 rounded-3xl backdrop-blur-md border border-white/20 shadow-2xl">
          <BrandLogo variant="dark" size="hero" showText={false} linkToHome={false} />
        </div>
      </div>

      <ClinicalDisclaimerNotice />

      {/* Main About Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 font-heading">Our Core Story & Values</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              At <strong>Sri Kannathal Home Care & Nursing Service</strong>, we understand that nothing replaces the warmth and emotional comfort of recovering in one’s own home. When a family member faces illness, surgery, bedridden immobility, or senior age challenges, receiving professional medical care in familiar home surroundings promotes faster healing and peace of mind.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              We were founded to bridge the gap between hospital discharge and long-term home health maintenance in Alanganallur and Madurai. Our staff comprises trained nurses, experienced male and female patient attendants, and compassionate caregivers committed to maintaining the highest standards of hygiene and respect.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 p-1">
                <img src="/logo.png" alt="Sri Kannathal Home Care" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-slate-900 text-base font-heading">Our Mission</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                To offer high-quality, accessible, and affordable home healthcare services that enhance the well-being and dignity of patients.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base font-heading">Our Quality Guarantee</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Background-verified caregivers, clinical nurse procedures, regular supervisor monitoring, and compassionate family communication.
              </p>
            </div>
          </div>
        </div>

        {/* Right Sidebar Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-5 shadow-lg">
            <h3 className="font-bold text-lg border-b border-slate-800 pb-3 font-heading">
              Why Families Trust Sri Kannathal
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Specialized wound care, diabetic dressing, bedsore care, and suture removal.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>IV infusion, catheterization, Ryles tube support, and tracheostomy suctioning.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>12-hour day/night shifts and 24-hour residential caregivers (subject to availability).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Newborn baby massage, bathing, cord care, and mother post-natal rest care.</span>
              </li>
            </ul>

            <div className="pt-2 border-t border-slate-800">
              <p className="text-xs text-slate-400 mb-2">Service Location:</p>
              <div className="flex items-center gap-2 text-xs text-emerald-300 font-semibold">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Alanganallur, Thanichiyam Main Road & Madurai</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
