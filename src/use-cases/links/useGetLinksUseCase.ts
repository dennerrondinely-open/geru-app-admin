import type { Link } from "domains/link";
import { useFirestoreCollection } from "../../api/hooks/useFirestoreCollection";

export const useGetLinksUseCase = () => {
  const { data: links, loading } = useFirestoreCollection<Link>("links");

  return {
    links,
    loading,
  };
};
