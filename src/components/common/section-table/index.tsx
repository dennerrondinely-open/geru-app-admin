import { Box } from "@mui/material";
import { ModulesTableContent } from "./SectionTableContent";

interface SectionTableProps {
  embedded?: boolean;
}

export const SectionTable = ({ embedded = false }: SectionTableProps) => {
  if (embedded) {
    return (
      <Box sx={{ width: "100%" }}>
        <ModulesTableContent />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <ModulesTableContent />
    </Box>
  );
};
