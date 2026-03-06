import { useDeleteDocument } from "../../api/hooks/useDeleteDocument";

export const useDeleteSectionUseCase = () => {
  return useDeleteDocument("sections");
};
