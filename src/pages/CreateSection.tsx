import {
  Box,
  type SelectChangeEvent,
  IconButton,
  Typography,
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import type { Section } from "domains/section";
import { enqueueSnackbar } from "notistack";
import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router";
import { useAddSectionUseCase } from "use-cases/sections/useAddSectionUseCase";
import { SectionForm } from "components/common/section-form";

export const CreateSection = () => {
  const [data, setData] = useState<Section | undefined>();
  const navigate = useNavigate();
  const { addSection } = useAddSectionUseCase();

  const handleChange =
    (key: string) =>
    (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
      const { value } = event.target;
      if (value)
        setData((state) => {
          if (state) return { ...state, [key]: value };
          return { [key]: value } as unknown as Section;
        });
    };

  const handleActiveChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    if (checked !== undefined)
      setData((state) => {
        return { ...state, active: checked } as unknown as Section;
      });
  };

  const handleSubmit = async () => {
    try {
      if (data) {
        await addSection(data);
        enqueueSnackbar("Comunicação adicionada com sucesso!", {
          variant: "success",
        });
        navigate("/");
      } else {
        enqueueSnackbar(
          "Por favor, preencha os dados da comunicação antes de salvar.",
          { variant: "warning" },
        );
      }
    } catch (error) {
      console.error("Erro ao adicionar comunicação:", error);
      enqueueSnackbar(
        "Ocorreu um erro ao adicionar a comunicação. Tente novamente.",
        { variant: "error" },
      );
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        typography: "body1",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        margin: "24px 0 0 0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <IconButton aria-label="delete" onClick={() => navigate("/")}>
          <NavigateBeforeIcon fontSize="large" />
        </IconButton>
        <Typography variant="h4">Adicionar Comunicação</Typography>
      </Box>
      <SectionForm
        data={data as Section}
        onChange={handleChange}
        onActiveChange={handleActiveChange}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};
