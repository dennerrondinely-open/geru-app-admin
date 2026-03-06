import {
  Box,
  type SelectChangeEvent,
  IconButton,
  Typography,
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import type { Link } from "domains/link";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router";
import { useGetLinkUseCase, useUpdateLinkUseCase } from "use-cases/links";
import { LinkForm } from "components/common/link-form";

export const EditLink = () => {
  const [data, setData] = useState<Link | undefined>({
    active: true,
  } as Link);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: linkData } = useGetLinkUseCase(id);
  const { updateLink } = useUpdateLinkUseCase();

  const handleChange =
    (key: string) =>
    (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
      const { value } = event.target;
      if (value !== undefined)
        setData((state) => {
          if (state) return { ...state, [key]: value };
          return { [key]: value } as unknown as Link;
        });
    };

  const handleActiveChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    if (checked !== undefined)
      setData((state) => {
        return { ...state, active: checked } as unknown as Link;
      });
  };

  const handleSubmit = async () => {
    try {
      if (data && id) {
        await updateLink(id, data);
        enqueueSnackbar("Link atualizado com sucesso!", {
          variant: "success",
        });
        navigate("/links");
      } else {
        enqueueSnackbar(
          "Por favor, preencha os dados do link antes de salvar.",
          { variant: "warning" }
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar link:", error);
      enqueueSnackbar(
        "Ocorreu um erro ao atualizar o link. Tente novamente.",
        { variant: "error" }
      );
    }
  };

  useEffect(() => {
    if (linkData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setData(linkData);
    }
  }, [linkData]);

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
        <IconButton aria-label="back" onClick={() => navigate("/links")}>
          <NavigateBeforeIcon fontSize="large" />
        </IconButton>
        <Typography variant="h4">Editar Link</Typography>
      </Box>
      <LinkForm
        data={data as Link}
        onChange={handleChange}
        onActiveChange={handleActiveChange}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};
