import {
  Box,
  type SelectChangeEvent,
  IconButton,
  Typography,
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import type { Section } from "domains/section";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router";
import {
  useGetSectionUseCase,
  useUpdateSectionUseCase,
} from "use-cases/sections";
import { SectionForm } from "components/common/section-form";

export const EditSection = () => {
  const [data, setData] = useState<Section | undefined>({
    active: true,
  } as Section);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: sectionData } = useGetSectionUseCase(id);
  const { updateSection } = useUpdateSectionUseCase();

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
    console.log("Event:", event);
    const { checked } = event.target;
    console.log("Checked:", checked);
    if (checked !== undefined)
      setData((state) => {
        return { ...state, active: checked } as unknown as Section;
      });
  };

  const handleSubmit = async () => {
    try {
      if (data && id) {
        await updateSection(id, data);
        enqueueSnackbar("Comunicação atualizada com sucesso!", {
          variant: "success",
        });
        navigate("/");
      } else {
        enqueueSnackbar(
          "Por favor, preencha os dados da comunicação antes de salvar.",
          { variant: "warning" }
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar comunicação:", error);
      enqueueSnackbar(
        "Ocorreu um erro ao atualizar a comunicação. Tente novamente.",
        { variant: "error" }
      );
    }
  };

  useEffect(() => {
    if (sectionData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setData(sectionData);
    }
  }, [sectionData]);

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
        <Typography variant="h4">Alterar Comunicação</Typography>
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
