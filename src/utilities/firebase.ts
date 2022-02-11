import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, doc, collection, getDocs, setDoc, updateDoc, arrayUnion } from 'firebase/firestore/lite';
// import { worlds } from '/src/stores/worldsStore';
import { get } from 'svelte/store';

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
export const auth = getAuth();

export async function initUserDataInDB(user) {
    // await setDoc(doc(db, "users"), user.uid)
    await setDoc(doc(db, "users", user.uid), { worlds: [], projectID: user.uid })
}


export async function setWorld(world, user) {
    await updateDoc(doc(db, "users", user.uid), { worlds: arrayUnion(world) })

}

export async function getMyWorlds(user) {
    return (await getDocs(collection(db, `users`))).docs.map(doc => {
        if (doc.data().projectID === user.uid) {
            return doc.data()
        }
    })
}

export async function CreateUser(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
}
export async function SignIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
}

export async function LogOff() {
    auth.signOut();
}

export async function UpdateWorldInDB(user, w) {
    console.log("updating world in db");

    // console.log(JSON.stringify(w));

    // localStorage.setItem("worlds", JSON.stringify(w));

    await updateDoc(doc(db, "users", user.uid), { worlds: w })
    // await updateDoc(doc(db, "users", user.uid), { worlds: arrayUnion(...worlds) })
}




