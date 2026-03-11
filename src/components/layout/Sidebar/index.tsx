"use client";

import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import LinkIcon from "@mui/icons-material/Link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { usePathname, useRouter } from "next/navigation";

const WIDTH = 240;

const items = [
  { label: "Home", icon: <HomeIcon />, path: "/" },
  { label: "Sections", icon: <ViewCarouselIcon />, path: "/sections" },
  { label: "Links", icon: <LinkIcon />, path: "/links" },
];

export const Sidebar = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{ width: WIDTH, flexShrink: 0, "& .MuiDrawer-paper": { width: WIDTH, boxSizing: "border-box", mt: "64px" } }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
        <IconButton onClick={onClose}><ChevronLeftIcon /></IconButton>
      </Box>
      <List>
        {items.map((item) => (
          <ListItemButton
            key={item.path}
            selected={pathname === item.path}
            onClick={() => router.push(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};
