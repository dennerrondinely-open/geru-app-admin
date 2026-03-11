"use client";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { geruTheme } from "@/theme";
import { AuthProvider } from "@/context/auth/AuthProvider";
import { SectionProvider } from "@/context/section/SectionProvider";
import { LinkProvider } from "@/context/link/LinkProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={geruTheme}>
      <CssBaseline />
      <SnackbarProvider>
        <AuthProvider>
          <SectionProvider>
            <LinkProvider>
              {children}
            </LinkProvider>
          </SectionProvider>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
