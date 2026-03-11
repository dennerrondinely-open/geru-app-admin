import { Box, Paper, Typography, Divider, Avatar } from "@mui/material";
import { useSections } from "@/context/section";
import { useLinks } from "@/context/link";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import LinkIcon from "@mui/icons-material/Link";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const StatCard = ({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) => (
  <Paper elevation={0} sx={{ p: 2.5, display: "flex", alignItems: "center", gap: 2, border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
    <Avatar sx={{ bgcolor: color, width: 48, height: 48 }}>{icon}</Avatar>
    <Box>
      <Typography variant="h5" fontWeight="bold" lineHeight={1.2}>{value}</Typography>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
    </Box>
  </Paper>
);

export default function HomePage() {
  const { sections } = useSections();
  const { links } = useLinks();
  const activeSections = sections.filter((s) => s.active).length;
  const inactiveSections = sections.filter((s) => !s.active).length;
  const activeLinks = links.filter((l) => l.active).length;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Typography variant="h5" fontWeight="bold">Dashboard</Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>Visão geral do conteúdo gerenciado</Typography>
      </Box>
      <Divider />
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" }, gap: 2 }}>
        <StatCard icon={<ViewCarouselIcon />} label="Total de Sections" value={sections.length} color="primary.main" />
        <StatCard icon={<CheckCircleOutlineIcon />} label="Sections Ativas" value={activeSections} color="success.main" />
        <StatCard icon={<HighlightOffIcon />} label="Sections Inativas" value={inactiveSections} color="error.main" />
        <StatCard icon={<LinkIcon />} label="Links Ativos" value={activeLinks} color="secondary.main" />
      </Box>
    </Box>
  );
}
