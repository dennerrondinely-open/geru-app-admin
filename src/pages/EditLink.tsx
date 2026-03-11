import { Box, IconButton, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import type { Link } from "@/domains/link";
import { useGetLinkUseCase, useUpdateLinkUseCase } from "use-cases/links";
import { LinkForm } from "@/components/common/link-form";

export default function EditLinkPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: linkData } = useGetLinkUseCase(id!);
  const { updateLink } = useUpdateLinkUseCase();
  const [data, setData] = useState<Link | undefined>(undefined);

  useEffect(() => {
    if (linkData) setData(linkData);
  }, [linkData]);

  const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement> | { target: { value: string } }) => {
    setData((prev) => prev ? { ...prev, [key]: e.target.value } : prev);
  };

  const handleSubmit = async () => {
    if (!data?.id) return;
    try {
      await updateLink(data.id, { name: data.name, slug: data.slug, type: data.type, webUrl: data.webUrl, appUrl: data.appUrl, appStore: data.appStore, playStore: data.playStore, active: data.active });
      enqueueSnackbar("Link atualizado!", { variant: "success" });
      navigate("/links");
    } catch {
      enqueueSnackbar("Erro ao atualizar link.", { variant: "error" });
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton onClick={() => navigate("/links")}><NavigateBeforeIcon /></IconButton>
        <Typography variant="h5" fontWeight="bold">Editar Link</Typography>
      </Box>
      <LinkForm data={data} onChange={handleChange} onActiveChange={(v) => setData((p) => p ? { ...p, active: v } : p)} onSubmit={handleSubmit} />
    </Box>
  );
}
