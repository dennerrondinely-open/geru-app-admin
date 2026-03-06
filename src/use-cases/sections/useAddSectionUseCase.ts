import type { Section } from "domains/section";
import { useAddDocument } from "../../api/hooks/useAddDocument";

export const useAddSectionUseCase = () => {
  const { addDocument } = useAddDocument<Section>("sections");
  return { addSection: addDocument };
};
