// ...existing code...
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  signInWithEmail as apiSignInWithEmail,
  signUpWithEmail as apiSignUpWithEmail,
  resetPassword as apiResetPassword,
  signOutUser,
  auth,
} from "api/auth";
import { AuthContext } from "./AuthContext";
import type { AuthContextType, AuthProviderProps } from "./types";
import { LoginForm } from "components/auth/Login";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthContextType["user"] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser as AuthContextType["user"] | null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("Auth state changed:", { user, loading });
  }, [user, loading]);

  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      await apiSignInWithEmail(email, password);
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      await apiSignUpWithEmail(email, password);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    try {
      await apiResetPassword(email);
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
    <AuthContext.Provider
      value={{ user, loading, signInWithEmail, signUpWithEmail, resetPassword, signOut }}
    >
      {user ? children : <LoginForm />}
    </AuthContext.Provider>
  );
};