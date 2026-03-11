"use client";

import { Box, Paper, Button, TextField, InputAdornment } from "@mui/material";
import { Switch } from "@/components/form/Switch";
import type { Section } from "@/domains/section";

interface SectionFormProps {
  data?: Section;
  onChange: (key: string) => (e: React.ChangeEvent<HTMLInputElement> | { target: { value: string } }) => void;
  onActiveChange: (value: boolean) => void;
  onSubmit: () => void;
}

const fields: { key: keyof Section; label: string }[] = [
  { key: "name", label: "Nome" },
  { key: "preTitle", label: "Pré-título" },
  { key: "title", label: "Título" },
  { key: "message", label: "Mensagem" },
  { key: "backgroundLink", label: "Background URL" },
  { key: "buttonText", label: "Texto do Botão" },
  { key: "buttonLink", label: "Link do Botão" },
];

export const SectionForm = ({ data, onChange, onActiveChange, onSubmit }: SectionFormProps) => (
  <Paper sx={{ p: 2, width: "100%" }}>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Switch label="Ativo" checked={data?.active} onChange={onActiveChange} color="success" />
      {fields.map(({ key, label }) => (
        <TextField key={key} label={label} value={(data?.[key] as string) || ""} onChange={onChange(key)} fullWidth size="small" />
      ))}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={onSubmit}>Salvar</Button>
      </Box>
    </Box>
  </Paper>
);
