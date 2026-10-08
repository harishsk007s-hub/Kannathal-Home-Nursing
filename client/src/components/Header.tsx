import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, Menu, X, ShieldCheck, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../utils/constants';

import { BrandLogo } from './BrandLogo';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', nameTamil: 'முகப்பு', path: '/' },
    { name: 'About Us', nameTamil: 'எங்களைப் பற்றி', path: '/about' },
    { name: 'Services', nameTamil: 'சேவைகள்', path: '/services' },
    { name: 'Feedback', nameTamil: 'கருத்துகள்', path: '/feedback' },
    { name: 'Contact', nameTamil: 'தொடர்புகொள்ள', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleNavClick = (path: string) => {
    if (path === '/' && location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="relative z-50 bg-white/95 shadow-sm border-b border-emerald-100">
      {/* Top Bar for Phone Numbers & Location */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <MapPin className="w-3.5 h-3.5" />
              Alanganallur & Madurai
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              24/7 Home Nursing & Attendant Care
            </span>
          </div>
          <div className="flex items-center gap-4 font-semibold">
            <a
              href={BUSINESS_INFO.phone1Link}
              className="hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              {BUSINESS_INFO.phone1}
            </a>
            <span className="text-slate-600">/</span>
            <a
              href={BUSINESS_INFO.phone2Link}
              className="hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              {BUSINESS_INFO.phone2}
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <BrandLogo size="md" />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => handleNavClick(link.path)}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive(link.path)
                  ? 'bg-emerald-50 text-emerald-700 font-bold border-b-2 border-emerald-600'
                  : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="/#book-appointment"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4" />
            Book Appointment
          </a>
          <a
            href={BUSINESS_INFO.phone1Link}
            className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            Call Now
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="/#book-appointment"
            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full"
            aria-label="Book Appointment"
          >
            <MessageCircle className="w-6 h-6" />
          </a>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`px-4 py-2.5 rounded-lg text-sm font-semibold flex justify-between items-center ${
                  isActive(link.path)
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'
                }`}
              >
                <span>{link.name}</span>
                <span className="text-xs opacity-75 font-normal">{link.nameTamil}</span>
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={BUSINESS_INFO.phone1Link}
              className="w-full bg-slate-900 text-white text-center py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              Call {BUSINESS_INFO.phone1}
            </a>
            <a
              href="/#book-appointment"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full bg-emerald-600 text-white text-center py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow"
            >
              <MessageCircle className="w-4 h-4" />
              Book Appointment
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
