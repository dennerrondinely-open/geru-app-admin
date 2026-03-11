
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Menu, MenuItem, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useAuth } from "@/context/auth/useAuth";

export const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { user, signOut } = useAuth();
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={onMenuClick} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" fontWeight={700} letterSpacing={2} sx={{ flexGrow: 1 }}>
          GERU<Box component="span" sx={{ color: "secondary.main", fontWeight: 300 }}> Admin</Box>
        </Typography>
        <IconButton onClick={(e) => setAnchor(e.currentTarget)}>
          <Avatar sx={{ bgcolor: "secondary.main", width: 32, height: 32, fontSize: 14 }}>
            {user?.email?.[0].toUpperCase()}
          </Avatar>
        </IconButton>
        <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
          <MenuItem disabled><Typography variant="caption">{user?.email}</Typography></MenuItem>
          <Divider />
          <MenuItem onClick={() => { setAnchor(null); signOut(); }} sx={{ color: "error.main" }}>Sair</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
