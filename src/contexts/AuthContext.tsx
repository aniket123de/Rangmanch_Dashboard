import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signOut, 
  getAuth,
  signInWithCredential,
  GoogleAuthProvider
} from 'firebase/auth';
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
  const [initialAuthCheckDone, setInitialAuthCheckDone] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Auth state changed:", user ? "User exists" : "No user");
      
      if (!initialAuthCheckDone) {
        setInitialAuthCheckDone(true);
        
        if (!user) {
          // Only redirect on first load if no user
          console.log("No user found, redirecting to main site");
          window.location.href = MAIN_WEBSITE_LOGIN;
          return;
        }
      }

      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      console.log("Cleaning up auth listener");
      unsubscribe();
    };
  }, [initialAuthCheckDone]);

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