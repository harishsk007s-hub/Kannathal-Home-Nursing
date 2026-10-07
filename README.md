# ஸ்ரீ கண்ணாத்தாள் ஹோம் கேர் & நர்சிங் சர்வீஸ்
## Sri Kannathal Home Care & Nursing Service

A high-performance, responsive, **frontend-only** React + Vite + TypeScript + Tailwind CSS web application for **Sri Kannathal Home Care & Nursing Service**, based in Alanganallur, Madurai, Tamil Nadu.

---

## 🌟 Key Features

### Public Website
- **Sticky Bilingual Header**: Features Tamil (`ஸ்ரீ கண்ணாத்தாள் ஹோம் கேர் & நர்சிங் சர்வீஸ்`) and English branding with responsive drawer navigation.
- **Official Brand Logo Integration**: High-resolution, official emblem applied consistently across desktop header, mobile header, hero section, modals, footer, loading screens, and browser favicon.
- **Direct Phone & WhatsApp Integration**:
  - Phone 1: `+91 93600 86005` (`tel:+919360086005`)
  - Phone 2: `+91 93600 86006` (`tel:+919360086006`)
  - WhatsApp: `+91 86106 56514` (`https://wa.me/918610656514`)
- **Interactive Service Catalog**: Categorized services with live search, feature badges, and clinical procedure flags.
- **Clinical Procedure Safety Notice**: Prominently displays:
  > *"Clinical procedures are provided only by qualified healthcare professionals when clinically appropriate. Please consult your doctor before arranging any medical procedure."*
- **Floating Actions**:
  - Pulsing WhatsApp floating button (bottom-right).
  - Mobile bottom quick call bar (sticky on phone screens).
- **Patient & Family Feedback Page**: Interactive 5-star rating selector and verified review submission.
- **Google Maps Integration**: Direct directions link to `Near Ayyappan Temple, Thanichiyam Main Road, Alanganallur, Madurai`.
- **Pages Included**: Home, About Us, Services, Feedback, Contact, Privacy Policy, Medical Disclaimer, Admin Login, Admin Dashboard.

### Admin Demo Portal (Frontend Demo)
- **Local Authentication Demo**: Interactive admin login powered by `LocalStorage` / `SessionStorage`.
- **Enquiries Management**: Filter by status (`New`, `Contacted`, `In Progress`, `Completed`, `Cancelled`), search by patient name/phone, update statuses, and delete records.
- **Feedback Moderation**: Review user-submitted testimonials and toggle approval status before displaying on public pages.
- **Service Catalog Management**: Add new healthcare services, toggle active status, add feature tags, and assign clinical markers.

---

## 🚀 Quick Start Guide (Frontend-Only Execution)

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

### 1. Install Dependencies
Run the command below from the root folder:
```bash
npm install
```

### 2. Run Development Server
Run the dev script from the root directory to start the React Vite frontend (Port 5173):
```bash
npm run dev
```

The application will be available at: `http://localhost:5173`

---

## 🔑 Admin Portal Demo Credentials

- **URL**: `http://localhost:5173/admin/login`
- **Email**: `admin@srikannathal.com`
- **Password**: `Admin@12345`

---

## 🛠 Project Structure

```
/sri-kannathal-homecare
├── /client                    # Vite + React + TypeScript + Tailwind CSS Frontend
│   ├── /public                # Static brand assets & favicon (/logo.png)
│   ├── /src
│   │   ├── /components        # BrandLogo, Header, Footer, FloatingActions, EnquiryModal, ClinicalNotice
│   │   ├── /context           # AuthContext (Frontend demo session state)
│   │   ├── /pages             # Home, AboutUs, ServicesPage, FeedbackPage, ContactPage, etc.
│   │   ├── /services          # Client-side LocalStorage data service (api.ts)
│   │   ├── /types             # TypeScript models & interfaces
│   │   ├── /utils             # Business info constants and WhatsApp helpers
│   │   ├── App.tsx            # Main application routes
│   │   └── main.tsx
│   ├── .env
│   ├── index.html
│   └── package.json
│
├── package.json               # Root scripts (npm run dev, npm run build)
└── README.md
```

---

## 📞 Business Information
- **Business Name**: ஸ்ரீ கண்ணாத்தாள் ஹோம் கேர் & நர்சிங் சர்வீஸ்
- **English Name**: Sri Kannathal Home Care & Nursing Service
- **Phone 1**: +91 93600 86005
- **Phone 2**: +91 93600 86006
- **WhatsApp**: +91 86106 56514
- **Address**: Near Ayyappan Temple, Thanichiyam Main Road, Alanganallur, Madurai, Tamil Nadu – 625501
