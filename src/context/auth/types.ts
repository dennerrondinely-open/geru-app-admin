// ...existing code...
import type { User } from "firebase/auth";

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  resetPassword?: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export type AuthProviderProps = {
  children: React.ReactNode;
};