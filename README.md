# ஸ்ரீ கண்ணாத்தாள் ஹோம் கேர் & நர்சிங் சர்வீஸ்
## Sri Kannathal Home Care & Nursing Service

A production-ready full-stack MERN (MongoDB, Express.js, React.js, Node.js, TypeScript, Tailwind CSS) web application for **Sri Kannathal Home Care & Nursing Service**, based in Alanganallur, Madurai, Tamil Nadu.

---

## 🌟 Key Features

### Public Website
- **Sticky Bilingual Header**: Features Tamil (`ஸ்ரீ கண்ணாத்தாள் ஹோம் கேர் & நர்சிங் சர்வீஸ்`) and English branding with responsive drawer navigation.
- **Direct Phone & WhatsApp Integration**:
  - Phone 1: `+91 93600 86005` (`tel:+919360086005`)
  - Phone 2: `+91 93600 86006` (`tel:+919360086006`)
  - WhatsApp: `+91 86106 56514` (`https://wa.me/918610656514?text=...`)
- **Interactive Service Catalog**: Categorized services with live search, feature badges, and clinical procedure flags.
- **Clinical Procedure Safety Notice**: Prominently displays:
  > *"Clinical procedures are provided only by qualified healthcare professionals when clinically appropriate. Please consult your doctor before arranging any medical procedure."*
- **Floating Actions**:
  - Pulsing WhatsApp floating button (bottom-right).
  - Mobile bottom quick call bar (bottom-left/sticky on phone screens).
- **Patient & Family Feedback Page**: Interactive 5-star rating selector and verified review submission.
- **Google Maps Integration**: Direct directions link to `Near Ayyappan Temple, Thanichiyam Main Road, Alanganallur, Madurai`.
- **Pages Included**: Home, About Us, Services, Feedback, Contact, Privacy Policy, Medical Disclaimer, Admin Login, Admin Dashboard.

### Admin Portal & REST APIs
- **JWT-based Authentication**: Secure admin login with password hashing (`bcryptjs`) and JWT bearer token verification.
- **Enquiries Management**: Filter by status (`New`, `Contacted`, `In Progress`, `Completed`, `Cancelled`), search by patient name/phone, update statuses, and delete records.
- **Feedback Moderation**: Review user-submitted testimonials and toggle approval status before displaying on public pages.
- **Service Catalog Management**: Add new healthcare services, toggle active status, add feature tags, and assign clinical markers.
- **Account Security**: Change admin password from the dashboard.

---

## 🚀 Quick Start Guide (Run on Localhost)

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)
- MongoDB instance running locally on `mongodb://127.0.0.1:27017` *(Note: If a local MongoDB daemon is not running, the application automatically launches an in-memory fallback database using `mongodb-memory-server` in dev mode so it runs out-of-the-box!)*

### 1. Install Dependencies
Run the command below from the root folder:
```bash
npm run install:all
```
*Or manually:*
```bash
npm install
cd server && npm install
cd ../client && npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` in both `/server` and `/client` directories:

**Server `.env` (`/server/.env`):**
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/srikannathal_db
JWT_SECRET=sri_kannathal_homecare_secret_key_2026_jwt_token_secure_98765
JWT_EXPIRES_IN=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

**Client `.env` (`/client/.env`):**
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Run Development Server
Run the dev script from the root directory to start both backend API (Port 5000) and React Vite frontend (Port 5173) concurrently:
```bash
npm run dev
```

### 4. Admin Access & Seed Credentials
The server automatically seeds default services, approved reviews, and the initial admin user upon boot. You can also manually re-run the seed script:
```bash
npm run seed
```

**Initial Admin Credentials:**
- **URL**: `http://localhost:5173/admin/login`
- **Email**: `admin@srikannathal.com`
- **Password**: `Admin@12345`

---

## 🛠 Project Structure

```
/sri-kannathal-homecare
├── /client                    # Vite + React + TypeScript + Tailwind CSS Frontend
│   ├── /src
│   │   ├── /components        # Header, Footer, FloatingActions, EnquiryModal, ClinicalNotice
│   │   ├── /context           # AuthContext (JWT Authentication state)
│   │   ├── /pages             # Home, AboutUs, ServicesPage, FeedbackPage, ContactPage, etc.
│   │   ├── /services          # API HTTP Service layer
│   │   ├── /types             # TypeScript models & interfaces
│   │   ├── /utils             # Business info constants and WhatsApp helpers
│   │   ├── App.tsx            # Main routes
│   │   └── main.tsx
│   ├── .env.example
│   ├── index.html
│   └── package.json
│
├── /server                    # Express.js + Node.js + Mongoose Backend API
│   ├── /src
│   │   ├── /config            # MongoDB connection + MongoMemoryServer fallback
│   │   ├── /controllers       # Auth, Services, Enquiries, Feedback controllers
│   │   ├── /middleware        # JWT Auth middleware
│   │   ├── /models            # Mongoose Schemas (AdminUser, Service, Category, Enquiry, Feedback)
│   │   ├── /routes            # Express router modules
│   │   ├── index.ts           # Express server setup
│   │   └── seed.ts            # Admin & Services seed script
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── package.json               # Root scripts (dev, build, start, seed)
└── README.md
```

---

## 📡 API Documentation Summary

### 1. Authentication Endpoints (`/api/auth`)
- `POST /api/auth/login` — Login admin with email & password, returns JWT token.
- `GET /api/auth/me` *(Protected)* — Get logged-in admin profile.
- `POST /api/auth/change-password` *(Protected)* — Change admin account password.

### 2. Services Endpoints (`/api/services`)
- `GET /api/services` — Fetch active services (supports category and search query filters).
- `GET /api/services/categories` — Fetch all service categories.
- `POST /api/services` *(Protected)* — Create a new healthcare service.
- `PUT /api/services/:id` *(Protected)* — Update an existing service.
- `DELETE /api/services/:id` *(Protected)* — Delete a service.

### 3. Enquiries Endpoints (`/api/enquiries`)
- `POST /api/enquiries` — Public submission of patient care enquiry.
- `GET /api/enquiries` *(Protected)* — Fetch all enquiries (supports status filter and search).
- `PATCH /api/enquiries/:id` *(Protected)* — Update enquiry status (`New` | `Contacted` | `In Progress` | `Completed` | `Cancelled`) or admin notes.
- `DELETE /api/enquiries/:id` *(Protected)* — Delete enquiry record.

### 4. Feedback Endpoints (`/api/feedbacks`)
- `GET /api/feedbacks` — Fetch approved public testimonials.
- `POST /api/feedbacks` — Public submission of family/patient review (default pending approval).
- `GET /api/feedbacks/all` *(Protected)* — Fetch all feedback submissions.
- `PATCH /api/feedbacks/:id/approve` *(Protected)* — Toggle feedback approval status.
- `DELETE /api/feedbacks/:id` *(Protected)* — Delete feedback submission.

---

## 📞 Business Information
- **Business Name**: ஸ்ரீ கண்ணாத்தாள் ஹோம் கேர் & நர்சிங் சர்வீஸ்
- **English Name**: Sri Kannathal Home Care & Nursing Service
- **Phone 1**: +91 93600 86005
- **Phone 2**: +91 93600 86006
- **WhatsApp**: +91 86106 56514
- **Address**: Near Ayyappan Temple, Thanichiyam Main Road, Alanganallur, Madurai, Tamil Nadu – 625501
