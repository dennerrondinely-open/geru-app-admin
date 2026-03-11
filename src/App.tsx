import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { geruTheme } from "@/theme";
import { AuthProvider } from "@/context/auth/AuthProvider";
import { SectionProvider } from "@/context/section/SectionProvider";
import { LinkProvider } from "@/context/link/LinkProvider";
import { AppLayout } from "@/components/layout/AppLayout";

import HomePage from "@/pages/Home";
import SectionsPage from "@/pages/Sections";
import NewSectionPage from "@/pages/NewSection";
import EditSectionPage from "@/pages/EditSection";
import LinksPage from "@/pages/Links";
import EditLinkPage from "@/pages/EditLink";
import OneLinkPage from "@/pages/OneLink";

export default function App() {
  return (
    <ThemeProvider theme={geruTheme}>
      <CssBaseline />
      <SnackbarProvider>
        <BrowserRouter>
          <AuthProvider>
            <SectionProvider>
              <LinkProvider>
                <Routes>
                  {/* OneLink gateway — sem layout admin */}
                  <Route path="/l/:slug" element={<OneLinkPage />} />

                  {/* Admin — com layout */}
                  <Route element={<AppLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/sections" element={<SectionsPage />} />
                    <Route path="/sections/new" element={<NewSectionPage />} />
                    <Route path="/sections/:id" element={<EditSectionPage />} />
                    <Route path="/links" element={<LinksPage />} />
                    <Route path="/links/:id" element={<EditLinkPage />} />
                  </Route>
                </Routes>
              </LinkProvider>
            </SectionProvider>
          </AuthProvider>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
