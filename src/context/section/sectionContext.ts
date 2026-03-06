import { createContext } from "react";
import type { SectionContextProps } from "./types";

export const SectionContext = createContext<SectionContextProps | undefined>(undefined);
