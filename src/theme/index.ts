
import { createTheme } from "@mui/material/styles";

export const geruTheme = createTheme({
  palette: {
    primary: { main: "#121212" },
    secondary: { main: "#00C2E8" },
    background: { default: "#F5F6FA" },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: "#121212", boxShadow: "none" },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: { backgroundColor: "#00C2E8", color: "#121212", "&:hover": { backgroundColor: "#00afd1" } },
      },
    },
    MuiChip: {
      styleOverrides: {
        colorPrimary: { backgroundColor: "rgba(0,194,232,0.15)", color: "#00C2E8" },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#121212",
            "& .MuiListItemIcon-root": { color: "#00C2E8" },
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            backgroundColor: "#f9f9f9",
            textTransform: "uppercase",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.05em",
          },
        },
      },
    },
  },
});
