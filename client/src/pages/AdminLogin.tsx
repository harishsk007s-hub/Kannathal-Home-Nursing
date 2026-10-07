import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Key, AlertCircle } from 'lucide-react';
import { apiService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { BUSINESS_INFO } from '../utils/constants';

import { BrandLogo } from '../components/BrandLogo';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@srikannathal.com');
  const [password, setPassword] = useState('Admin@12345');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const data = await apiService.loginAdmin({ email, password });
      login(data.token, data.user);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-emerald-950 p-8 text-white text-center space-y-3">
          <div className="flex justify-center">
            <BrandLogo variant="dark" size="login" showText={false} linkToHome={false} className="bg-white/10 p-2 rounded-2xl border border-white/20 shadow-md" />
          </div>
          <h1 className="text-xl font-extrabold font-heading">Admin Portal Login</h1>
          <p className="text-xs text-slate-300 font-medium">{BUSINESS_INFO.nameEnglish}</p>
        </div>

        {/* Login Form */}
        <div className="p-8 space-y-6">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 font-medium leading-relaxed">
            <span className="font-bold text-amber-800 uppercase block mb-0.5">ℹ Localhost Frontend Demo Mode</span>
            This login is a client-side demo state stored in browser LocalStorage.
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@srikannathal.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium text-slate-800"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              {isSubmitting ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>

          {/* Quick Credential Hint Box */}
          <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs text-emerald-900 space-y-1">
            <p className="font-bold text-emerald-800">
              Demo Credentials:
            </p>
            <p className="text-[11px] font-mono text-emerald-950">
              Email: <strong>admin@srikannathal.com</strong>
            </p>
            <p className="text-[11px] font-mono text-emerald-950">
              Password: <strong>Admin@12345</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
