"use client";

import { Alert, Box, Chip, CircularProgress, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useLinks } from "@/context/link";
import { useRouter } from "next/navigation";

export const LinkTable = () => {
  const { loading, links } = useLinks();
  const router = useRouter();

  if (loading) return <Box sx={{ display: "flex", p: 3 }}><CircularProgress /></Box>;
  if (links.length === 0) return <Alert severity="warning" sx={{ m: 2 }}>Nenhum link encontrado.</Alert>;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Slug</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Web URL</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {links.map((link) => (
            <TableRow key={link.id} hover>
              <TableCell>{link.name}</TableCell>
              <TableCell sx={{ fontFamily: "monospace", fontSize: "0.8rem", color: "text.secondary" }}>/l/{link.slug}</TableCell>
              <TableCell>{link.type}</TableCell>
              <TableCell sx={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{link.webUrl}</TableCell>
              <TableCell>
                <Chip label={link.active ? "Ativo" : "Inativo"} color={link.active ? "primary" : "default"} size="small" />
              </TableCell>
              <TableCell align="right">
                <IconButton size="small" onClick={() => router.push(`/links/${link.id}`)}><EditIcon fontSize="small" /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
