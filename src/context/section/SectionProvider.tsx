import {
  useAddSectionUseCase,
  useGetSectionsUseCase,
} from "use-cases/sections";
import { SectionContext } from "./sectionContext";
import type { Section } from "domains/section";
import { useEffect } from "react";

export const SectionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { sections, loading } = useGetSectionsUseCase();
  const { addDocument } = useAddSectionUseCase();

  const addSection = async (section: Section) => {
    await addDocument(section);
  };

  useEffect(() => {
    console.log("Sections updated:", sections);
  }, [sections]);

  return (
    <SectionContext.Provider value={{ sections, loading, addSection }}>
      {children}
    </SectionContext.Provider>
  );
};
