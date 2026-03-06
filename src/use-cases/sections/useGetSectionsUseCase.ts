import type { Section } from "domains/section";
import { useFirestoreCollection } from "../../api/hooks/useFirestoreCollection";

export const useGetSectionsUseCase = () => {
  const { data: sections, loading } = useFirestoreCollection<Section>("sections");

  return {
    sections,
    loading,
  };
};
