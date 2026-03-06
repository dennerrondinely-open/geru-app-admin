import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Divider, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import { useAuth } from "context/auth/useAuth";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header = ({ onMenuToggle }: HeaderProps) => {
  const { user, signOut } = useAuth();
  const userName = user?.email || "";
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleSignOut = () => {
    handleClose();
    signOut();
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between", px: 2 }}>
        {/* Left side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            size="medium"
            color="inherit"
            aria-label="toggle menu"
            onClick={onMenuToggle}
            sx={{ borderRadius: 1.5 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            letterSpacing={0.5}
            sx={{ color: "secondary.main" }}
          >
            GERU
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight="300"
            letterSpacing={0.5}
            sx={{ color: "white", opacity: 0.7 }}
          >
            Admin
          </Typography>
        </Box>

        {/* Right side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography
            variant="body2"
            sx={{
              color: "white",
              opacity: 0.75,
              display: { xs: "none", sm: "block" },
            }}
          >
            {userName}
          </Typography>

          <Tooltip title="Opções da conta">
            <IconButton onClick={handleOpenMenu} size="small" sx={{ p: 0 }}>
              <Avatar
                sx={{
                  bgcolor: "secondary.main",
                  color: "secondary.contrastText",
                  width: 36,
                  height: 36,
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>

      {/* Dropdown menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: {
            elevation: 2,
            sx: { mt: 1, minWidth: 200, borderRadius: 2 },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle2" fontWeight="bold" noWrap>
            {userName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Administrador
          </Typography>
        </Box>
        <Divider />
        <MenuItem sx={{ py: 1.2 }}>
          <ListItemIcon>
            <PersonOutlineIcon fontSize="small" />
          </ListItemIcon>
          Perfil
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleSignOut} sx={{ py: 1.2, color: "error.main" }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </AppBar>
  );
};
