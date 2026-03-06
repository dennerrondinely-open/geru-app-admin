import { Box } from "@mui/material";
import { useState } from "react";
import { Header } from "../Header";
import { Sidebar, DRAWER_WIDTH } from "../Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggle = () => setSidebarOpen((prev) => !prev);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header onMenuToggle={handleToggle} />
      <Box sx={{ display: "flex", flex: 1 }}>
        <Sidebar open={sidebarOpen} onClose={handleToggle} />
        <Box
          component="main"
          sx={{
            flex: 1,
            p: 3,
            transition: (theme) =>
              theme.transitions.create("margin", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            marginLeft: sidebarOpen ? `${DRAWER_WIDTH}px` : 0,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
