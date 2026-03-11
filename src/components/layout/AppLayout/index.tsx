import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

const SIDEBAR_WIDTH = 240;

export const AppLayout = () => {
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen((v) => !v);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <Header onMenuClick={handleToggle} />
      <Sidebar open={open} onClose={handleToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: "64px",
          p: 3,
          ml: open ? `${SIDEBAR_WIDTH}px` : 0,
          transition: "margin 0.2s ease",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
