import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut as firebaseSignOut,
  getAuth,
} from "firebase/auth";
import { app } from "./firebase";

export const auth = getAuth(app);

export const signInWithEmail = async (email: string, password: string) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error("signInWithEmail error:", err);
    throw err;
  }
};

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error("signUpWithEmail error:", err);
    throw err;
  }
};

export const resetPassword = async (email: string) => {
  try {
    return await sendPasswordResetEmail(auth, email);
  } catch (err) {
    console.error("resetPassword error:", err);
    throw err;
  }
};

export const signOutUser = async () => {
  try {
    return await firebaseSignOut(auth);
  } catch (err) {
    console.error("signOutUser error:", err);
    throw err;
  }
};
