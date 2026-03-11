"use client";

import { useContext, useState } from "react";
import { Box, Button, CircularProgress, Paper, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { AuthContext } from "@/context/auth/AuthContext";

export const LoginForm = () => {
  const { signInWithGoogle, loading } = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err: unknown) {
      setError((err as { message: string })?.message ?? String(err));
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="background.default">
      <Paper
        elevation={0}
        sx={{ width: 400, p: 5, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, border: "1px solid", borderColor: "divider", borderRadius: 3 }}
      >
        <Box textAlign="center">
          <Typography variant="h4" fontWeight={700} letterSpacing={2}>
            GERU<Box component="span" sx={{ color: "secondary.main" }}> Admin</Box>
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Acesso restrito a colaboradores @open-co.com
          </Typography>
        </Box>

        {error && (
          <Typography variant="body2" color="error" textAlign="center" sx={{ bgcolor: "error.light", px: 2, py: 1, borderRadius: 1, width: "100%" }}>
            {error}
          </Typography>
        )}

        <Button
          variant="outlined" size="large" fullWidth onClick={handleGoogleLogin} disabled={loading}
          startIcon={loading ? <CircularProgress size={18} /> : <GoogleIcon />}
          sx={{ borderColor: "divider", color: "text.primary", textTransform: "none", fontWeight: 500, py: 1.5, "&:hover": { borderColor: "secondary.main", color: "secondary.main" } }}
        >
          {loading ? "Entrando..." : "Entrar com Google"}
        </Button>
      </Paper>
    </Box>
  );
};
