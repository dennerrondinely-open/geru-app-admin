import type { Link } from "domains/link";
import { useFirestoreCollection } from "../../api/hooks/useFirestoreCollection";
import { useFirestoreDoc } from "../../api/hooks/useFirestoreDoc";
import { useUpdateDocument } from "../../api/hooks/useUpdateDocument";
import { useAddDocument } from "../../api/hooks/useAddDocument";

export const useGetLinksUseCase = () => {
  const { data: links, loading } = useFirestoreCollection<Link>("links");
  return { links, loading };
};

export const useGetLinkUseCase = (id?: string) => {
  return useFirestoreDoc<Link>("links", id);
};

export const useUpdateLinkUseCase = () => {
  const { updateDocument } = useUpdateDocument<Link>("links");
  return { updateLink: updateDocument };
};

export const useAddLinkUseCase = () => {
  const { addDocument } = useAddDocument<Link>("links");
  return { addLink: addDocument };
};
