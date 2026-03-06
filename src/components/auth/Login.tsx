import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Link,
} from "@mui/material";
import { AuthContext } from "../../context/auth/AuthContext";

export const LoginForm: React.FC = () => {
  const { signInWithEmail, signUpWithEmail, resetPassword, loading } =
    useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (isRegister) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (err: unknown) {
      setError((err as { message: string })?.message ?? String(err));
    }
  };

  const handleReset = async () => {
    setError(null);
    const targetEmail = window.prompt(
      "Informe o email para reset de senha:",
      email
    );
    if (!targetEmail) return;
    try {
      await resetPassword?.(targetEmail);
      window.alert("Email de recuperação enviado (verifique caixa de spam).");
    } catch (err: unknown) {
      setError((err as { message: string })?.message ?? String(err));
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      p={2}
    >
      <Paper elevation={3} sx={{ width: 380, p: 4 }}>
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Typography variant="h5" component="h1" gutterBottom>
              {isRegister ? "Criar conta" : "Entrar"}
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                fullWidth
                required
                autoComplete="email"
              />
              <TextField
                label="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                fullWidth
                required
                autoComplete={isRegister ? "new-password" : "current-password"}
                inputProps={{ minLength: 6 }}
                helperText={isRegister ? "Mínimo 6 caracteres" : undefined}
              />

              {error && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}

              <Box display="flex" gap={1} mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                  startIcon={
                    loading ? <CircularProgress size={18} /> : undefined
                  }
                >
                  {isRegister ? "Criar conta" : "Entrar"}
                </Button>
              </Box>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt={2}
              >
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => setIsRegister((v) => !v)}
                  disabled={loading}
                >
                  {isRegister ? "Já tenho conta" : "Criar conta"}
                </Link>

                <Link
                  component="button"
                  variant="body2"
                  onClick={handleReset}
                  disabled={loading}
                >
                  Esqueci a senha
                </Link>
              </Box>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};
