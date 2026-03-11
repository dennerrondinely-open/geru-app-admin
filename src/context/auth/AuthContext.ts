"use client";

import { createContext } from "react";
import type { AuthContextType } from "./types";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
});
