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
import { useSections } from "../../../context/section";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export const ModulesTableContent = () => {
  const { loading, sections } = useSections();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Sections updated:", sections);
  }, [sections]);

  if (loading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (sections.length === 0) {
    return <Alert severity="warning">Nenhuma seção.</Alert>;
  }

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Titulo</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Texto do botão</TableCell>
            <TableCell>Tipo do botão</TableCell>
            <TableCell>Status</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sections.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.name}</TableCell>
              <TableCell component="th" scope="row">
                {row.preTitle} {row.title}
              </TableCell>
              <TableCell>{row.message}</TableCell>
              <TableCell>{row.buttonText}</TableCell>
              <TableCell>{row.buttonType}</TableCell>
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
                  onClick={() => navigate(`section/${row.id}`)}
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
