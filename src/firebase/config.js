import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_AUTH_DOMAIN,
	// The value of `databaseURL` depends on the location of the database
	databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
	projectId: import.meta.env.VITE_PROJECT_ID,
	// The value of `storageBucket` depends on when you provisioned your default bucket (learn more)
	storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
	// messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_APP_ID,
	// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
	// measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export const database = getDatabase(app)

export default storage;