
import { createContext, useContext } from "react";
import type { Section } from "domains/section";

interface SectionContextProps {
  sections: Section[];
  loading: boolean;
}

export const SectionContext = createContext<SectionContextProps>({ sections: [], loading: true });

export const useSections = () => useContext(SectionContext);
