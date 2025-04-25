import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// URL of your main website's login page
const MAIN_WEBSITE_LOGIN = 'https://rangmanch.vercel.app'; // Replace with your main website URL

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Enable Firebase persistence
    auth.setPersistence('local');

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!authChecked) {
        setAuthChecked(true);
        if (!user) {
          // Only redirect if this is the first auth check
          window.location.href = MAIN_WEBSITE_LOGIN;
          return;
        }
      }
      
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [authChecked]);

  const logout = async () => {
    await signOut(auth);
    window.location.href = MAIN_WEBSITE_LOGIN;
  };

  const value = {
    currentUser,
    loading,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 