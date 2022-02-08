import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, collection, getDocs, setDoc } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGE_ID,
    appId: import.meta.env.VITE_APP_ID
};

const app = initializeApp(firebaseConfig)


const db = getFirestore(app);
const auth = getAuth();

export async function setWorld(world) {
    await setDoc(doc(db, "worlds", world.name), world)
}

export async function getMyWorlds() {
    return (await getDocs(collection(db, 'worlds'))).docs.map(doc => doc.data())
}

