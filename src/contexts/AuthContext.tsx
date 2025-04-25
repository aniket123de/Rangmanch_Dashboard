import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut, getAuth } from 'firebase/auth';
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // Check if we have a token in URL params
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        
        if (!token) {
          window.location.href = MAIN_WEBSITE_LOGIN;
          return;
        }

        try {
          // Verify the token
          await auth.signInWithCustomToken(token);
          // Remove token from URL
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (error) {
          console.error('Token verification failed:', error);
          window.location.href = MAIN_WEBSITE_LOGIN;
          return;
        }
      } else {
        setCurrentUser(user);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      window.location.href = MAIN_WEBSITE_LOGIN;
    } catch (error) {
      console.error('Logout error:', error);
      window.location.href = MAIN_WEBSITE_LOGIN;
    }
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