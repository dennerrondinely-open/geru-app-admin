import { Container, CssBaseline } from "@mui/material";
import { Routes } from "./routes";
import { Header } from "./components/layout/Header";
import { AuthProvider } from "context/auth/AuthProvider";
import { SectionProvider } from "context/section";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <SectionProvider>
          <CssBaseline />
          <Header />
          <Container fixed>
            <Routes />
          </Container>
        </SectionProvider>
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
