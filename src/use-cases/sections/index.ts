import type { Section } from "domains/section";
import { useFirestoreCollection } from "../../api/hooks/useFirestoreCollection";
import { useFirestoreDoc } from "../../api/hooks/useFirestoreDoc";
import { useUpdateDocument } from "../../api/hooks/useUpdateDocument";
import { useAddDocument } from "../../api/hooks/useAddDocument";
import { useDeleteDocument } from "../../api/hooks/useDeleteDocument";

export const useGetSectionsUseCase = () => {
  const { data: sections, loading } = useFirestoreCollection<Section>("sections");
  return { sections, loading };
};

export const useGetSectionUseCase = (id?: string) => {
  return useFirestoreDoc<Section>("sections", id);
};

export const useUpdateSectionUseCase = () => {
  const { updateDocument } = useUpdateDocument<Section>("sections");
  return { updateSection: updateDocument };
};

export const useAddSectionUseCase = () => {
  const { addDocument } = useAddDocument<Section>("sections");
  return { addSection: addDocument };
};

export const useDeleteSectionUseCase = () => {
  const { deleteDocument } = useDeleteDocument("sections");
  return { deleteSection: deleteDocument };
};
