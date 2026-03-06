import type { Section } from "domains/section";
import { useUpdateDocument } from "../../api/hooks/useUpdateDocument";

export const useUpdateSectionUseCase = () => {
  const { updateDocument } = useUpdateDocument<Section>("sections");
  return { updateSection: updateDocument };
};
