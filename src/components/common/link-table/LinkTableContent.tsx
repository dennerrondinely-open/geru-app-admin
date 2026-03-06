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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useLinks } from "../../../context/link";
import { useNavigate } from "react-router";

export const LinkTableContent = () => {
  const { loading, links } = useLinks();
  const navigate = useNavigate();

  if (loading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (links.length === 0) {
    return <Alert severity="warning">Nenhum link encontrado.</Alert>;
  }

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="links table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Web URL</TableCell>
            <TableCell>App URL</TableCell>
            <TableCell>Status</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {links.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell
                sx={{
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {row.webUrl}
              </TableCell>
              <TableCell
                sx={{
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {row.appUrl}
              </TableCell>
              <TableCell>
                {row.active ? (
                  <Chip label="Ativo" color="success" />
                ) : (
                  <Chip label="Inativo" color="error" />
                )}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="edit"
                  onClick={() => navigate(`/link/${row.id}`)}
                >
                  <EditIcon color="info" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
