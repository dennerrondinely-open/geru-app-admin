import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Routes } from "./routes";
import { AppLayout } from "./components/layout/AppLayout";
import { AuthProvider } from "context/auth/AuthProvider";
import { SectionProvider } from "context/section";
import { LinkProvider } from "context/link";
import { SnackbarProvider } from "notistack";
import { geruTheme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={geruTheme}>
      <SnackbarProvider>
        <AuthProvider>
          {/* Providers globais para o Dashboard (Home) que exibe métricas de ambos */}
          <SectionProvider>
            <LinkProvider>
              <CssBaseline />
              <AppLayout>
                <Routes />
              </AppLayout>
            </LinkProvider>
          </SectionProvider>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
