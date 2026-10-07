import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';
import { CLINICAL_DISCLAIMER_NOTICE } from '../utils/constants';

interface ClinicalDisclaimerNoticeProps {
  compact?: boolean;
}

export const ClinicalDisclaimerNotice: React.FC<ClinicalDisclaimerNoticeProps> = ({ compact }) => {
  if (compact) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 flex items-start gap-2.5 my-3">
        <Info className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
        <p className="font-medium leading-relaxed">{CLINICAL_DISCLAIMER_NOTICE}</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-l-4 border-amber-500 rounded-xl p-4 sm:p-5 shadow-sm my-6">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-amber-100 rounded-lg text-amber-700 shrink-0">
          <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h4 className="text-amber-900 font-bold text-sm sm:text-base flex items-center gap-1.5 font-heading">
            Clinical Procedure Disclaimer & Safety Notice
          </h4>
          <p className="text-amber-800 text-xs sm:text-sm mt-1 leading-relaxed font-medium">
            "{CLINICAL_DISCLAIMER_NOTICE}"
          </p>
        </div>
      </div>
    </div>
  );
};
