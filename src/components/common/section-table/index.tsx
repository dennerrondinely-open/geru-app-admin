
import { Alert, Box, Chip, CircularProgress, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSections } from "@/context/section";
import { useDeleteSectionUseCase } from "use-cases/sections";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

export const SectionTable = () => {
  const { loading, sections } = useSections();
  const { deleteSection } = useDeleteSectionUseCase();
  const navigate = useNavigate();

  if (loading) return <Box sx={{ display: "flex", p: 3 }}><CircularProgress /></Box>;
  if (sections.length === 0) return <Alert severity="warning" sx={{ m: 2 }}>Nenhuma section encontrada.</Alert>;

  const handleDelete = async (id: string) => {
    if (!confirm("Deseja excluir esta section?")) return;
    try {
      await deleteSection(id);
      enqueueSnackbar("Section excluída!", { variant: "success" });
    } catch {
      enqueueSnackbar("Erro ao excluir.", { variant: "error" });
    }
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Título</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sections.map((section) => (
            <TableRow key={section.id} hover>
              <TableCell>{section.name}</TableCell>
              <TableCell>{section.title}</TableCell>
              <TableCell>
                <Chip label={section.active ? "Ativo" : "Inativo"} color={section.active ? "primary" : "default"} size="small" />
              </TableCell>
              <TableCell align="right">
                <IconButton size="small" onClick={() => navigate(`/sections/${section.id}`)}><EditIcon fontSize="small" /></IconButton>
                <IconButton size="small" color="error" onClick={() => handleDelete(section.id)}><DeleteIcon fontSize="small" /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
