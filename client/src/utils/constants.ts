export const BUSINESS_INFO = {
  nameTamil: 'ஸ்ரீ கண்ணாத்தாள் ஹோம் கேர் & நர்சிங் சர்வீஸ்',
  nameEnglish: 'Sri Kannathal Home Care & Nursing Service',
  tagline: 'Compassionate, Professional & Reliable Healthcare at Your Doorstep',
  type: 'Home Healthcare Service Provider',
  phone1: '+91 93600 86005',
  phone1Raw: '+919360086005',
  phone1Link: 'tel:+919360086005',
  phone2: '+91 93600 86006',
  phone2Raw: '+919360086006',
  phone2Link: 'tel:+919360086006',
  whatsappNumber: '+91 86106 56514',
  whatsappRaw: '918610656514',
  address: 'Near Ayyappan Temple, Thanichiyam Main Road, Alanganallur, Madurai, Tamil Nadu – 625501',
  serviceAreas: 'Alanganallur and nearby areas of Madurai, subject to availability',
  googleMapsUrl: "https://www.google.com/maps/place/10%C2%B002'43.9%22N+78%C2%B005'02.2%22E/@10.0455314,78.0813763,17z/data=!3m1!4b1!4m4!3m3!8m2!3d10.0455314!4d78.0839512?hl=en&entry=ttu&g_ep=EgoyMDI2MTAwNS4wIKXMDSoASAFQAw%",
  workingHours: '24 Hours / 7 Days Caregiver & Nursing Support',
};

export const CLINICAL_DISCLAIMER_NOTICE = 
  'Clinical procedures are provided only by qualified healthcare professionals when clinically appropriate. Please consult your doctor before arranging any medical procedure.';

export const defaultWhatsappMsg = 'Hello Sri Kannathal Home Care and Nursing Service, I would like to know more about your services.';

export const getWhatsappUrl = (customMessage?: string): string => {
  const message = customMessage || defaultWhatsappMsg;
  return `https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(message)}`;
};
