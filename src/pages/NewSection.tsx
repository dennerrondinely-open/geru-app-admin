import { Box, IconButton, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import type { Section } from "@/domains/section";
import { useAddSectionUseCase } from "use-cases/sections";
import { SectionForm } from "@/components/common/section-form";

export default function NewSectionPage() {
  const navigate = useNavigate();
  const { addSection } = useAddSectionUseCase();
  const [data, setData] = useState<Partial<Section>>({ active: true, buttonType: "contained" });

  const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement> | { target: { value: string } }) => {
    setData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      await addSection(data as Omit<Section, "id">);
      enqueueSnackbar("Section criada!", { variant: "success" });
      navigate("/sections");
    } catch {
      enqueueSnackbar("Erro ao criar section.", { variant: "error" });
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton onClick={() => navigate("/sections")}><NavigateBeforeIcon /></IconButton>
        <Typography variant="h5" fontWeight="bold">Nova Section</Typography>
      </Box>
      <SectionForm data={data as Section} onChange={handleChange} onActiveChange={(v) => setData((p) => ({ ...p, active: v }))} onSubmit={handleSubmit} />
    </Box>
  );
}
