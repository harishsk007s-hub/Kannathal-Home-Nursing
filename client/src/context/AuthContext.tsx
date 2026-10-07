import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AdminUser, AuthState } from '../types';
import { apiService } from '../services/api';



interface AuthContextType extends AuthState {
  login: (token: string, user: AdminUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: localStorage.getItem('sri_kannathal_admin_token'),
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('sri_kannathal_admin_token');
      if (!token) {
        setAuthState({ token: null, user: null, isAuthenticated: false, isLoading: false });
        return;
      }

      try {
        const user = await apiService.checkAdminAuth();
        setAuthState({ token, user, isAuthenticated: true, isLoading: false });
      } catch (error) {
        console.warn('Token validation failed:', error);
        localStorage.removeItem('sri_kannathal_admin_token');
        setAuthState({ token: null, user: null, isAuthenticated: false, isLoading: false });
      }
    };

    verifyToken();
  }, []);

  const login = (token: string, user: AdminUser) => {
    localStorage.setItem('sri_kannathal_admin_token', token);
    setAuthState({
      token,
      user,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    apiService.logoutAdmin();
    localStorage.removeItem('sri_kannathal_admin_token');
    setAuthState({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
