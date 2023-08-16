import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const apiKey = import.meta.env.VITE_FB_API_KEY;
const authDomain = import.meta.env.VITE_FB_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_FB_PROJECT_ID;
const storageBucket = import.meta.env.VITE_FB_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.VITE_FB_SENDER_ID;
const appId = import.meta.env.VITE_FB_APP_ID;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const CLOUD_FUNCTIONS_LOCATION = "asia-southeast2";

// Refer link here: https://firebase.google.com/docs/extensions/manage-installed-extensions?platform=console#view-extension-functions
// ext-firestore-palm-summarize-text-generateSummary
const INSTANCE_ID = "firestore-palm-summarize-text-generateSummary";

// Import Firebase functions
const functions = getFunctions(app, CLOUD_FUNCTIONS_LOCATION);
export const post = httpsCallable(functions, `ext-${INSTANCE_ID}`);

export const database = getFirestore(app);
export const storage = getStorage(app);
