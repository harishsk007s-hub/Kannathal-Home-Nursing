import React, { useState, useEffect } from 'react';
import { Search, CheckCircle2, MessageCircle, AlertCircle } from 'lucide-react';
import { apiService } from '../services/api';
import type { ServiceItem } from '../types';
import { getWhatsappUrl } from '../utils/constants';

import { ClinicalDisclaimerNotice } from '../components/ClinicalDisclaimerNotice';
import { EnquiryModal } from '../components/EnquiryModal';
import { BrandLogo } from '../components/BrandLogo';

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState('Home Nursing Care');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await apiService.fetchServices();
        setServices(data);
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const openBookingModal = (serviceName: string) => {
    setModalService(serviceName);
    setIsModalOpen(true);
  };

  const categories = [
    'All',
    'Home Nursing Services',
    'Elderly Care',
    'Baby and Newborn Care',
    'Maternity and Delivery Care',
    'Bedridden Patient Care',
    'Attendant and Caregiver Services',
    'Palliative and Compassionate Care',
    'Hospital-to-Home Support',
  ];

  const filteredServices = services.filter((service) => {
    const matchesCategory = selectedCategory === 'All' || service.categoryName === selectedCategory;
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (service.nameTamil && service.nameTamil.toLowerCase().includes(searchTerm.toLowerCase())) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Title Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="flex justify-center mb-1">
          <BrandLogo size="lg" linkToHome={false} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          Our Home Nursing & Healthcare Services
        </h1>
        <p className="text-slate-600 text-sm">
          Browse our complete range of skilled nursing procedures, caregiver assistance, elderly care, and baby care available in Alanganallur and nearby Madurai regions.
        </p>
      </div>

      <ClinicalDisclaimerNotice />

      {/* Search & Category Filter Pills */}
      <div className="space-y-4">
        <div className="max-w-md mx-auto relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search services (e.g., bedsore, IV infusion, baby care, stroke)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 justify-start md:justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="text-center py-16 space-y-3">
          <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-slate-500 font-semibold">Loading service catalog...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-emerald-300 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
                      {service.categoryName}
                    </span>
                    {service.isClinical ? (
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                        Clinical Procedure
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
                        Caregiver Support
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-heading">{service.name}</h3>
                    {service.nameTamil && (
                      <p className="text-xs text-emerald-700 font-semibold">{service.nameTamil}</p>
                    )}
                  </div>

                  <p className="text-slate-600 text-xs leading-relaxed">{service.description}</p>

                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => openBookingModal(service.name)}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition-colors text-center shadow"
                  >
                    Inquire Service
                  </button>

                  <a
                    href={getWhatsappUrl(`Hello Sri Kannathal Care, I need information about: ${service.name}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-teal-50 hover:bg-teal-100 text-teal-800 p-2.5 rounded-xl border border-teal-200"
                    title="Ask on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 text-teal-600" />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
              <AlertCircle className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="text-base font-bold text-slate-800">No Services Match Your Search</h4>
              <p className="text-xs text-slate-500">Please try adjusting your category filter or search keywords.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="text-xs text-emerald-700 font-bold underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        prefilledService={modalService}
      />
    </div>
  );
};
