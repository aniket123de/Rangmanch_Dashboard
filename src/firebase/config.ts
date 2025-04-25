import { initializeApp } from 'firebase/app';
import { getAuth, browserLocalPersistence, setPersistence, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKT2EyuMtocu1DCtYmDrr7NqYVNwAaSPs",
  authDomain: "rangmanch-4189e.firebaseapp.com",
  projectId: "rangmanch-4189e",
  storageBucket: "rangmanch-4189e.firebasestorage.app",
  messagingSenderId: "385690692095",
  appId: "1:385690692095:web:5c3a871035d694f4415fca",
  measurementId: "G-73V0QBMC4F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Enable persistence
setPersistence(auth, browserLocalPersistence);

// Configure Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { auth, app, analytics, googleProvider };
export default app; 