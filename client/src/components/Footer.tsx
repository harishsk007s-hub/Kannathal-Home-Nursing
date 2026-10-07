import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, ExternalLink, Clock, ShieldAlert } from 'lucide-react';
import { BUSINESS_INFO, CLINICAL_DISCLAIMER_NOTICE, getWhatsappUrl } from '../utils/constants';

import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t-4 border-emerald-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Business Branding & Mission */}
          <div className="space-y-4">
            <BrandLogo variant="dark" size="md" />
            <p className="text-xs text-slate-400 leading-relaxed">
              Providing skilled home nursing, elderly attendant care, bedridden care, post-surgical dressing, and compassionate newborn & mother support directly in Alanganallur and nearby Madurai regions.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <Clock className="w-4 h-4 text-emerald-500" />
              <span>{BUSINESS_INFO.workingHours}</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase border-b border-slate-800 pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span>•</span> Home Page
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span>•</span> About Our Services
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span>•</span> Full Service Catalog
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span>•</span> Patient & Family Feedback
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span>•</span> Contact & Directions
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span>•</span> Medical Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span>•</span> Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase border-b border-slate-800 pb-2">
              Contact & Support
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span className="text-slate-300">{BUSINESS_INFO.address}</span>
              </div>
              <div className="flex flex-col gap-1 pl-6">
                <a
                  href={BUSINESS_INFO.phone1Link}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-semibold text-white"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  {BUSINESS_INFO.phone1}
                </a>
                <a
                  href={BUSINESS_INFO.phone2Link}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-semibold text-white"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  {BUSINESS_INFO.phone2}
                </a>
              </div>
              <div className="pl-6 pt-1">
                <a
                  href={getWhatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp: {BUSINESS_INFO.whatsappNumber}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 text-xs px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Google Maps Directions
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Clinical Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase border-b border-slate-800 pb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Clinical Notice
            </h4>
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 text-xs leading-relaxed text-slate-300">
              <p className="italic">{CLINICAL_DISCLAIMER_NOTICE}</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer link bar */}
        <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p>© {new Date().getFullYear()} {BUSINESS_INFO.nameEnglish}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/disclaimer" className="hover:text-slate-300">Medical Disclaimer</Link>
            <span>•</span>
            <Link to="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
            <span>•</span>
            <Link to="/admin/login" className="hover:text-slate-300">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
