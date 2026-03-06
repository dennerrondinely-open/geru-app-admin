import Paper from "@mui/material/Paper";
import { Box, Typography, Button } from "@mui/material";
import { ModulesTableContent } from "./SectionTableContent";
import { useNavigate } from "react-router";

export const SectionTable = () => {
  const navigate = useNavigate();

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
        <Typography variant="subtitle1">Lista de sections</Typography>
        <Button variant="contained" onClick={() => navigate("/section")}>
          Adicionar seção
        </Button>
      </Box>
      <ModulesTableContent />
    </Paper>
  );
};
