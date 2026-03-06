import { Box, Paper, Typography, Chip, Divider } from "@mui/material";
import { LinkTable } from "components/common/link-table";
import { useLinks } from "context/link";

export const Links = () => {
  const { links } = useLinks();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Typography variant="h5" fontWeight="bold">
          Links
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          Gerencie os onelinks do app
        </Typography>
      </Box>

      <Divider />

      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            px: 2.5,
            py: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography variant="subtitle1" fontWeight="600">
            Lista de Links
          </Typography>
          <Chip
            label={links.length}
            size="small"
            color="primary"
            variant="outlined"
          />
        </Box>
        <Divider />
        <LinkTable />
      </Paper>
    </Box>
  );
};
