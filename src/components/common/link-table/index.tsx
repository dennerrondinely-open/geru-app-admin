import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import { LinkTableContent } from "./LinkTableContent";

export const LinkTable = () => {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="subtitle1">Lista de links</Typography>
      </Box>
      <LinkTableContent />
    </Paper>
  );
};
