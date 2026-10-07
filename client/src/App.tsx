import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';

import { Home } from './pages/Home';
import { AboutUs } from './pages/AboutUs';
import { ServicesPage } from './pages/ServicesPage';
import { FeedbackPage } from './pages/FeedbackPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { MedicalDisclaimer } from './pages/MedicalDisclaimer';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/feedback" element={<FeedbackPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/disclaimer" element={<MedicalDisclaimer />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
          <FloatingActions />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
