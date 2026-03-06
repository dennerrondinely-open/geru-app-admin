import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useSections } from "../../../context/section";
import { useNavigate } from "react-router";

export const ModulesTableContent = () => {
  const { loading, sections } = useSections();
  const navigate = useNavigate();

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress size={32} />
      </Box>
    );
  }

  if (sections.length === 0) {
    return (
      <Box sx={{ px: 2.5, py: 4 }}>
        <Alert severity="info" variant="outlined">
          Nenhuma seção cadastrada ainda.
        </Alert>
      </Box>
    );
  }

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="sections table">
        <TableHead>
          <TableRow sx={{ bgcolor: "grey.50" }}>
            <TableCell sx={{ fontWeight: 600, color: "text.secondary", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: 0.5 }}>Nome</TableCell>
            <TableCell sx={{ fontWeight: 600, color: "text.secondary", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: 0.5 }}>Título</TableCell>
            <TableCell sx={{ fontWeight: 600, color: "text.secondary", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: 0.5 }}>Descrição</TableCell>
            <TableCell sx={{ fontWeight: 600, color: "text.secondary", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: 0.5 }}>Texto do botão</TableCell>
            <TableCell sx={{ fontWeight: 600, color: "text.secondary", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: 0.5 }}>Tipo</TableCell>
            <TableCell sx={{ fontWeight: 600, color: "text.secondary", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: 0.5 }}>Status</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {sections.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": { bgcolor: "action.hover" },
                cursor: "pointer",
              }}
              onClick={() => navigate(`/section/${row.id}`)}
            >
              <TableCell>
                <Typography variant="body2" fontWeight={500}>
                  {row.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {row.preTitle} {row.title}
                </Typography>
              </TableCell>
              <TableCell sx={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                <Typography variant="body2" color="text.secondary">
                  {row.message}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{row.buttonText}</Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={row.buttonType}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: "0.7rem" }}
                />
              </TableCell>
              <TableCell>
                {row.active ? (
                  <Chip label="Ativo" color="success" size="small" />
                ) : (
                  <Chip label="Inativo" color="default" size="small" />
                )}
              </TableCell>
              <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                <IconButton
                  aria-label="edit"
                  size="small"
                  onClick={() => navigate(`/section/${row.id}`)}
                >
                  <EditIcon fontSize="small" color="info" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
