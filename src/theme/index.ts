import { createTheme } from "@mui/material/styles";

/**
 * Paleta baseada na identidade visual da Geru
 * Fonte: geru.com.br
 *
 * - Preto/dark nav:   #121212
 * - Ciano Geru:       #00C2E8  (logo, CTAs, destaques)
 * - Ciano escuro:     #009AB8  (hover)
 * - Background:       #F5F6FA  (páginas internas)
 * - Texto primário:   #1A1A2E
 */

export const geruTheme = createTheme({
  palette: {
    primary: {
      main: "#121212",       // preto do navbar
      light: "#2C2C2C",
      dark: "#000000",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#00C2E8",       // ciano da marca
      light: "#33CEED",
      dark: "#009AB8",
      contrastText: "#121212",
    },
    success: {
      main: "#00C2E8",
      contrastText: "#121212",
    },
    background: {
      default: "#F5F6FA",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1A1A2E",
      secondary: "#6B7280",
    },
    divider: "#E5E7EB",
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 600 },
    subtitle2: { fontWeight: 600 },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#121212",
          boxShadow: "none",
          borderBottom: "1px solid #2C2C2C",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: "#00C2E8",
          color: "#121212",
          "&:hover": {
            backgroundColor: "#009AB8",
          },
        },
        outlinedPrimary: {
          borderColor: "#00C2E8",
          color: "#00C2E8",
          "&:hover": {
            borderColor: "#009AB8",
            backgroundColor: "rgba(0,194,232,0.06)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "rgba(0,194,232,0.12)",
          color: "#009AB8",
          borderColor: "rgba(0,194,232,0.4)",
        },
        colorSuccess: {
          backgroundColor: "rgba(0,194,232,0.12)",
          color: "#009AB8",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#FFFFFF",
          borderRight: "1px solid #E5E7EB",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: "2px 8px",
          width: "calc(100% - 16px)",
          "&.Mui-selected": {
            backgroundColor: "#121212",
            color: "#FFFFFF",
            "& .MuiListItemIcon-root": {
              color: "#00C2E8",
            },
            "&:hover": {
              backgroundColor: "#2C2C2C",
            },
          },
          "&:hover": {
            backgroundColor: "rgba(0,194,232,0.08)",
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            backgroundColor: "#F5F6FA",
            color: "#6B7280",
            fontWeight: 600,
            fontSize: "0.72rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgba(0,194,232,0.04) !important",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F5F6FA",
        },
      },
    },
  },
});
