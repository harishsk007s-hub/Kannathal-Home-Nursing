import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { BUSINESS_INFO, getWhatsappUrl } from '../utils/constants';

export const FloatingActions: React.FC = () => {
  return (
    <>
      {/* Floating WhatsApp Button (Bottom-Right) */}
      <a
        href={getWhatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 sm:p-4 rounded-full shadow-2xl pulse-glow transition-transform transform hover:scale-110 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
        title="Chat with Sri Kannathal Care Team on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
          Chat on WhatsApp
        </span>
      </a>

      {/* Floating Mobile Sticky Call Bar (Bottom Fixed on Small Screens) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t border-slate-800 p-2.5 flex items-center justify-around gap-2 shadow-2xl">
        <a
          href={BUSINESS_INFO.phone1Link}
          className="flex-1 bg-emerald-600 active:bg-emerald-700 text-white py-2.5 px-3 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 shadow"
        >
          <Phone className="w-4 h-4" />
          Call: 93600 86005
        </a>
        <a
          href={getWhatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-teal-700 active:bg-teal-800 text-white py-2.5 px-3 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 shadow"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp Care
        </a>
      </div>
    </>
  );
};
