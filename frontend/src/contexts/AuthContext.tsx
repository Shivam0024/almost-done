import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored token on mount
    const storedUser = localStorage.getItem('metro_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem('metro_user');
      }
    }
    setIsLoading(false);
  }, []);

  const register = async (name: string, email: string, phone: string, password: string) => {
    // Mock JWT registration - in production, this would call your Keycloak server
    // Simulating user registration and JWT token generation
    const mockToken = btoa(JSON.stringify({
      sub: email,
      iat: Date.now(),
      exp: Date.now() + 3600000, // 1 hour
      email: email,
      name: name,
      phone: phone
    }));

    const userData: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: name,
      email: email,
      phone: phone,
      token: mockToken
    };

    // Store user data (in production, this would be handled by backend)
    localStorage.setItem('metro_user', JSON.stringify(userData));
  };

  const login = async (email: string, password: string) => {
    // Mock JWT authentication - in production, this would call your Keycloak server
    // For testing IDAM, this simulates receiving a JWT token
    const mockToken = btoa(JSON.stringify({
      sub: email,
      iat: Date.now(),
      exp: Date.now() + 3600000, // 1 hour
      email: email,
      name: email.split('@')[0]
    }));

    const userData: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email: email,
      token: mockToken
    };

    localStorage.setItem('metro_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('metro_user');
    setUser(null);
    navigate('/');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
