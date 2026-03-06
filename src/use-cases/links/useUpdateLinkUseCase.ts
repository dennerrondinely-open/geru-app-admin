import type { Link } from "domains/link";
import { useUpdateDocument } from "../../api/hooks/useUpdateDocument";

export const useUpdateLinkUseCase = () => {
  const { updateDocument } = useUpdateDocument<Link>("links");
  return { updateLink: updateDocument };
};
