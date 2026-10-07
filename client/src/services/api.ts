import type { ServiceItem, ServiceCategory, Enquiry, Feedback, AdminUser } from '../types';

// Storage Keys
const STORAGE_KEYS = {
  SERVICES: 'sri_kannathal_services',
  FEEDBACKS: 'sri_kannathal_feedbacks',
  ENQUIRIES: 'sri_kannathal_enquiries',
  ADMIN_SESSION: 'sri_kannathal_admin_session',
  ADMIN_PASSWORD: 'sri_kannathal_admin_password',
};

// Initial Seed Data for Frontend Demo
const INITIAL_CATEGORIES: ServiceCategory[] = [
  { _id: 'cat-1', name: 'Home Nursing Services', nameTamil: 'வீட்டு நர்சிங் சேவைகள்', slug: 'home-nursing', icon: 'Stethoscope', order: 1, description: 'Professional clinical and non-clinical nursing care delivered at your doorstep.' },
  { _id: 'cat-2', name: 'Elderly Care', nameTamil: 'முதியோர் பராமரிப்பு', slug: 'elderly-care', icon: 'UserCheck', order: 2, description: 'Dedicated assistance, mobility support, and daily routine assistance for seniors.' },
  { _id: 'cat-3', name: 'Baby and Newborn Care', nameTamil: 'குழந்தை மற்றும் பிறந்த குழந்தை பராமரிப்பு', slug: 'baby-newborn-care', icon: 'Baby', order: 3, description: 'Gentle, expert care for newborn infants and mothers.' },
  { _id: 'cat-4', name: 'Maternity and Delivery Care', nameTamil: 'பிரசவ மற்றும் கர்ப்பகால பராமரிப்பு', slug: 'maternity-care', icon: 'HeartHandshake', order: 4, description: 'Comprehensive pre-natal and post-natal home support.' },
  { _id: 'cat-5', name: 'Bedridden Patient Care', nameTamil: 'படுக்கையிலிருக்கும் நோயாளி பராமரிப்பு', slug: 'bedridden-patient-care', icon: 'Bed', order: 5, description: 'Round-the-clock hygiene, feeding, turning, and pressure-sore prevention care.' },
  { _id: 'cat-6', name: 'Attendant and Caregiver Services', nameTamil: 'உதவியாளர் மற்றும் பராமரிப்பாளர் சேவைகள்', slug: 'caregiver-services', icon: 'Users', order: 6, description: 'Male and female compassionate caregivers for 12-hour and 24-hour options.' },
  { _id: 'cat-7', name: 'Palliative and Compassionate Care', nameTamil: 'ஆறுதல் மற்றும் வலி நிவாரண பராமரிப்பு', slug: 'palliative-care', icon: 'ShieldHeart', order: 7, description: 'Empathetic care for chronic, stroke, and cancer patients.' },
  { _id: 'cat-8', name: 'Hospital-to-Home Support', nameTamil: 'மருத்துவமனையிலிருந்து வீடு திரும்பும் உதவி', slug: 'hospital-to-home', icon: 'Home', order: 8, description: 'Seamless transition assistance from hospital discharge to home recovery.' },
];

const INITIAL_SERVICES: ServiceItem[] = [
  { _id: 's-1', name: 'Skilled Nursing Care', nameTamil: 'தகுதிவாய்ந்த நர்சிங் பராமரிப்பு', categoryName: 'Home Nursing Services', description: 'Certified nurses for medication, vitals monitoring, and clinical procedures.', isClinical: true, badge: 'Popular', features: ['Vitals check', 'Medication administration', 'Doctor consultation coordination'], isActive: true, order: 1 },
  { _id: 's-2', name: 'Post-Surgical Care', nameTamil: 'அறுவை சிகிச்சைக்கு பிந்தைய பராமரிப்பு', categoryName: 'Home Nursing Services', description: 'Specialized post-op care to prevent complications and speed up recovery.', isClinical: true, features: ['Wound inspection', 'Infection prevention', 'Pain monitoring'], isActive: true, order: 2 },
  { _id: 's-3', name: 'Medication Reminders & Assistance', nameTamil: 'மருந்து நினைவூட்டல் மற்றும் உதவி', categoryName: 'Home Nursing Services', description: 'Timely dispensing of prescribed medications and monitoring dosage.', isClinical: false, features: ['Dosage tracking', 'Oral medication', 'Family updates'], isActive: true, order: 3 },
  { _id: 's-4', name: 'Wound Care & Surgical Dressing', nameTamil: 'காயப் பராமரிப்பு மற்றும் கட்டு போடுதல்', categoryName: 'Home Nursing Services', description: 'Clean, sterile dressing for surgical incisions and acute wounds.', isClinical: true, features: ['Sterile procedure', 'Infection control', 'Progress logging'], isActive: true, order: 4 },
  { _id: 's-5', name: 'Diabetic Foot Dressing', nameTamil: 'சர்க்கரை நோய் புண் கட்டு போடுதல்', categoryName: 'Home Nursing Services', description: 'Specialized diabetic ulcer dressing and preventive foot care.', isClinical: true, features: ['Specialized dressing', 'Tissue healing monitoring', 'Hygiene instruction'], isActive: true, order: 5 },
  { _id: 's-6', name: 'Bedsore Dressing', nameTamil: 'படுக்கைப் புண் பராமரிப்பு', categoryName: 'Home Nursing Services', description: 'Advanced stage 1-4 bedsore dressing, debridement care, and repositioning advice.', isClinical: true, features: ['Sterile dressing', 'Pressure relief guidance', 'Healing assessment'], isActive: true, order: 6 },
  { _id: 's-7', name: 'Burn Dressing at Home', nameTamil: 'தீக்காயப் பராமரிப்பு', categoryName: 'Home Nursing Services', description: 'Gentle, soothing burn wound care and dressing to prevent contractures and infections.', isClinical: true, features: ['Pain reduction', 'Sterile bandaging', 'Ointment application'], isActive: true, order: 7 },
  { _id: 's-8', name: 'Surgical Suture Removal', nameTamil: 'தையல் பிரித்தல் சேவை', categoryName: 'Home Nursing Services', description: 'Safe, painless removal of surgical stitches or staples at home by a qualified nurse.', isClinical: true, features: ['Stitch removal', 'Staple removal', 'Skin closure verification'], isActive: true, order: 8 },
  { _id: 's-9', name: 'IV Infusion Support', nameTamil: 'நரம்பு வழி மருந்து மற்றும் குளுக்கோஸ்', categoryName: 'Home Nursing Services', description: 'Intravenous fluid infusion, IV antibiotic administration, and saline support.', isClinical: true, features: ['IV Line administration', 'Flow rate monitoring', 'Catheter maintenance'], isActive: true, order: 9 },
  { _id: 's-10', name: 'Catheter Care', nameTamil: 'மூத்திரக் குழாய் பராமரிப்பு', categoryName: 'Home Nursing Services', description: 'Foley catheter insertion, bag cleaning, change, and urinary hygiene management.', isClinical: true, features: ['Catheter insertion & removal', 'Hygiene maintenance', 'Infection surveillance'], isActive: true, order: 10 },
  { _id: 's-11', name: 'Ryles Tube Support', nameTamil: 'மூக்கு வழி உணவு குழாய் பராமரிப்பு', categoryName: 'Home Nursing Services', description: 'Ryles tube insertion, position verification, and tube feeding assistance.', isClinical: true, features: ['Nasogastric tube insertion', 'Enteral nutrition', 'Tube flushing'], isActive: true, order: 11 },
  { _id: 's-12', name: 'Tracheostomy Care', nameTamil: 'டிராகியோஸ்டமி பராமரிப்பு', categoryName: 'Home Nursing Services', description: 'Suctioning, inner cannula cleaning, tracheostomy site dressing, and oxygen care.', isClinical: true, features: ['Airway clearance', 'Suctioning procedure', 'Stoma care'], isActive: true, order: 12 },
  { _id: 's-13', name: 'Colostomy Patient Care', nameTamil: 'கொலோஸ்டமி பாய் பராமரிப்பு', categoryName: 'Home Nursing Services', description: 'Stoma bag replacement, skin barrier care, and colostomy hygiene support.', isClinical: true, features: ['Stoma bag changing', 'Peristomal skin care', 'Patient guidance'], isActive: true, order: 13 },
  { _id: 's-14', name: 'Elderly Daily Activity Assistance', nameTamil: 'முதியோர் அன்றாட உதவி', categoryName: 'Elderly Care', description: 'Assisting senior citizens with bathing, dressing, grooming, eating, and walking.', isClinical: false, badge: 'Popular', features: ['Personal hygiene assistance', 'Mealtime support', 'Companionship'], isActive: true, order: 14 },
  { _id: 's-15', name: 'Mobility Support & Fall Prevention', nameTamil: 'நடமாட்டம் மற்றும் விழுதல் தடுப்பு', categoryName: 'Elderly Care', description: 'Assisting seniors with walking frames, wheelchairs, and safe transfer.', isClinical: false, features: ['Transfer assistance', 'Walking assistance', 'Home hazard checks'], isActive: true, order: 15 },
  { _id: 's-16', name: 'Dementia & Alzheimer’s Support', nameTamil: 'மறதி நோய் பராமரிப்பு', categoryName: 'Elderly Care', description: 'Patient, calm caregivers trained to handle cognitive decline and confusion.', isClinical: false, features: ['Cognitive engagement', 'Safe environment', 'Emotional reassuring'], isActive: true, order: 16 },
  { _id: 's-17', name: 'Newborn Care & Bathing', nameTamil: 'பிறந்த குழந்தை குளியல் மற்றும் பராமரிப்பு', categoryName: 'Baby and Newborn Care', description: 'Gentle infant bath, skin hydration, diaper changing, and sleep routine guidance.', isClinical: false, badge: 'Recommended', features: ['Safe baby bath', 'Diaper rash prevention', 'Sleep routine support'], isActive: true, order: 17 },
  { _id: 's-18', name: 'Infant Massage', nameTamil: 'குழந்தை எண்ணெய் மசாஜ்', categoryName: 'Baby and Newborn Care', description: 'Traditional oil massage for infants to boost circulation and relaxation.', isClinical: false, features: ['Organic oil application', 'Muscle relaxation', 'Colic relief massage'], isActive: true, order: 18 },
  { _id: 's-19', name: 'Breastfeeding & Latch Support', nameTamil: 'தாய்ப்பால் புகட்டும் உதவி', categoryName: 'Baby and Newborn Care', description: 'Guidance for proper latching, breastfeeding positioning, and mother support.', isClinical: false, features: ['Latch technique assistance', 'Milk storage advice', 'Mother comfort'], isActive: true, order: 19 },
  { _id: 's-20', name: 'Umbilical Cord Care', nameTamil: 'தொப்புள் கொடி பராமரிப்பு', categoryName: 'Baby and Newborn Care', description: 'Hygienic cord stump care to keep it clean and dry until natural separation.', isClinical: true, features: ['Antiseptic cleansing', 'Infection check', 'Drying protocol'], isActive: true, order: 20 },
  { _id: 's-21', name: 'Postnatal Mother Care', nameTamil: 'பிரசவத்திற்கு பிந்தைய தாய் பராமரிப்பு', categoryName: 'Maternity and Delivery Care', description: 'Nourishing care, post-partum rest support, and health monitoring for new mothers.', isClinical: false, features: ['Mother rest assistance', 'Nutrition tracking', 'Vitals check'], isActive: true, order: 21 },
  { _id: 's-22', name: 'C-Section Recovery Support', nameTamil: 'சிசேரியன் அறுவை சிகிச்சை மீட்சி உதவி', categoryName: 'Maternity and Delivery Care', description: 'Special care for mothers recovering from Caesarean delivery including incision dressing.', isClinical: true, features: ['Incision care', 'Pain relief comfort', 'Heavy lifting assistance'], isActive: true, order: 22 },
  { _id: 's-23', name: 'Prenatal & Maternity Support', nameTamil: 'பிரசவத்திற்கு முந்தைய உதவி', categoryName: 'Maternity and Delivery Care', description: 'Comfort and daily routine assistance during late-term pregnancy.', isClinical: false, features: ['Pregnancy comfort', 'Mobility support', 'Family assistance'], isActive: true, order: 23 },
  { _id: 's-24', name: 'Bedridden Patient Care', nameTamil: 'முழு படுக்கை நோயாளி பராமரிப்பு', categoryName: 'Bedridden Patient Care', description: 'Complete end-to-end care for total bed-bound patients.', isClinical: false, badge: 'Comprehensive', features: ['Bathing on bed', 'Sponge bath', 'Oral care', 'Bowel movement hygiene'], isActive: true, order: 24 },
  { _id: 's-25', name: 'Feeding & Hygiene Support', nameTamil: 'உணவளித்தல் மற்றும் சுகாதாரப் பராமரிப்பு', categoryName: 'Bedridden Patient Care', description: 'Assisting with oral/tube feeding, oral hygiene, hair wash on bed, and linens change.', isClinical: false, features: ['Parenteral/oral feeding', 'Bed sheet replacement', 'Perineal care'], isActive: true, order: 25 },
  { _id: 's-26', name: 'Turning & Repositioning', nameTamil: 'நோயாளி பக்கவாட்டில் திருப்புதல்', categoryName: 'Bedridden Patient Care', description: '2-hourly turning schedule to prevent painful pressure ulcers (bedsores).', isClinical: false, features: ['2-hour turning chart', 'Pillowing support', 'Skin checks'], isActive: true, order: 26 },
  { _id: 's-27', name: 'Male & Female Caregivers', nameTamil: 'ஆண் மற்றும் பெண் பராமரிப்பாளர்கள்', categoryName: 'Attendant and Caregiver Services', description: 'Respectful, background-verified male and female patient attendants.', isClinical: false, badge: 'Flexible', features: ['Gender-specific care', 'Compassionate approach', 'Daily assistance'], isActive: true, order: 27 },
  { _id: 's-28', name: '12-Hour & 24-Hour Caregiver Options', nameTamil: '12 மணி நேரம் / 24 மணி நேர பராமரிப்பு', categoryName: 'Attendant and Caregiver Services', description: 'Day shift, night shift, or 24/7 resident home caregiver support (subject to availability).', isClinical: false, features: ['Day & Night shifts', '24/7 Residential care', 'Subject to availability'], isActive: true, order: 28 },
  { _id: 's-29', name: 'Brain Stroke Patient Care', nameTamil: 'பரிசவாத / ஸ்ட்ரோக் நோயாளி பராமரிப்பு', categoryName: 'Palliative and Compassionate Care', description: 'Dedicated rehabilitative care, passive exercises, and emotional support for stroke survivors.', isClinical: false, features: ['Rehabilitation support', 'Speech encouragement', 'Passive stretching'], isActive: true, order: 29 },
  { _id: 's-30', name: 'Cancer Patient Care', nameTamil: 'புற்றுநோய் நோயாளி ஆறுதல் பராமரிப்பு', categoryName: 'Palliative and Compassionate Care', description: 'Compassionate pain management support, hydration, and nutritional care for oncology patients.', isClinical: false, features: ['Pain comfort', 'Hydration care', 'Dignified compassionate support'], isActive: true, order: 30 },
  { _id: 's-31', name: 'Palliative & Compassionate Support', nameTamil: 'ஆறுதல் சேவை', categoryName: 'Palliative and Compassionate Care', description: 'Enhancing life quality for chronic illness patients with dignity and warmth.', isClinical: false, features: ['Palliative attention', 'Family relief', 'Comfort measures'], isActive: true, order: 31 },
  { _id: 's-32', name: 'Hospital Discharge Assistance', nameTamil: 'டிஸ்சார்ஜ் உதவி', categoryName: 'Hospital-to-Home Support', description: 'Helping transfer patient from hospital to home, equipment setup, and medication organization.', isClinical: false, features: ['Equipment setup', 'Transport assistance', 'Medication schedule setup'], isActive: true, order: 32 },
  { _id: 's-33', name: 'Post-Hospital Home Support', nameTamil: 'வீட்டு மீட்சி சேவை', categoryName: 'Hospital-to-Home Support', description: 'First 2 weeks of intensive home support after major hospital treatment or surgery.', isClinical: false, features: ['Recovery monitoring', 'Emergency preparedness', 'Daily report'], isActive: true, order: 33 },
];

const INITIAL_FEEDBACKS: Feedback[] = [
  {
    _id: 'fb-1',
    patientName: 'K. Ramanathan',
    serviceReceived: 'Elderly Care & Patient Attendant',
    rating: 5,
    reviewText: 'Sri Kannathal Nursing service provided exceptional 24-hour caregiver care for my elderly father in Alanganallur. Very polite, punctual, and attentive staff!',
    location: 'Alanganallur, Madurai',
    isApproved: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'fb-2',
    patientName: 'Meenakshi Sundaram',
    serviceReceived: 'Post-Surgical Wound Dressing',
    rating: 5,
    reviewText: 'The nurse arrived on time every day for my diabetic foot dressing. Proper hygienic care and compassionate handling. Highly recommended in Madurai region!',
    location: 'Thanichiyam Road, Alanganallur',
    isApproved: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'fb-3',
    patientName: 'S. Vijayalakshmi',
    serviceReceived: 'Newborn Baby & Mother Care',
    rating: 5,
    reviewText: 'Excellent support after my C-section delivery. The female caregiver handled baby bathing and mother care with extreme affection and expertise.',
    location: 'Madurai North',
    isApproved: true,
    createdAt: new Date().toISOString(),
  },
];

const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    _id: 'enq-1',
    name: 'S. Shanmugam',
    phone: '9360086005',
    altPhone: '9360086006',
    serviceRequested: 'Elderly Daily Activity Assistance',
    address: 'Thanichiyam Main Road, Alanganallur',
    message: 'Looking for 12-hour day attendant for elderly mother.',
    status: 'New',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    _id: 'enq-2',
    name: 'P. Anand',
    phone: '8610656514',
    serviceRequested: 'Wound Care & Surgical Dressing',
    address: 'Alanganallur, Madurai',
    message: 'Post-op wound dressing required daily for 1 week.',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];

// Helper functions for LocalStorage persistence
const getStored = <T>(key: string, defaultVal: T): T => {
  try {
    const data = localStorage.getItem(key);
    if (!data) {
      localStorage.setItem(key, JSON.stringify(defaultVal));
      return defaultVal;
    }
    return JSON.parse(data);
  } catch (err) {
    return defaultVal;
  }
};

const setStored = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('LocalStorage write error:', err);
  }
};

// Initialize Storage Defaults on Load
getStored(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
getStored(STORAGE_KEYS.FEEDBACKS, INITIAL_FEEDBACKS);
getStored(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
if (!localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD)) {
  localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, 'Admin@12345');
}

export const apiService = {
  // Public API methods (Frontend Local Data)
  async fetchCategories(): Promise<ServiceCategory[]> {
    return INITIAL_CATEGORIES;
  },

  async fetchServices(category?: string, search?: string): Promise<ServiceItem[]> {
    const allServices = getStored<ServiceItem[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
    return allServices.filter((service) => {
      const matchesActive = service.isActive !== false;
      const matchesCategory = !category || category === 'All' || service.categoryName === category;
      const matchesSearch =
        !search ||
        service.name.toLowerCase().includes(search.toLowerCase()) ||
        (service.nameTamil && service.nameTamil.toLowerCase().includes(search.toLowerCase())) ||
        service.description.toLowerCase().includes(search.toLowerCase());
      return matchesActive && matchesCategory && matchesSearch;
    });
  },

  async submitEnquiry(enquiryData: {
    name: string;
    phone: string;
    altPhone?: string;
    serviceRequested: string;
    address?: string;
    message?: string;
  }): Promise<{ message: string; data: Enquiry }> {
    const existing = getStored<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
    const nowIso = new Date().toISOString();
    const newEnquiry: Enquiry = {
      _id: 'enq-' + Date.now(),
      ...enquiryData,
      status: 'New',
      createdAt: nowIso,
      updatedAt: nowIso,
    };
    const updated = [newEnquiry, ...existing];
    setStored(STORAGE_KEYS.ENQUIRIES, updated);
    return {
      message: 'Enquiry submitted successfully! Our care team will call you back shortly.',
      data: newEnquiry,
    };
  },

  async fetchApprovedFeedbacks(): Promise<Feedback[]> {
    const allFeedbacks = getStored<Feedback[]>(STORAGE_KEYS.FEEDBACKS, INITIAL_FEEDBACKS);
    return allFeedbacks.filter((f) => f.isApproved);
  },

  async submitFeedback(feedbackData: {
    patientName: string;
    serviceReceived: string;
    rating: number;
    reviewText: string;
    location?: string;
  }): Promise<{ message: string; data: Feedback }> {
    const existing = getStored<Feedback[]>(STORAGE_KEYS.FEEDBACKS, INITIAL_FEEDBACKS);
    const newFeedback: Feedback = {
      _id: 'fb-' + Date.now(),
      ...feedbackData,
      isApproved: true, // Approved immediately for interactive demo responsiveness
      createdAt: new Date().toISOString(),
    };
    const updated = [newFeedback, ...existing];
    setStored(STORAGE_KEYS.FEEDBACKS, updated);
    return {
      message: 'Thank you! Your feedback review has been submitted and published.',
      data: newFeedback,
    };
  },

  // Admin Auth Methods (Frontend Demo Session)
  async loginAdmin(credentials: { email: string; password: string }): Promise<{ token: string; user: AdminUser }> {
    const storedPassword = localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD) || 'Admin@12345';
    
    if (
      credentials.email.toLowerCase().trim() === 'admin@srikannathal.com' &&
      credentials.password === storedPassword
    ) {
      const demoUser: AdminUser = {
        id: 'admin-101',
        name: 'Kannathal Admin',
        email: 'admin@srikannathal.com',
        role: 'admin',
      };
      const session = {
        token: 'demo_frontend_jwt_token_2026',
        user: demoUser,
        isAuthenticated: true,
      };
      setStored(STORAGE_KEYS.ADMIN_SESSION, session);
      return { token: session.token, user: demoUser };
    }

    throw new Error('Invalid email or password. Please use admin@srikannathal.com / Admin@12345');
  },

  async logoutAdmin(): Promise<void> {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
  },

  async checkAdminAuth(): Promise<AdminUser> {
    const session = getStored<{ token: string; user: AdminUser; isAuthenticated: boolean } | null>(
      STORAGE_KEYS.ADMIN_SESSION,
      null
    );
    if (session && session.isAuthenticated && session.user) {
      return session.user;
    }
    throw new Error('Not authenticated');
  },

  async changeAdminPassword(passwords: { currentPassword: string; newPassword: string }): Promise<{ message: string }> {
    const storedPassword = localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD) || 'Admin@12345';
    if (passwords.currentPassword !== storedPassword) {
      throw new Error('Incorrect current password.');
    }
    if (passwords.newPassword.length < 6) {
      throw new Error('New password must be at least 6 characters long.');
    }
    localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, passwords.newPassword);
    return { message: 'Admin password updated successfully (Demo Mode).' };
  },

  // Admin Protected Enquiries Management
  async fetchAllEnquiriesAdmin(status?: string, search?: string): Promise<Enquiry[]> {
    const all = getStored<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
    return all.filter((e) => {
      const matchesStatus = !status || status === 'All' || e.status === status;
      const matchesSearch =
        !search ||
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.phone.includes(search) ||
        e.serviceRequested.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  },

  async updateEnquiryStatusAdmin(id: string, status: string, adminNotes?: string): Promise<Enquiry> {
    const all = getStored<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
    let updatedItem: Enquiry | null = null;
    const validStatus = status as 'New' | 'Contacted' | 'In Progress' | 'Completed' | 'Cancelled';
    const updated = all.map((item) => {
      if (item._id === id) {
        updatedItem = {
          ...item,
          status: validStatus,
          updatedAt: new Date().toISOString(),
          ...(adminNotes !== undefined ? { adminNotes } : {}),
        };
        return updatedItem;
      }
      return item;
    });
    setStored(STORAGE_KEYS.ENQUIRIES, updated);
    if (!updatedItem) throw new Error('Enquiry record not found.');
    return updatedItem;
  },

  async deleteEnquiryAdmin(id: string): Promise<void> {
    const all = getStored<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
    const updated = all.filter((item) => item._id !== id);
    setStored(STORAGE_KEYS.ENQUIRIES, updated);
  },

  // Admin Protected Feedback Management
  async fetchAllFeedbacksAdmin(): Promise<Feedback[]> {
    return getStored<Feedback[]>(STORAGE_KEYS.FEEDBACKS, INITIAL_FEEDBACKS);
  },

  async toggleApproveFeedbackAdmin(id: string): Promise<Feedback> {
    const all = getStored<Feedback[]>(STORAGE_KEYS.FEEDBACKS, INITIAL_FEEDBACKS);
    let updatedItem: Feedback | null = null;
    const updated = all.map((item) => {
      if (item._id === id) {
        updatedItem = { ...item, isApproved: !item.isApproved };
        return updatedItem;
      }
      return item;
    });
    setStored(STORAGE_KEYS.FEEDBACKS, updated);
    if (!updatedItem) throw new Error('Feedback review not found.');
    return updatedItem;
  },

  async deleteFeedbackAdmin(id: string): Promise<void> {
    const all = getStored<Feedback[]>(STORAGE_KEYS.FEEDBACKS, INITIAL_FEEDBACKS);
    const updated = all.filter((item) => item._id !== id);
    setStored(STORAGE_KEYS.FEEDBACKS, updated);
  },

  // Admin Protected Services Management
  async fetchAllServicesAdmin(): Promise<ServiceItem[]> {
    return getStored<ServiceItem[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  },

  async createServiceAdmin(serviceData: Partial<ServiceItem>): Promise<ServiceItem> {
    const all = getStored<ServiceItem[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
    const newService: ServiceItem = {
      _id: 's-' + Date.now(),
      name: serviceData.name || 'New Service',
      nameTamil: serviceData.nameTamil || '',
      categoryName: serviceData.categoryName || 'Home Nursing Services',
      description: serviceData.description || '',
      isClinical: serviceData.isClinical || false,
      badge: serviceData.badge,
      features: serviceData.features || [],
      isActive: true,
      order: all.length + 1,
    };
    const updated = [newService, ...all];
    setStored(STORAGE_KEYS.SERVICES, updated);
    return newService;
  },

  async updateServiceAdmin(id: string, serviceData: Partial<ServiceItem>): Promise<ServiceItem> {
    const all = getStored<ServiceItem[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
    let updatedItem: ServiceItem | null = null;
    const updated = all.map((item) => {
      if (item._id === id) {
        updatedItem = { ...item, ...serviceData };
        return updatedItem;
      }
      return item;
    });
    setStored(STORAGE_KEYS.SERVICES, updated);
    if (!updatedItem) throw new Error('Service not found.');
    return updatedItem;
  },

  async deleteServiceAdmin(id: string): Promise<void> {
    const all = getStored<ServiceItem[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
    const updated = all.filter((item) => item._id !== id);
    setStored(STORAGE_KEYS.SERVICES, updated);
  },
};
