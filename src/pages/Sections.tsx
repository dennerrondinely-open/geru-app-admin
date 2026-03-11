import { Box, Typography, Divider, Paper, Button, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSections } from "@/context/section";
import { SectionTable } from "@/components/common/section-table";
import { useNavigate } from "react-router-dom";

export default function SectionsPage() {
  const { sections } = useSections();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Typography variant="h5" fontWeight="bold">Sections</Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>Gerencie as seções de comunicação do app</Typography>
      </Box>
      <Divider />
      <Paper elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2, overflow: "hidden" }}>
        <Box sx={{ px: 2.5, py: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="subtitle1" fontWeight={600}>Sections</Typography>
            <Chip label={sections.length} size="small" color="primary" />
          </Box>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("/sections/new")}>
            Nova Section
          </Button>
        </Box>
        <SectionTable />
      </Paper>
    </Box>
  );
}
