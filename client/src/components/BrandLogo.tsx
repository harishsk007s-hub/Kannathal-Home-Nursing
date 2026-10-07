import React from 'react';
import { Link } from 'react-router-dom';
import { BUSINESS_INFO } from '../utils/constants';

export interface BrandLogoProps {
  className?: string;
  imgClassName?: string;
  showText?: boolean;
  linkToHome?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'hero' | 'login';
  variant?: 'light' | 'dark';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  imgClassName = '',
  showText = true,
  linkToHome = true,
  size = 'md',
  variant = 'light',
}) => {
  /**
   * Responsive heights based on user specs:
   * Desktop: height between 32px and 44px
   * Mobile: height between 28px and 36px
   */
  const sizeClasses = {
    sm: 'h-7 sm:h-8', // Mobile: 28px | Desktop: 32px
    md: 'h-8 sm:h-10 lg:h-11', // Mobile: 32px | Desktop: 40px - 44px
    lg: 'h-9 sm:h-11 lg:h-12', // Mobile: 36px | Desktop: 44px - 48px
    hero: 'h-14 sm:h-20 lg:h-24', // Prominent display in Hero section
    login: 'h-14 sm:h-16', // Display in Login & Dashboard headers
  }[size];

  const logoContent = (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3.5 p-0.5 ${className}`}>
      <img
        src="/logo.png"
        alt={`${BUSINESS_INFO.nameTamil} | ${BUSINESS_INFO.nameEnglish}`}
        className={`object-contain transition-transform duration-200 group-hover:scale-105 shrink-0 filter drop-shadow-sm ${sizeClasses} ${imgClassName}`}
      />
      {showText && (
        <div className="flex flex-col text-left justify-center">
          <span
            className={`font-extrabold text-sm sm:text-base lg:text-lg leading-tight tracking-tight font-heading ${
              variant === 'dark' ? 'text-white' : 'text-emerald-950'
            }`}
          >
            {BUSINESS_INFO.nameTamil}
          </span>
          <span
            className={`text-[11px] sm:text-xs font-bold tracking-tight ${
              variant === 'dark' ? 'text-emerald-400' : 'text-slate-600'
            }`}
          >
            {BUSINESS_INFO.nameEnglish}
          </span>
        </div>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link
        to="/"
        className="group inline-block focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-xl"
        title={`${BUSINESS_INFO.nameTamil} - ${BUSINESS_INFO.nameEnglish}`}
      >
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};

export default BrandLogo;
