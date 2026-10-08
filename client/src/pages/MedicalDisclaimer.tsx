import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { BUSINESS_INFO, CLINICAL_DISCLAIMER_NOTICE } from '../utils/constants';

import { BrandLogo } from '../components/BrandLogo';
import { useSEO } from '../utils/useSEO';

export const MedicalDisclaimer: React.FC = () => {
  useSEO({
    title: 'Medical Disclaimer | Sri Kannathal Home Care & Nursing Service',
    description: 'Medical and clinical disclaimer for Sri Kannathal Home Care & Nursing Service.'
  });
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-slate-200 pb-6 space-y-3">
        <BrandLogo size="md" linkToHome={false} />
        <h1 className="text-3xl font-extrabold text-slate-900 font-heading pt-2">Medical & Clinical Disclaimer</h1>
      </div>

      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-6 rounded-3xl shadow-md space-y-2">
        <h2 className="text-lg font-bold flex items-center gap-2 font-heading">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          Clinical Procedure Notice
        </h2>
        <p className="text-sm font-semibold leading-relaxed">
          "{CLINICAL_DISCLAIMER_NOTICE}"
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 font-heading">1. Non-Emergency Home Care Service</h2>
          <p>
            <strong>{BUSINESS_INFO.nameTamil} ({BUSINESS_INFO.nameEnglish})</strong> provides home nursing assistance, elderly care, caregiver support, wound dressing, and post-discharge recovery care. Our services are designed for supportive home healthcare and are <strong>NOT a substitute for emergency hospital emergency care (ICU/ER)</strong>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 font-heading">2. Clinical Procedures Requirement</h2>
          <p>
            Clinical procedures such as IV infusions, catheter insertion/changes, Ryles tube insertion, surgical wound debridement, and tracheostomy care are executed strictly by certified nursing staff only upon presentation of valid doctor prescriptions or clinical orders.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 font-heading">3. Emergency Situations</h2>
          <p>
            In case of sudden life-threatening symptoms, chest pain, acute shortness of breath, severe trauma, or unresponsiveness, please immediately call <strong>108 Ambulance Services</strong> or transport the patient directly to the nearest hospital emergency room.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 font-heading">4. Contact & Consultation</h2>
          <p>
            For any clinical clarification prior to booking services, reach out to our nursing supervisor at <strong>{BUSINESS_INFO.phone1}</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};
