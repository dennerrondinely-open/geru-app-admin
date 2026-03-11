import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Routes, PublicRoutes } from "./routes";
import { AppLayout } from "./components/layout/AppLayout";
import { AuthProvider } from "context/auth/AuthProvider";
import { SectionProvider } from "context/section";
import { LinkProvider } from "context/link";
import { SnackbarProvider } from "notistack";
import { geruTheme } from "./theme";
import { useLocation } from "react-router";

const PUBLIC_PATHS = ["/go/", "/not-found"];

function AppContent() {
  const { pathname } = useLocation();
  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));

  if (isPublic) {
    return <PublicRoutes />;
  }

  return (
    <AuthProvider>
      <SectionProvider>
        <LinkProvider>
          <AppLayout>
            <Routes />
          </AppLayout>
        </LinkProvider>
      </SectionProvider>
    </AuthProvider>
  );
}

function App() {
  return (
    <ThemeProvider theme={geruTheme}>
      <SnackbarProvider>
        <CssBaseline />
        <AppContent />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
