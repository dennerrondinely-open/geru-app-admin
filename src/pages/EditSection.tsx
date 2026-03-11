import { Box, IconButton, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import type { Section } from "@/domains/section";
import { useGetSectionUseCase, useUpdateSectionUseCase } from "use-cases/sections";
import { SectionForm } from "@/components/common/section-form";

export default function EditSectionPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: sectionData } = useGetSectionUseCase(id!);
  const { updateSection } = useUpdateSectionUseCase();
  const [data, setData] = useState<Section | undefined>(undefined);

  useEffect(() => {
    if (sectionData) setData(sectionData);
  }, [sectionData]);

  const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement> | { target: { value: string } }) => {
    setData((prev) => prev ? { ...prev, [key]: e.target.value } : prev);
  };

  const handleSubmit = async () => {
    if (!data?.id) return;
    try {
      const { id: _id, ...rest } = data;
      await updateSection(_id, rest);
      enqueueSnackbar("Section atualizada!", { variant: "success" });
      navigate("/sections");
    } catch {
      enqueueSnackbar("Erro ao atualizar section.", { variant: "error" });
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton onClick={() => navigate("/sections")}><NavigateBeforeIcon /></IconButton>
        <Typography variant="h5" fontWeight="bold">Editar Section</Typography>
      </Box>
      <SectionForm data={data} onChange={handleChange} onActiveChange={(v) => setData((p) => p ? { ...p, active: v } : p)} onSubmit={handleSubmit} />
    </Box>
  );
}
