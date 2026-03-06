import type { Link } from "domains/link";
import { useFirestoreDoc } from "../../api/hooks/useFirestoreDoc";

export const useGetLinkUseCase = (id?: string) => {
  return useFirestoreDoc<Link>("links", id);
};
