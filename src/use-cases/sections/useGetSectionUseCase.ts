import type { Section } from "domains/section";
import { useFirestoreDoc } from "../../api/hooks/useFirestoreDoc";

export const useGetSectionUseCase = (id?: string) => {
  return useFirestoreDoc<Section>("sections", id);
};
