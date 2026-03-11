import { Box, Typography, Divider, Paper, Chip } from "@mui/material";
import { useLinks } from "@/context/link";
import { LinkTable } from "@/components/common/link-table";

export default function LinksPage() {
  const { links } = useLinks();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Typography variant="h5" fontWeight="bold">Links</Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>Gerencie os onelinks do app</Typography>
      </Box>
      <Divider />
      <Paper elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2, overflow: "hidden" }}>
        <Box sx={{ px: 2.5, py: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="subtitle1" fontWeight={600}>Links</Typography>
          <Chip label={links.length} size="small" color="primary" />
        </Box>
        <LinkTable />
      </Paper>
    </Box>
  );
}
