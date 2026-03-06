import { useContext } from "react";
import { SectionContext } from "./sectionContext";
export const useSections = () => {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error("useSections deve ser usado dentro de um SectionProvider");
  }
  return context;
};