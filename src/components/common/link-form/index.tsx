
import { Box, Button, Paper } from "@mui/material";
import { Switch } from "@/components/form/Switch";
import { Input } from "@/components/form/Input";
import { Type, Link as LinkIcon, Smartphone, ShoppingBag, Globe, Hash } from "lucide-react";
import type { Link } from "@/domains/link";

interface LinkFormProps {
  data?: Link;
  onChange: (key: string) => (e: React.ChangeEvent<HTMLInputElement> | { target: { value: string } }) => void;
  onActiveChange: (value: boolean) => void;
  onSubmit: () => void;
}

export const LinkForm = ({ data, onChange, onActiveChange, onSubmit }: LinkFormProps) => (
  <Paper sx={{ p: 2, width: "100%" }}>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Switch label="Ativo" checked={data?.active} onChange={onActiveChange} color="success" />
      <Input label="Nome do Link" value={data?.name || ""} icon={<Type size={20} />} onChange={onChange("name")} />
      <Input label="Slug (ex: campanha-natal)" value={data?.slug || ""} icon={<Hash size={20} />} onChange={onChange("slug")} />
      <Input label="Tipo" value={data?.type || ""} icon={<Type size={20} />} onChange={onChange("type")} />
      <Input label="Web URL" value={data?.webUrl || ""} icon={<Globe size={20} />} onChange={onChange("webUrl")} />
      <Input label="App URL" value={data?.appUrl || ""} icon={<LinkIcon size={20} />} onChange={onChange("appUrl")} />
      <Input label="App Store URL" value={data?.appStore || ""} icon={<ShoppingBag size={20} />} onChange={onChange("appStore")} />
      <Input label="Play Store URL" value={data?.playStore || ""} icon={<Smartphone size={20} />} onChange={onChange("playStore")} />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={onSubmit}>Salvar</Button>
      </Box>
    </Box>
  </Paper>
);
