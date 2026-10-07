import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import AdminUser from './models/AdminUser.js';
import ServiceCategory from './models/ServiceCategory.js';
import Service from './models/Service.js';
import Feedback from './models/Feedback.js';

dotenv.config();

export const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('Seeding initial data for Sri Kannathal Home Care...');

    // 1. Seed Admin User
    const existingAdmin = await AdminUser.findOne({ email: 'admin@srikannathal.com' });
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash('Admin@12345', salt);
      await AdminUser.create({
        name: 'Kannathal Admin',
        email: 'admin@srikannathal.com',
        passwordHash,
        role: 'superadmin',
      });
      console.log('✔ Initial Admin User created: admin@srikannathal.com / Admin@12345');
    } else {
      console.log('ℹ Admin user already exists.');
    }

    // 2. Seed Service Categories
    const categoriesData = [
      { name: 'Home Nursing Services', nameTamil: 'வீட்டு நர்சிங் சேவைகள்', slug: 'home-nursing', icon: 'Stethoscope', order: 1, description: 'Professional clinical and non-clinical nursing care delivered at your doorstep.' },
      { name: 'Elderly Care', nameTamil: 'முதியோர் பராமரிப்பு', slug: 'elderly-care', icon: 'UserCheck', order: 2, description: 'Dedicated assistance, mobility support, and daily routine assistance for seniors.' },
      { name: 'Baby and Newborn Care', nameTamil: 'குழந்தை மற்றும் பிறந்த குழந்தை பராமரிப்பு', slug: 'baby-newborn-care', icon: 'Baby', order: 3, description: 'Gentle, expert care for newborn infants and mothers.' },
      { name: 'Maternity and Delivery Care', nameTamil: 'பிரசவ மற்றும் கர்ப்பகால பராமரிப்பு', slug: 'maternity-care', icon: 'HeartHandshake', order: 4, description: 'Comprehensive pre-natal and post-natal home support.' },
      { name: 'Bedridden Patient Care', nameTamil: 'படுக்கையிலிருக்கும் நோயாளி பராமரிப்பு', slug: 'bedridden-patient-care', icon: 'Bed', order: 5, description: 'Round-the-clock hygiene, feeding, turning, and pressure-sore prevention care.' },
      { name: 'Attendant and Caregiver Services', nameTamil: 'உதவியாளர் மற்றும் பராமரிப்பாளர் சேவைகள்', slug: 'caregiver-services', icon: 'Users', order: 6, description: 'Male and female compassionate caregivers for 12-hour and 24-hour options.' },
      { name: 'Palliative and Compassionate Care', nameTamil: 'ஆறுதல் மற்றும் வலி நிவாரண பராமரிப்பு', slug: 'palliative-care', icon: 'ShieldHeart', order: 7, description: 'Empathetic care for chronic, stroke, and cancer patients.' },
      { name: 'Hospital-to-Home Support', nameTamil: 'மருத்துவமனையிலிருந்து வீடு திரும்பும் உதவி', slug: 'hospital-to-home', icon: 'Home', order: 8, description: 'Seamless transition assistance from hospital discharge to home recovery.' },
    ];

    for (const cat of categoriesData) {
      await ServiceCategory.findOneAndUpdate({ slug: cat.slug }, cat, { upsert: true, new: true });
    }
    console.log('✔ Service Categories seeded successfully.');

    // 3. Seed Detailed Services
    const servicesData = [
      // Home Nursing
      { name: 'Skilled Nursing Care', nameTamil: 'தகுதிவாய்ந்த நர்சிங் பராமரிப்பு', categoryName: 'Home Nursing Services', description: 'Certified nurses for medication, vitals monitoring, and clinical procedures.', isClinical: true, badge: 'Popular', features: ['Vitals check', 'Medication administration', 'Doctor consultation coordination'] },
      { name: 'Post-Surgical Care', nameTamil: 'அறுவை சிகிச்சைக்கு பிந்தைய பராமரிப்பு', categoryName: 'Home Nursing Services', description: 'Specialized post-op care to prevent complications and speed up recovery.', isClinical: true, features: ['Wound inspection', 'Infection prevention', 'Pain monitoring'] },
      { name: 'Medication Reminders & Assistance', nameTamil: 'மருந்து நினைவூட்டல் மற்றும் உதவி', categoryName: 'Home Nursing Services', description: 'Timely dispensing of prescribed medications and monitoring dosage.', isClinical: false, features: ['Dosage tracking', 'Oral medication', 'Family updates'] },
      { name: 'Wound Care & Surgical Dressing', nameTamil: 'காயப் பராமரிப்பு மற்றும் கட்டு போடுதல்', categoryName: 'Home Nursing Services', description: 'Clean, sterile dressing for surgical incisions and acute wounds.', isClinical: true, features: ['Sterile procedure', 'Infection control', 'Progress logging'] },
      { name: 'Diabetic Foot Dressing', nameTamil: 'சர்க்கரை நோய் புண் கட்டு போடுதல்', categoryName: 'Home Nursing Services', description: 'Specialized diabetic ulcer dressing and preventive foot care.', isClinical: true, features: ['Specialized dressing', 'Tissue healing monitoring', 'Hygiene instruction'] },
      { name: 'Bedsore Dressing', nameTamil: 'படுக்கைப் புண் பராமரிப்பு', categoryName: 'Home Nursing Services', description: 'Advanced stage 1-4 bedsore dressing, debridement care, and repositioning advice.', isClinical: true, features: ['Sterile dressing', 'Pressure relief guidance', 'Healing assessment'] },
      { name: 'Burn Dressing at Home', nameTamil: 'தீக்காயப் பராமரிப்பு', categoryName: 'Home Nursing Services', description: 'Gentle, soothing burn wound care and dressing to prevent contractures and infections.', isClinical: true, features: ['Pain reduction', 'Sterile bandaging', 'Ointment application'] },
      { name: 'Surgical Suture Removal', nameTamil: 'தையல் பிரித்தல் சேவை', categoryName: 'Home Nursing Services', description: 'Safe, painless removal of surgical stitches or staples at home by a qualified nurse.', isClinical: true, features: ['Stitch removal', 'Staple removal', 'Skin closure verification'] },
      { name: 'IV Infusion Support', nameTamil: 'நரம்பு வழி மருந்து மற்றும் குளுக்கோஸ்', categoryName: 'Home Nursing Services', description: 'Intravenous fluid infusion, IV antibiotic administration, and saline support.', isClinical: true, features: ['IV Line administration', 'Flow rate monitoring', 'Catheter maintenance'] },
      { name: 'Catheter Care', nameTamil: 'மூத்திரக் குழாய் பராமரிப்பு', categoryName: 'Home Nursing Services', description: 'Foley catheter insertion, bag cleaning, change, and urinary hygiene management.', isClinical: true, features: ['Catheter insertion & removal', 'Hygiene maintenance', 'Infection surveillance'] },
      { name: 'Ryles Tube Support', nameTamil: 'மூக்கு வழி உணவு குழாய் பராமரிப்பு', categoryName: 'Home Nursing Services', description: 'Ryles tube insertion, position verification, and tube feeding assistance.', isClinical: true, features: ['Nasogastric tube insertion', 'Enteral nutrition', 'Tube flushing'] },
      { name: 'Tracheostomy Care', nameTamil: 'டிராகியோஸ்டமி பராமரிப்பு', categoryName: 'Home Nursing Services', description: 'Suctioning, inner cannula cleaning, tracheostomy site dressing, and oxygen care.', isClinical: true, features: ['Airway clearance', 'Suctioning procedure', 'Stoma care'] },
      { name: 'Colostomy Patient Care', nameTamil: 'கொலோஸ்டமி பாய் பராமரிப்பு', categoryName: 'Home Nursing Services', description: 'Stoma bag replacement, skin barrier care, and colostomy hygiene support.', isClinical: true, features: ['Stoma bag changing', 'Peristomal skin care', 'Patient guidance'] },

      // Elderly Care
      { name: 'Elderly Daily Activity Assistance', nameTamil: 'முதியோர் அன்றாட உதவி', categoryName: 'Elderly Care', description: 'Assisting senior citizens with bathing, dressing, grooming, eating, and walking.', isClinical: false, badge: 'Popular', features: ['Personal hygiene assistance', 'Mealtime support', 'Companionship'] },
      { name: 'Mobility Support & Fall Prevention', nameTamil: 'நடமாட்டம் மற்றும் விழுதல் தடுப்பு', categoryName: 'Elderly Care', description: 'Assisting seniors with walking frames, wheelchairs, and safe transfer.', isClinical: false, features: ['Transfer assistance', 'Walking assistance', 'Home hazard checks'] },
      { name: 'Dementia & Alzheimer’s Support', nameTamil: 'மறதி நோய் பராமரிப்பு', categoryName: 'Elderly Care', description: 'Patient, calm caregivers trained to handle cognitive decline and confusion.', isClinical: false, features: ['Cognitive engagement', 'Safe environment', 'Emotional reassuring'] },

      // Baby & Newborn Care
      { name: 'Newborn Care & Bathing', nameTamil: 'பிறந்த குழந்தை குளியல் மற்றும் பராமரிப்பு', categoryName: 'Baby and Newborn Care', description: 'Gentle infant bath, skin hydration, diaper changing, and sleep routine guidance.', isClinical: false, badge: 'Recommended', features: ['Safe baby bath', 'Diaper rash prevention', 'Sleep routine support'] },
      { name: 'Infant Massage', nameTamil: 'குழந்தை எண்ணெய் மசாஜ்', categoryName: 'Baby and Newborn Care', description: 'Traditional oil massage for infants to boost circulation and relaxation.', isClinical: false, features: ['Organic oil application', 'Muscle relaxation', 'Colic relief massage'] },
      { name: 'Breastfeeding & Latch Support', nameTamil: 'தாய்ப்பால் புகட்டும் உதவி', categoryName: 'Baby and Newborn Care', description: 'Guidance for proper latching, breastfeeding positioning, and mother support.', isClinical: false, features: ['Latch technique assistance', 'Milk storage advice', 'Mother comfort'] },
      { name: 'Umbilical Cord Care', nameTamil: 'தொப்புள் கொடி பராமரிப்பு', categoryName: 'Baby and Newborn Care', description: 'Hygienic cord stump care to keep it clean and dry until natural separation.', isClinical: true, features: ['Antiseptic cleansing', 'Infection check', 'Drying protocol'] },

      // Maternity & Delivery Care
      { name: 'Postnatal Mother Care', nameTamil: 'பிரசவத்திற்கு பிந்தைய தாய் பராமரிப்பு', categoryName: 'Maternity and Delivery Care', description: 'Nourishing care, post-partum rest support, and health monitoring for new mothers.', isClinical: false, features: ['Mother rest assistance', 'Nutrition tracking', 'Vitals check'] },
      { name: 'C-Section Recovery Support', nameTamil: 'சிசேரியன் அறுவை சிகிச்சை மீட்சி உதவி', categoryName: 'Maternity and Delivery Care', description: 'Special care for mothers recovering from Caesarean delivery including incision dressing.', isClinical: true, features: ['Incision care', 'Pain relief comfort', 'Heavy lifting assistance'] },
      { name: 'Prenatal & Maternity Support', nameTamil: 'பிரசவத்திற்கு முந்தைய உதவி', categoryName: 'Maternity and Delivery Care', description: 'Comfort and daily routine assistance during late-term pregnancy.', isClinical: false, features: ['Pregnancy comfort', 'Mobility support', 'Family assistance'] },

      // Bedridden Care
      { name: 'Bedridden Patient Care', nameTamil: 'முழு படுக்கை நோயாளி பராமரிப்பு', categoryName: 'Bedridden Patient Care', description: 'Complete end-to-end care for total bed-bound patients.', isClinical: false, badge: 'Comprehensive', features: ['Bathing on bed', 'Sponge bath', 'Oral care', 'Bowel movement hygiene'] },
      { name: 'Feeding & Hygiene Support', nameTamil: 'உணவளித்தல் மற்றும் சுகாதாரப் பராமரிப்பு', categoryName: 'Bedridden Patient Care', description: 'Assisting with oral/tube feeding, oral hygiene, hair wash on bed, and linens change.', isClinical: false, features: ['Parenteral/oral feeding', 'Bed sheet replacement', 'Perineal care'] },
      { name: 'Turning & Repositioning', nameTamil: 'நோயாளி பக்கவாட்டில் திருப்புதல்', categoryName: 'Bedridden Patient Care', description: '2-hourly turning schedule to prevent painful pressure ulcers (bedsores).', isClinical: false, features: ['2-hour turning chart', 'Pillowing support', 'Skin checks'] },

      // Caregiver Services
      { name: 'Male & Female Caregivers', nameTamil: 'ஆண் மற்றும் பெண் பராமரிப்பாளர்கள்', categoryName: 'Attendant and Caregiver Services', description: 'Respectful, background-verified male and female patient attendants.', isClinical: false, badge: 'Flexible', features: ['Gender-specific care', 'Compassionate approach', 'Daily assistance'] },
      { name: '12-Hour & 24-Hour Caregiver Options', nameTamil: '12 மணி நேரம் / 24 மணி நேர பராமரிப்பு', categoryName: 'Attendant and Caregiver Services', description: 'Day shift, night shift, or 24/7 resident home caregiver support (subject to availability).', isClinical: false, features: ['Day & Night shifts', '24/7 Residential care', 'Subject to availability'] },

      // Palliative Care
      { name: 'Brain Stroke Patient Care', nameTamil: 'பரிசவாத / ஸ்ட்ரோக் நோயாளி பராமரிப்பு', categoryName: 'Palliative and Compassionate Care', description: 'Dedicated rehabilitative care, passive exercises, and emotional support for stroke survivors.', isClinical: false, features: ['Rehabilitation support', 'Speech encouragement', 'Passive stretching'] },
      { name: 'Cancer Patient Care', nameTamil: 'புற்றுநோய் நோயாளி ஆறுதல் பராமரிப்பு', categoryName: 'Palliative and Compassionate Care', description: 'Compassionate pain management support, hydration, and nutritional care for oncology patients.', isClinical: false, features: ['Pain comfort', 'Hydration care', 'Dignified compassionate support'] },
      { name: 'Palliative & Compassionate Support', nameTamil: 'ஆறுதல் சேவை', categoryName: 'Palliative and Compassionate Care', description: 'Enhancing life quality for chronic illness patients with dignity and warmth.', isClinical: false, features: ['Palliative attention', 'Family relief', 'Comfort measures'] },

      // Hospital-to-Home
      { name: 'Hospital Discharge Assistance', nameTamil: 'டிஸ்சார்ஜ் உதவி', categoryName: 'Hospital-to-Home Support', description: 'Helping transfer patient from hospital to home, equipment setup, and medication organization.', isClinical: false, features: ['Equipment setup', 'Transport assistance', 'Medication schedule setup'] },
      { name: 'Post-Hospital Home Support', nameTamil: 'வீட்டு மீட்சி சேவை', categoryName: 'Hospital-to-Home Support', description: 'First 2 weeks of intensive home support after major hospital treatment or surgery.', isClinical: false, features: ['Recovery monitoring', 'Emergency preparedness', 'Daily report'] },
    ];

    for (let i = 0; i < servicesData.length; i++) {
      const s = servicesData[i];
      await Service.findOneAndUpdate({ name: s.name }, { ...s, order: i + 1 }, { upsert: true, new: true });
    }
    console.log('✔ Services seeded successfully.');

    // 4. Seed Initial Approved Feedbacks
    const sampleFeedbacks = [
      {
        patientName: 'K. Ramanathan',
        serviceReceived: 'Elderly Care & Patient Attendant',
        rating: 5,
        reviewText: 'Sri Kannathal Nursing service provided exceptional 24-hour caregiver care for my elderly father in Alanganallur. Very polite, punctual, and attentive staff!',
        location: 'Alanganallur, Madurai',
        isApproved: true,
      },
      {
        patientName: 'Meenakshi Sundaram',
        serviceReceived: 'Post-Surgical Wound Dressing',
        rating: 5,
        reviewText: 'The nurse arrived on time every day for my diabetic foot dressing. Proper hygienic care and compassionate handling. Highly recommended in Madurai region!',
        location: 'Thanichiyam Road, Alanganallur',
        isApproved: true,
      },
      {
        patientName: 'S. Vijayalakshmi',
        serviceReceived: 'Newborn Baby & Mother Care',
        rating: 5,
        reviewText: 'Excellent support after my C-section delivery. The female caregiver handled baby bathing and mother care with extreme affection and expertise.',
        location: 'Madurai North',
        isApproved: true,
      },
    ];

    for (const f of sampleFeedbacks) {
      const exists = await Feedback.findOne({ patientName: f.patientName, serviceReceived: f.serviceReceived });
      if (!exists) {
        await Feedback.create(f);
      }
    }
    console.log('✔ Sample approved feedbacks seeded successfully.');

    console.log('🎉 Database seeding completed!');
  } catch (error: any) {
    console.error('Error during database seed:', error.message);
  }
};

// Standalone execution handler
if (process.argv[1] && (process.argv[1].endsWith('seed.ts') || process.argv[1].endsWith('seed.js'))) {
  seedDatabase().then(() => process.exit(0));
}


