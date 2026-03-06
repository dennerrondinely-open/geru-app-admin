import type { Link } from "domains/link";

export interface LinkContextProps {
  links: Link[];
  loading?: boolean;
}
