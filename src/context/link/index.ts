
import { createContext, useContext } from "react";
import type { Link } from "domains/link";

interface LinkContextProps {
  links: Link[];
  loading: boolean;
}

export const LinkContext = createContext<LinkContextProps>({ links: [], loading: true });

export const useLinks = () => useContext(LinkContext);
