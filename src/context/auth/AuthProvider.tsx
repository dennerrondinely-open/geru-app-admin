
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { signInWithGoogle as apiSignInWithGoogle, signOutUser, auth } from "api/auth";
import { AuthContext } from "./AuthContext";
import type { AuthContextType } from "./types";
import { LoginForm } from "@/components/auth/Login";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthContextType["user"] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await apiSignInWithGoogle();
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await signOutUser();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
      {loading ? null : user ? children : <LoginForm />}
    </AuthContext.Provider>
  );
};
