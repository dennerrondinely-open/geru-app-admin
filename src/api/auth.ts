import {
  signOut as firebaseSignOut,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "./firebase";

export const auth = getAuth(app);

const ALLOWED_DOMAIN = "open-co.com";

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ hd: ALLOWED_DOMAIN });

  const result = await signInWithPopup(auth, provider);
  const email = result.user.email ?? "";

  if (!email.endsWith(`@${ALLOWED_DOMAIN}`)) {
    await firebaseSignOut(auth);
    throw new Error(`Acesso restrito ao domínio @${ALLOWED_DOMAIN}.`);
  }

  return result;
};

export const signOutUser = async () => {
  return firebaseSignOut(auth);
};
