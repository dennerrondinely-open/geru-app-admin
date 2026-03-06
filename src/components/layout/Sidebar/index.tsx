import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Typography,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LinkIcon from "@mui/icons-material/Link";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate, useLocation } from "react-router";

const DRAWER_WIDTH = 240;

const menuItems = [
  { label: "Home", icon: <HomeIcon />, path: "/" },
  { label: "Sections", icon: <ViewCarouselIcon />, path: "/sections" },
  { label: "Links", icon: <LinkIcon />, path: "/links" },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export const Sidebar = ({ open, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: open ? DRAWER_WIDTH : 0,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Typography variant="subtitle2" fontWeight="bold" sx={{ color: "secondary.main" }}>
            GERU
          </Typography>
          <Typography variant="subtitle2" fontWeight="300" color="text.secondary">
            Admin
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose} aria-label="fechar menu">
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  selected={isActive}
                  onClick={() => navigate(item.path)}
                  sx={{
                    "&.Mui-selected": {
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      "& .MuiListItemIcon-root": {
                        color: "primary.contrastText",
                      },
                      "&:hover": {
                        bgcolor: "primary.dark",
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{ color: isActive ? "inherit" : "text.secondary" }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export { DRAWER_WIDTH };
