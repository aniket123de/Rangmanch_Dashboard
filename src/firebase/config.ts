import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Use the same Firebase configuration from your main project
const firebaseConfig = {
  projectId: "rangmanch-4189e",
  authDomain: "rangmanch-4189e.firebaseapp.com",
  // Add other config values from your main project
  // apiKey, storageBucket, messagingSenderId, appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app; 