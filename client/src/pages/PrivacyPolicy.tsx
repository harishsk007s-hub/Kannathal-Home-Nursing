import React from 'react';

import { BUSINESS_INFO } from '../utils/constants';

import { BrandLogo } from '../components/BrandLogo';
import { useSEO } from '../utils/useSEO';

export const PrivacyPolicy: React.FC = () => {
  useSEO({
    title: 'Privacy Policy | Sri Kannathal Home Care & Nursing Service',
    description: 'Privacy Policy for Sri Kannathal Home Care & Nursing Service regarding patient health information and contact details.'
  });
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-slate-200 pb-6 space-y-3">
        <BrandLogo size="md" linkToHome={false} />
        <h1 className="text-3xl font-extrabold text-slate-900 font-heading pt-2">Privacy Policy</h1>
        <p className="text-xs text-slate-500">
          Last updated: September 2026 | {BUSINESS_INFO.nameEnglish}
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 font-heading">1. Commitment to Patient Privacy</h2>
          <p>
            At <strong>{BUSINESS_INFO.nameTamil} ({BUSINESS_INFO.nameEnglish})</strong>, we respect your privacy and are deeply committed to protecting the confidentiality of patient health information, family contact details, and medical records.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 font-heading">2. Information Collection & Usage</h2>
          <p>
            When you submit an enquiry form or contact us via telephone or WhatsApp, we collect minimal necessary data including:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>Patient and family contact name and phone numbers</li>
            <li>Home address in Alanganallur or Madurai area for nurse dispatch</li>
            <li>Brief description of medical care needs and doctor instructions</li>
          </ul>
          <p>
            This information is strictly used to organize nursing schedules, match appropriate caregivers, and communicate with family members regarding patient updates.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 font-heading">3. Data Non-Disclosure Guarantee</h2>
          <p>
            We do NOT sell, lease, or share patient personal data or medical records with third-party marketing companies. Data is disclosed only to assigned healthcare nurses, caregivers, or treating medical doctors when necessary for patient care.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 font-heading">4. Contact & Rights</h2>
          <p>
            If you have questions regarding your data privacy or wish to update your records, please contact our administrative team directly at <strong>{BUSINESS_INFO.phone1}</strong> or visit our office at {BUSINESS_INFO.address}.
          </p>
        </section>
      </div>
    </div>
  );
};
