import { createContext } from "react";
import type { LinkContextProps } from "./types";

export const LinkContext = createContext<LinkContextProps | undefined>(undefined);
