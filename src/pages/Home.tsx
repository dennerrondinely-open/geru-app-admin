import { Box, Typography } from "@mui/material";
import { SectionTable } from "components/common/section-table";

export const Home = () => {
  return (
    <Box
      sx={{
        width: "100%",
        typography: "body1",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        margin: "24px 0 0 0",
      }}
    >
      <Typography variant="h4">Home</Typography>
      <SectionTable />
    </Box>
  );
};
