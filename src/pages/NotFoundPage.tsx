import { Box, Typography } from "@mui/material";

export const NotFoundPage = () => (
  <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      bgcolor: "#0D0D0D",
      color: "#fff",
      gap: 2,
    }}
  >
    <Typography variant="h1" sx={{ fontSize: 64, fontWeight: 800, color: "#00D4FF" }}>
      404
    </Typography>
    <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.5)" }}>
      Link não encontrado.
    </Typography>
  </Box>
);
