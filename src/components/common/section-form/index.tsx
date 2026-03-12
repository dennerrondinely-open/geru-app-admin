import { Box, Button, Paper, type SelectChangeEvent } from "@mui/material";
import { Switch } from "components/form/Switch";
import { Input } from "components/form/Input";
import {
  Image as ImageIcon,
  Type,
  MousePointer,
  Link as LinkIcon,
  ClipboardList,
} from "lucide-react";
import type { Section } from "domains/section";
import { Select } from "components/form/Select";
import { SectionPreview } from "components/common/section-preview";

interface SectionFormProps {
  data: Section;
  onChange: (
    key: string
  ) => (
    event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => void;
  onActiveChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export const SectionForm = ({
  data,
  onChange,
  onActiveChange,
  onSubmit,
}: SectionFormProps) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
        gap: 2,
        alignItems: "start",
      }}
    >
      <Paper sx={{ p: 2, width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
        >
          <Switch
            label="Ativo"
            checked={data?.active}
            onChange={onActiveChange}
            color="success"
          />
          <Input
            label="Nome da Comunicação"
            value={data?.name || ""}
            icon={<Type size={20} />}
            onChange={onChange("name")}
          />
          <Input
            label="Pré-título"
            value={data?.preTitle || ""}
            icon={<Type size={20} />}
            onChange={onChange("preTitle")}
          />
          <Input
            label="Título"
            value={data?.title || ""}
            icon={<Type size={20} />}
            onChange={onChange("title")}
          />
          <Input
            label="Link da Imagem de Fundo"
            value={data?.backgroundLink || ""}
            icon={<ImageIcon size={20} />}
            onChange={onChange("backgroundLink")}
          />
          <Input
            label="Texto da mensagem"
            value={data?.message || ""}
            icon={<MousePointer size={20} />}
            onChange={onChange("message")}
          />
          <Input
            label="Texto do Botão"
            value={data?.buttonText || ""}
            icon={<MousePointer size={20} />}
            onChange={onChange("buttonText")}
          />
          <Input
            label="Link do Botão"
            value={data?.buttonLink || ""}
            icon={<LinkIcon size={20} />}
            onChange={onChange("buttonLink")}
          />
          <Select
            label="Tipo do Botão"
            icon={<ClipboardList size={20} />}
            value={data?.buttonType || ""}
            onChange={onChange("buttonType")}
            items={[
              { label: "Preenchido", value: "contained" },
              { label: "Contorno", value: "outlined" },
            ]}
          />
          <Box sx={{ height: 16 }} />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" color="primary" onClick={onSubmit}>
              Salvar Comunicação
            </Button>
          </Box>
        </Box>
      </Paper>

      <Box sx={{ position: { lg: "sticky" }, top: { lg: 24 } }}>
        <SectionPreview data={data} />
      </Box>
    </Box>
  );
};
